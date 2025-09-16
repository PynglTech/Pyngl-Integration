// src/pages/Analytics.js
import React, { useEffect, useState } from "react";
import { ArrowLeft, Bell, Filter } from "lucide-react";
import FilterDrawer from "../components/FilterDrawer";
import PollDetailPopup from "../components/PollDetailPopup"; // ✅ import popup

export default function Analytics() {
  const [activeTab, setActiveTab] = useState("My Pings");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [statusFilter, setStatusFilter] = useState("All");
  const [platformFilter, setPlatformFilter] = useState("All");
  const [selectedPoll, setSelectedPoll] = useState(null); // ✅ popup state

  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);

  // sample data (replace with API data)
  useEffect(() => {
    const fetchPolls = async () => {
      try {
        setLoading(true);
        const res = await fetch("https://your-api.com/polls"); // replace with your API
        const data = await res.json();

        // Example API shape adjustment
        // Ensure each poll has: id, question, options[], daysLeft, status, platform, participated, imageUrl
        setPolls(data);
      } catch (err) {
        console.error("Error fetching polls:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPolls();
  }, []);
  // tab filtering
  const filteredByTab =
    activeTab === "My Pings"
      ? polls.filter((p) => !p.participated) // user-created polls
      : polls.filter((p) => p.participated); // polls user participated
  // apply search + filters
  const finalPolls = filteredByTab.filter((poll) => {
    const matchSearch =
      poll.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      poll.options.some((o) =>
        o.text.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchStatus = statusFilter === "All" || poll.status === statusFilter;
    const matchPlatform =
      platformFilter === "All" || poll.platform === platformFilter;

    return matchSearch && matchStatus && matchPlatform;
  });

  return (
    <div className="mx-auto bg-white min-h-screen max-w-md sm:max-w-lg lg:max-w-2xl">
      {/* Sticky Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-100">
        <div className="flex items-center justify-between p-4">
          <ArrowLeft className="w-6 h-6 text-gray-700" />
          <h1 className="text-lg font-semibold text-gray-900">Analytics</h1>
          <Bell className="w-6 h-6 text-gray-700" />
        </div>
      </div>

      {/* Tabs & Filter */}
      <div className="flex items-center justify-between px-4 mt-2">
        <div className="flex bg-gray-100 rounded-full p-1 space-x-1 flex-1 mr-3">
          {["My Pings", "Participate Pings"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 px-4 py-2 text-sm font-medium rounded-full transition-all ${
                activeTab === tab
                  ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow"
                  : "text-gray-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Filter Icon */}
        <button
          onClick={() => setShowFilter(true)}
          className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200"
        >
          <Filter className="w-5 h-5" style={{ stroke: "url(#grad1)" }} />
          {/* Gradient Definition */}
          <svg width="0" height="0">
            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
          </svg>
        </button>
      </div>

      {/* Search */}
      <div className="px-4 mt-3">
        <div className="relative">
          <input
            type="text"
            placeholder="Search by keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-4 pr-10 py-3 bg-white rounded-full border border-gray-200 text-sm placeholder-gray-400 focus:outline-none"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="url(#grad2)"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <svg width="0" height="0">
              <defs>
                <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>

      {/* Poll Cards */}
      <div className="mt-3 px-4 space-y-4 pb-24 pt-4">
        {finalPolls.length === 0 && (
          <p className="text-center text-gray-500 mt-10">No results found</p>
        )}

        {finalPolls.map((poll) => {
          const totalVotes = poll.options.reduce((sum, o) => sum + o.votes, 0);

          return (
            <div
              key={poll.id}
              className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm cursor-pointer hover:shadow-md transition"
              onClick={() => setSelectedPoll(poll)} // ✅ open popup
            >
              {poll.imageUrl && (
                <img
                  src={poll.imageUrl}
                  alt=""
                  className="w-full h-40 sm:h-48 object-cover"
                />
              )}

              <div className="p-4">
                <h3 className="font-medium mb-3">{poll.question}</h3>

                <div className="space-y-2 mb-3">
                  {poll.options.map((option, index) => {
                    const percent =
                      totalVotes > 0
                        ? Math.round((option.votes / totalVotes) * 100)
                        : 0;

                    return (
                      <div key={index}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-700">{option.text}</span>
                          <span className="text-gray-500">{percent}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="h-2 rounded-full bg-gradient-to-r from-blue-400 to-pink-400"
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-between text-xs text-gray-500">
                  {poll.daysLeft && <span>{poll.daysLeft} Days Left</span>}
                  <span>{poll.platform}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Filter Drawer */}
      {showFilter && (
        <FilterDrawer
          show={showFilter}
          setShow={setShowFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          platformFilter={platformFilter}
          setPlatformFilter={setPlatformFilter}
        />
      )}

      {/* Poll Detail Popup */}
      {selectedPoll && (
        <PollDetailPopup
          poll={selectedPoll}
          onClose={() => setSelectedPoll(null)}
          onSeeAnalytics={() => alert("Go to Analytics for " + selectedPoll.id)}
        />
      )}
    </div>
  );
}
