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
import React, { useState, useEffect, useRef } from 'react';
import useLongPress from '../../hooks/useLongPress';
import { Share2, X, Copy, Check, MoreHorizontal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../api/axiosConfig';
import { toast } from 'react-hot-toast';

const shareLinks = {
    whatsapp: (url, text) => `https://wa.me/?text=${encodeURIComponent(text + '\n' + url)}`,
    linkedin: (url, text) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    twitter: (url, text) => `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
    facebook: (url, text) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
};

const ShareButton = ({ platform, onShare, onLongPress, isMultiShare, isSelected, isCompleted }) => {
    const clickEvents = useLongPress(() => onLongPress(platform), () => onShare(platform));
    
    // You can replace this with actual platform icons later
    const Icon = () => <p className="font-bold text-sm">{platform.charAt(0).toUpperCase()}</p>;

    return (
        <div className="relative flex flex-col items-center">
            {isMultiShare && (
                <div className={`absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center border-2 border-white transition-all ${
                    isSelected ? 'bg-pink-500' : 'bg-gray-300'
                }`}>
                    {completed.includes(platform) ? <Check size={12} className="text-white" /> : <div/>}
                </div>
            )}
            <button 
                {...(isMultiShare ? {} : clickEvents)}
                onClick={isMultiShare ? () => onShare(platform) : undefined} 
                className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center"
            >
                <Icon /> 
            </button>
            <span className="mt-2 text-xs text-gray-600">{platform}</span>
        </div>
    );
};

export default function ShareSheet({ poll, onClose }) {
    const navigate = useNavigate();
    const [isMultiShare, setIsMultiShare] = useState(false);
    const [selected, setSelected] = useState([]);
    const [shareQueue, setShareQueue] = useState([]);
    const [completed, setCompleted] = useState([]);
    const [linkCopied, setLinkCopied] = useState(false);
    const lastPlatformShared = useRef(null);
    
    const pollUrl = `${window.location.origin}/poll/${poll._id}`;
    const pollText = poll.question;

    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible' && shareQueue.length > 0) {
                if (lastPlatformShared.current) {
                    setCompleted(prev => [...new Set([...prev, lastPlatformShared.current])]);
                }

                setTimeout(() => {
                    const newQueue = [...shareQueue];
                    newQueue.shift();
                    setShareQueue(newQueue);

                    if (newQueue.length > 0) {
                        const nextPlatform = newQueue[0];
                        lastPlatformShared.current = nextPlatform;
                        window.open(shareLinks[nextPlatform](pollUrl, pollText), '_blank');
                    } else {
                        setTimeout(() => {
                            setIsMultiShare(false);
                            setSelected([]);
                            setCompleted([]);
                            onClose();
                        }, 1000);
                    }
                }, 1000);
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
    }, [shareQueue, pollUrl, pollText, onClose]);

const handleSingleShare = async (platform) => {
    if (platform === 'linkedin') {
        try {
            const { data } = await apiClient.get('/api/linkedin/auth/status');
            if (data.isAuthenticated) {
                navigate('/share-linkedin', { state: { poll } });
            } else {
                if (window.confirm("Connect your LinkedIn account to create a campaign?")) {
                    // 1. Save the poll ID before leaving our app
                    sessionStorage.setItem('linkedinSharePollId', poll._id);
                    
                    // 2. Redirect to the backend to start the auth flow
                    window.location.href = 'http://localhost:5000/api/linkedin/auth';
                }
            }
        } catch (error) {
            toast.error("Could not verify LinkedIn connection.");
        }
    } else {
                console.error(`No share link defined for platform: ${platform}`);
            
        }
    };

    const handleLongPress = () => !isMultiShare && setIsMultiShare(true);
    
    const toggleSelection = (platform) => {
        if (!isMultiShare) return;
        setSelected(prev => prev.includes(platform) ? prev.filter(p => p !== platform) : [...prev, platform]);
    };

    const startMultiShare = () => {
        if (selected.length === 0) return;
        setCompleted([]); // Reset completed list before starting
        setShareQueue(selected);
        const firstPlatform = selected[0];
        lastPlatformShared.current = firstPlatform;
        window.open(shareLinks[firstPlatform](pollUrl, pollText), '_blank');
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText(pollUrl);
        setLinkCopied(true);
        setTimeout(() => setLinkCopied(false), 2000);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-40 flex items-end">
            <div className="bg-white w-full rounded-t-2xl p-4 animate-slide-up">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-lg">
                        {isMultiShare ? "Select platforms" : "Share this Poll"}
                    </h3>
                    <button onClick={onClose} className="p-1"><X size={20}/></button>
                </div>

                <div className="grid grid-cols-4 gap-4 mb-4">
                    {Object.keys(shareLinks).map(platform => (
                        <ShareButton 
                            key={platform}
                            platform={platform}
                            onShare={isMultiShare ? toggleSelection : handleSingleShare}
                            onLongPress={handleLongPress}
                            isMultiShare={isMultiShare}
                            isSelected={selected.includes(platform)}
                            isCompleted={completed}
                        />
                    ))}
                </div>

                <div className="flex items-center gap-2 p-2 bg-gray-100 rounded-lg">
                    <input type="text" readOnly value={pollUrl} className="flex-1 bg-transparent text-sm truncate" />
                    <button onClick={handleCopyLink} className="bg-white px-3 py-1 rounded-md text-sm font-semibold shadow-sm">
                        {linkCopied ? <Check size={16} className="text-green-500"/> : <Copy size={16}/>}
                    </button>
                </div>

                {isMultiShare && (
                    <div className="mt-4">
                        <button onClick={startMultiShare} className="w-full py-3 bg-pink-500 text-white rounded-full font-bold disabled:bg-gray-400" disabled={selected.length === 0}>
                            Share to {selected.length > 0 ? `${selected.length} ` : ''}Platforms
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}