// import React, { useState, useEffect } from 'react';
// import { toast } from 'react-hot-toast';
// import { X, Instagram, Linkedin, Twitter, Youtube } from 'lucide-react'; 
// import { generateBrandedVariant } from '../utils/imageUtils';

// // Define the platforms and their target image sizes
// const platforms = {
//     'Instagram Story': { icon: <Instagram />, size: { width: 1080, height: 1920 } },
//     'Instagram Post': { icon: <Instagram />, size: { width: 1080, height: 1350 } },
//     'LinkedIn/Facebook': { icon: <Linkedin />, size: { width: 1200, height: 630 } },
// };

// const VariantPreview = ({ platform, variant, poll }) => {
//     const [isSharing, setIsSharing] = useState(false);
    
//     const handleShare = async () => {
//         if (!navigator.share || !variant.file) {
//             alert("Web Share is not supported on your browser, or the image is not ready.");
//             return;
//         }
//         setIsSharing(true);
//         try {
//             await navigator.share({
//                 title: poll.question,
//                 text: `Vote now on this poll: ${poll.question}`,
//                 files: [variant.file],
//             });
//         } catch (error) {
//             console.error("Sharing failed:", error);
//         } finally {
//             setIsSharing(false);
//         }
//     };

//     return (
//         <div className="space-y-2">
//             <div className="aspect-[2/3] bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center">
//                 {variant.url ? (
//                     <img src={variant.url} alt={`${platform} preview`} className="object-contain w-full h-full" />
//                 ) : (
//                     <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500"></div>
//                 )}
//             </div>
//             <button
//                 onClick={handleShare}
//                 disabled={!variant.url || isSharing}
//                 className="w-full flex items-center justify-center gap-2 py-2 bg-pink-500 text-white font-semibold rounded-full disabled:bg-gray-400"
//             >
//                 {isSharing ? 'Sharing...' : <><Share2 size={16}/> {platform}</>}
//             </button>
//         </div>
//     );
// };

// export default function ShareHub({ masterImageUrl, poll, onClose }) {
//     const [variants, setVariants] = useState({});
//     const [isGenerating, setIsGenerating] = useState(true);

//     useEffect(() => {
//         const generateAllVariants = async () => {
//             setIsGenerating(true);
//             const generated = {};
//             for (const platform in platforms) {
//                 try {
//                     const file = await generateBrandedVariant(masterImageUrl, '/pynglLogoImage.png', platforms[platform].size);
//                     generated[platform] = { file: file, url: URL.createObjectURL(file) };
//                 } catch (error) {
//                     console.error(`Failed to generate variant for ${platform}:`, error);
//                     generated[platform] = { file: null, url: null }; // Mark as failed
//                 }
//             }
//             setVariants(generated);
//             setIsGenerating(false);
//         };

//         generateAllVariants();

//         // Cleanup object URLs on component unmount
//         return () => {
//             for (const platform in variants) {
//                 if (variants[platform].url) {
//                     URL.revokeObjectURL(variants[platform].url);
//                 }
//             }
//         };
//     }, [masterImageUrl, poll]);
    
//     return (
//         <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
//             <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col p-6">
//                 <div className="flex justify-between items-center mb-4 flex-shrink-0">
//                     <h2 className="text-xl font-bold text-gray-800">Share Your Poll</h2>
//                     <button onClick={onClose} className="text-gray-500 hover:text-gray-800 p-1"><X/></button>
//                 </div>
//                 {isGenerating && <p className="text-center">Generating shareable images...</p>}
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 overflow-y-auto">
//                     {Object.keys(platforms).map(platform => (
//                         <VariantPreview key={platform} platform={platform} variant={variants[platform] || {}} poll={poll} />
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// }


// src/components/ShareHub.jsx

