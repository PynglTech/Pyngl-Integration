// // // import React, { useState, useEffect } from "react";
// // // import { useNavigate, Link } from "react-router-dom";
// // // import { ArrowLeft, Bell, Loader, Clock } from "lucide-react";
// // // import apiClient from "../api/axiosConfig";
// // // import DesktopNav from "../components/layout/DesktopNav";
// // // import useBreakpoint from "../hooks/useBreakpoint";
// // // import useAuthStore from "../store/useAuthStore";

// // // // --- Reusable Poll Card for this Page ---
// // // // This card is designed to show results, not for voting
// // // const MyPollCard = ({ poll }) => {
// // //     const navigate = useNavigate();
// // //     const totalVotes = poll.options.reduce((sum, opt) => sum + opt.votes, 0);

// // //     // Calculate time left
// // //     const [timeLeft, setTimeLeft] = useState("");
// // //     useEffect(() => {
// // //         const now = new Date();
// // //         const expiry = new Date(poll.expiresAt);
// // //         const diff = expiry.getTime() - now.getTime();

// // //         if (diff <= 0) {
// // //             setTimeLeft("Expired");
// // //         } else {
// // //             const days = Math.floor(diff / (1000 * 60 * 60 * 24));
// // //             const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
// // //             if (days > 0) setTimeLeft(`${days}d left`);
// // //             else setTimeLeft(`${hours}h left`);
// // //         }
// // //     }, [poll.expiresAt]);

// // //     return (
// // //         <div 
// // //             className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden shadow-sm cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
// // //             onClick={() => navigate(`/analytics/${poll._id}`)} // Link to analytics page
// // //         >
// // //             {poll.imageUrl && (
// // //                 <img src={poll.imageUrl} alt="Poll" className="w-full h-32 object-cover" />
// // //             )}
// // //             <div className="p-5">
// // //                 <h3 className="font-semibold text-gray-800 dark:text-gray-200 pr-2 mb-4 truncate">
// // //                     {poll.question}
// // //                 </h3>
// // //                 <div className="space-y-3 mb-4">
// // //                     {poll.options.slice(0, 3).map((option, index) => {
// // //                         const percent = totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100) : 0;
// // //                         return (
// // //                             <div key={option._id || index} className="w-full bg-gray-100 dark:bg-gray-700 rounded-lg h-8 flex items-center relative overflow-hidden">
// // //                                 <div
// // //                                     className="h-full rounded-lg bg-gradient-to-r from-cyan-400 to-pink-500"
// // //                                     style={{ width: `${percent}%`, transition: 'width 0.5s ease-out' }}
// // //                                 />
// // //                                 <div className="absolute inset-0 px-3 flex justify-between items-center">
// // //                                     <span className="text-xs font-medium text-white mix-blend-overlay truncate">{option.text}</span>
// // //                                     <span className="text-xs font-semibold text-white mix-blend-overlay">{percent}%</span>
// // //                                 </div>
// // //                             </div>
// // //                         );
// // //                     })}
// // //                 </div>
// // //                 <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
// // //                     <div className="flex items-center gap-1.5">
// // //                         <Clock size={14} />
// // //                         <span>{timeLeft}</span>
// // //                     </div>
// // //                     <span className="font-semibold">{totalVotes} Votes</span>
// // //                 </div>
// // //             </div>
// // //         </div>
// // //     );
// // // };

// // // // --- Loading Component ---
// // // const InlineLoader = ({ text }) => (
// // //     <div className="flex flex-col items-center justify-center gap-6 py-20 col-span-full">
// // //         <div className="relative w-20 h-20">
// // //             <div className="absolute inset-0 rounded-full animate-spin" style={{ backgroundImage: "conic-gradient(from 0deg, #20D9E8, #4C9CFA, #E741D2, #7B4CFF, #20D9E8)" }} />
// // //             <div className="absolute inset-1.5 bg-gray-50 dark:bg-gray-900 rounded-full" />
// // //         </div>
// // //         <p className="text-gray-500 dark:text-gray-400 text-lg animate-pulse">{text}</p>
// // //     </div>
// // // );

// // // // --- Main Polls Activity Page ---
// // // export default function PollActivityPage() {
// // //     const navigate = useNavigate();
// // //     const isDesktop = useBreakpoint();
// // //     const [myPolls, setMyPolls] = useState([]);
// // //     const [filteredPolls, setFilteredPolls] = useState([]);
// // //     const [activeFilter, setActiveFilter] = useState("All");
// // //     const [isLoading, setIsLoading] = useState(true);

// // //     const filterOptions = ["All", "Live", "Expiring Soon", "Expired"];

