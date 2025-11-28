// import React, { useState, useEffect } from 'react';
// import { useParams, useLocation, Link } from 'react-router-dom';
// import useAuthStore from "../store/useAuthStore";
// import apiClient from '../api/axiosConfig';
// import io from 'socket.io-client';
// // Poll results componenet 
// const PollResults = ({ poll }) => {
//     const totalVotes = poll.options.reduce((sum, option) => sum + option.votes, 0);
//     const gradient = "linear-gradient(to right, #20DAE8, #37AEFC, #7C80EE, #BF58DC, #E244D3)";

//     return (
//         <div className="space-y-3">
//             {poll.options.map((option) => {
//                 const percentage = totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100) : 0;
//                 // Text color now adapts to dark mode
//                 const textColor = percentage > 20 ? "text-white" : "text-gray-700 dark:text-gray-200";

//                 return (
//                     <div key={option._id} className="w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden relative h-12 flex items-center">
//                         <div
//                             className="h-full rounded-full transition-all duration-700 ease-out"
//                             style={{ width: `${percentage}%`, background: gradient }}
//                         />
//                         <div className="absolute inset-0 px-4 flex justify-between items-center">
//                             <span className={`font-semibold ${textColor}`}>{option.text}</span>
//                             <span className={`font-bold ${textColor}`}>{percentage}%</span>
//                         </div>
//                     </div>
//                 );
//             })}
//         </div>
//     );
// };

// const getBrowser = () => {
//     const ua = navigator.userAgent;
//     if (ua.includes("Chrome") && !ua.includes("Edg")) return "Chrome";
//     if (ua.includes("Safari") && !ua.includes("Chrome")) return "Safari";
//     if (ua.includes("Firefox")) return "Firefox";
//     if (ua.includes("Edg")) return "Edge";
//     return "Other";
// };
// const getDeviceOS = () => {
//     const ua = navigator.userAgent;
//     if (/android/i.test(ua)) return "Android";
//     if (/iPhone|iPad|iPod/i.test(ua)) return "iOS";
//     if (/Win/i.test(ua)) return "Windows";
//     if (/Mac/i.test(ua)) return "Mac";
//     return "Other";
// };
// const VoteOnPollPage = () => {
//     const { pollId } = useParams();
//     // This line will now work correctly
//     const location = useLocation(); 
//     const [poll, setPoll] = useState(null);
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState("");
//     const [selectedOption, setSelectedOption] = useState(null);
//     const [hasVoted, setHasVoted] = useState(false);
//     const { userInfo } = useAuthStore();

//     const [startTime] = useState(Date.now());

//     const searchParams = new URLSearchParams(location.search);
//     const platform = searchParams.get("platform") || "Direct";
//     // This useEffect now handles both the initial data fetch and the real-time updates
//      useEffect(() => {
//         const fetchPoll = async () => {
//             try {
//                 setIsLoading(true);
//                 setError("");
//                 const response = await apiClient.get(`/api/polls/${pollId}`);
//                 const data = response.data;
//                 setPoll(data);
//                 if (userInfo?._id && data.votedBy?.includes(userInfo._id)) {
//                     setHasVoted(true);
//                 }
//             } catch (err) {
//                 setError(err.response?.data?.message || "Poll not found.");
//             } finally {
//                 setIsLoading(false);
//             }
//         };

//         fetchPoll();
//         // Kept your existing real-time socket logic
//          const socket = io(import.meta.env.VITE_API_BASE_URL);
//         socket.on(`poll_update`, (updatedPoll) => {
//             if (updatedPoll._id === pollId) {
//                 console.log("Received live poll update:", updatedPoll);
//                 setPoll(updatedPoll);
//             }
//         });

//       return () => {
//             socket.disconnect();
//         };
//     }, [pollId, userInfo?._id]);


//     // Merged handleVote to include analytics data
//     const handleVote = async () => {
//         if (!selectedOption) return;

//         const endTime = Date.now();
//         const timeSpentSec = Math.round((endTime - startTime) / 1000);

