import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Image } from 'lucide-react';

const PollCreationLinks = () => (
    <div className="grid grid-cols-2 gap-4">
        {/* Text Poll Card */}
        <Link 
            to="/create-text-poll" 
            className="p-4 rounded-2xl flex flex-col justify-between bg-gradient-to-br from-teal-50 to-green-100 border border-teal-200 dark:from-teal-900/50 dark:to-green-900/50 dark:border-teal-700 hover:-translate-y-1 transition-transform duration-300 shadow-sm hover:shadow-lg"
        >
            {/* Top section of the card */}
            <div>
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/70 dark:bg-white/10 mb-3">
                    <MessageSquare className="w-6 h-6 text-teal-600 dark:text-teal-400" />
                </div>
                <h3 className="font-bold text-gray-800 dark:text-white">Text Poll</h3>
                <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">Create a poll with text-based questions.</p>
            </div>

            {/* "Start" button styled as a div at the bottom */}
            <div className="mt-4 self-start px-5 py-1.5 bg-pyngl-purple text-white text-xs font-semibold rounded-full">
                Start
            </div>
        </Link>
        
        {/* Image Poll Card */}
        <Link 
            to="/create-image-poll" 
            className="p-4 rounded-2xl flex flex-col justify-between bg-gradient-to-br from-orange-50 to-amber-100 border border-orange-200 dark:from-orange-900/50 dark:to-amber-900/50 dark:border-orange-700 hover:-translate-y-1 transition-transform duration-300 shadow-sm hover:shadow-lg"
        >
            {/* Top section of the card */}
            <div>
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/70 dark:bg-white/10 mb-3">
                    <Image className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="font-bold text-gray-800 dark:text-white">Image Poll</h3>
                <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">Create a poll using engaging images.</p>
            </div>

            {/* "Start" button styled as a div at the bottom */}
            <div className="mt-4 self-start px-5 py-1.5 bg-pyngl-purple text-white text-xs font-semibold rounded-full">
                Start
            </div>
        </Link>
    </div>
);

export default PollCreationLinks;