// // //     // Fetch user's polls on mount
// // //     useEffect(() => {
// // //         const fetchMyPolls = async () => {
// // //             setIsLoading(true);
// // //             try {
// // //                 const res = await apiClient.get("/api/polls/my-polls");
// // //                 setMyPolls(res.data);
// // //             } catch (err) {
// // //                 console.error("Failed to fetch user polls:", err);
// // //             } finally {
// // //                 setIsLoading(false);
// // //             }
// // //         };
// // //         fetchMyPolls();
// // //     }, []);

// // //     // Filter logic
// // //     useEffect(() => {
// // //         const now = new Date().getTime();
// // //         const oneDay = 24 * 60 * 60 * 1000;

// // //         let pollsToShow = [];

// // //         if (activeFilter === "All") {
// // //             pollsToShow = myPolls;
// // //         } else if (activeFilter === "Live") {
// // //             pollsToShow = myPolls.filter(p => new Date(p.expiresAt).getTime() > now);
// // //         } else if (activeFilter === "Expiring Soon") {
// // //             pollsToShow = myPolls.filter(p => {
// // //                 const expiryTime = new Date(p.expiresAt).getTime();
// // //                 const diff = expiryTime - now;
// // //                 return diff > 0 && diff < oneDay;
// // //             });
// // //         } else if (activeFilter === "Expired") {
// // //             pollsToShow = myPolls.filter(p => new Date(p.expiresAt).getTime() <= now);
// // //         }
        
// // //         setFilteredPolls(pollsToShow);
// // //     }, [myPolls, activeFilter]);


// // //     return (
// // //         <div className="bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-200">
// // //             {isDesktop ? (
// // //                 // --- DESKTOP LAYOUT ---
// // //                 <>
// // //                     <DesktopNav />
// // //                     <div className="px-6 lg:px-24 py-4 text-sm text-gray-500 border-b border-gray-200 dark:border-gray-700">
// // //                         <Link to="/dashboard" className="hover:text-pink-500">Home</Link>
// // //                         <span className="mx-2">/</span>
// // //                         <span className="font-semibold">Polls Activity</span>
// // //                     </div>
// // //                     <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
// // //                         <div className="flex justify-center flex-wrap gap-2 mb-8">
// // //                             {filterOptions.map((tab) => (
// // //                                 <button
// // //                                     key={tab}
// // //                                     onClick={() => setActiveFilter(tab)}
// // //                                     className={`px-6 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
// // //                                         activeFilter === tab
// // //                                             ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md"
// // //                                             : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700"
// // //                                     }`}
// // //                                 >
// // //                                     {tab}
// // //                                 </button>
// // //                             ))}
// // //                         </div>
// // //                         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
// // //                             {isLoading ? <InlineLoader text="Loading your polls..." /> : filteredPolls.length > 0 ? (filteredPolls.map((poll) => <MyPollCard key={poll._id} poll={poll} />)) : (<div className="text-center text-gray-500 py-10 col-span-full"><p>You haven't created any polls yet.</p></div>)}
// // //                         </div>
// // //                     </main>
// // //                 </>
// // //             ) : (
// // //                 // --- MOBILE/TABLET LAYOUT ---
// // //                 <div className="mx-auto max-w-4xl">
// // //                     <div className="sticky top-0 z-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-700">
// // //                         <div className="flex items-center justify-between p-4"><button onClick={() => navigate(-1)}><ArrowLeft className="w-6 h-6 text-gray-700 dark:text-gray-200" /></button><h1 className="text-lg font-semibold">Polls Activity</h1><button onClick={() => navigate('/notifications')}><Bell className="w-6 h-6 text-gray-700 dark:text-gray-200" /></button></div>
// // //                         <div className="px-4 pb-4"><div className="flex space-x-2 overflow-x-auto scrollbar-hide">{filterOptions.map((tab) => ( <button key={tab} onClick={() => setActiveFilter(tab)} className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${ activeFilter === tab ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600" }`}>{tab}</button>))}</div></div>
// // //                     </div>
// // //                     <div className="px-4 pt-4 pb-24 grid grid-cols-1 sm:grid-cols-2 gap-4">
// // //                         {isLoading ? <InlineLoader text="Loading your polls..." /> : filteredPolls.length > 0 ? (filteredPolls.map((poll) => <MyPollCard key={poll._id} poll={poll} />)) : (<div className="text-center text-gray-500 dark:text-gray-400 py-10 col-span-1 sm:col-span-2"><p>You haven't created any polls yet.</p></div>)}
// // //                     </div>
// // //                 </div>
// // //             )}
// // //         </div>
// // //     );
// // // }
// // import React, { useState, useEffect } from "react";
// // import { useNavigate, Link } from "react-router-dom";
// // import { ArrowLeft, Bell, Loader, Clock } from "lucide-react";
// // import apiClient from "../api/axiosConfig";
// // import DesktopNav from "../components/layout/DesktopNav";
// // import useBreakpoint from "../hooks/useBreakpoint";
// // import useAuthStore from "../store/useAuthStore";

