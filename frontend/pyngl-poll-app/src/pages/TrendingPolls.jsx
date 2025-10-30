// // // import React, { useState, useEffect } from "react";
// // // import { useNavigate } from "react-router-dom";
// // // import { ArrowLeft, Bell } from "lucide-react";
// // // import { categorizePolls } from "../utils/trendingAlgorithm";
// // // import apiClient from "../api/axiosConfig"; // Using apiClient for consistency
// // // import { AiFillInstagram, AiFillYoutube } from "react-icons/ai";
// // // import { FaWhatsapp, FaFacebookF, FaLinkedinIn, FaTelegramPlane, FaTwitter } from "react-icons/fa";
// // // import { SiGmail } from "react-icons/si";
// // // // Helper function to calculate days left
// // // const calculateDaysLeft = (expiresAt) => {
// // //   if (!expiresAt) return "";
// // //   const now = new Date();
// // //   const expiry = new Date(expiresAt);
// // //   const diff = expiry.getTime() - now.getTime();
// // //   if (diff <= 0) return "Poll ended";
// // //   const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
// // //   return `${days} Day${days > 1 ? "s" : ""} Left`;
// // // };

// // // const PollResultsView = ({ results }) => {
// // //   const [animatedPercentages, setAnimatedPercentages] = useState({});

// // //   useEffect(() => {
// // //     const totalVotes = results.options.reduce((sum, opt) => sum + opt.votes, 0);
// // //     if (totalVotes > 0) {
// // //       const finalPercentages = {};
// // //       results.options.forEach((option) => {
// // //         finalPercentages[option._id] = Math.round(
// // //           (option.votes / totalVotes) * 100
// // //         );
// // //       });

// // //       const timer = setTimeout(() => {
// // //         setAnimatedPercentages(finalPercentages);
// // //       }, 100);

// // //       return () => clearTimeout(timer);
// // //     }
// // //   }, [results]);

// // //   const gradient =
// // //     "linear-gradient(to right, #20DAE8 0%, #37AEFC 37%, #7C80EE 58%, #BF58DC 79%, #B55EDF 88%, #E244D3 98%)";

// // //   return (
// // //     <div className="space-y-3">
// // //       {results.options.map((option) => {
// // //         const percentage = animatedPercentages[option._id] || 0;
// // //         return (
// // //           <div
// // //             key={option._id}
// // //             className="w-full bg-gray-100 rounded-xl overflow-hidden relative h-12 flex items-center"
// // //           >
// // //             <div
// // //               className="h-full rounded-xl transition-width duration-1000 ease-out"
// // //               style={{
// // //                 width: `${percentage}%`,
// // //                 background: gradient,
// // //               }}
// // //             />
// // //             <div className="absolute inset-0 px-4 flex justify-between items-center">
// // //               <span className="font-semibold text-white mix-blend-lighten">
// // //                 {option.text}
// // //               </span>
// // //               <span className="font-bold text-white mix-blend-lighten">
// // //                 {percentage}%
// // //               </span>
// // //             </div>
// // //           </div>
// // //         );
// // //       })}
// // //     </div>
// // //   );
// // // };
// // // const InlineLoader = ({ text }) => (
// // //     <div className="flex flex-col items-center justify-center gap-6 py-20">
// // //         <div className="relative w-20 h-20">
// // //             <div
// // //                 className="absolute inset-0 rounded-full animate-spin"
// // //                 style={{ backgroundImage: "conic-gradient(from 0deg, #20D9E8, #4C9CFA, #E741D2, #7B4CFF, #20D9E8)" }}
// // //             />
// // //             <div className="absolute inset-1.5 bg-white dark:bg-gray-900 rounded-full" />
// // //         </div>
// // //         <p className="text-gray-500 dark:text-gray-400 text-lg animate-pulse">{text}</p>
// // //     </div>
// // // );
// // // export default function TrendingPolls() {
// // //     const navigate = useNavigate();
// // //     const [isLoading, setIsLoading] = useState(true);
// // //     const [allPolls, setAllPolls] = useState([]);
// // //     const [selectedTab, setSelectedTab] = useState("All");
// // //     const [tabs, setTabs] = useState(["All"]);
// // //     const [searchQuery, setSearchQuery] = useState("");
// // //     const [selectedPoll, setSelectedPoll] = useState(null);
// // //     const [selectedOptionId, setSelectedOptionId] = useState(null);
// // //     const [pollResults, setPollResults] = useState(null);
// // //     const [isSubmittingVote, setIsSubmittingVote] = useState(false);

// // //   const platformIcons = {
// // //     instagram: <AiFillInstagram className="w-4 h-4 text-pink-500" />,
// // //     youtube: <AiFillYoutube className="w-4 h-4 text-red-500" />,
// // //     whatsapp: <FaWhatsapp className="w-4 h-4 text-green-500" />,
// // //     facebook: <FaFacebookF className="w-4 h-4 text-blue-600" />,
// // //     linkedin: <FaLinkedinIn className="w-4 h-4 text-blue-700" />,
// // //     telegram: <FaTelegramPlane className="w-4 h-4 text-sky-500" />,
// // //     twitter: <FaTwitter className="w-4 h-4 text-blue-400" />,
// // //     gmail: <SiGmail className="w-4 h-4 text-rose-500" />,
// // //   };

// // //   // --- Fetch Polls ---
// // //   // useEffect(() => {
// // //   //   async function fetchPolls() {
// // //   //     setIsLoading(true);
// // //   //     try {
// // //   //       const res = await fetch("/api/polls/trending");
// // //   //       if (!res.ok) throw new Error("Network response was not ok");
// // //   //       const dbPolls = await res.json();

// // //   //       const votedPolls = JSON.parse(
// // //   //         localStorage.getItem("votedPolls") || "[]"
// // //   //       );

// // //   //       const mappedPolls = dbPolls
// // //   //         .map((poll) => ({
// // //   //           id: poll._id,
// // //   //           question: poll.question,
// // //   //           options: poll.options,
// // //   //           totalVotes: poll.options.reduce((sum, opt) => sum + opt.votes, 0),
// // //   //           expiresAt: poll.expiresAt,
// // //   //           imageUrl: poll.imageUrl || null,
// // //   //           category: null,
// // //   //            sharedPlatforms: (poll.sharedPlatforms || []).map((p) =>
// // //   //           p.toLowerCase()
// // //   //         ),
// // //   //         }))
// // //   //         .filter((poll) => !votedPolls.includes(poll.id)); // filter out already voted

// // //   //       const categorized = categorizePolls(mappedPolls);

// // //   //       setAllPolls(mappedPolls);
// // //   //       setVisiblePolls(mappedPolls);

