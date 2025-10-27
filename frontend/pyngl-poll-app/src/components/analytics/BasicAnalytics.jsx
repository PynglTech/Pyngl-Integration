// // import React, { useEffect, useState } from "react";
// // import { useParams, useNavigate } from "react-router-dom";
// // import { ArrowLeft, Bell } from "lucide-react";
// // import apiClient from "../../api/axiosConfig";
// // import useNotificationStore from "../../store/useNotificationStore";
// // // -----------------------------------------------------------

// // const enhancePollDataDynamic = (rawData) => {
// //   const now = new Date();
// //   const expiresDate = rawData.expiresAt ? new Date(rawData.expiresAt) : now;
// //   const timeDiffMs = expiresDate.getTime() - now.getTime();
// //   let timeLeftDisplay = "0s";

// //   if (timeDiffMs <= 0) {
// //     timeLeftDisplay = "Expired";
// //   } else {
// //     const days = Math.floor(timeDiffMs / (1000 * 60 * 60 * 24));
// //     const hours = Math.floor((timeDiffMs / (1000 * 60 * 60)) % 24);
// //     const minutes = Math.floor((timeDiffMs / (1000 * 60)) % 60);

// //     if (days >= 1) {
// //       timeLeftDisplay = `${days} day${days > 1 ? "s" : ""} left`;
// //     } else if (hours >= 1) {
// //       timeLeftDisplay = `${hours}h ${minutes}m left`;
// //     } else {
// //       timeLeftDisplay = `${minutes}m left`;
// //     }
// //   }

// //   return {
// //     ...rawData,
// //     views: rawData.views || 0,
// //     clicks: rawData.totalVotes || 0,
// //     totalVotes: rawData.totalVotes || 0,
// //     responseRate:
// //       rawData.views > 0
// //         ? ((rawData.totalVotes / rawData.views) * 100).toFixed(2) + "%"
// //         : "0%",
// //     avgTime:
// //       rawData.totalVotes > 0
// //         ? `${Math.round(rawData.totalTimeSpent / rawData.totalVotes)}s`
// //         : "0s",
// //     platformBreakdown: rawData.platformBreakdown || {},
// //     browserBreakdown: rawData.browserBreakdown || {},
// //     deviceBreakdown: rawData.deviceBreakdown || {},
// //     earlyVoters: rawData.earlyVoters || 0,
// //     lateVoters: rawData.lateVoters || 0,
// //     completed: rawData.completed || 0,
// //     daysLeft: timeLeftDisplay,
// //     msLeft: Math.max(0, timeDiffMs),
// //   };
// // };

// // const platformColors = {
// //   Instagram: "bg-pink-500",
// //   LinkedIn: "bg-blue-600",
// //   WhatsApp: "bg-green-500",
// //   Twitter: "bg-blue-400",
// //   Youtube: "bg-red-500",
// //   Telegram: "bg-sky-500",
// //   iMessages: "bg-indigo-500",
// //   Gmail: "bg-yellow-500",
// //   Messages: "bg-purple-500",
// //   Facebook: "bg-blue-700",
// // };

// // // -----------------------------------------------------------

// // const BasicAnalytics = () => {
// //   const { pollId } = useParams();
// //   let navigate = useNavigate();

// //   const [poll, setPoll] = useState(null);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     const fetchAnalytics = async () => {
// //       try {
// //         const res = await apiClient.get(`/api/polls/${pollId}/analytics`);
// //         const enhancedData = enhancePollDataDynamic(res.data);
// //         setPoll(enhancedData);
// //       } catch (err) {
// //         console.error("Failed to fetch analytics:", err);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     fetchAnalytics();
// //   }, [pollId]);

// //   if (loading) {
// //     return <div className="text-center py-10 dark:text-gray-300">Loading analytics...</div>;
// //   }

// //   if (!poll) {
// //     return <div className="text-center py-10 dark:text-gray-300">No analytics found.</div>;
// //   }

// //   // ---- Sub components ----
// //   const PlatformRow = ({ name, percentage, color }) => (
// //     <div className="flex flex-col justify-start py-4">
// //       <div className="flex items-center space-x-3 justify-between">
// //         <div className="flex items-center justify-center gap-3">
// //           {name && <img src={`/icons/${name}.svg`} alt={name} className="w-5 h-5" />}
// //           <span className="text-gray-900 dark:text-gray-100 font-medium">{name}</span>
// //         </div>
// //         <div className="flex items-center justify-center">
// //           <span className="text-gray-900 dark:text-gray-100 font-semibold w-8 text-right">
// //             {percentage}%
// //           </span>
// //         </div>
// //       </div>
// //       <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 shadow-inner mt-3">
// //         <div
// //           className={`h-4 rounded-full transition-all duration-300 shadow-sm ${color}`}
// //           style={{
// //             width: `${Math.min(100, Math.max(0, percentage))}%`,
// //           }}
// //         />
// //       </div>
// //     </div>
// //   );

// //   return (
// //     <div className="mx-auto bg-white dark:bg-gray-900 min-h-screen w-full md:w-7/6 lg:w-4/5 xl:w-3/4 2xl:w-2/3 transition-all duration-300 pb-28">
// //   {/* Header */}
// //   <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-700">
// //     <div className="flex items-center justify-between p-4">
// //       <button onClick={() => navigate(-1)} className="p-1">
// //         <ArrowLeft className="w-6 h-6 text-gray-700 dark:text-gray-200" />
// //       </button>
// //       <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
// //         Basic analytics
// //       </h1>
// //      <button onClick={() => navigate("/notifications")} className="relative p-1">
// //                              <Bell className="w-6 h-6" />
      
