import React, { useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import apiClient from "../api/axiosConfig";
import ShareSheet from "../components/common/ShareSheet";
import StyledQRCode from "../components/common/StyledQRCode";

export default function PreviewTextPoll() {
  const { state } = useLocation();

  const [isLoading, setIsLoading] = useState(false);
  const [createdPoll, setCreatedPoll] = useState(null);
  const [isShareSheetOpen, setIsShareSheetOpen] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState(null);

  const pollRef = useRef(null); // ✅ Ref for capturing the poll as image

  if (!state) {
    return (
      <div className="p-6 text-center">No poll data found. Please go back.</div>
    );
  }

  const handleCreatePoll = async () => {
    if (createdPoll) {
      setIsShareSheetOpen(true); // Share only when already created
      return;
    }

    setIsLoading(true);
    try {
      const pollData = {
        question: state.question,
        options: state.options,
        type: "text",
        duration: state.selectedDuration,
         ageRange: state.ageRange, 
        shareToTrending: state.shareToTrending, // ✅ save in DB
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
    <div className="p-4 font-sans">
      {/* Poll Preview */}
      <div ref={pollRef} className="p-4 bg-white rounded-xl shadow-md">
        <div className="rounded-xl border border-gray-200 p-4">
          <h2 className="font-medium mb-4">{state.question}</h2>
          <div className="space-y-3">
            {state.options.map((opt, i) => (
              <div
                key={i}
                className="w-full border rounded-full px-4 py-2 text-center text-gray-700"
              >
                {opt}
              </div>
            ))}
          </div>
          <div className="flex justify-end mt-3 text-xs text-gray-400">
            <span className="font-medium text-pink-500">
              <img
                src="./pynglLogoImage.png"
                alt="Pyngl Logo"
                height={15}
                width={41}
              />
            </span>
          </div>
        </div>

        {createdPoll && (
          <div className="mt-6">
            <StyledQRCode
              pollUrl={`${window.location.origin}/poll/${createdPoll._id}`}
              setQrDataUrl={setQrDataUrl} // get QR as base64
            />
            {qrDataUrl && (
              <img
                src={qrDataUrl}
                alt="QR Code"
                className="hidden" // hidden but captured by html2canvas
              />
            )}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="mt-6 space-y-3">
        <button
          onClick={handleCreatePoll}
          disabled={isLoading}
          className="w-full py-3 rounded-full text-white font-medium bg-gradient-to-r from-cyan-400 to-pink-500 flex items-center justify-center disabled:opacity-70"
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
  );
}