// import React, { useEffect, useState } from "react";
// import { ArrowLeft, Bell, Filter, Users, Clock } from "lucide-react";
// import FilterDrawer from "../components/FilterDrawer";
// import PollDetailPopup from "../components/PollDetailPopup";
// import apiClient from '../api/axiosConfig';
// import useNotificationStore from '../store/useNotificationStore';
// import { useNavigate } from 'react-router-dom';

// // A styled component to display each poll card (Unchanged)
// const AnalyticsPollCard = ({ poll, onSelect }) => {
//     const totalVotes = (poll.options || []).reduce((sum, o) => sum + (o.votes || 0), 0);

//     const platformIcons = {
//         instagram: "/icons/Instagram.svg",
//         youtube: "/icons/Youtube.svg",
//         whatsapp: "/icons/WhatsApp.svg",
//         facebook: "/icons/Facebook.svg",
//         linkedin: "/icons/LinkedIn.svg",
//         telegram: "/icons/Telegram.svg",
//         twitter: "/icons/Twitter.svg",
//         gmail: "/icons/Mail.svg",
//     };

//     return (
//           <div
//             className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden shadow-sm cursor-pointer hover:shadow-lg transition-shadow duration-300"
//             onClick={() => onSelect(poll)}
//         >
//             {/* --- NEW: Conditionally render the image here --- */}
//             {poll.imageUrl && (
//                 <img
//                     src={poll.imageUrl}
//                     alt="Poll visual"
//                     className="w-full h-40 object-cover"
//                 />
//             )}
//             <div className="p-4">
//                 <h3 className="font-semibold text-gray-800 dark:text-gray-200 pr-2 mb-4">
//                     {poll.question}
//                 </h3>

//                 <div className="space-y-3 mb-4">
//                     {(poll.options || []).map((option, index) => {
//                         const percent = totalVotes > 0 ? Math.round(((option.votes || 0) / totalVotes) * 100) : 0;
//                         return (
//                             // This is the container for each option bar
//                             <div key={option._id || index} className="w-full bg-gray-100 dark:bg-gray-700 rounded-lg h-10 flex items-center relative overflow-hidden">
//                                 {/* The colored progress bar */}
//                                 <div
//                                     className="h-full rounded-lg bg-gradient-to-r from-blue-400 to-pink-400"
//                                     style={{ width: `${percent}%`, transition: 'width 0.5s ease-in-out' }}
//                                 />
//                                 {/* The text labels on top */}
//                                 <div className="absolute inset-0 px-3 flex justify-between items-center">
//                                     <span className="font-medium text-gray-800 dark:text-gray-200">{option.text}</span>
//                                     <span className="font-semibold text-gray-700 dark:text-gray-300">{percent}%</span>
//                                 </div>
//                             </div>
//                         );
//                     })}
//                 </div>

//                 {/* --- UPDATED: Bottom row now shows time and platforms --- */}
//                 <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
//                     <div className="flex items-center gap-1.5">
//                         <Clock size={14} />
//                         <span>{poll.timeLeft}</span>
//                     </div>

//                     <div className="flex items-center -space-x-2">
//                         {(poll.sharedPlatforms || []).slice(0, 3).map(platform => (
//                             <img
//                                 key={platform}
//                                 src={platformIcons[platform]}
//                                 alt={platform}
//                                 className="w-5 h-5 bg-white rounded-full border-2 border-white dark:border-gray-800"
//                             />
//                         ))}
//                         {(poll.sharedPlatforms || []).length > 3 && (
//                             <div className="w-5 h-5 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-[10px] font-bold text-gray-600 dark:text-gray-300 border-2 border-white dark:border-gray-800">
//                                 +{(poll.sharedPlatforms || []).length - 3}
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// // Animated Loader Component
// const InlineLoader = ({ text }) => (
//     <div className="flex flex-col items-center justify-center gap-6 py-20">
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
//         <p className="text-gray-500 dark:text-gray-400 text-lg animate-pulse">
//             {text}
//         </p>
//     </div>
// );
// export default function Analytics() {
//     const [activeTab, setActiveTab] = useState("My Pings");
//     const [searchQuery, setSearchQuery] = useState("");
//     const [showFilter, setShowFilter] = useState(false);
//     const [statusFilter, setStatusFilter] = useState("All");
//     const [platformFilter, setPlatformFilter] = useState("All");
//     const [selectedPoll, setSelectedPoll] = useState(null);
//     const [polls, setPolls] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchPolls = async () => {
//             try {
//                 setLoading(true);
//                 const endpoint =
//                     activeTab === "My Pings"
//                         ? "/api/polls/my-polls"
//                         : "/api/polls/participated-polls";
//                 const response = await apiClient.get(endpoint);
//                 const data = response.data;

