// // import React, { useState, useRef } from "react";
// // import { useLocation, useNavigate } from "react-router-dom";
// // import apiClient from "../api/axiosConfig";
// // import ShareSheet from "../components/common/ShareSheet";
// // import StyledQRCode from "../components/common/StyledQRCode"; // Corrected import path

// // export default function PreviewTextPoll() {
// //     const { state } = useLocation();
// //     const navigate = useNavigate(); // Added navigate for ShareSheet

// //     const [isLoading, setIsLoading] = useState(false);
// //     const [createdPoll, setCreatedPoll] = useState(null);
// //     const [isShareSheetOpen, setIsShareSheetOpen] = useState(false);
// //     const [qrDataUrl, setQrDataUrl] = useState(null);

// //     const pollRef = useRef(null);

// //     if (!state) {
// //         return (
// //             <div className="p-6 text-center text-gray-900 dark:text-gray-100">
// //                 No poll data found. Please go back.
// //             </div>
// //         );
// //     }

// //     const handleCreatePoll = async () => {
// //         if (createdPoll) {
// //             setIsShareSheetOpen(true);
// //             return;
// //         }

// //         setIsLoading(true);
// //         try {
// //             const pollData = {
// //                 question: state.question,
// //                 options: state.options,
// //                 type: "text",
// //                 duration: state.selectedDuration,
// //                 ageRange: state.selectedAgeRange, // Updated from state.ageRange for consistency
// //                 shareToTrending: state.shareToTrending,
// //             };

// //             const response = await apiClient.post("/api/polls/create-poll", pollData);
// //             setCreatedPoll(response.data);
// //             setIsShareSheetOpen(true); // Automatically open share sheet after creation
// //         } catch (error) {
// //             console.error(error);
// //             alert(
// //                 error.response?.data?.error || "Error saving poll. Please try again."
// //             );
// //         } finally {
// //             setIsLoading(false);
// //         }
// //     };

// //     return (
// //         <div className="p-4 font-sans bg-gray-100 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100">
// //             {/* Poll Preview */}
// //             <div
// //                 ref={pollRef}
// //                 className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md transition-colors"
// //             >
// //                 <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-4 transition-colors">
// //                     <h2 className="font-medium mb-4">{state.question}</h2>
// //                     <div className="space-y-3">
// //                         {state.options.map((opt, i) => (
// //                             <div
// //                                 key={i}
// //                                 className="w-full border rounded-full px-4 py-2 text-center text-gray-700 dark:text-gray-100 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 transition-colors"
// //                             >
// //                                 {opt}
// //                             </div>
// //                         ))}
// //                     </div>
// //                     <div className="flex justify-end mt-3 text-xs text-gray-400 dark:text-gray-500">
// //                         <span className="font-medium text-pink-500">
// //                             {/* Light mode logo */}
// //                             <img
// //                                 src="/pynglLogoImage.png"
// //                                 alt="Pyngl Logo Light"
// //                                 style={{ height: '15px', width: '41px' }} // Using style for exact dimensions
// //                                 className="block dark:hidden"
// //                             />
// //                             {/* Dark mode logo */}
// //                             <img
// //                                 src="/logo_dark.svg"
// //                                 alt="Pyngl Logo Dark"
// //                                 style={{ height: '15px', width: '41px' }}
// //                                 className="hidden dark:block"
// //                             />
// //                         </span>
// //                     </div>
// //                 </div>

// //                 {createdPoll && (
// //                     <div className="mt-6">
// //                         <StyledQRCode
// //                             pollUrl={`${window.location.origin}/poll/${createdPoll._id}`}
// //                             setQrDataUrl={setQrDataUrl}
// //                         />
// //                         {qrDataUrl && (
// //                             <img src={qrDataUrl} alt="QR Code" className="hidden" />
// //                         )}
// //                     </div>
// //                 )}
// //             </div>

// //             {/* Action Buttons */}
// //             <div className="mt-6 space-y-3">
// //                 <button
// //                     onClick={handleCreatePoll}
// //                     disabled={isLoading}
// //                     className="w-full py-3 rounded-full text-white font-medium bg-gradient-to-r from-cyan-400 to-pink-500 flex items-center justify-center disabled:opacity-70 transition-colors"
// //                 >
// //                     {isLoading
// //                         ? "Creating Poll..."
// //                         : createdPoll
// //                         ? "Share Poll"
// //                         : "Create & Share Poll"}
// //                 </button>
// //             </div>

