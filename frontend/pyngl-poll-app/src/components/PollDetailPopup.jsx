import React from "react";
import { X, BarChart2, Users, Clock } from "lucide-react";

const PollDetailPopup = ({ poll, onClose, onSeeAnalytics }) => {
    if (!poll) return null;

    const totalVotes = (poll.options || []).reduce((sum, o) => sum + (o.votes || 0), 0);

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-60 dark:bg-opacity-70 flex items-center justify-center z-50 p-4 backdrop-blur-sm animate-fade-in"
            onClick={onClose}
        >
            <div
                className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-sm p-4 space-y-4 shadow-xl"
                onClick={(e) => e.stopPropagation()}
            >
                
                <div>
                    {poll.status === 'Active' ? (
                        <div className="flex items-center gap-1.5 bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 px-2 py-1 rounded-full text-xs font-semibold mb-3 w-min">
                            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                            Live
                        </div>
                    ) : (
                        <div className="flex items-center gap-1.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded-full text-xs font-semibold mb-3 w-min">
                            Closed
                        </div>
                    )}
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 leading-tight mb-4">
                        {poll.question}
                    </h3>
                       {poll.imageUrl && (
                        <img 
                            src={poll.imageUrl} 
                            alt="Poll visual" 
                            className="w-full h-40 object-cover rounded-xl mb-4" 
                        />
                    )}
  
                    <div className="space-y-3">
                        {(poll.options || []).map(option => {
                            const percent = totalVotes > 0 ? Math.round(((option.votes || 0) / totalVotes) * 100) : 0;
                            return (
                                <div key={option._id} className="w-full bg-gray-100 dark:bg-gray-700 rounded-lg h-10 flex items-center relative overflow-hidden">
                                    <div
                                        className="h-full rounded-lg bg-gradient-to-r from-blue-400 to-pink-400"
                                        style={{ width: `${percent}%`, transition: 'width 0.5s ease-in-out' }}
                                    />
                                    <div className="absolute inset-0 px-3 flex justify-between items-center">
                                        <span className="font-medium text-gray-800 dark:text-gray-200">{option.text}</span>
                                        <span className="font-semibold text-gray-700 dark:text-gray-300">{percent}%</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* "See Analytics" Button */}
                <button
                    onClick={onSeeAnalytics}
                    className="w-full py-3 bg-pyngl-pink text-white rounded-xl font-semibold text-base shadow-md hover:opacity-90 transition-opacity"
                >
                    See Analytics
                </button>

                {/* Footer with Total Votes and Time */}
                <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 pt-1">
                    <div className="flex items-center gap-1.5">
                        <Users size={16} />
                        <span>Total votes: {totalVotes}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Clock size={16} />
                        <span>{poll.timeLeft}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PollDetailPopup;