//                 const formatted = (data || []).map((poll) => {
//                     const now = new Date();
//                     const expires = new Date(poll.expiresAt);
//                     const diffMs = expires - now;
//                     let status = "Expired";
//                     let displayTime = "Expired";

//                     if (diffMs > 0) {
//                         status = "Active";
//                         const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
//                         const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//                         const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
//                         if (days > 0) {
//                             displayTime = `${days} day${days > 1 ? "s" : ""} left`;
//                         } else if (hours > 0) {
//                             displayTime = `${hours}h ${minutes}m left`;
//                         } else {
//                             displayTime = `${minutes}m left`;
//                         }
//                     }

//                    return {
//         ...poll, // Pass through all original poll data
//         id: poll._id,
//         status,
//         timeLeft: displayTime,
//         // --- ADD THIS LINE ---
//         // Ensure sharedPlatforms is always an array
//         sharedPlatforms: poll.sharedPlatforms || [],
//     };
// });
//                 setPolls(formatted);
//             } catch (err) {
//                 console.error("Error fetching polls:", err);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchPolls();
//     }, [activeTab]);

//     const finalPolls = polls.filter((poll) => {
//         const matchSearch =
//             poll.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
//             (poll.options && poll.options.some((o) => o.text.toLowerCase().includes(searchQuery.toLowerCase())));

//         const matchStatus =
//             statusFilter === "All" ||
//             (statusFilter === "Live Pings" && poll.status === "Active") ||
//             (statusFilter === "Closed Pings" && poll.status === "Expired");

//         const matchPlatform =
//             platformFilter === "All" || poll.platform === platformFilter;

//         return matchSearch && matchStatus && matchPlatform;
//     });

//     return (
//         <div className="mx-auto bg-gray-50 dark:bg-pyngl-dark min-h-screen max-w-md text-gray-900 dark:text-gray-200">
//             <div className="sticky top-0 z-40 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-700">
//                 <div className="flex items-center justify-between p-4">
//                     <button onClick={() => navigate(-1)}><ArrowLeft className="w-6 h-6" /></button>
//                     <h1 className="text-lg font-semibold">Analytics</h1>
//                     <button onClick={() => navigate('/notifications')}><Bell className="w-6 h-6" /></button>
//                 </div>
//             </div>

//             <div className="flex items-center justify-between px-4 mt-4">
//                 <div className="flex bg-gray-100 dark:bg-gray-800 rounded-full p-1 space-x-1 flex-1 mr-3">
//                     {["My Pings", "Participated Pings"].map((tab) => (
//                         <button
//                             key={tab}
//                             onClick={() => setActiveTab(tab)}
//                             className={`flex-1 px-4 py-2 text-sm font-medium rounded-full transition-all ${
//                                 activeTab === tab
//                                     ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow"
//                                     : "text-gray-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-700/50"
//                             }`}
//                         >
//                             {tab}
//                         </button>
//                     ))}
//                 </div>
//                 <button
//                     onClick={() => setShowFilter(true)}
//                     className="w-10 h-10 flex items-center justify-center rounded-xl border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
//                 >
//                     <Filter className="w-5 h-5 text-gray-600 dark:text-gray-300" />
//                 </button>
//             </div>

//             <div className="px-4 mt-4">
//                 <input
//                     type="text"
//                     placeholder="Search by keyword..."
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     className="w-full pl-4 pr-10 py-3 bg-white dark:bg-gray-800 rounded-full border border-gray-200 dark:border-gray-700 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pyngl-pink"
//                 />
//             </div>

//             <div className="mt-3 px-4 space-y-4 pb-24 pt-4">
//                 {loading ? (
//                     <InlineLoader text="Fetching your pings..." />
//                 ) : finalPolls.length > 0 ? (
//                     finalPolls.map((poll) => (
//                         <AnalyticsPollCard
//                             key={poll.id}
//                             poll={poll}
//                             onSelect={setSelectedPoll}
//                         />
//                     ))
//                 ) : (
//                     <p className="text-center text-gray-500 dark:text-gray-400 mt-10">
//                         No polls found for this category.
//                     </p>
//                 )}
//             </div>

//             {showFilter && (
//                 <FilterDrawer
//                     show={showFilter}
//                     setShow={setShowFilter}
//                     statusFilter={statusFilter}
//                     setStatusFilter={setStatusFilter}
//                     platformFilter={platformFilter}
//                     setPlatformFilter={setPlatformFilter}
//                 />
//             )}

