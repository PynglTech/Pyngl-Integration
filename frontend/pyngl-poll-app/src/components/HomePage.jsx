import React, { useState, useEffect } from "react";
import useAuthStore from '../store/useAuthStore'; 
import { Link, useLocation } from 'react-router-dom';
import apiClient from '../api/axiosConfig'; 
import "./HomePage.css";


const TfiTextIcon = ({ size = 15, color = "#008060" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>
);

const FaRegImageIcon = ({ size = 15, color = "#D47D00" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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

    const [remainingTime, setRemainingTime] = useState(calculateRemainingTime(poll.expiresAt));

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
                <h3 className="font-medium mb-3 pr-4 text-gray-900 dark:text-gray-100">{poll.question}</h3>
            </div>
            {poll.imageUrl && (
                <img src={poll.imageUrl} alt="Poll visual" className="rounded-lg mb-3 w-full h-32 object-cover" />
            )}
            <div className="space-y-2">
                {poll.options.slice(0, 2).map(option => (
                    <div
                        key={option._id}
                        className="w-full border rounded-full px-4 py-2 text-left text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-gray-700 truncate"
                    >
                        {option.text}
                    </div>
                ))}
            </div>
            <div className="flex justify-between items-center mt-3 text-xs">
                <span className="font-medium text-pink-500">{poll.options.reduce((acc, opt) => acc + opt.votes, 0)} Votes</span>
                <span className="font-semibold text-pink-500">{remainingTime}</span>
            </div>
        </Link>
    );
};

const HomePage = () => {
    const { finishLoading } = useAuthStore();
    const location = useLocation();

    const [livePolls, setLivePolls] = useState([]);
    const [filteredPolls, setFilteredPolls] = useState([]);
    const [isLoadingPolls, setIsLoadingPolls] = useState(true);
    const [activeFilter, setActiveFilter] = useState('Trending');

    useEffect(() => { finishLoading(); }, [finishLoading]);

    useEffect(() => {
        const fetchLivePolls = async () => {
            try {
                setIsLoadingPolls(true);
                const response = await apiClient.get('/api/polls/live');
                const polls = response.data;
                if (location.state?.newPoll) {
                    const pollExists = polls.some(p => p._id === location.state.newPoll._id);
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
        let sortedPolls = [...livePolls];
        if (activeFilter === 'Trending') sortedPolls.sort((a, b) => b.options.reduce((sum, o) => sum + o.votes, 0) - a.options.reduce((sum, o) => sum + o.votes, 0));
        if (activeFilter === 'Latest') sortedPolls.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        if (activeFilter === 'Expiring Soon') sortedPolls.sort((a, b) => new Date(a.expiresAt) - new Date(b.expiresAt));
        setFilteredPolls(sortedPolls);
    }, [livePolls, activeFilter]);

    return (
        <div className="flex flex-col gap-5 p-4 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen max-w-md mx-auto">
            
            {/* Upgrade Card */}
            <div className="upgrade-card-wrapper">
                <div className="upgrade-card">
                    <div className="upgrade-image-container">
                        <img src="/HomePageImgOne.png" alt="Upgrade to Pro" className="promo-image" />
                        <div className="gradient-overlay"></div>
                        <div className="upgrade-text-content">
                            <h3><span className="pro-icon">✨</span> Upgrade to pro!</h3>
                            <p>Enjoy all benefits without any restrictions.</p>
                        </div>
                    </div>
                    <button className="upgrade-now-button upgradeButton">Upgrade Now</button>
                </div>
            </div>

            {/* Poll Options */}
                        <div className="poll-options-panel">
                <Link to="/create-text-poll" className="poll-card text-poll-card">
                    <div className="poll-card-icon-wrapper"><TfiTextIcon /></div>
                    <h4>Text to poll</h4>
                    <p>Convert text into stunning and accurate poll</p>
                    <button className="start-button butStart">Start</button>
                </Link>
                <Link to="/create-image-poll" className="poll-card image-poll-card">
                    <div className="poll-card-icon-wrapper"><FaRegImageIcon /></div>
                    <h4>Image to poll</h4>
                    <p>Convert text into stunning and accurate poll</p>
                    <button className="start-button butStart">Start</button>
                </Link>
            </div>

            {/* Live Polls Section */}
            <div className="mt-4">
                <div className="flex justify-between items-center mb-3">
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
                    {['Trending','Latest','Expiring Soon'].map(filter => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={`px-4 py-1.5 text-sm font-medium rounded-full transition-colors ${
                                activeFilter === filter
                                    ? 'bg-pink-500 text-white'
                                    : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                            }`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>

                {/* Poll List */}
                {isLoadingPolls ? (
                    <p className="text-center text-gray-500 dark:text-gray-400 py-8">Loading polls...</p>
                ) : filteredPolls.length > 0 ? (
                    filteredPolls.map(poll => <PollCard key={poll._id} poll={poll} />)
                ) : (
                    <p className="text-center text-gray-500 dark:text-gray-400 py-8">No live polls at the moment. Why not create one?</p>
                )}
            </div>
        </div>
    );
};

export default HomePage;
    