// import React, { useState, useEffect, useRef } from 'react';
// import useLongPress from '../../hooks/useLongPress';
// import { Share2, X, Copy, Check, MoreHorizontal } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import apiClient from '../../api/axiosConfig'; // 1. IMPORT apiClient
// import { toast } from 'react-hot-toast';
// import { createTextPollBanner } from '../../utils/imageUtils';
// const shareLinks = {
//     whatsapp: (url, text) => `https://wa.me/?text=${encodeURIComponent(text + '\n' + url)}`,
//     linkedin: (url) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
//     twitter: (url, text) => `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
//     facebook: (url) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
// };
// const ShareButton = ({ platform, onShare, onLongPress, isMultiShare, isSelected, isCompleted }) => {
//     const clickEvents = useLongPress(() => onLongPress(platform), () => onShare(platform));

//     // Placeholder for actual platform icons
//     const Icon = () => <p className="font-bold text-sm">{platform.charAt(0).toUpperCase()}</p>;

//     return (
//         <div className="relative flex flex-col items-center">
//             {/* This is the checkmark UI */}
//             {isMultiShare && (
//                 <div className={`absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center border-2 border-white transition-all ${
//                     isSelected ? 'bg-pink-500' : 'bg-gray-300'
//                 }`}>
//                     {isCompleted ? <Check size={12} className="text-white" /> : <div/>}
//                 </div>
//             )}
//             <button
//                 {...(isMultiShare ? {} : clickEvents)} // Apply long-press only in single-share mode
//                 onClick={isMultiShare ? () => onShare(platform) : undefined}
//                 className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center"
//             >
//                 <Icon />
//             </button>
//             <span className="mt-2 text-xs text-gray-600">{platform}</span>
//         </div>
//     );
// };

// export default function ShareSheet({ poll, onClose }) {
//     const navigate = useNavigate();
//     const [isMultiShare, setIsMultiShare] = useState(false);
//     const [selected, setSelected] = useState([]);
//     const [shareQueue, setShareQueue] = useState([]);
//     const [completed, setCompleted] = useState([]);
//     const [linkCopied, setLinkCopied] = useState(false);
//     const lastPlatformShared = useRef(null);

//     const pollUrl = `${window.location.origin}/poll/${poll._id}`;
//     const pollText = poll.question;

//     useEffect(() => {
//         const handleVisibilityChange = () => {
//             if (document.visibilityState === 'visible' && shareQueue.length > 0) {
//                 // Mark the last platform as completed
//                 if (lastPlatformShared.current) {
//                     setCompleted(prev => [...new Set([...prev, lastPlatformShared.current])]);
//                 }

//                 // --- THIS IS THE UPDATED PART ---
//                 // Add a 1-second delay before opening the next app
//                 setTimeout(() => {
//                     const newQueue = [...shareQueue];
//                     newQueue.shift(); // Remove the one we just handled
//                     setShareQueue(newQueue);

//                     if (newQueue.length > 0) {
//                         const nextPlatform = newQueue[0];
//                         lastPlatformShared.current = nextPlatform;
//                         window.open(shareLinks[nextPlatform](pollUrl, pollText), '_blank');
//                     } else {
//                         // All shares are done, reset the state after a short delay
//                         setTimeout(() => {
//                             setIsMultiShare(false);
//                             setSelected([]);
//                             setCompleted([]);
//                             onClose(); // Optionally close the sheet automatically
//                         }, 1000);
//                     }
//                 }, 1000); // 1000ms = 1 second delay
//             }
//         };

//         document.addEventListener('visibilitychange', handleVisibilityChange);
//         return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
//     }, [shareQueue, pollUrl, pollText, onClose]); // Added onClose to dependency array

//    const handleSingleShare = async (platform) => {
//         if (platform === 'linkedin') {
//             try {
//                 // Check if user is already connected to LinkedIn
//                 const { data } = await apiClient.get('/api/linkedin/auth/status');

