import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Bell } from "lucide-react";
import apiClient from "../../api/axiosConfig";
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
    daysLeft: timeLeftDisplay, // formatted display
    msLeft: Math.max(0, timeDiffMs), // ✅ raw milliseconds for live indicator
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
  console.log("🚀 ~ BasicAnalytics ~ pollId:", pollId);
  // Check for the Router context error and mock navigate if necessary
  let navigate = () => {};
  try {
    navigate = useNavigate();
  } catch (e) {
    console.error(
      "useNavigate failed (no Router context). Using mock navigation."
    );
    // Mock the navigate function for environments without a Router
    navigate = (path) => {
      if (typeof path === "number") {
        console.log(`MOCK NAVIGATE: Going back ${-path} steps.`);
      } else {
        console.log(`MOCK NAVIGATE: Navigating to ${path}.`);
      }
    };
  }

  const [poll, setPoll] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await apiClient.get(`/api/polls/${pollId}/analytics`);
        console.log("🚀 ~ fetchAnalytics ~ rawPollData:", res.data);

        // Enhance the data with dynamic and calculated fields
        const enhancedData = enhancePollDataDynamic(res.data);
        console.log("🚀 ~ fetchAnalytics ~ enhancedData:", enhancedData);

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
    return <div className="text-center py-10">Loading analytics...</div>;
  }

  if (!poll) {
    return <div className="text-center py-10">No analytics found.</div>;
  }

  // ---- Sub components ----
  const PlatformRow = ({ name, percentage, color }) => (
    <div className="flex flex-col justify-start py-4 ">
      <div className="flex items-center space-x-3 justify-between">
        <div className="flex items-center justify-center gap-3">
          {name === "Instagram" && (
            <span className="text-pink-500">
              <img src="/icons/Instagram.svg" alt="Instagram" />
            </span>
          )}
          {name === "LinkedIn" && (
            <span className="text-blue-600">
              <img src="/icons/LinkedIn.svg" alt="LinkedIn" />
            </span>
          )}
          {name === "WhatsApp" && (
            <span className="text-green-500">
              <img src="/icons/WhatsApp.svg" alt="WhatsApp" />
            </span>
          )}
          {name === "Twitter" && (
            <span className="text-blue-400">
              <img src="/icons/Twitter.svg" alt="Twitter" />
            </span>
          )}
          {name === "Youtube" && (
            <span className="text-blue-400">
              <img src="/icons/Youtube.svg" alt="Youtube" />
            </span>
          )}
          {name === "Telegram" && (
            <span className="text-blue-400">
              <img src="/icons/Telegram.svg" alt="Telegram" />
            </span>
          )}
          {name === "iMessages" && (
            <span className="text-blue-400">
              <img src="/icons/iMessages.svg" alt="iMessages" />
            </span>
          )}
          {name === "Gmail" && (
            <span className="text-blue-400">
              <img src="/icons/Mail.svg" alt="Gmail" />
            </span>
          )}
          {name === "Messages" && (
            <span className="text-blue-400">
              <img src="/icons/Messages.svg" alt="Messages" width="18" height="18" />
            </span>
          )}
          {name === "Facebook" && (
            <span className="text-blue-400">
              <img src="/icons/Facebook.svg" alt="Facebook" />
            </span>
          )}
          {/* Fallback for mocked names */}
          {![
            "Instagram",
            "LinkedIn",
            "WhatsApp",
            "Twitter",
            "Youtube",
            "Telegram",
            "iMessages",
            "Gmail",
            "Messages",
          ].includes(name) && <span className="text-gray-500">🔗</span>}
          <span className="text-gray-900 font-medium">{name}</span>
        </div>
        <div className="flex items-center justify-center">
          <span className="text-gray-900 font-semibold w-8 text-right">
            {percentage}%
          </span>
        </div>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-4 shadow-inner mt-3">
        <div
          className={`h-4 rounded-full transition-all duration-300 shadow-sm ${color}`}
          // Clamp percentage between 0 and 100 for safe rendering
          style={{
            width: `${Math.min(100, Math.max(0, percentage))}%`,
            background: `linear-gradient(135deg, ${getGlassyColor(
              color
            )} 0%, ${getDarkerColor(color)} 100%)`,
            boxShadow:
              "inset 0 1px 0 rgba(255, 255, 255, 0.3), 0 1px 2px rgba(0, 0, 0, 0.1)",
          }}
        />
      </div>
    </div>
  );
  const getGlassyColor = (colorClass) => {
    const colorMap = {
      "bg-pink-500": "#ec4899",
      "bg-blue-600": "#2563eb",
      "bg-green-500": "#22c55e",
      "bg-blue-400": "#60a5fa",
      "bg-red-500": "#ef4444",
      "bg-sky-500": "#0ea5e9",
      "bg-indigo-500": "#6366f1",
      "bg-yellow-500": "#eab308",
      "bg-purple-500": "#a855f7",
      "bg-blue-700": "#1d4ed8",
    };
    return colorMap[colorClass] || "#6b7280";
  };

  const getDarkerColor = (colorClass) => {
    const colorMap = {
      "bg-pink-500": "#be185d",
      "bg-blue-600": "#1d4ed8",
      "bg-green-500": "#16a34a",
      "bg-blue-400": "#3b82f6",
      "bg-red-500": "#b91c1c",
      "bg-sky-500": "#0369a1",
      "bg-indigo-500": "#4338ca",
      "bg-yellow-500": "#ca8a04",
      "bg-purple-500": "#7e22ce",
      "bg-blue-700": "#1e3a8a",
    };
    return colorMap[colorClass] || "#4b5563";
  };

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="flex items-center justify-between p-4">
          <button onClick={() => navigate(-1)} className="p-1">
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">
            Basic analytics
          </h1>
          <Bell className="w-6 h-6 text-gray-700" />
        </div>
      </div>

      {/* Poll Question */}
      <div className="bg-white">
        <div className="px-6 pt-6 pb-4 border-b border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            {poll.question}
          </h2>
          <div className="flex items-center space-x-2">
            <div
              className={`w-2 h-2 rounded-full ${
                poll.msLeft === 0
                  ? "bg-gray-400" // expired
                  : poll.msLeft < 1000 * 60 * 60
                  ? "bg-red-500" // <1 hour
                  : poll.msLeft < 1000 * 60 * 60 * 24
                  ? "bg-orange-500" // <1 day
                  : "bg-green-500" // >1 day
              }`}
            ></div>
            <span className="text-sm text-gray-600">{poll.daysLeft}</span>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="px-6 pb-6 mt-3">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-6 text-start">
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {poll.views?.toLocaleString()}
              </div>
              <div className="text-sm text-gray-500">Views</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 text-start">
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {poll.clicks?.toLocaleString()}
              </div>
              <div className="text-sm text-gray-500">Clicks</div>
            </div>
          </div>
        </div>

        {/* Real-time Analytics */}
        <div className="mx-6 mb-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Real-time Analytics
            </h3>
            <span className="text-purple-500">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M16 16H0V0H16V16Z" stroke="#E5E7EB" />
                <path
                  d="M2 2C2 1.44687 1.55313 1 1 1C0.446875 1 0 1.44687 0 2V12.5C0 13.8813 1.11875 15 2.5 15H15C15.5531 15 16 14.5531 16 14C16 13.4469 15.5531 13 15 13H2.5C2.225 13 2 12.775 2 12.5V2ZM14.7063 4.70625C15.0969 4.31563 15.0969 3.68125 14.7063 3.29063C14.3156 2.9 13.6812 2.9 13.2906 3.29063L10 6.58437L8.20625 4.79063C7.81563 4.4 7.18125 4.4 6.79063 4.79063L3.29063 8.29062C2.9 8.68125 2.9 9.31563 3.29063 9.70625C3.68125 10.0969 4.31563 10.0969 4.70625 9.70625L7.5 6.91563L9.29375 8.70938C9.68437 9.1 10.3188 9.1 10.7094 8.70938L14.7094 4.70937L14.7063 4.70625Z"
                  fill="#7B4CFF"
                />
              </svg>
            </span>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-pink-500 mb-1">
                {poll.responseRate}
              </div>
              <div className="text-xs text-gray-600">Response Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-pink-500 mb-1">
                {poll.completed}
              </div>
              <div className="text-xs text-gray-600">Viewers completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-pink-500 mb-1">
                {poll.avgTime}
              </div>
              <div className="text-xs text-gray-600">Avg. Time</div>
            </div>
          </div>
        </div>
      </div>

      {/* Total Votes */}
      <div className="bg-white px-6 py-8 border border-gray-100 rounded-2xl mx-6 shadow-sm">
        <div className="text-center mb-8">
          <div className="text-5xl font-bold text-gray-900 mb-2">
            {poll.totalVotes?.toLocaleString()}
          </div>
          <div className="text-gray-500">Total Votes</div>
        </div>

        <div className="mt-2">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">
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
                  color={platformColors[name] || "bg-gray-400"} // fallback gray
                />
              );
            })}
        </div>
      </div>

      {/* Early vs Late Voters */}
      <div className="bg-white px-6 py-6 mt-4 border border-gray-100 rounded-2xl mx-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Early vs Late Voters
        </h3>
        <div className="grid grid-cols-2 gap-8">
          {["earlyVoters", "lateVoters"].map((type, idx) => {
            const count = poll[type];
            const totalVotes = poll.earlyVoters + poll.lateVoters;
            const percentage = totalVotes > 0 ? (count / totalVotes) * 100 : 0;

            const label = type === "earlyVoters" ? "First half" : "Second half";

            return (
              <div
                key={type}
                className="text-center mx-1 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100"
              >
                <div className="text-sm text-gray-600 mb-2">{label}</div>
                <div className="text-3xl font-bold text-pink-500 mb-1">
                  {percentage.toFixed(1)}%
                </div>
                <div className="text-sm text-gray-700">
                  {count?.toLocaleString()} Votes
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/*  Breakdown */}
      <div className="bg-white px-6 py-6 mt-4 border border-gray-100 rounded-2xl mx-6 shadow-sm">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">
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
                  className="border border-gray-300 text-gray-600 px-4 py-2 rounded-full text-sm font-medium"
                >
                  🌐 {name} {percentage}%
                </div>
              );
            })}
        </div>
        <h4 className="text-lg font-semibold text-gray-900 mb-4 mt-4">
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
                  className="border border-gray-300 text-gray-600 px-4 py-2 rounded-full text-sm font-medium"
                >
                  🌐 {name} {percentage}%
                </div>
              );
            })}
        </div>
      </div>

      {/* Upgrade CTA */}
      <div className="bg-gradient-to-r from-purple-100 to-blue-100 mx-6 my-6 rounded-2xl p-6 text-center">
        <h3 className="text-lg font-bold text-gray-900 mb-2">
          Unlock advanced analytics in Plus
        </h3>
        <p className="text-sm text-gray-600 mb-4">
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