import React from 'react';
import { PollCard, PollCardSkeleton } from './PollCard';

const LivePollsSection = ({ isLoading, polls, activeFilter, setActiveFilter }) => {
    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">Live Polls</h3>
                {!isLoading && polls.length > 0 && (
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                    </span>
                )}
            </div>
            <div className="flex items-center gap-2 mb-4">
                {['Trending', 'Latest', 'Expiring Soon'].map(filter => (
                    <button key={filter} onClick={() => setActiveFilter(filter)} className={`px-4 py-1.5 text-sm font-medium rounded-full transition-colors ${activeFilter === filter ? 'bg-pyngl-pink text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'}`}>
                        {filter}
                    </button>
                ))}
            </div>
            <div className="space-y-4">
                {isLoading ? (
                    <>
                        <PollCardSkeleton />
                        <PollCardSkeleton />
                    </>
                ) : polls.length > 0 ? (
                    polls.map((poll) => <PollCard key={poll._id} poll={poll} />)
                ) : (
                    <p className="text-center text-gray-500 dark:text-gray-400 py-8">No live polls right now. Why not create one?</p>
                )}
            </div>
        </div>
    );
};

export default LivePollsSection;