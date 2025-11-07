import React, { useState, useEffect } from "react";
export default function FilterDrawer({
  show,
  setShow,
  statusFilter,
  setStatusFilter,
  platformFilter,
  setPlatformFilter,
}) {
  if (!show) return null;

  const statusOptions = ["Live Pings", "Closed Pings"];
  const platformOptions = [
    "All",
    "Instagram",
    "YouTube",
    "LinkedIn",
    "Gmail",
    "Facebook",
  ];

  // Local temp state
  const [tempStatus, setTempStatus] = useState(statusFilter);
  const [tempPlatform, setTempPlatform] = useState(platformFilter);

  // Sync temp state when drawer opens
  useEffect(() => {
    if (show) {
      setTempStatus(statusFilter);
      setTempPlatform(platformFilter);
    }
  }, [show, statusFilter, platformFilter]);

  const handleDone = () => {
    setStatusFilter(tempStatus);
    setPlatformFilter(tempPlatform);
    setShow(false);
  };

  const handleCancel = () => {
    setTempStatus(statusFilter);
    setTempPlatform(platformFilter);
    setShow(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-end">
      <div className="bg-white dark:bg-gray-900 w-80 h-full shadow-lg p-6 overflow-y-auto rounded-l-3xl border-l border-gray-200 dark:border-gray-700">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-4 mb-6">
          <h2 className="text-lg font-semibold flex items-center gap-2 text-gray-900 dark:text-gray-100">
            <img
              src="./assets/pynglLogoImage.png"
              alt="Pyngl"
              className="h-6 object-contain"
            />
          </h2>
          <button
            onClick={handleCancel}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            ✕
          </button>
        </div>

        {/* Status Section */}
        <div className="mb-6 border-b border-gray-200 dark:border-gray-700 pb-6">
          <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
            Status
          </h3>
          <p className="text-xs text-gray-400 dark:text-gray-500 mb-2">
            Choose one.
          </p>
          <div className="space-y-2">
            {statusOptions.map((s) => (
              <label
                key={s}
                className="flex items-center gap-3 p-2 border border-gray-200 dark:border-gray-700 rounded-full cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/70"
              >
                <input
                  type="radio"
                  name="status"
                  value={s}
                  checked={tempStatus === s}
                  onChange={() => setTempStatus(s)}
                  className="accent-[#FF4DA6]"
                />
                <span className="text-gray-700 dark:text-gray-300">{s}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Platform Section */}
        <div className="border-b border-gray-200 dark:border-gray-700 pb-6 mb-6">
          <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
            Platform
          </h3>
          <p className="text-xs text-gray-400 dark:text-gray-500 mb-2">
            Choose one.
          </p>
          <div className="space-y-2">
            {platformOptions.map((p) => (
              <label
                key={p}
                className="flex items-center gap-3 p-2 border border-gray-200 dark:border-gray-700 rounded-full cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/70"
              >
                <input
                  type="radio"
                  name="platform"
                  value={p}
                  checked={tempPlatform === p}
                  onChange={() => setTempPlatform(p)}
                  className="accent-[#FF4DA6]"
                />
                <span className="text-gray-700 dark:text-gray-300">{p}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between">
          <button
            onClick={handleCancel}
            className="px-10 py-2 rounded-full text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={handleDone}
            className="px-10 py-2 rounded-full text-white bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}