//             {selectedPoll && (
//                 <PollDetailPopup
//                     poll={selectedPoll}
//                     onClose={() => setSelectedPoll(null)}
//                     onSeeAnalytics={() => {
//                         navigate(`/analytics/${selectedPoll.id}`);
//                     }}
//                 />
//             )}
//         </div>
//     );
// }
import React, { useEffect, useState } from "react";
import { ArrowLeft, Bell, Filter, Users, Clock, Search } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import apiClient from "../api/axiosConfig";
import FilterDrawer from "../components/FilterDrawer";
import PollDetailPopup from "../components/PollDetailPopup";
import DesktopNav from "../components/layout/DesktopNav";
import useBreakpoint from "../hooks/useBreakpoint";
// YOUR Poll Card Component - Unchanged as requested
const AnalyticsPollCard = ({ poll, onSelect }) => {
  const totalVotes = (poll.options || []).reduce(
    (sum, o) => sum + (o.votes || 0),
    0
  );

  const platformIcons = {
    instagram: "https://img.icons8.com/color/48/instagram-new--v1.png",
    youtube: "https://img.icons8.com/color/48/youtube-play.png",
    whatsapp: "https://img.icons8.com/color/48/whatsapp--v1.png",
    facebook: "https://img.icons8.com/color/48/facebook.png",
    linkedin: "https://img.icons8.com/color/48/linkedin.png",
    telegram: "https://img.icons8.com/color/48/telegram-app.png",
    twitter: "https://img.icons8.com/color/48/twitter--v1.png",
    gmail: "https://img.icons8.com/color/48/gmail-new.png",
  };

  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden shadow-sm cursor-pointer hover:shadow-lg transition-shadow duration-300"
      onClick={() => onSelect(poll)}
    >
      {poll.imageUrl && (
        <img
          src={poll.imageUrl}
          alt="Poll visual"
          className="w-full h-40 object-cover"
        />
      )}
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 dark:text-gray-200 pr-2 mb-4">
          {poll.question}
        </h3>

        <div className="space-y-3 mb-4">
          {(poll.options || []).map((option, index) => {
            const percent =
              totalVotes > 0
                ? Math.round(((option.votes || 0) / totalVotes) * 100)
                : 0;
            return (
              <div
                key={option._id || index}
                className="w-full bg-gray-100 dark:bg-gray-700 rounded-lg h-10 flex items-center relative overflow-hidden"
              >
                <div
                  className="h-full rounded-lg bg-gradient-to-r from-blue-400 to-pink-400"
                  style={{
                    width: `${percent}%`,
                    transition: "width 0.5s ease-in-out",
                  }}
                />
                <div className="absolute inset-0 px-3 flex justify-between items-center">
                  <span className="font-medium text-gray-800 dark:text-gray-200 mix-blend-hard-light">
                    {option.text}
                  </span>
                  <span className="font-semibold text-gray-700 dark:text-gray-300 mix-blend-hard-light">
                    {percent}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-1.5">
            <Clock size={14} />
            <span>{poll.timeLeft}</span>
          </div>

          <div className="flex items-center -space-x-2">
            {(poll.sharedPlatforms || []).slice(0, 3).map((platform) => (
              <img
                key={platform}
                src={platformIcons[platform]}
                alt={platform}
                className="w-5 h-5 bg-white rounded-full border-2 border-white dark:border-gray-800"
              />
            ))}
            {(poll.sharedPlatforms || []).length > 3 && (
              <div className="w-5 h-5 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-[10px] font-bold text-gray-600 dark:text-gray-300 border-2 border-white dark:border-gray-800">
                +{(poll.sharedPlatforms || []).length - 3}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Animated Loader Component (Kept your version)
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

export default function Analytics() {
  // Your state management and logic are preserved
  const [activeTab, setActiveTab] = useState("My Pings");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [statusFilter, setStatusFilter] = useState("All");
  const [platformFilter, setPlatformFilter] = useState("All");
  const [selectedPoll, setSelectedPoll] = useState(null);
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const isDesktop = useBreakpoint();
  // Your data fetching logic is preserved
  useEffect(() => {
    const fetchPolls = async () => {
      try {
        setLoading(true);
        const endpoint =
          activeTab === "My Pings"
            ? "/api/polls/my-polls"
            : "/api/polls/participated-polls";
        const response = await apiClient.get(endpoint);
        const data = response.data;

        const formatted = (data || []).map((poll) => {
          const now = new Date();
          const expires = new Date(poll.expiresAt);
          const diffMs = expires - now;
          let status = "Expired";
          let displayTime = "Expired";

          if (diffMs > 0) {
            status = "Active";
            const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
            const hours = Math.floor(
              (diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
            const minutes = Math.floor(
              (diffMs % (1000 * 60 * 60)) / (1000 * 60)
            );
            if (days > 0) {
              displayTime = `${days} day${days > 1 ? "s" : ""} left`;
            } else if (hours > 0) {
              displayTime = `${hours}h ${minutes}m left`;
            } else {
              displayTime = `${minutes}m left`;
            }
          }

          return {
            ...poll,
            id: poll._id,
            status,
            timeLeft: displayTime,
            sharedPlatforms: poll.sharedPlatforms || [],
          };
        });
        setPolls(formatted);
      } catch (err) {
        console.error("Error fetching polls:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPolls();
  }, [activeTab]);

  // Your filtering logic is preserved
  const finalPolls = polls.filter((poll) => {
    const matchSearch =
      poll.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (poll.options &&
        poll.options.some((o) =>
          o.text.toLowerCase().includes(searchQuery.toLowerCase())
        ));

    const matchStatus =
      statusFilter === "All" ||
      (statusFilter === "Live Pings" && poll.status === "Active") ||
      (statusFilter === "Closed Pings" && poll.status === "Expired");

    const matchPlatform =
      platformFilter === "All" ||
      (poll.sharedPlatforms || []).includes(platformFilter.toLowerCase());

    return matchSearch && matchStatus && matchPlatform;
  });

  //     return (
  //         // MERGED LAYOUT: Using friend's responsive container and main layout structure
  //         <div className="mx-auto bg-gray-50 dark:bg-gray-900 min-h-screen max-w-7xl text-gray-900 dark:text-gray-200">
  //             <div className="sticky top-0 z-40 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-700">
  //                 <div className="flex items-center justify-between p-4 max-w-7xl mx-auto">
  //                     <button onClick={() => navigate(-1)}><ArrowLeft className="w-6 h-6" /></button>
  //                     <h1 className="text-lg font-semibold">Analytics</h1>
  //                     <button onClick={() => navigate('/notifications')}><Bell className="w-6 h-6" /></button>
  //                 </div>
  //             </div>

  //             {/* MERGED LAYOUT: Using friend's responsive Tabs + Filter section */}
  //             <div className="flex flex-wrap items-center justify-between px-4 mt-4 gap-2 max-w-7xl mx-auto">
  //                 <div className="flex bg-gray-100 dark:bg-gray-800 rounded-full p-1 space-x-1 flex-1 min-w-[280px]">
  //                     {["My Pings", "Participated Pings"].map((tab) => (
  //                         <button
  //                             key={tab}
  //                             onClick={() => setActiveTab(tab)}
  //                             className={`flex-1 px-4 py-2 text-sm font-medium rounded-full transition-all ${
  //                                 activeTab === tab
  //                                     ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow"
  //                                     : "text-gray-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-700/50"
  //                             }`}
  //                         >
  //                             {tab}
  //                         </button>
  //                     ))}
  //                 </div>
  //                 <button
  //                     onClick={() => setShowFilter(true)}
  //                     className="w-10 h-10 flex items-center justify-center rounded-xl border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
  //                 >
  //                     <Filter className="w-5 h-5 text-gray-600 dark:text-gray-300" />
  //                 </button>
  //             </div>

  //             <div className="px-4 mt-4 max-w-7xl mx-auto">
  //                 <input
  //                     type="text"
  //                     placeholder="Search by keyword..."
  //                     value={searchQuery}
  //                     onChange={(e) => setSearchQuery(e.target.value)}
  //                     className="w-full pl-4 pr-10 py-3 bg-white dark:bg-gray-800 rounded-full border border-gray-200 dark:border-gray-700 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
  //                 />
  //             </div>

  //             {/* MERGED LAYOUT: Using friend's responsive grid for the poll list */}
  //             <div className="mt-3 px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-24 pt-4 max-w-7xl mx-auto">
  //                 {loading ? (
  //                     <InlineLoader text="Fetching your pings..." />
  //                 ) : finalPolls.length > 0 ? (
  //                     finalPolls.map((poll) => (
  //                         <AnalyticsPollCard
  //                             key={poll.id}
  //                             poll={poll}
  //                             onSelect={setSelectedPoll}
  //                         />
  //                     ))
  //                 ) : (
  //                     <div className="text-center text-gray-500 dark:text-gray-400 mt-10 col-span-1 sm:col-span-2 lg:col-span-3">
  //                          <p>No polls found for this category.</p>
  //                     </div>
  //                 )}
  //             </div>

  //             {showFilter && (
  //                 <FilterDrawer
  //                     show={showFilter}
  //                     setShow={setShowFilter}
  //                     statusFilter={statusFilter}
  //                     setStatusFilter={setStatusFilter}
  //                     platformFilter={platformFilter}
  //                     setPlatformFilter={setPlatformFilter}
  //                 />
  //             )}

  //             {selectedPoll && (
  //                 <PollDetailPopup
  //                     poll={selectedPoll}
  //                     onClose={() => setSelectedPoll(null)}
  //                     onSeeAnalytics={() => {
  //                         navigate(`/analytics/${selectedPoll.id}`);
  //                     }}
  //                 />
  //             )}
  //         </div>
  //     );
  // }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-200">
      {isDesktop ? (
        // --- NEW DESKTOP LAYOUT ---
        <>
          <DesktopNav />
          <div className="px-6 lg:px-24 py-4 text-sm text-gray-500 border-b border-gray-200">
            <span className="font-semibold">Analytics &gt;</span>
          </div>
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
            {/* Desktop Controls: Tabs, Search, and Filter */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
              <div className="flex bg-gray-100 dark:bg-gray-800 rounded-full p-1 space-x-1">
                {["My Pings", "Participated Pings"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 px-10 py-2 text-sm font-medium rounded-full transition-all ${
                      activeTab === tab
                      ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow"
                      : "text-gray-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-700/50"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-4">
                <div className="relative flex-1 min-w-[300px]">
                  <input
                    type="text"
                    placeholder="Search by keyword..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800 rounded-full border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
                <button
                  onClick={() => setShowFilter(true)}
                  className="h-12 w-12 flex items-center justify-center rounded-xl border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 flex-shrink-0 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <Filter className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </button>
              </div>
            </div>

            {/* Polls Grid */}
            <div className="min-h-[60vh] flex items-center justify-center">
              {loading ? (
                <InlineLoader text="Fetching your pings..." />
              ) : finalPolls.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                  {finalPolls.map((poll) => (
                    <AnalyticsPollCard
                      key={poll.id}
                      poll={poll}
                      onSelect={setSelectedPoll}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-500 mt-10 col-span-full">
                  <p>No polls found.</p>
                </div>
              )}
            </div>
          </main>
        </>
      ) : (
        // --- EXISTING MOBILE/TABLET LAYOUT (UNCHANGED) ---
        <div className="mx-auto max-w-7xl">
          <div className="sticky top-0 z-40 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between p-4">
              <button onClick={() => navigate(-1)}>
                <ArrowLeft className="w-6 h-6" />
              </button>
              <h1 className="text-lg font-semibold">Analytics</h1>
              <button onClick={() => navigate("/notifications")}>
                <Bell className="w-6 h-6" />
              </button>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-between px-4 mt-4 gap-2">
            <div className="flex bg-gray-100 dark:bg-gray-800 rounded-full p-1 space-x-1 flex-1 min-w-[280px]">
              {["My Pings", "Participated Pings"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 px-4 py-2 text-sm font-medium rounded-full transition-all ${
                    activeTab === tab
                      ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow"
                      : "text-gray-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-700/50"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowFilter(true)}
              className="w-10 h-10 flex items-center justify-center rounded-xl border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
            >
              <Filter className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>
          </div>
          <div className="px-4 mt-4">
            <input
              type="text"
              placeholder="Search by keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-4 pr-10 py-3 bg-white dark:bg-gray-800 rounded-full border border-gray-200 dark:border-gray-700 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="mt-3 px-4 grid grid-cols-1 sm:grid-cols-2 gap-4 pb-24 pt-4">
            {loading ? (
              <InlineLoader text="Fetching your pings..." />
            ) : finalPolls.length > 0 ? (
              finalPolls.map((poll) => (
                <AnalyticsPollCard
                  key={poll.id}
                  poll={poll}
                  onSelect={setSelectedPoll}
                />
              ))
            ) : (
              <div className="text-center text-gray-500 mt-10 col-span-1 sm:col-span-2">
                <p>No polls found for this category.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modals are shared between both layouts */}
      {showFilter && (
        <FilterDrawer
          show={showFilter}
          setShow={setShowFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          platformFilter={platformFilter}
          setPlatformFilter={setPlatformFilter}
        />
      )}
      {selectedPoll && (
        <PollDetailPopup
          poll={selectedPoll}
          onClose={() => setSelectedPoll(null)}
          onSeeAnalytics={() => {
            navigate(`/analytics/${selectedPoll.id}`);
          }}
        />
      )}
    </div>
  );
}