// // // --- Reusable Poll Card for this Page ---
// // const MyPollCard = ({ poll }) => {
// //     const navigate = useNavigate();
// //     const totalVotes = poll.options.reduce((sum, opt) => sum + opt.votes, 0);

// //     // --- NEW: Real-time countdown logic ---
// //     const [timeLeft, setTimeLeft] = useState("");

// //     useEffect(() => {
// //         const calculateTimeLeft = () => {
// //             const now = new Date();
// //             const expiry = new Date(poll.expiresAt);
// //             const diff = expiry.getTime() - now.getTime();

// //             if (diff <= 0) {
// //                 setTimeLeft("Expired");
// //                 return null; // Stop the interval
// //             }

// //             const days = Math.floor(diff / (1000 * 60 * 60 * 24));
// //             const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
// //             const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
// //             const seconds = Math.floor((diff % (1000 * 60)) / 1000);

// //             if (days > 0) {
// //                 setTimeLeft(`${days}d ${hours}h left`);
// //             } else if (hours > 0) {
// //                 setTimeLeft(`${hours}h ${minutes}m left`);
// //             } else if (minutes > 0) {
// //                 setTimeLeft(`${minutes}m ${seconds}s left`);
// //             } else {
// //                 setTimeLeft(`${seconds}s left`);
// //             }
// //             return diff; // Return diff to check if interval should continue
// //         };

// //         // Run once immediately
// //         const initialDiff = calculateTimeLeft();
        
// //         // Only set up an interval if the poll is not already expired
// //         if (initialDiff > 0) {
// //             const intervalId = setInterval(() => {
// //                 if (calculateTimeLeft() <= 0) {
// //                     clearInterval(intervalId); // Stop timer when it expires
// //                 }
// //             }, 1000); // Update every second

// //             return () => clearInterval(intervalId); // Cleanup on unmount
// //         }
// //     }, [poll.expiresAt]);
// //     // --- End of real-time logic ---

// //     return (
// //         <div 
// //             className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden shadow-sm cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
// //             onClick={() => navigate(`/analytics/${poll._id}`)} // Link to analytics page
// //         >
// //             {poll.imageUrl && (
// //                 <img src={poll.imageUrl} alt="Poll" className="w-full h-32 object-cover" />
// //             )}
// //             <div className="p-5">
// //                 <h3 className="font-semibold text-gray-800 dark:text-gray-200 pr-2 mb-4 truncate">
// //                     {poll.question}
// //                 </h3>
// //                 <div className="space-y-3 mb-4">
// //                     {poll.options.slice(0, 3).map((option, index) => {
// //                         const percent = totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100) : 0;
// //                         return (
// //                             <div key={option._id || index} className="w-full bg-gray-100 dark:bg-gray-700 rounded-lg h-8 flex items-center relative overflow-hidden">
// //                                 <div
// //                                     className="h-full rounded-lg bg-gradient-to-r from-cyan-400 to-pink-500"
// //                                     style={{ width: `${percent}%`, transition: 'width 0.5s ease-out' }}
// //                                 />
// //                                 <div className="absolute inset-0 px-3 flex justify-between items-center">
// //                                     <span className="text-xs font-medium text-white mix-blend-overlay truncate">{option.text}</span>
// //                                     <span className="text-xs font-semibold text-white mix-blend-overlay">{percent}%</span>
// //                                 </div>
// //                             </div>
// //                         );
// //                     })}
// //                 </div>
// //                 <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
// //                     <div className="flex items-center gap-1.5">
// //                         <Clock size={14} />
// //                         <span className={timeLeft === "Expired" ? "text-red-500 font-medium" : ""}>
// //                             {timeLeft}
// //                         </span>
// //                     </div>
// //                     <span className="font-semibold">{totalVotes} Votes</span>
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // };

// // // --- Loading Component ---
// // const InlineLoader = ({ text }) => (
// //     <div className="flex flex-col items-center justify-center gap-6 py-20 col-span-full">
// //         <div className="relative w-20 h-20">
// //             <div className="absolute inset-0 rounded-full animate-spin" style={{ backgroundImage: "conic-gradient(from 0deg, #20D9E8, #4C9CFA, #E741D2, #7B4CFF, #20D9E8)" }} />
// //             <div className="absolute inset-1.5 bg-gray-50 dark:bg-gray-900 rounded-full" />
// //         </div>
// //         <p className="text-gray-500 dark:text-gray-400 text-lg animate-pulse">{text}</p>
// //     </div>
// // );

