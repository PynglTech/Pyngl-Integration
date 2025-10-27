import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell, Trash2, Clock, CheckCircle2, PartyPopper, Lightbulb } from 'lucide-react';
import useNotificationStore from '../store/useNotificationStore';
import { formatDistanceToNow } from 'date-fns';
import { useSpring, animated } from 'react-spring';
import { useDrag } from 'react-use-gesture';
import WelcomeAnimation from '../components/common/Animation.jsx';

const AnimatedPollIcon = () => (
    <div className="flex items-center justify-center w-6 h-6">
        <style>{`
            .wave-bar { width: 4px; height: 100%; border-radius: 2px; animation: wave-animation 1.2s ease-in-out infinite; }
            .bar-1 { background-color: #4C9CFA; animation-delay: 0s; }
            .bar-2 { background-color: #7B4CFF; animation-delay: 0.1s; }
            .bar-3 { background-color: #E741D2; animation-delay: 0.2s; }
            @keyframes wave-animation { 0%, 40%, 100% { transform: scaleY(0.4); } 20% { transform: scaleY(1.0); } }
        `}</style>
        <div className="flex items-end justify-center w-full h-full gap-0.5">
            <div className="wave-bar bar-1"></div>
            <div className="wave-bar bar-2"></div>
            <div className="wave-bar bar-3"></div>
        </div>
    </div>
);

// A helper function to group notifications by date
const groupNotificationsByDate = (notifications) => {
    const groups = { Today: [], Yesterday: [], Older: [] };
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    notifications.forEach(notif => {
        const notifDate = new Date(notif.createdAt);
        if (notifDate.toDateString() === today.toDateString()) {
            groups.Today.push(notif);
        } else if (notifDate.toDateString() === yesterday.toDateString()) {
            groups.Yesterday.push(notif);
        } else {
            groups.Older.push(notif);
        }
    });

    return groups;
};

// This component is now smarter and handles the new notification types
const NotificationItem = ({ notification, onWelcomeClick }) => {
    const navigate = useNavigate();
    const { handleNotificationClick, deleteNotification } = useNotificationStore();
    const itemRef = useRef(null);
    const [{ x }, api] = useSpring(() => ({ x: 0 }));

    const bind = useDrag(({ down, movement: [mx], direction: [xDir], distance, cancel }) => {
        if (distance > (itemRef.current?.offsetWidth || 0) / 2 && xDir < 0) {
            cancel();
            api.start({ 
                x: -(itemRef.current?.offsetWidth || 0), 
                onResolve: () => deleteNotification(notification._id) 
            });
        } else {
            api.start({ x: down ? mx : 0, immediate: down });
        }
    }, {
        axis: 'x',
        bounds: { left: -Infinity, right: 0 },
        rubberband: true
    });

    const handleClick = async () => {
        const message = notification.message.toLowerCase();
        
        if (message.includes('welcome')) {
            if (!notification.read) {
                await handleNotificationClick(notification);
            }
            onWelcomeClick();
        } else {
            await handleNotificationClick(notification);
            if (notification.link) {
                navigate(notification.link);
            }
        }
    };
    
    const getIcon = () => {
        const message = notification.message.toLowerCase();
        if (message.includes('welcome')) return <PartyPopper className="w-6 h-6 text-purple-500" />;
        if (notification.link === '/create-poll' && !message.includes('welcome')) return <Lightbulb className="w-6 h-6 text-yellow-500" />;
        if (message.includes('created') || message.includes('live')) return <AnimatedPollIcon />;
        if (message.includes('ending soon')) return <Clock className="w-6 h-6 text-orange-500" />;
        return <CheckCircle2 className="w-6 h-6 text-green-500" />;
    };
    
    const isClickable = !notification.message.toLowerCase().includes('welcome');

    return (
        <div ref={itemRef} className="relative bg-red-500 rounded-2xl overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-end pr-8 text-white">
                <Trash2 size={24} />
            </div>
            
             <animated.div
                {...bind()}
                style={{ x, touchAction: 'pan-y' }}
                onClick={handleClick}
                // Updated with full dark mode classes
                className={`
                    relative z-10 flex items-start gap-4 p-4 rounded-2xl border transition-colors
                    ${isClickable ? 'cursor-pointer hover:shadow-md' : 'cursor-default'}
                    ${!notification.read 
                        ? 'bg-pink-50 border-pink-200 dark:bg-pink-900/40 dark:border-pink-700' 
                        : 'bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700'}
                `}
            >
                <div className="flex-shrink-0 w-10 h-10 bg-white dark:bg-gray-700 rounded-full flex items-center justify-center border dark:border-gray-600">
                    {getIcon()}
                </div>
                <div className="flex-grow">
                    <p className="font-semibold text-gray-800 dark:text-gray-200">{notification.message}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                    </p>
                </div>
            </animated.div>
        </div>
    );
};
export default function NotificationsPage() {
    const navigate = useNavigate();
    const { notifications, markAsRead } = useNotificationStore();
    const [showWelcome, setShowWelcome] = useState(false);

    useEffect(() => {
        markAsRead();
    }, [markAsRead]);

    useEffect(() => {
        const unreadWelcome = notifications.find(n => !n.read && n.message.toLowerCase().includes('welcome'));
        if (unreadWelcome) {
            setShowWelcome(true);
        }
    }, [notifications]);

    const groupedNotifications = groupNotificationsByDate(notifications);

    return (
         <div className="mx-auto min-h-screen max-w-md bg-gray-50 dark:bg-gray-900">
            {showWelcome && <WelcomeAnimation onComplete={() => setShowWelcome(false)} />}

            {/* Updated with dark mode and blur classes */}
            <div className="sticky top-0 z-40 border-b border-gray-100 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md">
                <div className="flex items-center justify-between p-4">
                    <button onClick={() => navigate(-1)}>
                        <ArrowLeft className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                    </button>
                    <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Notifications</h1>
                    <div className="w-6"></div>
                </div>
            </div>
            <div className="p-4">
                {notifications.length === 0 ? (
                    // Updated "empty state" with dark mode classes
                    <div className="text-center text-gray-500 dark:text-gray-400 pt-20">
                        <Bell size={48} className="mx-auto text-gray-300 dark:text-gray-600" />
                        <h3 className="mt-4 text-xl font-semibold">No Notifications Yet</h3>
                        <p className="mt-2 text-sm">Create your first poll to see updates here!</p>
                    </div>
                ) : (
                    Object.keys(groupedNotifications).map(group => (
                        groupedNotifications[group].length > 0 && (
                            <div key={group} className="mb-6">
                                <h2 className="font-bold text-gray-500 dark:text-gray-400 text-sm mb-3 px-2">{group}</h2>
                                <div className="space-y-3">
                                    {groupedNotifications[group].map(notif => (
                                        <NotificationItem 
                                            key={notif._id} 
                                            notification={notif} 
                                            onWelcomeClick={() => setShowWelcome(true)} 
                                        />
                                    ))}
                                </div>
                            </div>
                        )
                    ))
                )}
            </div>
        </div>
    );
}