//                 if (data.isAuthenticated) {
//                     // If yes, navigate to the publisher page with the poll data
//                     navigate('/share-linkedin', { state: { poll } });
//                 } else {
//                     // If no, ask for confirmation to connect
//                     if (window.confirm("Connect your LinkedIn account to create a campaign?")) {
//                         // This redirects to your backend, which then redirects to LinkedIn
//                         window.location.href = 'http://localhost:5000/api/linkedin/auth';
//                     }
//                 }
//             } catch (error) {
//                 toast.error("Could not verify LinkedIn connection.");
//             }
//         } else {
//         // --- THIS IS THE COMPLETED PART ---
//         // This handles all other platforms (WhatsApp, Twitter, Facebook, etc.)
//         if (shareLinks[platform]) {
//             const url = shareLinks[platform](pollUrl, pollText);
//             window.open(url, '_blank', 'noopener,noreferrer');
//             onClose(); // Close the sheet after opening the link
//         } else {
//             console.error(`No share link defined for platform: ${platform}`);
//         }
//     }
// };

//     const handleLongPress = () => !isMultiShare && setIsMultiShare(true);

//     const toggleSelection = (platform) => {
//         if (!isMultiShare) return;
//         setSelected(prev => prev.includes(platform) ? prev.filter(p => p !== platform) : [...prev, platform]);
//     };

//     const startMultiShare = () => {
//         if (selected.length === 0) return;
//         setShareQueue(selected); // Initialize the queue
//         const firstPlatform = selected[0];
//         lastPlatformShared.current = firstPlatform; // Track the first one
//         window.open(shareLinks[firstPlatform](pollUrl, pollText), '_blank');
//     };

//     const handleCopyLink = () => {
//         navigator.clipboard.writeText(pollUrl);
//         setLinkCopied(true);
//         setTimeout(() => setLinkCopied(false), 2000);
//     };

//     return (
//         <div className="fixed inset-0 bg-black bg-opacity-30 z-40 flex items-end">
//             <div className="bg-white w-full rounded-t-2xl p-4 animate-slide-up">
//                 <div className="flex justify-between items-center mb-4">
//                     <h3 className="font-bold text-lg">
//                         {isMultiShare ? "Select platforms" : "Share this Poll"}
//                     </h3>
//                     <button onClick={onClose} className="p-1"><X size={20}/></button>
//                 </div>

//                 <div className="grid grid-cols-4 gap-4 mb-4">
//                     {Object.keys(shareLinks).map(platform => (
//                         <ShareButton
//                             key={platform}
//                             platform={platform}
//                             onShare={isMultiShare ? toggleSelection : handleSingleShare}
//                             onLongPress={handleLongPress}
//                             isMultiShare={isMultiShare}
//                             isSelected={selected.includes(platform)}
//                             isCompleted={completed.includes(platform)}
//                         />
//                     ))}
//                 </div>

//                 <div className="flex items-center gap-2 p-2 bg-gray-100 rounded-lg">
//                     <input type="text" readOnly value={pollUrl} className="flex-1 bg-transparent text-sm truncate" />
//                     <button onClick={handleCopyLink} className="bg-white px-3 py-1 rounded-md text-sm font-semibold shadow-sm">
//                         {linkCopied ? <Check size={16} className="text-green-500"/> : <Copy size={16}/>}
//                     </button>
//                 </div>

//                 {isMultiShare && (
//                     <div className="mt-4">
//                         <button onClick={startMultiShare} className="w-full py-3 bg-pink-500 text-white rounded-full font-bold">
//                             Share to {selected.length} Platforms
//                         </button>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }
// import React, { useState, useEffect, useRef } from 'react';
// import useLongPress from '../../hooks/useLongPress';
// import { Share2, X, Copy, Check, MoreHorizontal } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import apiClient from '../../api/axiosConfig';
// import { toast } from 'react-hot-toast';
// // import useLongPress from '../hooks/useLongPress';
// const shareLinks = {
//     whatsapp: (url, text) => `https://wa.me/?text=${encodeURIComponent(text + '\n' + url)}`,
//     linkedin: (url, text) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
//     twitter: (url, text) => `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
//     facebook: (url, text) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
// };

// const ShareButton = ({ platform, onShare, onLongPress, isMultiShare, isSelected, isCompleted }) => {
//     const clickEvents = useLongPress(() => onLongPress(platform), () => onShare(platform));

//     // You can replace this with actual platform icons later
//     const Icon = () => <p className="font-bold text-sm">{platform.charAt(0).toUpperCase()}</p>;

