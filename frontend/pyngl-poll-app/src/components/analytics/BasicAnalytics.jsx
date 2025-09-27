import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Bell } from "lucide-react";
import apiClient from '../../api/axiosConfig';

const BasicAnalytics = () => {
  const { pollId } = useParams();
  console.log("🚀 ~ BasicAnalytics ~ pollId:", pollId)
  const navigate = useNavigate();
  const [poll, setPoll] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await apiClient.get(`/api/polls/${pollId}/analytics`);
        console.log("🚀 ~ fetchAnalytics ~ res:", res)
        setPoll(res.data);
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
    <div className="flex items-center justify-between py-4">
      <div className="flex items-center space-x-3">
        <div className="w-6 h-6 flex items-center justify-center">
          {name === "Instagram" && <span className="text-pink-500">📷</span>}
          {name === "LinkedIn" && <span className="text-blue-600">💼</span>}
          {name === "WhatsApp" && <span className="text-green-500">💬</span>}
          {name === "Twitter" && <span className="text-blue-400">🐦</span>}
        </div>
        <span className="text-gray-900 font-medium">{name}</span>
      </div>
      <div className="flex items-center space-x-3">
        <div className="w-32 bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full ${color}`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        <span className="text-gray-900 font-semibold w-8 text-right">
          {percentage}%
        </span>
      </div>
    </div>
  );

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen">
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
        <div className="px-6 pt-6 pb-4">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            {poll.question}
          </h2>
          <div className="flex items-center space-x-2 mb-6">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Live</span>
            </div>
            <span className="text-sm text-gray-400">•</span>
            <span className="text-sm text-gray-600">{poll.daysLeft} days left</span>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="px-6 pb-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {poll.views?.toLocaleString()}
              </div>
              <div className="text-sm text-gray-500">Views</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 text-center">
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
            <span className="text-purple-500">📊</span>
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
      <div className="bg-white px-6 py-8">
        <div className="text-center mb-8">
          <div className="text-5xl font-bold text-gray-900 mb-2">
            {poll.totalVotes?.toLocaleString()}
          </div>
          <div className="text-gray-500">Total Votes</div>
        </div>

        {/* Platform Breakdown */}
        <div className="space-y-1">
          {poll.platformBreakdown &&
            Object.entries(poll.platformBreakdown).map(([name, count]) => {
              const total = poll.totalVotes || 1;
              const percentage = Math.round((count / total) * 100);
              return (
                <PlatformRow
                  key={name}
                  name={name}
                  percentage={percentage}
                  color="bg-blue-500"
                />
              );
            })}
        </div>
      </div>

      {/* Early vs Late Voters */}
      <div className="bg-white px-6 py-6 border-t border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Early vs Late Voters
        </h3>
        <div className="grid grid-cols-2 gap-8">
          <div className="text-center">
            <div className="text-sm text-gray-600 mb-2">First half</div>
            <div className="text-3xl font-bold text-pink-500 mb-1">
              {poll.earlyVoters}
            </div>
            <div className="text-xs text-gray-400">Votes</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-600 mb-2">Second half</div>
            <div className="text-3xl font-bold text-pink-500 mb-1">
              {poll.lateVoters}
            </div>
            <div className="text-xs text-gray-400">Votes</div>
          </div>
        </div>
      </div>

      {/* Browser Breakdown */}
      <div className="bg-white px-6 py-6 border-t border-gray-100">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">
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
