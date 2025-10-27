import React from 'react';
import { Eye, MousePointerClick } from 'lucide-react';

// This helper map allows us to easily show a relevant icon for each stat type
const iconMap = {
    'Views': <Eye size={18} />,
    'Clicks': <MousePointerClick size={18} />,
};

const StatCard = ({ label, value }) => {
    const Icon = iconMap[label] || null;

    return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 shadow-sm transition-colors">
            
            {/* The label with its corresponding icon */}
            <div className="flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                {Icon}
                <span>{label}</span>
            </div>

            {/* The large stat value, formatted with commas */}
            <div className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                {(value || 0).toLocaleString()}
            </div>
        </div>
    );
};

export default StatCard;