// //        </button>
// //     </div>
// //   </div>

// //   {/* Poll Question */}
// //   <div className="px-4 py-6 border-b border-gray-100 dark:border-gray-700">
// //     <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
// //       {poll.question}
// //     </h2>
// //     <div className="flex items-center space-x-2">
// //       <div
// //         className={`w-2 h-2 rounded-full ${
// //           poll.msLeft === 0
// //             ? "bg-gray-400"
// //             : poll.msLeft < 1000 * 60 * 60
// //             ? "bg-red-500"
// //             : poll.msLeft < 1000 * 60 * 60 * 24
// //             ? "bg-orange-500"
// //             : "bg-green-500"
// //         }`}
// //       ></div>
// //       <span className="text-sm text-gray-600 dark:text-gray-400">{poll.daysLeft}</span>
// //     </div>
// //   </div>

// //   {/* Two-column layout */}
// //   <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 py-6">
// //     {/* Left Column */}
// //     <div className="space-y-6">
// //       {/* Stats Cards: Views & Clicks */}
// //       <div className="grid grid-cols-2 gap-4">
// //         <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 text-start">
// //           <div className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">
// //             {poll.views?.toLocaleString()}
// //           </div>
// //           <div className="text-sm text-gray-500 dark:text-gray-400">Views</div>
// //         </div>
// //         <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 text-start">
// //           <div className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">
// //             {poll.clicks?.toLocaleString()}
// //           </div>
// //           <div className="text-sm text-gray-500 dark:text-gray-400">Clicks</div>
// //         </div>
// //       </div>

// //       {/* Platform Breakdown */}
// // <div className="bg-white dark:bg-gray-800 px-6 py-6 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm">
// //   {/* Total Votes at the top */}
// //   <div className="text-center mb-6">
// //     <div className="text-5xl font-bold text-gray-900 dark:text-gray-100 mb-2">
// //       {poll.totalVotes?.toLocaleString()}
// //     </div>
// //     <div className="text-gray-500 dark:text-gray-400">Total Votes</div>
// //   </div>

// //   {/* Platform Breakdown */}
// //   <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
// //     Platform Breakdown
// //   </h4>
// //   {poll.platformBreakdown &&
// //     Object.entries(poll.platformBreakdown).map(([name, count]) => {
// //       const total = poll.totalVotes || 1;
// //       const percentage = Math.round((count / total) * 100);
// //       return (
// //         <PlatformRow
// //           key={name}
// //           name={name}
// //           percentage={percentage}
// //           color={platformColors[name] || "bg-gray-400"}
// //         />
// //       );
// //     })}
// // </div>

// //     </div>

// //     {/* Right Column */}
// //     <div className="space-y-6">
// //       {/* Real-time Analytics */}
// //       <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 border border-purple-100 dark:border-gray-600">
// //         <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
// //           Real-time Analytics
// //         </h3>
// //         <div className="grid grid-cols-3 gap-4 text-center">
// //           <div>
// //             <div className="text-2xl font-bold text-pink-500 mb-1">{poll.responseRate}</div>
// //             <div className="text-xs text-gray-600 dark:text-gray-400">Response Rate</div>
// //           </div>
// //           <div>
// //             <div className="text-2xl font-bold text-pink-500 mb-1">{poll.completed}</div>
// //             <div className="text-xs text-gray-600 dark:text-gray-400">Viewers completed</div>
// //           </div>
// //           <div>
// //             <div className="text-2xl font-bold text-pink-500 mb-1">{poll.avgTime}</div>
// //             <div className="text-xs text-gray-600 dark:text-gray-400">Avg. Time</div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Early vs Late Voters */}
// //       <div className="bg-white dark:bg-gray-800 px-6 py-6 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm">
// //         <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">
// //           Early vs Late Voters
// //         </h3>
// //         <div className="grid grid-cols-2 gap-4">
// //           {["earlyVoters", "lateVoters"].map((type) => {
// //             const count = poll[type];
// //             const totalVotes = poll.earlyVoters + poll.lateVoters;
// //             const percentage = totalVotes > 0 ? (count / totalVotes) * 100 : 0;
// //             const label = type === "earlyVoters" ? "First half" : "Second half";

// //             return (
// //               <div
// //                 key={type}
// //                 className="text-center bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-700 dark:to-gray-600 rounded-2xl p-6 border border-purple-100 dark:border-gray-600"
// //               >
// //                 <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">{label}</div>
// //                 <div className="text-3xl font-bold text-pink-500 mb-1">{percentage.toFixed(1)}%</div>
// //                 <div className="text-sm text-gray-700 dark:text-gray-300">{count?.toLocaleString()} Votes</div>
// //               </div>
// //             );
// //           })}
// //         </div>
// //       </div>

// //       {/* Device & Browser Breakdown */}
// //       <div className="bg-white dark:bg-gray-800 px-6 py-6 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm">
// //         <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
// //           Device Breakdown
// //         </h4>
// //         <div className="flex flex-wrap gap-2">
// //           {poll.deviceBreakdown &&
// //             Object.entries(poll.deviceBreakdown).map(([name, count]) => {
// //               const total = poll.totalVotes || 1;
// //               const percentage = Math.round((count / total) * 100);
// //               return (
// //                 <div
// //                   key={name}
// //                   className="border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 px-4 py-2 rounded-full text-sm font-medium"
// //                 >
// //                   🌐 {name} {percentage}%
// //                 </div>
// //               );
// //             })}
// //         </div>

