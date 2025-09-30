// import React, { useEffect, useState } from "react";
// import { ArrowLeft, Bell, Filter, Users, Clock } from "lucide-react";
// import FilterDrawer from "../components/FilterDrawer";
// import PollDetailPopup from "../components/PollDetailPopup";
// import apiClient from '../api/axiosConfig';
// import useNotificationStore from '../store/useNotificationStore'; 
// import { useNavigate } from 'react-router-dom';
// // A styled component to display each poll card
// // const AnalyticsPollCard = ({ poll, onSelect }) => {
// //     const totalVotes = poll.options.reduce((sum, o) => sum + (o.votes || 0), 0);

// //     return (
// //         <div 
// //             className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm cursor-pointer hover:shadow-lg transition-shadow duration-300"
// //             onClick={() => onSelect(poll)}
// //         >
// //             {poll.imageUrl && (
// //                 <img src={poll.imageUrl} alt="Poll visual" className="w-full h-40 object-cover" />
// //             )}
// //             <div className="p-4">
// //                 <div className="flex justify-between items-start mb-3">
// //                     <h3 className="font-semibold text-gray-800 pr-2">{poll.question}</h3>
// //                     <span className={`px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap ${
// //                         poll.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
// //                     }`}>
// //                         {poll.status}
// //                     </span>
// //                 </div>

// //                 <div className="space-y-3 mb-4">
// //                     {poll.options.slice(0, 2).map((option, index) => {
// //                         const percent = totalVotes > 0 ? Math.round(((option.votes || 0) / totalVotes) * 100) : 0;
// //                         return (
// //                             <div key={option._id || index}>
// //                                 <div className="flex justify-between text-xs text-gray-600 mb-1">
// //                                     <span>{option.text}</span>
// //                                     <span className="font-medium">{percent}%</span>
// //                                 </div>
// //                                 <div className="w-full bg-gray-200 rounded-full h-2">
// //                                     <div 
// //                                         className="h-2 rounded-full bg-gradient-to-r from-blue-400 to-pink-400"
// //                                         style={{ width: `${percent}%` }}
// //                                     />
// //                                 </div>
// //                             </div>
// //                         );
// //                     })}
// //                 </div>

// //                 <div className="flex justify-between text-xs text-gray-500 border-t pt-3 mt-3">
// //                      <div className="flex items-center gap-1.5">
// //                         <Users size={14} />
// //                         <span>{totalVotes} Votes</span>
// //                     </div>
// //                     <div className="flex items-center gap-1.5">
// //                         <Clock size={14} />
// //                         <span>{poll.daysLeft} Days Left</span>
// //                     </div>
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // };
// const AnalyticsPollCard = ({ poll, onSelect }) => {
//     const totalVotes = poll.options.reduce((sum, o) => sum + (o.votes || 0), 0);

//     return (
//         <div 
//             className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm cursor-pointer hover:shadow-lg transition-shadow duration-300"
//             onClick={() => onSelect(poll)}
//         >
//             {poll.imageUrl && (
//                 <img src={poll.imageUrl} alt="Poll visual" className="w-full h-40 object-cover" />
//             )}
//             <div className="p-4">
//                 <div className="flex justify-between items-start mb-3">
//                     <h3 className="font-semibold text-gray-800 pr-2">{poll.question}</h3>
//                     <span className={`px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap ${
//                         poll.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
//                     }`}>
//                         {poll.status}
//                     </span>
//                 </div>

//                 <div className="space-y-3 mb-4">
//                     {poll.options.slice(0, 2).map((option, index) => {
//                         const percent = totalVotes > 0 ? Math.round(((option.votes || 0) / totalVotes) * 100) : 0;
//                         return (
//                             <div key={option._id || index}>
//                                 <div className="flex justify-between text-xs text-gray-600 mb-1">
//                                     <span>{option.text}</span>
//                                     <span className="font-medium">{percent}%</span>
//                                 </div>
//                                 <div className="w-full bg-gray-200 rounded-full h-2">
//                                     <div 
//                                         className="h-2 rounded-full bg-gradient-to-r from-blue-400 to-pink-400"
//                                         style={{ width: `${percent}%` }}
//                                     />
//                                 </div>
//                             </div>
//                         );
//                     })}
//                 </div>

