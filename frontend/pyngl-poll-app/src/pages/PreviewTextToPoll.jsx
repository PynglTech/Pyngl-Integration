// // import React, { useState } from "react";
// // import { useLocation, useNavigate } from "react-router-dom";
// // import apiClient from "../api/axiosConfig"; 
// // import ShareSheet from "../components/common/ShareSheet"; // 1. Import the new ShareSheet component

// // export default function PreviewTextPoll() {
// //     const { state } = useLocation();
// //     const navigate = useNavigate();

// //     const [isLoading, setIsLoading] = useState(false);
// //     const [createdPoll, setCreatedPoll] = useState(null);
// //     const [isShareSheetOpen, setIsShareSheetOpen] = useState(false); // 2. Add state for the sheet

// //     const handleCreateAndSharePoll = async () => {
// //         // If the poll is already created, just open the share sheet
// //         if (createdPoll) {
// //             setIsShareSheetOpen(true);
// //             return;
// //         }

// //         setIsLoading(true);
// //         try {
// //             const pollData = {
// //                 question: state.question,
// //                 options: state.options,
// //                 type: 'text',
// //                 duration: state.duration,
// //             };
            
// //             const response = await apiClient.post("/api/polls/create-poll", pollData);
// //             const newPoll = response.data; 
// //             setCreatedPoll(newPoll);
// //             setIsShareSheetOpen(true); // 3. Open the share sheet on success

// //         } catch (error) {
// //             console.error(error);
// //             alert(error.response?.data?.error || "Error saving poll. Please try again.");
// //         } finally {
// //             setIsLoading(false);
// //         }
// //     };
    
// //     if (!state) {
// //         return <div className="p-6 text-center">No poll data found. Please go back.</div>
// //     }

// //     const { question, options } = state;

// //     return (
// //         <div className="p-4 font-sans">
// //             <div className="rounded-xl border border-gray-200 p-4">
// //                 <h2 className="font-medium mb-4">{question}</h2>
// //                 <div className="space-y-3">
// //                     {options.map((opt, i) => (
// //                         <div key={i} className="w-full border rounded-full px-4 py-2 text-center text-gray-700">
// //                             {opt}
// //                         </div>
// //                     ))}
// //                 </div>
// //                 <div className="flex justify-end mt-3 text-xs text-gray-400">
// //                     <span className="font-medium text-pink-500"><img src='./pynglLogoImage.png' alt="Pyngl Logo" height={15} width={41}></img></span>
// //                 </div>
// //             </div>

// //             {/* 4. The button now handles both creating and re-opening the share sheet */}
// //             <button
// //                 onClick={handleCreateAndSharePoll}
// //                 disabled={isLoading}
// //                 className="mt-6 w-full py-3 rounded-full text-white font-medium bg-gradient-to-r from-cyan-400 to-pink-500 flex items-center justify-center disabled:opacity-70"
// //             >
// //                 {isLoading ? "Creating Poll..." : (createdPoll ? "Share Poll" : "Create & Share Poll")}
// //             </button>

// //             {/* 5. Conditionally render the ShareSheet */}
// //             {isShareSheetOpen && createdPoll && (
// //                 <ShareSheet poll={createdPoll} onClose={() => setIsShareSheetOpen(false)} />
// //             )}
// //         </div>
// //     );
// // }

// // import React, { useState, useEffect } from "react";
// // import { useLocation, useNavigate } from "react-router-dom";
// // import apiClient from "../api/axiosConfig"; 
// // import StyledQRCode from '../components/common/StyledQRCode';

// // export default function PreviewTextPoll() {
// //     const { state } = useLocation();
// //     const navigate = useNavigate();

// //     const [isLoading, setIsLoading] = useState(true); // Start in loading state
// //     const [createdPoll, setCreatedPoll] = useState(null);

// //     // This useEffect now runs only once when the component mounts
// //     useEffect(() => {
// //         const handleCreatePoll = async () => {
// //             // Guard against running without state from the previous page
// //             if (!state) {
// //                 navigate('/dashboard'); // Or to the create page
// //                 return;
// //             }