//     return (
//         <div className="relative flex flex-col items-center">
//             {isMultiShare && (
//                 <div className={`absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center border-2 border-white transition-all ${
//                     isSelected ? 'bg-pink-500' : 'bg-gray-300'
//                 }`}>
//                     {completed.includes(platform) ? <Check size={12} className="text-white" /> : <div/>}
//                 </div>
//             )}
//             <button
//                 {...(isMultiShare ? {} : clickEvents)}
//                 onClick={isMultiShare ? () => onShare(platform) : undefined}
//                 className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center"
//             >
//                 <Icon />
//             </button>
//             <span className="mt-2 text-xs text-gray-600">{platform}</span>
//         </div>
//     );
// };

// export default function ShareSheet({ poll, onClose }) {
//     const navigate = useNavigate();
//     const [isMultiShare, setIsMultiShare] = useState(false);
//     const [selected, setSelected] = useState([]);
//     const [shareQueue, setShareQueue] = useState([]);
//     const [completed, setCompleted] = useState([]);
//     const [linkCopied, setLinkCopied] = useState(false);
//     const lastPlatformShared = useRef(null);

//     const pollUrl = `${window.location.origin}/poll/${poll._id}`;
//     const pollText = poll.question;

//     useEffect(() => {
//         const handleVisibilityChange = () => {
//             if (document.visibilityState === 'visible' && shareQueue.length > 0) {
//                 if (lastPlatformShared.current) {
//                     setCompleted(prev => [...new Set([...prev, lastPlatformShared.current])]);
//                 }

//                 setTimeout(() => {
//                     const newQueue = [...shareQueue];
//                     newQueue.shift();
//                     setShareQueue(newQueue);

//                     if (newQueue.length > 0) {
//                         const nextPlatform = newQueue[0];
//                         lastPlatformShared.current = nextPlatform;
//                         window.open(shareLinks[nextPlatform](pollUrl, pollText), '_blank');
//                     } else {
//                         setTimeout(() => {
//                             setIsMultiShare(false);
//                             setSelected([]);
//                             setCompleted([]);
//                             onClose();
//                         }, 1000);
//                     }
//                 }, 1000);
//             }
//         };

//         document.addEventListener('visibilitychange', handleVisibilityChange);
//         return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
//     }, [shareQueue, pollUrl, pollText, onClose]);

// const handleSingleShare = async (platform) => {
//     if (platform === 'linkedin') {
//         try {
//             const { data } = await apiClient.get('/api/linkedin/auth/status');
//             if (data.isAuthenticated) {
//                 navigate('/share-linkedin', { state: { poll } });
//             } else {
//                 if (window.confirm("Connect your LinkedIn account to create a campaign?")) {
//                     // 1. Save the poll ID before leaving our app
//                     sessionStorage.setItem('linkedinSharePollId', poll._id);

//                     // 2. Redirect to the backend to start the auth flow
//                     window.location.href = 'http://localhost:5000/api/linkedin/auth';
//                 }
//             }
//         } catch (error) {
//             toast.error("Could not verify LinkedIn connection.");
//         }
//     } else {
//                 console.error(`No share link defined for platform: ${platform}`);

//         }
//     };

//     const handleLongPress = () => !isMultiShare && setIsMultiShare(true);

//     const toggleSelection = (platform) => {
//         if (!isMultiShare) return;
//         setSelected(prev => prev.includes(platform) ? prev.filter(p => p !== platform) : [...prev, platform]);
//     };

//     const startMultiShare = () => {
//         if (selected.length === 0) return;
//         setCompleted([]); // Reset completed list before starting
//         setShareQueue(selected);
//         const firstPlatform = selected[0];
//         lastPlatformShared.current = firstPlatform;
//         window.open(shareLinks[firstPlatform](pollUrl, pollText), '_blank');
//     };

//     const handleCopyLink = () => {
//         navigator.clipboard.writeText(pollUrl);
//         setLinkCopied(true);
//         setTimeout(() => setLinkCopied(false), 2000);
//     };

