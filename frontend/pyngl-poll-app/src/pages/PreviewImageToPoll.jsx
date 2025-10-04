import React, { useState, useRef } from "react";
import { useLocation } from "react-router-dom";
// import apiClient from "../api/axiosConfig";
import ShareSheet from "../components/common/ShareSheet";
import StyledQRCode from "../components/common/StyledQRCode";
import html2canvas from "html2canvas";

export default function PreviewImagePoll() {
  const { state } = useLocation();
  const [isShareSheetOpen, setIsShareSheetOpen] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const pollRef = useRef(null);

  const createdPoll = state?.createdPoll;

  if (!createdPoll) {
    return (
      <div className="p-6 text-center">No poll found. Please go back.</div>
    );
  }

  // ✅ Capture poll as image
  const capturePollImage = async () => {
    if (!pollRef.current) return;

    const linkElement = document.getElementById("shareable-link");
    if (linkElement) linkElement.style.display = "none";

    const images = pollRef.current.getElementsByTagName("img");
    await Promise.all(
      Array.from(images).map(
        (img) =>
          new Promise((resolve) => {
            if (img.complete) resolve();
            else img.onload = img.onerror = resolve;
          })
      )
    );

    const canvas = await html2canvas(pollRef.current, {
      scale: 2,
      useCORS: true,
    });
    const image = canvas.toDataURL("image/png");
    setCapturedImage(image);

    if (linkElement) linkElement.style.display = "flex";
  };

  const handleSharePoll = async () => {
    await capturePollImage();
    setIsShareSheetOpen(true);
  };

  return (
    <div className="p-4 font-sans">
      {/* Poll Card */}
      <div ref={pollRef} className="p-4 bg-white rounded-xl shadow-md">
        <div className="rounded-xl border border-gray-200 p-4">
          <h2 className="font-medium mb-4">{createdPoll.question}</h2>

          {createdPoll.imageUrl && (
            <img
              src={createdPoll.imageUrl}
              alt="Poll visual"
              className="rounded-xl mb-4 w-full h-48 object-cover"
            />
          )}

          <div className="space-y-3">
            {createdPoll.options.map((opt, i) => (
              <div
                key={opt._id || i}
                className="w-full border rounded-full px-4 py-2 text-center text-gray-700"
              >
                {opt.text} {/* ✅ render only text */}
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

        {/* QR Code */}
        <div className="mt-6">
          <StyledQRCode
            pollUrl={`${window.location.origin}/poll/${createdPoll._id}`}
            hideForScreenshot={true}
          />
        </div>
      </div>

      {/* Share Button */}
      <div className="mt-6 space-y-3">
        <button
          onClick={handleSharePoll}
          className="w-full py-3 rounded-full text-white font-medium bg-gradient-to-r from-cyan-400 to-pink-500 flex items-center justify-center"
        >
          Share Poll
        </button>
      </div>

      {/* Share Sheet */}
      {isShareSheetOpen && (
        <ShareSheet
          poll={createdPoll}
          capturedImage={capturedImage}
          onClose={() => setIsShareSheetOpen(false)}
        />
      )}
    </div>
  );
}