// //         <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 mt-4">
// //           Browser Breakdown
// //         </h4>
// //         <div className="flex flex-wrap gap-2">
// //           {poll.browserBreakdown &&
// //             Object.entries(poll.browserBreakdown).map(([name, count]) => {
// //               const total = poll.totalVotes || 1;
// //               const percentage = Math.round((count / total) * 100);
// //               return (
// //                 <div
// //                   key={name}
// //                   className="border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 px-4 py-2 rounded-full text-sm font-medium"
// //                 >
// //                   🌐 {name} {percentage}%
// //                 </div>
// //               );
// //             })}
// //         </div>
// //       </div>
// //     </div>
// //   </div>

// //   {/* Upgrade CTA at bottom */}
// //   <div className="bg-gradient-to-r from-purple-100 to-blue-100 dark:from-gray-800 dark:to-gray-700 mx-4 my-6 rounded-2xl p-6 text-center">
// //     <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
// //       Unlock advanced analytics in Plus
// //     </h3>
// //     <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
// //       Get real-time insights, demographics, and export features
// //     </p>
// //     <button className="bg-pink-500 text-white px-8 py-3 rounded-2xl font-semibold text-sm">
// //       Upgrade Now
// //     </button>
// //   </div>
// //     </div>
// //   );
// // };

// // export default BasicAnalytics;
// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate, Link } from "react-router-dom";
// import { ArrowLeft, Bell } from "lucide-react";
// import apiClient from "../../api/axiosConfig";
// import useNotificationStore from "../../store/useNotificationStore";
// import DesktopNav from "../layout/DesktopNav";
// import useBreakpoint from "../../hooks/useBreakpoint";

// // Your original data processing function - UNCHANGED
// const enhancePollDataDynamic = (rawData) => {
//     const now = new Date();
//     const expiresDate = rawData.expiresAt ? new Date(rawData.expiresAt) : now;
//     const timeDiffMs = expiresDate.getTime() - now.getTime();
//     let timeLeftDisplay = "0s";

//     if (timeDiffMs <= 0) {
//         timeLeftDisplay = "Expired";
//     } else {
//         const days = Math.floor(timeDiffMs / (1000 * 60 * 60 * 24));
//         const hours = Math.floor((timeDiffMs / (1000 * 60 * 60)) % 24);
//         const minutes = Math.floor((timeDiffMs / (1000 * 60)) % 60);

//         if (days >= 1) {
//             timeLeftDisplay = `${days} day${days > 1 ? "s" : ""} left`;
//         } else if (hours >= 1) {
//             timeLeftDisplay = `${hours}h ${minutes}m left`;
//         } else {
//             timeLeftDisplay = `${minutes}m left`;
//         }
//     }

//     return {
//         ...rawData,
//         views: rawData.views || 0,
//         clicks: rawData.totalVotes || 0,
//         totalVotes: rawData.totalVotes || 0,
//         responseRate:
//             rawData.views > 0
//                 ? ((rawData.totalVotes / rawData.views) * 100).toFixed(2) + "%"
//                 : "0%",
//         avgTime:
//             rawData.totalVotes > 0
//                 ? `${Math.round(rawData.totalTimeSpent / rawData.totalVotes)}s`
//                 : "0s",
//         platformBreakdown: rawData.platformBreakdown || {},
//         browserBreakdown: rawData.browserBreakdown || {},
//         deviceBreakdown: rawData.deviceBreakdown || {},
//         earlyVoters: rawData.earlyVoters || 0,
//         lateVoters: rawData.lateVoters || 0,
//         completed: rawData.completed || 0,
//         daysLeft: timeLeftDisplay,
//         msLeft: Math.max(0, timeDiffMs),
//     };
// };

// const platformColors = {
//     Instagram: "bg-pink-500",
//     LinkedIn: "bg-blue-600",
//     WhatsApp: "bg-green-500",
//     Twitter: "bg-blue-400",
//     Youtube: "bg-red-500",
//     Telegram: "bg-sky-500",
//     iMessages: "bg-indigo-500",
//     Gmail: "bg-yellow-500",
//     Messages: "bg-purple-500",
//     Facebook: "bg-blue-700",
// };

// const BasicAnalytics = () => {
//     const { pollId } = useParams();
//     let navigate = useNavigate();
//     const { unreadCount } = useNotificationStore();
//     const isDesktop=useBreakpoint();
//     const [poll, setPoll] = useState(null);
//     const [loading, setLoading] = useState(true);

//     // Your original data fetching logic - UNCHANGED
//     useEffect(() => {
//         const fetchAnalytics = async () => {
//             try {
//                 const res = await apiClient.get(`/api/polls/${pollId}/analytics`);
//                 const enhancedData = enhancePollDataDynamic(res.data);
//                 setPoll(enhancedData);
//             } catch (err) {
//                 console.error("Failed to fetch analytics:", err);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchAnalytics();
//     }, [pollId]);

//     if (loading) {
//         return (
//             <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-900">
//                 <p className="text-center text-gray-500 dark:text-gray-400">Loading analytics...</p>
//             </div>
//         );
//     }