// //             {/* Share Sheet */}
// //             {isShareSheetOpen && createdPoll && (
// //                 <ShareSheet
// //                     poll={createdPoll}
// //                     onClose={() => setIsShareSheetOpen(false)}
// //                 />
// //             )}
// //         </div>
// //     );
// // }
// import React, { useState, useRef } from "react";
// import { useLocation } from "react-router-dom";
// import apiClient from "../api/axiosConfig";
// import ShareSheet from "../components/common/ShareSheet";
// import StyledQRCode from "../components/common/StyledQRCode";
// import { useNavigate } from "react-router-dom";
// import DesktopNav from "../components/layout/DesktopNav";
// import useBreakpoint from "../hooks/useBreakpoint";
// export default function PreviewTextPoll() {
//   const { state } = useLocation();

//   const [isLoading, setIsLoading] = useState(false);
//   const [createdPoll, setCreatedPoll] = useState(null);
//   const [isShareSheetOpen, setIsShareSheetOpen] = useState(false);
//   const [qrDataUrl, setQrDataUrl] = useState(null);
//   const isDesktop=useBreakpoint();
//   const pollRef = useRef(null);
//   const navigate =  useNavigate();

//   if (!state) {
//     return (
//       <div className="p-6 text-center text-gray-900 dark:text-gray-100">
//         No poll data found. Please go back.
//       </div>
//     );
//   }

//   const handleCreatePoll = async () => {
//     if (createdPoll) {
//       setIsShareSheetOpen(true);
//       return;
//     }

//     setIsLoading(true);
//     try {
//       const pollData = {
//         question: state.question,
//         options: state.options,
//         type: "text",
//         duration: state.selectedDuration,
//         ageRange: state.selectedAgeRange,
//         shareToTrending: state.shareToTrending,
//       };

//       const response = await apiClient.post("/api/polls/create-poll", pollData);
//       setCreatedPoll(response.data);
//     } catch (error) {
//       console.error(error);
//       alert(
//         error.response?.data?.error || "Error saving poll. Please try again."
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//    <div className="font-sans bg-white dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100 m-auto w-full md:w-7/6 lg:w-4/5 xl:w-3/4 2xl:w-2/3 transition-all duration-300">

//     {/* ✅ Sticky Header */}
//   <div className="flex items-center border-b-2 border-gray-100 dark:border-gray-700 dark:bg-gray-800 shadow-sm bg-white p-4 sticky top-0 z-50">
//     <button
//       className="text-gray-600 text-lg"
//       onClick={() => navigate("/create-text-poll")}
//     >
//       ←
//     </button>
//     <h1 className="flex-1 text-center font-semibold">Preview Text to poll</h1>
//     <button className="text-gray-600">
//       <img src="/Bell.svg" alt="Bell" className="w-6 h-6" />
//     </button>
//   </div>
//       <div className="bg-gray-100 dark:bg-gray-800 m-auto p-4 min-h-screen w-full md:w-4/6 lg:w-4/5 xl:w-3/4 2xl:w-2/3 transition-all duration-300">
//       {/* Poll Preview */}
//       <div
//         ref={pollRef}
//         className="p-4 bg-white dark:bg-gray-900 rounded-xl shadow-md transition-colors"
//       >
//         <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-4 transition-colors">
//           <h2 className="font-medium mb-4">{state.question}</h2>
//           <div className="space-y-3">
//             {state.options.map((opt, i) => (
//               <div
//                 key={i}
//                 className="w-full border rounded-full px-4 py-2 text-center text-gray-700 dark:text-gray-100 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 transition-colors"
//               >
//                 {opt}
//               </div>
//             ))}
//           </div>
//           <div className="flex justify-end mt-3 text-xs text-gray-400 dark:text-gray-500">
//             <span className="font-medium text-pink-500">
//               {/* Light mode logo */}
//               <img
//                 src="./pynglLogoImage.png"
//                 alt="Pyngl Logo Light"
//                 height={15}
//                 width={41}
//                 className="block dark:hidden"
//               />
//               {/* Dark mode logo */}
//               <img
//                 src="./logo_dark.svg"
//                 alt="Pyngl Logo Dark"
//                 height={15}
//                 width={41}
//                 className="hidden dark:block"
//               />
//             </span>
//           </div>
//         </div>

