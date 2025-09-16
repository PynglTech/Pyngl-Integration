// frontend/src/components/PollDetailPopup.js
import React from "react";
import { X, Calendar, Users } from "lucide-react";

export default function PollDetailPopup({ poll, onClose, onSeeAnalytics }) {
  if (!poll) return null;

  const totalVotes = poll.options.reduce(
    (sum, option) => sum + option.votes,
    0
  );
  const isLive = poll.status === "Live";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Poll Card */}
        <div className="p-4">
          {/* Status Badge */}
          <div className="flex items-center justify-between mb-3">
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                isLive
                  ? "bg-red-100 text-red-700 border border-red-200"
                  : "bg-gray-100 text-gray-600 border border-gray-200"
              }`}
            >
              {poll.status}
            </span>
            <span className="text-xs text-gray-500">{poll.createdAt}</span>
          </div>

          {/* Poll Image */}
          {poll.imageUrl && (
            <img
              src={poll.imageUrl}
              alt=""
              className="w-full h-40 object-cover rounded-xl mb-4"
            />
          )}

          {/* Poll Question */}
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            {poll.question}
          </h2>

          {/* Poll Options */}
          <div className="space-y-3 mb-6">
            {poll.options.map((option, index) => {
              const percentage =
                totalVotes > 0
                  ? Math.round((option.votes / totalVotes) * 100)
                  : 0;

              return (
                <div key={index} className="relative">
                  {/* Progress Bar Background */}
                  <div className="w-full bg-gray-100 rounded-full h-12 relative overflow-hidden">
                    {/* Progress Fill with Gradient */}
                    <div
                      className="h-full rounded-left-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 transition-all duration-700 ease-out flex items-center"
                      style={{ width: `${percentage}%` }}
                    >
                      {/* Option Text inside the bar */}
                      <span className="text-white font-semibold text-sm ml-4 z-10">
                        {option.text}
                      </span>
                    </div>

                    {/* Percentage positioned at the right */}
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                      <span className="text-gray-700 font-bold text-sm">
                        {percentage}%
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* See Analytics Button */}
          <button
            onClick={onSeeAnalytics}
            className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-full shadow-md hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 active:scale-[0.98]"
          >
            See Analytics
          </button>

          {/* Stats */}
          <div className="mt-6 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>Total votes: {totalVotes}</span>
              </div>

              {isLive && poll.daysLeft && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{poll.daysLeft} Days Left</span>
                </div>
              )}

              {!isLive && (
                <span className="text-gray-500 font-medium">Closed</span>
              )}
            </div>

            {poll.platform && (
              <div className="mt-2 text-xs text-gray-500">
                Platform: {poll.platform}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
