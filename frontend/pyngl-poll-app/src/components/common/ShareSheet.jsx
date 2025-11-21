// import React, { useState, useEffect, useRef } from "react";
// import { X, Check, ArrowLeft } from "lucide-react";
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
// import PlatformPreview from "../preview/PlatformPreview.jsx";

// const POLL_PAGE_DOMAIN = "https://api.pyngl.com";
// const POLL_PREVIEW_BASE = `${POLL_PAGE_DOMAIN}/api/polls/`;

// const shareLinks = {
//   instagram: () => ``,
//   youtube: () => `https://www.youtube.com/`,
//   whatsapp: (url, text) =>
//     `https://api.whatsapp.com/send?text=${encodeURIComponent(
//       text + "\n" + url
//     )}`,
//   gmail: (url, text) =>
//     `mailto:?subject=${encodeURIComponent(text)}&body=${encodeURIComponent(
//       url
//     )}`,
//   linkedin: (url) =>
//     `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
//       url
//     )}`,
//   twitter: (url, text) =>
//     `https://twitter.com/intent/tweet?text=${encodeURIComponent(
//       text
//     )}&url=${encodeURIComponent(url)}`,
//   facebook: () =>
//     ``,
//   imessages: (url, text) =>
//     `sms:?body=${encodeURIComponent(text + "\n" + url)}`,
//   sms: (url, text) => `sms:?body=${encodeURIComponent(text + "\n" + url)}`,
//   telegram: (url, text) =>
//     `https://t.me/share/url?url=${encodeURIComponent(
//       url
//     )}&text=${encodeURIComponent(text)}`,
// };

// const platformIcons = {
//   instagram: <AiFillInstagram size={28} />,
//   youtube: <AiFillYoutube size={28} />,
//   whatsapp: <FaWhatsapp size={28} />,
//   gmail: <SiGmail size={28} />,
//   linkedin: <FaLinkedinIn size={28} />,
//   twitter: <FaTwitter size={28} />,
//   facebook: <FaFacebookF size={28} />,
//   imessages: <MdMessage size={28} />,
//   sms: <MdSms size={28} />,
//   telegram: <FaTelegramPlane size={28} />,
// };

// const ShareButton = ({ platform, onSelect, isSelected, completed }) => (
//   <div className="flex flex-col items-center relative">
//     {completed.includes(platform) && (
//       <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-pink-500 flex items-center justify-center border-2 border-white shadow">
//         <Check size={14} className="text-white" />
//       </div>
//     )}
//     <button
//       onClick={() => onSelect(platform)}
//       className={`relative w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm transition-transform
//         bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200
//         hover:scale-105 ${isSelected ? "ring-2 ring-pink-500" : ""}`}
//     >
//       {platformIcons[platform]}
//     </button>
//     <span className="mt-2 text-xs font-medium capitalize text-gray-700 dark:text-gray-200">
//       {platform === "sms"
//         ? "SMS"
//         : platform === "imessages"
//         ? "i Messages"
//         : platform}
//     </span>
//   </div>
// );

// export default function ShareSheet({
//   poll = {
//     _id: "123",
//     question: "Sample poll question?",
//     options: [{ text: "Option 1" }, { text: "Option 2" }],
//   },
//   capturedImage,
//   connectedEmail,
//   onClose = () => {},
// }) {
//   console.log("🚀 ~ ShareSheet ~ connectedEmail:", connectedEmail);
//   const [selected, setSelected] = useState([]);
//   const [shareQueue, setShareQueue] = useState([]);
//   const [completed, setCompleted] = useState([]);
//   const [currentPlatform, setCurrentPlatform] = useState(null);
//   const [showGmailPopup, setShowGmailPopup] = useState(false);
//   const lastShared = useRef(null);

//   const pollText = poll.question;
//   const platforms = Object.keys(platformIcons);

//   useEffect(() => {
//     const handleVisibilityChange = () => {
//       if (document.visibilityState === "visible" && lastShared.current) {
//         setCompleted((prev) => [...prev, lastShared.current]);

