import React from 'react';
import { Target, Tag as TagIcon } from 'lucide-react'; // Using lucide for consistency

const platformColors = {
    Instagram: "bg-pink-500",
    LinkedIn: "bg-blue-600",
    WhatsApp: "bg-green-500",
    Twitter: "bg-blue-400",
    Youtube: "bg-red-500",
    Telegram: "bg-sky-500",
    iMessages: "bg-indigo-500",
    Gmail: "bg-yellow-500",
    Messages: "bg-purple-500",
    Facebook: "bg-blue-700",
};

// --- Sub-component for Platform Rows ---
const PlatformRow = ({ name, percentage }) => (
    <div className="py-3">
        <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-3">
                <img src={`/icons/${name}.svg`} alt={name} className="w-5 h-5" />
                <span className="font-medium text-gray-800 dark:text-gray-200">{name}</span>
            </div>
            <span className="font-semibold text-gray-700 dark:text-gray-300">{percentage}%</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
            <div
                className={`h-2 rounded-full ${platformColors[name] || 'bg-gray-400'}`}
                style={{ width: `${percentage}%` }}
            />
        </div>
    </div>
);

// --- Sub-component for Timing Cards (Early vs Late) ---
const TimingCard = ({ label, percentage, count }) => (
    <div className="text-center bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-700/50 dark:to-gray-600/50 rounded-2xl p-4 border border-gray-200 dark:border-gray-700">
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">{label}</div>
        <div className="text-3xl font-bold text-pyngl-pink mb-1">{percentage.toFixed(1)}%</div>
        <div className="text-sm text-gray-700 dark:text-gray-300">{count?.toLocaleString()} Votes</div>
    </div>
);

// --- Sub-component for Tag-like items (Device/Browser) ---
const DataTag = ({ name, percentage }) => (
    <div className="flex items-center gap-2 border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 px-3 py-1.5 rounded-full text-sm font-medium">
        <TagIcon size={14} />
        <span>{name} <strong>{percentage}%</strong></span>
    </div>
);


// --- Main BreakdownCard Component ---
const BreakdownCard = ({ title, data, total, type }) => {
    // Check if data exists and is not an empty object
    const hasData = data && Object.keys(data).length > 0;

    return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">{title}</h3>
            
            {!hasData && <p className="text-sm text-gray-500 dark:text-gray-400">No data available for this breakdown.</p>}

            {hasData && type === 'platform' && (
                <div className="divide-y divide-gray-100 dark:divide-gray-700">
                    {Object.entries(data).map(([name, count]) => (
                        <PlatformRow
                            key={name}
                            name={name}
                            percentage={Math.round((count / (total || 1)) * 100)}
                        />
                    ))}
                </div>
            )}

            {hasData && type === 'timing' && (
                <div className="grid grid-cols-2 gap-4">
                    {Object.entries(data).map(([label, count]) => (
                        <TimingCard
                            key={label}
                            label={label}
                            count={count}
                            percentage={total > 0 ? (count / total) * 100 : 0}
                        />
                    ))}
                </div>
            )}

            {hasData && type === 'tags' && (
                <div className="flex flex-wrap gap-2">
                    {Object.entries(data).map(([name, count]) => (
                        <DataTag
                            key={name}
                            name={name}
                            percentage={Math.round((count / (total || 1)) * 100)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default BreakdownCard;