// // // --- Main Polls Activity Page ---
// // export default function PollActivityPage() {
// //     const navigate = useNavigate();
// //     const isDesktop = useBreakpoint();
// //     const [myPolls, setMyPolls] = useState([]);
// //     const [filteredPolls, setFilteredPolls] = useState([]);
// //     const [activeFilter, setActiveFilter] = useState("All");
// //     const [isLoading, setIsLoading] = useState(true);

// //     const filterOptions = ["All", "Live", "Expiring Soon", "Expired"];

// //     // Fetch user's polls on mount
// //     useEffect(() => {
// //         const fetchMyPolls = async () => {
// //             setIsLoading(true);
// //             try {
// //                 const res = await apiClient.get("/api/polls/my-polls");
// //                 setMyPolls(res.data);
// //             } catch (err) {
// //                 console.error("Failed to fetch user polls:", err);
// //             } finally {
// //                 setIsLoading(false);
// //             }
// //         };
// //         fetchMyPolls();
// //     }, []);

// //     // Filter logic
// //     useEffect(() => {
// //         const now = new Date().getTime();
// //         const oneDay = 24 * 60 * 60 * 1000;

// //         let pollsToShow = [];

// //         if (activeFilter === "All") {
// //             pollsToShow = myPolls;
// //         } else if (activeFilter === "Live") {
// //             pollsToShow = myOof.filter(p => new Date(p.expiresAt).getTime() > now);
// //         } else if (activeFilter === "Expiring Soon") {
// //             pollsToShow = myPolls.filter(p => {
// //                 const expiryTime = new Date(p.expiresAt).getTime();
// //                 const diff = expiryTime - now;
// //                 return diff > 0 && diff < oneDay;
// //             });
// //         } else if (activeFilter === "Expired") {
// //             pollsToShow = myPolls.filter(p => new Date(p.expiresAt).getTime() <= now);
// //         }
        
// //         // Sort by creation date, newest first
// //         pollsToShow.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
// //         setFilteredPolls(pollsToShow);
// //     }, [myPolls, activeFilter]);


// //     return (
// //         <div className="bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-200">
// //             {isDesktop ? (
// //                 // --- DESKTOP LAYOUT ---
// //                 <>
// //                     <DesktopNav />
// //                     <div className="px-6 lg:px-24 py-4 text-sm text-gray-500 border-b border-gray-200 dark:border-gray-700">
// //                         <Link to="/dashboard" className="hover:text-pink-500">Home</Link>
// //                         <span className="mx-2">/</span>
// //                         <span className="font-semibold">Polls Activity</span>
// //                     </div>
// //                     <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
// //                         <div className="flex justify-center flex-wrap gap-2 mb-8">
// //                             {filterOptions.map((tab) => (
// //                                 <button
// //                                     key={tab}
// //                                     onClick={() => setActiveFilter(tab)}
// //                                     className={`px-6 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
// //                                         activeFilter === tab
// //                                             ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md"
// //                                             : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700"
// //                                     }`}
// //                                 >
// //                                     {tab}
// //                                 </button>
// //                             ))}
// //                         </div>
// //                         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
// //                             {isLoading ? <InlineLoader text="Loading your polls..." /> : filteredPolls.length > 0 ? (filteredPolls.map((poll) => <MyPollCard key={poll._id} poll={poll} />)) : (<div className="text-center text-gray-500 py-10 col-span-full"><p>You haven't created any polls yet.</p></div>)}
// //                         </div>
// //                     </main>
// //                 </>
// //             ) : (
// //                 // --- MOBILE/TABLET LAYOUT ---
// //                 <div className="mx-auto max-w-4xl">
// //                     <div className="sticky top-0 z-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-700">
// //                         <div className="flex items-center justify-between p-4"><button onClick={() => navigate(-1)}><ArrowLeft className="w-6 h-6 text-gray-700 dark:text-gray-200" /></button><h1 className="text-lg font-semibold">Polls Activity</h1><button onClick={() => navigate('/notifications')}><Bell className="w-6 h-6 text-gray-700 dark:text-gray-200" /></button></div>
// //                         <div className="px-4 pb-4"><div className="flex space-x-2 overflow-x-auto scrollbar-hide">{filterOptions.map((tab) => ( <button key={tab} onClick={() => setActiveFilter(tab)} className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${ activeFilter === tab ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600" }`}>{tab}</button>))}</div></div>
// //                     </div>
// //                     <div className="px-4 pt-4 pb-24 grid grid-cols-1 sm:grid-cols-2 gap-4">
// //                         {isLoading ? <InlineLoader text="Loading your polls..." /> : filteredPolls.length > 0 ? (filteredPolls.map((poll) => <MyPollCard key={poll._id} poll={poll} />)) : (<div className="text-center text-gray-500 dark:text-gray-400 py-10 col-span-1 sm:col-span-2"><p>You haven't created any polls yet.</p></div>)}
// //                     </div>
// //                 </div>
// //             )}
// //         </div>
// //     );
// // }
// import React, { useState, useEffect } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { ArrowLeft, Bell, Loader, Clock } from "lucide-react";
// import apiClient from "../api/axiosConfig";
// import DesktopNav from "../components/layout/DesktopNav";
// import useBreakpoint from "../hooks/useBreakpoint";
// import useAuthStore from "../store/useAuthStore";