// // //   //       const categorySet = new Set(
// // //   //         categorized.map((p) => p.category).filter(Boolean)
// // //   //       );
// // //   //       setTabs(["All", ...Array.from(categorySet)]);
// // //   //     } catch (err) {
// // //   //       console.error("Failed to fetch polls:", err);
// // //   //     } finally {
// // //   //       setIsLoading(false);
// // //   //     }
// // //   //   }
// // //   //   fetchPolls();
// // //   // }, []);
// // //     useEffect(() => {
// // //         async function fetchPolls() {
// // //             setIsLoading(true);
// // //             try {
// // //                 const res = await apiClient.get("/api/polls/trending"); // Using apiClient
// // //                 const dbPolls = res.data;
// // //                 const votedPolls = JSON.parse(localStorage.getItem("votedPolls") || "[]");

// // //               const mappedPolls = dbPolls
// // //                     .map((poll) => ({
// // //                         id: poll._id,
// // //                         question: poll.question,
// // //                         // --- THIS IS THE FIX ---
// // //                         // Ensure poll.options is always an array to prevent crashes
// // //                         options: poll.options || [],
// // //                         totalVotes: (poll.options || []).reduce((sum, opt) => sum + opt.votes, 0),
// // //                         expiresAt: poll.expiresAt,
// // //                         imageUrl: poll.imageUrl || null,
// // //                         sharedPlatforms: (poll.sharedPlatforms || []).map((p) => p.toLowerCase()),
// // //                     }))
// // //                     .filter((poll) => !votedPolls.includes(poll.id));
// // //                 const categorized = categorizePolls(mappedPolls);
// // //                 setAllPolls(categorized);

// // //                 const categorySet = new Set(categorized.map((p) => p.category).filter(Boolean));
// // //                 setTabs(["All", ...Array.from(categorySet)]);
// // //             } catch (err) {
// // //                 console.error("Failed to fetch polls:", err);
// // //             } finally {
// // //                 setIsLoading(false);
// // //             }
// // //         }
// // //         fetchPolls();
// // //     }, []);

// // //     // Filtering and Search logic
// // //     const filteredPolls = selectedTab === "All" ? allPolls : allPolls.filter((p) => p.category === selectedTab);
// // //    const searchedPolls = filteredPolls.filter(p =>
// // //         (p.question || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
// // //         (p.options || []).some(opt => (opt.text || '').toLowerCase().includes(searchQuery.toLowerCase()))
// // //     );
// // //     const handlePollClick = (poll) => setSelectedPoll(poll);

// // //   const closeModal = () => {
// // //     setSelectedPoll(null);
// // //     setSelectedOptionId(null);
// // //     setPollResults(null);
// // //     setIsSubmittingVote(false);
// // //   };
// // //   const SearchIcon = () => (
// // //     <svg
// // //       width="22"
// // //       height="22"
// // //       viewBox="0 0 24 24"
// // //       fill="none"
// // //       xmlns="http://www.w3.org/2000/svg"
// // //     >
// // //       <defs>
// // //         {/* Defines the gradient using the loader's colors */}
// // //         <linearGradient
// // //           id="search-gradient"
// // //           x1="0%"
// // //           y1="0%"
// // //           x2="100%"
// // //           y2="100%"
// // //         >
// // //           <stop offset="0%" stopColor="#20D9E8" />
// // //           <stop offset="35%" stopColor="#4C9CFA" />
// // //           <stop offset="60%" stopColor="#E741D2" />
// // //           <stop offset="100%" stopColor="#7B4CFF" />
// // //         </linearGradient>
// // //       </defs>
// // //       {/* Applies the gradient to the icon's stroke */}
// // //       <circle
// // //         cx="11"
// // //         cy="11"
// // //         r="8"
// // //         stroke="url(#search-gradient)"
// // //         strokeWidth="3"
// // //       />
// // //       <line
// // //         x1="16.65"
// // //         y1="16.65"
// // //         x2="21"
// // //         y2="21"
// // //         stroke="url(#search-gradient)"
// // //         strokeWidth="3"
// // //         strokeLinecap="round"
// // //       />
// // //     </svg>
// // //   );
// // // const handleVote = async () => {
// // //         if (!selectedOptionId || !selectedPoll) return;
// // //         const votedPolls = JSON.parse(localStorage.getItem("votedPolls") || "[]");
// // //         if (votedPolls.includes(selectedPoll.id)) return;

// // //         setIsSubmittingVote(true);
// // //         try {
// // //             const res = await apiClient.post(`/api/polls/${selectedPoll.id}/vote`, { optionId: selectedOptionId });
// // //             const updatedPoll = res.data;

// // //             setPollResults(updatedPoll);
// // //             localStorage.setItem("votedPolls", JSON.stringify([...votedPolls, selectedPoll.id]));
// // //             setAllPolls((prev) => prev.filter((p) => p.id !== selectedPoll.id));

// // //             setTimeout(() => closeModal(), 2500);
// // //         } catch (err) {
// // //             console.error("Error voting:", err);
// // //             alert(err.response?.data?.error || "Vote failed");
// // //             setIsSubmittingVote(false);
// // //         }
// // //     };

// // //   // --- Render ---

// // //     return (
// // //             <div className="mx-auto bg-white dark:bg-gray-900 min-h-screen max-w-md text-gray-900 dark:text-gray-200">
// // //             {/* Header */}
// // //               <div className="sticky top-0 z-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-700">
// // //                 <div className="flex items-center justify-between p-4">
// // //                     <button onClick={() => navigate(-1)}>
// // //                         <ArrowLeft className="w-6 h-6 text-gray-700 dark:text-gray-200" />
// // //                     </button>
// // //                     <h1 className="text-lg font-semibold">Trending</h1>
// // //                     <button onClick={() => navigate('/notifications')}>
// // //                         <Bell className="w-6 h-6 text-gray-700 dark:text-gray-200" />
// // //                     </button>
// // //                 </div>
// // //                 {/* Search */}
// // //                 <div className="px-4 pb-2">
// // //                     <input
// // //                         type="text"
// // //                         placeholder="Search trending polls"
// // //                         value={searchQuery}
// // //                         onChange={(e) => setSearchQuery(e.target.value)}
// // //                         className="w-full pl-4 pr-10 py-2.5 bg-white dark:bg-gray-900 rounded-full border border-gray-200 dark:border-gray-700 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-gray-200"
// // //                     />
// // //                 </div>
// // //                 {/* Tabs */}
// // //                 <div className="px-4 pb-4">
// // //                     <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
// // //                         {tabs.map((tab) => (
// // //                             <button
// // //                                 key={tab}
// // //                                 onClick={() => setSelectedTab(tab)}
// // //                                 className={`px-8 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
// // //                                     selectedTab === tab
// // //                                         ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
// // //                                         : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
// // //                                 }`}
// // //                             >
// // //                                 {tab}
// // //                             </button>
// // //                         ))}
// // //                     </div>
// // //                 </div>
// // //             </div>
// // //       {/* Polls */}
// // //       <div className="px-4 space-y-4 pb-24 pt-4">
// // //         {isLoading ? (
// // //           <InlineLoader text="Fetching polls..." />
// // //         ) : searchedPolls.length > 0 ? (
// // //           searchedPolls.map((poll) => (
// // //             <div
// // //               key={poll.id}
// // //               className="bg-white rounded-xl border border-gray-200 p-4 cursor-pointer hover:shadow-lg transition-shadow"
// // //               onClick={() => handlePollClick(poll)}
// // //             >
// // //               {poll.imageUrl && (
// // //                 <img
// // //                   src={poll.imageUrl}
// // //                   alt="Poll"
// // //                   className="rounded-lg w-full h-[117px] object-cover mb-3"
// // //                 />
// // //               )}

