// import React, { useEffect, useState, useRef } from "react";
// import { X, RotateCw, Edit2 } from "lucide-react";
// import ImageEditPreview from "./ImageEditPreview";
// import PollPreview from "./PollPreview";
// import apiClient from "../../api/axiosConfig";
// import * as htmlToImage from "html-to-image";

// export default function PlatformPreview({ platform, poll, onClose, onConfirm  }) {
//   const platformDimensions = {
//     instagram: {
//       width: 1080,
//       height: 1920,
//       label: "Reels / Stories",
//       aspect: 9 / 16,
//     },
//     twitter: {
//       width: 1200,
//       height: 628,
//       label: "X / Twitter",
//       aspect: 1200 / 628,
//     },
//     linkedin: {
//       width: 1200,
//       height: 627,
//       label: "LinkedIn",
//       aspect: 1200 / 627,
//     },
//     facebook: {
//       width: 1200,
//       height: 630,
//       label: "Facebook",
//       aspect: 1200 / 630,
//     },
//     whatsapp: {
//       width: 1200,
//       height: 630,
//       label: "WhatsApp",
//       aspect: 1200 / 630,
//     },
//     youtube: { width: 1280, height: 720, label: "YouTube", aspect: 16 / 9 },
//     gmail: { width: 1200, height: 600, label: "Email Banner", aspect: 2 },
//   };

//   const [imageDimensions, setImageDimensions] = useState(
//     platformDimensions[platform] || { width: 400, height: 300 }
//   );
//   const [isEditing, setIsEditing] = useState(false);
//   const [dbImage, setDbImage] = useState(poll.imageUrl || null);
//   const [previewImage, setPreviewImage] = useState(
//     poll.previewImages?.[platform] || poll.imageUrl || null
//   );
//   const [editedOnce, setEditedOnce] = useState(false);

//   const sheetRef = useRef(null);
//   const pollRef = useRef(null);

//   const handleRestore = () => {
//     setImageDimensions(platformDimensions[platform]);
//     setPreviewImage(dbImage);
//   };

//   const handleOverlayClick = (e) => {
//     if (sheetRef.current && !sheetRef.current.contains(e.target)) onClose();
//   };

//   // Upload preview image to backend and save in DB
//   const uploadPreviewImage = async (blob) => {
//     try {
//       const formData = new FormData();
//       formData.append("file", blob);
//       formData.append("pollId", poll._id);
//       formData.append("platform", platform);

//       const res = await apiClient.post("/api/upload/preview", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       // Update local previewImage state
//       setPreviewImage(res.data.hostedPreviewImage);

//       return res.data.hostedPreviewImage;
//     } catch (error) {
//       console.error("Failed to upload preview image:", error);
//       alert("Error uploading preview image. Please try again.");
//       return null;
//     }
//   };

//   const handleShare = async () => {
//     try {
//       // Capture poll preview image
//       if (!pollRef.current) return;
//       const dataUrl = await htmlToImage.toPng(pollRef.current);
//       const blob = await (await fetch(dataUrl)).blob();

//       // Upload preview image to backend
//       const hostedPreviewImage = await uploadPreviewImage(blob);

//       const pollUrl = `https://192.168.1.7:5173/poll/${poll._id}`;
//       const encodedLink = encodeURIComponent(pollUrl);

//       if (platform === "instagram") {
//         await navigator.share({
//           files: [new File([blob], "poll.png", { type: blob.type })],
//           title: "Check out my poll!",
//           text: "Vote on this poll",
//         });
//       } else {
//         let shareUrl = "";
//         switch (platform) {
//           case "twitter":
//             shareUrl = `https://twitter.com/intent/tweet?url=${encodedLink}&text=Vote on this poll!`;
//             break;
//           case "linkedin":
//             shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedLink}`;
//             break;
//           case "facebook":
//             shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedLink}`;
//             break;
//           case "whatsapp":
//             shareUrl = `https://api.whatsapp.com/send?text=Vote on this poll! ${encodedLink} %0A${hostedPreviewImage}`;
//             break;
//           case "telegram":
//             shareUrl = `https://t.me/share/url?url=${encodedLink}&text=Vote on this poll! ${hostedPreviewImage}`;
//             break;
//           default:
//             shareUrl = encodedLink;
//         }