// import React from 'react';
// import { toast } from 'react-hot-toast';
// import { X, Instagram, Linkedin, Twitter, Youtube, Download } from 'lucide-react';
// const PLATFORM_SPECS = {
//     'Instagram Story (9:16)': { transformations: 'w_1080,h_1920,c_fill,g_auto' },
//     'Instagram Post (4:5)': { transformations: 'w_1080,h_1350,c_fill,g_auto' },
//     'Square Post (1:1)': { transformations: 'w_1080,h_1080,c_fill,g_auto' },
//     'Link Share (1.91:1)': { transformations: 'w_1200,h_630,c_fill,g_auto' },
// };
// const CLOUDINARY_CLOUD_NAME = "dsza5zui8";
// const CLOUDINARY_BASE_URL = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload`;

// // --- Main Component ---
// export default function ShareHub({ poll, onClose, masterImagePublicId, focalPoint, manualCrops }) {
//     // 2. Add state to manage the YouTube options pop-up
//     const [showYoutubeOptions, setShowYoutubeOptions] = useState(false);

//     if (!poll) return null;

//   // Construct the unique URL for this poll
//   const pollUrl = `${window.location.origin}/poll/${poll._id}`;

//   const handleShare = (platform) => {
//     let shareUrl = '';
//     const text = encodeURIComponent(`"${poll.question}" - Vote now on Pyngl!`);
//     const url = encodeURIComponent(pollUrl);

//     switch (platform) {
//       case 'twitter':
//         shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
//         break;
//       case 'linkedin':
//         shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
//         break;
//       // Add other platforms like Instagram if you have a specific flow
//     }

//     if (shareUrl) {
//       window.open(shareUrl, '_blank', 'noopener,noreferrer');
//     }
//   };

//   // --- 2. ADD THIS YOUTUBE HANDLER ---
//   const handleYoutubeShare = () => {
//     // This is the generic URL for creating a new YouTube community post
//     const youtubePostUrl = 'https://www.youtube.com/feed/entry/create';
    
//     // Prepare the text to be copied to the user's clipboard
//     const clipboardText = `${poll.question}\n\nVote here: ${pollUrl}`;

//     navigator.clipboard.writeText(clipboardText).then(() => {
//       toast.success('Poll details copied to clipboard!');
//       window.open(youtubePostUrl, '_blank', 'noopener,noreferrer');
//     }).catch(err => {
//       console.error('Failed to copy text: ', err);
//       toast.error('Could not copy poll details.');
//       // Still open the link even if copying fails
//       window.open(youtubePostUrl, '_blank', 'noopener,noreferrer');
//     });
//   };

//   return (
//     <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//       <div className="bg-gray-800 border border-white/10 rounded-2xl w-full max-w-md p-6 text-white relative">
//         <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-white">
//           <X size={24} />
//         </button>
        
//         <h2 className="text-xl font-bold text-center mb-2">Share Your Poll!</h2>
//         <p className="text-center text-gray-400 mb-6">Your poll has been created. Share it on your favorite platforms.</p>

//         <div className="bg-white/5 rounded-lg p-3 mb-6">
//           <p className="text-sm font-mono break-all">{pollUrl}</p>
//         </div>

//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
//           {/* Twitter */}
//           <button onClick={() => handleShare('twitter')} className="flex flex-col items-center justify-center p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
//             <Twitter size={28} />
//             <span className="text-sm mt-2">Twitter</span>
//           </button>
          
//           {/* LinkedIn */}
//           <button onClick={() => handleShare('linkedin')} className="flex flex-col items-center justify-center p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
//             <Linkedin size={28} />
//             <span className="text-sm mt-2">LinkedIn</span>
//           </button>

//           {/* --- 3. ADD THE YOUTUBE BUTTON --- */}
//           <button onClick={handleYoutubeShare} className="flex flex-col items-center justify-center p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
//             <Youtube size={28} className="text-red-500" />
//             <span className="text-sm mt-2">YouTube</span>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


// In src/components/ShareHub.jsx

// import React, { useState } from 'react';
// import { toast } from 'react-hot-toast';
// import { X, Twitter, Linkedin, Youtube } from 'lucide-react';