// // //               <h3 className="font-semibold text-[#161616]">{poll.question}</h3>

// // //               <div className="space-y-2 mb-4">
// // //                 {poll.options.map((option) => (
// // //                   <div
// // //                     key={option._id}
// // //                     className="w-full bg-[#EFF0F3] rounded-lg px-4 py-2 text-left text-gray-800 truncate"
// // //                   >
// // //                     {option.text}
// // //                   </div>
// // //                 ))}
// // //               </div>

// // //               {/* bottom section */}
// // //               <div className="flex items-center justify-between text-xs text-gray-500">
// // //                 <span>{calculateDaysLeft(poll.expiresAt)}</span>
// // //                 <div className="flex items-center gap-2">
// // //                   {poll.sharedPlatforms?.map((platform, i) => (
// // //                     <span key={i}>{platformIcons[platform.toLowerCase()]}</span>
// // //                   ))}
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           ))
// // //         ) : (
// // //           <div className="text-center text-gray-500 dark:text-gray-400 py-10">
// // //                         <p className="text-sm">No results found for your search.</p>
// // //                     </div>
// // //         )}
// // //       </div>

// // //       {/* Modal */}
// // //       {selectedPoll && (
// // //         <div className="fixed inset-0 bg-black bg-opacity-60 dark:bg-opacity-70 flex items-center justify-center z-50 p-4 backdrop-blur-sm" onClick={closeModal}>
// // //                     <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-sm p-6 space-y-5" onClick={(e) => e.stopPropagation()}>
// // //             <h3 className="text-xl font-bold text-[#161616] leading-tight">
// // //               {selectedPoll.question}
// // //             </h3>

// // //             {!pollResults ? (
// // //               <div className="space-y-3">
// // //                 {selectedPoll.options.map((option) => (
// // //                   <button
// // //                     key={option._id}
// // //                     onClick={() => setSelectedOptionId(option._id)}
// // //                     className={`w-full p-3 text-left font-medium rounded-xl border-2 transition-all ${
// // //                       selectedOptionId === option._id
// // //                         ? "border-pink-500 text-pink-600"
// // //                         : "border-transparent bg-gray-100 text-gray-800"
// // //                     }`}
// // //                   >
// // //                     {option.text}
// // //                   </button>
// // //                 ))}
// // //               </div>
// // //             ) : (
// // //               <PollResultsView results={pollResults} />
// // //             )}

// // //             <button
// // //               onClick={handleVote}
// // //               disabled={!selectedOptionId || isSubmittingVote || pollResults}
// // //               className="w-full py-3 rounded-xl font-bold text-white bg-[#F43F86] hover:bg-pink-600 transition-opacity disabled:opacity-50"
// // //             >
// // //               {isSubmittingVote ? "Voting..." : "Vote Now"}
// // //             </button>

// // //             <p className="text-center text-sm text-gray-500">
// // //               {calculateDaysLeft(selectedPoll.expiresAt)}
// // //             </p>
// // //           </div>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // }
// // import React, { useState, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { ArrowLeft, Bell } from "lucide-react";
// // import { categorizePolls } from "../utils/trendingAlgorithm";
// // import apiClient from "../api/axiosConfig";
// // import { AiFillInstagram, AiFillYoutube } from "react-icons/ai";
// // import {
// //   FaWhatsapp,
// //   FaFacebookF,
// //   FaLinkedinIn,
// //   FaTelegramPlane,
// //   FaTwitter,
// // } from "react-icons/fa";
// // import { SiGmail } from "react-icons/si";

// // // Helper function to calculate days left
// // const calculateDaysLeft = (expiresAt) => {
// //     if (!expiresAt) return "";
// //     const now = new Date();
// //     const expiry = new Date(expiresAt);
// //     const diff = expiry.getTime() - now.getTime();
// //     if (diff <= 0) return "Poll ended";
// //     const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
// //     return `${days} Day${days > 1 ? "s" : ""} Left`;
// // };

// // // Poll Results Component with Dark Mode
// // const PollResultsView = ({ results }) => {
// //     const [animatedPercentages, setAnimatedPercentages] = useState({});

// //     useEffect(() => {
// //         const totalVotes = (results.options || []).reduce((sum, opt) => sum + opt.votes, 0);
// //         if (totalVotes > 0) {
// //             const finalPercentages = {};
// //             results.options.forEach((option) => {
// //                 finalPercentages[option._id] = Math.round(
// //                     (option.votes / totalVotes) * 100
// //                 );
// //             });
// //             const timer = setTimeout(() => {
// //                 setAnimatedPercentages(finalPercentages);
// //             }, 100);
// //             return () => clearTimeout(timer);
// //         }
// //     }, [results]);

// //     const gradient =
// //         "linear-gradient(to right, #20DAE8 0%, #37AEFC 37%, #7C80EE 58%, #BF58DC 79%, #B55EDF 88%, #E244D3 98%)";

// //     return (
// //         <div className="space-y-3">
// //             {(results.options || []).map((option) => {
// //                 const percentage = animatedPercentages[option._id] || 0;
// //                 return (
// //                     <div
// //                         key={option._id}
// //                         className="w-full bg-gray-100 dark:bg-gray-700 rounded-xl overflow-hidden relative h-12 flex items-center"
// //                     >
// //                         <div
// //                             className="h-full rounded-xl transition-width duration-1000 ease-out"
// //                             style={{
// //                                 width: `${percentage}%`,
// //                                 background: gradient,
// //                             }}
// //                         />
// //                         <div className="absolute inset-0 px-4 flex justify-between items-center">
// //                             <span className="font-semibold text-white mix-blend-difference">
// //                                 {option.text}
// //                             </span>
// //                             <span className="font-bold text-white mix-blend-difference">
// //                                 {percentage}%
// //                             </span>
// //                         </div>
// //                     </div>
// //                 );
// //             })}
// //         </div>
// //     );
// // };

// // // Animated Loader with Dark Mode
// // const InlineLoader = ({ text }) => (
// //     <div className="flex flex-col items-center justify-center gap-6 py-20">
// //         <div className="relative w-20 h-20">
// //             <div
// //                 className="absolute inset-0 rounded-full animate-spin"
// //                 style={{
// //                     backgroundImage:
// //                         "conic-gradient(from 0deg, #20D9E8, #4C9CFA, #E741D2, #7B4CFF, #20D9E8)",
// //                 }}
// //             />
// //             <div className="absolute inset-1.5 bg-white dark:bg-gray-900 rounded-full" />
// //         </div>
// //         <p className="text-gray-500 dark:text-gray-400 text-lg animate-pulse">{text}</p>
// //     </div>
// // );

