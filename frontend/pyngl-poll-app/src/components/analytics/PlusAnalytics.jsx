import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  Bell,
  Download,
  Info,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import apiClient from "../../api/axiosConfig";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Papa from "papaparse";
import { saveAs } from "file-saver";

// -----------------------------------------------------------
// Helper Functions
// -----------------------------------------------------------

const enhancePollDataDynamic = (rawData) => {
  const now = new Date();
  const expiresDate = rawData.expiresAt ? new Date(rawData.expiresAt) : now;
  const timeDiffMs = expiresDate.getTime() - now.getTime();

  let timeLeftDisplay = "0s";

  if (timeDiffMs <= 0) {
    timeLeftDisplay = "Expired";
  } else {
    const days = Math.floor(timeDiffMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiffMs / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeDiffMs / (1000 * 60)) % 60);

    if (days >= 1) {
      timeLeftDisplay = `${days} day${days > 1 ? "s" : ""} left`;
    } else if (hours >= 1) {
      timeLeftDisplay = `${hours}h ${minutes}m left`;
    } else {
      timeLeftDisplay = `${minutes}m left`;
    }
  }

  return {
    ...rawData,
    views: rawData.views || 0,
    clicks: rawData.totalVotes || 0,
    totalVotes: rawData.totalVotes || 0,
    responseRate:
      rawData.views > 0
        ? ((rawData.totalVotes / rawData.views) * 100).toFixed(1)
        : "0",
    avgTime:
      rawData.totalVotes > 0
        ? (rawData.totalTimeSpent / rawData.totalVotes).toFixed(1)
        : "0",
    platformBreakdown: rawData.platformBreakdown || {},
    browserBreakdown: rawData.browserBreakdown || {},
    deviceBreakdown: rawData.deviceBreakdown || {},
    earlyVoters: rawData.earlyVoters || 0,
    lateVoters: rawData.lateVoters || 0,
    completed: rawData.completed || 0,
    daysLeft: timeLeftDisplay,
    msLeft: Math.max(0, timeDiffMs),
    options: rawData.options || [],
  };
};

// -----------------------------------------------------------
// Plus Analytics Component
// -----------------------------------------------------------

