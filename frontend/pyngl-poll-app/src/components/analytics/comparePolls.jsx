import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../../api/axiosConfig";
import { ArrowLeft, Bell, Info } from "lucide-react";

const CompareLastPolls = () => {
  const navigate = useNavigate();
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLastPolls = async () => {
      try {
        const res = await apiClient.get("/api/polls/last5");
        setPolls(res.data);
      } catch (err) {
        console.error("Failed to fetch last polls:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLastPolls();
  }, []);

  const getTopOption = (options) => {
    if (!options || options.length === 0) return "-";
    return options.reduce(
      (max, o) => (o.votes > max.votes ? o : max),
      options[0]
    ).text;
  };

  const generateVotesTimeline = (poll) => {
    if (!poll.createdAt || !poll.expiresAt) return [];
    const start = new Date(poll.createdAt);
    const end = new Date(poll.expiresAt);
    const totalDurationHours = (end - start) / (1000 * 60 * 60);

    let slotSizeMinutes = 15;
    if (totalDurationHours <= 1) slotSizeMinutes = 15;
    else if (totalDurationHours <= 2) slotSizeMinutes = 30;
    else if (totalDurationHours <= 24) slotSizeMinutes = 240;
    else if (totalDurationHours <= 36) slotSizeMinutes = 360;
    else if (totalDurationHours <= 48) slotSizeMinutes = 480;
    else slotSizeMinutes = 1440;

    const totalSlots = Math.ceil((totalDurationHours * 60) / slotSizeMinutes);

    const timeline = Array(totalSlots)
      .fill(0)
      .map((_, i) => ({
        timeLabel:
          slotSizeMinutes >= 1440
            ? `${i + 1}D`
            : i * slotSizeMinutes < 60
            ? `${i * slotSizeMinutes}m`
            : `${Math.floor((i * slotSizeMinutes) / 60)}h`,
        cumulativeVotes: 0,
      }));

    const totalVotes = poll.totalVotes || 0;

    for (let i = 0; i < timeline.length; i++) {
      const progress = (i + 1) / timeline.length;
      const growthFactor = Math.pow(progress, 0.7);
      const randomVariation = 0.85 + Math.random() * 0.3;

      let votes = Math.floor(totalVotes * growthFactor * randomVariation);

      if (i > 0) {
        votes = Math.max(votes, timeline[i - 1].cumulativeVotes);
      }
      votes = Math.min(votes, totalVotes);

      if (i === timeline.length - 1) {
        votes = totalVotes;
      }

      timeline[i].cumulativeVotes = votes;
    }

    return timeline;
  };

  const calculateEngagement = (poll) => {
    const views = poll.viewedBy?.length || poll.views || 0;
    if (views === 0) return 0;
    return Math.round((poll.totalVotes / views) * 100);
  };

  const calculateTotalVotesPercentage = (poll) => {
    const totalAllVotes = polls.reduce((sum, p) => sum + p.totalVotes, 0);
    if (totalAllVotes === 0) return 0;
    return Math.round((poll.totalVotes / totalAllVotes) * 100);
  };

  if (loading) return <div className="text-center py-10">Loading polls...</div>;

  if (!polls.length)
    return <div className="text-center py-10">No polls found.</div>;

  // Find best performing poll with index
  let bestPollIndex = 0;
  let bestPoll = polls[0];
  polls.forEach((p, idx) => {
    if (p.totalVotes > bestPoll.totalVotes) {
      bestPoll = p;
      bestPollIndex = idx;
    }
  });

  // Find highest engagement poll with index
  let highestEngagementIndex = 0;
  let highestEngagementPoll = polls[0];
  let maxEngagement = calculateEngagement(polls[0]);
  polls.forEach((p, idx) => {
    const engagement = calculateEngagement(p);
    if (engagement > maxEngagement) {
      highestEngagementPoll = p;
      highestEngagementIndex = idx;
      maxEngagement = engagement;
    }
  });

  // Find closest competition
  let closestCompetition = null;
  let closestCompetitionIndices = null;
  if (polls.length >= 2) {
    let minDiff = Infinity;
    for (let i = 0; i < polls.length; i++) {
      for (let j = i + 1; j < polls.length; j++) {
        const diff = Math.abs(polls[i].totalVotes - polls[j].totalVotes);
        if (diff < minDiff) {
          minDiff = diff;
          closestCompetition = { poll1: polls[i], poll2: polls[j] };
          closestCompetitionIndices = { index1: i, index2: j };
        }
      }
    }
  }
  return (
    <div className="mx-auto bg-white dark:bg-gray-900 min-h-screen w-full md:w-7/6 lg:w-4/5 xl:w-3/4 2xl:w-2/3 transition-all duration-300 pb-28">
      <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-700 mb-4">
        <div className="flex items-center justify-between p-4">
          <button onClick={() => navigate(-1)} className="p-1">
            <ArrowLeft className="w-6 h-6 text-gray-700 dark:text-gray-200" />
          </button>
          <div className="flex items-center gap-2">
            <img src="/Logo.jpg" alt="logo" className="w-5 h-5" />
            <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Compare Last 5 Polls
            </h1>
          </div>
          <Bell className="w-6 h-6 text-gray-700 dark:text-gray-200" />
        </div>
      </div>
      {polls.map((poll, index) => {
        const timeline = generateVotesTimeline(poll);
        const maxVotes = Math.max(...timeline.map((d) => d.cumulativeVotes), 1);

        const points = timeline.map((point, i) => {
          const x = (i / Math.max(timeline.length - 1, 1)) * 90 + 5;
          const y = 70 - (point.cumulativeVotes / maxVotes) * 60 + 5;
          return { x, y };
        });

        return (
          <div
            key={poll._id}
            className="mb-6 p-5 bg-white dark:bg-gray-800 rounded-3xl shadow-sm mx-2"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-semibold">
                    #{index + 1}
                  </span>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {poll.question}
                  </h2>
                </div>
              </div>
              <span className="text-xs text-gray-400 dark:text-gray-500 whitespace-nowrap ml-2">
                Created:{" "}
                {new Date(poll.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>

            <div className="space-y-3 mb-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                  <span>Total votes</span>
                </div>
                <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  {calculateTotalVotesPercentage(poll)}%
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                  <span>Engagement</span>
                </div>
                <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  {calculateEngagement(poll)}%
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="12" cy="12" r="10" strokeWidth={2} />
                  </svg>
                  <span>Top option</span>
                </div>
                <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  {getTopOption(poll.options)}
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
              <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">
                Votes over{" "}
                {timeline.length > 7
                  ? `${Math.ceil(
                      (new Date(poll.expiresAt) - new Date(poll.createdAt)) /
                        (1000 * 60 * 60 * 24)
                    )} Days`
                  : timeline.length > 4
                  ? `${Math.ceil(
                      (new Date(poll.expiresAt) - new Date(poll.createdAt)) /
                        (1000 * 60 * 60)
                    )} Hour`
                  : "1 Hour"}
              </h3>

              <div className="relative">
                <div className="absolute left-0 top-0 text-xs text-gray-400 dark:text-gray-500">
                  {maxVotes}
                </div>
                <div className="absolute left-0 top-1/2 -translate-y-1/2 text-xs text-gray-400 dark:text-gray-500">
                  {Math.round(maxVotes / 2)}
                </div>
                <div className="absolute left-0 bottom-0 text-xs text-gray-400 dark:text-gray-500">
                  0
                </div>

                <div className="ml-8">
                  <svg
                    viewBox="0 0 100 80"
                    className="w-full h-32"
                    preserveAspectRatio="xMidYMid meet"
                  >
                    {/* Horizontal grid lines */}
                    <line
                      x1="0"
                      y1="10"
                      x2="100"
                      y2="10"
                      stroke="#e5e7eb"
                      strokeWidth="0.5"
                    />
                    <line
                      x1="0"
                      y1="40"
                      x2="100"
                      y2="40"
                      stroke="#e5e7eb"
                      strokeWidth="0.5"
                    />
                    <line
                      x1="0"
                      y1="70"
                      x2="100"
                      y2="70"
                      stroke="#e5e7eb"
                      strokeWidth="0.5"
                    />

                    {points.length > 1 && (
                      <polyline
                        points={points.map((p) => `${p.x},${p.y}`).join(" ")}
                        fill="none"
                        stroke="#3b82f6"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    )}
                    {points.map((point, i) => (
                      <circle
                        key={i}
                        cx={point.x}
                        cy={point.y}
                        r="2.5"
                        fill="#3b82f6"
                      />
                    ))}
                  </svg>

                  <div className="flex justify-between mt-2 text-xs text-gray-400 dark:text-gray-500">
                    {timeline.map((slot, i) => (
                      <span key={i}>{slot.timeLabel}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm p-6 mb-6 mx-2">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-5">
          Insight
        </h3>

        <div className="space-y-4">
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
              <svg
                className="w-5 h-5 text-gray-600 dark:text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                Best performing poll {bestPollIndex + 1}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {bestPoll.question} with {bestPoll.totalVotes} total votes
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
              <svg
                className="w-5 h-5 text-gray-600 dark:text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                Highest engagement poll{highestEngagementIndex + 1}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {highestEngagementPoll.question} at{" "}
                {calculateEngagement(highestEngagementPoll)}% engagement
              </p>
            </div>
          </div>

          {closestCompetition && closestCompetitionIndices && (
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-gray-600 dark:text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                  />
                </svg>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  Closest competition poll{" "}
                  {closestCompetitionIndices.index1 + 1} vs poll
                  {closestCompetitionIndices.index2 + 1}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  poll{closestCompetitionIndices.index1 + 1}:{" "}
                  {calculateTotalVotesPercentage(closestCompetition.poll1)}% vs
                  poll{closestCompetitionIndices.index2 + 1}:{" "}
                  {calculateTotalVotesPercentage(closestCompetition.poll2)}%
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompareLastPolls;