//         const payload = {
//             optionId: selectedOption,
//             platform,
//             browser: getBrowser(),
//             device: getDeviceOS(),
//             timeSpent: timeSpentSec,
//         };

//         try {
//             await apiClient.post(`/api/polls/${pollId}/vote`, payload);
//             setHasVoted(true);
//             // No need to refetch, the socket will provide the update
//         } catch (err) {
//             alert(err.response?.data?.error || "Failed to cast vote.");
//         }
//     };

//     if (isLoading) return <div className="p-6 text-center dark:text-gray-200">Loading poll...</div>;
//     if (error) return (
//         <div className="p-6 text-center text-red-500 dark:text-red-400">
//             <p>{error}</p>
//             <Link to="/dashboard" className="text-blue-500 dark:text-blue-400 hover:underline mt-4 inline-block">
//                 Back to Dashboard
//             </Link>
//         </div>
//     );
//     if (!poll) return <div className="p-6 text-center dark:text-gray-200">Poll could not be loaded.</div>;

//     return (
//         <div className="max-w-md mx-auto bg-white dark:bg-gray-900 min-h-screen p-4 font-sans">
//             <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-4">
//                 {poll.imageUrl && (
//                     <img src={poll.imageUrl} alt="Poll visual" className="rounded-xl mb-4 w-full h-48 object-cover" />
//                 )}
//                 <h2 className="font-bold text-lg mb-4 text-gray-900 dark:text-gray-100">
//                     {poll.question}
//                 </h2>
//                 {!hasVoted ? (
//                     <div className="space-y-2">
//                         {poll.options.map((option) => (
//                             <button
//                                 key={option._id}
//                                 onClick={() => setSelectedOption(option._id)}
//                                 className={`w-full border rounded-full px-4 py-4 text-center transition-colors ${
//                                     selectedOption === option._id
//                                         ? "bg-pink-600 text-white border-pink-600"
//                                         : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
//                                 }`}
//                             >
//                                 {option.text}
//                             </button>
//                         ))}
//                     </div>
//                 ) : (
//                     <PollResults poll={poll} />
//                 )}
//             </div>

//             {!hasVoted ? (
//                 <button
//                     onClick={handleVote}
//                     disabled={!selectedOption}
//                     className="mt-6 w-full py-3 rounded-full text-white font-medium bg-pink-600 disabled:opacity-50"
//                 >
//                     Cast Your Vote
//                 </button>
//             ) : (
//                 <Link to="/dashboard" className="mt-6 block w-full py-3 rounded-full text-center text-white font-medium bg-gray-700 dark:bg-gray-600">
//                     Back to Dashboard
//                 </Link>
//             )}
//         </div>
//     );
// };

// export default VoteOnPollPage;
// import React, { useState, useEffect, useCallback } from "react";
// import { useParams, useLocation, Link } from "react-router-dom";
// import useAuthStore from "../store/useAuthStore";
// import apiClient from "../api/axiosConfig";

// // Poll results component
// const PollResults = ({ poll }) => {
//   const totalVotes = poll.options.reduce(
//     (sum, option) => sum + option.votes,
//     0
//   );

//   const createGradient = () => {
//     const colors = [
//       "#20DAE8",
//       "#37AEFC",
//       "#7C80EE",
//       "#BF58DC",
//       "#B55EDF",
//       "#E244D3",
//     ];
//     const percentages = [0, 37, 58, 79, 88, 98];
//     const stops = colors.map(
//       (color, index) => `${color} ${percentages[index]}%`
//     );
//     return `linear-gradient(to right, ${stops.join(", ")})`;
//   };

//   return (
//     <div className="space-y-3">
//       {poll.options.map((option) => {
//         const percentage =
//           totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100) : 0;
//         const textColor =
//           percentage > 20 ? "text-white" : "text-gray-700 dark:text-gray-200";

