import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Bell } from "lucide-react";
import apiClient from "../../api/axiosConfig";
import useNotificationStore from "../../store/useNotificationStore";
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
        ? ((rawData.totalVotes / rawData.views) * 100).toFixed(2) + "%"
        : "0%",
    avgTime:
      rawData.totalVotes > 0
        ? `${Math.round(rawData.totalTimeSpent / rawData.totalVotes)}s`
        : "0s",
    platformBreakdown: rawData.platformBreakdown || {},
    browserBreakdown: rawData.browserBreakdown || {},
    deviceBreakdown: rawData.deviceBreakdown || {},
    earlyVoters: rawData.earlyVoters || 0,
    lateVoters: rawData.lateVoters || 0,
    completed: rawData.completed || 0,
    daysLeft: timeLeftDisplay,
    msLeft: Math.max(0, timeDiffMs),
  };
};

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

// -----------------------------------------------------------

const BasicAnalytics = () => {
  const { pollId } = useParams();
  let navigate = useNavigate();

  const [poll, setPoll] = useState(null);
  const [loading, setLoading] = useState(true);

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

  // ---- Sub components ----
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

  return (
    <div className="mx-auto bg-white dark:bg-gray-900 min-h-screen w-full md:w-7/6 lg:w-4/5 xl:w-3/4 2xl:w-2/3 transition-all duration-300 pb-28">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between p-4">
          <button onClick={() => navigate(-1)} className="p-1">
            <ArrowLeft className="w-6 h-6 text-gray-700 dark:text-gray-200" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Basic analytics
          </h1>
          <button
            onClick={() => navigate("/notifications")}
            className="relative p-1"
          >
            <Bell className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Poll Question */}
      <div className="px-4 py-6 mx-4 border-b border-gray-100 dark:border-gray-700">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
          {poll.question}
        </h2>
        <div className="flex items-center space-x-2">
          <div
            className={`w-2 h-2 rounded-full ${
              poll.msLeft === 0
                ? "bg-gray-400"
                : poll.msLeft < 1000 * 60 * 60
                ? "bg-red-500"
                : poll.msLeft < 1000 * 60 * 60 * 24
                ? "bg-orange-500"
                : "bg-green-500"
            }`}
          ></div>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {poll.daysLeft}
          </span>
        </div>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 py-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Stats Cards: Views & Clicks */}
          <div className="grid grid-cols-2 gap-4">
            <div className="border border-gray-200 dark:border-gray-700 rounded-3xl p-6 text-start">
              <div className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                {poll.views?.toLocaleString()}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Views
              </div>
            </div>
            <div className="border border-gray-200 dark:border-gray-700 rounded-3xl p-6 text-start">
              <div className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                {poll.clicks?.toLocaleString()}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Clicks
              </div>
            </div>
          </div>

          {/* Platform Breakdown */}
          <div className="bg-white dark:bg-gray-800 px-6 py-6 border border-gray-200 dark:border-gray-700 rounded-3xl shadow-sm">
            {/* Total Votes at the top */}
            <div className="text-center mb-6">
              <div className="text-5xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                {poll.totalVotes?.toLocaleString()}
              </div>
              <div className="text-gray-500 dark:text-gray-400">
                Total Votes
              </div>
            </div>

            {/* Platform Breakdown */}
            <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Platform Breakdown
            </h4>
            {poll.platformBreakdown &&
              Object.entries(poll.platformBreakdown).map(([name, count]) => {
                const total = poll.totalVotes || 1;
                const percentage = Math.round((count / total) * 100);
                return (
                  <PlatformRow
                    key={name}
                    name={name}
                    percentage={percentage}
                    color={platformColors[name] || "bg-gray-400"}
                  />
                );
              })}
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Real-time Analytics */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-700 rounded-3xl p-6 border border-purple-100 dark:border-gray-600">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Real-time Analytics
              </h3>
              <img src="/graph.svg" alt="logo" className="w-6 h-6" />
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-pink-500 mb-1">
                  {poll.responseRate}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  Response Rate
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-pink-500 mb-1">
                  {poll.completed}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  Viewers completed
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-pink-500 mb-1">
                  {poll.avgTime}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  Avg. Time
                </div>
              </div>
            </div>
          </div>

          {/* Early vs Late Voters */}
          <div className="bg-white dark:bg-gray-800 px-6 py-6 border border-gray-100 dark:border-gray-700 rounded-3xl shadow-sm">
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
                    className="text-start bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-700 dark:to-gray-600 rounded-2xl p-6 border border-purple-100 dark:border-gray-600"
                  >
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {label}
                    </div>
                    <div className="text-3xl font-bold text-pink-500 mb-1">
                      {percentage.toFixed(1)}%
                    </div>
                    <div className="text-sm text-gray-700 dark:text-gray-300">
                      {count?.toLocaleString()} Votes
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Device & Browser Breakdown */}
          <div className="bg-white dark:bg-gray-800 px-6 py-6 border border-gray-100 dark:border-gray-700 rounded-3xl shadow-sm">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Device Breakdown
            </h4>
            <div className="flex flex-wrap gap-2">
              {poll.deviceBreakdown &&
                Object.entries(poll.deviceBreakdown).map(([name, count]) => {
                  const total = poll.totalVotes || 1;
                  const percentage = Math.round((count / total) * 100);
                  return (
                    <div
                      key={name}
                      className="border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 px-4 py-2 rounded-full text-sm font-medium"
                    >
                      🌐 {name} {percentage}%
                    </div>
                  );
                })}
            </div>

            <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 mt-4">
              Browser Breakdown
            </h4>
            <div className="flex flex-wrap gap-2">
              {poll.browserBreakdown &&
                Object.entries(poll.browserBreakdown).map(([name, count]) => {
                  const total = poll.totalVotes || 1;
                  const percentage = Math.round((count / total) * 100);
                  return (
                    <div
                      key={name}
                      className="border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 px-4 py-2 rounded-full text-sm font-medium"
                    >
                      🌐 {name} {percentage}%
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>

      {/* Upgrade CTA at bottom */}
      <div className="bg-gradient-to-r from-purple-100 to-blue-100 dark:from-gray-800 dark:to-gray-700 mx-4 rounded-3xl p-6 text-center">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
          Unlock advanced analytics in Plus
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Get real-time insights, demographics, and export features
        </p>
        <button className="bg-pink-500 text-white px-8 py-3 rounded-2xl font-semibold text-sm">
          Upgrade Now
        </button>
      </div>
    </div>
  );
};

export default BasicAnalytics;