//     if (!poll) {
//         return (
//              <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-900">
//                 <p className="text-center text-gray-500 dark:text-gray-400">No analytics found for this poll.</p>
//             </div>
//         );
//     }
// const StatCard = ({ label, value }) => (
//     <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
//         <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
//         <p className="text-4xl font-bold text-gray-800 dark:text-white mt-1">{value}</p>
//     </div>
// );
// const BreakdownCard = ({ title, children }) => (
//     <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
//         <h3 className="text-lg font-semibold mb-4">{title}</h3>
//         {children}
//     </div>
// );
// const PlatformRowDesktop = ({ name, percentage, color }) => (
//     <div className="flex items-center space-x-3 mb-3">
//         <img src={`/icons/${name.toLowerCase()}.svg`} alt={name} className="w-5 h-5" />
//         <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
//             <div className={`${color} h-2.5 rounded-full`} style={{ width: `${percentage}%` }}></div>
//         </div>
//         <span className="text-sm font-semibold w-10 text-right text-gray-600 dark:text-gray-300">{percentage}%</span>
//     </div>
// );
// const InlineLoader = ({ text }) => (
//     <div className="flex flex-col items-center justify-center gap-6 py-20 col-span-full">
//         <div className="relative w-20 h-20">
//             <div className="absolute inset-0 rounded-full animate-spin" style={{ backgroundImage: "conic-gradient(from 0deg, #20D9E8, #4C9CFA, #E741D2, #7B4CFF, #20D9E8)" }} />
//             <div className="absolute inset-1.5 bg-gray-50 dark:bg-gray-900 rounded-full" />
//         </div>
//         <p className="text-gray-500 dark:text-gray-400 text-lg animate-pulse">{text}</p>
//     </div>
// );

//     // PlatformRow sub-component styled to match the new layout
//     const PlatformRow = ({ name, percentage, color }) => (
//         <div className="flex flex-col justify-start py-4">
//             <div className="flex items-center space-x-3 justify-between">
//                 <div className="flex items-center justify-center gap-3">
//                     {name && (
//                         <img src={`/icons/${name}.svg`} alt={name} className="w-5 h-5" />
//                     )}
//                     <span className="text-gray-900 dark:text-gray-100 font-medium">
//                         {name}
//                     </span>
//                 </div>
//                 <div className="flex items-center justify-center">
//                     <span className="text-gray-900 dark:text-gray-100 font-semibold w-8 text-right">
//                         {percentage}%
//                     </span>
//                 </div>
//             </div>
//             <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 shadow-inner mt-3">
//                 <div
//                     className={`h-4 rounded-full transition-all duration-300 shadow-sm ${color}`}
//                     style={{
//                         width: `${Math.min(100, Math.max(0, percentage))}%`,
//                     }}
//                 />
//             </div>
//         </div>
//     );

//     return (
//         // NEW LAYOUT: Applied from your friend's code
//         <div className="mx-auto bg-white dark:bg-gray-900 min-h-screen w-full md:w-7/6 lg:w-4/5 xl:w-3/4 2xl:w-2/3 transition-all duration-300 pb-28">
//             {/* Header */}
//             <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-700">
//                 <div className="flex items-center justify-between p-4">
//                     <button onClick={() => navigate(-1)} className="p-1">
//                         <ArrowLeft className="w-6 h-6 text-gray-700 dark:text-gray-200" />
//                     </button>
//                     <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
//                         Basic analytics
//                     </h1>
//                     <button onClick={() => navigate("/notifications")} className="relative p-1">
//                         <Bell className="w-6 h-6" />
//                         {unreadCount > 0 && (
//                             <span className="absolute top-0 right-0 flex h-2 w-2">
//                                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
//                                 <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500"></span>
//                             </span>
//                         )}
//                     </button>
//                 </div>
//             </div>

//             {/* Poll Question */}
//             <div className="px-4 py-6 mx-4 border-b border-gray-100 dark:border-gray-700">
//                 <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
//                     {poll.question}
//                 </h2>
//                 <div className="flex items-center space-x-2">
//                     <div className={`w-2 h-2 rounded-full ${poll.msLeft === 0 ? "bg-gray-400" : poll.msLeft < 1000 * 60 * 60 ? "bg-red-500" : poll.msLeft < 1000 * 60 * 60 * 24 ? "bg-orange-500" : "bg-green-500"}`}></div>
//                     <span className="text-sm text-gray-600 dark:text-gray-400">
//                         {poll.daysLeft}
//                     </span>
//                 </div>
//             </div>

//             {/* Two-column layout */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 py-6">
//                 {/* Left Column */}
//                 <div className="space-y-6">
//                     {/* Stats Cards: Views & Clicks */}
//                     <div className="grid grid-cols-2 gap-4">
//                         <div className="border border-gray-200 dark:border-gray-700 rounded-3xl p-6 text-start">
//                             <div className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">
//                                 {poll.views?.toLocaleString()}
//                             </div>
//                             <div className="text-sm text-gray-500 dark:text-gray-400">
//                                 Views
//                             </div>
//                         </div>
//                         <div className="border border-gray-200 dark:border-gray-700 rounded-3xl p-6 text-start">
//                             <div className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">
//                                 {poll.clicks?.toLocaleString()}
//                             </div>
//                             <div className="text-sm text-gray-500 dark:text-gray-400">
//                                 Clicks
//                             </div>
//                         </div>
//                     </div>

//                     {/* Platform Breakdown */}
//                     <div className="bg-white dark:bg-gray-800 px-6 py-6 border border-gray-200 dark:border-gray-700 rounded-3xl shadow-sm">
//                         <div className="text-center mb-6">
//                             <div className="text-5xl font-bold text-gray-900 dark:text-gray-100 mb-2">
//                                 {poll.totalVotes?.toLocaleString()}
//                             </div>
//                             <div className="text-gray-500 dark:text-gray-400">
//                                 Total Votes
//                             </div>
//                         </div>