// // --- Reusable Poll Card for this Page ---
// const MyPollCard = ({ poll }) => {
//     const navigate = useNavigate();
//     const totalVotes = poll.options.reduce((sum, opt) => sum + opt.votes, 0);

//     // --- Real-time countdown logic ---
//     const [timeLeft, setTimeLeft] = useState("");

//     useEffect(() => {
//         const calculateTimeLeft = () => {
//             const now = new Date();
//             const expiry = new Date(poll.expiresAt);
//             const diff = expiry.getTime() - now.getTime();

//             if (diff <= 0) {
//                 setTimeLeft("Expired");
//                 return null; // Stop the interval
//             }

//             const days = Math.floor(diff / (1000 * 60 * 60 * 24));
//             const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//             const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
//             const seconds = Math.floor((diff % (1000 * 60)) / 1000);

//             if (days > 0) {
//                 setTimeLeft(`${days}d ${hours}h left`);
//             } else if (hours > 0) {
//                 setTimeLeft(`${hours}h ${minutes}m left`);
//             } else if (minutes > 0) {
//                 setTimeLeft(`${minutes}m ${seconds}s left`);
//             } else {
//                 setTimeLeft(`${seconds}s left`);
//             }
//             return diff;
//         };

//         const initialDiff = calculateTimeLeft();
        
//         if (initialDiff > 0) {
//             const intervalId = setInterval(() => {
//                 if (calculateTimeLeft() <= 0) {
//                     clearInterval(intervalId);
//                 }
//             }, 1000);
//             return () => clearInterval(intervalId);
//         }
//     }, [poll.expiresAt]);
//     // --- End of real-time logic ---

//     return (
//         <div 
//             className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden shadow-sm cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
//             onClick={() => navigate(`/analytics/${poll._id}`)}
//         >
//             {poll.imageUrl && (
//                 <img src={poll.imageUrl} alt="Poll" className="w-full h-32 object-cover" />
//             )}
//             <div className="p-5">
//                 <h3 className="font-semibold text-gray-800 dark:text-gray-200 pr-2 mb-4 truncate">
//                     {poll.question}
//                 </h3>
//                 <div className="space-y-3 mb-4">
//                     {poll.options.slice(0, 3).map((option, index) => {
//                         const percent = totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100) : 0;
//                         return (
//                             <div key={option._id || index} className="w-full bg-gray-100 dark:bg-gray-700 rounded-lg h-8 flex items-center relative overflow-hidden">
//                                 <div
//                                     className="h-full rounded-lg bg-gradient-to-r from-cyan-400 to-pink-500"
//                                     style={{ width: `${percent}%`, transition: 'width 0.5s ease-out' }}
//                                 />
//                                 <div className="absolute inset-0 px-3 flex justify-between items-center">
//                                     <span className="text-xs font-medium text-white mix-blend-overlay truncate">{option.text}</span>
//                                     <span className="text-xs font-semibold text-white mix-blend-overlay">{percent}%</span>
//                                 </div>
//                             </div>
//                         );
//                     })}
//                 </div>
//                 <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
//                     <div className="flex items-center gap-1.5">
//                         <Clock size={14} />
//                         <span className={timeLeft === "Expired" ? "text-red-500 font-medium" : ""}>
//                             {timeLeft}
//                         </span>
//                     </div>
//                     <span className="font-semibold">{totalVotes} Votes</span>
//                 </div>
//             </div>
//         </div>
//     );
// };

