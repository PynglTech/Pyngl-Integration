import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../../api/axiosConfig";
import { ArrowLeft, Info } from "lucide-react";

const CompareLastPolls = () => {
  const navigate = useNavigate();
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLastPolls = async () => {
      try {
        const res = await apiClient.get("/api/polls/last5"); // Endpoint to fetch last 5 polls
        console.log("🚀 ~ fetchLastPolls ~ res:", res)
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
    return options.reduce((max, o) => (o.votes > max.votes ? o : max), options[0]).text;
  };

  const generateVotesTimeline = (poll) => {
    if (!poll.createdAt || !poll.expiresAt) return [];
    const start = new Date(poll.createdAt);
    const end = new Date(poll.expiresAt);
    const now = new Date();
    const currentTime = now > end ? end : now;
    const totalDurationHours = (end - start) / (1000 * 60 * 60);
    const elapsedHours = (currentTime - start) / (1000 * 60 * 60);

    let slotSizeMinutes = 15;
    if (totalDurationHours <= 1) slotSizeMinutes = 15;
    else if (totalDurationHours <= 2) slotSizeMinutes = 30;
    else if (totalDurationHours <= 24) slotSizeMinutes = 240;
    else if (totalDurationHours <= 36) slotSizeMinutes = 360;
    else if (totalDurationHours <= 48) slotSizeMinutes = 480;
    else slotSizeMinutes = 1440;

    const totalSlots = Math.ceil((totalDurationHours * 60) / slotSizeMinutes);
    const elapsedSlots = Math.ceil((elapsedHours * 60) / slotSizeMinutes);

    const timeline = Array(totalSlots).fill(0).map((_, i) => ({
      timeLabel: slotSizeMinutes >= 1440
        ? `Day ${i + 1}`
        : i * slotSizeMinutes < 60
        ? `${i * slotSizeMinutes}m`
        : `${Math.floor((i * slotSizeMinutes) / 60)}h`,
      cumulativeVotes: 0,
      isElapsed: i < elapsedSlots
    }));

    // Distribute votes across elapsed slots
    let cumulative = 0;
    for (let i = 0; i < elapsedSlots && i < timeline.length; i++) {
      const increment = Math.floor((poll.totalVotes / elapsedSlots) * (0.7 + Math.random() * 0.6));
      cumulative += increment;
      if (cumulative > poll.totalVotes) cumulative = poll.totalVotes;
      timeline[i].cumulativeVotes = cumulative;
    }

    for (let i = elapsedSlots; i < timeline.length; i++) {
      timeline[i].cumulativeVotes = poll.totalVotes;
    }

    return timeline;
  };

  if (loading) return <div className="text-center py-10">Loading polls...</div>;

  if (!polls.length) return <div className="text-center py-10">No polls found.</div>;

  // ------------------------------------------------
  // Insights calculation
  // ------------------------------------------------
  const bestPoll = polls.reduce((max, p) => (p.totalVotes > max.totalVotes ? p : max), polls[0]);
  const highestEngagementPoll = polls.reduce((max, p) => (p.views > max.views ? p : max), polls[0]);
  const closestCompetition = polls.length >= 2
    ? { poll1: polls[2], poll2: polls[1] }
    : null;

  return (
    <div className="mx-auto bg-white dark:bg-gray-900 min-h-screen w-full md:w-4/5 lg:w-3/4 xl:w-2/3 p-4">
      <div className="flex items-center gap-2 mb-6">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft className="w-6 h-6 text-gray-700 dark:text-gray-200" />
        </button>
        <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Compare Last 5 Polls</h1>
      </div>

      {polls.map((poll) => {
        const timeline = generateVotesTimeline(poll);
        const maxVotes = Math.max(...timeline.map((d) => d.cumulativeVotes), 1);
        let pathData = "";
        timeline.forEach((point, i) => {
          const x = (i / (timeline.length - 1)) * 300;
          const y = 100 - (point.cumulativeVotes / maxVotes) * 80;
          if (i === 0) pathData += `M ${x.toFixed(1)} ${y.toFixed(1)}`;
          else {
            const prevX = ((i - 1) / (timeline.length - 1)) * 300;
            const prevY = 100 - (timeline[i - 1].cumulativeVotes / maxVotes) * 80;
            const cpX = (prevX + x) / 2;
            pathData += ` Q ${cpX.toFixed(1)} ${prevY.toFixed(1)}, ${x.toFixed(1)} ${y.toFixed(1)}`;
          }
        });

        return (
          <div key={poll._id} className="mb-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between mb-2">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{poll.question}</h2>
              <span className="text-sm text-gray-600 dark:text-gray-400">{poll.totalVotes} votes • {poll.views} views</span>
            </div>
            <div className="mb-4 text-sm text-gray-700 dark:text-gray-300">Top option: <strong>{getTopOption(poll.options)}</strong></div>

            {/* Votes over time graph */}
            <div className="relative h-32 mb-2">
              <svg viewBox="0 0 300 100" preserveAspectRatio="none" className="w-full h-full">
                <defs>
                  <linearGradient id={`gradient-${poll._id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#ec4899" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#ec4899" stopOpacity="0.05" />
                  </linearGradient>
                </defs>
                <path d={`${pathData} L 300 100 L 0 100 Z`} fill={`url(#gradient-${poll._id})`} />
                <path d={pathData} fill="none" stroke="#ec4899" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
              <div className="flex justify-between mt-2 text-xs text-gray-400 dark:text-gray-500">
                {timeline.map((slot, i) => <span key={i}>{slot.timeLabel}</span>)}
              </div>
            </div>
          </div>
        );
      })}

      {/* Insights */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Insights</h3>
        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
          <li>Best performing poll: <strong>{bestPoll.question}</strong> ({bestPoll.totalVotes} votes)</li>
          <li>Highest engagement poll: <strong>{highestEngagementPoll.question}</strong> ({highestEngagementPoll.views} views)</li>
          {closestCompetition && (
            <li>Closest competition: <strong>{closestCompetition.poll1.question}</strong> vs <strong>{closestCompetition.poll2.question}</strong> ({closestCompetition.poll1.totalVotes}% vs {closestCompetition.poll2.totalVotes}%)</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default CompareLastPolls;