//         return (
//           <div
//             key={option._id}
//             className="w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden relative h-12 flex items-center"
//           >
//             <div
//               className="h-full rounded-full transition-all duration-700 ease-out"
//               style={{ width: `${percentage}%`, background: createGradient() }}
//             />
//             <div className="absolute inset-0 px-4 flex justify-between items-center">
//               <span className={`font-semibold ${textColor}`}>
//                 {option.text}
//               </span>
//               <span className={`font-bold ${textColor}`}>{percentage}%</span>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// // Browser detection utility
// const getBrowser = () => {
//   const ua = navigator.userAgent;
//   if (ua.includes("Chrome") && !ua.includes("Edg")) return "Chrome";
//   if (ua.includes("Safari") && !ua.includes("Chrome")) return "Safari";
//   if (ua.includes("Firefox")) return "Firefox";
//   if (ua.includes("Edg")) return "Edge";
//   return "Other";
// };

// const getDeviceOS = () => {
//   const ua = navigator.userAgent;
//   if (/android/i.test(ua)) return "Android";
//   if (/iPhone|iPad|iPod/i.test(ua)) return "iOS";
//   if (/Win/i.test(ua)) return "Windows";
//   if (/Mac/i.test(ua)) return "Mac";
//   return "Other";
// };

// // Main voting page
// const VoteOnPollPage = () => {
//   const { pollId } = useParams();
//   const location = useLocation();
//   const [poll, setPoll] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [hasVoted, setHasVoted] = useState(false);
//   const { userInfo } = useAuthStore();

//   const [startTime] = useState(Date.now());

//   const searchParams = new URLSearchParams(location.search);
//   const platform = searchParams.get("platform") || "Direct";

//   const fetchPoll = useCallback(async () => {
//     try {
//       setIsLoading(true);
//       setError("");
//       const response = await apiClient.get(`/api/polls/${pollId}`);
//       const data = response.data;
//       setPoll(data);

//       if (userInfo?._id && data.votedBy.includes(userInfo._id)) {
//         setHasVoted(true);
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || "Poll not found.");
//     } finally {
//       setIsLoading(false);
//     }
//   }, [pollId, userInfo?._id]);

//   useEffect(() => {
//     fetchPoll();
//   }, [fetchPoll]);

//   const handleVote = async () => {
//     if (!selectedOption) return;

//     const endTime = Date.now();
//     const timeSpentSec = Math.round((endTime - startTime) / 1000);

//     const payload = {
//       optionId: selectedOption,
//       platform,
//       browser: getBrowser(),
//       device: getDeviceOS(),
//       timeSpent: timeSpentSec,
//     };

//     try {
//       await apiClient.post(`/api/polls/${pollId}/vote`, payload);
//       setHasVoted(true);
//       await fetchPoll();
//     } catch (err) {
//       alert(err.response?.data?.msg || "Failed to cast vote.");
//     }
//   };

//   if (isLoading)
//     return (
//       <div className="p-6 text-center dark:text-gray-200">Loading poll...</div>
//     );

//   if (error)
//     return (
//       <div className="p-6 text-center text-red-500 dark:text-red-400">
//         <p>{error}</p>
//         <Link
//           to="/dashboard"
//           className="text-blue-500 dark:text-blue-400 hover:underline mt-4 inline-block"
//         >
//           Back to Dashboard
//         </Link>
//       </div>
//     );

//   if (!poll)
//     return (
//       <div className="p-6 text-center dark:text-gray-200">
//         Poll could not be loaded.
//       </div>
//     );

//   return (
//     <div className="mx-auto bg-white dark:bg-gray-800 min-h-screen p-4 font-sans md:w-7/6 lg:w-4/5 xl:w-full 2xl:w-full transition-all duration-300">
//       <div className="rounded-xl border mx-auto border-gray-200 dark:border-gray-700 p-4 md:w-4/6 lg:w-4/5 xl:w-3/4 2xl:w-2/3 transition-all duration-300">
//         {poll.imageUrl && (
//           <img
//             src={poll.imageUrl}
//             alt="Poll visual"
//             className="rounded-xl mb-4 w-full h-48 object-cover"
//           />
//         )}

//         <h2 className="font-bold text-lg mb-4 text-gray-900 dark:text-gray-100">
//           {poll.question}
//         </h2>

