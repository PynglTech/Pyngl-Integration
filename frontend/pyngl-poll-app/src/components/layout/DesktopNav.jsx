import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";
import useNotificationStore from "../../store/useNotificationStore";
import { Bell, CheckCheck } from "lucide-react";

// --- Click Outside Hook ---
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

// --- Profile Avatar ---
const ProfileAvatar = () => {
  const { userInfo } = useAuthStore();
  const getInitials = (firstName = "", lastName = "") =>
    `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase();

  if (!userInfo) return null;

  return (
    <Link
      to="/profile"
      title="Profile"
      className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
    >
      {userInfo.profilePhoto ? (
        <img
          src={userInfo.profilePhoto}
          alt="Profile"
          className="w-8 h-8 rounded-full object-cover"
        />
      ) : (
        <div className="w-8 h-8 rounded-full bg-pink-500 text-white flex items-center justify-center font-bold text-sm">
          {getInitials(userInfo.firstName, userInfo.lastName)}
        </div>
      )}
    </Link>
  );
};

// --- Notifications Panel ---
const NotificationsPanel = ({ onClose }) => {
  const { notifications, unreadCount, markAllAsRead } = useNotificationStore();

  return (
    <div className="absolute top-14 right-0 w-80 md:w-96 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden animate-fade-in-down">
      <div className="p-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
        <h3 className="font-bold text-lg">Notifications</h3>
        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="text-sm text-pink-500 font-semibold hover:text-pink-700 flex items-center gap-1"
          >
            <CheckCheck size={16} /> Mark all as read
          </button>
        )}
      </div>
      <div className="max-h-96 overflow-y-auto">
        {notifications.length > 0 ? (
          notifications.map((notif) => (
            <div
              key={notif._id}
              className={`p-4 border-b border-gray-100 dark:border-gray-700 flex items-start gap-3 ${
                !notif.isRead ? "bg-pink-50 dark:bg-pink-900/20" : ""
              }`}
            >
              <div
                className="w-2 h-2 rounded-full bg-pink-500 mt-2 flex-shrink-0"
                style={{ opacity: !notif.isRead ? 1 : 0 }}
              ></div>
              <div>
                <p className="text-gray-800 dark:text-gray-100">
                  {notif.message}
                </p>
                <span className="text-xs text-gray-400">
                  {new Date(notif.createdAt).toLocaleString()}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="p-8 text-center text-gray-500">
            You have no notifications.
          </p>
        )}
      </div>
    </div>
  );
};

// --- Main Desktop Navigation ---
const DesktopNav = () => {
  const { userInfo } = useAuthStore();
  const { unreadCount } = useNotificationStore();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const notificationsPanelRef = useRef(null);
  const location = useLocation();

  useClickOutside(notificationsPanelRef, () => setIsNotificationsOpen(false));

  // Helper for active nav highlighting
  const isActive = (path) =>
    location.pathname === path
      ? "text-pink-500 font-semibold"
      : "text-gray-600 dark:text-gray-300 hover:text-pink-500 transition-colors";

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 lg:px-24 py-3 border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md transition-colors duration-300">
      {/* --- LOGO --- */}
      <Link to="/" className="flex items-center gap-2">
        {/* Light mode logo */}
        <img
          src="/assets/pynglLogoImage.png"
          alt="Pyngl Logo"
          className="h-8 block dark:hidden"
        />
        {/* Dark mode logo */}
        <img
          src="/assets/logo_dark.svg"
          alt="Pyngl Dark Logo"
          className="h-8 hidden dark:block"
        />
      </Link>

      {/* --- NAVIGATION LINKS --- */}
      <nav className="hidden lg:flex items-center gap-8">
        <Link to="/" className={isActive("/dashboard")}>
          Home
        </Link>
        <Link to="/trending" className={isActive("/trending")}>
          Trending
        </Link>
        <Link to="/analytics" className={isActive("/analytics")}>
          Analytics
        </Link>
        <Link to="/polls" className={isActive("/polls")}>
          Polls activity
        </Link>
      </nav>

      {/* --- RIGHT SIDE --- */}
      <div className="hidden lg:flex items-center gap-4">
        {/* If NOT logged in */}
        {!userInfo ? (
          <>
            <Link
              to="/login"
              className="font-bold text-gray-800 dark:text-gray-200 hover:text-pink-500 transition-colors"
            >
              Log In
            </Link>
            <Link
              to="/signup"
              className="bg-gray-800 dark:bg-pink-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-gray-700 dark:hover:bg-pink-700 transition-all duration-300 hover:scale-105"
            >
              Sign Up
            </Link>
          </>
        ) : (
          <>
            {/* Notifications */}
            <div ref={notificationsPanelRef} className="relative">
              <button
                onClick={() => setIsNotificationsOpen((prev) => !prev)}
                title="Notifications"
                className="relative p-1"
              >
                <Bell className="w-6 h-6 text-gray-700 dark:text-gray-200" />
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
                  </span>
                )}
              </button>
              {isNotificationsOpen && (
                <NotificationsPanel
                  onClose={() => setIsNotificationsOpen(false)}
                />
              )}
            </div>

            {/* Profile */}
            <ProfileAvatar />
          </>
        )}
      </div>
    </header>
  );
};

export default DesktopNav;
