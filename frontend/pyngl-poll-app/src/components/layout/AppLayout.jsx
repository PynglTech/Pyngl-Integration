import React, { useEffect, useRef } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import BottomNav from "./BottomNav";
import useAuthStore from "../../store/useAuthStore";
import useNotificationStore from "../../store/useNotificationStore";
import io from "socket.io-client";
import { Bell } from "lucide-react";
import { Toaster } from "react-hot-toast";
import { Howl, Howler } from "howler";

const AppLayout = () => {
  const navigate = useNavigate();
  const { userInfo } = useAuthStore();
  const { addNotification, fetchNotifications, unreadCount } =
    useNotificationStore();
  const notificationSound = useRef(null);

  // Load sound
  useEffect(() => {
    notificationSound.current = new Howl({
      src: ["/notification.mp3"],
      volume: 0.6,
    });
  }, []);

  // WebSocket notifications
  useEffect(() => {
    if (!userInfo) return;

    fetchNotifications();

    const socket = io("https://192.168.1.8:5000", {
      transports: ["websocket"],
      rejectUnauthorized: false,
    });

    socket.on("connect", () => {
      console.log("WebSocket connected:", socket.id);
      socket.emit("join", userInfo._id);
    });

    socket.on("new_notification", (notification) => {
      addNotification(notification);
      if (notificationSound.current) notificationSound.current.play();
    });

    socket.on("connect_error", (err) => {
      console.error("WebSocket Connection Error:", err.message);
    });

    return () => {
      socket.disconnect();
    };
  }, [userInfo, addNotification, fetchNotifications]);

  // Unlock audio on first interaction
  useEffect(() => {
    const unlockAudio = () => {
      if (Howler.ctx && Howler.ctx.state === "suspended") Howler.ctx.resume();
      document.body.removeEventListener("click", unlockAudio);
      document.body.removeEventListener("touchstart", unlockAudio);
    };

    document.body.addEventListener("click", unlockAudio);
    document.body.addEventListener("touchstart", unlockAudio);

    return () => {
      document.body.removeEventListener("click", unlockAudio);
      document.body.removeEventListener("touchstart", unlockAudio);
    };
  }, []);

  const location = useLocation();
  const isHomePage = location.pathname === "/dashboard";

  return (
    <div className="font-sans bg-gray-50 dark:bg-gray-900 w-full min-h-screen flex justify-center transition-colors">
      <div className="flex flex-col w-full h-full md:w-7/6 lg:w-4/5 xl:w-3/4 2xl:w-2/3 bg-gray-50 dark:bg-gray-900 transition-colors">
        <Toaster position="top-center" />

        {/* Header */}
        {isHomePage && (
          <header className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0 bg-white dark:bg-gray-800 transition-colors">
            <img
              src="/pynglLogoImage.png"
              alt="Logo"
              className="h-[27px] w-[76px] block dark:hidden"
            />
            <img
              src="/logo_dark.svg"
              alt="Logo Dark"
              className="h-[27px] w-[76px] hidden dark:block"
            />

            <button
              onClick={() => navigate("/notifications")}
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
          </header>
        )}

        {/* Main content */}
        <main className="flex-grow overflow-y-auto">
          <Outlet />
        </main>

        {/* Bottom Navigation */}
        <BottomNav />
      </div>
    </div>
  );
};

export default AppLayout;