//                 <div className="flex justify-between text-xs text-gray-500 border-t pt-3 mt-3">
//                     <div className="flex items-center gap-1.5">
//                         <Users size={14} />
//                         <span>{totalVotes} Votes</span>
//                     </div>
//                     <div className="flex items-center gap-1.5">
//                         <Clock size={14} />
//                         <span>{poll.daysLeft} Days Left</span>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };
import React, { useEffect, useState } from "react";
import { ArrowLeft, Bell, Filter, Users, Clock } from "lucide-react";
import FilterDrawer from "../components/FilterDrawer";
import PollDetailPopup from "../components/PollDetailPopup";
import apiClient from '../api/axiosConfig';
import useNotificationStore from '../store/useNotificationStore'; 
import { useNavigate } from 'react-router-dom';

// A styled component to display each poll card (Unchanged)
const AnalyticsPollCard = ({ poll, onSelect }) => {
    const totalVotes = poll.options.reduce((sum, o) => sum + (o.votes || 0), 0);

    return (
        <div 
            className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm cursor-pointer hover:shadow-lg transition-shadow duration-300"
            onClick={() => onSelect(poll)}
        >
            {poll.imageUrl && (
                <img src={poll.imageUrl} alt="Poll visual" className="w-full h-40 object-cover" />
            )}
            <div className="p-4">
                <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-gray-800 pr-2">{poll.question}</h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap ${
                        poll.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                    }`}>
                        {poll.status}
                    </span>
                </div>
                <div className="space-y-3 mb-4">
                    {poll.options.slice(0, 2).map((option, index) => {
                        const percent = totalVotes > 0 ? Math.round(((option.votes || 0) / totalVotes) * 100) : 0;
                        return (
                            <div key={option._id || index}>
                                <div className="flex justify-between text-xs text-gray-600 mb-1">
                                    <span>{option.text}</span>
                                    <span className="font-medium">{percent}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div 
                                        className="h-2 rounded-full bg-gradient-to-r from-blue-400 to-pink-400"
                                        style={{ width: `${percent}%` }}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="flex justify-between text-xs text-gray-500 border-t pt-3 mt-3">
                    <div className="flex items-center gap-1.5">
                        <Users size={14} />
                        <span>{totalVotes} Votes</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Clock size={14} />
                        <span>{poll.daysLeft > 0 ? `${poll.daysLeft} Days Left` : 'Expired'}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
// The animated loader component
const InlineLoader = ({ text }) => (
  <div className="flex flex-col items-center justify-center gap-6 py-20">
    <div className="relative w-20 h-20">
      <div
        className="absolute inset-0 rounded-full"
        style={{
          backgroundImage:
            "conic-gradient(from 0deg, #20D9E8 6%, #4C9CFA 35%, #E741D2 60%, #7B4CFF 100%)",
          animation: "spin 1.5s linear infinite",
        }}
      />
      <div className="absolute inset-1.5 bg-white rounded-full flex items-center justify-center gap-1">
        <div className="bar bar-1"></div>
        <div className="bar bar-2"></div>
        <div className="bar bar-3"></div>
      </div>
    </div>
    <p className="text-gray-500 text-lg animate-pulse">{text}</p>
  </div>
);

// export default function Analytics() {
//     const navigate = useNavigate(); // 3. Initialize the navigate function
//     const { unreadCount } = useNotificationStore(); // 4. Get the unread count from the global store
//     const [activeTab, setActiveTab] = useState("My Pings");
//     const [searchQuery, setSearchQuery] = useState("");
//     const [showFilter, setShowFilter] = useState(false);
//     const [statusFilter, setStatusFilter] = useState("All");
//     const [platformFilter, setPlatformFilter] = useState("All");
//     const [selectedPoll, setSelectedPoll] = useState(null);
//     const [polls, setPolls] = useState([]);
//     const [loading, setLoading] = useState(true);


//     useEffect(() => {
//         const fetchPolls = async () => {
//             try {
//                 setLoading(true);
//                 const endpoint = activeTab === "My Pings" ? "/api/polls/my-polls" : "/api/polls/participated-polls";
//                 const response = await apiClient.get(endpoint);
//                 const data = response.data;

//                 const formatted = (data || []).map((poll) => {
//                     const expires = new Date(poll.expiresAt);
//                     const now = new Date();
//                     const daysLeft = Math.max(0, Math.ceil((expires - now) / (1000 * 60 * 60 * 24)));
                    
//                     return {
//                         id: poll._id,
//                         question: poll.question,
//                         options: poll.options || [],
//                         daysLeft: daysLeft,
//                         platform: poll.platform || "General",
//                         imageUrl: poll.imageUrl || null,
//                     };
//                 });

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
//             poll.options.some((o) =>
//                 o.text.toLowerCase().includes(searchQuery.toLowerCase())
//             );

//         // This logic now correctly maps "Live Pings" to "Active" and "Closed Pings" to "Expired"
//         const matchStatus = 
//             statusFilter === "All" ||
//             (statusFilter === "Live Pings" && poll.status === "Active") ||
//             (statusFilter === "Closed Pings" && poll.status === "Expired");

//         const matchPlatform =
//             platformFilter === "All" || poll.platform === platformFilter;

//         return matchSearch && matchStatus && matchPlatform;
//     });

//   return (
//         <div className="mx-auto bg-white min-h-screen max-w-md">
//             <div className="sticky top-0 z-40 bg-white border-b border-gray-100">
//                 <div className="flex items-center justify-between p-4">
//                     <button onClick={() => navigate(-1)}><ArrowLeft className="w-6 h-6 text-gray-700" /></button>
//                     <h1 className="text-lg font-semibold text-gray-900">Analytics</h1>
                    
//                     {/* --- THIS IS THE UPDATED PART --- */}
//                     <button onClick={() => navigate('/notifications')} className="relative p-1">
//                         <Bell className="w-6 h-6 text-gray-700" />
//                         {unreadCount > 0 && (
//                             <span className="absolute top-0 right-0 flex h-3 w-3">
//                                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
//                                 <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
//                             </span>
//                         )}
//                     </button>
//                 </div>
//             </div>
//             <div className="px-4 mt-3">
//                 <input
//                     type="text"
//                     placeholder="Search by keyword..."
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     className="w-full pl-4 pr-10 py-3 bg-white rounded-full border border-gray-200 text-sm placeholder-gray-400 focus:outline-none"
//                 />
//             </div>

//             <div className="mt-3 px-4 space-y-4 pb-24 pt-4">
//                 {loading ? (
//                     <InlineLoader text="Fetching polls..." />
//                 ) : finalPolls.length > 0 ? (
//                     finalPolls.map((poll) => (
//                         <AnalyticsPollCard key={poll.id} poll={poll} onSelect={setSelectedPoll} />
//                     ))
//                 ) : (
//                     <p className="text-center text-gray-500 mt-10">No polls found for this category.</p>
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
//                     onSeeAnalytics={() => alert("Navigate to detailed analytics for " + selectedPoll.id)}
//                 />
//             )}
//         </div>
//     );
// }

export default function Analytics() {
    const navigate = useNavigate();
    const { unreadCount } = useNotificationStore(); // From your original file
    const [activeTab, setActiveTab] = useState("My Pings");
    const [searchQuery, setSearchQuery] = useState("");
    const [showFilter, setShowFilter] = useState(false);
    const [statusFilter, setStatusFilter] = useState("All");
    const [platformFilter, setPlatformFilter] = useState("All");
    const [selectedPoll, setSelectedPoll] = useState(null);
    const [polls, setPolls] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPolls = async () => {
            setLoading(true);
            try {
                const endpoint = activeTab === "My Pings" ? "/api/polls/my-polls" : "/api/polls/participated-polls";
                const response = await apiClient.get(endpoint);
                const data = response.data;

                // --- BUG FIX & MERGE ---
                // This now correctly calculates 'status' and uses the 'sharedPlatforms' array
                const formatted = (data || []).map((poll) => {
                    const expires = new Date(poll.expiresAt);
                    const now = new Date();
                    const isExpired = expires < now;
                    const daysLeft = isExpired ? 0 : Math.ceil((expires - now) / (1000 * 60 * 60 * 24));
                    
                    return {
                        id: poll._id,
                        question: poll.question,
                        options: poll.options || [],
                        daysLeft: daysLeft,
                        status: isExpired ? 'Expired' : 'Active', // Correct status calculation
                        sharedPlatforms: poll.sharedPlatforms || [], // Use the correct array field
                        imageUrl: poll.imageUrl || null,
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

    // --- BUG FIX & MERGE ---
    // This filtering logic now works correctly with the formatted poll data
    const finalPolls = polls.filter((poll) => {
        const matchSearch =
            poll.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            poll.options.some((o) =>
                o.text.toLowerCase().includes(searchQuery.toLowerCase())
            );

        const matchStatus = 
            statusFilter === "All" ||
            (statusFilter === "Live Pings" && poll.status === "Active") ||
            (statusFilter === "Closed Pings" && poll.status === "Expired");

        const matchPlatform =
            platformFilter === "All" || 
            poll.sharedPlatforms.includes(platformFilter.toLowerCase()); // Check if array includes the platform

        return matchSearch && matchStatus && matchPlatform;
    });

    return (
        <div className="mx-auto bg-white min-h-screen max-w-md">
            {/* Header with Notification Badge */}
            <div className="sticky top-0 z-40 bg-white border-b border-gray-100">
                <div className="flex items-center justify-between p-4">
                    <button onClick={() => navigate(-1)}><ArrowLeft className="w-6 h-6 text-gray-700" /></button>
                    <h1 className="text-lg font-semibold text-gray-900">Analytics</h1>
                    <button onClick={() => navigate('/notifications')} className="relative p-1">
                        <Bell className="w-6 h-6 text-gray-700" />
                        {unreadCount > 0 && (
                            <span className="absolute top-0 right-0 flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
                            </span>
                        )}
                    </button>
                </div>
            </div>

            {/* Tabs (from partner's file) */}
            <div className="flex items-center justify-between px-4 mt-2">
                <div className="flex bg-gray-100 rounded-full p-1 space-x-1 flex-1 mr-3">
                    {["My Pings", "Participated Pings"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex-1 px-4 py-2 text-sm font-medium rounded-full transition-all ${
                                activeTab === tab
                                ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow"
                                : "text-gray-600"
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
                <button onClick={() => setShowFilter(true)} className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200">
                    <Filter className="w-5 h-5 text-gray-600" />
                </button>
            </div>

            {/* Search Input */}
            <div className="px-4 mt-3">
                <input type="text" placeholder="Search by keyword..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-4 pr-10 py-3 bg-white rounded-full border border-gray-200 text-sm placeholder-gray-400 focus:outline-none" />
            </div>

            {/* Poll List */}
            <div className="mt-3 px-4 space-y-4 pb-24 pt-4">
                {loading ? (
                    <InlineLoader text="Fetching polls..." />
                ) : finalPolls.length > 0 ? (
                    finalPolls.map((poll) => (
                        <AnalyticsPollCard key={poll.id} poll={poll} onSelect={setSelectedPoll} />
                    ))
                ) : (
                    <p className="text-center text-gray-500 mt-10">No polls found.</p>
                )}
            </div>

            {/* Drawers and Popups */}
            {showFilter && (
                <FilterDrawer show={showFilter} setShow={setShowFilter} statusFilter={statusFilter} setStatusFilter={setStatusFilter} platformFilter={platformFilter} setPlatformFilter={setPlatformFilter} />
            )}
            {selectedPoll && (
                <PollDetailPopup
                    poll={selectedPoll}
                    onClose={() => setSelectedPoll(null)}
                    onSeeAnalytics={() => navigate(`/analytics/${selectedPoll.id}`)} // Navigation from partner's file
                />
            )}
        </div>
    );
}