//                         <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
//                             Platform Breakdown
//                         </h4>
//                         {poll.platformBreakdown && Object.entries(poll.platformBreakdown).length > 0 ? (
//                             Object.entries(poll.platformBreakdown).map(([name, count]) => {
//                                 const total = poll.totalVotes || 1;
//                                 const percentage = Math.round((count / total) * 100);
//                                 return (
//                                     <PlatformRow
//                                         key={name}
//                                         name={name}
//                                         percentage={percentage}
//                                         color={platformColors[name] || "bg-gray-400"}
//                                     />
//                                 );
//                             })
//                         ) : (
//                             <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">No platform data available.</p>
//                         )}
//                     </div>
//                 </div>

//                 {/* Right Column */}
//                 <div className="space-y-6">
//                     {/* Real-time Analytics */}
//                     <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-700 rounded-3xl p-6 border border-purple-100 dark:border-gray-600">
//                         <div className="flex items-center justify-between mb-4">
//                             <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
//                                 Real-time Analytics
//                             </h3>
//                             <img src="/graph.svg" alt="logo" className="w-6 h-6" />
//                         </div>
//                         <div className="grid grid-cols-3 gap-4 text-center">
//                             <div>
//                                 <div className="text-2xl font-bold text-pink-500 mb-1">
//                                     {poll.responseRate}
//                                 </div>
//                                 <div className="text-xs text-gray-600 dark:text-gray-400">
//                                     Response Rate
//                                 </div>
//                             </div>
//                             <div>
//                                 <div className="text-2xl font-bold text-pink-500 mb-1">
//                                     {poll.completed}
//                                 </div>
//                                 <div className="text-xs text-gray-600 dark:text-gray-400">
//                                     Viewers completed
//                                 </div>
//                             </div>
//                             <div>
//                                 <div className="text-2xl font-bold text-pink-500 mb-1">
//                                     {poll.avgTime}
//                                 </div>
//                                 <div className="text-xs text-gray-600 dark:text-gray-400">
//                                     Avg. Time
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Early vs Late Voters */}
//                     <div className="bg-white dark:bg-gray-800 px-6 py-6 border border-gray-100 dark:border-gray-700 rounded-3xl shadow-sm">
//                         <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">
//                             Early vs Late Voters
//                         </h3>
//                         <div className="grid grid-cols-2 gap-4">
//                             {["earlyVoters", "lateVoters"].map((type) => {
//                                 const count = poll[type];
//                                 const totalVotes = poll.earlyVoters + poll.lateVoters;
//                                 const percentage = totalVotes > 0 ? (count / totalVotes) * 100 : 0;
//                                 const label = type === "earlyVoters" ? "First half" : "Second half";
//                                 return (
//                                     <div key={type} className="text-start bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-700 dark:to-gray-600 rounded-2xl p-6 border border-purple-100 dark:border-gray-600">
//                                         <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
//                                             {label}
//                                         </div>
//                                         <div className="text-3xl font-bold text-pink-500 mb-1">
//                                             {percentage.toFixed(1)}%
//                                         </div>
//                                         <div className="text-sm text-gray-700 dark:text-gray-300">
//                                             {count?.toLocaleString()} Votes
//                                         </div>
//                                     </div>
//                                 );
//                             })}
//                         </div>
//                     </div>

//                     {/* Device & Browser Breakdown */}
//                     <div className="bg-white dark:bg-gray-800 px-6 py-6 border border-gray-100 dark:border-gray-700 rounded-3xl shadow-sm">
//                         <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
//                             Device Breakdown
//                         </h4>
//                         <div className="flex flex-wrap gap-2">
//                             {poll.deviceBreakdown && Object.entries(poll.deviceBreakdown).length > 0 ? (
//                                 Object.entries(poll.deviceBreakdown).map(([name, count]) => {
//                                     const total = poll.totalVotes || 1;
//                                     const percentage = Math.round((count / total) * 100);
//                                     return (
//                                         <div key={name} className="border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 px-4 py-2 rounded-full text-sm font-medium">
//                                             {name} {percentage}%
//                                         </div>
//                                     );
//                                 })
//                              ) : (
//                                 <p className="text-sm text-gray-500 dark:text-gray-400">No device data.</p>
//                              )}
//                         </div>
//                         <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 mt-4">
//                             Browser Breakdown
//                         </h4>
//                         <div className="flex flex-wrap gap-2">
//                              {poll.browserBreakdown && Object.entries(poll.browserBreakdown).length > 0 ? (
//                                 Object.entries(poll.browserBreakdown).map(([name, count]) => {
//                                     const total = poll.totalVotes || 1;
//                                     const percentage = Math.round((count / total) * 100);
//                                     return (
//                                         <div key={name} className="border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 px-4 py-2 rounded-full text-sm font-medium">
//                                             {name} {percentage}%
//                                         </div>
//                                     );
//                                 })
//                              ) : (
//                                 <p className="text-sm text-gray-500 dark:text-gray-400">No browser data.</p>
//                              )}
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Upgrade CTA at bottom */}
//             <div className="bg-gradient-to-r from-purple-100 to-blue-100 dark:from-gray-800 dark:to-gray-700 mx-4 rounded-3xl p-6 text-center">
//                 <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
//                     Unlock advanced analytics in Plus
//                 </h3>
//                 <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
//                     Get real-time insights, demographics, and export features
//                 </p>
//                 <button className="bg-pink-500 text-white px-8 py-3 rounded-2xl font-semibold text-sm">
//                     Upgrade Now
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default BasicAnalytics;

