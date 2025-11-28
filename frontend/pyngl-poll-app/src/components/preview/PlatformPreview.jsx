
import React, { useEffect, useState, useRef } from "react";
import { X, RotateCw, Edit2, Loader, Copy } from "lucide-react";
import ImageEditPreview from "./ImageEditPreview";
import PollPreview from "./PollPreview";
import apiClient from "../../api/axiosConfig";
import * as htmlToImage from "html-to-image";
import { toast } from 'react-hot-toast';
import AppleQR from "../apple/AppleQR";

export default function PlatformPreview({ platform, poll, onClose, onConfirm }) {
  const platformDimensions = {
    instagram: { width: 1080, height: 1920, label: "Reels / Stories", aspect: 9 / 16 },
    twitter: { width: 1200, height: 628, label: "X / Twitter", aspect: 1200 / 628 },
    facebook: { width: 1200, height: 630, label: "Facebook", aspect: 1200 / 630 },
    whatsapp: { width: 1200, height: 630, label: "WhatsApp", aspect: 1200 / 630 },
    youtube: { width: 1280, height: 720, label: "YouTube", aspect: 16 / 9 },
    gmail: { width: 1200, height: 600, label: "Email Banner", aspect: 2 },
    imessages: { width: 1200, height: 600, label: "Apple iMessage", aspect: 2 },
  };

  const [imageDimensions, setImageDimensions] = useState(
    platformDimensions[platform] || { width: 400, height: 300 }
  );

  const [isEditing, setIsEditing] = useState(false);
  const [dbImage, setDbImage] = useState(poll.imageUrl || null);
  const [previewImage, setPreviewImage] = useState(
    poll.previewImages?.[platform] || poll.imageUrl || null
  );
  const [editedOnce, setEditedOnce] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const sheetRef = useRef(null);
  const pollRef = useRef(null);

  const POLL_PAGE_DOMAIN = "https://api.pyngl.com";
  const POLL_PREVIEW_BASE = `${POLL_PAGE_DOMAIN}/api/polls/`;

  // -----------------------------------------------------
  // 📌 Apple Business Chat Entry Point Logic
  // -----------------------------------------------------
  // This ID must match your registered Apple Business ID
  const APPLE_BUSINESS_ID = "urn:biz:539765e3-16f4-4441-95f5-9b984f5617e5"; 
  
  // The hidden trigger text that starts the bot
  const IMESSAGE_TRIGGER_TEXT = `Start Poll #${poll._id}`;
  
  // The Magic Link: Clicking this opens iMessage with the text pre-filled
  const iMessageEntryUrl = `https://bcrw.apple.com/${APPLE_BUSINESS_ID}?body=${encodeURIComponent(IMESSAGE_TRIGGER_TEXT)}`;

  const handleRestore = () => {
    setImageDimensions(platformDimensions[platform]);
    setPreviewImage(dbImage);
  };

  const handleOverlayClick = (e) => {
    if (sheetRef.current && !sheetRef.current.contains(e.target)) onClose();
  };

  // Upload preview image to backend
  const uploadPreviewImage = async (blob) => {
    try {
      const formData = new FormData();
      formData.append("file", blob);
      formData.append("pollId", poll._id);
      formData.append("platform", platform);

      const res = await apiClient.post("/api/upload/preview", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setPreviewImage(res.data.hostedPreviewImage);
      return res.data.hostedPreviewImage;
    } catch (error) {
      console.error("Failed to upload preview image:", error);
      toast.error("Error uploading preview image.");
      return null;
    }
  };

  const handleShare = async () => {
  if (isLoading) return;
  setIsLoading(true);

  try {
    // ===============================================
    // 🚀 SPECIAL CASE: iMessage — SKIP EVERYTHING ELSE
    // ===============================================
    if (platform === "imessages") {
      const shareText = `Vote on my Poll: "${poll.question}"\nClick the link below and send the pre-filled message to vote:\n`;
      const smsBody = encodeURIComponent(`${shareText} ${iMessageEntryUrl}`);

      const isAppleDevice =
        /iPhone|iPad|iPod|Macintosh|Mac OS X/i.test(navigator.userAgent);
      const isAndroid = /Android/i.test(navigator.userAgent);

      // 🍏 iPhone / Mac
      if (isAppleDevice) {
        window.location.href = `sms:&body=${smsBody}`;
        toast.success("Opening Apple Messages…");
      }
      // 🤖 Android
      else if (isAndroid) {
        window.location.href = `sms:?body=${smsBody}`;
        toast.success("Opening Messages…");
      }
      // 🖥 Windows / Linux / Unknown device
      else {
        if (navigator.share) {
          try {
            await navigator.share({
              title: "Vote on my Poll",
              text: shareText,
              url: iMessageEntryUrl,
            });
            toast.success("Shared!");
          } catch (err) {
            await navigator.clipboard.writeText(`${shareText} ${iMessageEntryUrl}`);
            toast.success("Link copied to clipboard!");
          }
        } else {
          await navigator.clipboard.writeText(`${shareText} ${iMessageEntryUrl}`);
          toast.success("Link copied to clipboard!");
        }
      }

      setIsLoading(false);
      return; // 🔥 stop here — DO NOT run screenshot logic
    }

    // ===============================================
    // 🖼️ OTHER PLATFORMS — screenshot + upload
    // ===============================================

    if (!pollRef.current) throw new Error("Poll reference missing.");

    // Hide edit buttons
    const editButtons = pollRef.current.querySelectorAll(".edit-button, .restore-button");
    editButtons.forEach((btn) => (btn.style.display = "none"));

    // Inline all images for iOS rendering
    const imgs = pollRef.current.querySelectorAll("img");
    await Promise.all(
      Array.from(imgs).map(async (img) => {
        if (!img.complete || img.naturalWidth === 0) {
          await new Promise((resolve) => {
            img.onload = resolve;
            img.onerror = resolve;
          });
        }
        if (!img.src.startsWith("data:")) {
          try {
            const res = await fetch(img.src, { mode: "cors" });
            const blob = await res.blob();
            const reader = new FileReader();
            await new Promise((resolve) => {
              reader.onload = () => {
                img.src = reader.result;
                resolve();
              };
              reader.readAsDataURL(blob);
            });
          } catch {
            console.warn("Skipped image:", img.src);
          }
        }
      })
    );

    await new Promise((r) => setTimeout(r, 150));

    // Convert DOM to PNG
    const dataUrl = await htmlToImage.toPng(pollRef.current, {
      cacheBust: true,
      backgroundColor: getComputedStyle(document.body).backgroundColor || "#ffffff",
      quality: 1,
    });

    const blob = await (await fetch(dataUrl)).blob();
    editButtons.forEach((btn) => (btn.style.display = ""));

    const hostedPreviewImage = await uploadPreviewImage(blob);
    if (!hostedPreviewImage) throw new Error("Image upload failed.");

    // ===============================================
    // 🐦 TWITTER
    // ===============================================
    if (platform === "twitter") {
      const previewUrl = `${POLL_PREVIEW_BASE}${poll._id}/preview?platform=twitter`;
      const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        poll.question
      )}&url=${encodeURIComponent(previewUrl)}`;
      window.open(twitterShareUrl, "_blank");
    }

    // ===============================================
    // 📸 INSTAGRAM
    // ===============================================
    else if (platform === "instagram") {
      const file = new File([blob], "poll.png", { type: blob.type });
      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: "Check out my poll!",
          text: "Vote here:",
        });
      } else {
        alert("Instagram sharing works only on supported mobile devices.");
      }
    }

    // ===============================================
    // 🖼️ DEFAULT DOWNLOAD
    // ===============================================
    else {
      const file = new File([blob], "poll.png", { type: blob.type });
      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: "Check out my poll!",
          text: "Vote here:",
        });
      } else {
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "poll.png";
        a.click();
        toast.success("Image downloaded!");
      }
    }

    if (typeof onConfirm === "function") onConfirm(hostedPreviewImage);
  } catch (error) {
    console.error(`${platform} sharing failed:`, error);
    if (platform !== "imessages") {
      toast.error("Sharing failed. Please try again.");
    }
  } finally {
    setIsLoading(false);
  }
};

  return (
    <>
      <div
        className="fixed inset-0 bg-black/40 flex items-end justify-center z-50"
        onClick={handleOverlayClick}
      >
        <div
          ref={sheetRef}
          className="bg-white dark:bg-[#0f121d] w-full rounded-t-3xl shadow-xl animate-slideUp relative border-t border-gray-700"
          style={{ height: "75vh", maxHeight: "75vh", overflowY: "auto" }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center z-10 shadow"
          >
            <X size={20} className="text-gray-700 dark:text-gray-300" />
          </button>

          <div className="px-6 py-4 relative">
            <h4 className="text-lg font-medium text-gray-900 dark:text-gray-100 capitalize mb-4">
              Preview - {platform}
            </h4>

     {platform === "imessages" ? (
  <div className="px-6 pb-6 mt-2">
    {/* GUIDE CARD */}
    <div className="w-full max-w-md  mx-auto bg-white dark:bg-[#1a1d29] rounded-2xl p-5 shadow-lg border border-gray-200 dark:border-gray-700">
      
      {/* Icon */}
      <div className="flex justify-center mb-3">
        <img 
          src="/icons/apple-icon.svg" 
          alt="iMessage" 
          className="w-12 h-12"
        />
      </div>

      {/* Title */}
      <h2 className="text-lg font-semibold text-center text-gray-900 dark:text-white">
        Share your Poll via iMessage
      </h2>

      {/* Description */}
      <p className="text-sm text-center text-gray-600 dark:text-gray-300 mt-2">
        Tap the button below to open Apple Messages with your poll link pre-filled.
        Just send the message and your audience can vote instantly.
      </p>

      {/* Preview of message */}
      <div className="bg-gray-100 dark:bg-[#0f121d] p-4 rounded-xl mt-4 text-sm text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700">
        <strong>Message Preview:</strong> <br />
        Start Poll #{poll._id}
      </div>

      {/* Buttons */}
      <div className="mt-5 flex flex-col gap-3">
        <button
          onClick={() => {
            window.location.href = iMessageEntryUrl;
          }}
          className="w-full py-3 bg-pyngl-pink text-white rounded-full font-medium text-base"
        >
          Open Messages
        </button>

        <button
          onClick={async () => {
            await navigator.clipboard.writeText(iMessageEntryUrl);
            toast.success("Link copied!");
          }}
          className="w-full py-3 bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-full font-medium text-base"
        >
          Copy Share Link
        </button>
      </div>
    </div>
  </div>
) : (
  <div ref={pollRef} className="flex justify-center relative">
    <PollPreview
      poll={poll}
      croppedImage={previewImage}
      aspect={platformDimensions[platform]?.aspect || 1}
    />
                      
                       {editedOnce && poll.type !== "text" && (
                        <button
                          onClick={handleRestore}
                          className="restore-button absolute top-0 left-6 w-8 h-8 bg-pink-100 dark:bg-pink-900/50 rounded-full flex items-center justify-center shadow border border-pink-200 dark:border-pink-800"
                          disabled={isLoading}
                        >
                          <RotateCw size={18} className="text-pink-600 dark:text-pink-300" />
                        </button>
                      )}

                      {poll.type !== "text" && (
                        <button
                          onClick={() => setIsEditing(true)}
                          className="edit-button absolute top-0 right-6 w-8 h-8 bg-pink-100 dark:bg-pink-900/50 rounded-full flex items-center justify-center shadow border border-pink-200 dark:border-pink-800"
                          disabled={isLoading}
                        >
                          <Edit2 size={16} className="text-pink-600 dark:text-pink-300" />
                        </button>
               )}
            </div>
            )}

          {platform !== "imessages" && (
  <div className="flex justify-center mt-3 gap-14">
    <div className="text-xs font-semibold text-gray-900 dark:text-gray-100">
      {platformDimensions[platform]?.label || platform}
    </div>
    <div className="text-xs text-gray-500 dark:text-gray-400">
      {platformDimensions[platform]?.width}×{platformDimensions[platform]?.height}
    </div>
  </div>
)}
          </div>

          <div className="px-6 pb-6 mt-2">
            <button
              onClick={handleShare}
              className="w-full py-3 bg-pyngl-pink text-white rounded-full font-medium text-base flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed transition-opacity"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader size={20} className="animate-spin mr-2" />
                  Preparing Share...
                </>
              ) : platform === "imessages" ? (
                "Share Link"
              ) : (
                `Share on ${platform.charAt(0).toUpperCase() + platform.slice(1)}`
              )}
            </button>
          </div>
        </div>
      </div>

      {platform !== "imessages" && isEditing && (
        <ImageEditPreview
          imageSrc={dbImage}
          aspect={platformDimensions[platform]?.aspect || 9 / 16}
          onSave={(croppedImageUrl) => {
            setPreviewImage(croppedImageUrl);
            poll.image = croppedImageUrl;
            setImageDimensions(platformDimensions[platform]);
            setIsEditing(false);
            setEditedOnce(true);
          }}
          onClose={() => setIsEditing(false)}
        />
      )}
    </>
  );
}

