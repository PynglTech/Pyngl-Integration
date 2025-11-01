// // // import React, { useState, useRef } from "react";
// // // import { useLocation } from "react-router-dom";
// // // // import apiClient from "../api/axiosConfig";
// // // import ShareSheet from "../components/common/ShareSheet";
// // // import StyledQRCode from "../components/common/StyledQRCode";
// // // import html2canvas from "html2canvas";

// // // export default function PreviewImagePoll() {
// // //   const { state } = useLocation();
// // //   const [isShareSheetOpen, setIsShareSheetOpen] = useState(false);
// // //   const [capturedImage, setCapturedImage] = useState(null);
// // //   const pollRef = useRef(null);

// // //   const createdPoll = state?.createdPoll;

// // //   if (!createdPoll) {
// // //     return (
// // //       <div className="p-6 text-center">No poll found. Please go back.</div>
// // //     );
// // //   }

// // //   // ✅ Capture poll as image
// // //   const capturePollImage = async () => {
// // //     if (!pollRef.current) return;

// // //     const linkElement = document.getElementById("shareable-link");
// // //     if (linkElement) linkElement.style.display = "none";

// // //     const images = pollRef.current.getElementsByTagName("img");
// // //     await Promise.all(
// // //       Array.from(images).map(
// // //         (img) =>
// // //           new Promise((resolve) => {
// // //             if (img.complete) resolve();
// // //             else img.onload = img.onerror = resolve;
// // //           })
// // //       )
// // //     );

// // //     const canvas = await html2canvas(pollRef.current, {
// // //       scale: 2,
// // //       useCORS: true,
// // //     });
// // //     const image = canvas.toDataURL("image/png");
// // //     setCapturedImage(image);

// // //     if (linkElement) linkElement.style.display = "flex";
// // //   };

// // //   const handleSharePoll = async () => {
// // //     await capturePollImage();
// // //     setIsShareSheetOpen(true);
// // //   };

// // //   return (
// // //     <div className="p-4 font-sans">
// // //       {/* Poll Card */}
// // //       <div ref={pollRef} className="p-4 bg-white rounded-xl shadow-md">
// // //         <div className="rounded-xl border border-gray-200 p-4">
// // //           <h2 className="font-medium mb-4">{createdPoll.question}</h2>

// // //           {createdPoll.imageUrl && (
// // //             <img
// // //               src={createdPoll.imageUrl}
// // //               alt="Poll visual"
// // //               className="rounded-xl mb-4 w-full h-48 object-cover"
// // //             />
// // //           )}

// // //           <div className="space-y-3">
// // //             {createdPoll.options.map((opt, i) => (
// // //               <div
// // //                 key={opt._id || i}
// // //                 className="w-full border rounded-full px-4 py-2 text-center text-gray-700"
// // //               >
// // //                 {opt.text} {/* ✅ render only text */}
// // //               </div>
// // //             ))}
// // //           </div>

// // //           <div className="flex justify-end mt-3 text-xs text-gray-400">
// // //             <span className="font-medium text-pink-500">
// // //               <img
// // //                 src="./pynglLogoImage.png"
// // //                 alt="Pyngl Logo"
// // //                 height={15}
// // //                 width={41}
// // //               />
// // //             </span>
// // //           </div>
// // //         </div>

// // //         {/* QR Code */}
// // //         <div className="mt-6">
// // //           <StyledQRCode
// // //             pollUrl={`${window.location.origin}/poll/${createdPoll._id}`}
// // //             hideForScreenshot={true}
// // //           />
// // //         </div>
// // //       </div>

// // //       {/* Share Button */}
// // //       <div className="mt-6 space-y-3">
// // //         <button
// // //           onClick={handleSharePoll}
// // //           className="w-full py-3 rounded-full text-white font-medium bg-gradient-to-r from-cyan-400 to-pink-500 flex items-center justify-center"
// // //         >
// // //           Share Poll
// // //         </button>
// // //       </div>

// // //       {/* Share Sheet */}
// // //       {isShareSheetOpen && (
// // //         <ShareSheet
// // //           poll={createdPoll}
// // //           capturedImage={capturedImage}
// // //           onClose={() => setIsShareSheetOpen(false)}
// // //         />
// // //       )}
// // //     </div>
// // //   );
// // // }
// // import React, { useState, useRef } from "react";
// // import { useLocation } from "react-router-dom";
// // import ShareSheet from "../components/common/ShareSheet";
// // import StyledQRCode from "../components/common/StyledQRCode";
// // import html2canvas from "html2canvas";

