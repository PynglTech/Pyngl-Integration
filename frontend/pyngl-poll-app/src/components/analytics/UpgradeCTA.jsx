import React from 'react';
import { Zap } from 'lucide-react';

const UpgradeCTA = () => {
    return (
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 text-center shadow-sm">
            
            {/* Icon for visual flair */}
            <div className="w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center bg-white/50 dark:bg-gray-700/50">
                <Zap className="w-6 h-6 text-pyngl-purple" />
            </div>

            {/* Text Content */}
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
                Unlock Advanced Analytics
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 max-w-xs mx-auto">
                Get real-time insights, demographics, and powerful export features with a Plus account.
            </p>

            {/* Button */}
            <button className="bg-pyngl-pink text-white px-6 py-2.5 rounded-full font-semibold text-sm hover:opacity-90 transition-opacity">
                Upgrade to Plus
            </button>
        </div>
    );
};

export default UpgradeCTA;