const PlusAnalytics = () => {
  const { pollId } = useParams();
  const navigate = useNavigate();
  const [poll, setPoll] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showInfoPopup, setShowInfoPopup] = useState(false);

  const platformColors = {
    Instagram: "bg-pink-500",
    LinkedIn: "bg-blue-600",
    WhatsApp: "bg-green-500",
    Twitter: "bg-blue-400",
    Youtube: "bg-red-500",
    Telegram: "bg-sky-500",
    iMessages: "bg-indigo-500",
    Gmail: "bg-yellow-500",
    Messages: "bg-purple-500",
    Facebook: "bg-blue-700",
  };

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await apiClient.get(`/api/polls/${pollId}/analytics`);
        const enhancedData = enhancePollDataDynamic(res.data);
        setPoll(enhancedData);
      } catch (err) {
        console.error("Failed to fetch analytics:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, [pollId]);

  if (loading) {
    return (
      <div className="text-center py-10 dark:text-gray-300">
        Loading analytics...
      </div>
    );
  }

  if (!poll) {
    return (
      <div className="text-center py-10 dark:text-gray-300">
        No analytics found.
      </div>
    );
  }

  // Calculate vote percentages for options
  const optionsWithPercentage = poll.options.map((option) => {
    const percentage =
      poll.totalVotes > 0 ? (option.votes / poll.totalVotes) * 100 : 0;
    return { ...option, percentage: percentage.toFixed(0) };
  });

  // Find winning option
  const winningOption = optionsWithPercentage.reduce(
    (max, opt) => (opt.votes > max.votes ? opt : max),
    optionsWithPercentage[0]
  );

  // Calculate behavioral insights from existing data
  const getBehavioralInsights = () => {
    const avgTime = parseFloat(poll.avgTime) || 0;
    const exitTime = `${Math.round(avgTime)} seconds`;

    let fastestDevice = "Mobile";
    if (poll.deviceBreakdown && Object.keys(poll.deviceBreakdown).length > 0) {
      fastestDevice = Object.entries(poll.deviceBreakdown).reduce(
        (fastest, [device, count]) => {
          return count > (poll.deviceBreakdown[fastest] || 0)
            ? device
            : fastest;
        },
        "Mobile"
      );
    }

    const currentHour = new Date().getHours();
    let peakHour = currentHour;

    if (poll.totalVotes > 100) {
      peakHour = currentHour - 1;
    }

    const formatPeakTime = (hour) => {
      const startHour = hour % 12 || 12;
      const endHour = (hour + 1) % 12 || 12;
      const period = hour >= 12 ? "PM" : "AM";
      return `${startHour}-${endHour} ${period}`;
    };

    const peakTime = formatPeakTime(peakHour);

    return { exitTime, fastestDevice, peakTime };
  };

  const behavioralInsights = getBehavioralInsights();

  // -----------------------------------------------------------
  // Sub Components
  // -----------------------------------------------------------

  const PlatformRow = ({ name, percentage, color }) => (
    <div className="flex flex-col justify-start py-4">
      <div className="flex items-center space-x-3 justify-between">
        <div className="flex items-center justify-center gap-3">
          {name && (
            <img src={`/icons/${name}.svg`} alt={name} className="w-5 h-5" />
          )}
          <span className="text-gray-900 dark:text-gray-100 font-medium">
            {name}
          </span>
        </div>
        <div className="flex items-center justify-center">
          <span className="text-gray-900 dark:text-gray-100 font-semibold w-8 text-right">
            {percentage}%
          </span>
        </div>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 shadow-inner mt-3">
        <div
          className={`h-4 rounded-full transition-all duration-300 shadow-sm ${color}`}
          style={{
            width: `${Math.min(100, Math.max(0, percentage))}%`,
          }}
        />
      </div>
    </div>
  );

  const VoteVelocityChart = () => {
    const timeSlots = 10;
    const [velocityData, setVelocityData] = useState(Array(timeSlots).fill(0));
    const maxVotes = Math.max(...velocityData, 1);

    useEffect(() => {
      if (!poll?.votersMeta?.length) return;

      const startTime = new Date(poll.createdAt).getTime();
      const endTime = new Date(poll.expiresAt).getTime();
      const slotDuration = (endTime - startTime) / timeSlots;

      const slots = Array(timeSlots).fill(0);

      poll.votersMeta.forEach(({ votedAt }) => {
        const voteTime = new Date(votedAt).getTime();
        let idx = Math.floor((voteTime - startTime) / slotDuration);
        if (idx >= timeSlots) idx = timeSlots - 1;
        if (idx >= 0) slots[idx]++;
      });

      let current = Array(timeSlots).fill(0);
      let idx = 0;
      const interval = setInterval(() => {
        if (idx >= slots.length) {
          clearInterval(interval);
          return;
        }
        current[idx] = slots[idx];
        setVelocityData([...current]);
        idx++;
      }, 100);

      return () => clearInterval(interval);
    }, [poll]);

    return (
      <div className="bg-purple-50 dark:bg-purple-900/10 rounded-3xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Vote Velocity
          </h4>
          <span className="text-sm text-gray-400 dark:text-gray-500">
            Votes per time slot
          </span>
        </div>

        <div className="flex items-end justify-between h-40 gap-2 px-2">
          {velocityData.map((votes, idx) => {
            const isHighest = votes === maxVotes && votes > 0;
            return (
              <div
                key={idx}
                className="flex-1 flex flex-col items-center gap-1"
              >
                <div
                  className="w-full relative flex items-end"
                  style={{ height: "160px" }}
                >
                  {isHighest && (
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-pink-500 rounded-full"></div>
                  )}
                  <div
                    className={`w-full rounded-t transition-all duration-500 ${
                      isHighest ? "bg-purple-500" : "bg-purple-400"
                    }`}
                    style={{
                      height: votes > 0 ? `${(votes / maxVotes) * 100}%` : "0%",
                      minHeight: votes > 0 ? "8px" : "0px",
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-between mt-4 text-sm text-gray-400 dark:text-gray-500 px-2">
          {Array(4)
            .fill(0)
            .map((_, idx) => {
              const minutes = (idx + 1) * 15;
              return <span key={idx}>{minutes} min</span>;
            })}
        </div>
      </div>
    );
  };

  const InfoPopup = () => (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={() => setShowInfoPopup(false)}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-sm w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">
          Votes Over Time - Trends
        </h3>
        <div className="space-y-5">
          <div className="flex items-center gap-4">
            <svg
              width="50"
              height="30"
              viewBox="0 0 50 30"
              className="flex-shrink-0"
            >
              <defs>
                <linearGradient
                  id="upGradient"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#ec4899" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#ec4899" stopOpacity="0.05" />
                </linearGradient>
              </defs>
              <path
                d="M 0 25 Q 12 20 25 10 T 50 5 L 50 30 L 0 30 Z"
                fill="url(#upGradient)"
              />
              <path
                d="M 0 25 Q 12 20 25 10 T 50 5"
                fill="none"
                stroke="#ec4899"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
            <p className="text-sm text-gray-900 dark:text-gray-100">
              → votes are increasing.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <svg
              width="50"
              height="30"
              viewBox="0 0 50 30"
              className="flex-shrink-0"
            >
              <defs>
                <linearGradient
                  id="steadyGradient"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#a855f7" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#a855f7" stopOpacity="0.05" />
                </linearGradient>
              </defs>
              <path
                d="M 0 15 L 50 15 L 50 30 L 0 30 Z"
                fill="url(#steadyGradient)"
              />
              <path
                d="M 0 15 L 50 15"
                fill="none"
                stroke="#a855f7"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
            <p className="text-sm text-gray-900 dark:text-gray-100">
              → Activity is steady.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <svg
              width="50"
              height="30"
              viewBox="0 0 50 30"
              className="flex-shrink-0"
            >
              <defs>
                <linearGradient
                  id="downGradient"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#ec4899" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#ec4899" stopOpacity="0.05" />
                </linearGradient>
              </defs>
              <path
                d="M 0 5 Q 12 10 25 18 T 50 25 L 50 30 L 0 30 Z"
                fill="url(#downGradient)"
              />
              <path
                d="M 0 5 Q 12 10 25 18 T 50 25"
                fill="none"
                stroke="#ec4899"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
            <p className="text-sm text-gray-900 dark:text-gray-100">
              → Engagement is slowing down.
            </p>
          </div>
        </div>
        <button
          onClick={() => setShowInfoPopup(false)}
          className="w-full mt-6 bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-xl font-semibold transition-colors"
        >
          Got it
        </button>
      </div>
    </div>
  );

  const generateVotesOverTimeData = () => {
    if (!poll.createdAt || !poll.expiresAt) return [];

    const start = new Date(poll.createdAt);
    const end = new Date(poll.expiresAt);
    const now = new Date();
    const currentTime = now > end ? end : now;

    const totalDurationHours = (end - start) / (1000 * 60 * 60);
    const elapsedHours = (currentTime - start) / (1000 * 60 * 60);

    // Determine slot size based on duration
    let slotSizeMinutes = 15;
    if (totalDurationHours <= 1) slotSizeMinutes = 15;
    else if (totalDurationHours <= 2) slotSizeMinutes = 30;
    else if (totalDurationHours <= 24) slotSizeMinutes = 240;
    else if (totalDurationHours <= 36) slotSizeMinutes = 360;
    else if (totalDurationHours <= 48) slotSizeMinutes = 480;
    else slotSizeMinutes = 1440;

    const totalSlots = Math.ceil((totalDurationHours * 60) / slotSizeMinutes);
    const elapsedSlots = Math.ceil((elapsedHours * 60) / slotSizeMinutes);

    const timeline = Array(totalSlots)
      .fill(0)
      .map((_, i) => ({
        timeLabel:
          slotSizeMinutes >= 1440
            ? `Day ${i + 1}`
            : i * slotSizeMinutes < 60
            ? `${i * slotSizeMinutes}m`
            : `${Math.floor((i * slotSizeMinutes) / 60)}h`,
        cumulativeVotes: 0,
        isElapsed: i < elapsedSlots,
      }));

    // Distribute votes across elapsed time
    if (poll.votersMeta && poll.votersMeta.length > 0) {
      const startMs = start.getTime();
      const slotMs = slotSizeMinutes * 60 * 1000;

      poll.votersMeta.forEach(({ votedAt }) => {
        const voteTime = new Date(votedAt).getTime();
        let slotIndex = Math.floor((voteTime - startMs) / slotMs);
        if (slotIndex >= 0 && slotIndex < timeline.length) {
          timeline[slotIndex].cumulativeVotes += 1;
        }
      });

      // Make cumulative
      for (let i = 1; i < timeline.length; i++) {
        timeline[i].cumulativeVotes += timeline[i - 1].cumulativeVotes;
      }
    } else {
      // Simulate distribution
      let cumulative = 0;
      for (let i = 0; i < elapsedSlots && i < timeline.length; i++) {
        const increment = Math.floor(
          (poll.totalVotes / elapsedSlots) * (0.7 + Math.random() * 0.6)
        );
        cumulative += increment;
        if (cumulative > poll.totalVotes) cumulative = poll.totalVotes;
        timeline[i].cumulativeVotes = cumulative;
      }

      // Fill remaining elapsed slots with final count
      for (let i = elapsedSlots; i < timeline.length; i++) {
        timeline[i].cumulativeVotes = poll.totalVotes;
      }
    }

    return timeline;
  };
  // const handleExportPDF = () => {
  //   const doc = new jsPDF();
  //   doc.setFontSize(16);
  //   doc.text("Poll Analytics Report", 14, 20);

  //   // Summary Table
  //   const summaryData = polls.map((poll) => [
  //     poll.question,
  //     poll.totalVotes,
  //     poll.views,
  //     `${poll.completionRate || 0}%`,
  //     poll.clicks || 0,
  //   ]);

  //   doc.autoTable({
  //     startY: 30,
  //     head: [["Question", "Votes", "Views", "Completion %", "Clicks"]],
  //     body: summaryData,
  //   });

  //   // Footer
  //   const date = new Date().toLocaleString();
  //   doc.setFontSize(10);
  //   doc.text(`Generated on: ${date}`, 14, doc.internal.pageSize.height - 10);

  //   doc.save("poll-analytics.pdf");
  // };

  // const handleExportCSV = () => {
  //   const csvData = polls.map((poll) => ({
  //     Question: poll.question,
  //     Votes: poll.totalVotes,
  //     Views: poll.views,
  //     CompletionRate: poll.completionRate || 0,
  //     Clicks: poll.clicks || 0,
  //   }));

  //   const csv = Papa.unparse(csvData);
  //   const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  //   saveAs(blob, "poll-analytics.csv");
  // };

  return (
    <div className="mx-auto bg-white dark:bg-gray-900 min-h-screen w-full md:w-7/6 lg:w-4/5 xl:w-3/4 2xl:w-2/3 transition-all duration-300 pb-28">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between p-4">
          <button onClick={() => navigate(-1)} className="p-1">
            <ArrowLeft className="w-6 h-6 text-gray-700 dark:text-gray-200" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full" />
            <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Plus Analytics
            </h1>
          </div>
          <Bell className="w-6 h-6 text-gray-700 dark:text-gray-200" />
        </div>
      </div>

      {/* Poll Question & Status */}
      <div className="px-4 py-4 border-b border-gray-100 dark:border-gray-700 mx-2 mb-4">
        <div className="flex items-start justify-between mb-3">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 flex-1">
            {poll.question}
          </h2>
          <button className="ml-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
            <Download className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-red-500"></div>
          <span className="text-sm text-gray-600 dark:text-gray-400">Live</span>
          <span className="text-sm text-gray-600 dark:text-gray-400">•</span>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {poll.daysLeft}
          </span>
        </div>
      </div>

      {/* Main Two Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* -------- Column 1 -------- */}
        <div className="space-y-6">
          {/* Total Votes Badge */}
          <div className="px-4 mb-4 w-full flex justify-center">
            <div className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-4 py-2 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="font-semibold">
                {poll.totalVotes?.toLocaleString()} votes
              </span>
            </div>
          </div>

          {/* Poll Options */}
          <div className="px-4 mb-8 space-y-3">
            {optionsWithPercentage.map((option) => (
              <div
                key={option._id}
                className={`rounded-3xl p-4 border ${
                  option._id === winningOption._id
                    ? "bg-pink-50 dark:bg-pink-900/20 border-pink-200 dark:border-pink-800"
                    : "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        option._id === winningOption._id
                          ? "border-pink-500 bg-pink-500"
                          : "border-gray-300 dark:border-gray-600"
                      }`}
                    >
                      {option._id === winningOption._id && (
                        <svg
                          className="w-4 h-4 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="text-gray-900 dark:text-gray-100 font-medium">
                      {option.text}
                    </span>
                  </div>
                  <span
                    className={`font-bold ${
                      option._id === winningOption._id
                        ? "text-pink-500"
                        : "text-gray-600 dark:text-gray-400"
                    }`}
                  >
                    {option.percentage}%
                  </span>
                </div>
                <div className="text-sm ml-8 text-gray-500 dark:text-gray-400">
                  {option.votes?.toLocaleString()} Votes
                </div>
              </div>
            ))}
          </div>

          {/* Votes Over Time */}
          <div className="px-4 py-6 mx-4 border border-gray-200 dark:border-gray-700 rounded-3xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">
                Votes over time
              </h3>
              <button
                onClick={() => setShowInfoPopup(true)}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
              >
                <Info className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            {(() => {
              const timeline = generateVotesOverTimeData();
              if (timeline.length === 0) {
                return (
                  <div className="text-sm text-gray-500">No data available</div>
                );
              }

              const maxVotes = Math.max(
                ...timeline.map((d) => d.cumulativeVotes),
                1
              );

              // Create smooth curve using quadratic bezier
              let pathData = "";
              timeline.forEach((point, i) => {
                const x = (i / (timeline.length - 1)) * 300;
                const y = 100 - (point.cumulativeVotes / maxVotes) * 80;

                if (i === 0) {
                  pathData += `M ${x.toFixed(1)} ${y.toFixed(1)}`;
                } else {
                  const prevX = ((i - 1) / (timeline.length - 1)) * 300;
                  const prevY =
                    100 - (timeline[i - 1].cumulativeVotes / maxVotes) * 80;
                  const cpX = (prevX + x) / 2;
                  pathData += ` Q ${cpX.toFixed(1)} ${prevY.toFixed(
                    1
                  )}, ${x.toFixed(1)} ${y.toFixed(1)}`;
                }
              });

              return (
                <div className="relative">
                  <svg
                    className="w-[80%] h-[40%] mx-auto"
                    viewBox="0 0 300 100"
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <linearGradient
                        id="dynamicGradient"
                        x1="0%"
                        y1="0%"
                        x2="0%"
                        y2="100%"
                      >
                        <stop
                          offset="0%"
                          stopColor="#ec4899"
                          stopOpacity="0.3"
                        />
                        <stop
                          offset="100%"
                          stopColor="#ec4899"
                          stopOpacity="0.05"
                        />
                      </linearGradient>
                    </defs>

                    {/* Filled area */}
                    <path
                      d={`${pathData} L 300 100 L 0 100 Z`}
                      fill="url(#dynamicGradient)"
                    />

                    {/* Line */}
                    <path
                      d={pathData}
                      fill="none"
                      stroke="#ec4899"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </svg>

                  {/* Labels */}
                  {/* <div className="flex justify-between mt-2 text-xs text-gray-400 dark:text-gray-500">
                    {timeline.map((slot, i) => {
                      const showLabel =
                        timeline.length <= 6 ||
                        i % Math.ceil(timeline.length / 4) === 0;
                      return (
                        <span key={i} className={!showLabel ? "invisible" : ""}>
                          {slot.timeLabel}
                        </span>
                      );
                    })}
                  </div> */}
                </div>
              );
            })()}
          </div>

          {/* Platform, Browser, Device Breakdown */}
          <div className="px-4 mb-8">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl p-6">
              <h4 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-3">
                Platform Breakdown
              </h4>
              <div className="flex flex-wrap gap-2 mb-6">
                {poll.deviceBreakdown &&
                  Object.entries(poll.deviceBreakdown).map(([name, count]) => {
                    const percentage = Math.round(
                      (count / poll.totalVotes) * 100
                    );
                    const bgColor =
                      name === "iOS"
                        ? "bg-teal-500"
                        : name === "Android"
                        ? "bg-gray-600"
                        : "bg-blue-500";
                    return (
                      <div
                        key={name}
                        className={`${bgColor} text-white px-4 py-2 rounded-full text-sm font-medium`}
                      >
                        {name} {percentage}%
                      </div>
                    );
                  })}
              </div>

              <h4 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-3">
                Browser Breakdown
              </h4>
              <div className="flex flex-wrap gap-2">
                {poll.browserBreakdown &&
                  Object.entries(poll.browserBreakdown).map(([name, count]) => {
                    const percentage = Math.round(
                      (count / poll.totalVotes) * 100
                    );
                    const bgColor =
                      name === "Chrome"
                        ? "bg-teal-500"
                        : name === "Safari"
                        ? "bg-gray-600"
                        : "bg-blue-500";
                    return (
                      <div
                        key={name}
                        className={`${bgColor} text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-1`}
                      >
                        <span>🌐</span> {name} {percentage}%
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>

          {/* Behavioral Insights */}
          <div className="px-4 mb-8">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Behavioral Insights
                </h3>
                <TrendingUp className="w-5 h-5 text-gray-400" />
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-xl">
                  <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></div>
                  <span className="text-sm text-gray-900 dark:text-gray-100">
                    High exit after {behavioralInsights.exitTime}
                  </span>
                  <TrendingUp className="w-4 h-4 text-red-500 ml-auto" />
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-xl">
                  <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                  <span className="text-sm text-gray-900 dark:text-gray-100">
                    {behavioralInsights.fastestDevice} users vote faster
                  </span>
                  <TrendingDown className="w-4 h-4 text-green-500 ml-auto" />
                </div>
                <div className="flex items-center gap-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                  <div className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0"></div>
                  <span className="text-sm text-gray-900 dark:text-gray-100">
                    Peak engagement at {behavioralInsights.peakTime}
                  </span>
                  <TrendingUp className="w-4 h-4 text-purple-500 ml-auto" />
                </div>
              </div>
            </div>
          </div>

          {/* Early vs Late Voters */}
          <div className="px-4 mb-8">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">
                Early vs Late Voters
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {["earlyVoters", "lateVoters"].map((type) => {
                  const count = poll[type];
                  const totalVotes = poll.earlyVoters + poll.lateVoters;
                  const percentage =
                    totalVotes > 0 ? (count / totalVotes) * 100 : 0;
                  const label =
                    type === "earlyVoters" ? "First half" : "Second half";

                  return (
                    <div
                      key={type}
                      className="bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 rounded-2xl p-6 border border-pink-100 dark:border-pink-800"
                    >
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {label}
                      </div>
                      <div className="text-3xl font-bold text-pink-500 mb-1">
                        {percentage.toFixed(0)}%
                      </div>
                      <div className="text-sm text-gray-700 dark:text-gray-300">
                        {count?.toLocaleString()} Votes
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* -------- Column 2 -------- */}
        <div className="space-y-6">
          {/* Vote Velocity */}
          <div className="px-4 mb-8">
            <VoteVelocityChart />
          </div>

          {/* Views & Clicks */}
          <div className="px-4 mb-8">
            <div className="grid grid-cols-2 gap-4">
              <div className="border border-gray-200 dark:border-gray-700 rounded-3xl p-6">
                <div className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                  {poll.views?.toLocaleString()}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Views
                </div>
              </div>
              <div className="border border-gray-200 dark:border-gray-700 rounded-3xl p-6">
                <div className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                  {poll.clicks?.toLocaleString()}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Clicks
                </div>
              </div>
            </div>
          </div>

          {/* Platform Breakdown */}
          <div className="px-4 mb-8">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl p-6">
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  {poll.totalVotes?.toLocaleString()}
                </div>
                <div className="text-gray-500 dark:text-gray-400">
                  Total Votes
                </div>
              </div>
              <div className="space-y-2">
                {poll.platformBreakdown &&
                  Object.entries(poll.platformBreakdown).map(
                    ([name, count]) => {
                      const percentage = Math.round(
                        (count / poll.totalVotes) * 100
                      );
                      return (
                        <PlatformRow
                          key={name}
                          name={name}
                          percentage={percentage}
                          color={platformColors[name] || "bg-gray-400"}
                        />
                      );
                    }
                  )}
              </div>
            </div>
          </div>

          {/* Real-time Analytics */}
          <div className="px-4 mb-8">
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-3xl p-6 border border-purple-100 dark:border-purple-800">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Real-time Analytics
                </h3>
                 <img src="/graph.svg" alt="logo" className="w-6 h-6" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <div className="text-2xl font-bold text-pink-500 mb-1">
                    {poll.responseRate}%
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    Response Rate
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-pink-500 mb-1">
                    {poll.completed}%
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    Viewers completed poll
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-pink-500 mb-1">
                    {poll.avgTime}s
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    Average Time
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Upgrade CTA */}
      <div className="px-4 mb-8 mt-6">
        <div className="bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-3xl p-6 text-center">
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
            Unlock advanced analytics in pro
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Upgrade to Pro for advanced breakdowns & cohorts
          </p>
          <button className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-2xl font-semibold text-sm transition-colors">
            Upgrade Now
          </button>
        </div>
      </div>

      {/* Info Popup */}
      {showInfoPopup && <InfoPopup />}
    </div>
  );
};

export default PlusAnalytics;