// const CLOUDINARY_CLOUD_NAME = "dsza5zui8";
// const CLOUDINARY_BASE_URL = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload`;

// // This function builds the URL for our dynamic poll card image
// // --- ✅ CORRECTED HELPER FUNCTION ---
// const generatePollCardUrl = (poll) => {
//     const baseTransformations = `w_1080,h_1080,c_fill,q_auto,r_20,bg_rgb:1a202c`;

//     // FIX: Properly escape text for URL safety. This is the key change.
//     const sanitizeText = (text) => {
//         return encodeURIComponent(text.replace(/,/g, '%2C'));
//     };

//     const questionText = sanitizeText(poll.question);
//     const questionOverlay = `l_text:Arial_60_bold:${questionText},co_white,g_north,y_100`;
//     const transformations = [baseTransformations, questionOverlay];

//     if (poll.type === 'image' && poll.imageUrl) {
//         const imagePublicId = poll.imageUrl.split('/').slice(-2).join('/').replace(/\.[^/.]+$/, "");
//         const imageOverlay = `l_${imagePublicId.replace(/\//g,':')},w_800,h_450,c_fill,g_center,y_-50,r_10`;
//         transformations.push(imageOverlay);
//     }
    
//     poll.options.forEach((option, index) => {
//         const optionText = sanitizeText(`- ${option.text}`);
//         const yOffset = poll.type === 'image' ? 250 + (index * 60) : 50 + (index * 70);
//         const optionOverlay = `l_text:Arial_48:${optionText},co_white,g_center,y_${yOffset}`;
//         transformations.push(optionOverlay);
//     });
    
//     const baseImage = 'v1614882593/transparent_z9x5rs.png';
//     return `${CLOUDINARY_BASE_URL}/${transformations.join('/')}/${baseImage}`;
// };


// export default function ShareHub({ poll, onClose }) {
//     const [isGenerating, setIsGenerating] = useState(false);

//     if (!poll) return null;

//     const pollUrl = `${window.location.origin}/poll/${poll._id}`;

//     // --- ✅ NEW UNIFIED SHARE HANDLER ---
//     const handleNativeShare = async () => {
//         setIsGenerating(true);
//         const pollCardUrl = generatePollCardUrl(poll);
//         const shareText = `${poll.question}\n\nVote here: ${pollUrl}`;

//         try {
//             // 1. Fetch the generated poll card as a file
//             const response = await fetch(pollCardUrl);
//             const blob = await response.blob();
//             const file = new File([blob], 'pyngl-poll.jpg', { type: 'image/jpeg' });

//             // 2. Prepare the data for the Web Share API
//             const shareData = {
//                 title: 'Pyngl Poll',
//                 text: shareText,
//                 url: pollUrl,
//                 files: [file],
//             };

//             // 3. Check if the browser can share this data
//             if (navigator.canShare && navigator.canShare(shareData)) {
//                 // 4. Trigger the native share dialog
//                 await navigator.share(shareData);
//                 toast.success('Shared successfully!');
//             } else {
//                 // This is a fallback for browsers that don't support sharing files
//                 throw new Error("File sharing not supported on this browser.");
//             }
//         } catch (error) {
//             console.error('Web Share API failed:', error);
//             // --- FALLBACK LOGIC ---
//             // If sharing fails, fall back to the old download method
//             toast.error('Direct sharing not supported. Downloading image instead.');
//             const link = document.createElement('a');
//             link.href = pollCardUrl;
//             link.download = 'pyngl-poll-card.jpg';
//             link.click();
//             navigator.clipboard.writeText(shareText);
//         } finally {
//             setIsGenerating(false);
//             onClose();
//         }
//     };

//     return (
//         <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//             <div className="bg-gray-800 border border-white/10 rounded-2xl w-full max-w-md p-6 text-white relative">
//                 <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-white">
//                     <X size={24} />
//                 </button>
                