// // export default function TrendingPolls() {
// //     const navigate = useNavigate();
// //     const [isLoading, setIsLoading] = useState(true);
// //     const [allPolls, setAllPolls] = useState([]);
// //     const [selectedTab, setSelectedTab] = useState("All");
// //     const [tabs, setTabs] = useState(["All"]);
// //     const [searchQuery, setSearchQuery] = useState("");
// //     const [selectedPoll, setSelectedPoll] = useState(null);
// //     const [selectedOptionId, setSelectedOptionId] = useState(null);
// //     const [pollResults, setPollResults] = useState(null);
// //     const [isSubmittingVote, setIsSubmittingVote] = useState(false);

// //     const platformIcons = {
// //         instagram: <AiFillInstagram className="w-4 h-4 text-pink-500" />,
// //         youtube: <AiFillYoutube className="w-4 h-4 text-red-500" />,
// //         whatsapp: <FaWhatsapp className="w-4 h-4 text-green-500" />,
// //         facebook: <FaFacebookF className="w-4 h-4 text-blue-600" />,
// //         linkedin: <FaLinkedinIn className="w-4 h-4 text-blue-700" />,
// //         telegram: <FaTelegramPlane className="w-4 h-4 text-sky-500" />,
// //         twitter: <FaTwitter className="w-4 h-4 text-blue-400" />,
// //         gmail: <SiGmail className="w-4 h-4 text-rose-500" />,
// //     };

// //     // Fetch polls
// //     useEffect(() => {
// //         async function fetchPolls() {
// //             setIsLoading(true);
// //             try {
// //                 // Using apiClient for consistency
// //                 const res = await apiClient.get("/api/polls/trending");
// //                 const dbPolls = res.data;
// //                 const votedPolls = JSON.parse(localStorage.getItem("votedPolls") || "[]");

// //                 const mappedPolls = dbPolls
// //                     .map((poll) => ({
// //                         id: poll._id,
// //                         question: poll.question,
// //                         options: poll.options || [],
// //                         totalVotes: (poll.options || []).reduce((sum, opt) => sum + opt.votes, 0),
// //                         expiresAt: poll.expiresAt,
// //                         imageUrl: poll.imageUrl || null,
// //                         category: null, // Will be assigned by categorizePolls
// //                         sharedPlatforms: (poll.sharedPlatforms || []).map((p) => p.toLowerCase()),
// //                     }))
// //                     .filter((poll) => !votedPolls.includes(poll.id));

// //                 const categorized = categorizePolls(mappedPolls);
// //                 setAllPolls(categorized);

// //                 const categorySet = new Set(
// //                     categorized.map((p) => p.category).filter(Boolean)
// //                 );
// //                 setTabs(["All", ...Array.from(categorySet)]);
// //             } catch (err) {
// //                 console.error("Failed to fetch polls:", err);
// //             } finally {
// //                 setIsLoading(false);
// //             }
// //         }
// //         fetchPolls();
// //     }, []);

// //     // Filtering + Search
// //     const filteredPolls =
// //         selectedTab === "All"
// //             ? allPolls
// //             : allPolls.filter((p) => p.category === selectedTab);

// //     const searchedPolls = filteredPolls.filter(
// //         (p) =>
// //             (p.question || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
// //             (p.options || []).some((opt) => (opt.text || '').toLowerCase().includes(searchQuery.toLowerCase()))
// //     );

// //     const handlePollClick = (poll) => setSelectedPoll(poll);
// //     const closeModal = () => {
// //         setSelectedPoll(null);
// //         setSelectedOptionId(null);
// //         setPollResults(null);
// //         setIsSubmittingVote(false);
// //     };

// //     const handleVote = async () => {
// //         if (!selectedOptionId || !selectedPoll) return;
// //         const votedPolls = JSON.parse(localStorage.getItem("votedPolls") || "[]");
// //         if (votedPolls.includes(selectedPoll.id)) return;

// //         setIsSubmittingVote(true);
// //         try {
// //             const res = await apiClient.post(`/api/polls/${selectedPoll.id}/vote`, { optionId: selectedOptionId });
// //             const updatedPoll = res.data;

// //             setPollResults(updatedPoll);
// //             localStorage.setItem(
// //                 "votedPolls",
// //                 JSON.stringify([...votedPolls, selectedPoll.id])
// //             );
// //             // Remove the voted poll from the list
// //             setAllPolls((prev) => prev.filter((p) => p.id !== selectedPoll.id));

// //             setTimeout(() => closeModal(), 2500);
// //         } catch (err) {
// //             console.error("Error voting:", err);
// //             alert(err.response?.data?.error || "Vote failed");
// //             setIsSubmittingVote(false);
// //         }
// //     };

// //     return (
// //         <div className="mx-auto bg-white dark:bg-gray-900 min-h-screen max-w-md text-gray-900 dark:text-gray-200">
// //             {/* Header */}
// //             <div className="sticky top-0 z-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-700">
// //                 <div className="flex items-center justify-between p-4">
// //                     <button onClick={() => navigate(-1)}>
// //                         <ArrowLeft className="w-6 h-6 text-gray-700 dark:text-gray-200" />
// //                     </button>
// //                     <h1 className="text-lg font-semibold">Trending</h1>
// //                     <button onClick={() => navigate('/notifications')}>
// //                         <Bell className="w-6 h-6 text-gray-700 dark:text-gray-200" />
// //                     </button>
// //                 </div>

// //                 {/* Search */}
// //                 <div className="px-4 pb-2">
// //                     <input
// //                         type="text"
// //                         placeholder="Search trending polls"
// //                         value={searchQuery}
// //                         onChange={(e) => setSearchQuery(e.target.value)}
// //                         className="w-full pl-4 pr-10 py-2.5 bg-white dark:bg-gray-900 rounded-full border border-gray-200 dark:border-gray-700 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-gray-200"
// //                     />
// //                 </div>

// //                 {/* Tabs */}
// //                 <div className="px-4 pb-4">
// //                     <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
// //                         {tabs.map((tab) => (
// //                             <button
// //                                 key={tab}
// //                                 onClick={() => setSelectedTab(tab)}
// //                                 className={`px-8 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
// //                                     selectedTab === tab
// //                                         ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
// //                                         : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
// //                                 }`}
// //                             >
// //                                 {tab}
// //                             </button>
// //                         ))}
// //                     </div>
// //                 </div>
// //             </div>