//         {createdPoll && (
//           <div className="mt-6">
//             <StyledQRCode
//               pollUrl={`${window.location.origin}/poll/${createdPoll._id}`}
//               setQrDataUrl={setQrDataUrl}
//             />
//             {qrDataUrl && (
//               <img src={qrDataUrl} alt="QR Code" className="hidden" />
//             )}
//           </div>
//         )}
//       </div>

//       {/* Action Buttons */}
//       <div className="mt-6 space-y-3">
//         <button
//           onClick={handleCreatePoll}
//           disabled={isLoading}
//           className="w-full py-3 rounded-full text-white font-medium bg-gradient-to-r from-cyan-400 to-pink-500 flex items-center justify-center disabled:opacity-70 transition-colors"
//         >
//           {isLoading
//             ? "Creating Poll..."
//             : createdPoll
//             ? "Share Poll"
//             : "Create & Share Poll"}
//         </button>
//       </div>

//       {/* Share Sheet */}
//       {isShareSheetOpen && createdPoll && (
//         <ShareSheet
//           poll={createdPoll}
//           onClose={() => setIsShareSheetOpen(false)}
//         />
//       )}
//     </div>
//     </div>
//   );
// }
import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import apiClient from "../api/axiosConfig";
import ShareSheet from "../components/common/ShareSheet";
import StyledQRCode from "../components/common/StyledQRCode";
import { ArrowLeft, Bell, Copy } from "lucide-react";
import useBreakpoint from "../hooks/useBreakpoint";
import DesktopNav from "../components/layout/DesktopNav";
import { toast } from "react-hot-toast";

