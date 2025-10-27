import React, { useState, useEffect } from "react";
import { ArrowLeft, Bell } from "lucide-react";
// import { trendingData } from "../data/trendingData";
import { categorizePolls } from "../utils/trendingAlgorithm";

export default function TrendingPolls() {
  const [selectedTab, setSelectedTab] = useState("All");
  const [votedPolls, setVotedPolls] = useState(new Set());
  const [selectedPoll, setSelectedPoll] = useState(null);
  const [isVoting, setIsVoting] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [categorizedPolls, setCategorizedPolls] = useState([]);
  const [tabs, setTabs] = useState(["All"]);
  const [searchQuery, setSearchQuery] = useState("");
  const isDesktop = useBreakpoint();
  useEffect(() => {
    async function fetchPolls() {
      try {
        const res = await fetch("/api/polls"); // call backend API
        const dbPolls = await res.json();

        // Map database polls to trendingData structure and categorize
        const mappedPolls = dbPolls.map((poll) => ({
          id: poll._id || poll.id,
          question: poll.question,
          options: poll.options,
          votes: poll.votes || 0,
          daysLeft: poll.daysLeft || null,
          imageUrl: poll.imageUrl || null,
          category: null // will assign next
        }));

        const categorized = categorizePolls(mappedPolls);
        setCategorizedPolls(categorized);

        // Generate tabs dynamically
        const categorySet = new Set(categorized.map((poll) => poll.category));
        setTabs(["All", ...Array.from(categorySet)]);
      } catch (err) {
        console.error("Failed to fetch polls:", err);
      }
    }

    fetchPolls();
  }, []);

  const filteredPolls =
    selectedTab === "All"
      ? categorizedPolls
      : categorizedPolls.filter((poll) => poll.category === selectedTab);

  const searchedPolls = filteredPolls.filter(
    (poll) =>
      poll.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      poll.options.some((opt) =>
        opt.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  // Voting & modal logic stays same...
  const handlePollClick = (poll) => {
    setSelectedPoll(poll);
    setSelectedOption(null);
  };

  const handleVote = (pollId) => {
    if (!selectedOption) return;
    setIsVoting(true);
    setVotedPolls((prev) => new Set([...prev, pollId]));
    setTimeout(() => {
      setSelectedPoll(null);
      setIsVoting(false);
      setSelectedOption(null);
    }, 2000);
  };

  const closeModal = () => {
    if (!isVoting) setSelectedPoll(null);
  };

  return (
    <div className="mx-auto bg-white min-h-screen max-w-md sm:max-w-lg lg:max-w-2xl">
      {/* Sticky Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-100">
        <div className="flex items-center justify-between p-4">
          <ArrowLeft className="w-6 h-6 text-gray-700" />
          <h1 className="text-lg font-semibold text-gray-900">Trending</h1>
          <Bell className="w-6 h-6 text-gray-700" />
        </div>

        {/* Search */}

        <div className="px-4 pb-2">
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Search trending polls"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-4 pr-10 py-2.5 bg-white rounded-full border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
            />
            {/* Gradient Search Icon */}
            <div className="absolute right-3">
              <img
                src="search.svg"
                alt="Search"
                className="w-5 h-5"
                style={{
                  background: "linear-gradient(to right, #3b82f6, #ec4899)", // blue → pink
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-4 pb-4">
          <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`px-8 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  selectedTab === tab
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Polls */}
      <div className="px-4 space-y-4 pb-24 pt-4">
        {searchedPolls.length > 0 ? (
          searchedPolls.map((poll) => (
            <div
              key={poll.id}
              className="bg-white rounded-xl border border-gray-100 overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handlePollClick(poll)}
            >
              {poll.imageUrl && (
                <img
                  src={poll.imageUrl}
                  alt=""
                  className="w-full h-40 sm:h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h3 className="font-medium mb-3 pr-4">{poll.question}</h3>
                <div className="space-y-2 mb-3">
                  {poll.options.map((option, index) => (
                    <div
                      key={index}
                      className="w-full border rounded-full px-4 py-2 text-left text-gray-700 bg-gray-50 truncate"
                    >
                      {option}
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  {poll.daysLeft && <span>{poll.daysLeft} Days Left</span>}
                  {/* Combined Social Media Icon */}
                  <div className="flex items-center ml-auto">
                    <div className="relative w-10 h-6">
                      <img
                        src="/facebook.svg"
                        alt="Facebook"
                        className="absolute left-4 top-0 w-6 h-6 rounded-full border-2 border-white shadow z-10"
                      />
                      <img
                        src="/instagram.svg"
                        alt="Instagram"
                        className="absolute left-0 top-0 w-6 h-6 rounded-full border-2 border-white shadow z-0"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 py-10">
            <p className="text-sm">No results found for your search.</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedPoll && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-xl w-full max-w-md sm:max-w-lg mx-auto overflow-hidden shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {selectedPoll.imageUrl && (
              <img
                src={selectedPoll.imageUrl}
                alt=""
                className="w-full h-48 sm:h-64 object-cover"
              />
            )}

            <div className="p-6">
              <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-4">
                {selectedPoll.question}
              </h3>

              <div className="space-y-3 mb-6">
                {selectedPoll.options.map((option, index) => (
                  <div
                    key={index}
                    onClick={() =>
                      !votedPolls.has(selectedPoll.id) &&
                      setSelectedOption(option)
                    }
                    className={`cursor-pointer w-full border rounded-full px-4 py-2 text-left text-gray-700 bg-gray-50 truncate transition-all ${
                      selectedOption === option
                        ? "bg-purple-100 text-purple-700 border-purple-300"
                        : "bg-gray-50 text-gray-700 border-gray-200"
                    }`}
                  >
                    {option}
                  </div>
                ))}
              </div>

              {!votedPolls.has(selectedPoll.id) && (
                <button
                  onClick={() => handleVote(selectedPoll.id)}
                  disabled={isVoting || !selectedOption}
                  className={`w-full py-3 rounded-lg font-medium transition-all ${
                    !selectedOption
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:opacity-90"
                  }`}
                >
                  {isVoting ? "Voting..." : "Vote Now"}
                </button>
              )}

              {selectedPoll.daysLeft && (
                <p className="text-xs text-gray-500 mt-3 text-center">
                  {selectedPoll.daysLeft} Days Left
                </p>
              )}

              {votedPolls.has(selectedPoll.id) && (
                <div className="text-center text-green-600 font-medium mt-4">
                  ✓ Vote Submitted!
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 w-full">
        <div className="bg-white border-t border-gray-200 px-6 py-2">
          <div className="flex items-center justify-around">
            <div className="flex flex-col items-center py-2">
              <div className="w-6 h-6 bg-gray-200 rounded mb-1"></div>
              <span className="text-xs text-gray-500">Trending</span>
            </div>
            <div className="flex flex-col items-center py-2">
              <div className="w-6 h-6 bg-pink-500 rounded mb-1"></div>
              <span className="text-xs text-pink-500">Trending</span>
            </div>
            <div className="flex flex-col items-center py-2">
              <div className="w-6 h-6 bg-gray-200 rounded mb-1"></div>
              <span className="text-xs text-gray-500">Analytics</span>
            </div>
            <div className="flex flex-col items-center py-2">
              <div className="w-6 h-6 bg-gray-200 rounded mb-1"></div>
              <span className="text-xs text-gray-500">Profile</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
