// import React, { useState, useEffect, useCallback } from "react";
// import { useParams, Link } from "react-router-dom";
// import useAuthStore from "../store/useAuthStore";
// import apiClient from "../api/axiosConfig";

// // Poll results component
// const PollResults = ({ poll }) => {
//   const totalVotes = poll.options.reduce((sum, option) => sum + option.votes, 0);

//   const createGradient = () => {
//     const colors = ["#20DAE8", "#37AEFC", "#7C80EE", "#BF58DC", "#B55EDF", "#E244D3"];
//     const percentages = [0, 37, 58, 79, 88, 98];
//     const stops = colors.map((color, index) => `${color} ${percentages[index]}%`);
//     return `linear-gradient(to right, ${stops.join(", ")})`;
//   };

//   return (
//     <div className="space-y-3">
//       {poll.options.map((option) => {
//         const percentage =
//           totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100) : 0;
//         const textColor = percentage > 20 ? "text-white" : "text-gray-700";

//         return (
//           <div
//             key={option._id}
//             className="w-full bg-gray-100 rounded-full overflow-hidden relative h-12 flex items-center"
//           >
//             <div
//               className="h-full rounded-full transition-all duration-700 ease-out"
//               style={{ width: `${percentage}%`, background: createGradient() }}
//             />
//             <div className="absolute inset-0 px-4 flex justify-between items-center">
//               <span className={`font-semibold ${textColor}`}>{option.text}</span>
//               <span className={`font-bold ${textColor}`}>{percentage}%</span>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// // Main voting page
// const VoteOnPollPage = () => {
//   const { pollId } = useParams();
//   const [poll, setPoll] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [hasVoted, setHasVoted] = useState(false);
//   const { userInfo } = useAuthStore();

//   // Fetch poll (memoized so we can reuse it)
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

//   // Handle vote submission
//   const handleVote = async () => {
//     if (!selectedOption) return;
//     try {
//       await apiClient.post(`/api/polls/${pollId}/vote`, { optionId: selectedOption });
//       setHasVoted(true);
//       await fetchPoll(); // ✅ Refresh poll results immediately
//     } catch (err) {
//       alert(err.response?.data?.error || "Failed to cast vote.");
//     }
//   };

//   if (isLoading) return <div className="p-6 text-center">Loading poll...</div>;

//   if (error)
//     return (
//       <div className="p-6 text-center text-red-500">
//         <p>{error}</p>
//         <Link
//           to="/dashboard"
//           className="text-blue-500 hover:underline mt-4 inline-block"
//         >
//           Back to Dashboard
//         </Link>
//       </div>
//     );

//   if (!poll) {
//     return <div className="p-6 text-center">Poll could not be loaded.</div>;
//   }

//   return (
//     <div className="max-w-md mx-auto bg-white min-h-screen p-4 font-sans">
//       <div className="rounded-xl border border-gray-200 p-4">
//         {poll.imageUrl && (
//           <img
//             src={poll.imageUrl}
//             alt="Poll visual"
//             className="rounded-xl mb-4 w-full h-48 object-cover"
//           />
//         )}

//         <h2 className="font-bold text-lg mb-4">{poll.question}</h2>

//         {!hasVoted ? (
//           <div className="space-y-2">
//             {poll.options.map((option) => (
//               <button
//                 key={option._id}
//                 onClick={() => setSelectedOption(option._id)}
//                 className={`w-full border rounded-full px-4 py-4 text-center transition-colors ${
//                   selectedOption === option._id
//                     ? "bg-pink-600 text-white border-pink-600"
//                     : "bg-white text-gray-700 hover:bg-gray-100"
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

//       {!hasVoted ? (
//         <button
//           onClick={handleVote}
//           disabled={!selectedOption}
//           className="mt-6 w-full py-3 rounded-full text-white font-medium bg-pink-600 disabled:opacity-50"
//         >
//           Cast Your Vote
//         </button>
//       ) : (
//         <Link
//           to="/dashboard"
//           className="mt-6 block w-full py-3 rounded-full text-center text-white font-medium bg-gray-700"
//         >
//           Back to Dashboard
//         </Link>
//       )}
//     </div>
//   );
// };

// export default VoteOnPollPage;
import React, { useState, useEffect, useCallback } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import apiClient from "../api/axiosConfig";

