import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { getSubscription, subscribeUser, unsubscribeUser } from '../../utils/pushNotifications';
import { Bell, BellOff, XCircle } from 'lucide-react';

const NotificationToggle = () => {
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const isPushSupported = 'serviceWorker' in navigator && 'PushManager' in window;

    useEffect(() => {
        if (!isPushSupported) {
            setIsLoading(false);
            return;
        }
        const checkSubscription = async () => {
            try {
                const sub = await getSubscription();
                setIsSubscribed(!!sub);
            } catch (error) {
                console.error('Error checking push subscription:', error);
            } finally {
                setIsLoading(false);
            }
        };
        checkSubscription();
    }, [isPushSupported]);

    const handleToggle = async () => {
        if (isLoading) return;
        setIsLoading(true);
        try {
            if (isSubscribed) {
                await unsubscribeUser();
                setIsSubscribed(false);
                toast.success('Push notifications disabled.');
            } else {
                await subscribeUser();
                setIsSubscribed(true);
                toast.success('Push notifications enabled!');
            }
        } catch (error) {
            toast.error(error.message || 'Could not change notification settings.');
            setIsSubscribed(isSubscribed);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isPushSupported) {
        return (
             <div className="flex items-center gap-3 p-4 rounded-2xl mb-6 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700/50">
                <XCircle className="w-10 h-10 text-yellow-500 flex-shrink-0" />
                <div>
                    <div className="font-semibold">Not Supported</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                        Push notifications are not available in this browser.
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-between p-4 rounded-2xl mb-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-700">
                    {isSubscribed ? <Bell className="text-green-500" /> : <BellOff className="text-gray-400" />}
                </div>
                <div>
                    <div className="font-semibold">Push Notifications</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                        {isSubscribed ? 'You will receive updates' : 'Receive updates on your device'}
                    </div>
                </div>
            </div>
            <button
                onClick={handleToggle}
                disabled={isLoading}
                className={`relative w-14 h-8 rounded-full transition-colors duration-300 flex items-center ${
                    isSubscribed ? 'bg-pyngl-pink' : 'bg-gray-300 dark:bg-gray-600'
                }`}
            >
                {/* --- THIS IS THE FIX --- */}
                {/* The inner 'knob' of the toggle switch */}
                <span className={`absolute w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${
                    isSubscribed ? 'translate-x-7' : 'translate-x-1'
                }`} />
            </button>
        </div>
    );
};

export default NotificationToggle;