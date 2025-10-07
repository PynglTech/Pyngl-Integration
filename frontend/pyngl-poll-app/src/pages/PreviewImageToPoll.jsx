import React, { useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import ShareSheet from "../components/common/ShareSheet";
import StyledQRCode from "../components/common/qrImageStyle";
import html2canvas from "html2canvas";
import { useNavigate } from "react-router-dom";  

export default function PreviewImagePoll() {
  const { state } = useLocation();
  const [isShareSheetOpen, setIsShareSheetOpen] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const pollRef = useRef(null);
  const navigate = useNavigate();

  const createdPoll = state?.createdPoll;

  if (!createdPoll) {
    return (
      <div className="p-6 text-center text-gray-900 dark:text-gray-100">
        No poll found. Please go back.
      </div>
    );
  }

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
      backgroundColor: null,
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
   <div className="font-sans bg-white dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100 m-auto w-full md:w-7/6 lg:w-4/5 xl:w-3/4 2xl:w-2/3 transition-all duration-300">

    {/* ✅ Sticky Header */}
  <div className="flex items-center border-b-2 border-gray-100 dark:border-gray-700 dark:bg-gray-800 shadow-sm bg-white p-4">
    <button
      className="text-gray-600 text-lg"
      onClick={() => navigate("/create-image-poll")}
    >
      ←
    </button>
    <h1 className="flex-1 text-center font-semibold">Preview Image to poll</h1>
    <button className="text-gray-600">
      <img src="/Bell.svg" alt="Bell" className="w-6 h-6" />
    </button>
  </div>
      <div className="bg-gray-100 dark:bg-gray-800 m-auto p-4 min-h-screen w-full md:w-4/6 lg:w-4/5 xl:w-3/4 2xl:w-2/3 transition-all duration-300 pb-32">
      {/* Poll Card */}
      <div
        ref={pollRef}
        className="p-4 bg-white dark:bg-gray-900 rounded-xl shadow-md transition-colors"
      >
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-4 transition-colors">
          <h2 className="font-medium mb-4 text-gray-900 dark:text-gray-100">
            {createdPoll.question}
          </h2>

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
                className="w-full border rounded-full px-4 py-2 text-center text-gray-700 dark:text-gray-100 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 transition-colors"
              >
                {opt.text}
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
          className="w-full py-3 rounded-full text-white font-medium bg-gradient-to-r from-cyan-400 to-pink-500 flex items-center justify-center hover:opacity-90 transition-colors"
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
    </div>
  );
}