//         {!hasVoted ? (
//           <div className="space-y-2">
//             {poll.options.map((option) => (
//               <button
//                 key={option._id}
//                 onClick={() => setSelectedOption(option._id)}
//                 className={`w-full border rounded-full px-4 py-4 text-center transition-colors ${
//                   selectedOption === option._id
//                     ? "bg-pink-600 text-white border-pink-600"
//                     : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
//                 }`}
//               >
//                 {option.text}
//               </button>
//             ))}
//           </div>
//         ) : (
//           <PollResults poll={poll} />
//         )}
//       </div>

//       <div className="mx-auto md:w-4/6 lg:w-4/5 xl:w-3/4 2xl:w-2/3 transition-all duration-300">
//         {!hasVoted ? (
//           <button
//             onClick={handleVote}
//             disabled={!selectedOption}
//             className="mt-6 w-full py-3 rounded-full text-white font-medium bg-pink-600 disabled:opacity-50"
//           >
//             Cast Your Vote
//           </button>
//         ) : (
//           <Link
//             to="/dashboard"
//             className="mt-6 block w-full py-3 rounded-full text-center text-white font-medium bg-gray-700 dark:bg-gray-600"
//           >
//             Back to Dashboard
//           </Link>
//         )}
//       </div>
//     </div>
//   );
// };

// export default VoteOnPollPage;

import React, { useState, useEffect, useCallback } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import apiClient from "../api/axiosConfig";
import { FaApple } from "react-icons/fa";
import { toast } from "react-hot-toast";

