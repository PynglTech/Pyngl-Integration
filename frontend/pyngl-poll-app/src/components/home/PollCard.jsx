import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export const PollCard = ({ poll }) => {
    // The calculateRemainingTime logic remains the same
    const calculateRemainingTime = (expiresAt) => {
        // ...
        return "Poll ended";
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
        <Link to={`/poll/${poll._id}`} className="block rounded-2xl border border-gray-200 p-4 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700/50 transition-colors">
            <h3 className="font-semibold mb-3 pr-4 text-gray-800 dark:text-gray-100">{poll.question}</h3>
            {poll.imageUrl && (
                <img src={poll.imageUrl} alt="Poll visual" className="rounded-lg mb-3 w-full h-32 object-cover" />
            )}
            <div className="space-y-2">
                {poll.options.slice(0, 2).map((option) => (
                    <div key={option._id} className="w-full border border-gray-200 dark:border-gray-600 rounded-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 truncate">
                        {option.text}
                    </div>
                ))}
            </div>
            <div className="flex justify-between items-center mt-4 text-xs font-semibold">
                <span className="text-pyngl-pink">{poll.totalVotes} Votes</span>
                <span className="text-gray-500 dark:text-gray-400">{remainingTime}</span>
            </div>
        </Link>
    );
};

export const PollCardSkeleton = () => (
    <div className="rounded-2xl border border-gray-200 p-4 bg-white dark:bg-gray-800 dark:border-gray-700">
        <div className="h-6 w-3/4 mb-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        <div className="space-y-2">
            <div className="h-9 w-full bg-gray-100 dark:bg-gray-700 rounded-full animate-pulse"></div>
            <div className="h-9 w-full bg-gray-100 dark:bg-gray-700 rounded-full animate-pulse"></div>
        </div>
        <div className="flex justify-between items-center mt-4">
            <div className="h-4 w-1/4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            <div className="h-4 w-1/4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        </div>
    </div>
);