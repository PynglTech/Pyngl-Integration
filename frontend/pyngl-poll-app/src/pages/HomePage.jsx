// import React, { useState, useEffect } from "react";
// import useAuthStore from '../store/useAuthStore'; 
// import { Link, useLocation } from 'react-router-dom';
// import apiClient from '../api/axiosConfig'; 
// import "./HomePage.css";

// const TfiTextIcon = ({ size = 15, color = "#008060" }) => (
//     <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//         <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
//     </svg>
// );

// const FaRegImageIcon = ({ size = 15, color = "#D47D00" }) => (
//     <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//         <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
//         <circle cx="8.5" cy="8.5" r="1.5"></circle>
//         <polyline points="21 15 16 10 5 21"></polyline>
//     </svg>
// );

// const PollCard = ({ poll }) => {
//     const calculateRemainingTime = (expiresAt) => {
//         const now = new Date();
//         const expiry = new Date(expiresAt);
//         const diff = expiry.getTime() - now.getTime();
//         if (diff <= 0) return "Poll ended";
//         const days = Math.floor(diff / (1000 * 60 * 60 * 24));
//         const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//         const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
//         const seconds = Math.floor((diff % (1000 * 60)) / 1000);
//         if (days > 0) return `${days}d ${hours}h left`;
//         if (hours > 0) return `${hours}h ${minutes}m left`;
//         if (minutes > 0) return `${minutes}m ${seconds}s left`;
//         return `${seconds}s left`;
//     };

//     const [remainingTime, setRemainingTime] = useState(calculateRemainingTime(poll.expiresAt));

//     useEffect(() => {
//         if (remainingTime === "Poll ended") return;
//         const intervalId = setInterval(() => {
//             setRemainingTime(calculateRemainingTime(poll.expiresAt));
//         }, 1000);
//         return () => clearInterval(intervalId);
//     }, [poll.expiresAt, remainingTime]);

//     return (
//         <Link
//             to={`/poll/${poll._id}`}
//             className="block rounded-xl border border-gray-200 dark:border-gray-700 p-4 mb-4 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
//         >
//             <div className="flex justify-between items-start">
//                 <h3 className="font-medium mb-3 pr-4 text-gray-900 dark:text-gray-100">{poll.question}</h3>
//             </div>
//             {poll.imageUrl && (
//                 <img src={poll.imageUrl} alt="Poll visual" className="rounded-lg mb-3 w-full h-32 object-cover" />
//             )}
//             <div className="space-y-2">
//                 {poll.options.slice(0, 2).map(option => (
//                     <div
//                         key={option._id}
//                         className="w-full border rounded-full px-4 py-2 text-left text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-gray-700 truncate"
//                     >
//                         {option.text}
//                     </div>
//                 ))}
//             </div>
//             <div className="flex justify-between items-center mt-3 text-xs">
//                 <span className="font-medium text-pink-500">{poll.options.reduce((acc, opt) => acc + opt.votes, 0)} Votes</span>
//                 <span className="font-semibold text-pink-500">{remainingTime}</span>
//             </div>
//         </Link>
//     );
// };

// const HomePage = () => {
//     const { finishLoading } = useAuthStore();
//     const location = useLocation();

//     const [livePolls, setLivePolls] = useState([]);
//     const [filteredPolls, setFilteredPolls] = useState([]);
//     const [isLoadingPolls, setIsLoadingPolls] = useState(true);
//     const [activeFilter, setActiveFilter] = useState('Trending');

//     useEffect(() => { finishLoading(); }, [finishLoading]);

//     useEffect(() => {
//         const fetchLivePolls = async () => {
//             try {
//                 setIsLoadingPolls(true);
//                 const response = await apiClient.get('/api/polls/live');
//                 const polls = response.data;
//                 if (location.state?.newPoll) {
//                     const pollExists = polls.some(p => p._id === location.state.newPoll._id);
//                     setLivePolls(pollExists ? polls : [location.state.newPoll, ...polls]);
//                 } else {
//                     setLivePolls(polls);
//                 }
//             } catch (error) {
//                 console.error("Error fetching live polls:", error);
//             } finally {
//                 setIsLoadingPolls(false);
//             }
//         };
//         fetchLivePolls();
//     }, [location.state?.newPoll]);

