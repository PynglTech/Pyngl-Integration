// import React, { useState, useEffect, useRef } from "react";
// import { X, Check } from "lucide-react";
// import { AiFillInstagram, AiFillYoutube } from "react-icons/ai";
// import {
//   FaWhatsapp,
//   FaFacebookF,
//   FaLinkedinIn,
//   FaTelegramPlane,
//   FaTwitter,
// } from "react-icons/fa";
// import { SiGmail } from "react-icons/si";
// import { MdMessage, MdSms } from "react-icons/md";
// import apiClient from "../../api/axiosConfig";
// import PlatformPreview from "../preview/PlatformPreview";

// // ===== Share Links =====
// const shareLinks = {
//   instagram: (url, text) => `https://www.instagram.com/`,
//   youtube: (url, text) => `https://www.youtube.com/`,
//   whatsapp: (url, text) =>
//     `https://wa.me/?text=${encodeURIComponent(text + "\n" + url)}`,
//   gmail: (url, text) =>
//     `mailto:?subject=${encodeURIComponent(text)}&body=${encodeURIComponent(
//       url
//     )}`,
//   linkedin: (url, text) =>
//     `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
//       url
//     )}`,
//   twitter: (url, text) =>
//     `https://twitter.com/intent/tweet?text=${encodeURIComponent(
//       text
//     )}&url=${encodeURIComponent(url)}`,
//   facebook: (url, text) =>
//     `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
//   messages: (url, text) => `sms:?body=${encodeURIComponent(text + "\n" + url)}`,
//   sms: (url, text) => `sms:?body=${encodeURIComponent(text + "\n" + url)}`,
//   telegram: (url, text) =>
//     `https://t.me/share/url?url=${encodeURIComponent(
//       url
//     )}&text=${encodeURIComponent(text)}`,
// };

// // ===== Platform Icons =====
// const platformIcons = {
//   instagram: <AiFillInstagram size={28} />,
//   youtube: <AiFillYoutube size={28} />,
//   whatsapp: <FaWhatsapp size={28} />,
//   gmail: <SiGmail size={28} />,
//   linkedin: <FaLinkedinIn size={28} />,
//   twitter: <FaTwitter size={28} />,
//   facebook: <FaFacebookF size={28} />,
//   messages: <MdMessage size={28} />,
//   sms: <MdSms size={28} />,
//   telegram: <FaTelegramPlane size={28} />,
// };

// // ===== Share Button Component =====
// const ShareButton = ({ platform, onSelect, isSelected, completed }) => (
//   <div className="flex flex-col items-center relative">
//     {completed.includes(platform) && (
//       <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-pink-500 flex items-center justify-center border-2 border-white shadow">
//         <Check size={14} className="text-white" />
//       </div>
//     )}
//     <button
//       onClick={() => onSelect(platform)}
//       className={`relative w-16 h-16 rounded-2xl flex items-center justify-center bg-gray-100 text-gray-700 shadow-sm hover:scale-105 transition ${
//         isSelected ? "ring-2 ring-pink-500" : ""
//       }`}
//     >
//       {platformIcons[platform]}
//     </button>
//     <span className="mt-2 text-xs text-gray-700 font-medium capitalize">
//       {platform === "sms" ? "SMS" : platform}
//     </span>
//   </div>
// );

// // ===== Main Component =====
// export default function ShareSheet({
//   poll = {
//     _id: "123",
//     question: "Sample poll question?",
//     options: [{ text: "Option 1" }, { text: "Option 2" }],
//   },
//   capturedImage,
//   onClose = () => {},
// }) {
//   const [selected, setSelected] = useState([]);
//   const [shareQueue, setShareQueue] = useState([]);
//   const [completed, setCompleted] = useState([]);
//   const [currentPlatform, setCurrentPlatform] = useState(null);
//   const [showGmailPopup, setShowGmailPopup] = useState(false);
//   const lastShared = useRef(null);

//   const pollUrl = `https://example.com/poll/${poll._id}`;
//   const pollText = poll.question;
//   const platforms = Object.keys(platformIcons);