//         const newQueue = [...shareQueue];
//         newQueue.shift();

//         if (newQueue.length > 0) {
//           setShareQueue(newQueue);
//           setCurrentPlatform(newQueue[0]);
//         } else {
//           setTimeout(() => {
//             setSelected([]);
//             setCompleted([]);
//             setCurrentPlatform(null);
//             onClose();
//           }, 500);
//         }
//         lastShared.current = null;
//       }
//     };
//     document.addEventListener("visibilitychange", handleVisibilityChange);
//     return () =>
//       document.removeEventListener("visibilitychange", handleVisibilityChange);
//   }, [shareQueue, onClose]);

//   const handleSelectPlatform = async (platform) => {
//     if (platform === "gmail") {
//       try {
//         // Check if the user is authenticated
//         const res = await apiClient.get(`/auth/check?email=${connectedEmail}`);

//         if (res.data.authenticated) {
//           // Already authenticated → directly redirect to share page
//           window.location.href = `/share?connectedEmail=${encodeURIComponent(
//             connectedEmail
//           )}&pollId=${poll._id}`;
//         } else {
//           // Not authenticated → show Gmail connect popup
//           setShowGmailPopup(true);
//         }
//       } catch (err) {
//         console.error("Error checking Gmail authentication:", err);
//         // Show popup if any error occurs
//         setShowGmailPopup(true);
//       }
//     } else {
//       // Handle other platforms normally
//       setSelected((prev) =>
//         prev.includes(platform)
//           ? prev.filter((p) => p !== platform)
//           : [...prev, platform]
//       );
//     }
//   };

//   const handleStartMultiShare = () => {
//     if (selected.length === 0) return;
//     setCompleted([]);
//     setShareQueue(selected);
//     setCurrentPlatform(selected[0]);
//   };

//   const handleConfirmShare = async (hostedPreviewImage) => {
//     const platform = currentPlatform;
//     if (!platform) return;

//     const previewUrl = `${POLL_PREVIEW_BASE}${poll._id}/preview?platform=${platform}`;

//     if (platform !== "instagram" && platform !== "facebook") {
//       const shareUrl = shareLinks[platform](previewUrl, pollText);
//       if (shareUrl) window.open(shareUrl, "_blank");
//     }

//     try {
//       await apiClient.post(`/api/polls/${poll._id}/share`, { platform });
//       console.log(`${platform} shared saved to DB`);
//     } catch (err) {
//       console.error("Failed to save shared platform:", err);
//     }

//     lastShared.current = platform;
//     setCurrentPlatform(null);
//   };

//   return (
//     <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-end sm:items-center sm:justify-center animate-fade-in">
//             <div className="w-full sm:max-w-lg flex flex-col bg-white dark:bg-gray-900 transition-colors sm:rounded-2xl h-[90vh] sm:h-auto">
//                 <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 dark:border-gray-700">
//                     <button onClick={onClose} className="p-1 sm:hidden"><ArrowLeft size={24} className="text-gray-600 dark:text-gray-300" /></button>
//                     <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">Share Via</h3>
//                     <span className="text-sm text-gray-500 hidden sm:block">Tap to select</span>
//                     <button onClick={onClose} className="p-1 hidden sm:block"><X size={24} className="text-gray-600 dark:text-gray-300" /></button>
//                 </div>

//                 <div className="flex-1 flex flex-col justify-center p-6">
//                     <div className="grid grid-cols-3 gap-x-6 gap-y-8 max-w-xs mx-auto">
//                         {platforms.map((platform) => (
//                             <ShareButton key={platform} platform={platform} onSelect={handleSelectPlatform} isSelected={selected.includes(platform)} completed={completed} />
//                         ))}
//                     </div>
//                 </div>