//     return (
//         <div className="fixed inset-0 bg-black bg-opacity-30 z-40 flex items-end">
//             <div className="bg-white w-full rounded-t-2xl p-4 animate-slide-up">
//                 <div className="flex justify-between items-center mb-4">
//                     <h3 className="font-bold text-lg">
//                         {isMultiShare ? "Select platforms" : "Share this Poll"}
//                     </h3>
//                     <button onClick={onClose} className="p-1"><X size={20}/></button>
//                 </div>

//                 <div className="grid grid-cols-4 gap-4 mb-4">
//                     {Object.keys(shareLinks).map(platform => (
//                         <ShareButton
//                             key={platform}
//                             platform={platform}
//                             onShare={isMultiShare ? toggleSelection : handleSingleShare}
//                             onLongPress={handleLongPress}
//                             isMultiShare={isMultiShare}
//                             isSelected={selected.includes(platform)}
//                             isCompleted={completed}
//                         />
//                     ))}
//                 </div>

//                 <div className="flex items-center gap-2 p-2 bg-gray-100 rounded-lg">
//                     <input type="text" readOnly value={pollUrl} className="flex-1 bg-transparent text-sm truncate" />
//                     <button onClick={handleCopyLink} className="bg-white px-3 py-1 rounded-md text-sm font-semibold shadow-sm">
//                         {linkCopied ? <Check size={16} className="text-green-500"/> : <Copy size={16}/>}
//                     </button>
//                 </div>

//                 {isMultiShare && (
//                     <div className="mt-4">
//                         <button onClick={startMultiShare} className="w-full py-3 bg-pink-500 text-white rounded-full font-bold disabled:bg-gray-400" disabled={selected.length === 0}>
//                             Share to {selected.length > 0 ? `${selected.length} ` : ''}Platforms
//                         </button>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }

// import React, { useState, useEffect, useRef } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { X, Check, Instagram, Youtube, Linkedin, Twitter, Facebook, MessageSquare, Send } from 'lucide-react';
// import { toast } from 'react-hot-toast';

// // Helper object for share URLs and icons
// const sharePlatforms = {
//     'Instagram': {
//         icon: <Instagram />,
//         link: (url, text) => `https://www.instagram.com/` // Note: Instagram sharing is very limited from web
//     },
//     'YouTube': {
//         icon: <Youtube />,
//         link: (url, text) => `https://www.youtube.com/`
//     },
//     'WhatsApp': {
//         icon: <MessageSquare />, // Placeholder, Lucide doesn't have WhatsApp
//         link: (url, text) => `https://wa.me/?text=${encodeURIComponent(text + '\n' + url)}`
//     },
//     'LinkedIn': {
//         icon: <Linkedin />,
//         link: (url, text) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
//     },
//     'Twitter': {
//         icon: <Twitter />,
//         link: (url, text) => `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
//     },
//     'Facebook': {
//         icon: <Facebook />,
//         link: (url, text) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
//     },
//     'Telegram': {
//         icon: <Send />,
//         link: (url, text) => `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`
//     },
//     // Add other platforms as needed
// };

// const SharePlatformButton = ({ platform, onShare, isSelected }) => {
//     const platformData = sharePlatforms[platform];
//     return (
//         <button onClick={onShare} className="flex flex-col items-center gap-2">
//             <div className={`w-16 h-16 rounded-2xl flex items-center justify-center relative transition-all duration-200 ${isSelected ? 'ring-2 ring-pink-500 bg-pink-50' : 'bg-gray-100'}`}>
//                 {platformData?.icon || <p>{platform.charAt(0)}</p>}
//                 {isSelected && (
//                     <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-pink-500 rounded-full flex items-center justify-center border-2 border-white">
//                         <Check size={12} className="text-white" />
//                     </div>
//                 )}
//             </div>
//             <span className="text-xs text-gray-600">{platform}</span>
//         </button>
//     );
// };

// export default function SharePage() {
//     const navigate = useNavigate();
//     const location = useLocation();
//     const { poll } = location.state || {};

//     const [selected, setSelected] = useState([]);
//     const [shareQueue, setShareQueue] = useState([]);
//     const lastPlatformShared = useRef(null);

//     // This effect handles the automatic sequential sharing
//     useEffect(() => {
//         const handleVisibilityChange = () => {
//             if (document.visibilityState === 'visible' && shareQueue.length > 0) {
//                 // Add a 1-second delay for the user to see the checkmark
//                 setTimeout(() => {
//                     const newQueue = [...shareQueue];
//                     newQueue.shift(); // Remove the platform that was just shared
//                     setShareQueue(newQueue);

