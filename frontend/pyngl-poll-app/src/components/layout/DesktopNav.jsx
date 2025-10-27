import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/useAuthStore';
import useNotificationStore from '../../store/useNotificationStore';
import { Bell, User, CheckCheck } from 'lucide-react';

// --- Reusable sub-components for the header ---
const useClickOutside = (ref, handler) => {
    useEffect(() => {
        const listener = (event) => {
            if (!ref.current || ref.current.contains(event.target)) return;
            handler(event);
        };
        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);
        return () => {
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener);
        };
    }, [ref, handler]);
};

const ProfileAvatar = () => {
    const { userInfo } = useAuthStore();
    const getInitials = (firstName = '', lastName = '') => `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase();
    if (!userInfo) return null;
    return (
        <Link to="/profile" title="Profile" className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
            {userInfo.profilePhoto ? (
                <img src={userInfo.profilePhoto} alt="Profile" className="w-8 h-8 rounded-full object-cover" />
            ) : (
                <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold text-sm">
                    {getInitials(userInfo.firstName, userInfo.lastName)}
                </div>
            )}
        </Link>
    );
};

const NotificationsPanel = ({ onClose }) => {
    const { notifications, unreadCount, markAllAsRead } = useNotificationStore();
    return (
        <div className="absolute top-14 right-0 w-80 md:w-96 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden animate-fade-in-down">
            <div className="p-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-lg">Notifications</h3>
                {unreadCount > 0 && (<button onClick={markAllAsRead} className="text-sm text-pink-500 font-semibold hover:text-pink-700 flex items-center gap-1"><CheckCheck size={16} /> Mark all as read</button>)}
            </div>
            <div className="max-h-96 overflow-y-auto">{notifications.length > 0 ? ( notifications.map(notif => ( <div key={notif._id} className={`p-4 border-b border-gray-100 dark:border-gray-700 flex items-start gap-3 ${!notif.isRead ? 'bg-pink-50 dark:bg-pink-900/20' : ''}`}><div className="w-2 h-2 rounded-full bg-pink-500 mt-2 flex-shrink-0" style={{ opacity: !notif.isRead ? 1 : 0 }}></div><div><p className="text-gray-800 dark:text-gray-100">{notif.message}</p><span className="text-xs text-gray-400">{new Date(notif.createdAt).toLocaleString()}</span></div></div>))) : ( <p className="p-8 text-center text-gray-500">You have no notifications.</p> )}</div>
        </div>
    );
};

// --- The Main Desktop Navigation Component ---
const DesktopNav = () => {
    const { userInfo } = useAuthStore();
    const { unreadCount } = useNotificationStore();
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const notificationsPanelRef = useRef(null);
    useClickOutside(notificationsPanelRef, () => setIsNotificationsOpen(false));

    return (
        <header className="sticky top-0 z-50 flex justify-between items-center px-6 lg:px-24 py-3 border-b border-gray-200 bg-white/80 backdrop-blur-md">
                       <Link to="/"><img src="/pynglLogoImage.png" alt="Pyngl Logo" className="h-8" /></Link>
                       <nav className="hidden lg:flex items-center gap-8">
                           <Link to="/" className="font-semibold text-pink-500">Home</Link>
                           <Link to="/trending" className="font-semibold text-gray-600 hover:text-pink-500 transition-colors">Trending</Link>
                           <Link to="/analytics" className="font-semibold text-gray-600 hover:text-pink-500 transition-colors">Analytics</Link>
                           <Link to="/polls" className="font-semibold text-gray-600 hover:text-pink-500 transition-colors">Polls activity</Link>
                       </nav>
                       <div className="hidden lg:flex items-center gap-4">
                           <Link to="/login" className="font-bold text-gray-800 hover:text-pink-500 transition-colors">Log In</Link>
                           <Link to="/signup" className="bg-gray-800 text-white font-bold py-2 px-5 rounded-lg hover:bg-gray-700 transition-all duration-300 hover:scale-105">Sign Up</Link>
                           <div ref={notificationsPanelRef} className="relative">
                                              <button onClick={() => setIsNotificationsOpen(prev => !prev)} title="Notifications" className="relative p-1">
                                                  <Bell className="w-6 h-6 text-gray-700 dark:text-gray-200" />
                                                  {unreadCount > 0 && (
                                                      <span className="absolute top-0 right-0 flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span></span>
                                                  )}
                                              </button>
                                              {isNotificationsOpen && <NotificationsPanel onClose={() => setIsNotificationsOpen(false)} />}
                                          </div>
                          
                           <Link to="/profile" className="p-1 rounded-full hover:bg-gray-100"><User size={20} className="text-gray-600"/></Link>
                       </div>
                   </header>
    );
};

export default DesktopNav;