//                 <div className="px-6 pb-8 pt-4 border-t border-gray-200 dark:border-gray-700">
//                     <div className="flex gap-4">
//                         <button onClick={() => setSelected([])} className="flex-1 py-3 bg-transparent border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 rounded-full font-semibold text-base transition-colors hover:bg-gray-100 dark:hover:bg-gray-800">
//                             Clear
//                         </button>
//                         <button onClick={handleStartMultiShare} disabled={selected.length === 0} className="flex-1 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full font-semibold text-base shadow-lg transition-all hover:shadow-xl disabled:opacity-50 disabled:shadow-none">
//                             Share {selected.length > 0 ? `(${selected.length})` : ""}
//                         </button>
//                     </div>
//                 </div>

//                 {showGmailPopup && (
//                     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
//                         <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-sm mx-4 shadow-lg">
//                             <h2 className="text-lg font-semibold mb-4 text-center">Share via Gmail</h2>
//                             <p className="text-gray-600 dark:text-gray-300 text-sm text-center mb-6">To share this poll via Gmail, please connect your Google account first.</p>
//                             <button onClick={() => { window.location.href = `https://api.pyngl.com/auth/login?pollId=${poll._id}`; }} className="w-full py-3 bg-red-500 hover:bg-red-600 text-white rounded-full font-medium transition">Connect with Google</button>
//                             <button onClick={() => setShowGmailPopup(false)} className="mt-4 w-full py-2.5 rounded-full border border-gray-300 dark:border-gray-600 font-medium hover:bg-gray-50 dark:hover:bg-gray-700">Cancel</button>
//                         </div>
//                     </div>
//                 )}

//                 {currentPlatform && (
//                     <PlatformPreview platform={currentPlatform} poll={{ ...poll, image: capturedImage || poll.image }} onClose={() => setCurrentPlatform(null)} onConfirm={handleConfirmShare} />
//                 )}
//             </div>
//         </div>
//     );
// }
import React, { useState, useEffect, useRef } from "react";
import useAuthStore from "../../store/useAuthStore";

import { X, Check, Link2, ArrowLeft } from "lucide-react";
import { toast } from 'react-hot-toast';
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
import PlatformPreview from "../preview/PlatformPreview.jsx";
import ContactSelectorModal from "../ContactSelectorModal.jsx";

const POLL_PAGE_DOMAIN = "https://puny-pants-share.loca.lt";
const POLL_PREVIEW_BASE = `${POLL_PAGE_DOMAIN}/api/polls/`;

// --- CORRECTED: Share Links Logic ---
const shareLinks = {
    instagram: (previewUrl, text) => ``, // Instagram is handled by native share
    youtube: (previewUrl, text) => ``, // YouTube doesn't have direct sharing via URL
    whatsapp: (previewUrl, text) => `https://api.whatsapp.com/send?text=${encodeURIComponent(text + "\n" + previewUrl)}`,
    gmail: (previewUrl, text) => `mailto:?subject=${encodeURIComponent(text)}&body=${encodeURIComponent(previewUrl)}`,
    linkedin: (previewUrl, text) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(previewUrl)}`,
    twitter: (previewUrl, text) => `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(previewUrl)}`,
    facebook: (previewUrl, text) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(previewUrl)}`,
    messages: (previewUrl, text) => `sms:?body=${encodeURIComponent(text + "\n" + previewUrl)}`,
    sms: (previewUrl, text) => `sms:?body=${encodeURIComponent(text + "\n" + previewUrl)}`,
    telegram: (previewUrl, text) => `https://t.me/share/url?url=${encodeURIComponent(previewUrl)}&text=${encodeURIComponent(text)}`,
};

// --- Platform Icons (Unchanged) ---
const platformIcons = {
    instagram: <AiFillInstagram size={32} />,
    youtube: <AiFillYoutube size={32} />,
    whatsapp: <FaWhatsapp size={32} />,
    gmail: <SiGmail size={32} />,
    linkedin: <FaLinkedinIn size={32} />,
    twitter: <FaTwitter size={32} />,
    facebook: <FaFacebookF size={32} />,
    messages: <MdMessage size={32} />,
    sms: <MdSms size={32} />,
    telegram: <FaTelegramPlane size={32} />,
    copy: <Link2 size={32} />,
};