// // export default function PreviewImagePoll() {
// //   const { state } = useLocation();
// //   const [isShareSheetOpen, setIsShareSheetOpen] = useState(false);
// //   const [capturedImage, setCapturedImage] = useState(null);
// //   const pollRef = useRef(null);

// //   const createdPoll = state?.createdPoll;

// //   if (!createdPoll) {
// //     return (
// //       <div className="p-6 text-center text-gray-900 dark:text-gray-100">
// //         No poll found. Please go back.
// //       </div>
// //     );
// //   }

// //   const capturePollImage = async () => {
// //     if (!pollRef.current) return;

// //     const linkElement = document.getElementById("shareable-link");
// //     if (linkElement) linkElement.style.display = "none";

// //     const images = pollRef.current.getElementsByTagName("img");
// //     await Promise.all(
// //       Array.from(images).map(
// //         (img) =>
// //           new Promise((resolve) => {
// //             if (img.complete) resolve();
// //             else img.onload = img.onerror = resolve;
// //           })
// //       )
// //     );

// //     const canvas = await html2canvas(pollRef.current, {
// //       scale: 2,
// //       useCORS: true,
// //       backgroundColor: null,
// //     });
// //     const image = canvas.toDataURL("image/png");
// //     setCapturedImage(image);

// //     if (linkElement) linkElement.style.display = "flex";
// //   };

// //   const handleSharePoll = async () => {
// //     await capturePollImage();
// //     setIsShareSheetOpen(true);
// //   };

// //   return (
// //     <div className="p-4 font-sans bg-gray-100 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100">
// //       {/* Poll Card */}
// //       <div
// //         ref={pollRef}
// //         className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md transition-colors"
// //       >
// //         <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-4 transition-colors">
// //           <h2 className="font-medium mb-4 text-gray-900 dark:text-gray-100">
// //             {createdPoll.question}
// //           </h2>

// //           {createdPoll.imageUrl && (
// //             <img
// //               src={createdPoll.imageUrl}
// //               alt="Poll visual"
// //               className="rounded-xl mb-4 w-full h-48 object-cover"
// //             />
// //           )}

// //           <div className="space-y-3">
// //             {createdPoll.options.map((opt, i) => (
// //               <div
// //                 key={opt._id || i}
// //                 className="w-full border rounded-full px-4 py-2 text-center text-gray-700 dark:text-gray-100 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 transition-colors"
// //               >
// //                 {opt.text}
// //               </div>
// //             ))}
// //           </div>

// //           <div className="flex justify-end mt-3 text-xs text-gray-400 dark:text-gray-500">
// //             <span className="font-medium text-pink-500">
// //               {/* Light mode logo */}
// //               <img
// //                 src="./pynglLogoImage.png"
// //                 alt="Pyngl Logo Light"
// //                 height={15}
// //                 width={41}
// //                 className="block dark:hidden"
// //               />
// //               {/* Dark mode logo */}
// //               <img
// //                 src="./logo_dark.svg"
// //                 alt="Pyngl Logo Dark"
// //                 height={15}
// //                 width={41}
// //                 className="hidden dark:block"
// //               />
// //             </span>
// //           </div>
// //         </div>

// //         {/* QR Code */}
// //         <div className="mt-6">
// //           <StyledQRCode
// //             pollUrl={`${window.location.origin}/poll/${createdPoll._id}`}
// //             hideForScreenshot={true}
// //           />
// //         </div>
// //       </div>

// //       {/* Share Button */}
// //       <div className="mt-6 space-y-3">
// //         <button
// //           onClick={handleSharePoll}
// //           className="w-full py-3 rounded-full text-white font-medium bg-gradient-to-r from-cyan-400 to-pink-500 flex items-center justify-center hover:opacity-90 transition-colors"
// //         >
// //           Share Poll
// //         </button>
// //       </div>

