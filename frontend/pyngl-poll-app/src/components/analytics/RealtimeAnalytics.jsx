import React from 'react';
import { Activity } from 'lucide-react';

// A small, internal component for each stat to avoid repeating code
const StatItem = ({ value, label }) => (
    <div className="text-center">
        <div className="text-2xl font-bold text-pyngl-pink mb-1">{value}</div>
        <div className="text-xs text-gray-600 dark:text-gray-400">{label}</div>
    </div>
);

const RealtimeAnalytics = ({ responseRate, completed, avgTime }) => {

    // An array to hold the stats makes the code cleaner and easier to update
    const stats = [
        { label: 'Response Rate', value: responseRate },
        { label: 'Viewers Completed', value: completed },
        { label: 'Avg. Time', value: avgTime },
    ];

    return (
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 shadow-sm">
            
            {/* Header with an icon */}
            <div className="flex items-center gap-2 mb-4">
                <Activity size={18} className="text-pyngl-purple" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Real-time Analytics
                </h3>
            </div>

            {/* Grid to display the stats */}
            <div className="grid grid-cols-3 gap-4">
                {stats.map(stat => (
                    <StatItem key={stat.label} value={stat.value} label={stat.label} />
                ))}
            </div>
        </div>
    );
};

export default RealtimeAnalytics;