// // --- Loading Component ---
// const InlineLoader = ({ text }) => (
//     <div className="flex flex-col items-center justify-center gap-6 py-20 col-span-full">
//         <div className="relative w-20 h-20">
//             <div className="absolute inset-0 rounded-full animate-spin" style={{ backgroundImage: "conic-gradient(from 0deg, #20D9E8, #4C9CFA, #E741D2, #7B4CFF, #20D9E8)" }} />
//             <div className="absolute inset-1.5 bg-gray-50 dark:bg-gray-900 rounded-full" />
//         </div>
//         <p className="text-gray-500 dark:text-gray-400 text-lg animate-pulse">{text}</p>
//     </div>
// );

// // --- Main Polls Activity Page ---
// export default function PollActivityPage() {
//     const navigate = useNavigate();
//     const isDesktop = useBreakpoint();
//     const [myPolls, setMyPolls] = useState([]);
//     const [filteredPolls, setFilteredPolls] = useState([]);
//     const [activeFilter, setActiveFilter] = useState("All");
//     const [isLoading, setIsLoading] = useState(true);

//     const filterOptions = ["All", "Live", "Expiring Soon", "Expired"];

//     // Fetch user's polls on mount
//     useEffect(() => {
//         const fetchMyPolls = async () => {
//             setIsLoading(true);
//             try {
//                 const res = await apiClient.get("/api/polls/my-polls");
//                 setMyPolls(res.data);
//             } catch (err) {
//                 console.error("Failed to fetch user polls:", err);
//             } finally {
//                 setIsLoading(false);
//             }
//         };
//         fetchMyPolls();
//     }, []);

//     // Filter logic
//     useEffect(() => {
//         const now = new Date().getTime();
//         const oneDay = 24 * 60 * 60 * 1000;

//         let pollsToShow = [];

//         if (activeFilter === "All") {
//             pollsToShow = myPolls;
//         } else if (activeFilter === "Live") {
//             // --- THIS IS THE FIX ---
//             pollsToShow = myPolls.filter(p => new Date(p.expiresAt).getTime() > now);
//         } else if (activeFilter === "Expiring Soon") {
//             pollsToShow = myPolls.filter(p => {
//                 const expiryTime = new Date(p.expiresAt).getTime();
//                 const diff = expiryTime - now;
//                 return diff > 0 && diff < oneDay;
//             });
//         } else if (activeFilter === "Expired") {
//             pollsToShow = myPolls.filter(p => new Date(p.expiresAt).getTime() <= now);
//         }
        
//         pollsToShow.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//         setFilteredPolls(pollsToShow);
//     }, [myPolls, activeFilter]);


//     return (
//         <div className="bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-200">
//             {isDesktop ? (
//                 // --- DESKTOP LAYOUT ---
//                 <>
//                     <DesktopNav />
//                     <div className="px-6 lg:px-24 py-4 text-sm text-gray-500 border-b border-gray-200 dark:border-gray-700">
//                         <Link to="/dashboard" className="hover:text-pink-500">Home</Link>
//                         <span className="mx-2">/</span>
//                         <span className="font-semibold">Polls Activity</span>
//                     </div>
//                     <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
//                         <div className="flex justify-center flex-wrap gap-2 mb-8">
//                             {filterOptions.map((tab) => (
//                                 <button
//                                     key={tab}
//                                     onClick={() => setActiveFilter(tab)}
//                                     className={`px-6 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
//                                         activeFilter === tab
//                                             ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md"
//                                             : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700"
//                                     }`}
//                                 >
//                                     {tab}
//                                 </button>
//                             ))}
//                         </div>
//                         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                             {isLoading ? <InlineLoader text="Loading your polls..." /> : filteredPolls.length > 0 ? (filteredPolls.map((poll) => <MyPollCard key={poll._id} poll={poll} />)) : (<div className="text-center text-gray-500 py-10 col-span-full"><p>You haven't created any polls yet.</p></div>)}
//                         </div>
//                     </main>
//                 </>
//             ) : (
//                 // --- MOBILE/TABLET LAYOUT ---
//                 <div className="mx-auto max-w-4xl">
//                     <div className="sticky top-0 z-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-700">
//                         <div className="flex items-center justify-between p-4"><button onClick={() => navigate(-1)}><ArrowLeft className="w-6 h-6 text-gray-700 dark:text-gray-200" /></button><h1 className="text-lg font-semibold">Polls Activity</h1><button onClick={() => navigate('/notifications')}><Bell className="w-6 h-6 text-gray-700 dark:text-gray-200" /></button></div>
//                         <div className="px-4 pb-4"><div className="flex space-x-2 overflow-x-auto scrollbar-hide">{filterOptions.map((tab) => ( <button key={tab} onClick={() => setActiveFilter(tab)} className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${ activeFilter === tab ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600" }`}>{tab}</button>))}</div></div>
//                     </div>
//                     <div className="px-4 pt-4 pb-24 grid grid-cols-1 sm:grid-cols-2 gap-4">
//                         {isLoading ? <InlineLoader text="Loading your polls..." /> : filteredPolls.length > 0 ? (filteredPolls.map((poll) => <MyPollCard key={poll._id} poll={poll} />)) : (<div className="text-center text-gray-500 dark:text-gray-400 py-10 col-span-1 sm:col-span-2"><p>You haven't created any polls yet.</p></div>)}
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Bell, Loader, Clock, Inbox, Zap, CheckCircle } from "lucide-react"; 
import apiClient from "../api/axiosConfig";
import DesktopNav from "../components/layout/DesktopNav";
import useBreakpoint from "../hooks/useBreakpoint";
import useAuthStore from "../store/useAuthStore";