//   // Handle coming back from share tab
//   useEffect(() => {
//     const handleVisibilityChange = () => {
//       if (document.visibilityState === "visible" && lastShared.current) {
//         setCompleted((prev) => [...prev, lastShared.current]);

//         const newQueue = [...shareQueue];
//         newQueue.shift();

//         if (newQueue.length > 0) {
//           setShareQueue(newQueue);
//           setCurrentPlatform(newQueue[0]); // show next preview
//         } else {
//           setTimeout(() => {
//             setSelected([]);
//             setCompleted([]);
//             setCurrentPlatform(null);
//             onClose();
//           }, 500);
//         }
//       }
//     };
//     document.addEventListener("visibilitychange", handleVisibilityChange);
//     return () =>
//       document.removeEventListener("visibilitychange", handleVisibilityChange);
//   }, [shareQueue, onClose]);

//   const handleSelectPlatform = (platform) => {
//     // Special handling for Gmail - show popup instead of selecting
//     if (platform === "gmail") {
//       setShowGmailPopup(true);
//       return;
//     }

//     setSelected((prev) =>
//       prev.includes(platform)
//         ? prev.filter((p) => p !== platform)
//         : [...prev, platform]
//     );
//   };

//   const handleStartMultiShare = () => {
//     if (selected.length === 0) return;
//     setCompleted([]);
//     setShareQueue(selected);
//     setCurrentPlatform(selected[0]); // open first preview
//   };

//   const handleConfirmShare = async () => {
//     if (!currentPlatform) return;

//     // Open share link
//     window.open(shareLinks[currentPlatform](pollUrl, pollText), "_blank");

//     try {
//       // Send platform info to backend
//       await apiClient.post(`/api/polls/${poll._id}/share`, {
//         platform: currentPlatform,
//       });
//       console.log(`${currentPlatform} shared saved to DB`);
//     } catch (err) {
//       console.error("Failed to save shared platform:", err);
//     }
//     lastShared.current = currentPlatform;
//   };

//   return (
//     <div className="fixed inset-0 bg-white flex flex-col z-50">
//       {/* Header */}
//       <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
//         <h3 className="font-semibold text-lg text-gray-900">Share Via</h3>
//         <button onClick={onClose} className="p-1">
//           <X size={24} className="text-gray-600" />
//         </button>
//       </div>

//       {/* Grid */}
//       <div className="flex-1 flex flex-col justify-center px-6">
//         <div className="grid grid-cols-3 sm:grid-cols-4 gap-x-8 gap-y-8 max-w-md mx-auto">
//           {platforms.map((platform) => (
//             <ShareButton
//               key={platform}
//               platform={platform}
//               onSelect={handleSelectPlatform}
//               isSelected={selected.includes(platform)}
//               completed={completed}
//             />
//           ))}
//         </div>
//       </div>

//       {/* Footer buttons */}
//       <div className="px-6 pb-8 pt-4 border-t border-gray-200">
//         <div className="flex gap-3">
//           <button
//             onClick={() => setSelected([])}
//             className="flex-1 py-4 bg-gray-100 text-gray-700 rounded-full font-semibold text-base"
//           >
//             Clear
//           </button>
//           <button
//             onClick={handleStartMultiShare}
//             className="flex-1 py-4 bg-pink-500 text-white rounded-full font-semibold text-base shadow-md disabled:opacity-50"
//             disabled={selected.length === 0}
//           >
//             Share {selected.length > 0 ? `(${selected.length})` : ""}
//           </button>
//         </div>
//       </div>

//       {/* Gmail Connect Popup */}
//       {showGmailPopup && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-xl p-6 w-96 shadow-lg">
//             <h2 className="text-lg font-semibold mb-4 text-center">Share via Gmail</h2>
//             <p className="text-gray-600 text-sm text-center mb-6">
//               To share this poll via Gmail, connect your Google account.
//             </p>
//             <button
//               onClick={() => {
//                 window.location.href = `http://localhost:5000/auth/login?pollId=${poll._id}`;
//               }}
//               className="w-full py-3 bg-red-500 text-white rounded-full font-medium hover:bg-red-600 transition"
//             >
//               Connect with Google
//             </button>
//             <button
//               onClick={() => setShowGmailPopup(false)}
//               className="mt-4 w-full py-2 rounded-full border border-gray-300 text-gray-600 font-medium hover:bg-gray-50 transition"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Platform Preview Modal */}
//       {currentPlatform && (
//         <PlatformPreview
//           platform={currentPlatform}
//           poll={{ ...poll, image: capturedImage || poll.image }} // use captured image if available
//           onClose={() => setCurrentPlatform(null)}
//           onConfirm={handleConfirmShare}
//         />
//       )}
//     </div>
//   );
// }

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