// Poll results component
const PollResults = ({ poll }) => {
  const totalVotes = poll.options.reduce(
    (sum, option) => sum + option.votes,
    0
  );

  const createGradient = () => {
    const colors = [
      "#20DAE8",
      "#37AEFC",
      "#7C80EE",
      "#BF58DC",
      "#B55EDF",
      "#E244D3",
    ];
    const percentages = [0, 37, 58, 79, 88, 98];
    const stops = colors.map(
      (color, index) => `${color} ${percentages[index]}%`
    );
    return `linear-gradient(to right, ${stops.join(", ")})`;
  };

  return (
    <div className="space-y-3">
      {poll.options.map((option) => {
        const percentage =
          totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100) : 0;
        const textColor =
          percentage > 20 ? "text-white" : "text-gray-700 dark:text-gray-200";

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
              <span className={`font-semibold ${textColor}`}>
                {option.text}
              </span>
              <span className={`font-bold ${textColor}`}>{percentage}%</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// Browser detection utility
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

// Main voting page
const VoteOnPollPage = () => {
  const { pollId } = useParams();
  const location = useLocation();
  const [poll, setPoll] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  const { userInfo } = useAuthStore();

  const [startTime] = useState(Date.now());

  const searchParams = new URLSearchParams(location.search);
  const platform = searchParams.get("platform") || "Direct";

  const fetchPoll = useCallback(async () => {
    try {
      setIsLoading(true);
      setError("");
      const response = await apiClient.get(`/api/polls/${pollId}`);
      const data = response.data;
      setPoll(data);

      if (userInfo?._id && data.votedBy.includes(userInfo._id)) {
        setHasVoted(true);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Poll not found.");
    } finally {
      setIsLoading(false);
    }
  }, [pollId, userInfo?._id]);

  useEffect(() => {
    fetchPoll();
  }, [fetchPoll]);

  const handleVote = async () => {
    if (!selectedOption) return;

    const endTime = Date.now();
    const timeSpentSec = Math.round((endTime - startTime) / 1000);

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
      alert(err.response?.data?.msg || "Failed to cast vote.");
    }
  };

  if (isLoading)
    return (
      <div className="p-6 text-center dark:text-gray-200">Loading poll...</div>
    );

  if (error)
    return (
      <div className="p-6 text-center text-red-500 dark:text-red-400">
        <p>{error}</p>
        <Link
          to="/dashboard"
          className="text-blue-500 dark:text-blue-400 hover:underline mt-4 inline-block"
        >
          Back to Dashboard
        </Link>
      </div>
    );

  if (!poll)
    return (
      <div className="p-6 text-center dark:text-gray-200">
        Poll could not be loaded.
      </div>
    );

  return (
    <div className="mx-auto bg-white dark:bg-gray-900 min-h-screen p-4 font-sans md:w-7/6 lg:w-4/5 xl:w-3/4 2xl:w-2/3 transition-all duration-300">
      <div className="rounded-xl border mx-auto border-gray-200 dark:border-gray-700 p-4 md:w-4/6 lg:w-4/5 xl:w-3/4 2xl:w-2/3 transition-all duration-300">
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

        {!hasVoted ? (
          <div className="space-y-2">
            {poll.options.map((option) => (
              <button
                key={option._id}
                onClick={() => setSelectedOption(option._id)}
                className={`w-full border rounded-full px-4 py-4 text-center transition-colors ${
                  selectedOption === option._id
                    ? "bg-pink-600 text-white border-pink-600"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                {option.text}
              </button>
            ))}
          </div>
        ) : (
          <PollResults poll={poll} />
        )}
      </div>

      <div className="mx-auto md:w-4/6 lg:w-4/5 xl:w-3/4 2xl:w-2/3 transition-all duration-300">
        {!hasVoted ? (
          <button
            onClick={handleVote}
            disabled={!selectedOption}
            className="mt-6 w-full py-3 rounded-full text-white font-medium bg-pink-600 disabled:opacity-50"
          >
            Cast Your Vote
          </button>
        ) : (
          <Link
            to="/dashboard"
            className="mt-6 block w-full py-3 rounded-full text-center text-white font-medium bg-gray-700 dark:bg-gray-600"
          >
            Back to Dashboard
          </Link>
        )}
      </div>
    </div>
  );
};

export default VoteOnPollPage;
