// File: components/analytics/AnalyticsHeader.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell } from 'lucide-react';

const AnalyticsHeader = () => {
    const navigate = useNavigate();
    
    return (
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
            <div className="flex items-center justify-between p-4">
                <button onClick={() => navigate(-1)} className="p-1">
                    <ArrowLeft className="w-6 h-6 text-gray-700 dark:text-gray-200" />
                </button>
                <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Poll Analytics
                </h1>
                <button onClick={() => navigate('/notifications')} className="p-1">
                    <Bell className="w-6 h-6 text-gray-700 dark:text-gray-200" />
                </button>
            </div>
        </header>
    );
};

export default AnalyticsHeader;