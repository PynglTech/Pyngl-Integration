import React from "react";

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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-end">
      <div className="bg-white w-80 h-full shadow-lg p-6 overflow-y-auto rounded-l-3xl">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <img src="/logo.svg" alt="Pyngl" className="h-6 object-contain" />
          </h2>
          <button
            onClick={() => setShow(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {/* Status Section */}
        <div className="mb-6 border-b pb-6">
          <h3 className="text-sm font-semibold">Status</h3>
          <p className="text-xs text-gray-400 mb-2">Choose one.</p>
          <div className="space-y-2">
            {statusOptions.map((s) => (
              <label
                key={s}
                className="flex items-center gap-3 p-2 border rounded-full cursor-pointer hover:bg-gray-50"
              >
                <input
                  type="radio"
                  name="status"
                  value={s}
                  checked={statusFilter === s}
                  onChange={() => setStatusFilter(s)}
                  className="accent-[#FF4DA6]"
                />
                <span>{s}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Platform Section */}
        <div className="border-b pb-6 mb-6">
          <h3 className="text-sm font-semibold">Platform</h3>
          <p className="text-xs text-gray-400 mb-2">Choose one.</p>
          <div className="space-y-2">
            {platformOptions.map((p) => (
              <label
                key={p}
                className="flex items-center gap-3 p-2 border rounded-full cursor-pointer hover:bg-gray-50 backdrop-blur-sm"
              >
                <input
                  type="radio"
                  name="platform"
                  value={p}
                  checked={platformFilter === p}
                  onChange={() => setPlatformFilter(p)}
                  className="accent-[#FF4DA6]"
                />
                <span>{p}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between">
          <button
            onClick={() => {
              setStatusFilter("Live Pings");
              setPlatformFilter("All");
              setShow(false);
            }}
            className="px-10 py-2 rounded-full text-gray-500 bg-gray-100 hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={() => setShow(false)}
            className="px-10 py-2 rounded-full text-white bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
