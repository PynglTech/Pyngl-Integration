// File: components/analytics/TotalVotesCard.jsx
import React from 'react';

const TotalVotesCard = ({ totalVotes }) => {
    return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm text-center">
            <div className="text-5xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                {(totalVotes || 0).toLocaleString()}
            </div>
            <div className="text-gray-500 dark:text-gray-400">
                Total Votes
            </div>
        </div>
    );
};

export default TotalVotesCard;