// //             setIsLoading(true);
// //             try {
// //                 const pollData = {
// //                     question: state.question,
// //                     options: state.options,
// //                     type: 'text',
// //                     duration: state.duration,
// //                 };
// //                 const response = await apiClient.post("/api/polls/create-poll", pollData);
// //                 setCreatedPoll(response.data); 
// //             } catch (error) {
// //                 alert(error.response?.data?.error || "Error saving poll.");
// //                 navigate(-1); // Go back if poll creation fails
// //             } finally {
// //                 setIsLoading(false);
// //             }
// //         };

// //         handleCreatePoll();
// //     }, []); // Empty dependency array ensures this runs only once

// //     const handleShareClick = () => {
// //         // Navigate to the full-screen share page with the poll data
// //         navigate('/share', { state: { poll: createdPoll } });
// //     };

// //     if (!state) {
// //         return <div className="p-6 text-center">Redirecting...</div>;
// //     }
    
// //     const { question, options } = state;
// //     const pollUrl = createdPoll ? `${window.location.origin}/poll/${createdPoll._id}` : "";

// //     return (
// //         <div className="p-4 font-sans space-y-6">
// //             {/* Poll Preview Card */}
// //             <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
// //                 <h2 className="font-bold text-xl mb-4">{question}</h2>
// //                 <div className="space-y-3">
// //                     {options.map((opt, i) => (
// //                         <div key={i} className="w-full border-2 border-gray-200 rounded-full px-4 py-3 text-center font-medium text-gray-700">
// //                             {opt}
// //                         </div>
// //                     ))}
// //                 </div>
// //                 <div className="flex justify-end mt-4">
// //                     <img src='./pynglLogoImage.png' alt="Pyngl Logo" className="h-5"/>
// //                 </div>
// //             </div>

// //             {/* Styled QR code component */}
// //             {isLoading ? (
// //                  <div className="text-center text-gray-500 p-10">Creating your poll...</div>
// //             ) : createdPoll && (
// //                 <StyledQRCode pollUrl={pollUrl} />
// //             )}

// //             {/* Main button navigates to the share page */}
// //             <button
// //                 onClick={handleShareClick}
// //                 disabled={!createdPoll}
// //                 className="w-full py-4 rounded-full text-white font-bold bg-gradient-to-r from-cyan-400 to-pink-500 flex items-center justify-center disabled:opacity-50"
// //             >
// //                 Share Poll
// //             </button>
// //         </div>
// //     );
// // }


// // import React, { useState, useEffect } from "react";
// // import { useLocation, useNavigate } from "react-router-dom";
// // import apiClient from "../api/axiosConfig"; 
// // import StyledQRCode from '../components/common/StyledQRCode';

// // export default function PreviewTextPoll() {
// //     const { state } = useLocation();
// //     const navigate = useNavigate();

// //     const [isLoading, setIsLoading] = useState(true); // Start in loading state
// //     const [createdPoll, setCreatedPoll] = useState(null);

// //     // This useEffect now runs only once when the component mounts to create the poll
// //     useEffect(() => {
// //         const createPollOnLoad = async () => {
// //             // Guard against navigating here directly without poll data
// //             if (!state) {
// //                 navigate('/dashboard'); // Redirect to a safe page
// //                 return;
// //             }

// //             setIsLoading(true);
// //             try {
// //                 const pollData = {
// //                     question: state.question,
// //                     options: state.options,
// //                     type: 'text',
// //                     duration: state.duration,
// //                 };
// //                 const response = await apiClient.post("/api/polls/create-poll", pollData);
// //                 setCreatedPoll(response.data); // Save the newly created poll to state
// //             } catch (error) {
// //                 alert(error.response?.data?.error || "Error saving poll.");
// //                 navigate(-1); // Go back to the create page if it fails
// //             } finally {
// //                 setIsLoading(false);
// //             }
// //         };

