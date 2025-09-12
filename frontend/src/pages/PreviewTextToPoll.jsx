import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function PreviewTextPoll() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>No poll data found.</p>
      </div>
    );
  }

  const { question, options } = state;

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen p-4 font-sans">
      {/* Header */}
      <div className="flex items-center mb-4">
        <button className="text-gray-600 text-lg" onClick={() => navigate(-1)}>
          ←
        </button>
        <h1 className="flex-1 text-center font-semibold">Preview</h1>
        <button className="text-gray-600">
          <img src="/Bell.svg" alt="Bell" className="w-6 h-6" />
        </button>
      </div>

      {/* Poll Card */}
      <div className="rounded-xl border border-gray-200 p-4">
        {/* Question */}
        <h2 className="font-medium mb-4">{question}</h2>

        {/* Options */}
        <div className="space-y-3">
          {options
            .filter((opt) => opt.trim() !== "")
            .map((opt, i) => (
              <div
                key={i}
                className="w-full border rounded-full px-4 py-2 text-center text-gray-700"
              >
                {opt}
              </div>
            ))}
        </div>

        {/* Branding */}
        <div className="flex justify-end mt-3 text-xs text-gray-400">
          <span className="font-medium text-pink-500">Ⓟ Pyngl</span>
        </div>
      </div>

      {/* Share Button */}
      <button
        onClick={() => alert("Poll shared! 🚀")}
        className="mt-6 w-full py-3 rounded-full text-white font-medium bg-gradient-to-r from-cyan-400 to-pink-500"
      >
        Share poll
      </button>
    </div>
  );
}