const PollResults = ({ poll }) => {
  const totalVotes = poll.options.reduce(
    (sum, option) => sum + option.votes,
    0
  );

  const createGradient = () => {
    const colors = ["#20DAE8", "#37AEFC", "#7C80EE", "#BF58DC", "#B55EDF", "#E244D3"];
    const percentages = [0, 37, 58, 79, 88, 98];
    const stops = colors.map((color, i) => `${color} ${percentages[i]}%`);
    return `linear-gradient(to right, ${stops.join(", ")})`;
  };

  return (
    <div className="space-y-3">
      {poll.options.map((option) => {
        const percentage = totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100) : 0;
        const textColor = percentage > 20 ? "text-white" : "text-gray-700 dark:text-gray-200";

        return (
          <div
            key={option._id}
            className="w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden relative h-12 flex items-center"
          >
            <div
              className="h-full rounded-full transition-all duration-700 ease-out"
              style={{ width: `${percentage}%`, background: createGradient() }}
            />
            <div className="absolute inset-0 px-4 flex justify-between items-center">
              <span className={`font-semibold ${textColor}`}>{option.text}</span>
              <span className={`font-bold ${textColor}`}>{percentage}%</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// 📌 Detect Apple Device
const isAppleDevice = () => {
  return /iPhone|iPad|iPod|Macintosh|Mac OS X/i.test(navigator.userAgent);
};

// 📌 Apple Business Chat Deep Link
const APPLE_BUSINESS_ID = "urn:biz:539765e3-16f4-4441-95f5-9b984f5617e5";

const getIMessageLink = (pollId) => {
  const trigger = `Start Poll #${pollId}`;
  return `https://bcrw.apple.com/${APPLE_BUSINESS_ID}?body=${encodeURIComponent(trigger)}`;
};

const getBrowser = () => {
  const ua = navigator.userAgent;
  if (ua.includes("Chrome") && !ua.includes("Edg")) return "Chrome";
  if (ua.includes("Safari") && !ua.includes("Chrome")) return "Safari";
  if (ua.includes("Firefox")) return "Firefox";
  if (ua.includes("Edg")) return "Edge";
  return "Other";
};

const getDeviceOS = () => {
  const ua = navigator.userAgent;
  if (/android/i.test(ua)) return "Android";
  if (/iPhone|iPad|iPod/i.test(ua)) return "iOS";
  if (/Win/i.test(ua)) return "Windows";
  if (/Mac/i.test(ua)) return "Mac";
  return "Other";
};

const VoteOnPollPage = () => {
  const { pollId } = useParams();
  const location = useLocation();
  const [poll, setPoll] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { userInfo } = useAuthStore();

  const platform = new URLSearchParams(location.search).get("platform") || "Direct";

  const [startTime] = useState(Date.now());

  const fetchPoll = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await apiClient.get(`/api/polls/${pollId}`);
      setPoll(res.data);

      if (userInfo?._id && res.data.votedBy.includes(userInfo._id)) {
        setHasVoted(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [pollId, userInfo?._id]);

  useEffect(() => {
    fetchPoll();
  }, [fetchPoll]);

  // 🚀 Apple Vote Handler
  const handleAppleVote = () => {
    const link = getIMessageLink(poll._id);

    if (isAppleDevice()) {
      window.location.href = link; // Opens Business Chat with prefilled text
      return;
    }

    navigator.clipboard.writeText(link);
    toast.success("Apple Messages link copied!");
  };

  const handleVote = async () => {
    if (!selectedOption) return;

    const timeSpentSec = Math.round((Date.now() - startTime) / 1000);

    const payload = {
      optionId: selectedOption,
      platform,
      browser: getBrowser(),
      device: getDeviceOS(),
      timeSpent: timeSpentSec,
    };

    try {
      await apiClient.post(`/api/polls/${pollId}/vote`, payload);
      setHasVoted(true);
      await fetchPoll();
    } catch (err) {
      toast.error("Failed to cast vote.");
    }
  };

  if (isLoading)
    return <div className="p-6 text-center dark:text-gray-200">Loading poll...</div>;

  if (!poll)
    return <div className="p-6 text-center dark:text-gray-200">Poll not found.</div>;

  return (
      <div className="bg-white dark:bg-gray-800 min-h-screen p-2">

      {/* HEADER */}
     <header className="w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 py-4 px-4 flex items-center relative fixed top-0 left-0 z-40">
        
        {/* 1. Logo on the Left */}
        <div className="absolute left-4 flex items-center">
          <img
            src="/PynglLogo-192.png"
            alt="Pyngl"
            className="w-10 h-10 rounded-md"
          />
        </div>

        {/* 2. Title Centered Absolutely */}
        <div className="w-full flex justify-center">
          <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Vote Page
          </span>
        </div>

      </header>

      <div className="p-4 mt-4 mx-auto border rounded-xl border-gray-200 dark:border-gray-700 md:w-4/6 lg:w-4/5 xl:w-3/4">

        {poll.imageUrl && (
          <img
            src={poll.imageUrl}
            alt="Poll visual"
            className="rounded-xl mb-4 w-full h-48 object-cover"
          />
        )}

        <h2 className="font-bold text-lg mb-4 text-gray-900 dark:text-gray-100">
          {poll.question}
        </h2>

        {/* APPLE FLOATING BUTTON */}
        {isAppleDevice() && !hasVoted && (
          <button
            onClick={handleAppleVote}
            className="fixed bottom-6 right-6 flex items-center gap-2 bg-black text-white px-5 py-3 rounded-full shadow-xl hover:bg-gray-900 transition-all z-50"
          >
            <FaApple size={18} /> Vote in iMessage
          </button>
        )}

        {!hasVoted ? (
          <div className="space-y-2 mt-2">
            {poll.options.map((option) => (
              <button
                key={option._id}
                onClick={() => setSelectedOption(option._id)}
                className={`w-full border rounded-full px-4 py-4 ${
                  selectedOption === option._id
                    ? "bg-pink-600 text-white border-pink-600"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600"
                }`}
              >
                {option.text}
              </button>
            ))}
          </div>
        ) : (
          <PollResults poll={poll} />
        )}

          <div className="mt-6">
            {!hasVoted ? (
              <button
                onClick={handleVote}
                disabled={!selectedOption}
                className="w-full py-3 rounded-full text-white font-medium bg-[#FF6B55] disabled:opacity-50"
              >
                Cast Your Vote
              </button>
            ) : (
              <Link
                to="/dashboard"
                className="block w-full py-3 rounded-full text-center text-white bg-gray-700 dark:bg-gray-600"
              >
                Back to Dashboard
              </Link>
            )}
          </div>
      </div>
    </div>
  );
};


export default VoteOnPollPage;