// //         createPollOnLoad();
// //     }, []); // The empty dependency array [] ensures this runs only ONCE

// //     const handleShareClick = () => {
// //         // This function now ONLY handles navigation. It does not create a poll.
// //         if (createdPoll) {
// //             navigate('/share', { state: { poll: createdPoll } });
// //         }
// //     };

// //     if (!state) {
// //         // This handles the initial redirect if state is missing
// //         return <div className="p-6 text-center">Redirecting...</div>;
// //     }
    
// //     const { question, options } = state;
// //     const pollUrl = createdPoll ? `${window.location.origin}/poll/${createdPoll._id}` : "";

// //     return (
// //         <div className="p-4 font-sans space-y-6">
// //             {/* Poll Preview Card */}
// //             <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
// //                 <h2 className="font-bold text-xl mb-4">{question}</h2>
// //                 <div className="space-y-3">
// //                     {options.map((opt, i) => (
// //                         <div key={i} className="w-full border-2 border-gray-200 rounded-full px-4 py-3 text-center font-medium text-gray-700">
// //                             {opt}
// //                         </div>
// //                     ))}
// //                 </div>
// //                 <div className="flex justify-end mt-4">
// //                     <img src='./pynglLogoImage.png' alt="Pyngl Logo" className="h-5"/>
// //                 </div>
// //             </div>

// //             {/* Styled QR code component */}
// //             {isLoading ? (
// //                  <div className="text-center text-gray-500 p-10">Creating your poll...</div>
// //             ) : createdPoll && (
// //                 <StyledQRCode pollUrl={pollUrl} />
// //             )}

// //             {/* Main button now navigates to the share page */}
// //             <button
// //                 onClick={handleShareClick}
// //                 disabled={!createdPoll}
// //                 className="w-full py-4 rounded-full text-white font-bold bg-gradient-to-r from-cyan-400 to-pink-500 flex items-center justify-center disabled:opacity-50"
// //             >
// //                 Share Poll
// //             </button>
// //         </div>
// //     );
// // }

// import React, { useState, useEffect, useRef } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import apiClient from "../api/axiosConfig"; 
// import StyledQRCode from '../components/common/StyledQRCode';

// export default function PreviewTextPoll() {
//     const { state } = useLocation();
//     const navigate = useNavigate();

//     const [isLoading, setIsLoading] = useState(true);
//     const [createdPoll, setCreatedPoll] = useState(null);
    
//     // 1. Add a ref to track if the poll has been created
//     const hasCreatedPoll = useRef(false);

//     // This useEffect now runs only once when the component mounts
//     useEffect(() => {
//         // 2. Check if the poll creation has already been initiated
//         if (hasCreatedPoll.current) {
//             return; // If yes, do nothing
//         }

//         const createPollOnLoad = async () => {
//             if (!state) {
//                 navigate('/dashboard');
//                 return;
//             }

//             // 3. Set the flag to true immediately to prevent re-runs
//             hasCreatedPoll.current = true;
//             setIsLoading(true);
            
//             try {
//                 const pollData = {
//                     question: state.question,
//                     options: state.options,
//                     type: 'text',
//                     duration: state.duration,
//                 };
//                 const response = await apiClient.post("/api/polls/create-poll", pollData);
//                 setCreatedPoll(response.data);
//             } catch (error) {
//                 alert(error.response?.data?.error || "Error saving poll.");
//                 navigate(-1);
//             } finally {
//                 setIsLoading(false);
//             }
//         };

//         createPollOnLoad();
        
//     }, [state, navigate]); // Dependencies are now stable

//     const handleShareClick = () => {
//         if (createdPoll) {
//             navigate('/share', { state: { poll: createdPoll } });
//         }
//     };

//     if (!state) {
//         return <div className="p-6 text-center">Redirecting...</div>;
//     }
    
//     const { question, options } = state;
//     const pollUrl = createdPoll ? `${window.location.origin}/poll/${createdPoll._id}` : "";