// Base URL for the backend preview route.
// NOTE: Since your frontend runs on 192.168.1.7:5173,
// you need to use the actual poll URL that the backend (server) will serve,
// e.g., 'https://yourdomain.com' or a local dev proxy.
// I'll use a placeholder for the base domain of your backend-served poll page.
const POLL_PAGE_DOMAIN = 'https://slow-results-stand.loca.lt'; // Change to your actual domain
const POLL_PREVIEW_BASE = `${POLL_PAGE_DOMAIN}/api/polls/`; // Points to your router's /:id/preview

// ===== Share Links - Now using the Preview URL to trigger OG tags =====
const shareLinks = {
  instagram: (previewUrl, text) => ``, // Handled by native share in PlatformPreview
  youtube: (previewUrl, text) =>
    `https://www.youtube.com/`, // YouTube isn't direct link share, often just for embedding
  whatsapp: (previewUrl, text) =>
    // WhatsApp's web share link needs the URL to be at the end for the preview to work best
    `https://api.whatsapp.com/send?text=${encodeURIComponent(text + "\n" + previewUrl)}`,
  gmail: (previewUrl, text) =>
    `mailto:?subject=${encodeURIComponent(text)}&body=${encodeURIComponent(
      previewUrl
    )}`,
  linkedin: (previewUrl, text) =>
    `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      previewUrl
    )}`,
  twitter: (previewUrl, text) =>
    `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      text
    )}&url=${encodeURIComponent(previewUrl)}`,
  facebook: (previewUrl, text) =>
    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(previewUrl)}`,
  messages: (previewUrl, text) => `sms:?body=${encodeURIComponent(text + "\n" + previewUrl)}`,
  sms: (previewUrl, text) => `sms:?body=${encodeURIComponent(text + "\n" + previewUrl)}`,
  telegram: (previewUrl, text) =>
    `https://t.me/share/url?url=${encodeURIComponent(
      previewUrl
    )}&text=${encodeURIComponent(text)}`,
};

// ===== Platform Icons (No change) =====
// ... other imports ...

// ===== Platform Icons =====
const platformIcons = {
  instagram: <AiFillInstagram size={28} />,
  youtube: <AiFillYoutube size={28} />,
  whatsapp: <FaWhatsapp size={28} />,
  gmail: <SiGmail size={28} />,
  linkedin: <FaLinkedinIn size={28} />,
  twitter: <FaTwitter size={28} />,
  facebook: <FaFacebookF size={28} />,
  imessages: <MdMessage size={28} />, // 📌 Updated key from 'messages' to 'imessages'
  sms: <MdSms size={28} />,
  telegram: <FaTelegramPlane size={28} />,
};

// ===== Share Button Component =====
const ShareButton = ({ platform, onSelect, isSelected, completed }) => (
  <div className="flex flex-col items-center relative">
    {completed.includes(platform) && (
      <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-pink-500 flex items-center justify-center border-2 border-white shadow">
        <Check size={14} className="text-white" />
      </div>
    )}
    <button
      onClick={() => onSelect(platform)}
      className={`relative w-16 h-16 rounded-2xl flex items-center justify-center bg-gray-100 text-gray-700 shadow-sm hover:scale-105 transition ${
        isSelected ? "ring-2 ring-pink-500" : ""
      }`}
    >
      {platformIcons[platform]}
    </button>
    <span className="mt-2 text-xs text-gray-700 font-medium capitalize">
      {/* 📌 Updated display logic to handle 'imessages' platform */}
      {platform === "sms" ? "SMS" : platform === "imessages" ? "i Messages" : platform}
    </span>
  </div>
);
// ===== Main Component =====
export default function ShareSheet({
  poll = {
    _id: "123",
    question: "Sample poll question?",
    options: [{ text: "Option 1" }, { text: "Option 2" }],
  },
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

  // Handle coming back from share tab (No change)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible" && lastShared.current) {
        setCompleted((prev) => [...prev, lastShared.current]);

        const newQueue = [...shareQueue];
        newQueue.shift();

        if (newQueue.length > 0) {
          setShareQueue(newQueue);
          setCurrentPlatform(newQueue[0]); // show next preview
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
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [shareQueue, onClose]);

  const handleSelectPlatform = (platform) => {
    // Special handling for Gmail - show popup instead of selecting
    if (platform === "gmail") {
      setShowGmailPopup(true);
      return;
    }

    setSelected((prev) =>
      prev.includes(platform)
        ? prev.filter((p) => p !== platform)
        : [...prev, platform]
    );
  };

  const handleStartMultiShare = () => {
    if (selected.length === 0) return;
    setCompleted([]);
    setShareQueue(selected);
    setCurrentPlatform(selected[0]); // open first preview
  };

  /**
   * Confirms the share action, opens the platform link, and updates the backend.
   * This is called by PlatformPreview *after* image capture/upload.
   * @param {string} hostedPreviewImage - The public URL of the uploaded preview image.
   */
  const handleConfirmShare = async (hostedPreviewImage) => {
    const platform = currentPlatform;
    if (!platform) return;

    // 1. Construct the URL that serves the OG/Twitter card tags
    // The URL includes the platform so the backend can pick the right metadata and image
    const previewUrl = `${POLL_PREVIEW_BASE}${poll._id}/preview?platform=${platform}`;
    
    // 2. Open share link for platforms that don't use native sharing
    if (platform !== "instagram") {
      let shareUrl = shareLinks[platform](previewUrl, pollText);

      if (shareUrl) {
          window.open(shareUrl, "_blank");
          alert(
              "The poll preview image will appear on platforms that support OG tags (X/Twitter, Facebook, Telegram, WhatsApp). This may take a moment to load."
          );
      }
    }

    try {
      // 3. Send platform info to backend
      await apiClient.post(`/api/polls/${poll._id}/share`, {
        platform: platform,
      });
      console.log(`${platform} shared saved to DB`);
    } catch (err) {
      console.error("Failed to save shared platform:", err);
    }
    
    // 4. Update state to proceed
    lastShared.current = platform;
    setCurrentPlatform(null); // Close preview, trigger useEffect on tab focus
  };

  return (
    <div className="fixed inset-0 bg-white flex flex-col z-50">
      {/* Header */}
      <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
        <h3 className="font-semibold text-lg text-gray-900">Share Via</h3>
        <button onClick={onClose} className="p-1">
          <X size={24} className="text-gray-600" />
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
      <div className="px-6 pb-8 pt-4 border-t border-gray-200">
        <div className="flex gap-3">
          <button
            onClick={() => setSelected([])}
            className="flex-1 py-4 bg-gray-100 text-gray-700 rounded-full font-semibold text-base"
          >
            Clear
          </button>
          <button
            onClick={handleStartMultiShare}
            className="flex-1 py-4 bg-pink-500 text-white rounded-full font-semibold text-base shadow-md disabled:opacity-50"
            disabled={selected.length === 0}
          >
            Share {selected.length > 0 ? `(${selected.length})` : ""}
          </button>
        </div>
      </div>

      {/* Gmail Connect Popup */}
      {showGmailPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-96 shadow-lg">
            <h2 className="text-lg font-semibold mb-4 text-center">Share via Gmail</h2>
            <p className="text-gray-600 text-sm text-center mb-6">
              To share this poll via Gmail, connect your Google account.
            </p>
            <button
              onClick={() => {
                window.location.href = `http://localhost:5000/auth/login?pollId=${poll._id}`;
              }}
              className="w-full py-3 bg-red-500 text-white rounded-full font-medium hover:bg-red-600 transition"
            >
              Connect with Google
            </button>
            <button
              onClick={() => setShowGmailPopup(false)}
              className="mt-4 w-full py-2 rounded-full border border-gray-300 text-gray-600 font-medium hover:bg-gray-50 transition"
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