import React from 'react';

const PollTitleCard = ({ question, status, msLeft }) => {
    
    const getStatusColor = () => {
        if (msLeft === 0) return "bg-gray-400";        // Expired
        if (msLeft < 1000 * 60 * 60) return "bg-red-500"; // <1 hour left
        if (msLeft < 1000 * 60 * 60 * 24) return "bg-orange-500"; // <1 day left
        return "bg-green-500"; // >1 day left
    };

    return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                {question}
            </h2>
            <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${getStatusColor()}`}></div>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{status}</span>
            </div>
        </div>
    );
};

export default PollTitleCard;