//                     if (newQueue.length > 0) {
//                         const nextPlatform = newQueue[0];
//                         lastPlatformShared.current = nextPlatform;
//                         const link = sharePlatforms[nextPlatform]?.link(pollUrl, pollText);
//                         if (link) window.open(link, '_blank');
//                     } else {
//                         toast.success("All platforms shared!");
//                         navigate(-1); // Go back when the queue is empty
//                     }
//                 }, 1000); // 1 second delay
//             }
//         };

//         document.addEventListener('visibilitychange', handleVisibilityChange);
//         return () => {
//             document.removeEventListener('visibilitychange', handleVisibilityChange);
//         };
//     }, [shareQueue, poll, navigate]);

//     if (!poll) {
//         useEffect(() => navigate('/dashboard'), [navigate]);
//         return null;
//     }

//     const pollUrl = `${window.location.origin}/poll/${poll._id}`;
//     const pollText = poll.question;

//     const toggleSelection = (platform) => {
//         setSelected(prev =>
//             prev.includes(platform)
//                 ? prev.filter(p => p !== platform)
//                 : [...prev, platform]
//         );
//     };

//     const handleShare = () => {
//         if (selected.length === 0) {
//             toast.error("Please select at least one platform to share.");
//             return;
//         }
//         setShareQueue(selected); // Initialize the queue
//         const firstPlatform = selected[0];
//         lastPlatformShared.current = firstPlatform; // Track the first one
//         const firstLink = sharePlatforms[firstPlatform]?.link(pollUrl, pollText);
//         if (firstLink) window.open(firstLink, '_blank');
//     };

//     return (
//         <div className="fixed inset-0 bg-white z-50 flex flex-col p-4 animate-fade-in">
//             <div className="flex justify-between items-center mb-6 flex-shrink-0">
//                 <button onClick={() => navigate(-1)} className="p-2"><X size={24} /></button>
//                 <h1 className="text-xl font-bold">Share Via</h1>
//                 <span className="text-sm text-gray-500 w-8"></span>
//             </div>

//             <div className="grid grid-cols-4 gap-y-6 flex-1 overflow-y-auto">
//                 {Object.keys(sharePlatforms).map(platform => (
//                     <SharePlatformButton
//                         key={platform}
//                         platform={platform}
//                         onShare={() => toggleSelection(platform)}
//                         isSelected={selected.includes(platform)}
//                     />
//                 ))}
//             </div>

//             <div className="flex gap-4 pt-4 flex-shrink-0">
//                 <button onClick={() => navigate(-1)} className="flex-1 py-3 border border-gray-300 rounded-full font-semibold">Cancel</button>
//                 <button
//                     onClick={handleShare}
//                     disabled={selected.length === 0}
//                     className="flex-1 py-3 bg-pink-500 text-white rounded-full font-semibold disabled:bg-gray-300"
//                 >
//                     Share ({selected.length})
//                 </button>
//             </div>
//         </div>
//     );
// }
// import React, { useState, useEffect, useRef } from "react";
// import { X, Check, Link2 } from "lucide-react"; // 1. Import the Link2 icon
// import { toast } from 'react-hot-toast'; // 2. Import toast for feedback
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

// // Base URL for the backend preview route.
// // NOTE: Since your frontend runs on 192.168.1.7:5173,
// // you need to use the actual poll URL that the backend (server) will serve,
// // e.g., 'https://yourdomain.com' or a local dev proxy.
// // I'll use a placeholder for the base domain of your backend-served poll page.
// const POLL_PAGE_DOMAIN = import.meta.env.VITE_POLL_PAGE_DOMAIN || window.location.origin;
// const POLL_PREVIEW_BASE = `${POLL_PAGE_DOMAIN}/api/polls/`;
// import React, { useState, useEffect, useRef } from "react";
// import { X, Check, Link2, ArrowLeft } from "lucide-react";
// import { toast } from 'react-hot-toast';
// import { AiFillInstagram, AiFillYoutube } from "react-icons/ai";
// import {
//     FaWhatsapp,
//     FaFacebookF,
//     FaLinkedinIn,
//     FaTelegramPlane,
//     FaTwitter,
// } from "react-icons/fa";
// import { SiGmail } from "react-icons/si";
// import { MdMessage, MdSms } from "react-icons/md";
// import apiClient from "../../api/axiosConfig";
// import PlatformPreview from "../preview/PlatformPreview.jsx";