// --- Reusable Poll Card for this Page ---
const MyPollCard = ({ poll }) => {
    const navigate = useNavigate();
    const totalVotes = poll.options.reduce((sum, opt) => sum + opt.votes, 0);
    const [timeLeft, setTimeLeft] = useState("");

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date();
            const expiry = new Date(poll.expiresAt);
            const diff = expiry.getTime() - now.getTime();

            if (diff <= 0) {
                setTimeLeft("Expired");
                return null; // Stop the interval
            }
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            if (days > 0) setTimeLeft(`${days}d ${hours}h left`);
            else if (hours > 0) setTimeLeft(`${hours}h ${minutes}m left`);
            else if (minutes > 0) setTimeLeft(`${minutes}m ${seconds}s left`);
            else setTimeLeft(`${seconds}s left`);
            return diff;
        };
        const initialDiff = calculateTimeLeft();
        if (initialDiff > 0) {
            const intervalId = setInterval(() => {
                if (calculateTimeLeft() <= 0) clearInterval(intervalId);
            }, 1000);
            return () => clearInterval(intervalId);
        }
    }, [poll.expiresAt]);

    return (
       <div 
            className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden shadow-sm cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            onClick={() => navigate(`/analytics/${poll._id}`)}
        >
            {poll.imageUrl && (
                <img src={poll.imageUrl} alt="Poll" className="w-full h-32 object-cover" />
            )}
            <div className="p-5">
                <h3 className="font-semibold text-gray-800 dark:text-gray-200 pr-2 mb-4 truncate">
                    {poll.question}
                </h3>
                <div className="space-y-3 mb-4">
                    {poll.options.slice(0, 3).map((option, index) => {
                        const percent = totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100) : 0;
                        return (
                            <div key={option._id || index} className="w-full bg-gray-100 dark:bg-gray-700 rounded-lg h-8 flex items-center relative overflow-hidden">
                                <div className="h-full rounded-lg bg-gradient-to-r from-cyan-400 to-pink-500" style={{ width: `${percent}%`, transition: 'width 0.5s ease-out' }} />
                                <div className="absolute inset-0 px-3 flex justify-between items-center">
                                    <span className="text-xs font-medium text-white mix-blend-overlay truncate">{option.text}</span>
                                    <span className="text-xs font-semibold text-white mix-blend-overlay">{percent}%</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-1.5">
                        <Clock size={14} />
                        <span className={timeLeft === "Expired" ? "text-red-500 font-medium" : ""}>{timeLeft}</span>
                    </div>
                    <span className="font-semibold">{totalVotes} Votes</span>
                </div>
            </div>
        </div>
    );
};

// --- Loading Component ---
const InlineLoader = ({ text }) => (
    <div className="flex flex-col items-center justify-center gap-6 py-20 col-span-full">
        <div className="relative w-20 h-20">
            <div className="absolute inset-0 rounded-full animate-spin" style={{ backgroundImage: "conic-gradient(from 0deg, #20D9E8, #4C9CFA, #E741D2, #7B4CFF, #20D9E8)" }} />
            <div className="absolute inset-1.5 bg-gray-50 dark:bg-gray-900 rounded-full" />
        </div>
        <p className="text-gray-500 dark:text-gray-400 text-lg animate-pulse">{text}</p>
    </div>
);

// --- Smart Empty State Component ---
const EmptyState = ({ filter }) => {
    const messages = {
        'All': "You haven't created any polls yet.",
        'Live': "You do not have any live polls right now.",
        'Expiring Soon': "You do not have any polls expiring soon.",
        'Expired': "You do not have any expired polls."
    };
    
    const icons = {
        'All': <Inbox size={48} className="text-gray-300 dark:text-gray-600 mb-4" />,
        'Live': <Zap size={48} className="text-green-400 dark:text-green-500 mb-4" />,
        'Expiring Soon': <Clock size={48} className="text-orange-400 dark:text-orange-500 mb-4" />,
        'Expired': <CheckCircle size={48} className="text-gray-300 dark:text-gray-600 mb-4" />
    };

    return (
        <div className="col-span-full flex flex-col items-center justify-center py-20 text-center text-gray-500 dark:text-gray-400">
            {icons[filter] || icons['All']}
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
                {/* --- THIS IS THE FIX --- */}
                {messages[filter] ? messages[filter].split('.')[0] : "No Polls Found"}
            </h3>
            <p className="text-sm mt-1">
                {messages[filter] ? messages[filter].split('.').slice(1).join('.') : "Try adjusting your filter."}
            </p>
        </div>
    );
};

// --- Main Polls Activity Page ---
export default function PollActivityPage() {
    const navigate = useNavigate();
    const isDesktop = useBreakpoint();
    const [myPolls, setMyPolls] = useState([]);
    const [filteredPolls, setFilteredPolls] = useState([]);
    const [activeFilter, setActiveFilter] = useState("All");
    const [isLoading, setIsLoading] = useState(true);

    const filterOptions = ["All", "Live", "Expiring Soon", "Expired"];

    useEffect(() => {
        const fetchMyPolls = async () => {
            setIsLoading(true);
            try {
                const res = await apiClient.get("/api/polls/my-polls");
                setMyPolls(res.data);
            } catch (err) {
                console.error("Failed to fetch user polls:", err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchMyPolls();
    }, []);

    // Filter logic
    useEffect(() => {
        const now = new Date().getTime();
        const fiveMinutes = 5 * 60 * 1000; 
        let pollsToShow = [];

        if (activeFilter === "All") {
            pollsToShow = myPolls;
        } else if (activeFilter === "Live") {
            pollsToShow = myPolls.filter(p => new Date(p.expiresAt).getTime() > now);
        } else if (activeFilter === "Expiring Soon") {
            pollsToShow = myPolls.filter(p => {
                const expiryTime = new Date(p.expiresAt).getTime();
                const diff = expiryTime - now;
                return diff > 0 && diff < fiveMinutes;
            });
        } else if (activeFilter === "Expired") {
            pollsToShow = myPolls.filter(p => new Date(p.expiresAt).getTime() <= now);
        }
        
        pollsToShow.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setFilteredPolls(pollsToShow);
    }, [myPolls, activeFilter]);


    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-200">
            {isDesktop ? (
                // --- DESKTOP LAYOUT ---
                <>
                    <DesktopNav />
                    <div className="px-6 lg:px-24 py-4 text-sm text-gray-500 border-b border-gray-200 dark:border-gray-700">
                        <Link to="/dashboard" className="hover:text-pink-500">Home</Link>
                        <span className="mx-2">/</span>
                        <span className="font-semibold">Polls Activity</span>
                    </div>
                    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
                        <div className="flex justify-center flex-wrap gap-2 mb-8">
                            {filterOptions.map((tab) => ( <button key={tab} onClick={() => setActiveFilter(tab)} className={`px-6 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${ activeFilter === tab ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md" : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700" }`}>{tab}</button>))}
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {isLoading ? (
                                <InlineLoader text="Loading your polls..." />
                            ) : filteredPolls.length > 0 ? (
                                filteredPolls.map((poll) => <MyPollCard key={poll._id} poll={poll} />)
                            ) : (
                                <EmptyState filter={activeFilter} />
                            )}
                        </div>
                    </main>
                </>
            ) : (
                // --- MOBILE/TABLET LAYOUT ---
                <div className="mx-auto max-w-4xl">
                    <div className="sticky top-0 z-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-700">
                        <div className="flex items-center justify-between p-4"><button onClick={() => navigate(-1)}><ArrowLeft className="w-6 h-6 text-gray-700 dark:text-gray-200" /></button><h1 className="text-lg font-semibold">Polls Activity</h1><button onClick={() => navigate('/notifications')}><Bell className="w-6 h-6 text-gray-700 dark:text-gray-200" /></button></div>
                        <div className="px-4 pb-4"><div className="flex space-x-2 overflow-x-auto scrollbar-hide">{filterOptions.map((tab) => ( <button key={tab} onClick={() => setActiveFilter(tab)} className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${ activeFilter === tab ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600" }`}>{tab}</button>))}</div></div>
                    </div>
                    <div className="px-4 pt-4 pb-24 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {isLoading ? (
                            <InlineLoader text="Loading your polls..." />
                        ) : filteredPolls.length > 0 ? (
                            filteredPolls.map((poll) => <MyPollCard key={poll._id} poll={poll} />)
                        ) : (
                            <EmptyState filter={activeFilter} />
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}