// --- Share Button Component (Unchanged) ---
const ShareButton = ({ platform, onSelect, isSelected, completed }) => (
    <div className="flex flex-col items-center relative">
        {completed.includes(platform) && (
            <div className="absolute -top-2 -right-1 w-6 h-6 rounded-full bg-pink-500 flex items-center justify-center border-2 border-white dark:border-gray-800 shadow">
                <Check size={14} className="text-white" />
            </div>
        )}
        <button
            onClick={() => onSelect(platform)}
            className={`relative w-20 h-20 rounded-2xl flex items-center justify-center shadow-sm transition-all duration-200 bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200 hover:scale-105 active:scale-95 ${isSelected ? "ring-2 ring-pink-500" : "ring-2 ring-transparent"}`}
        >
            {platformIcons[platform]}
        </button>
        <span className="mt-2 text-xs font-medium capitalize text-gray-600 dark:text-gray-300">
            {platform === "sms" ? "SMS" : platform === "copy" ? "Copy Link" : platform === "messages" ? "iMessage" : platform}
        </span>
    </div>
);

// --- Main ShareSheet Component (Logic Completed) ---
export default function ShareSheet({
    poll = { _id: "123", question: "Sample poll question?" },
    capturedImage,
    onClose = () => {},
}) {
    const [selected, setSelected] = useState([]);
    const [shareQueue, setShareQueue] = useState([]);
    const [completed, setCompleted] = useState([]);
    const [currentPlatform, setCurrentPlatform] = useState(null);
    const [showGmailPopup, setShowGmailPopup] = useState(false);
    const [showContactSelector, setShowContactSelector] = useState(false);
  const [availableContacts, setAvailableContacts] = useState([]);

    const lastShared = useRef(null);
    // get logged-in user info (and phone)
const { userInfo } = useAuthStore.getState();
const userPhoneNumber = userInfo?.phoneNumber || null;

    const pollText = poll.question;
    const platforms = ['instagram', 'youtube', 'whatsapp', 'gmail', 'linkedin', 'twitter', 'facebook', 'messages', 'sms', 'telegram', 'copy'];

    const handleCopyLink = () => {
        const pollUrl = `${window.location.origin}/poll/${poll._id}`;
        navigator.clipboard.writeText(pollUrl).then(() => {
            toast.success('Link copied to clipboard!');
        }).catch(err => {
            toast.error('Failed to copy link.');
            console.error('Could not copy text: ', err);
        });
    };
    
    // CORRECTED: useEffect for multi-share logic
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.visibilityState === "visible" && lastShared.current) {
                setCompleted((prev) => [...prev, lastShared.current]);
                const newQueue = shareQueue.slice(1);
                setShareQueue(newQueue);

                if (newQueue.length > 0) {
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
        if (platform === 'copy') {
            handleCopyLink();
            return;
        }
        if (platform === "gmail") {
            setShowGmailPopup(true);
            return;
        }
        setSelected((prev) => prev.includes(platform) ? prev.filter((p) => p !== platform) : [...prev, platform]);
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

    try {
         if (platform === 'linkedin') {
    // --- BUG FIX ---
    // The two Telegram lines below were removed
    // const { data } = await apiClient.get("/api/telegram/connect");
    // window.location.href = data.url;
    // --- END BUG FIX ---

    const { data } = await apiClient.get("/api/linkedin/auth/status"); // This is a guess, update if your auth status route is different
    if (data.isAuthenticated) {
        window.location.href = `/share-linkedin?pollId=${poll._id}`;
    } else {
      toast((t) => (
  <div className="flex flex-col items-center text-center">
    <p className="mb-3 text-gray-800 font-medium">
      Connect your LinkedIn account to create a campaign
    </p>
    <button
      onClick={() => {
        toast.dismiss(t.id);
      window.location.href = `http://192.168.1.5:5000/api/linkedin/auth?pollId=${poll._id}`;

      }}
      className="px-5 py-2 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
    >
      Connect with LinkedIn 
    </button>
  </div>  
), { duration: 6000 });
    }
} 
else if (platform === "telegram") {
  try {
    // Step 1️⃣ — Make ONE call. The backend will either link OR share.
 const { data } = await apiClient.post(
  "/api/telegram/sharePoll", 
  { pollId: poll._id },
  { withCredentials: true }
);

    if (data.linked) {
      // --- USER WAS LINKED ---
      // Backend already sent the poll.
      if (data.openUrl) window.open(data.openUrl, "_blank");
      toast.success(data.message || "✅ Poll shared to Telegram!");

    } else {
      // --- USER WAS NOT LINKED ---
      // Backend sent a link URL. Show the popup asking them to link.
      toast((t) => (
        <div className="flex flex-col items-center text-center">
          <p className="mb-3 text-gray-800 font-medium">
            {/* ✨ CORRECTED MESSAGE ✨ */}
            <b>Link Your Telegram Account</b><br/>
            Please tap "Open" and then hit <strong>"Start"</strong> in Telegram to connect.
          </p>

          <a
            href={data.url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 rounded-full bg-sky-600 text-white font-semibold hover:bg-sky-700 transition"
            onClick={() => toast.dismiss(t.id)}
          >
            Open @PynglPollsBot
          </a>
          
          {/* ✨ IMPORTANT UX Clue ✨ */}
          <p className="mt-3 text-xs text-gray-500">
            You'll need to tap "Share" again after linking.
          </p>
        </div>
      ), { duration: 10000 });
      // No 'return' needed, but the logic ends here
    }

    // Step 2️⃣ — REMOVE the old "Step 2" block. It's not needed.

  } catch (err) {
    console.error("❌ Telegram share error:", err);
    toast.error("❌ Failed to share poll to Telegram.");
  }
// }else if (platform === "whatsapp") {
//   try {
//     const user = useAuthStore.getState().userInfo;

//     if (!user?._id) {
//       toast.error("User not logged in");
//       return;
//     }
// console.log("Syncing Google contacts...");
// await apiClient.get(`/auth/contacts?email=${user.email}`);


// console.log("Fetching merged contacts...");
// const { data } = await apiClient.get("/api/users/contacts");
// setAvailableContacts(data.contacts);
// setShowContactSelector(true);


// console.log("Loaded contacts:", data.contacts);

//     // Open selection modal
//     setAvailableContacts(data.contacts);
//     setShowContactSelector(true);

//     return; // Stop further execution
//   } catch (err) {
//     console.error("WhatsApp error:", err?.response?.data || err);
//     toast.error("Failed to load WhatsApp contacts");
//   }
// }
// }else if (platform === "whatsapp") {
//   try {
//     const user = useAuthStore.getState().userInfo;
//     if (!user?._id) {
//       toast.error("User not logged in");
//       return;
//     }

//     // console.log("Syncing Google contacts...");
//     // await apiClient.get(`/auth/contacts?email=${user.email}`);

//     console.log("Fetching merged contacts...");
//     const { data } = await apiClient.get("/api/users/contacts", {
//   withCredentials: true
// });


//     console.log("Loaded contacts:", data.contacts);

//     setAvailableContacts(data.contacts);
//     setShowContactSelector(true);

//     return;
//   } catch (err) {
//     console.error("WhatsApp error:", err?.response?.data || err);
//     toast.error("Failed to load WhatsApp contacts");
//   }
// }
}
else if (platform === "whatsapp") {
  try {
    const user = useAuthStore.getState().userInfo;

    if (!user?.email) {
      toast.error("User not logged in");
      return;
    }

    console.log("Loading Google contacts...");
    const { data } = await apiClient.get(
      `/auth/contacts?email=${user.email}`,
      { withCredentials: true }
    );

    console.log("Loaded contacts:", data.contacts);

    setAvailableContacts(data.contacts || []);
    setShowContactSelector(true);

    return;
  } catch (err) {
    console.error("WhatsApp error:", err?.response?.data || err);
    toast.error("Failed to load WhatsApp contacts");
  }
}





else if (platform !== 'instagram') {
  // For all other platforms
  const shareUrl = shareLinks[platform](previewUrl, pollText);
  if (shareUrl) {
    window.open(shareUrl, "_blank");
            }
        }
        // Log share attempt
        await apiClient.post(`/api/polls/${poll._id}/share`, { platform });
    } catch (err) {
        toast.error("Error while sharing.");
        console.error("LinkedIn or share error:", err);
    }
lastShared.current = platform;

setTimeout(() => {
  setCurrentPlatform(null);
}, 300);
};

    return (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-end sm:items-center sm:justify-center animate-fade-in">

            <div className="w-full sm:max-w-lg flex flex-col bg-white dark:bg-gray-900 transition-colors sm:rounded-2xl h-[90vh] sm:h-auto">
                <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    <button onClick={onClose} className="p-1 sm:hidden"><ArrowLeft size={24} className="text-gray-600 dark:text-gray-300" /></button>
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">Share Via</h3>
                    <span className="text-sm text-gray-500 hidden sm:block">Tap to select</span>
                    <button onClick={onClose} className="p-1 hidden sm:block"><X size={24} className="text-gray-600 dark:text-gray-300" /></button>
        </div>

                <div className="flex-1 flex flex-col justify-center p-6">
                    <div className="grid grid-cols-3 gap-x-6 gap-y-8 max-w-xs mx-auto">

    {platforms.map((platform) => (
                            <ShareButton key={platform} platform={platform} onSelect={handleSelectPlatform} isSelected={selected.includes(platform)} completed={completed} />
                        ))}
                    </div>
                </div>

                <div className="px-6 pb-8 pt-4 border-t border-gray-200 dark:border-gray-700">
           <div className="flex gap-4">
                        <button onClick={() => setSelected([])} className="flex-1 py-3 bg-transparent border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 rounded-full font-semibold text-base transition-colors hover:bg-gray-100 dark:hover:bg-gray-800">
                            Clear

                        </button>
                        <button onClick={handleStartMultiShare} disabled={selected.length === 0} className="flex-1 py-3   bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full font-semibold text-base shadow-lg transition-all hover:shadow-xl disabled:opacity-50 disabled:shadow-none">

                            Share {selected.length > 0 ? `(${selected.length})` : ""}
                        </button>
                    </div>
                </div>

                {showGmailPopup && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-sm mx-4 shadow-lg">
                            <h2 className="text-lg font-semibold mb-4 text-center">Share via Gmail</h2>
                   <p className="text-gray-600 dark:text-gray-300 text-sm text-center mb-6">To share this poll via Gmail, please connect your Google account first.</p>
                            <button onClick={() => { window.location.href = `http://localhost:5000/auth/login?pollId=${poll._id}`; }} className="w-full py-3 bg-red-500 hover:bg-red-600 text-white rounded-full font-medium transition">Connect with Google</button>
                            <button onClick={() => setShowGmailPopup(false)} className="mt-4 w-full py-2.5 rounded-full border border-gray-300 dark:border-gray-600 font-medium hover:bg-gray-50 dark:hover:bg-gray-700">Cancel</button>
                        </div>
                    </div>
                )}

                {currentPlatform && (
                    <PlatformPreview platform={currentPlatform} poll={{ ...poll, image: capturedImage || poll.image }} onClose={() => setCurrentPlatform(null)} onConfirm={handleConfirmShare} />

            )}

{showContactSelector && (
  <ContactSelectorModal
    contacts={availableContacts}
    onCancel={() => setShowContactSelector(false)}
    onConfirm={async (selectedContacts) => {
      try {
        await apiClient.post("/api/whatsapp/send-selected", {
          pollId: poll._id,
          contacts: selectedContacts
        });

        toast.success("Poll sent to selected WhatsApp contacts!");
      } catch (err) {
        toast.error("Failed to send poll");
      }

      setShowContactSelector(false);
      setCurrentPlatform(null);
    }}
  />
)}

            </div>
        </div>
    );
}