// const POLL_PAGE_DOMAIN = import.meta.env.VITE_POLL_PAGE_DOMAIN || window.location.origin;
// const POLL_PREVIEW_BASE = `${POLL_PAGE_DOMAIN}/api/polls/`;
// // ===== Share Links - Now using the Preview URL to trigger OG tags =====
// const shareLinks = {
//   instagram: (previewUrl, text) => ``, // Handled by native share in PlatformPreview
//   youtube: (previewUrl, text) =>
//     `https://www.youtube.com/`, // YouTube isn't direct link share, often just for embedding
//   whatsapp: (previewUrl, text) =>
//     // WhatsApp's web share link needs the URL to be at the end for the preview to work best
//     `https://api.whatsapp.com/send?text=${encodeURIComponent(text + "\n" + previewUrl)}`,
//   gmail: (previewUrl, text) =>
//     `mailto:?subject=${encodeURIComponent(text)}&body=${encodeURIComponent(
//       previewUrl
//     )}`,
//   linkedin: (previewUrl, text) =>
//     `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
//       previewUrl
//     )}`,
//   twitter: (previewUrl, text) =>
//     `https://twitter.com/intent/tweet?text=${encodeURIComponent(
//       text
//     )}&url=${encodeURIComponent(previewUrl)}`,
//   facebook: (previewUrl, text) =>
//     `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(previewUrl)}`,
//   messages: (previewUrl, text) => `sms:?body=${encodeURIComponent(text + "\n" + previewUrl)}`,
//   sms: (previewUrl, text) => `sms:?body=${encodeURIComponent(text + "\n" + previewUrl)}`,
//   telegram: (previewUrl, text) =>
//     `https://t.me/share/url?url=${encodeURIComponent(
//       previewUrl
//     )}&text=${encodeURIComponent(text)}`,
// };

// // ===== Platform Icons (No change) =====
// // ... other imports ...

// // ===== Platform Icons =====
// const platformIcons = {
//     'copy': <Link2 size={28} />, // 3. Add 'copy' icon to the list
//     instagram: <AiFillInstagram size={28} />,
//     whatsapp: <FaWhatsapp size={28} />,
//     twitter: <FaTwitter size={28} />,
//     facebook: <FaFacebookF size={28} />,
//     linkedin: <FaLinkedinIn size={28} />,
//     gmail: <SiGmail size={28} />,
//     sms: <MdSms size={28} />,
//     telegram: <FaTelegramPlane size={28} />,
// };

// // ===== Share Button Component =====
// const ShareButton = ({ platform, onSelect, isSelected, completed }) => (
//     <div className="flex flex-col items-center relative">
//         {completed.includes(platform) && (
//             <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-pyngl-pink flex items-center justify-center border-2 border-white dark:border-gray-900 shadow">
//                 <Check size={14} className="text-white" />
//             </div>
//         )}
//         <button
//             onClick={() => onSelect(platform)}
//             className={`relative w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm transition-transform bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200 hover:scale-105 ${isSelected ? "ring-2 ring-pyngl-pink" : ""}`}
//         >
//             {platformIcons[platform]}
//         </button>
//         <span className="mt-2 text-xs font-medium capitalize text-gray-700 dark:text-gray-200">
//             {platform === "sms" ? "SMS" : platform === "copy" ? "Copy Link" : platform}
//         </span>
//     </div>
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

//   const pollText = poll.question;
//   const platforms = Object.keys(platformIcons);
//    const handleCopyLink = () => {
//         const pollUrl = `${window.location.origin}/poll/${poll._id}`;
//         navigator.clipboard.writeText(pollUrl).then(() => {
//             toast.success('Link copied to clipboard!');
//         }).catch(err => {
//             toast.error('Failed to copy link.');
//             console.error('Could not copy text: ', err);
//         });
//     };
//   // Handle coming back from share tab (No change)
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
//         lastShared.current = null;
//       }
//     };
//     document.addEventListener("visibilitychange", handleVisibilityChange);
//     return () =>
//       document.removeEventListener("visibilitychange", handleVisibilityChange);
//   }, [shareQueue, onClose]);