//     useEffect(() => {
//         let sortedPolls = [...livePolls];
//         if (activeFilter === 'Trending') sortedPolls.sort((a, b) => b.options.reduce((sum, o) => sum + o.votes, 0) - a.options.reduce((sum, o) => sum + o.votes, 0));
//         if (activeFilter === 'Latest') sortedPolls.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//         if (activeFilter === 'Expiring Soon') sortedPolls.sort((a, b) => new Date(a.expiresAt) - new Date(b.expiresAt));
//         setFilteredPolls(sortedPolls);
//     }, [livePolls, activeFilter]);

//     return (
//         <div className="flex flex-col gap-5 p-4 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen max-w-md mx-auto">
            
//             {/* Upgrade Card */}
//             <div className="upgrade-card-wrapper">
//                 <div className="upgrade-card">
//                     <div className="upgrade-image-container">
//                         <img src="/HomePageImgOne.png" alt="Upgrade to Pro" className="promo-image" />
//                         <div className="gradient-overlay"></div>
//                         <div className="upgrade-text-content">
//                             <h3><span className="pro-icon">✨</span> Upgrade to pro!</h3>
//                             <p>Enjoy all benefits without any restrictions.</p>
//                         </div>
//                     </div>
//                     <button className="upgrade-now-button upgradeButton">Upgrade Now</button>
//                 </div>
//             </div>

//             {/* Poll Options */}
//                         <div className="poll-options-panel">
//                 <Link to="/create-text-poll" className="poll-card text-poll-card">
//                     <div className="poll-card-icon-wrapper"><TfiTextIcon /></div>
//                     <h4>Text to poll</h4>
//                     <p>Convert text into stunning and accurate poll</p>
//                     <button className="start-button butStart">Start</button>
//                 </Link>
//                 <Link to="/create-image-poll" className="poll-card image-poll-card">
//                     <div className="poll-card-icon-wrapper"><FaRegImageIcon /></div>
//                     <h4>Image to poll</h4>
//                     <p>Convert text into stunning and accurate poll</p>
//                     <button className="start-button butStart">Start</button>
//                 </Link>
//             </div>

//             {/* Live Polls Section */}
//           <div className="mt-4">
//     <div className="flex justify-between items-center mb-3">
//         <div className="flex items-center gap-2">
//             <h3 className="font-bold text-lg text-gray-800 dark:text-white">Live polls</h3>
//             {livePolls.length > 0 && !isLoadingPolls && (
//                 <span className="relative flex h-3 w-3">
//                     <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
//                     <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
//                 </span>
//             )}
//         </div>
//         {filteredPolls.length > 0 && (
//             <Link to="/analytics" className="text-sm font-semibold text-pyngl-pink hover:underline">
//                 See all
//             </Link>
//         )}
//     </div>
//                 {/* Filter Buttons */}
//                 <div className="flex gap-2 mb-4">
//                     {['Trending','Latest','Expiring Soon'].map(filter => (
//                         <button
//                             key={filter}
//                             onClick={() => setActiveFilter(filter)}
//                             className={`px-4 py-1.5 text-sm font-medium rounded-full transition-colors ${
//                                 activeFilter === filter
//                                     ? 'bg-pink-500 text-white'
//                                     : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
//                             }`}
//                         >
//                             {filter}
//                         </button>
//                     ))}
//                 </div>

//                 {/* Poll List */}
//                 {isLoadingPolls ? (
//                     <p className="text-center text-gray-500 dark:text-gray-400 py-8">Loading polls...</p>
//         ) : filteredPolls.length > 0 ? (
//             // --- CHANGED: Only show the first 5 polls ---
//             filteredPolls.slice(0, 5).map(poll => <PollCard key={poll._id} poll={poll} />)
//         ) : (
//             <p className="text-center text-gray-500 dark:text-gray-400 py-8">No live polls at the moment. Why not create one?</p>
//         )}
//             </div>
//         </div>
//     );
// };

// export default HomePage;
    
import React, { useState, useEffect } from "react";
import useAuthStore from "../store/useAuthStore";
import { Link, useLocation } from "react-router-dom";
import apiClient from "../api/axiosConfig";
// import "./HomePage.css";
import DesktopHomePage from "./DesktopHomePage";
import { CheckCheck } from "lucide-react";