// //       {/* Share Sheet */}
// //       {isShareSheetOpen && (
// //         <ShareSheet
// //           poll={createdPoll}
// //           capturedImage={capturedImage}
// //           onClose={() => setIsShareSheetOpen(false)}
// //         />
// //       )}
// //     </div>
// //   );
// // }
// import React, { useState, useRef, useEffect } from "react";
// import { useLocation, useNavigate, Link } from "react-router-dom";
// import apiClient from "../api/axiosConfig";
// import ShareSheet from "../components/common/ShareSheet";
// import StyledQRCode from "../components/common/StyledQRCode";
// import html2canvas from "html2canvas";
// import { ArrowLeft, Bell, Copy } from "lucide-react";
// import useBreakpoint from "../hooks/useBreakpoint";
// import DesktopNav from "../components/layout/DesktopNav";
// import { toast } from "react-hot-toast";

// export default function PreviewImagePoll() {
//     const { state } = useLocation();
//     const navigate = useNavigate();
//     const isDesktop = useBreakpoint();

//     const [isShareSheetOpen, setIsShareSheetOpen] = useState(false);
//     const [capturedImage, setCapturedImage] = useState(null);
//     const pollRef = useRef(null);

//     const createdPoll = state?.createdPoll;

//     if (!createdPoll) {
//         // This is important for handling cases where the page is accessed directly
//         useEffect(() => {
//             navigate(-1); // Redirect back if there's no poll data
//         }, [navigate]);
//         return (
//             <div className="p-6 text-center text-gray-900 dark:text-gray-100">
//                 No poll data found. Redirecting...
//             </div>
//         );
//     }
    
//     const pollUrl = `${window.location.origin}/poll/${createdPoll._id}`;

//     const capturePollImage = async () => {
//         if (!pollRef.current) return;
//         // The rest of your html2canvas logic remains unchanged
//         const canvas = await html2canvas(pollRef.current, { scale: 2, useCORS: true, backgroundColor: null });
//         const image = canvas.toDataURL("image/png");
//         setCapturedImage(image);
//     };

//     const handleSharePoll = async () => {
//         await capturePollImage();
//         setIsShareSheetOpen(true);
//     };

//     const copyToClipboard = () => {
//         navigator.clipboard.writeText(pollUrl);
//         toast.success("Link copied to clipboard!");
//     };

//     return (
//         <div className="font-sans bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100">
//             {isDesktop ? (
//                 // --- NEW DESKTOP LAYOUT ---
//                 <>
//                     <DesktopNav />
//                     <div className="px-6 lg:px-24 py-4 text-sm text-gray-500 border-b border-gray-200">
//                         <Link to="/dashboard" className="hover:text-pink-500">Home</Link>
//                         <span className="mx-2">/</span>
//                         <Link to="/create-image-poll" className="hover:text-pink-500">Image to poll</Link>
//                         <span className="mx-2">/</span>
//                         <span className="font-semibold text-pink-500">Preview</span>
//                     </div>
//                     <main className="max-w-xl mx-auto py-12 px-4">
//                         {/* Poll Preview Card */}
//                         <div ref={pollRef} className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
//                             <h2 className="font-semibold text-lg mb-5">{createdPoll.question}</h2>
//                             {createdPoll.imageUrl && <img src={createdPoll.imageUrl} alt="Poll visual" className="rounded-xl mb-4 w-full h-auto object-cover" />}
//                             <div className="space-y-3">
//                                 {createdPoll.options.map((opt, i) => (
//                                     <div key={opt._id || i} className="w-full border rounded-full px-4 py-3 text-left text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700">
//                                         {opt.text}
//                                     </div>
//                                 ))}
//                             </div>
//                             <div className="flex justify-end mt-4">
//                                 <img src="/pynglLogoImage.png" alt="Pyngl Logo" className="h-5 block dark:hidden" />
//                                 <img src="/logo_dark.svg" alt="Pyngl Logo Dark" className="h-5 hidden dark:block" />
//                             </div>
//                         </div>

//                         {/* QR Code & Sharable Link Card */}
//                         <div className="mt-8 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 text-center">
//                             <StyledQRCode pollUrl={pollUrl} />
//                             <p className="font-semibold mt-4">Shareable link</p>
//                             <div className="mt-2 flex items-center justify-between bg-gray-100 dark:bg-gray-700 rounded-full p-2">
//                                 <span className="text-sm text-gray-500 dark:text-gray-300 pl-3 truncate">{pollUrl}</span>
//                                 <button onClick={copyToClipboard} className="bg-white dark:bg-gray-600 rounded-full p-2 shadow-sm hover:bg-gray-50"><Copy size={16} /></button>
//                             </div>
//                         </div>
                        