//   const handleSelectPlatform = (platform) => {
//         // --- 5. UPDATED LOGIC: Trigger copy function immediately ---
//         if (platform === 'copy') {
//             handleCopyLink();
//             return;
//         }

//         if (platform === "gmail") {
//             setShowGmailPopup(true);
//             return;
//         }

//         setSelected((prev) =>
//             prev.includes(platform)
//                 ? prev.filter((p) => p !== platform)
//                 : [...prev, platform]
//         );
//     };

//   const handleStartMultiShare = () => {
//     if (selected.length === 0) return;
//     setCompleted([]);
//     setShareQueue(selected);
//     setCurrentPlatform(selected[0]); // open first preview
//   };

//   /**
//    * Confirms the share action, opens the platform link, and updates the backend.
//    * This is called by PlatformPreview *after* image capture/upload.
//    * @param {string} hostedPreviewImage - The public URL of the uploaded preview image.
//    */
//   const handleConfirmShare = async (hostedPreviewImage) => {
//     const platform = currentPlatform;
//     if (!platform) return;

//     // 1. Construct the URL that serves the OG/Twitter card tags
//     // The URL includes the platform so the backend can pick the right metadata and image
//     const previewUrl = `${POLL_PREVIEW_BASE}${poll._id}/preview?platform=${platform}`;

//     // 2. Open share link for platforms that don't use native sharing
//     if (platform !== "instagram") {
//       let shareUrl = shareLinks[platform](previewUrl, pollText);

//       if (shareUrl) {
//           window.open(shareUrl, "_blank");
//           alert(
//               "The poll preview image will appear on platforms that support OG tags (X/Twitter, Facebook, Telegram, WhatsApp). This may take a moment to load."
//           );
//       }
//     }

//     try {
//       // 3. Send platform info to backend
//       await apiClient.post(`/api/polls/${poll._id}/share`, {
//         platform: platform,
//       });
//       console.log(`${platform} shared saved to DB`);
//     } catch (err) {
//       console.error("Failed to save shared platform:", err);
//     }

//     // 4. Update state to proceed
//     lastShared.current = platform;
//     setCurrentPlatform(null); // Close preview, trigger useEffect on tab focus
//   };

//   return (
//         <div className="fixed inset-0 flex flex-col z-50 bg-white dark:bg-gray-900 transition-colors">
//             {/* Header */}
//             <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 dark:border-gray-700">
//                 <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">Share Via</h3>
//                 <button onClick={onClose} className="p-1">
//                     <X size={24} className="text-gray-600 dark:text-gray-300" />
//                 </button>
//             </div>

//             {/* Grid of Platforms */}
//             <div className="flex-1 flex flex-col justify-center px-6">
//                 <div className="grid grid-cols-3 sm:grid-cols-4 gap-x-8 gap-y-8 max-w-md mx-auto">
//                     {platforms.map((platform) => (
//                         <ShareButton
//                             key={platform}
//                             platform={platform}
//                             onSelect={handleSelectPlatform}
//                             isSelected={selected.includes(platform)}
//                             completed={completed}
//                         />
//                     ))}
//                 </div>
//             </div>

//             {/* Footer buttons */}
//             <div className="px-6 pb-8 pt-4 border-t border-gray-200 dark:border-gray-700">
//                 <div className="flex gap-3">
//                     <button
//                         onClick={() => setSelected([])}
//                         className="flex-1 py-4 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-full font-semibold text-base transition-colors"
//                     >
//                         Clear
//                     </button>
//                     <button
//                         onClick={handleStartMultiShare}
//                         disabled={selected.length === 0}
//                         className="flex-1 py-4 bg-pyngl-pink text-white rounded-full font-semibold text-base shadow-md disabled:opacity-50"
//                     >
//                         Share {selected.length > 0 ? `(${selected.length})` : ""}
//                     </button>
//                 </div>
//             </div>