const TfiTextIcon = ({ size = 15, color = "#008060" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
  </svg>
);

const FaRegImageIcon = ({ size = 15, color = "#D47D00" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
    <circle cx="8.5" cy="8.5" r="1.5"></circle>
    <polyline points="21 15 16 10 5 21"></polyline>
  </svg>
);

const PollCard = ({ poll }) => {
  const calculateRemainingTime = (expiresAt) => {
    const now = new Date();
    const expiry = new Date(expiresAt);
    const diff = expiry.getTime() - now.getTime();
    if (diff <= 0) return "Poll ended";
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    if (days > 0) return `${days}d ${hours}h left`;
    if (hours > 0) return `${hours}h ${minutes}m left`;
    if (minutes > 0) return `${minutes}m ${seconds}s left`;
    return `${seconds}s left`;
  };

  const [remainingTime, setRemainingTime] = useState(
    calculateRemainingTime(poll.expiresAt)
  );

  useEffect(() => {
    if (remainingTime === "Poll ended") return;
    const intervalId = setInterval(() => {
      setRemainingTime(calculateRemainingTime(poll.expiresAt));
    }, 1000);
    return () => clearInterval(intervalId);
  }, [poll.expiresAt, remainingTime]);

  return (
    <Link
      to={`/poll/${poll._id}`}
      className="block rounded-xl border border-gray-200 dark:border-gray-700 p-4 mb-4 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
    >
      <div className="flex justify-between items-start">
        <h3 className="font-medium mb-3 pr-4 text-gray-900 dark:text-gray-100">
          {poll.question}
        </h3>
      </div>
      {poll.imageUrl && (
        <img
          src={poll.imageUrl}
          alt="Poll visual"
          className="rounded-lg mb-3 w-full h-32 object-cover"
        />
      )}
      <div className="space-y-2">
        {poll.options.slice(0, 2).map((option) => (
          <div
            key={option._id}
            className="w-full border rounded-full px-4 py-2 text-left text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-gray-700 truncate"
          >
            {option.text}
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center mt-3 text-xs">
        <span className="font-medium text-pink-500">
          {poll.options.reduce((acc, opt) => acc + opt.votes, 0)} Votes
        </span>
        <span className="font-semibold text-pink-500">{remainingTime}</span>
      </div>
    </Link>
  );
};

const HomePage = () => {
  const { finishLoading } = useAuthStore();
  const location = useLocation();
  const { userInfo: user } = useAuthStore();
  //  console.log("User object in HomePage:", user);
  const [livePolls, setLivePolls] = useState([]);
  const [filteredPolls, setFilteredPolls] = useState([]);
  const [isLoadingPolls, setIsLoadingPolls] = useState(true);
  const [activeFilter, setActiveFilter] = useState("Trending");
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  // In your HomePage component
const [isLocationBlocked, setIsLocationBlocked] = useState(false);
 const [userLocation, setUserLocation] = useState(null);
    const [locationError, setLocationError] = useState(null);
  useEffect(() => {
    finishLoading();
  }, [finishLoading]);

  useEffect(() => {
    const fetchLivePolls = async () => {
      try {
        setIsLoadingPolls(true);
        const response = await apiClient.get("/api/polls/live");
        const polls = response.data;
        if (location.state?.newPoll) {
          const pollExists = polls.some(
            (p) => p._id === location.state.newPoll._id
          );
          setLivePolls(pollExists ? polls : [location.state.newPoll, ...polls]);
        } else {
          setLivePolls(polls);
        }
      } catch (error) {
        console.error("Error fetching live polls:", error);
      } finally {
        setIsLoadingPolls(false);
      }
    };
    fetchLivePolls();
  }, [location.state?.newPoll]);
useEffect(() => {
  const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);

if (isDesktop) {
  return <DesktopHomePage />;
}
  useEffect(() => {
    let sortedPolls = [...livePolls];
    if (activeFilter === "Trending")
      sortedPolls.sort(
        (a, b) =>
          b.options.reduce((sum, o) => sum + o.votes, 0) -
          a.options.reduce((sum, o) => sum + o.votes, 0)
      );
    if (activeFilter === "Latest")
      sortedPolls.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    if (activeFilter === "Expiring Soon")
      sortedPolls.sort((a, b) => new Date(a.expiresAt) - new Date(b.expiresAt));
    setFilteredPolls(sortedPolls);
  }, [livePolls, activeFilter]);


//     const handleGetLocation = async () => {
//         // First, check if a user is actually logged in
//         if (!user) {
//             setLocationError("You must be logged in to save your location.");
//             return;
//         }

//         if (!("geolocation" in navigator)) {
//             setLocationError("Geolocation is not supported in your browser.");
//             return;
//         }
     
//         setLocationError(null);
//         console.log("⏳ Getting your location...");
//  if ('permissions' in navigator) {
//         const permissionStatus = await navigator.permissions.query({ name: 'geolocation' });

//         if (permissionStatus.state === 'denied') {
//             // Set the state to true and show the instructional error
//             setIsLocationBlocked(true);
//             setLocationError("Location access is blocked. Please enable it in your browser's site settings.");
//             return;
//         }
//          permissionStatus.onchange = () => {
//             if (permissionStatus.state === 'denied') {
//                 setIsLocationBlocked(true);
//                 setLocationError("You've denied location access. You can enable it in settings.");
//             } else if (permissionStatus.state === 'granted') {
//                 // If they re-enable it, reset the state
//                 setIsLocationBlocked(false);
//                 setLocationError(null);
//             }
//         };
//     }

//         navigator.geolocation.getCurrentPosition(
//             async (pos) => {
//                 const { latitude, longitude, accuracy } = pos.coords;
//                 setUserLocation({ latitude, longitude, accuracy });
//                 console.log("📍 Location:", latitude, longitude, "🎯 Accuracy:", accuracy);

//                 try {
//                     // ✅ UPDATED: Send to backend using apiClient
//                     const response = await apiClient.post("/api/users/save-location", {
//                         // The body only needs the location data.
//                         // The user ID is handled by the auth token.
//                         latitude,
//                         longitude,
//                         accuracy,
//                     });

//                     console.log("✅ Location saved successfully:", response.data);

//                 } catch (error) {
//                     console.error("⚠️ Error sending location to backend:", error);
//                     const errorMessage = error.response?.data?.message || "Failed to send location to server.";
//                     setLocationError(errorMessage);
//                 }
//             },
            
//             (err) => {
//                 let message = "Unknown error occurred.";
//                 if (err.code === 1) message = "Permission denied. Please allow location access.";
//                 else if (err.code === 2) message = "Location unavailable.";
//                 else if (err.code === 3) message = "Request timed out.";
//                 setLocationError(message);
//                 console.error("📍 Location error:", err);
//             },
//             {
//                 enableHighAccuracy: true,
//                 timeout: 10000,
//                 maximumAge: 0,
//             }
            
//         );
//     };

  return (
    <div
      className="mx-auto min-h-screen p-4 sm:p-6 md:p-8 
      bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 
      w-full md:w-7/6 lg:w-4/5 xl:w-3/4 2xl:w-2/3 
      transition-all duration-300"
    >
      {/* Upgrade Card */}
<div className="flex gap-2 w-full max-w-4xl mx-auto mt-4">
  {/* Image Container */}
  <div className="flex-1 h-[175px] rounded-3xl overflow-hidden shadow-md relative">
    <img
      src="/HomePageImgOne.png"
      alt="Upgrade to Pro"
      className="w-full h-full object-cover"
    />
    {/* Gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent"></div>
    {/* Text Content */}
    <div className="absolute top-4 left-4 text-white">
      <h3 className="flex items-center gap-2 text-lg font-semibold mb-1">
        <span><img src="/frames.svg" alt="Sparkles" className="w-9 h-9" /></span> Upgrade to pro!
      </h3>
      <p className="text-sm max-w-[180px] leading-tight">
        Enjoy all benefits without any restrictions.
      </p>
    </div>
  </div>

  {/* Upgrade Button */}
  <button
    className="w-[50px] h-[175px] bg-gradient-to-b from-[#20D9E8] via-[#7B4CFF] to-[#E741D2] text-white flex items-center justify-center rounded-3xl shadow-md"
  >
    <span className="-rotate-90 whitespace-nowrap font-semibold text-lg">Upgrade Now</span>
  </button>
</div>  



      {/* Poll Options */}
      <div className="flex flex-wrap sm:flex-nowrap justify-between gap-4 mt-4">
  {/* Text Poll Card */}
  <Link
    to="/create-text-poll"
    className="flex-1 min-w-[45%] sm:min-w-[48%] md:min-w-[48%] lg:min-w-[48%] h-[160px] sm:h-[160px] rounded-2xl p-4 flex flex-col justify-between shadow-sm border border-[#58C58B] bg-gradient-to-br from-[#9EF5E3] via-[#C7F9ED] via-[#CDF8E9] to-[#E7FEF1] transition-transform hover:scale-[1.02]"
  >
    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/70">
      <TfiTextIcon className="text-gray-700" />
    </div>
    <div>
      <h4 className="text-[1.1rem] font-semibold text-gray-800 mt-1">
        Text to poll
      </h4>
      <p className="text-[0.8rem] text-gray-600 leading-tight">
        Convert text into stunning and accurate poll
      </p>
    </div>
    <button className="bg-[#7B4CFF] text-white rounded-full mt-2 h-[34px] w-[65px] text-[12px] font-medium">
      Start
    </button>
  </Link>

  {/* Image Poll Card */}
  <Link
    to="/create-image-poll"
    className="flex-1 min-w-[45%] sm:min-w-[48%] md:min-w-[48%] lg:min-w-[48%] h-[160px] sm:h-[160px] rounded-2xl p-4 flex flex-col justify-between shadow-sm border border-[#F5B642] bg-gradient-to-br from-[#FED98C] via-[#FFE2AA] via-[#FEEBC6] via-[#FFF4E0] to-[#FDF9EE] transition-transform hover:scale-[1.02]"
  >
    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/70">
      <FaRegImageIcon className="text-gray-700" />
    </div>
    <div>
      <h4 className="text-[1.1rem] font-semibold text-gray-800 mt-1">
        Image to poll
      </h4>
      <p className="text-[0.8rem] text-gray-600 leading-tight">
        Convert image into stunning and accurate poll
      </p>
    </div>
    <button className="bg-[#7B4CFF] text-white rounded-full mt-2 h-[34px] w-[65px] text-[12px] font-medium">
      Start
    </button>
  </Link>
</div>
{/* <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-md text-center">
  <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100">
    Share Your Location
  </h3>
  {isLocationBlocked ? (
    // If blocked, show this message
    <div className="text-red-500">
      <p>Location access is blocked.</p>
      <p className="text-gray-600 dark:text-gray-400 mt-1">
        Please enable it in your browser's site settings to use this feature.
      </p>
    </div>
  ) : (
    // Otherwise, show the button
    <button onClick={handleGetLocation} className="...">
      Get My Location
    </button>
  )}

  {userLocation && (
    <p className="mt-3 text-sm text-gray-700 dark:text-gray-300">
      ✅ Latitude: {userLocation.latitude.toFixed(6)}, Longitude:{" "}
      {userLocation.longitude.toFixed(6)} <br />
      🎯 Accuracy: ±{Math.round(userLocation.accuracy)} meters
    </p>
  )}
  {locationError && (
    <p className="mt-3 text-sm text-red-500">{locationError}</p>
  )}
   {!isLocationBlocked && locationError && (
    <p className="mt-3 text-sm text-red-500">{locationError}</p>
  )}
</div> */}

      {/* Live Polls Section */}
      <div className="mt-4">
        <div className="flex items-center gap-4 mb-3">
          <h3 className="font-bold text-lg">Live polls</h3>
          {livePolls.length > 0 && !isLoadingPolls && (
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
          )}
        </div>
        {/* Filter Buttons */}
        <div className="flex gap-2 mb-4">
          {["Trending", "Latest", "Expiring Soon"].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-1.5 text-sm font-medium rounded-full transition-colors ${
                activeFilter === filter
                  ? "bg-pink-500 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Poll List */}
        {isLoadingPolls ? (
          <p className="text-center text-gray-500 dark:text-gray-400 py-8">
            Loading polls...
          </p>
        ) : filteredPolls.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPolls.map((poll) => (
              <PollCard key={poll._id} poll={poll} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400 py-8">
            No live polls at the moment. Why not create one?
          </p>
        )}
      </div>
    </div>
  );
};

export default HomePage;