export default function PreviewTextPoll() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const isDesktop = useBreakpoint();

  const [isLoading, setIsLoading] = useState(false);
  const [createdPoll, setCreatedPoll] = useState(null);
  const [isShareSheetOpen, setIsShareSheetOpen] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState(null);
  const pollRef = useRef(null);
  const hasCreatedRef = useRef(false);

  if (!state) {
    return (
      <div className="p-6 text-center text-gray-900 dark:text-gray-100">
        No poll data found. Please go back.
      </div>
    );
  }

  const handleCreatePoll = async () => {
    if (createdPoll) {
      setIsShareSheetOpen(true);
      return;
    }

    setIsLoading(true);
    try {
      const pollData = {
        question: state.question,
        options: state.options,
        type: "text",
        duration: state.selectedDuration,
        ageRange: state.selectedAgeRange,
        shareToTrending: state.shareToTrending,
      };
      const response = await apiClient.post("/api/polls/create-poll", pollData);
      setCreatedPoll(response.data);
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const pollUrl = createdPoll
    ? `${window.location.origin}/poll/${createdPoll._id}`
    : "";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(pollUrl);
    toast.success("Link copied to clipboard!");
  };

  useEffect(() => {
    if (!hasCreatedRef.current) {
      handleCreatePoll();
      hasCreatedRef.current = true;
    }
  }, []);

  //     return (
  //         <div className="font-sans bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100">
  //             {isDesktop ? (
  //                 // --- NEW DESKTOP LAYOUT ---
  //                 <>
  //                     <DesktopNav />
  //                     <div className="px-6 lg:px-24 py-4 text-sm text-gray-500 border-b border-gray-200">
  //                         <Link to="/dashboard" className="hover:text-pink-500">Home</Link>
  //                         <span className="mx-2">/</span>
  //                         <Link to="/create-text-poll" className="hover:text-pink-500">Text to poll</Link>
  //                         <span className="mx-2">/</span>
  //                         <span className="font-semibold text-pink-500">Preview</span>
  //                     </div>
  //                     <main className="max-w-xl mx-auto py-12 px-4">
  //                         {/* Poll Preview Card */}
  //                         <div ref={pollRef} className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
  //                            <h2 className="font-medium mb-4">{state.question}</h2>
  //                             <div className="space-y-3">
  //                                 {state.options.map((opt, i) => (
  //                                     <div key={i} className="w-full border rounded-full px-4 py-3 text-center text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700">
  //                                         {opt}
  //                                     </div>
  //                                 ))}
  //                             </div>
  //                             <div className="flex justify-end mt-4">
  //                                 <img src="/pynglLogoImage.png" alt="Pyngl Logo" className="h-5 block dark:hidden" />
  //                                 <img src="/logo_dark.svg" alt="Pyngl Logo Dark" className="h-5 hidden dark:block" />
  //                             </div>
  //                         </div>

  //                         {/* QR Code & Sharable Link Card */}
  //                         {createdPoll && (
  //                             <div className="mt-8 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 text-center">
  //                                 <StyledQRCode pollUrl={pollUrl} setQrDataUrl={setQrDataUrl} />
  //                                 <p className="font-semibold mt-4">Shareable link</p>
  //                                 <div className="mt-2 flex items-center justify-between bg-gray-100 dark:bg-gray-700 rounded-full p-2">
  //                                     <span className="text-sm text-gray-500 dark:text-gray-300 pl-3 truncate">{pollUrl}</span>
  //                                     <button onClick={copyToClipboard} className="bg-white dark:bg-gray-600 rounded-full p-2 shadow-sm hover:bg-gray-50">
  //                                         <Copy size={16} />
  //                                     </button>
  //                                 </div>
  //                             </div>
  //                         )}

  //                         {/* Share Button */}
  //                         <div className="mt-8">
  //                              <button
  //                                 onClick={() => setIsShareSheetOpen(true)}
  //                                 disabled={!createdPoll || isLoading}
  //                                 className="w-full py-4 rounded-full text-white font-semibold bg-gradient-to-r from-cyan-400 to-pink-500 hover:opacity-90 transition-opacity disabled:opacity-50"
  //                             >
  //                                 {isLoading ? "Creating Poll..." : "Share Poll"}
  //                             </button>
  //                         </div>
  //                     </main>
  //                 </>
  //             ) : (
  //                 // --- EXISTING MOBILE/TABLET LAYOUT ---
  //                 <div className="w-full">
  //                     <div className="flex items-center border-b-2 border-gray-100 dark:border-gray-700 dark:bg-gray-800 shadow-sm bg-white p-4 sticky top-0 z-50">
  //                         <button className="text-gray-600 text-lg" onClick={() => navigate("/create-text-poll")}>←</button>
  //                         <h1 className="flex-1 text-center font-semibold">Preview Text to poll</h1>
  //                         <button className="text-gray-600"><Bell className="w-6 h-6" /></button>
  //                     </div>
  //                     <div className="bg-gray-100 dark:bg-gray-800 p-4 min-h-screen">
  //                         <div ref={pollRef} className="p-4 bg-white dark:bg-gray-900 rounded-xl shadow-md">
  //                             <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-4">
  //                                 <h2 className="font-medium mb-4">{state.question}</h2>
  //                                 <div className="space-y-3">{state.options.map((opt, i) => ( <div key={i} className="w-full border rounded-full px-4 py-2 text-center text-gray-700 dark:text-gray-100 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700">{opt}</div> ))}</div>
  //                                 <div className="flex justify-end mt-3"><img src="/pynglLogoImage.png" alt="Pyngl Logo Light" className="h-4 block dark:hidden" /><img src="/logo_dark.svg" alt="Pyngl Logo Dark" className="h-4 hidden dark:block" /></div>
  //                             </div>
  //                             {createdPoll && ( <div className="mt-6"><StyledQRCode pollUrl={pollUrl} setQrDataUrl={setQrDataUrl} />{qrDataUrl && <img src={qrDataUrl} alt="QR Code" className="hidden" />}</div>)}
  //                         </div>
  //                         <div className="mt-6 space-y-3">
  //                             <button onClick={handleCreatePoll} disabled={isLoading} className="w-full py-3 rounded-full text-white font-medium bg-gradient-to-r from-cyan-400 to-pink-500 flex items-center justify-center disabled:opacity-70">
  //                                 {isLoading ? "Creating Poll..." : createdPoll ? "Share Poll" : "Create & Share Poll"}
  //                             </button>
  //                         </div>
  //                     </div>
  //                 </div>
  //             )}
  //             {isShareSheetOpen && createdPoll && <ShareSheet poll={createdPoll} onClose={() => setIsShareSheetOpen(false)} />}
  //         </div>
  //     );
  // }

  return (
    <div className="font-sans bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100">
      {isDesktop ? (
        // --- DESKTOP LAYOUT ---
        <>
          <DesktopNav />
          <div className="px-6 lg:px-24 py-4 text-sm text-gray-500 border-b border-gray-200">
            <Link to="/dashboard" className="hover:text-pink-500">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link to="/create-text-poll" className="hover:text-pink-500">
              Text to poll
            </Link>
            <span className="mx-2">/</span>
            <span className="font-semibold text-pink-500">Preview</span>
          </div>
          <main className="max-w-xl mx-auto py-12 px-4">
            {/* Poll Preview Card */}
            <div
              ref={pollRef}
              className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700"
            >
              {/* THIS IS THE FIX: text-left is the default, so we remove text-center */}
              <h2 className="font-semibold text-lg mb-5">{state.question}</h2>
              <div className="space-y-3">
                {state.options.map((opt, i) => (
                  // THIS IS THE FIX: text-left is added for clarity
                  <div
                    key={i}
                    className="w-full border rounded-full px-4 py-3 text-left text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700"
                  >
                    {opt}
                  </div>
                ))}
              </div>
              <div className="flex justify-end mt-4">
                <img
                  src="/pynglLogoImage.png"
                  alt="Pyngl Logo"
                  className="h-5 block dark:hidden"
                />
                <img
                  src="/logo_dark.svg"
                  alt="Pyngl Logo Dark"
                  className="h-5 hidden dark:block"
                />
              </div>
            </div>

            {/* QR Code & Sharable Link Card */}
            {createdPoll && (
              <div className="mt-8 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 text-center">
                <StyledQRCode pollUrl={pollUrl} setQrDataUrl={setQrDataUrl} />
              </div>
            )}

            {/* Share Button */}
            <div className="mt-8">
              <button
                onClick={() => setIsShareSheetOpen(true)}
                disabled={!createdPoll || isLoading}
                className="w-full py-4 rounded-full text-white font-semibold bg-gradient-to-r from-cyan-400 to-pink-500 hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {isLoading ? "Creating Poll..." : "Share Poll"}
              </button>
            </div>
          </main>
        </>
      ) : (
        // --- MOBILE/TABLET LAYOUT ---
        <div className="w-full">
          <div className="flex items-center border-b-2 border-gray-100 dark:border-gray-700 dark:bg-gray-800 shadow-sm bg-white p-4 sticky top-0 z-50">
            <button
              className="text-gray-600 text-lg"
              onClick={() => navigate("/create-text-poll")}
            >
              ←
            </button>
            <h1 className="flex-1 text-center font-semibold">
              Preview Text to poll
            </h1>
            <button className="text-gray-600">
              <Bell className="w-6 h-6" />
            </button>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 p-4 min-h-screen">
            <div
              ref={pollRef}
              className="p-4 bg-white dark:bg-gray-900 rounded-xl shadow-md"
            >
              <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-4">
                <h2 className="font-medium mb-4">{state.question}</h2>
                <div className="space-y-3">
                  {state.options.map((opt, i) => (
                    // THIS IS THE FIX: text-left is added for clarity
                    <div
                      key={i}
                      className="w-full border rounded-full px-4 py-2 text-left text-gray-700 dark:text-gray-100 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700"
                    >
                      {opt}
                    </div>
                  ))}
                </div>
                <div className="flex justify-end mt-3">
                  <img
                    src="/pynglLogoImage.png"
                    alt="Pyngl Logo Light"
                    className="h-4 block dark:hidden"
                  />
                  <img
                    src="/logo_dark.svg"
                    alt="Pyngl Logo Dark"
                    className="h-4 hidden dark:block"
                  />
                </div>
              </div>
              {createdPoll && (
                <div className="mt-6">
                  <StyledQRCode pollUrl={pollUrl} setQrDataUrl={setQrDataUrl} />
                  {qrDataUrl && (
                    <img src={qrDataUrl} alt="QR Code" className="hidden" />
                  )}
                </div>
              )}
            </div>
            <div className="mt-6 space-y-3">
              <button
                onClick={handleCreatePoll}
                disabled={isLoading}
                className="w-full py-3 rounded-full text-white font-medium bg-gradient-to-r from-cyan-400 to-pink-500 flex items-center justify-center disabled:opacity-70"
              >
                {isLoading
                  ? "Creating Poll..."
                  : createdPoll
                  ? "Share Poll"
                  : "Create & Share Poll"}
              </button>
            </div>
          </div>
        </div>
      )}
      {isShareSheetOpen && createdPoll && (
        <ShareSheet
          poll={createdPoll}
          onClose={() => setIsShareSheetOpen(false)}
        />
      )}
    </div>
  );
}