//             {/* Gmail Connect Popup */}
//             {showGmailPopup && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
//                     <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-sm mx-4 shadow-lg transition-colors">
//                         <h2 className="text-lg font-semibold mb-4 text-center text-gray-900 dark:text-gray-100">
//                             Share via Gmail
//                         </h2>
//                         <p className="text-gray-600 dark:text-gray-300 text-sm text-center mb-6">
//                             To share this poll via Gmail, please connect your Google account first.
//                         </p>
//                         <button
//                             onClick={() => { window.location.href = `http://localhost:5000/auth/login?pollId=${poll._id}`; }}
//                             className="w-full py-3 bg-red-500 hover:bg-red-600 text-white rounded-full font-medium transition"
//                         >
//                             Connect with Google
//                         </button>
//                         <button
//                             onClick={() => setShowGmailPopup(false)}
//                             className="mt-4 w-full py-2.5 rounded-full border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
//                         >
//                             Cancel
//                         </button>
//                     </div>
//                 </div>
//             )}

//             {/* Platform Preview Modal */}
//             {currentPlatform && (
//                 <PlatformPreview
//                     platform={currentPlatform}
//                     poll={{ ...poll, image: capturedImage || poll.image }}
//                     onClose={() => setCurrentPlatform(null)}
//                     onConfirm={handleConfirmShare}
//                 />
//             )}
//         </div>
//     );
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
import PlatformPreview from "../preview/PlatformPreview.jsx";

const POLL_PAGE_DOMAIN = "https://grumpy-geckos-act.loca.lt";
const POLL_PREVIEW_BASE = `${POLL_PAGE_DOMAIN}/api/polls/`;

const shareLinks = {
  instagram: () => ``,
  youtube: () => `https://www.youtube.com/`,
  whatsapp: (url, text) =>
    `https://api.whatsapp.com/send?text=${encodeURIComponent(
      text + "\n" + url
    )}`,
  gmail: (url, text) =>
    `mailto:?subject=${encodeURIComponent(text)}&body=${encodeURIComponent(
      url
    )}`,
  linkedin: (url) =>
    `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      url
    )}`,
  twitter: (url, text) =>
    `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      text
    )}&url=${encodeURIComponent(url)}`,
  facebook: () =>
    ``,
  imessages: (url, text) =>
    `sms:?body=${encodeURIComponent(text + "\n" + url)}`,
  sms: (url, text) => `sms:?body=${encodeURIComponent(text + "\n" + url)}`,
  telegram: (url, text) =>
    `https://t.me/share/url?url=${encodeURIComponent(
      url
    )}&text=${encodeURIComponent(text)}`,
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
      {platform === "sms"
        ? "SMS"
        : platform === "imessages"
        ? "i Messages"
        : platform}
    </span>
  </div>
);

export default function ShareSheet({
  poll = {
    _id: "123",
    question: "Sample poll question?",
    options: [{ text: "Option 1" }, { text: "Option 2" }],
  },
  capturedImage,
  connectedEmail,
  onClose = () => {},
}) {
  console.log("🚀 ~ ShareSheet ~ connectedEmail:", connectedEmail);
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
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [shareQueue, onClose]);

  const handleSelectPlatform = async (platform) => {
    if (platform === "gmail") {
      try {
        // Check if the user is authenticated
        const res = await apiClient.get(`/auth/check?email=${connectedEmail}`);

        if (res.data.authenticated) {
          // Already authenticated → directly redirect to share page
          window.location.href = `/share?connectedEmail=${encodeURIComponent(
            connectedEmail
          )}&pollId=${poll._id}`;
        } else {
          // Not authenticated → show Gmail connect popup
          setShowGmailPopup(true);
        }
      } catch (err) {
        console.error("Error checking Gmail authentication:", err);
        // Show popup if any error occurs
        setShowGmailPopup(true);
      }
    } else {
      // Handle other platforms normally
      setSelected((prev) =>
        prev.includes(platform)
          ? prev.filter((p) => p !== platform)
          : [...prev, platform]
      );
    }
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

    if (platform !== "instagram" && platform !== "facebook") {
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
        <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">
          Share Via
        </h3>
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
      <div className="px-6 pb-8 pt-4 border-t border-gray-200 dark:border-gray-700 md:m-auto md:w-4/6 lg:w-4/5 xl:w-3/4 2xl:w-2/3 transition-all duration-300">
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