// //             {/* Polls */}
// //             <div className="px-4 space-y-4 pb-24 pt-4">
// //                 {isLoading ? (
// //                     <InlineLoader text="Fetching polls..." />
// //                 ) : searchedPolls.length > 0 ? (
// //                     searchedPolls.map((poll) => (
// //                         <div
// //                             key={poll.id}
// //                             className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 cursor-pointer hover:shadow-lg transition-shadow"
// //                             onClick={() => handlePollClick(poll)}
// //                         >
// //                             {poll.imageUrl && (
// //                                 <img
// //                                     src={poll.imageUrl}
// //                                     alt="Poll"
// //                                     className="rounded-lg w-full h-[117px] object-cover mb-3"
// //                                 />
// //                             )}
// //                             <h3 className="font-semibold text-gray-900 dark:text-gray-200">
// //                                 {poll.question}
// //                             </h3>
// //                             <div className="space-y-2 my-4">
// //                                 {(poll.options || []).map((option) => (
// //                                     <div
// //                                         key={option._id}
// //                                         className="w-full bg-gray-100 dark:bg-gray-700 rounded-lg px-4 py-2 text-left text-gray-800 dark:text-gray-200 truncate"
// //                                     >
// //                                         {option.text}
// //                                     </div>
// //                                 ))}
// //                             </div>
// //                             <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
// //                                 <span>{calculateDaysLeft(poll.expiresAt)}</span>
// //                                 <div className="flex items-center gap-2">
// //                                     {poll.sharedPlatforms?.map((platform, i) => (
// //                                         <span key={i}>{platformIcons[platform.toLowerCase()]}</span>
// //                                     ))}
// //                                 </div>
// //                             </div>
// //                         </div>
// //                     ))
// //                 ) : (
// //                     <div className="text-center text-gray-500 dark:text-gray-400 py-10">
// //                         <p className="text-sm">No results found for your search.</p>
// //                     </div>
// //                 )}
// //             </div>

// //             {/* Modal */}
// //             {selectedPoll && (
// //                 <div
// //                     className="fixed inset-0 bg-black bg-opacity-60 dark:bg-opacity-70 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
// //                     onClick={closeModal}
// //                 >
// //                     <div
// //                         className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-sm p-6 space-y-5"
// //                         onClick={(e) => e.stopPropagation()}
// //                     >
// //                         <h3 className="text-xl font-bold text-gray-900 dark:text-gray-200 leading-tight">
// //                             {selectedPoll.question}
// //                         </h3>
// //                         {!pollResults ? (
// //                             <div className="space-y-3">
// //                                 {(selectedPoll.options || []).map((option) => (
// //                                     <button
// //                                         key={option._id}
// //                                         onClick={() => setSelectedOptionId(option._id)}
// //                                         className={`w-full p-3 text-left font-medium rounded-xl border-2 transition-all ${
// //                                             selectedOptionId === option._id
// //                                                 ? "border-pink-500 text-pink-600 dark:text-pink-400"
// //                                                 : "border-transparent bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
// //                                         }`}
// //                                     >
// //                                         {option.text}
// //                                     </button>
// //                                 ))}
// //                             </div>
// //                         ) : (
// //                             <PollResultsView results={pollResults} />
// //                         )}
// //                         <button
// //                             onClick={handleVote}
// //                             disabled={!selectedOptionId || isSubmittingVote || pollResults}
// //                             className="w-full py-3 rounded-xl font-bold text-white bg-pyngl-pink hover:bg-pink-600 transition-opacity disabled:opacity-50"
// //                         >
// //                             {isSubmittingVote ? "Voting..." : "Vote Now"}
// //                         </button>
// //                         <p className="text-center text-sm text-gray-500 dark:text-gray-400">
// //                             {calculateDaysLeft(selectedPoll.expiresAt)}
// //                         </p>
// //                     </div>
// //                 </div>
// //             )}
// //         </div>
// //     );
// // }
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { ArrowLeft, Bell } from "lucide-react";
// import { categorizePolls } from "../utils/trendingAlgorithm";
// import apiClient from "../api/axiosConfig";
// import DesktopNav from "../components/layout/DesktopNav";
// import useBreakpoint from "../hooks/useBreakpoint";
// import { AiFillInstagram, AiFillYoutube } from "react-icons/ai";
// import {
//   FaWhatsapp,
//   FaFacebookF,
//   FaLinkedinIn,
//   FaTelegramPlane,
//   FaTwitter,
// } from "react-icons/fa";
// import { SiGmail } from "react-icons/si";

// // Helper function to calculate days left
// const calculateDaysLeft = (expiresAt) => {
//     if (!expiresAt) return "";
//     const now = new Date();
//     const expiry = new Date(expiresAt);
//     const diff = expiry.getTime() - now.getTime();
//     if (diff <= 0) return "Poll ended";
//     const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
//     return `${days} Day${days > 1 ? "s" : ""} Left`;
// };

// // Poll Results Component with Dark Mode
// const PollResultsView = ({ results }) => {
//     const [animatedPercentages, setAnimatedPercentages] = useState({});

//     useEffect(() => {
//         const totalVotes = (results.options || []).reduce((sum, opt) => sum + opt.votes, 0);
//         if (totalVotes > 0) {
//             const finalPercentages = {};
//             results.options.forEach((option) => {
//                 finalPercentages[option._id] = Math.round(
//                     (option.votes / totalVotes) * 100
//                 );
//             });
//             const timer = setTimeout(() => {
//                 setAnimatedPercentages(finalPercentages);
//             }, 100);
//             return () => clearTimeout(timer);
//         }
//     }, [results]);

//     const gradient =
//         "linear-gradient(to right, #20DAE8 0%, #37AEFC 37%, #7C80EE 58%, #BF58DC 79%, #B55EDF 88%, #E244D3 98%)";

//     return (
//         <div className="space-y-3">
//             {(results.options || []).map((option) => {
//                 const percentage = animatedPercentages[option._id] || 0;
//                 return (
//                     <div
//                         key={option._id}
//                         className="w-full bg-gray-100 dark:bg-gray-700 rounded-xl overflow-hidden relative h-12 flex items-center"
//                     >
//                         <div
//                             className="h-full rounded-xl transition-width duration-1000 ease-out"
//                             style={{
//                                 width: `${percentage}%`,
//                                 background: gradient,
//                             }}
//                         />
//                         <div className="absolute inset-0 px-4 flex justify-between items-center">
//                             <span className="font-semibold text-white mix-blend-difference">
//                                 {option.text}
//                             </span>
//                             <span className="font-bold text-white mix-blend-difference">
//                                 {percentage}%
//                             </span>
//                         </div>
//                     </div>
//                 );
//             })}
//         </div>
//     );
// };

// // Merged Loader from your friend's code for a better look
// const InlineLoader = ({ text }) => (
//     <div className="flex flex-col items-center justify-center gap-6 py-20 col-span-1 sm:col-span-2">
//         <div className="relative w-20 h-20">
//             <div
//                 className="absolute inset-0 rounded-full animate-spin"
//                 style={{
//                     backgroundImage:
//                         "conic-gradient(from 0deg, #20D9E8, #4C9CFA, #E741D2, #7B4CFF, #20D9E8)",
//                 }}
//             />
//             <div className="absolute inset-1.5 bg-white dark:bg-gray-900 rounded-full" />
//         </div>
//         <p className="text-gray-500 dark:text-gray-400 text-lg animate-pulse">{text}</p>
//     </div>
// );