//         window.open(shareUrl, "_blank");
//         alert(
//           "The poll preview image will appear on platforms that support OG tags. Instagram uses native image sharing."
//         );
//       }
//     } catch (error) {
//       console.error(`${platform} sharing failed:`, error);
//       alert("Sharing failed. Please try again.");
//     }
//   };

//   return (
//     <>
//       {/* Bottom Sheet */}
//       <div
//         className="fixed inset-0 bg-black/40 flex items-end justify-center z-50"
//         onClick={handleOverlayClick}
//       >
//         <div
//           ref={sheetRef}
//           className="bg-white w-full rounded-t-3xl shadow-xl animate-slideUp relative"
//           style={{ height: "75vh", maxHeight: "75vh", overflowY: "auto" }}
//         >
//           <button
//             onClick={onClose}
//             className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center z-10"
//           >
//             <X size={20} className="text-gray-700" />
//           </button>

//           <div className="px-6 py-4 relative">
//             <h4 className="text-lg font-medium text-gray-900 capitalize mb-4">
//               Preview - {platform}
//             </h4>

//             <div ref={pollRef} className="flex justify-center relative">
//               <PollPreview
//                 poll={poll}
//                 croppedImage={previewImage}
//                 aspect={platformDimensions[platform]?.aspect || 1}
//               />

//               {editedOnce && poll.type !== "text" && (
//                 <button
//                   onClick={handleRestore}
//                   className="absolute top-0 left-6 w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center shadow border border-pink-200"
//                 >
//                   <RotateCw size={18} className="text-pink-600" />
//                 </button>
//               )}

//               {poll.type !== "text" && (
//                 <button
//                   onClick={() => setIsEditing(true)}
//                   className="absolute top-0 right-6 w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center shadow border border-pink-200"
//                 >
//                   <Edit2 size={16} className="text-pink-600" />
//                 </button>
//               )}
//             </div>

//             <div className="flex justify-center mt-3 gap-14">
//               <div className="text-xs font-semibold text-gray-900">
//                 {platformDimensions[platform]?.label || platform}
//               </div>
//               <div className="text-xs text-gray-500">
//                 {platformDimensions[platform]?.width}×
//                 {platformDimensions[platform]?.height}
//               </div>
//             </div>
//           </div>

//           <div className="px-6 pb-6 mt-2">
//             <button
//               onClick={handleShare}
//               className="w-full py-3 bg-pink-500 text-white rounded-full font-medium text-base"
//             >
//               Share on {platform.charAt(0).toUpperCase() + platform.slice(1)}
//             </button>
//           </div>
//         </div>
//       </div>

//       {isEditing && (
//         <ImageEditPreview
//           imageSrc={dbImage}
//           aspect={platformDimensions[platform]?.aspect || 9 / 16}
//           onSave={(croppedImageUrl) => {
//             setPreviewImage(croppedImageUrl);
//             poll.image = croppedImageUrl;
//             setImageDimensions(platformDimensions[platform]);
//             setIsEditing(false);
//             setEditedOnce(true);
//           }}
//           onClose={() => setIsEditing(false)}
//         />
//       )}
//     </>
//   );
// }

import React, { useEffect, useState, useRef } from "react";
import { X, RotateCw, Edit2, Loader } from "lucide-react";
import ImageEditPreview from "./ImageEditPreview";
import PollPreview from "./PollPreview";
import apiClient from "../../api/axiosConfig";
import * as htmlToImage from "html-to-image";