import React, { useEffect, useState } from "react";
import { ArrowLeft, Bell } from "lucide-react";
import { useNavigate, useParams, Link } from 'react-router-dom';
import apiClient from '../../api/axiosConfig';
import DesktopNav from "../layout/DesktopNav";
import useBreakpoint from "../../hooks/useBreakpoint"; 
import useNotificationStore from "../../store/useNotificationStore";

// --- Data Processing Function (Unchanged) ---
const enhancePollDataDynamic = (rawData) => {
    const now = new Date();
    const expiresDate = rawData.expiresAt ? new Date(rawData.expiresAt) : now;
    const timeDiffMs = expiresDate.getTime() - now.getTime();
    let timeLeftDisplay = "Expired";

    if (timeDiffMs > 0) {
        const days = Math.floor(timeDiffMs / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiffMs / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((timeDiffMs / (1000 * 60)) % 60);

        if (days >= 1) timeLeftDisplay = `${days} day${days > 1 ? "s" : ""} left`;
        else if (hours >= 1) timeLeftDisplay = `${hours}h ${minutes}m left`;
        else timeLeftDisplay = `${minutes}m left`;
    }

    const totalVotes = rawData.totalVotes || 0;
    
    return {
        ...rawData,
        views: rawData.views || 0,
        clicks: totalVotes,
        totalVotes: totalVotes,
        responseRate: rawData.views > 0 ? `${((totalVotes / rawData.views) * 100).toFixed(1)}%` : "0%",
        avgTime: totalVotes > 0 ? `${Math.round(rawData.totalTimeSpent / totalVotes)}s` : "0s",
        platformBreakdown: rawData.platformBreakdown || {},
        browserBreakdown: rawData.browserBreakdown || {},
        deviceBreakdown: rawData.deviceBreakdown || {},
        earlyVoters: rawData.earlyVoters || 0,
        lateVoters: rawData.lateVoters || 0,
        completed: rawData.completed || 0,
        daysLeft: timeLeftDisplay,
        msLeft: Math.max(0, timeDiffMs),
    };
};

// --- Styling Helpers (Unchanged) ---
const platformColors = {
    Instagram: "bg-pink-500",
    LinkedIn: "bg-blue-600",
    WhatsApp: "bg-green-500",
    Twitter: "bg-blue-400",
    Youtube: "bg-red-500",
    Telegram: "bg-sky-500",
    iMessages: "bg-indigo-500",
    Gmail: "bg-yellow-500",
    Messages: "bg-purple-500",
    Facebook: "bg-blue-700",
};

// --- Reusable Components for Desktop Layout ---
const StatCard = ({ label, value }) => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
        <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
        <p className="text-4xl font-bold text-gray-800 dark:text-white mt-1">{value}</p>
    </div>
);

const BreakdownCard = ({ title, children, className = "" }) => (
    <div className={`bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 ${className}`}>
        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">{title}</h3>
        {children}
    </div>
);

const PlatformRowDesktop = ({ name, percentage, color }) => (
    <div className="flex items-center space-x-3 mb-3">
        <img src={`/icons/${name.toLowerCase()}.svg`} alt={name} className="w-5 h-5" />
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
            <div className={`${color} h-2.5 rounded-full`} style={{ width: `${percentage}%` }}></div>
        </div>
        <span className="text-sm font-semibold w-10 text-right text-gray-600 dark:text-gray-300">{percentage}%</span>
    </div>
);

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