// export default function TrendingPolls() {
//     const navigate = useNavigate();
//     const [isLoading, setIsLoading] = useState(true);
//     const [allPolls, setAllPolls] = useState([]);
//     const [selectedTab, setSelectedTab] = useState("All");
//     const [tabs, setTabs] = useState(["All"]);
//     const [searchQuery, setSearchQuery] = useState("");
//     const [selectedPoll, setSelectedPoll] = useState(null);
//     const [selectedOptionId, setSelectedOptionId] = useState(null);
//     const [pollResults, setPollResults] = useState(null);
//     const [isSubmittingVote, setIsSubmittingVote] = useState(false);
//     const isDesktop = useBreakpoint();
//     const platformIcons = {
//         instagram: <AiFillInstagram className="w-4 h-4 text-pink-500" />,
//         youtube: <AiFillYoutube className="w-4 h-4 text-red-500" />,
//         whatsapp: <FaWhatsapp className="w-4 h-4 text-green-500" />,
//         facebook: <FaFacebookF className="w-4 h-4 text-blue-600" />,
//         linkedin: <FaLinkedinIn className="w-4 h-4 text-blue-700" />,
//         telegram: <FaTelegramPlane className="w-4 h-4 text-sky-500" />,
//         twitter: <FaTwitter className="w-4 h-4 text-blue-400" />,
//         gmail: <SiGmail className="w-4 h-4 text-rose-500" />,
//     };

//     // Kept your robust data fetching logic
//     useEffect(() => {
//         async function fetchPolls() {
//             setIsLoading(true);
//             try {
//                 const res = await apiClient.get("/api/polls/trending");
//                 const dbPolls = res.data;
//                 const votedPolls = JSON.parse(localStorage.getItem("votedPolls") || "[]");

//                 const mappedPolls = dbPolls
//                     .map((poll) => ({
//                         id: poll._id,
//                         question: poll.question,
//                         options: poll.options || [],
//                         totalVotes: (poll.options || []).reduce((sum, opt) => sum + opt.votes, 0),
//                         expiresAt: poll.expiresAt,
//                         imageUrl: poll.imageUrl || null,
//                         category: null, // Will be assigned by categorizePolls
//                         sharedPlatforms: (poll.sharedPlatforms || []).map((p) => p.toLowerCase()),
//                     }))
//                     .filter((poll) => !votedPolls.includes(poll.id));

//                 const categorized = categorizePolls(mappedPolls);
//                 setAllPolls(categorized);

//                 const categorySet = new Set(
//                     categorized.map((p) => p.category).filter(Boolean)
//                 );
//                 setTabs(["All", ...Array.from(categorySet)]);
//             } catch (err) {
//                 console.error("Failed to fetch polls:", err);
//             } finally {
//                 setIsLoading(false);
//             }
//         }
//         fetchPolls();
//     }, []);

//     // Kept your more robust filtering and search logic
//     const filteredPolls =
//         selectedTab === "All"
//             ? allPolls
//             : allPolls.filter((p) => p.category === selectedTab);

//     const searchedPolls = filteredPolls.filter(
//         (p) =>
//             (p.question || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
//             (p.options || []).some((opt) => (opt.text || '').toLowerCase().includes(searchQuery.toLowerCase()))
//     );

//     const handlePollClick = (poll) => setSelectedPoll(poll);
//     const closeModal = () => {
//         setSelectedPoll(null);
//         setSelectedOptionId(null);
//         setPollResults(null);
//         setIsSubmittingVote(false);
//     };

//     // Kept your vote handler with apiClient
//     const handleVote = async () => {
//         if (!selectedOptionId || !selectedPoll) return;
//         const votedPolls = JSON.parse(localStorage.getItem("votedPolls") || "[]");
//         if (votedPolls.includes(selectedPoll.id)) return;

//         setIsSubmittingVote(true);
//         try {
//             const res = await apiClient.post(`/api/polls/${selectedPoll.id}/vote`, { optionId: selectedOptionId });
//             const updatedPoll = res.data;

//             setPollResults(updatedPoll);
//             localStorage.setItem(
//                 "votedPolls",
//                 JSON.stringify([...votedPolls, selectedPoll.id])
//             );
//             // Remove the voted poll from the list
//             setAllPolls((prev) => prev.filter((p) => p.id !== selectedPoll.id));

//             setTimeout(() => closeModal(), 2500);
//         } catch (err) {
//             console.error("Error voting:", err);
//             alert(err.response?.data?.error || "Vote failed");
//             setIsSubmittingVote(false);
//         }
//     };

//     return (
//         // Using friend's responsive container for better desktop view
//         <div className="mx-auto bg-white dark:bg-gray-900 min-h-screen max-w-4xl text-gray-900 dark:text-gray-200">
//             {/* Header */}

//             <div className="sticky top-0 z-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-700">
//                 <div className="flex items-center justify-between p-4">
//                     <button onClick={() => navigate(-1)}>
//                         <ArrowLeft className="w-6 h-6 text-gray-700 dark:text-gray-200" />
//                     </button>
//                     <h1 className="text-lg font-semibold">Trending</h1>
//                     {/* Kept your functional notification button */}
//                     <button onClick={() => navigate('/notifications')}>
//                         <Bell className="w-6 h-6 text-gray-700 dark:text-gray-200" />
//                     </button>
//                 </div>

//                 {/* Search */}
//                 <div className="px-4 pb-2">
//                     <input
//                         type="text"
//                         placeholder="Search trending polls"
//                         value={searchQuery}
//                         onChange={(e) => setSearchQuery(e.target.value)}
//                         className="w-full pl-4 pr-10 py-2.5 bg-white dark:bg-gray-900 rounded-full border border-gray-200 dark:border-gray-700 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-gray-200"
//                     />
//                 </div>

//                 {/* Tabs */}
//                 <div className="px-4 pb-4">
//                     <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
//                         {tabs.map((tab) => (
//                             <button
//                                 key={tab}
//                                 onClick={() => setSelectedTab(tab)}
//                                 className={`px-8 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
//                                     selectedTab === tab
//                                         ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
//                                         : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
//                                 }`}
//                             >
//                                 {tab}
//                             </button>
//                         ))}
//                     </div>
//                 </div>
//             </div>

//             {/* Polls Grid - Adopted from friend's code */}
//             <div className="px-4 pt-4 pb-24 grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 {isLoading ? (
//                     <InlineLoader text="Fetching polls..." />
//                 ) : searchedPolls.length > 0 ? (
//                     searchedPolls.map((poll) => (
//                         <div
//                             key={poll.id}
//                             className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 cursor-pointer hover:shadow-lg transition-shadow"
//                             onClick={() => handlePollClick(poll)}
//                         >
//                             {poll.imageUrl && (
//                                 <img
//                                     src={poll.imageUrl}
//                                     alt="Poll"
//                                     // Responsive image height from friend's code
//                                     className="rounded-lg w-full h-[150px] md:h-[180px] object-cover mb-3"
//                                 />
//                             )}
//                             <h3 className="font-semibold text-gray-900 dark:text-gray-200">
//                                 {poll.question}
//                             </h3>
//                             <div className="space-y-2 my-4">
//                                 {(poll.options || []).map((option) => (
//                                     <div
//                                         key={option._id}
//                                         className="w-full bg-gray-100 dark:bg-gray-700 rounded-lg px-4 py-2 text-left text-gray-800 dark:text-gray-200 truncate"
//                                     >
//                                         {option.text}
//                                     </div>
//                                 ))}
//                             </div>
//                             <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
//                                 <span>{calculateDaysLeft(poll.expiresAt)}</span>
//                                 <div className="flex items-center gap-2">
//                                     {poll.sharedPlatforms?.map((platform, i) => (
//                                         <span key={i}>{platformIcons[platform.toLowerCase()]}</span>
//                                     ))}
//                                 </div>
//                             </div>
//                         </div>
//                     ))
//                 ) : (
//                     <div className="text-center text-gray-500 dark:text-gray-400 py-10 col-span-1 sm:col-span-2">
//                         <p className="text-sm">No results found for your search.</p>
//                     </div>
//                 )}
//             </div>

