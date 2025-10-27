import React, { useState, useEffect } from "react";
import { ArrowLeft, Bell } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import apiClient from "../../api/axiosConfig";

const CreateSegment = () => {
  const navigate = useNavigate();
  const { pollId } = useParams();
  const [segmentName, setSegmentName] = useState("");
  const [pollData, setPollData] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [isApplying, setIsApplying] = useState(false);

  // Filter states
  const [selectedAges, setSelectedAges] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedGenders, setSelectedGenders] = useState([]);
  const [selectedDevices, setSelectedDevices] = useState([]);
  const [selectedBrowsers, setSelectedBrowsers] = useState([]);

  // Preview data
  const [previewData, setPreviewData] = useState({
    totalVotes: 0,
    avgEngagement: 0,
    filteredVoters: [],
  });

  const ageRanges = ["13-17", "18-24", "25-34", "35-44", "45-54", "55+"];
  const locations = ["Gujarat", "MP", "UP", "Assam", "Delhi", "Mumbai"];
  const genders = ["Male", "Female", "Other"];

  useEffect(() => {
    const fetchPollData = async () => {
      try {
        const res = await apiClient.get(`/api/polls/${pollId}/analytics`);
        setPollData(res.data);
      } catch (err) {
        console.error("Failed to fetch poll data:", err);
      }
    };
    if (pollId) fetchPollData();
  }, [pollId]);

  const toggleSelection = (array, setArray, item) => {
    if (array.includes(item)) {
      setArray(array.filter((i) => i !== item));
    } else {
      setArray([...array, item]);
    }
  };

  const handleApplyFilter = async () => {
    setIsApplying(true);
    try {
      const filterPayload = {
        ages: selectedAges,
        locations: selectedLocations,
        genders: selectedGenders,
        devices: selectedDevices,
        browsers: selectedBrowsers,
      };

      const response = await apiClient.post(
        `/api/polls/${pollId}/apply-filter`,
        filterPayload
      );

      setPreviewData({
        totalVotes: response.data.totalVotes,
        avgEngagement: response.data.avgEngagement,
        filteredVoters: response.data.filteredVoters || [],
      });

      setShowPreview(true);
    } catch (error) {
      console.error("Failed to apply filter:", error);
      alert("Failed to apply filter. Please try again.");
    } finally {
      setIsApplying(false);
    }
  };

  const handleExportCSV = () => {
    if (!segmentName.trim()) {
      alert("Please enter a segment name");
      return;
    }

    // Create CSV headers
    const headers = [
      "User ID",
      "Age",
      "Location",
      "Gender",
      "Device",
      "Browser",
      "Voted At",
      "Time Spent (s)",
    ];

    // Create CSV rows from filtered voters
    const rows = previewData.filteredVoters.map((voter) => [
      voter.userId || "Anonymous",
      voter.age || "N/A",
      voter.location || "N/A",
      voter.gender || "N/A",
      voter.device || "N/A",
      voter.browser || "N/A",
      new Date(voter.votedAt).toLocaleString(),
      voter.timeSpent || 0,
    ]);

    // Add summary row
    const summaryRow = [
      "SUMMARY",
      selectedAges.join("; ") || "All",
      selectedLocations.join("; ") || "All",
      selectedGenders.join("; ") || "All",
      selectedDevices.join("; ") || "All",
      selectedBrowsers.join("; ") || "All",
      `Total: ${previewData.totalVotes}`,
      `Avg Engagement: ${previewData.avgEngagement}%`,
    ];

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
      "",
      summaryRow.join(","),
    ].join("\n");

    // Download CSV
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${segmentName.replace(/\s+/g, "_")}_segment.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const devices = pollData?.deviceBreakdown
    ? Object.entries(pollData.deviceBreakdown).map(([name, count]) => ({
        name,
        percentage: Math.round((count / pollData.totalVotes) * 100),
      }))
    : [];

  const browsers = pollData?.browserBreakdown
    ? Object.entries(pollData.browserBreakdown).map(([name, count]) => ({
        name,
        percentage: Math.round((count / pollData.totalVotes) * 100),
      }))
    : [];

  const hasFiltersSelected =
    selectedAges.length > 0 ||
    selectedLocations.length > 0 ||
    selectedGenders.length > 0 ||
    selectedDevices.length > 0 ||
    selectedBrowsers.length > 0;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-48">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="flex items-center justify-between p-4 max-w-md mx-auto">
          <button onClick={() => navigate(-1)} className="p-1">
            <ArrowLeft className="w-6 h-6 text-gray-700 dark:text-gray-200" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </div>
            <h1 className="text-base font-semibold text-gray-900 dark:text-gray-100">
              Create segment
            </h1>
          </div>
          <Bell className="w-6 h-6 text-gray-700 dark:text-gray-200" />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto px-4 py-6">
        {/* Segment Name */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
            Segment name
          </label>
          <input
            type="text"
            value={segmentName}
            onChange={(e) => setSegmentName(e.target.value)}
            placeholder="Enter segment name..."
            maxLength={50}
            className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Required, Max 50 character
          </p>
        </div>

        {/* Audience Filter */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-4">
            Audience filter
          </h3>

          {/* Age */}
          <div className="mb-4">
            <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
              Age
            </label>
            <div className="flex flex-wrap gap-2">
              {ageRanges.map((age) => (
                <button
                  key={age}
                  onClick={() =>
                    toggleSelection(selectedAges, setSelectedAges, age)
                  }
                  className={`px-4 py-2 rounded-2xl text-sm font-medium transition-colors ${
                    selectedAges.includes(age)
                      ? "bg-pink-500 text-white"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                  }`}
                >
                  {age}
                </button>
              ))}
            </div>
          </div>

          {/* Location */}
          <div className="mb-4">
            <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
              Location
            </label>
            <div className="flex flex-wrap gap-2">
              {locations.map((location) => (
                <button
                  key={location}
                  onClick={() =>
                    toggleSelection(
                      selectedLocations,
                      setSelectedLocations,
                      location
                    )
                  }
                  className={`px-4 py-2 rounded-2xl text-sm font-medium transition-colors ${
                    selectedLocations.includes(location)
                      ? "bg-pink-500 text-white"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                  }`}
                >
                  {location}
                </button>
              ))}
            </div>
          </div>

          {/* Gender */}
          <div className="mb-4">
            <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
              Gender
            </label>
            <div className="flex flex-wrap gap-2">
              {genders.map((gender) => (
                <button
                  key={gender}
                  onClick={() =>
                    toggleSelection(selectedGenders, setSelectedGenders, gender)
                  }
                  className={`px-4 py-2 rounded-2xl text-sm font-medium transition-colors ${
                    selectedGenders.includes(gender)
                      ? "bg-pink-500 text-white"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                  }`}
                >
                  {gender}
                </button>
              ))}
            </div>
          </div>

          {/* Device / Platform */}
          <div className="mb-4">
            <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
              Device / Platform
            </label>
            <div className="flex flex-wrap gap-2">
              {devices.length > 0 ? (
                devices.map((device) => (
                  <button
                    key={device.name}
                    onClick={() =>
                      toggleSelection(
                        selectedDevices,
                        setSelectedDevices,
                        device.name
                      )
                    }
                    className={`px-3 py-2 rounded-2xl text-sm font-medium transition-colors flex items-center gap-1 ${
                      selectedDevices.includes(device.name)
                        ? "bg-pink-500 text-white"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    <span className="text-xs">
                      {device.name === "iOS"
                        ? "📱"
                        : device.name === "Android"
                        ? "🤖"
                        : "💻"}
                    </span>
                    {device.name} {device.percentage}%
                  </button>
                ))
              ) : (
                <p className="text-sm text-gray-500">
                  No device data available
                </p>
              )}
            </div>
          </div>

          {/* Browser Breakdown */}
          <div className="mb-4">
            <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
              Browser Breakdown
            </label>
            <div className="flex flex-wrap gap-2">
              {browsers.length > 0 ? (
                browsers.map((browser) => (
                  <button
                    key={browser.name}
                    onClick={() =>
                      toggleSelection(
                        selectedBrowsers,
                        setSelectedBrowsers,
                        browser.name
                      )
                    }
                    className={`px-3 py-2 rounded-2xl text-sm font-medium transition-colors flex items-center gap-1 ${
                      selectedBrowsers.includes(browser.name)
                        ? "bg-pink-500 text-white"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    <span className="text-xs">🌐</span>
                    {browser.name} {browser.percentage}%
                  </button>
                ))
              ) : (
                <p className="text-sm text-gray-500">
                  No browser data available
                </p>
              )}
            </div>
          </div>

          {/* Apply Filter Button */}
          <button
            onClick={handleApplyFilter}
            disabled={!hasFiltersSelected || !segmentName.trim() || isApplying}
            className={`w-full py-3 rounded-3xl font-semibold transition-colors mt-6 ${
              hasFiltersSelected && segmentName.trim() && !isApplying
                ? "bg-yellow-400 hover:bg-yellow-500 text-gray-900"
                : "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-500 cursor-not-allowed"
            }`}
          >
            {isApplying ? "Applying..." : "Apply filter"}
          </button>
        </div>
      </div>

      {/* Fixed Bottom Preview & Actions - Slides up when showPreview is true */}
      <div
        className={`fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg transition-transform duration-300 ease-in-out ${
          showPreview ? "translate-y-0" : "translate-y-full"
        }`}
        style={{ paddingBottom: "5rem" }}
      >
        <div className="max-w-md mx-auto p-4">
          {/* Audience Preview */}
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
              Audience preview
            </h3>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">
                Total votes:{" "}
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  {previewData.totalVotes.toLocaleString()}
                </span>
              </span>
              <span className="text-gray-600 dark:text-gray-400">
                Avg engagement:{" "}
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  {previewData.avgEngagement}%
                </span>
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => setShowPreview(false)}
              className="flex-1 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-3 rounded-xl font-semibold transition-colors hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              onClick={handleExportCSV}
              disabled={!segmentName.trim()}
              className={`flex-1 py-3 rounded-xl font-semibold transition-colors ${
                segmentName.trim()
                  ? "bg-pink-500 hover:bg-pink-600 text-white"
                  : "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-500 cursor-not-allowed"
              }`}
            >
              Import in CSV
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateSegment;