import React, { useState, useEffect, useRef } from "react";
import { X, Check } from "lucide-react";
import { AiFillInstagram, AiFillYoutube } from "react-icons/ai";
import {
  FaWhatsapp,
  FaFacebookF,
  FaLinkedinIn,
  FaTelegramPlane,
  FaTwitter,
} from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { MdMessage, MdSms } from "react-icons/md";
import apiClient from "../../api/axiosConfig";
import PlatformPreview from "../preview/PlatformPreview";

const POLL_PAGE_DOMAIN = 'https://slow-results-stand.loca.lt';
const POLL_PREVIEW_BASE = `${POLL_PAGE_DOMAIN}/api/polls/`;

const shareLinks = {
  instagram: () => ``,
  youtube: () => `https://www.youtube.com/`,
  whatsapp: (url, text) => `https://api.whatsapp.com/send?text=${encodeURIComponent(text + "\n" + url)}`,
  gmail: (url, text) => `mailto:?subject=${encodeURIComponent(text)}&body=${encodeURIComponent(url)}`,
  linkedin: (url) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  twitter: (url, text) => `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
  facebook: (url) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  imessages: (url, text) => `sms:?body=${encodeURIComponent(text + "\n" + url)}`,
  sms: (url, text) => `sms:?body=${encodeURIComponent(text + "\n" + url)}`,
  telegram: (url, text) => `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
};

const platformIcons = {
  instagram: <AiFillInstagram size={28} />,
  youtube: <AiFillYoutube size={28} />,
  whatsapp: <FaWhatsapp size={28} />,
  gmail: <SiGmail size={28} />,
  linkedin: <FaLinkedinIn size={28} />,
  twitter: <FaTwitter size={28} />,
  facebook: <FaFacebookF size={28} />,
  imessages: <MdMessage size={28} />,
  sms: <MdSms size={28} />,
  telegram: <FaTelegramPlane size={28} />,
};

const ShareButton = ({ platform, onSelect, isSelected, completed }) => (
  <div className="flex flex-col items-center relative">
    {completed.includes(platform) && (
      <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-pink-500 flex items-center justify-center border-2 border-white shadow">
        <Check size={14} className="text-white" />
      </div>
    )}
    <button
      onClick={() => onSelect(platform)}
      className={`relative w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm transition-transform
        bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200
        hover:scale-105 ${isSelected ? "ring-2 ring-pink-500" : ""}`}
    >
      {platformIcons[platform]}
    </button>
    <span className="mt-2 text-xs font-medium capitalize text-gray-700 dark:text-gray-200">
      {platform === "sms" ? "SMS" : platform === "imessages" ? "i Messages" : platform}
    </span>
  </div>
);

export default function ShareSheet({
  poll = { _id: "123", question: "Sample poll question?", options: [{ text: "Option 1" }, { text: "Option 2" }] },
  capturedImage,
  onClose = () => {},
}) {
  const [selected, setSelected] = useState([]);
  const [shareQueue, setShareQueue] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [currentPlatform, setCurrentPlatform] = useState(null);
  const [showGmailPopup, setShowGmailPopup] = useState(false);
  const lastShared = useRef(null);

  const pollText = poll.question;
  const platforms = Object.keys(platformIcons);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible" && lastShared.current) {
        setCompleted((prev) => [...prev, lastShared.current]);

        const newQueue = [...shareQueue];
        newQueue.shift();

        if (newQueue.length > 0) {
          setShareQueue(newQueue);
          setCurrentPlatform(newQueue[0]);
        } else {
          setTimeout(() => {
            setSelected([]);
            setCompleted([]);
            setCurrentPlatform(null);
            onClose();
          }, 500);
        }
        lastShared.current = null;
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [shareQueue, onClose]);

  const handleSelectPlatform = (platform) => {
    if (platform === "gmail") {
      setShowGmailPopup(true);
      return;
    }
    setSelected((prev) =>
      prev.includes(platform) ? prev.filter((p) => p !== platform) : [...prev, platform]
    );
  };

  const handleStartMultiShare = () => {
    if (selected.length === 0) return;
    setCompleted([]);
    setShareQueue(selected);
    setCurrentPlatform(selected[0]);
  };

  const handleConfirmShare = async (hostedPreviewImage) => {
    const platform = currentPlatform;
    if (!platform) return;

    const previewUrl = `${POLL_PREVIEW_BASE}${poll._id}/preview?platform=${platform}`;

    if (platform !== "instagram") {
      const shareUrl = shareLinks[platform](previewUrl, pollText);
      if (shareUrl) window.open(shareUrl, "_blank");
    }

    try {
      await apiClient.post(`/api/polls/${poll._id}/share`, { platform });
      console.log(`${platform} shared saved to DB`);
    } catch (err) {
      console.error("Failed to save shared platform:", err);
    }

    lastShared.current = platform;
    setCurrentPlatform(null);
  };

  return (
    <div className="fixed inset-0 flex flex-col z-50 bg-white dark:bg-gray-900 transition-colors">
      {/* Header */}
      <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">Share Via</h3>
        <button onClick={onClose} className="p-1">
          <X size={24} className="text-gray-600 dark:text-gray-300" />
        </button>
      </div>

      {/* Grid */}
      <div className="flex-1 flex flex-col justify-center px-6">
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-x-8 gap-y-8 max-w-md mx-auto">
          {platforms.map((platform) => (
            <ShareButton
              key={platform}
              platform={platform}
              onSelect={handleSelectPlatform}
              isSelected={selected.includes(platform)}
              completed={completed}
            />
          ))}
        </div>
      </div>

      {/* Footer buttons */}
      <div className="px-6 pb-8 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex gap-3">
          <button
  onClick={() => {
    setSelected([]);
    setCompleted([]);
    setShareQueue([]);
    setCurrentPlatform(null);
  }}
  className="flex-1 py-4 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-full font-semibold text-base"
>
  Clear
</button>

          <button
            onClick={handleStartMultiShare}
            disabled={selected.length === 0}
            className="flex-1 py-4 bg-pink-500 text-white rounded-full font-semibold text-base shadow-md disabled:opacity-50"
          >
            Share {selected.length > 0 ? `(${selected.length})` : ""}
          </button>
        </div>
      </div>

      {/* Gmail Popup */}
      {showGmailPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-96 shadow-lg transition-colors">
            <h2 className="text-lg font-semibold mb-4 text-center text-gray-900 dark:text-gray-100">
              Share via Gmail
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm text-center mb-6">
              To share this poll via Gmail, connect your Google account.
            </p>
            <button
              onClick={() => {
                window.location.href = `http://localhost:5000/auth/login?pollId=${poll._id}`;
              }}
              className="w-full py-3 bg-red-500 hover:bg-red-600 text-white rounded-full font-medium transition"
            >
              Connect with Google
            </button>
            <button
              onClick={() => setShowGmailPopup(false)}
              className="mt-4 w-full py-2 rounded-full border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Platform Preview Modal */}
      {currentPlatform && (
        <PlatformPreview
          platform={currentPlatform}
          poll={{ ...poll, image: capturedImage || poll.image }}
          onClose={() => setCurrentPlatform(null)}
          onConfirm={handleConfirmShare}
        />
      )}
    </div>
  );
}
