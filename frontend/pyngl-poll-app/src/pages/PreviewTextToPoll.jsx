import React, { useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import apiClient from "../api/axiosConfig";
import ShareSheet from "../components/common/ShareSheet";
import StyledQRCode from "../components/common/qrImageStyle";
import { useNavigate } from "react-router-dom";

export default function PreviewTextPoll() {
  const { state } = useLocation();

  const [isLoading, setIsLoading] = useState(false);
  const [createdPoll, setCreatedPoll] = useState(null);
  const [isShareSheetOpen, setIsShareSheetOpen] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState(null);

  const pollRef = useRef(null);
  const navigate =  useNavigate();

  if (!state) {
    return (
      <div className="p-6 text-center text-gray-900 dark:text-gray-100">
        No poll data found. Please go back.
      </div>
    );
  }

  const handleCreatePoll = async () => {
    if (createdPoll) {
      setIsShareSheetOpen(true);
      return;
    }

    setIsLoading(true);
    try {
      const pollData = {
        question: state.question,
        options: state.options,
        type: "text",
        duration: state.selectedDuration,
        ageRange: state.selectedAgeRange,
        shareToTrending: state.shareToTrending,
      };

      const response = await apiClient.post("/api/polls/create-poll", pollData);
      setCreatedPoll(response.data);
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.error || "Error saving poll. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
   <div className="font-sans bg-white dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100 m-auto w-full md:w-7/6 lg:w-4/5 xl:w-3/4 2xl:w-2/3 transition-all duration-300">

    {/* ✅ Sticky Header */}
  <div className="flex items-center border-b-2 border-gray-100 dark:border-gray-700 dark:bg-gray-800 shadow-sm bg-white p-4 sticky top-0 z-50">
    <button
      className="text-gray-600 text-lg"
      onClick={() => navigate("/create-text-poll")}
    >
      ←
    </button>
    <h1 className="flex-1 text-center font-semibold">Preview Text to poll</h1>
    <button className="text-gray-600">
      <img src="/Bell.svg" alt="Bell" className="w-6 h-6" />
    </button>
  </div>
      <div className="bg-gray-100 dark:bg-gray-800 m-auto p-4 min-h-screen w-full md:w-4/6 lg:w-4/5 xl:w-3/4 2xl:w-2/3 transition-all duration-300">
      {/* Poll Preview */}
      <div
        ref={pollRef}
        className="p-4 bg-white dark:bg-gray-900 rounded-xl shadow-md transition-colors"
      >
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-4 transition-colors">
          <h2 className="font-medium mb-4">{state.question}</h2>
          <div className="space-y-3">
            {state.options.map((opt, i) => (
              <div
                key={i}
                className="w-full border rounded-full px-4 py-2 text-center text-gray-700 dark:text-gray-100 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 transition-colors"
              >
                {opt}
              </div>
            ))}
          </div>
          <div className="flex justify-end mt-3 text-xs text-gray-400 dark:text-gray-500">
            <span className="font-medium text-pink-500">
              {/* Light mode logo */}
              <img
                src="./pynglLogoImage.png"
                alt="Pyngl Logo Light"
                height={15}
                width={41}
                className="block dark:hidden"
              />
              {/* Dark mode logo */}
              <img
                src="./logo_dark.svg"
                alt="Pyngl Logo Dark"
                height={15}
                width={41}
                className="hidden dark:block"
              />
            </span>
          </div>
        </div>

        {createdPoll && (
          <div className="mt-6">
            <StyledQRCode
              pollUrl={`${window.location.origin}/poll/${createdPoll._id}`}
              setQrDataUrl={setQrDataUrl}
            />
            {qrDataUrl && (
              <img src={qrDataUrl} alt="QR Code" className="hidden" />
            )}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="mt-6 space-y-3">
        <button
          onClick={handleCreatePoll}
          disabled={isLoading}
          className="w-full py-3 rounded-full text-white font-medium bg-gradient-to-r from-cyan-400 to-pink-500 flex items-center justify-center disabled:opacity-70 transition-colors"
        >
          {isLoading
            ? "Creating Poll..."
            : createdPoll
            ? "Share Poll"
            : "Create & Share Poll"}
        </button>
      </div>

      {/* Share Sheet */}
      {isShareSheetOpen && createdPoll && (
        <ShareSheet
          poll={createdPoll}
          onClose={() => setIsShareSheetOpen(false)}
        />
      )}
    </div>
    </div>
  );
}
