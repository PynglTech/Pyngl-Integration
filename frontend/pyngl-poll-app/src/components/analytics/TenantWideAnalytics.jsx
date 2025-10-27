import React, { useState, useEffect } from "react";
import {
  X,
  Maximize2,
  TrendingUp,
  TrendingDown,
  Edit,
  Pause,
  Trash2,
  ChevronDown,
} from "lucide-react";

// Mock data for demonstration
const mockTenantData = {
  dailyActiveUsers: 12400,
  dauChange: 2.3,
  conversionRate: 23,
  conversionChange: 1.5,
  kFactor: 1.3,
  repeatUsers: 7000,
  platformBreakdown: {
    iOS: 42,
    Android: 35,
    Web: 18,
  },
  browserBreakdown: {
    Chrome: 60,
    Safari: 20,
    Firefox: 12,
    Edge: 8,
  },
  geographicDistribution: {
    Maharashtra: 34,
    Rajasthan: 18,
    Gujarat: 12,
    Assam: 9,
    MP: 24,
    UP: 18,
    "Tamil Nadu": 12,
    Odisha: 9,
    Chhattisgarh: 24,
    Karnataka: 18,
    Punjab: 12,
    AP: 9,
  },
};

const TenantWideAnalytics = () => {
  const [showGeoPopup, setShowGeoPopup] = useState(false);
  const [showCreateReport, setShowCreateReport] = useState(false);
  const [reportStep, setReportStep] = useState(1);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [reportToDelete, setReportToDelete] = useState(null);
  const [editingReport, setEditingReport] = useState(null);
  const [reports, setReports] = useState([
    {
      id: 1,
      name: "Weekly Engagement report",
      recipient: "@gmail.com",
      schedule: "weekly . Monday at 09:00",
      status: "Active",
      frequency: "Weekly",
      day: "Mon",
      time: "09:00",
      format: "Excel",
      recipients: ["@gmail.com"],
    },
  ]);

  const [newReport, setNewReport] = useState({
    name: "",
    frequency: "Daily",
    day: "Mon",
    time: "09:00",
    format: "PDF",
    recipients: [],
  });

  const [velocityData, setVelocityData] = useState(Array(10).fill(0));
  const [recipientInput, setRecipientInput] = useState("");

  const handleTogglePause = (reportId) => {
    setReports(
      reports.map((r) =>
        r.id === reportId
          ? { ...r, status: r.status === "Active" ? "Paused" : "Active" }
          : r
      )
    );
  };

  const handleDeleteClick = (report) => {
    setReportToDelete(report);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (reportToDelete) {
      setReports(reports.filter((r) => r.id !== reportToDelete.id));
      setShowDeleteConfirm(false);
      setReportToDelete(null);
    }
  };

  const handleEditClick = (report) => {
    setEditingReport(report);
    setNewReport({
      name: report.name,
      frequency: report.frequency,
      day: report.day,
      time: report.time,
      format: report.format,
      recipients: report.recipients || [],
    });
    setShowCreateReport(true);
    setReportStep(1);
  };

  const resetReportForm = () => {
    setNewReport({
      name: "",
      frequency: "Daily",
      day: "Mon",
      time: "09:00",
      format: "PDF",
      recipients: [],
    });
    setEditingReport(null);
    setRecipientInput("");
  };

  // Generate vote velocity animation
  useEffect(() => {
    const slots = Array(10)
      .fill(0)
      .map(() => Math.floor(Math.random() * 100));
    let current = Array(10).fill(0);
    let idx = 0;
    const interval = setInterval(() => {
      if (idx >= slots.length) {
        clearInterval(interval);
        return;
      }
      current[idx] = slots[idx];
      setVelocityData([...current]);
      idx++;
    }, 150);
    return () => clearInterval(interval);
  }, []);

  const maxVotes = Math.max(...velocityData, 1);

  const MetricCard = ({
    title,
    value,
    change,
    isPositive = true,
    color = "pink",
  }) => (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
      <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
        {title}
      </div>
      <div
        className={`text-3xl font-bold mb-2 ${
          color === "yellow"
            ? "text-yellow-500"
            : color === "pink"
            ? "text-pink-500"
            : "text-gray-900 dark:text-gray-100"
        }`}
      >
        {value}
      </div>
      <div
        className={`flex items-center gap-1 text-sm ${
          isPositive ? "text-green-500" : "text-red-500"
        }`}
      >
        {isPositive ? (
          <TrendingUp className="w-4 h-4" />
        ) : (
          <TrendingDown className="w-4 h-4" />
        )}
        {change}
      </div>
    </div>
  );

  const GeographicPopup = () => (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={() => setShowGeoPopup(false)}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Geographic Distribution
          </h3>
          <button
            onClick={() => setShowGeoPopup(false)}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
          >
            <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(mockTenantData.geographicDistribution).map(
            ([state, percentage]) => (
              <div
                key={state}
                className="flex items-center justify-between py-2"
              >
                <span className="text-sm text-gray-900 dark:text-gray-100">
                  {state}
                </span>
                <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  {percentage}%
                </span>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );

  const DeleteConfirmPopup = () => (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={() => setShowDeleteConfirm(false)}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-3xl p-8 max-w-md w-full text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setShowDeleteConfirm(false)}
          className="absolute top-4 right-4 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
        >
          <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>

        <div className="mb-6 flex justify-center">
          <div className="w-24 h-24 bg-pink-100 dark:bg-pink-900/30 rounded-full flex items-center justify-center">
            <span className="text-5xl">😔</span>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-8">
          Are you sure you wanted to delete
        </h3>

        <div className="flex gap-3">
          <button
            onClick={() => setShowDeleteConfirm(false)}
            className="flex-1 py-3 border-2 border-teal-500 text-teal-500 rounded-full font-semibold hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-colors"
          >
            No
          </button>
          <button
            onClick={confirmDelete}
            className="flex-1 py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-full font-semibold transition-colors"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );

  const ReportNameStep = () => (
    <div
      className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3 flex-1">
          <div className="flex items-center gap-2 flex-1">
            <div className="w-8 h-8 rounded-full bg-pink-500 text-white flex items-center justify-center text-sm font-semibold">
              1
            </div>
            <div className="h-px bg-gray-300 dark:bg-gray-600 flex-1"></div>
            <div className="w-8 h-8 rounded-full border-2 border-gray-300 dark:border-gray-600 text-gray-400 flex items-center justify-center text-sm font-semibold">
              2
            </div>
            <div className="h-px bg-gray-300 dark:bg-gray-600 flex-1"></div>
            <div className="w-8 h-8 rounded-full border-2 border-gray-300 dark:border-gray-600 text-gray-400 flex items-center justify-center text-sm font-semibold">
              3
            </div>
          </div>
        </div>
        <button
          onClick={() => setShowCreateReport(false)}
          className="ml-4 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
        >
          <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
          Report Name
        </label>
        <input
          type="text"
          placeholder="E.g weekly growth"
          value={newReport.name}
          onChange={(e) => setNewReport({ ...newReport, name: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:border-pink-500"
        />
      </div>
      <div className="flex justify-end">
        <button
          onClick={() => setReportStep(2)}
          disabled={!newReport.name}
          className="px-6 py-2 bg-pink-500 hover:bg-pink-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-full font-semibold transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );

  const FrequencyStep = () => (
    <div
      className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3 flex-1">
          <div className="flex items-center gap-2 flex-1">
            <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 text-white flex items-center justify-center text-sm font-semibold">
              1
            </div>
            <div className="h-px bg-gray-300 dark:bg-gray-600 flex-1"></div>
            <div className="w-8 h-8 rounded-full bg-pink-500 text-white flex items-center justify-center text-sm font-semibold">
              2
            </div>
            <div className="h-px bg-gray-300 dark:bg-gray-600 flex-1"></div>
            <div className="w-8 h-8 rounded-full border-2 border-gray-300 dark:border-gray-600 text-gray-400 flex items-center justify-center text-sm font-semibold">
              3
            </div>
          </div>
        </div>
        <button
          onClick={() => setShowCreateReport(false)}
          className="ml-4 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
        >
          <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
          Frequency
        </label>
        <div className="grid grid-cols-3 gap-3 mb-4">
          <select
            value={newReport.frequency}
            onChange={(e) =>
              setNewReport({ ...newReport, frequency: e.target.value })
            }
            className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-pink-500"
          >
            <option>Daily</option>
            <option>Weekly</option>
            <option>Monthly</option>
          </select>
          {newReport.frequency === "Weekly" && (
            <select
              value={newReport.day}
              onChange={(e) =>
                setNewReport({ ...newReport, day: e.target.value })
              }
              className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-pink-500"
            >
              <option>Mon</option>
              <option>Tue</option>
              <option>Wed</option>
              <option>Thu</option>
              <option>Fri</option>
              <option>Sat</option>
              <option>Sun</option>
            </select>
          )}
          {newReport.frequency === "Monthly" && (
            <input
              type="number"
              min="1"
              max="31"
              value="1"
              className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-pink-500"
            />
          )}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <input
            type="time"
            value={newReport.time}
            onChange={(e) =>
              setNewReport({ ...newReport, time: e.target.value })
            }
            className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-pink-500"
          />
        </div>
      </div>
      <div className="flex justify-between">
        <button
          onClick={() => setReportStep(1)}
          className="px-6 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 rounded-full font-semibold transition-colors"
        >
          Back
        </button>
        <button
          onClick={() => setReportStep(3)}
          className="px-6 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-full font-semibold transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );

  const RecipientsStep = () => (
    <div
      className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3 flex-1">
          <div className="flex items-center gap-2 flex-1">
            <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 text-white flex items-center justify-center text-sm font-semibold">
              1
            </div>
            <div className="h-px bg-gray-300 dark:bg-gray-600 flex-1"></div>
            <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 text-white flex items-center justify-center text-sm font-semibold">
              2
            </div>
            <div className="h-px bg-gray-300 dark:bg-gray-600 flex-1"></div>
            <div className="w-8 h-8 rounded-full bg-pink-500 text-white flex items-center justify-center text-sm font-semibold">
              3
            </div>
          </div>
        </div>
        <button
          onClick={() => setShowCreateReport(false)}
          className="ml-4 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
        >
          <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>
      </div>

      <div className="mb-4">
        <div className="flex gap-2 mb-2">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              checked={newReport.format === "PDF"}
              onChange={() => setNewReport({ ...newReport, format: "PDF" })}
              className="text-pink-500"
            />
            <span className="text-sm text-gray-900 dark:text-gray-100">
              PDF
            </span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              checked={newReport.format === "CSV"}
              onChange={() => setNewReport({ ...newReport, format: "CSV" })}
              className="text-pink-500"
            />
            <span className="text-sm text-gray-900 dark:text-gray-100">
              CSV
            </span>
          </label>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
          Recipients
        </label>
        <input
          type="email"
          placeholder="Add email"
          value={recipientInput}
          onChange={(e) => setRecipientInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter" && recipientInput) {
              setNewReport({
                ...newReport,
                recipients: [...newReport.recipients, recipientInput],
              });
              setRecipientInput("");
            }
          }}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:border-pink-500"
        />
        {newReport.recipients.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {newReport.recipients.map((email, idx) => (
              <div
                key={idx}
                className="bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 px-3 py-1 rounded-full text-sm flex items-center gap-2"
              >
                {email}
                <button
                  onClick={() =>
                    setNewReport({
                      ...newReport,
                      recipients: newReport.recipients.filter(
                        (_, i) => i !== idx
                      ),
                    })
                  }
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => setReportStep(2)}
          className="px-6 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 rounded-full font-semibold transition-colors"
        >
          Back
        </button>
        <button
          onClick={() => {
            const scheduleText =
              newReport.frequency === "Weekly"
                ? `${newReport.frequency.toLowerCase()} . ${newReport.day} at ${
                    newReport.time
                  }`
                : newReport.frequency === "Monthly"
                ? `${newReport.frequency.toLowerCase()} . Day 1 at ${
                    newReport.time
                  }`
                : `${newReport.frequency.toLowerCase()} at ${newReport.time}`;

            if (editingReport) {
              // Update existing report
              setReports(
                reports.map((r) =>
                  r.id === editingReport.id
                    ? {
                        ...r,
                        name: newReport.name,
                        recipient: newReport.recipients[0] || "No recipients",
                        schedule: scheduleText,
                        frequency: newReport.frequency,
                        day: newReport.day,
                        time: newReport.time,
                        format: newReport.format,
                        recipients: newReport.recipients,
                      }
                    : r
                )
              );
            } else {
              // Create new report
              setReports([
                ...reports,
                {
                  id: Date.now(),
                  name: newReport.name,
                  recipient: newReport.recipients[0] || "No recipients",
                  schedule: scheduleText,
                  status: "Active",
                  frequency: newReport.frequency,
                  day: newReport.day,
                  time: newReport.time,
                  format: newReport.format,
                  recipients: newReport.recipients,
                },
              ]);
            }

            setShowCreateReport(false);
            setReportStep(1);
            resetReportForm();
          }}
          className="px-6 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-full font-semibold transition-colors"
        >
          Finish
        </button>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Metric Cards Row 1 */}
      <div className="px-4">
        <div className="grid grid-cols-2 gap-4">
          <MetricCard
            title="Daily active users"
            value="12.4K"
            change="2.3%"
            isPositive={true}
          />
          <MetricCard
            title="Conversion rate"
            value="23%"
            change="1.5%"
            isPositive={true}
          />
        </div>
      </div>

      {/* Metric Cards Row 2 */}
      <div className="px-4">
        <div className="grid grid-cols-2 gap-4">
          <MetricCard title="K-factor" value="1.3x" change="" color="yellow" />
          <MetricCard title="Repeat users" value="7k" change="" color="pink" />
        </div>
      </div>

      {/* Vote Velocity */}
      <div className="px-4">
        <div className="bg-purple-50 dark:bg-purple-900/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Vote Velocity
            </h4>
            <span className="text-sm text-gray-400 dark:text-gray-500">
              Votes per hour
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
                        height:
                          votes > 0 ? `${(votes / maxVotes) * 100}%` : "0%",
                        minHeight: votes > 0 ? "8px" : "0px",
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex justify-between mt-4 text-sm text-gray-400 dark:text-gray-500 px-2">
            <span>15 min</span>
            <span>30 min</span>
            <span>45 min</span>
            <span>60 min</span>
          </div>
        </div>
      </div>

      {/* Platform & Browser Breakdown */}
      <div className="px-4">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
          <h4 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Platform Breakdown
          </h4>
          <div className="flex flex-wrap gap-2 mb-6">
            {Object.entries(mockTenantData.platformBreakdown).map(
              ([platform, percentage]) => (
                <div
                  key={platform}
                  className={`${
                    platform === "iOS"
                      ? "bg-teal-500"
                      : platform === "Android"
                      ? "bg-gray-600"
                      : "bg-blue-500"
                  } text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2`}
                >
                  <span>
                    {platform === "iOS"
                      ? "🍎"
                      : platform === "Android"
                      ? "🤖"
                      : "🌐"}
                  </span>
                  {platform} {percentage}%
                </div>
              )
            )}
          </div>

          <h4 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Browser Breakdown
          </h4>
          <div className="flex flex-wrap gap-2">
            {Object.entries(mockTenantData.browserBreakdown).map(
              ([browser, percentage]) => (
                <div
                  key={browser}
                  className={`${
                    browser === "Chrome"
                      ? "bg-teal-500"
                      : browser === "Safari"
                      ? "bg-gray-600"
                      : "bg-blue-500"
                  } text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2`}
                >
                  <span>🌐</span>
                  {browser} {percentage}%
                </div>
              )
            )}
          </div>
        </div>
      </div>

      {/* Geographic Distribution */}
      <div className="px-4">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-base font-semibold text-gray-900 dark:text-gray-100">
              Geographic Distribution
            </h4>
            <button
              onClick={() => setShowGeoPopup(true)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <Maximize2 className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(mockTenantData.geographicDistribution)
              .slice(0, 8)
              .map(([state, percentage]) => (
                <div
                  key={state}
                  className="flex items-center justify-between py-2"
                >
                  <span className="text-sm text-gray-900 dark:text-gray-100">
                    {state}
                  </span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                    {percentage}%
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Raw Data Export */}
      <div className="px-4">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
          <h4 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Raw Data Export
          </h4>
          <button className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-full font-semibold transition-colors">
            Request Raw Export
          </button>
        </div>
      </div>

      {/* Scheduled Reports */}
      <div className="px-4">
        <div className="bg-white dark:bg-gray-800">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-base font-semibold text-gray-900 dark:text-gray-100">
              Scheduled Reports
            </h4>
            <button
              onClick={() => {
                setShowCreateReport(true);
                setReportStep(1);
                resetReportForm();
              }}
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 transition-colors"
            >
              + Create report
            </button>
          </div>

          <div className="space-y-4">
            {reports.map((report) => (
              <div
                key={report.id}
                className="border border-gray-200 dark:border-gray-700 rounded-xl p-4"
              >
                <div className="flex items-start justify-between mb-3">
                  <h5 className="text-xl font-semibold text-gray-900 dark:text-gray-100 flex-1">
                    {report.name}
                  </h5>
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-medium ${
                      report.status === "Active"
                        ? "bg-teal-500 text-white"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {report.status}
                  </span>
                </div>
                <p className="text-sm text-gray-900 dark:text-gray-100 mb-1">
                  Recipient: {report.recipient}
                </p>
                <p className="text-sm text-gray-900 dark:text-gray-100 mb-4">
                  Schedule: {report.schedule}
                </p>
                <div className="flex justify-between items-center gap-6">
                    <div>
                  <button className="text-green-600 dark:text-green-30 text-sm font-medium">
                    {report.format}
                  </button>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleEditClick(report)}
                      className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-2 rounded-3xl text-sm font-medium hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleTogglePause(report.id)}
                      className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 px-3 py-2 rounded-3xl text-sm font-semibold hover:bg-yellow-200 dark:hover:bg-yellow-900/50 transition-colors"
                    >
                      {report.status === "Active" ? "Pause" : "Resume"}
                    </button>
                    <button
                      onClick={() => handleDeleteClick(report)}
                      className="bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 px-3 py-2 rounded-3xl text-sm font-medium hover:bg-pink-200 dark:hover:bg-pink-900/50 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Popups */}
      {showGeoPopup && <GeographicPopup />}
      {showDeleteConfirm && <DeleteConfirmPopup />}

      {showCreateReport && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => {
            setShowCreateReport(false);
            resetReportForm();
            setReportStep(1);
          }}
        >
          {reportStep === 1 && <ReportNameStep />}
          {reportStep === 2 && <FrequencyStep />}
          {reportStep === 3 && <RecipientsStep />}
        </div>
      )}
    </div>
  );
};

export default TenantWideAnalytics;