export default function PlatformPreview({
  platform,
  poll,
  onClose,
  onConfirm,
}) {
  const platformDimensions = {
    instagram: {
      width: 1080,
      height: 1920,
      label: "Reels / Stories",
      aspect: 9 / 16,
    },
    twitter: {
      width: 1200,
      height: 628,
      label: "X / Twitter",
      aspect: 1200 / 628,
    },
    linkedin: {
      width: 1200,
      height: 627,
      label: "LinkedIn",
      aspect: 1200 / 627,
    },
    facebook: {
      width: 1200,
      height: 630,
      label: "Facebook",
      aspect: 1200 / 630,
    },
    whatsapp: {
      width: 1200,
      height: 630,
      label: "WhatsApp",
      aspect: 1200 / 630,
    },
    youtube: { width: 1280, height: 720, label: "YouTube", aspect: 16 / 9 },
    gmail: { width: 1200, height: 600, label: "Email Banner", aspect: 2 },
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

  const handleRestore = () => {
    setImageDimensions(platformDimensions[platform]);
    setPreviewImage(dbImage);
  };

  const handleOverlayClick = (e) => {
    if (sheetRef.current && !sheetRef.current.contains(e.target)) onClose();
  };

  // Upload preview image to backend and save in DB (No change)
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
      alert("Error uploading preview image. Please try again.");
      return null;
    }
  };

  const handleShare = async () => {
    if (isLoading) return; // Prevent double-clicking
    setIsLoading(true);

    try {
      if (!pollRef.current) throw new Error("Poll reference missing.");

      // --- Hide Edit/Restore buttons before capture ---
      const editButtons = pollRef.current.querySelectorAll(
        ".edit-button, .restore-button"
      );
      editButtons.forEach((btn) => (btn.style.display = "none"));

      // --- Capture image ---
      const dataUrl = await htmlToImage.toPng(pollRef.current);
      const blob = await (await fetch(dataUrl)).blob();

      // --- Restore buttons after capture ---
      editButtons.forEach((btn) => (btn.style.display = ""));

      // --- Upload and share ---
      const hostedPreviewImage = await uploadPreviewImage(blob);
      if (!hostedPreviewImage) throw new Error("Image upload failed.");

      if (platform === "instagram" || platform === "facebook") {
        await navigator.share({
          files: [new File([blob], "poll.png", { type: blob.type })],
          title: "Check out my poll!",
          text: "Vote on this poll",
        });
      }

      if (typeof onConfirm === "function") {
        onConfirm(hostedPreviewImage);
      }
    } catch (error) {
      console.error(`${platform} sharing failed:`, error);
      if (!error.message.includes("Image upload failed.")) {
        alert("Sharing failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Bottom Sheet */}
      <div
        className="fixed inset-0 bg-black/40 flex items-end justify-center z-50"
        onClick={handleOverlayClick}
      >
        <div
          ref={sheetRef}
          // Updated with dark mode class
          className="bg-white dark:bg-[#0f121d] w-full rounded-t-3xl shadow-xl animate-slideUp relative border-t border-gray-700"
          style={{ height: "75vh", maxHeight: "75vh", overflowY: "auto" }}
        >
          {/* Close button - Updated with dark mode classes */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center z-10 shadow"
          >
            <X size={20} className="text-gray-700 dark:text-gray-300" />
          </button>

          <div className="px-6 py-4 relative">
            {/* Header - Updated with dark mode class */}
            <h4 className="text-lg font-medium text-gray-900 dark:text-gray-100 capitalize mb-4">
              Preview - {platform}
            </h4>

            <div ref={pollRef} className="flex justify-center relative">
              <PollPreview
                poll={poll}
                croppedImage={previewImage}
                aspect={platformDimensions[platform]?.aspect || 1}
              />

              {editedOnce && poll.type !== "text" && (
                // Restore Button - Updated with dark mode classes
                <button
                  onClick={handleRestore}
                  className="restore-button absolute top-0 left-6 w-8 h-8 bg-pink-100 dark:bg-pink-900/50 rounded-full flex items-center justify-center shadow border border-pink-200 dark:border-pink-800"
                  disabled={isLoading}
                >
                  <RotateCw
                    size={18}
                    className="text-pink-600 dark:text-pink-300"
                  />
                </button>
              )}

              {poll.type !== "text" && (
                // Edit Button - Updated with dark mode classes
                <button
                  onClick={() => setIsEditing(true)}
                  className="edit-button absolute top-0 right-6 w-8 h-8 bg-pink-100 dark:bg-pink-900/50 rounded-full flex items-center justify-center shadow border border-pink-200 dark:border-pink-800"
                  disabled={isLoading}
                >
                  <Edit2
                    size={16}
                    className="text-pink-600 dark:text-pink-300"
                  />
                </button>
              )}
            </div>

            {/* Dimensions - Updated with dark mode classes */}
            <div className="flex justify-center mt-3 gap-14">
              <div className="text-xs font-semibold text-gray-900 dark:text-gray-100">
                {platformDimensions[platform]?.label || platform}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {platformDimensions[platform]?.width}×
                {platformDimensions[platform]?.height}
              </div>
            </div>
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
              ) : (
                `Share on ${
                  platform.charAt(0).toUpperCase() + platform.slice(1)
                }`
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ImageEditPreview modal (no changes needed here, assuming it's a separate component) */}
      {isEditing && (
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