//                 <h2 className="text-xl font-bold text-center mb-2">Share Poll Card</h2>
//                 <p className="text-center text-gray-400 mb-6">A shareable image will be generated for your poll.</p>

//                 <div className="p-4 bg-white/5 rounded-lg text-center">
//                     <p className="font-semibold mb-2">What will be shared:</p>
//                     <ul className="text-sm text-gray-300 list-disc list-inside">
//                         <li>A generated image of your poll card.</li>
//                         <li>A link to vote on the live poll.</li>
//                     </ul>
//                 </div>

//                 <button 
//                     onClick={handleNativeShare} 
//                     disabled={isGenerating} 
//                     className="w-full mt-6 py-3 rounded-full text-white font-bold bg-gradient-to-r from-cyan-400 to-pink-500 shadow-lg flex items-center justify-center disabled:opacity-70"
//                 >
//                     {isGenerating ? 'Generating...' : 'Share Now'}
//                 </button>
//             </div>
//         </div>
//     );
// }



// import React from 'react';
// import { toast } from 'react-hot-toast';
// // 1. Import the Youtube icon from lucide-react
// import { X, Twitter, Linkedin, Youtube } from 'lucide-react';

// export default function ShareHub({ poll, onClose }) {
//   if (!poll) return null;

//   const pollUrl = `${window.location.origin}/poll/${poll._id}`;
//   const pollText = `${poll.question}\n\nVote here: ${pollUrl}`;

//   const handleLinkShare = (platformUrl) => {
//     const url = platformUrl + encodeURIComponent(pollUrl);
//     window.open(url, '_blank', 'noopener,noreferrer');
//   };

//   // 2. Add the handler function for YouTube
//   const handleYoutubeShare = () => {
//     // This is the direct link to YouTube's "create post" page
//     const youtubePostUrl = 'https://www.youtube.com/feed/entry/create';

//     // Automatically copy the poll text and link for the user
//     navigator.clipboard.writeText(pollText).then(() => {
//       toast.success('Poll details copied to clipboard!');
//     });

//     window.open(youtubePostUrl, '_blank', 'noopener,noreferrer');
//   };

//   return (
//     <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//       <div className="bg-gray-800 border border-white/10 rounded-2xl w-full max-w-md p-6 text-white relative">
//         <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-white">
//           <X size={24} />
//         </button>
        
//         <h2 className="text-xl font-bold text-center mb-6">Share Poll</h2>

//         <div className="grid grid-cols-4 gap-4 text-center">
//           {/* Twitter Button */}
//           <button onClick={() => handleLinkShare(`https://twitter.com/intent/tweet?url=`)} className="flex flex-col items-center justify-center p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
//             <Twitter size={28} />
//             <span className="text-xs mt-2">Twitter</span>
//           </button>
          
//           {/* LinkedIn Button */}
//           <button onClick={() => handleLinkShare(`https://www.linkedin.com/sharing/share-offsite/?url=`)} className="flex flex-col items-center justify-center p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
//             <Linkedin size={28} />
//             <span className="text-xs mt-2">LinkedIn</span>
//           </button>

//           {/* --- 3. Add the new YouTube button to your layout --- */}
//           <button onClick={handleYoutubeShare} className="flex flex-col items-center justify-center p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
//             <Youtube size={28} className="text-red-500" />
//             <span className="text-xs mt-2">YouTube</span>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

 React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { X, Share2 } from 'lucide-react'; // Using a more generic share icon