//             {/* Modal - Using friend's wider, responsive version */}
//             {selectedPoll && (
//                 <div
//                     className="fixed inset-0 bg-black bg-opacity-60 dark:bg-opacity-70 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
//                     onClick={closeModal}
//                 >
//                     <div
//                         className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-md p-6 space-y-5"
//                         onClick={(e) => e.stopPropagation()}
//                     >
//                         <h3 className="text-xl font-bold text-gray-900 dark:text-gray-200 leading-tight">
//                             {selectedPoll.question}
//                         </h3>
//                         {!pollResults ? (
//                             <div className="space-y-3">
//                                 {(selectedPoll.options || []).map((option) => (
//                                     <button
//                                         key={option._id}
//                                         onClick={() => setSelectedOptionId(option._id)}
//                                         className={`w-full p-3 text-left font-medium rounded-xl border-2 transition-all ${
//                                             selectedOptionId === option._id
//                                                 ? "border-pink-500 text-pink-600 dark:text-pink-400"
//                                                 : "border-transparent bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
//                                         }`}
//                                     >
//                                         {option.text}
//                                     </button>
//                                 ))}
//                             </div>
//                         ) : (
//                             <PollResultsView results={pollResults} />
//                         )}
//                         <button
//                             onClick={handleVote}
//                             disabled={!selectedOptionId || isSubmittingVote || pollResults}
//                             className="w-full py-3 rounded-xl font-bold text-white bg-[#F43F86] hover:bg-pink-600 transition-opacity disabled:opacity-50"
//                         >
//                             {isSubmittingVote ? "Voting..." : "Vote Now"}
//                         </button>
//                         <p className="text-center text-sm text-gray-500 dark:text-gray-400">
//                             {calculateDaysLeft(selectedPoll.expiresAt)}
//                         </p>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Bell, Search } from "lucide-react";
import { categorizePolls } from "../utils/trendingAlgorithm";
import apiClient from "../api/axiosConfig";
import DesktopNav from "../components/layout/DesktopNav";
import useBreakpoint from "../hooks/useBreakpoint";
import { AiFillInstagram, AiFillYoutube } from "react-icons/ai";
import {
  FaWhatsapp,
  FaFacebookF,
  FaLinkedinIn,
  FaTelegramPlane,
  FaTwitter,
} from "react-icons/fa";
import { SiGmail } from "react-icons/si";

// Helper to calculate days left
const calculateDaysLeft = (expiresAt) => {
  if (!expiresAt) return "";
  const now = new Date();
  const expiry = new Date(expiresAt);
  const diff = expiry.getTime() - now.getTime();
  if (diff <= 0) return "Poll ended";
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  return `${days} Day${days > 1 ? "s" : ""} Left`;
};