//     return (
//         <div className="p-4 font-sans space-y-6">
//             {/* Poll Preview Card */}
//             <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
//                 <h2 className="font-bold text-xl mb-4">{question}</h2>
//                 <div className="space-y-3">
//                     {options.map((opt, i) => (
//                         <div key={i} className="w-full border-2 border-gray-200 rounded-full px-4 py-3 text-center font-medium text-gray-700">
//                             {opt}
//                         </div>
//                     ))}
//                 </div>
//                 <div className="flex justify-end mt-4">
//                     <img src='./pynglLogoImage.png' alt="Pyngl Logo" className="h-5"/>
//                 </div>
//             </div>

//             {/* Styled QR code component */}
//             {isLoading ? (
//                  <div className="text-center text-gray-500 p-10">Creating your poll...</div>
//             ) : createdPoll && (
//                 <StyledQRCode pollUrl={pollUrl} />
//             )}

//             {/* Main button now navigates to the share page */}
//             <button
//                 onClick={handleShareClick}
//                 disabled={!createdPoll}
//                 className="w-full py-4 rounded-full text-white font-bold bg-gradient-to-r from-cyan-400 to-pink-500 flex items-center justify-center disabled:opacity-50"
//             >
//                 Share Poll
//             </button>
//         </div>
//     );
// }

// import React, { useState, useEffect, useRef } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import apiClient from "../api/axiosConfig"; 
// import StyledQRCode from '../components/common/StyledQRCode';
// import ShareSheet from "../components/common/ShareSheet"; // ADDED for share functionality

// export default function PreviewTextPoll() {
//     const { state } = useLocation();
//     const navigate = useNavigate();

//     // MERGED: State from both files
//     const [isLoading, setIsLoading] = useState(false);
//     const [createdPoll, setCreatedPoll] = useState(null);
//     const [isShareSheetOpen, setIsShareSheetOpen] = useState(false);
    
//     // This ref is no longer needed for poll creation, but can be kept for other purposes if you wish.
//     const pollCardRef = useRef(null); 

//     // This useEffect is no longer needed to create the poll, which is a better UX.
//     // It now just checks if the state is valid when the component loads.
//     useEffect(() => {
//         if (!state) {
//             navigate('/create-text-poll'); // Redirect back if there's no data
//         }
//     }, [state, navigate]);

//     // NEW LOGIC: This function now handles poll creation on button click.
//     const handleCreateAndShare = async () => {
//         // If poll is already created, just open the share sheet
//         if (createdPoll) {
//             setIsShareSheetOpen(true);
//             return;
//         }