// --- Main Analytics Component ---
export default function BasicAnalytics() {
    const { pollId } = useParams();
    let navigate = useNavigate();
    const { unreadCount } = useNotificationStore();
    const isDesktop = useBreakpoint();
    const [poll, setPoll] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAnalytics = async () => {
            setLoading(true);
            try {
                const res = await apiClient.get(`/api/polls/${pollId}/analytics`);
                setPoll(enhancePollDataDynamic(res.data));
            } catch (err) {
                console.error("Failed to fetch analytics:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchAnalytics();
    }, [pollId]);

    // PlatformRow sub-component for Mobile
    const PlatformRow = ({ name, percentage, color }) => (
        <div className="flex flex-col justify-start py-4">
            <div className="flex items-center space-x-3 justify-between">
                <div className="flex items-center justify-center gap-3">
                    {name && (<img src={`/icons/${name}.svg`} alt={name} className="w-5 h-5" />)}
                    <span className="text-gray-900 dark:text-gray-100 font-medium">{name}</span>
                </div>
                <div className="flex items-center justify-center">
                    <span className="text-gray-900 dark:text-gray-100 font-semibold w-8 text-right">{percentage}%</span>
                </div>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 shadow-inner mt-3">
                <div className={`h-4 rounded-full transition-all duration-300 shadow-sm ${color}`} style={{ width: `${Math.min(100, Math.max(0, percentage))}%` }} />
            </div>
        </div>
    );

    if (loading) return <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900"><InlineLoader text="Loading Analytics..." /></div>;
    if (!poll) return <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900"><p className="text-center">No analytics found for this poll.</p></div>;

    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-200">
            {isDesktop ? (
                // --- DESKTOP LAYOUT ---
                <>
                    <DesktopNav />
                    <div className="px-6 lg:px-24 py-4 text-sm text-gray-500 border-b border-gray-200 dark:border-gray-700">
                        <Link to="/analytics" className="hover:text-pink-500">Analytics</Link>
                        <span className="mx-2">&gt;</span>
                    </div>
                    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
                        <div className="mb-8">
                            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">{poll.question}</h2>
                            <div className="flex items-center gap-2 mt-2">
                                <div className={`w-2.5 h-2.5 rounded-full ${poll.msLeft === 0 ? "bg-gray-400" : "bg-red-500 animate-pulse"}`}></div>
                                <span className="text-sm text-gray-500 dark:text-gray-400">Live · {poll.daysLeft}</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-2 space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <StatCard label="Views" value={poll.views?.toLocaleString()} />
                                    <StatCard label="Clicks" value={poll.clicks?.toLocaleString()} />
                                </div>
                                <BreakdownCard title="Platform Breakdown">
                                    <div className="text-center mb-6"><p className="text-5xl font-bold text-gray-800 dark:text-white">{poll.totalVotes?.toLocaleString()}</p><p className="text-gray-500 dark:text-gray-400">Total Votes</p></div>
                                    <div className="space-y-2">
                                        {Object.entries(poll.platformBreakdown).length > 0 ? (Object.entries(poll.platformBreakdown).map(([name, count]) => (<PlatformRowDesktop key={name} name={name} percentage={Math.round((count / poll.totalVotes) * 100)} color={platformColors[name] || 'bg-gray-400'} />))) : (<p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">No platform data.</p>)}
                                    </div>
                                </BreakdownCard>
                            </div>

                            <div className="space-y-6">
                                <BreakdownCard title="Early vs Late Voters">
                                    <div className="grid grid-cols-2 gap-4">
                                        {[ { type: 'earlyVoters', label: 'First half' }, { type: 'lateVoters', label: 'Second half' } ].map(({type, label}) => {
                                            const count = poll[type]; const total = (poll.earlyVoters || 0) + (poll.lateVoters || 0); const percentage = total > 0 ? (count / total) * 100 : 0;
                                            return (<div key={type} className="text-left bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-700 dark:to-gray-600 rounded-xl p-4"><p className="text-xs text-gray-600 dark:text-gray-400">{label}</p><p className="text-2xl font-bold text-pink-500 mt-1">{percentage.toFixed(1)}%</p><p className="text-xs text-gray-700 dark:text-gray-300">{count?.toLocaleString()} Votes</p></div>);
                                        })}
                                    </div>
                                </BreakdownCard>
                                <BreakdownCard title="Device Breakdown">
                                    <div className="flex flex-wrap gap-2">{Object.entries(poll.deviceBreakdown).length > 0 ? (Object.entries(poll.deviceBreakdown).map(([name, count]) => (<div key={name} className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-3 py-1.5 rounded-full text-sm font-medium">{name} {Math.round((count / poll.totalVotes) * 100)}%</div>))) : (<p className="text-sm text-gray-500 dark:text-gray-400">No device data.</p>)}</div>
                                </BreakdownCard>
                                <BreakdownCard title="Browser Breakdown">
                                    <div className="flex flex-wrap gap-2">{Object.entries(poll.browserBreakdown).length > 0 ? (Object.entries(poll.browserBreakdown).map(([name, count]) => (<div key={name} className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-3 py-1.5 rounded-full text-sm font-medium">{name} {Math.round((count / poll.totalVotes) * 100)}%</div>))) : (<p className="text-sm text-gray-500 dark:text-gray-400">No browser data.</p>)}</div>
                                </BreakdownCard>
                                <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-2xl">
                                    <h3 className="text-lg font-semibold mb-4">Real-time Analytics</h3>
                                    <div className="grid grid-cols-3 gap-4 text-center">
                                        <div><p className="text-2xl font-bold text-pink-500">{poll.responseRate}</p><p className="text-xs text-gray-600 dark:text-gray-400">Response Rate</p></div>
                                        <div><p className="text-2xl font-bold text-pink-500">{poll.completed}</p><p className="text-xs text-gray-600 dark:text-gray-400">Viewers completed</p></div>
                                        <div><p className="text-2xl font-bold text-pink-500">{poll.avgTime}</p><p className="text-xs text-gray-600 dark:text-gray-400">Avg. Time</p></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                    <div className="w-full bg-gradient-to-r from-purple-100 to-blue-100 dark:from-gray-800 dark:to-gray-700 mt-12 py-12 text-center">
                        <h3 className="text-2xl font-bold">Unlock advanced analytics in Plus</h3>
                        <p className="text-gray-600 dark:text-gray-300 mt-2">Get real-time insights, demographics, and export features</p>
                        <button className="bg-pink-500 text-white px-6 py-3 rounded-xl font-semibold text-sm mt-6 hover:scale-105 transition-transform">Upgrade Now</button>
                    </div>
                </>
            ) : (
                // --- EXISTING MOBILE/TABLET LAYOUT (NOW CORRECTLY INCLUDED) ---
                <div className="mx-auto bg-white dark:bg-gray-900 min-h-screen w-full transition-all duration-300 pb-28">
                    <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-700">
                        <div className="flex items-center justify-between p-4">
                            <button onClick={() => navigate(-1)} className="p-1"><ArrowLeft className="w-6 h-6 text-gray-700 dark:text-gray-200" /></button>
                            <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Basic analytics</h1>
                            <button onClick={() => navigate("/notifications")} className="relative p-1"><Bell className="w-6 h-6" />{unreadCount > 0 && (<span className="absolute top-0 right-0 flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500"></span></span>)}</button>
                        </div>
                    </div>
                    <div className="px-4 py-6 mx-4 border-b border-gray-100 dark:border-gray-700"><h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">{poll.question}</h2><div className="flex items-center space-x-2"><div className={`w-2 h-2 rounded-full ${poll.msLeft === 0 ? "bg-gray-400" : "bg-green-500"}`}></div><span className="text-sm text-gray-600 dark:text-gray-400">{poll.daysLeft}</span></div></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 py-6">
                        <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4"><div className="border border-gray-200 dark:border-gray-700 rounded-3xl p-6 text-start"><div className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">{poll.views?.toLocaleString()}</div><div className="text-sm text-gray-500 dark:text-gray-400">Views</div></div><div className="border border-gray-200 dark:border-gray-700 rounded-3xl p-6 text-start"><div className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">{poll.clicks?.toLocaleString()}</div><div className="text-sm text-gray-500 dark:text-gray-400">Clicks</div></div></div>
                            <div className="bg-white dark:bg-gray-800 px-6 py-6 border border-gray-200 dark:border-gray-700 rounded-3xl shadow-sm"><div className="text-center mb-6"><div className="text-5xl font-bold text-gray-900 dark:text-gray-100 mb-2">{poll.totalVotes?.toLocaleString()}</div><div className="text-gray-500 dark:text-gray-400">Total Votes</div></div><h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Platform Breakdown</h4>{poll.platformBreakdown && Object.entries(poll.platformBreakdown).length > 0 ? ( Object.entries(poll.platformBreakdown).map(([name, count]) => (<PlatformRow key={name} name={name} percentage={Math.round((count / poll.totalVotes) * 100)} color={platformColors[name] || "bg-gray-400"} />))) : ( <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">No platform data available.</p> )}</div>
                        </div>
                        <div className="space-y-6">
                            <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-700 rounded-3xl p-6 border border-purple-100 dark:border-gray-600"><div className="flex items-center justify-between mb-4"><h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Real-time Analytics</h3><img src="/graph.svg" alt="logo" className="w-6 h-6" /></div><div className="grid grid-cols-3 gap-4 text-center"><div><div className="text-2xl font-bold text-pink-500 mb-1">{poll.responseRate}</div><div className="text-xs text-gray-600 dark:text-gray-400">Response Rate</div></div><div><div className="text-2xl font-bold text-pink-500 mb-1">{poll.completed}</div><div className="text-xs text-gray-600 dark:text-gray-400">Viewers completed</div></div><div><div className="text-2xl font-bold text-pink-500 mb-1">{poll.avgTime}</div><div className="text-xs text-gray-600 dark:text-gray-400">Avg. Time</div></div></div></div>
                            <div className="bg-white dark:bg-gray-800 px-6 py-6 border border-gray-100 dark:border-gray-700 rounded-3xl shadow-sm"><h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">Early vs Late Voters</h3><div className="grid grid-cols-2 gap-4">{["earlyVoters", "lateVoters"].map((type) => { const count = poll[type]; const totalVotes = poll.earlyVoters + poll.lateVoters; const percentage = totalVotes > 0 ? (count / totalVotes) * 100 : 0; const label = type === "earlyVoters" ? "First half" : "Second half"; return ( <div key={type} className="text-start bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-700 dark:to-gray-600 rounded-2xl p-6 border border-purple-100 dark:border-gray-600"><div className="text-sm text-gray-600 dark:text-gray-400 mb-2">{label}</div><div className="text-3xl font-bold text-pink-500 mb-1">{percentage.toFixed(1)}%</div><div className="text-sm text-gray-700 dark:text-gray-300">{count?.toLocaleString()} Votes</div></div> ); })}</div></div>
                            <div className="bg-white dark:bg-gray-800 px-6 py-6 border border-gray-100 dark:border-gray-700 rounded-3xl shadow-sm"><h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Device Breakdown</h4><div className="flex flex-wrap gap-2">{poll.deviceBreakdown && Object.entries(poll.deviceBreakdeown).length > 0 ? ( Object.entries(poll.deviceBreakdown).map(([name, count]) => { const total = poll.totalVotes || 1; const percentage = Math.round((count / total) * 100); return ( <div key={name} className="border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 px-4 py-2 rounded-full text-sm font-medium">{name} {percentage}%</div> ); })) : ( <p className="text-sm text-gray-500 dark:text-gray-400">No device data.</p> )}</div><h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 mt-4">Browser Breakdown</h4><div className="flex flex-wrap gap-2">{poll.browserBreakdown && Object.entries(poll.browserBreakdown).length > 0 ? ( Object.entries(poll.browserBreakdown).map(([name, count]) => { const total = poll.totalVotes || 1; const percentage = Math.round((count / total) * 100); return ( <div key={name} className="border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 px-4 py-2 rounded-full text-sm font-medium">{name} {percentage}%</div> ); })) : ( <p className="text-sm text-gray-500 dark:text-gray-400">No browser data.</p> )}</div></div>
                        </div>
                    </div>
                    <div className="bg-gradient-to-r from-purple-100 to-blue-100 dark:from-gray-800 dark:to-gray-700 mx-4 rounded-3xl p-6 text-center"><h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">Unlock advanced analytics in Plus</h3><p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Get real-time insights, demographics, and export features</p><button className="bg-pink-500 text-white px-8 py-3 rounded-2xl font-semibold text-sm">Upgrade Now</button></div>
                </div>
            )}
        </div>
    );
};