//                         {/* Share Button */}
//                         <div className="mt-8">
//                              <button onClick={handleSharePoll} className="w-full py-4 rounded-full text-white font-semibold bg-gradient-to-r from-cyan-400 to-pink-500 hover:opacity-90 transition-opacity">
//                                 Share Poll
//                             </button>
//                         </div>
//                     </main>
//                 </>
//             ) : (
//                 // --- EXISTING MOBILE/TABLET LAYOUT ---
//                 <div className="w-full">
//                     <div className="flex items-center border-b-2 border-gray-100 dark:border-gray-700 dark:bg-gray-800 shadow-sm bg-white p-4 sticky top-0 z-50">
//                         <button className="text-gray-600 text-lg" onClick={() => navigate(-1)}>←</button>
//                         <h1 className="flex-1 text-center font-semibold">Preview Image Poll</h1>
//                         <button className="text-gray-600"><Bell className="w-6 h-6" /></button>
//                     </div>
//                     <div className="p-4 bg-gray-100 dark:bg-gray-900 min-h-screen">
//                         <div ref={pollRef} className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md">
//                             <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-4">
//                                 <h2 className="font-medium mb-4 text-gray-900 dark:text-gray-100">{createdPoll.question}</h2>
//                                 {createdPoll.imageUrl && <img src={createdPoll.imageUrl} alt="Poll visual" className="rounded-xl mb-4 w-full h-48 object-cover" />}
//                                 <div className="space-y-3">{createdPoll.options.map((opt, i) => ( <div key={opt._id || i} className="w-full border rounded-full px-4 py-2 text-center text-gray-700 dark:text-gray-100 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700">{opt.text}</div> ))}</div>
//                                 <div className="flex justify-end mt-3"><img src="/pynglLogoImage.png" alt="Pyngl Logo Light" className="h-4 block dark:hidden" /><img src="/logo_dark.svg" alt="Pyngl Logo Dark" className="h-4 hidden dark:block" /></div>
//                             </div>
//                             <div className="mt-6"><StyledQRCode pollUrl={pollUrl} hideForScreenshot={true} /></div>
//                         </div>
//                         <div className="mt-6 space-y-3">
//                             <button onClick={handleSharePoll} className="w-full py-3 rounded-full text-white font-medium bg-gradient-to-r from-cyan-400 to-pink-500 flex items-center justify-center hover:opacity-90">Share Poll</button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//             {isShareSheetOpen && <ShareSheet poll={createdPoll} capturedImage={capturedImage} onClose={() => setIsShareSheetOpen(false)} />}
//         </div>
//     );
// }
import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import apiClient from "../api/axiosConfig";
import ShareSheet from "../components/common/ShareSheet";
import StyledQRCode from "../components/common/StyledQRCode";
import html2canvas from "html2canvas";
import { ArrowLeft, Bell, Copy } from "lucide-react";
import useBreakpoint from "../hooks/useBreakpoint";
import DesktopNav from "../components/layout/DesktopNav";
import { toast } from "react-hot-toast";