// Poll Results Component
const PollResultsView = ({ results }) => {
  const [animatedPercentages, setAnimatedPercentages] = useState({});
  useEffect(() => {
    const totalVotes = (results.options || []).reduce(
      (sum, opt) => sum + opt.votes,
      0
    );
    if (totalVotes > 0) {
      const finalPercentages = {};
      results.options.forEach((option) => {
        finalPercentages[option._id] = Math.round(
          (option.votes / totalVotes) * 100
        );
      });
      const timer = setTimeout(
        () => setAnimatedPercentages(finalPercentages),
        100
      );
      return () => clearTimeout(timer);
    }
  }, [results]);

  const gradient =
    "linear-gradient(to right, #20DAE8 0%, #37AEFC 37%, #7C80EE 58%, #BF58DC 79%, #B55EDF 88%, #E244D3 98%)";

  return (
    <div className="space-y-3">
      {(results.options || []).map((option) => {
        const percentage = animatedPercentages[option._id] || 0;
        return (
          <div
            key={option._id}
            className="w-full bg-gray-100 dark:bg-gray-700 rounded-xl overflow-hidden relative h-12 flex items-center"
          >
            <div
              className="h-full rounded-xl transition-width duration-1000 ease-out"
              style={{ width: `${percentage}%`, background: gradient }}
            />
            <div className="absolute inset-0 px-4 flex justify-between items-center">
              <span className="font-semibold text-white mix-blend-difference">
                {option.text}
              </span>
              <span className="font-bold text-white mix-blend-difference">
                {percentage}%
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// Loading component
const InlineLoader = ({ text }) => (
  <div className="flex flex-col items-center justify-center gap-6 py-20 col-span-1 sm:col-span-2">
    <div className="relative w-20 h-20">
      <div
        className="absolute inset-0 rounded-full animate-spin"
        style={{
          backgroundImage:
            "conic-gradient(from 0deg, #20D9E8, #4C9CFA, #E741D2, #7B4CFF, #20D9E8)",
        }}
      />
      <div className="absolute inset-1.5 bg-white dark:bg-gray-900 rounded-full" />
    </div>
    <p className="text-gray-500 dark:text-gray-400 text-lg animate-pulse">
      {text}
    </p>
  </div>
);

export default function TrendingPolls() {
  const navigate = useNavigate();
  const isDesktop = useBreakpoint();
  const [isLoading, setIsLoading] = useState(true);
  const [allPolls, setAllPolls] = useState([]);
  const [selectedTab, setSelectedTab] = useState("All");
  const [tabs, setTabs] = useState(["All"]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPoll, setSelectedPoll] = useState(null);
  const [selectedOptionId, setSelectedOptionId] = useState(null);
  const [pollResults, setPollResults] = useState(null);
  const [isSubmittingVote, setIsSubmittingVote] = useState(false);

  const platformIcons = {
    instagram: <AiFillInstagram className="w-4 h-4 text-pink-500" />,
    youtube: <AiFillYoutube className="w-4 h-4 text-red-500" />,
    whatsapp: <FaWhatsapp className="w-4 h-4 text-green-500" />,
    facebook: <FaFacebookF className="w-4 h-4 text-blue-600" />,
    linkedin: <FaLinkedinIn className="w-4 h-4 text-blue-700" />,
    telegram: <FaTelegramPlane className="w-4 h-4 text-sky-500" />,
    twitter: <FaTwitter className="w-4 h-4 text-blue-400" />,
    gmail: <SiGmail className="w-4 h-4 text-rose-500" />,
  };

  useEffect(() => {
    async function fetchPolls() {
      setIsLoading(true);
      try {
        const res = await apiClient.get("/api/polls/trending");
        const dbPolls = res.data;
        const votedPolls = JSON.parse(
          localStorage.getItem("votedPolls") || "[]"
        );
        const mappedPolls = dbPolls
          .map((poll) => ({
            id: poll._id,
            question: poll.question,
            options: poll.options || [],
            totalVotes: (poll.options || []).reduce(
              (sum, opt) => sum + opt.votes,
              0
            ),
            expiresAt: poll.expiresAt,
            imageUrl: poll.imageUrl || null,
            category: null,
            sharedPlatforms: (poll.sharedPlatforms || []).map((p) =>
              p.toLowerCase()
            ),
          }))
          .filter((poll) => !votedPolls.includes(poll.id));
        const categorized = categorizePolls(mappedPolls);
        setAllPolls(categorized);
        const categorySet = new Set(
          categorized.map((p) => p.category).filter(Boolean)
        );
        setTabs(["All", ...Array.from(categorySet)]);
      } catch (err) {
        console.error("Failed to fetch polls:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchPolls();
  }, []);

  const filteredPolls =
    selectedTab === "All"
      ? allPolls
      : allPolls.filter((p) => p.category === selectedTab);
  const searchedPolls = filteredPolls.filter(
    (p) =>
      (p.question || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.options || []).some((opt) =>
        (opt.text || "").toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  const handlePollClick = (poll) => setSelectedPoll(poll);
  const closeModal = () => {
    setSelectedPoll(null);
    setSelectedOptionId(null);
    setPollResults(null);
    setIsSubmittingVote(false);
  };

  const handleVote = async () => {
    if (!selectedOptionId || !selectedPoll) return;
    const votedPolls = JSON.parse(localStorage.getItem("votedPolls") || "[]");
    if (votedPolls.includes(selectedPoll.id)) return;
    setIsSubmittingVote(true);
    try {
      const res = await apiClient.post(`/api/polls/${selectedPoll.id}/vote`, {
        optionId: selectedOptionId,
      });
      setPollResults(res.data);
      localStorage.setItem(
        "votedPolls",
        JSON.stringify([...votedPolls, selectedPoll.id])
      );
      setAllPolls((prev) => prev.filter((p) => p.id !== selectedPoll.id));
      setTimeout(() => closeModal(), 2500);
    } catch (err) {
      console.error("Error voting:", err);
      alert(err.response?.data?.error || "Vote failed");
      setIsSubmittingVote(false);
    }
  };

  const PollCard = ({ poll }) => (
    <div
      key={poll.id}
      className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 cursor-pointer hover:shadow-lg transition-shadow"
      onClick={() => handlePollClick(poll)}
    >
      {poll.imageUrl && (
        <img
          src={poll.imageUrl}
          alt="Poll"
          className="rounded-lg w-full h-[150px] md:h-[180px] object-cover mb-3"
        />
      )}
      <h3 className="font-semibold text-gray-900 dark:text-gray-200">
        {poll.question}
      </h3>
      <div className="space-y-2 my-4">
        {(poll.options || []).slice(0, 2).map((option) => (
          <div
            key={option._id}
            className="w-full bg-gray-100 dark:bg-gray-700 rounded-lg px-4 py-2 text-left text-gray-800 dark:text-gray-200 truncate"
          >
            {option.text}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
        <span>{calculateDaysLeft(poll.expiresAt)}</span>
        <div className="flex items-center gap-2">
          {poll.sharedPlatforms?.map((platform, i) => (
            <span key={i}>{platformIcons[platform.toLowerCase()]}</span>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-200">
      {isDesktop ? (
        // --- NEW DESKTOP LAYOUT ---
        <>
          <DesktopNav />
          <div className="px-6 lg:px-24 py-4 text-sm text-gray-500 border-b border-gray-200">
            <span className="font-semibold">Trending &gt;</span>
          </div>
          <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
            <div className="relative max-w-2xl mx-auto mb-8">
              <input
                type="text"
                placeholder="Search trending polls"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-800 rounded-full border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
            <div className="flex justify-center flex-wrap gap-2 mb-8">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSelectedTab(tab)}
                  className={`px-6 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    selectedTab === tab
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="min-h-[60vh] flex items-center justify-center">
              {isLoading ? (
                <InlineLoader text="Fetching polls..." />
              ) : searchedPolls.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                  {searchedPolls.map((poll) => (
                    <PollCard key={poll._id} poll={poll} />
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-500 py-10 col-span-full">
                  <p>No results found.</p>
                </div>
              )}
            </div>
          </main>
        </>
      ) : (
        // --- EXISTING MOBILE/TABLET LAYOUT ---
        <div className="mx-auto max-w-4xl">
          <div className="sticky top-0 z-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between p-4">
              <button onClick={() => navigate(-1)}>
                <ArrowLeft className="w-6 h-6 text-gray-700 dark:text-gray-200" />
              </button>
              <h1 className="text-lg font-semibold">Trending</h1>
              <button onClick={() => navigate("/notifications")}>
                <Bell className="w-6 h-6 text-gray-700 dark:text-gray-200" />
              </button>
            </div>
            <div className="px-4 pb-2">
              <input
                type="text"
                placeholder="Search trending polls"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-10 py-2.5 bg-white dark:bg-gray-900 rounded-full border border-gray-200 dark:border-gray-700 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-gray-200"
              />
            </div>
            <div className="px-4 pb-4">
              <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setSelectedTab(tab)}
                    className={`px-8 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                      selectedTab === tab
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="px-4 pt-4 pb-24 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {isLoading ? (
              <InlineLoader text="Fetching polls..." />
            ) : searchedPolls.length > 0 ? (
              searchedPolls.map((poll) => <PollCard poll={poll} />)
            ) : (
              <div className="text-center text-gray-500 dark:text-gray-400 py-10 col-span-1 sm:col-span-2">
                <p className="text-sm">No results found for your search.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {selectedPoll && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 dark:bg-opacity-70 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-md p-6 space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-200 leading-tight">
              {selectedPoll.question}
            </h3>
            {!pollResults ? (
              <div className="space-y-3">
                {(selectedPoll.options || []).map((option) => (
                  <button
                    key={option._id}
                    onClick={() => setSelectedOptionId(option._id)}
                    className={`w-full p-3 text-left font-medium rounded-xl border-2 transition-all ${
                      selectedOptionId === option._id
                        ? "border-pink-500 text-pink-600 dark:text-pink-400"
                        : "border-transparent bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                    }`}
                  >
                    {option.text}
                  </button>
                ))}
              </div>
            ) : (
              <PollResultsView results={pollResults} />
            )}
            <button
              onClick={handleVote}
              disabled={!selectedOptionId || isSubmittingVote || pollResults}
              className="w-full py-3 rounded-xl font-bold text-white bg-[#F43F86] hover:bg-pink-600 transition-opacity disabled:opacity-50"
            >
              {isSubmittingVote ? "Voting..." : "Vote Now"}
            </button>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
              {calculateDaysLeft(selectedPoll.expiresAt)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