//         setIsLoading(true);
//         try {
//             // UPDATED: Now includes all the new data fields
//             const pollData = {
//                 question: state.question,
//                 options: state.options,
//                 type: 'text',
//                 duration: state.duration,
//                 ageRange: state.ageRange,
//                 shareToTrending: state.shareToTrending,
//             };
//             const response = await apiClient.post("/api/polls/create-poll", pollData);
//             setCreatedPoll(response.data);
//             setIsShareSheetOpen(true); // Automatically open share sheet after creation
//         } catch (error) {
//             alert(error.response?.data?.error || "Error saving poll.");
//             navigate(-1); // Go back if creation fails
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     if (!state) {
//         return <div className="p-6 text-center">Redirecting...</div>;
//     }
    
//     const { question, options } = state;
//     // The pollUrl is now only generated after the poll is created
//     const pollUrl = createdPoll ? `${window.location.origin}/poll/${createdPoll._id}` : "";

//     return (
//         <div className="p-4 font-sans space-y-6">
//             {/* Poll Preview Card (Your existing UI) */}
//             <div ref={pollCardRef} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
//                 <h2 className="font-bold text-xl mb-4">{question}</h2>
//                 <div className="space-y-3">
//                     {options.map((opt, i) => (
//                         <div key={i} className="w-full border-2 border-gray-200 rounded-full px-4 py-3 text-center font-medium text-gray-700">
//                             {opt}
//                         </div>
//                     ))}
//                 </div>
//                 <div className="flex justify-end mt-4">
//                     <img src='./pynglLogoImage.png' alt="Pyngl Logo" className="h-5"/>
//                 </div>
//             </div>

//             {/* QR code now only appears AFTER the poll is successfully created */}
//             {isLoading && (
//                  <div className="text-center text-gray-500 p-10">Creating your poll...</div>
//             )}
//             {createdPoll && (
//                  <StyledQRCode pollUrl={pollUrl} />
//             )}

//             {/* Main button now uses the new creation logic */}
//             <button
//                 onClick={handleCreateAndShare}
//                 disabled={isLoading}
//                 className="w-full py-4 rounded-full text-white font-bold bg-gradient-to-r from-cyan-400 to-pink-500 flex items-center justify-center disabled:opacity-50"
//             >
//                 {isLoading ? 'Creating...' : (createdPoll ? 'Share Poll' : 'Create & Share Poll')}
//             </button>
            
//             {/* Share Sheet (conditionally rendered) */}
//             {isShareSheetOpen && createdPoll && (
//                 <ShareSheet
//                     poll={createdPoll}
//                     onClose={() => setIsShareSheetOpen(false)}
//                 />
//             )}
//         </div>
//     );
// }
import React, { useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import apiClient from "../api/axiosConfig";
import ShareSheet from "../components/common/ShareSheet";
import StyledQRCode from "../components/common/StyledQRCode";

export default function PreviewTextPoll() {
  const { state } = useLocation();

  const [isLoading, setIsLoading] = useState(false);
  const [createdPoll, setCreatedPoll] = useState(null);
  const [isShareSheetOpen, setIsShareSheetOpen] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState(null);

  const pollRef = useRef(null); // ✅ Ref for capturing the poll as image

  if (!state) {
    return (
      <div className="p-6 text-center">No poll data found. Please go back.</div>
    );
  }

  const handleCreatePoll = async () => {
    if (createdPoll) {
      setIsShareSheetOpen(true); // Share only when already created
      return;
    }

    setIsLoading(true);
    try {
      const pollData = {
        question: state.question,
        options: state.options,
        type: "text",
        duration: state.selectedDuration,
         ageRange: state.ageRange, 
        shareToTrending: state.shareToTrending, // ✅ save in DB
      };

      const response = await apiClient.post("/api/polls/create-poll", pollData);
      setCreatedPoll(response.data);
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.error || "Error saving poll. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="p-4 font-sans">
      {/* Poll Preview */}
      <div ref={pollRef} className="p-4 bg-white rounded-xl shadow-md">
        <div className="rounded-xl border border-gray-200 p-4">
          <h2 className="font-medium mb-4">{state.question}</h2>
          <div className="space-y-3">
            {state.options.map((opt, i) => (
              <div
                key={i}
                className="w-full border rounded-full px-4 py-2 text-center text-gray-700"
              >
                {opt}
              </div>
            ))}
          </div>
          <div className="flex justify-end mt-3 text-xs text-gray-400">
            <span className="font-medium text-pink-500">
              <img
                src="./pynglLogoImage.png"
                alt="Pyngl Logo"
                height={15}
                width={41}
              />
            </span>
          </div>
        </div>

        {createdPoll && (
          <div className="mt-6">
            <StyledQRCode
              pollUrl={`${window.location.origin}/poll/${createdPoll._id}`}
              setQrDataUrl={setQrDataUrl} // get QR as base64
            />
            {qrDataUrl && (
              <img
                src={qrDataUrl}
                alt="QR Code"
                className="hidden" // hidden but captured by html2canvas
              />
            )}
          </div>
        )}
      </div>

      {/* Action Buttons */}
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

      {/* Share Sheet */}
      {isShareSheetOpen && createdPoll && (
        <ShareSheet
          poll={createdPoll}
          onClose={() => setIsShareSheetOpen(false)}
        />
      )}
    </div>
  );
}