import apiClient from '../api/axiosConfig'; 
const CLOUDINARY_CLOUD_NAME = "dsza5zui8";
const CLOUDINARY_BASE_URL = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload`;

// This function builds the URL for our dynamic poll card image
constimport generatePollCardUrl = (poll) => {
    // This function now properly escapes special characters for Cloudinary text overlays.
    const sanitizeText = (text) => {
        const escapedText = text
            .replace(/,/g, '%2C')  // Escape commas
            .replace(/\//g, '_'); // Replace slashes with underscores
        return encodeURIComponent(escapedText);
    };
    
    const baseTransformations = `w_1080,h_1080,c_fill,q_auto,r_20,bg_rgb:1a202c`;
    
    const questionText = sanitizeText(poll.question);
    const questionOverlay = `l_text:Arial_60_bold:${questionText},co_white,g_north,y_100`;
    const transformations = [baseTransformations, questionOverlay];

    if (poll.type === 'image' && poll.imageUrl) {
        const imagePublicId = poll.imageUrl.split('/').slice(-2).join('/').replace(/\.[^/.]+$/, "");
        const imageOverlay = `l_${imagePublicId.replace(/\//g,':')},w_800,h_450,c_fill,g_center,y_-50,r_10`;
        transformations.push(imageOverlay);
    }
    
    poll.options.forEach((option, index) => {
        const optionText = sanitizeText(`- ${option.text}`);
        const yOffset = poll.type === 'image' ? 250 + (index * 60) : 50 + (index * 70);
        const optionOverlay = `l_text:Arial_48:${optionText},co_white,g_center,y_${yOffset}`;
        transformations.push(optionOverlay);
    });
    
    const baseImage = 'v1614882593/transparent_z9x5rs.png';
    return `${CLOUDINARY_BASE_URL}/${transformations.join('/')}/${baseImage}`;
};



export default function ShareHub({ poll, onClose }) {
    const [isGenerating, setIsGenerating] = useState(false);

    if (!poll) return null;

 const pollUrl = `${window.location.origin}/poll/${poll._id}`;
    const shareText = `${poll.question}\n\nVote here: ${pollUrl}`;


    const handleShare = async () => {
        setIsGenerating(true);
        const pollCardUrl = generatePollCardUrl(poll);

        try {
            // Check if the Web Share API is supported by the browser
            if (!navigator.share) {
                throw new Error("Web Share API not supported.");
            }

            // Fetch the generated poll card image and create a File object
            const response = await fetch(pollCardUrl);
            const blob = await response.blob();
            const file = new File([blob], 'pyngl-poll.jpg', { type: 'image/jpeg' });

            const shareData = {
                title: 'Pyngl Poll',
                text: shareText,
                url: pollUrl,
                files: [file],
            };

            // Check if the browser can share the files
            if (!navigator.canShare(shareData)) {
                 throw new Error("Cannot share these files.");
            }
            
            // Trigger the native share dialog
            await navigator.share(shareData);

        } catch (error) {
            console.error('Sharing failed:', error);
            // Fallback for browsers that fail or don't support sharing files
            toast.error('Direct sharing not available. Downloading image instead.');
            const link = document.createElement('a');
            link.href = pollCardUrl;
            link.download = 'pyngl-poll-card.jpg';
            link.click();
            navigator.clipboard.writeText(shareText);
        } finally {
            setIsGenerating(false);
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 border border-white/10 rounded-2xl w-full max-w-md p-6 text-white relative">
                <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-white">
                    <X size={24} />
                </button>
                
                <h2 className="text-xl font-bold text-center mb-2">Share Poll Card</h2>
                <p className="text-center text-gray-400 mb-6">A shareable image of your poll will be generated to share directly to any app.</p>

                <div className="p-4 bg-white/5 rounded-lg text-center">
                    <p className="font-semibold mb-2">What will be shared:</p>
                    <ul className="text-sm text-gray-300 list-disc list-inside">
                        <li>A generated image of your poll card.</li>
                        <li>A link to vote on the live poll.</li>
                    </ul>
                </div>

                <button 
                    onClick={handleShare} 
                    disabled={isGenerating} 
                    className="w-full mt-6 py-3 rounded-full text-white font-bold bg-gradient-to-r from-cyan-400 to-pink-500 shadow-lg flex items-center justify-center gap-2 disabled:opacity-70"
                >
                    <Share2 size={20} />
                    {isGenerating ? 'Generating...' : 'Share Now'}
                </button>
            </div>
        </div>
    );
}   