export default function PreviewImagePoll() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const isDesktop = useBreakpoint();

    const [isShareSheetOpen, setIsShareSheetOpen] = useState(false);
    const [capturedImage, setCapturedImage] = useState(null);
    const pollRef = useRef(null);

    const createdPoll = state?.createdPoll;

    // A robust check to handle cases where a user might land on this page directly
    if (!createdPoll) {
        useEffect(() => { navigate(-1); }, [navigate]);
        return <div className="p-6 text-center">No poll data found. Redirecting...</div>;
    }
    
    const pollUrl = `${window.location.origin}/poll/${createdPoll._id}`;

    const capturePollImage = async () => {
        if (!pollRef.current) return;
        const canvas = await html2canvas(pollRef.current, { scale: 2, useCORS: true, backgroundColor: null });
        setCapturedImage(canvas.toDataURL("image/png"));
    };

    const handleSharePoll = async () => {
        if (!capturedImage) {
            await capturePollImage();
        }
        setIsShareSheetOpen(true);
    };
    
    const copyToClipboard = () => {
        navigator.clipboard.writeText(pollUrl);
        toast.success("Link copied to clipboard!");
    };

    return (
        <div className="font-sans bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100">
            {isDesktop ? (
                // --- NEW & ENHANCED DESKTOP LAYOUT ---
                <>
                    <DesktopNav />
                    <div className="px-6 lg:px-24 py-4 text-sm text-gray-500 border-b border-gray-200 dark:border-gray-700">
                        <Link to="/dashboard" className="hover:text-pink-500">Home</Link>
                        <span className="mx-2">/</span>
                        <Link to="/create-image-poll" className="hover:text-pink-500">Image to poll</Link>
                        <span className="mx-2">/</span>
                        <span className="font-semibold text-pink-500">Preview</span>
                    </div>
                    <main className="max-w-xl mx-auto py-12 px-4">
                        {/* Poll Preview Card */}
                        <div ref={pollRef} className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                            <div className="flex items-center gap-2 mb-4">
                                 <h2 className="font-semibold text-lg">{createdPoll.question}</h2>
                            </div>
                            {createdPoll.imageUrl && <img src={createdPoll.imageUrl} alt="Poll visual" className="rounded-xl mb-4 w-full h-auto object-cover" />}
                            <div className="space-y-3">
                                {createdPoll.options.map((opt, i) => (
                                    <div key={opt._id || i} className="w-full border rounded-full px-4 py-3 text-left text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700">
                                        {opt.text}
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-end mt-4">
                                <img src="/assets/pynglLogoImage.png" alt="Pyngl Logo" className="h-5 block dark:hidden" />
                                <img src="/assets/logo_dark.svg" alt="Pyngl Logo Dark" className="h-5 hidden dark:block" />
                            </div>
                        </div>

                        {/* QR Code & Sharable Link Card */}
                        <div className="mt-8 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 text-center pb-24">
                            <div className="mx-auto" style={{ width: 'fit-content' }}>
                               <StyledQRCode pollUrl={pollUrl} />
                            </div>
                        </div>
                        
                        {/* Share Button */}
                        <div className="mt-8 fixed bottom-0 left-0 right-0 p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-t border-gray-200 dark:border-gray-700">
                            <div className="max-w-2xl mx-auto">
                                <button onClick={handleSharePoll} className="w-full py-4 rounded-full text-white font-semibold bg-gradient-to-r from-cyan-400 to-pink-500 hover:opacity-90 transition-opacity">
                                    Share Poll
                                </button>
                            </div>
                        </div>
                    </main>
                </>
            ) : (
                // --- ENHANCED MOBILE/TABLET LAYOUT ---
                <div className="w-full">
                    <div className="flex items-center border-b-2 border-gray-100 dark:border-gray-700 dark:bg-gray-800 shadow-sm bg-white p-4 sticky top-0 z-50">
                        <button className="p-1" onClick={() => navigate(-1)}><ArrowLeft className="w-6 h-6"/></button>
                        <h1 className="flex-1 text-center font-semibold text-lg">Preview Poll</h1>
                        <div className="w-7"></div> {/* Placeholder for spacing */}
                    </div>
                    <div className="p-4 bg-gray-100 dark:bg-gray-900 min-h-[calc(100vh-65px)]">
                        <div ref={pollRef} className="p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
                            <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-4">
                                <h2 className="font-medium mb-4 text-gray-900 dark:text-gray-100">{createdPoll.question}</h2>
                                {createdPoll.imageUrl && <img src={createdPoll.imageUrl} alt="Poll visual" className="rounded-xl mb-4 w-full h-48 object-cover" />}
                                <div className="space-y-3">{createdPoll.options.map((opt, i) => ( <div key={opt._id || i} className="w-full border rounded-full px-4 py-2 text-left text-gray-700 dark:text-gray-100 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700">{opt.text}</div> ))}</div>
                                <div className="flex justify-end mt-3"><img src="/assets/pynglLogoImage.png" alt="Pyngl Logo Light" className="h-4 block dark:hidden" /><img src="/assets/logo_dark.svg" alt="Pyngl Logo Dark" className="h-4 hidden dark:block" /></div>
                            </div>
                            <div className="mt-6"><StyledQRCode pollUrl={pollUrl} hideForScreenshot={true} /></div>
                        </div>
                        <div className="mt-6 space-y-3 pb-24">
                            <button onClick={handleSharePoll} className="w-full py-3 rounded-full text-white font-medium bg-gradient-to-r from-cyan-400 to-pink-500 flex items-center justify-center hover:opacity-90">Share Poll</button>
                        </div>
                    </div>
                </div>
            )}
            {isShareSheetOpen && <ShareSheet poll={createdPoll} capturedImage={capturedImage} onClose={() => setIsShareSheetOpen(false)} />}
        </div>
    );
}

