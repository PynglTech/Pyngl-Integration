import React, { useRef } from 'react';
import { toast } from 'react-hot-toast';
import { Edit2 } from 'lucide-react';
import useAuthStore from '../../store/useAuthStore';
import apiClient from '../../api/axiosConfig';

// A simple, reusable skeleton loader component
const Skeleton = ({ className }) => <div className={`animate-pulse rounded-md bg-gray-200 dark:bg-gray-700 ${className}`} />;

const ProfileOverviewCard = ({ stats, isLoading, activeFilter, setFilter }) => {
    const { userInfo, updateUserInfo } = useAuthStore();
    const fileInputRef = useRef(null);

    const handleAvatarClick = () => fileInputRef.current.click();

    const handleFileChange = async (e) => {
        // ... (keep the exact same handleFileChange logic from your original file)
    };

    const getInitials = (name = '') => name.split(' ').map(n => n[0]).join('').toUpperCase() || '?';

    return (
        <div className="border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm rounded-2xl p-4 relative mt-10 mb-6 transition-colors duration-300">
            {/* ... Avatar and file input logic remains the same ... */}
            <p className="text-center font-bold text-xl pt-14">{userInfo.username}</p>
            
            <div className="flex justify-around items-center my-4">
                <div className="text-center">
                    {isLoading ? <Skeleton className="h-9 w-12 mx-auto" /> : <div className="text-3xl font-bold">{stats.pingsCreated}</div>}
                    <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">Pings Created</div>
                </div>
                <div className="text-center">
                    {isLoading ? <Skeleton className="h-9 w-12 mx-auto" /> : <div className="text-3xl font-bold">{stats.totalParticipate}</div>}
                    <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">Participated</div>
                </div>
            </div>

            <div className="flex justify-center space-x-2">
                {['Week', 'Month', 'All-time'].map((filter) => (
                    <button key={filter} onClick={() => setFilter(filter)} /* ... styles ... */ >
                        {filter}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ProfileOverviewCard;