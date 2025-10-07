// import React, { useState, useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-hot-toast';
// import { ArrowLeft, Bell, Eye, EyeOff, ChevronRight, User, Mail, Smartphone, Edit2, LogOut, HelpCircle,FileText, Shield } from 'lucide-react';
// import useAuthStore from '../store/useAuthStore';
// import useThemeStore from '../store/useThemeStore.js';
// import apiClient from '../api/axiosConfig';
// import BottomNav from '../components/layout/BottomNav';
// import useNotificationStore from '../store/useNotificationStore';

// export default function ProfilePage() {
//     const navigate = useNavigate();
//     const { userInfo, logout, updateUserInfo } = useAuthStore();
//     const { unreadCount } = useNotificationStore();
//     const [stats, setStats] = useState({ pingsCreated: 0, totalParticipate: 0 });
//     const [isLoadingStats, setIsLoadingStats] = useState(true);
//     const [activeTimeFilter, setActiveTimeFilter] = useState('Week');
//     const fileInputRef = useRef(null);

//     // State for the user information form, pre-filled with user data
//     const [formData, setFormData] = useState({
//         name: userInfo?.username || '',
//         email: userInfo?.email || '',
//         phone: userInfo?.phoneNumber || '',
//     });

//     // Separate state for the password change form
//     const [passwordData, setPasswordData] = useState({
//         oldPassword: '',
//         newPassword: '',
//         confirmPassword: '',
//     });
//     const [showPasswords, setShowPasswords] = useState({ old: false, new: false, confirm: false });

//     // Effect to fetch user statistics based on the selected time filter
//     useEffect(() => {
//         const fetchUserStats = async () => {
//             setIsLoadingStats(true);
//             try {
//                 const periodMap = { 'Week': 'week', 'Month': 'month', 'All-time': 'all-time' };
//                 const period = periodMap[activeTimeFilter];
//                 const response = await apiClient.get(`/api/users/profile-stats?period=${period}`);
//                 setStats(response.data);
//             } catch (error) {
//                 console.error("Failed to fetch user stats:", error);
//                 toast.error("Could not load profile stats.");
//             } finally {
//                 setIsLoadingStats(false);
//             }
//         };
//         if (userInfo) {
//             fetchUserStats();
//         }
//     }, [activeTimeFilter, userInfo]);

//     const handleAvatarClick = () => {
//         fileInputRef.current.click();
//     };

//     const handleFileChange = async (e) => {
//         const file = e.target.files[0];
//         if (!file) return;
//         const toastId = toast.loading('Uploading...');
//         const formData = new FormData();
//         formData.append('profilePicture', file);
//         try {
//             const response = await apiClient.put('/api/users/profile/picture', formData, {
//                 headers: { 'Content-Type': 'multipart/form-data' },
//             });
//             updateUserInfo(response.data);
//             toast.success('Profile picture updated!', { id: toastId });
//         } catch (error) {
//             toast.error(error.response?.data?.error || 'Upload failed.', { id: toastId });
//         }
//     };

//     const handleInfoUpdate = async (e) => {
//         e.preventDefault();
//         const toastId = toast.loading('Updating information...');
//         try {
//             const response = await apiClient.put('/api/users/profile', formData);
//             updateUserInfo(response.data);
//             toast.success('Information updated!', { id: toastId });
//         } catch (error) {
//             toast.error(error.response?.data?.error || 'Update failed.', { id: toastId });
//         }
//     };

//     const handlePasswordUpdate = async (e) => {
//         e.preventDefault();
//         if (passwordData.newPassword !== passwordData.confirmPassword) {
//             return toast.error("New passwords do not match.");
//         }
//         if (!passwordData.oldPassword || !passwordData.newPassword) {
//             return toast.error("Please fill all password fields.");
//         }
//         const toastId = toast.loading('Changing password...');
//         try {
//             await apiClient.put('/api/users/profile/password', passwordData);
//             toast.success('Password updated successfully!', { id: toastId });
//             setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
//         } catch (error) {
//             toast.error(error.response?.data?.error || 'Update failed.', { id: toastId });
//         }
//     };

//     const handleLogout = () => {
//         logout();
//         navigate('/');
//     };

//     const getInitials = (name = '') => name.split(' ').map(n => n[0]).join('').toUpperCase() || '?';

//     if (!userInfo) {
//         // This handles the brief moment after logout before the redirect happens
//         useEffect(() => { navigate('/'); }, [navigate]);
//         return null;
//     }

//     return (
//         <div className="mx-auto min-h-screen max-w-md bg-gray-50 text-gray-900">
//             {/* Header */}
//             <div className="sticky top-0 z-40 border-b border-gray-100 bg-white/80 backdrop-blur-md">
//                 <div className="flex items-center justify-between p-4">
//                     <button onClick={() => navigate(-1)}><ArrowLeft className="w-6 h-6 text-gray-700" /></button>
//                     <h1 className="text-lg font-semibold">Profile</h1>
//                      <button onClick={() => navigate('/notifications')} className="relative p-1">
//                         <Bell className="w-6 h-6 text-gray-700" />
//                         {unreadCount > 0 && (
//                             <span className="absolute top-0 right-0 flex h-3 w-3">
//                                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
//                                 <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
//                             </span>
//                         )}
//                     </button>
//                 </div>
//             </div>

//             <div className="p-4 pb-24">
//                 {/* Overview Section */}
//                 <div className="border bg-white border-gray-200 shadow-sm rounded-2xl p-4 relative mt-10 mb-6">
//                     <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24">
//                         <button onClick={handleAvatarClick} className="w-full h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg relative group">
//                             {userInfo.profilePictureUrl ? (
//                                 <img src={userInfo.profilePictureUrl} alt="Profile" className="w-full h-full rounded-full object-cover" />
//                             ) : (
//                                 <span className="text-white text-4xl font-bold">{getInitials(userInfo.username)}</span>
//                             )}
//                             <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 rounded-full flex items-center justify-center transition-all duration-300">
//                                 <Edit2 className="w-8 h-8 text-white opacity-0 group-hover:opacity-100" />
//                             </div>
//                         </button>
//                         <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/png, image/jpeg" />
//                     </div>
//                     <p className="text-center font-bold text-xl pt-14">{userInfo.username}</p>

//                     <div className="flex justify-around items-center my-4">
//                         <div className="text-center">
//                             <div className="text-3xl font-bold">{isLoadingStats ? '...' : stats.pingsCreated}</div>
//                             <div className="text-sm text-gray-500">Pings Created</div>
//                         </div>
//                         <div className="text-center">
//                             <div className="text-3xl font-bold">{isLoadingStats ? '...' : stats.totalParticipate}</div>
//                             <div className="text-sm text-gray-500">Total Participate</div>
//                         </div>
//                     </div>

//                     <div className="flex justify-center space-x-2">
//                         {['Week', 'Month', 'All-time'].map((filter) => (
//                             <button key={filter} onClick={() => setActiveTimeFilter(filter)} className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${activeTimeFilter === filter ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-md' : 'bg-gray-100 text-gray-600'}`}>
//                                 {filter}
//                             </button>
//                         ))}
//                     </div>
//                 </div>

//                 {/* Edit Information Form */}
//                 <form onSubmit={handleInfoUpdate} className="mb-6 p-4 rounded-2xl border bg-white border-gray-200 shadow-sm space-y-4">
//                     <h3 className="text-lg font-semibold">Edit Information</h3>
//                     {/* Input fields with state and handlers */}
//                      <div>
//                          <label className="block text-sm font-medium text-pink-600 mb-1">Name</label>
//                          <div className="relative">
//                              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
//                              <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full pl-10 pr-4 py-3 rounded-full border bg-gray-50 border-gray-200 text-gray-800" />
//                          </div>
//                      </div>
//                       <div>
//                          <label className="block text-sm font-medium text-pink-600 mb-1">Email</label>
//                          <div className="relative">
//                              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
//                              <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full pl-10 pr-4 py-3 rounded-full border bg-gray-50 border-gray-200 text-gray-800" />
//                          </div>
//                      </div>
//                      <div>
//                          <label className="block text-sm font-medium text-pink-600 mb-1">Phone</label>
//                          <div className="relative">
//                              <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
//                              <input type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full pl-10 pr-4 py-3 rounded-full border bg-gray-50 border-gray-200 text-gray-800" />
//                          </div>
//                      </div>
//                     <button type="submit" className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-full font-medium">Save Information</button>
//                 </form>

//                 {/* Account Security Form */}
//                 <form onSubmit={handlePasswordUpdate} className="mb-6 p-4 rounded-2xl border bg-white border-gray-200 shadow-sm space-y-4">
//                     <h3 className="text-lg font-semibold">Account Security</h3>
//                     {/* Password fields with visibility toggle logic */}
//                      <div>
//                          <label className="block text-sm font-medium text-pink-600 mb-1">Old password</label>
//                          <div className="relative">
//                             <input type={showPasswords.old ? 'text' : 'password'} value={passwordData.oldPassword} onChange={(e) => setPasswordData({...passwordData, oldPassword: e.target.value})} placeholder="••••••••" className="w-full pl-4 pr-12 py-3 rounded-full border bg-gray-50 border-gray-200"/>
//                             <button type="button" onClick={() => setShowPasswords(p => ({...p, old: !p.old}))} className="absolute right-3 top-1/2 -translate-y-1/2">{showPasswords.old ? <EyeOff size={20}/> : <Eye size={20}/>}</button>
//                          </div>
//                      </div>
//                      <div>
//                          <label className="block text-sm font-medium text-pink-600 mb-1">New password</label>
//                          <div className="relative">
//                             <input type={showPasswords.new ? 'text' : 'password'} value={passwordData.newPassword} onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})} placeholder="••••••••" className="w-full pl-4 pr-12 py-3 rounded-full border bg-gray-50 border-gray-200"/>
//                             <button type="button" onClick={() => setShowPasswords(p => ({...p, new: !p.new}))} className="absolute right-3 top-1/2 -translate-y-1/2">{showPasswords.new ? <EyeOff size={20}/> : <Eye size={20}/>}</button>
//                          </div>
//                      </div>
//                      <div>
//                          <label className="block text-sm font-medium text-pink-600 mb-1">Confirm password</label>
//                          <div className="relative">
//                             <input type={showPasswords.confirm ? 'text' : 'password'} value={passwordData.confirmPassword} onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})} placeholder="••••••••" className="w-full pl-4 pr-12 py-3 rounded-full border bg-gray-50 border-gray-200"/>
//                             <button type="button" onClick={() => setShowPasswords(p => ({...p, confirm: !p.confirm}))} className="absolute right-3 top-1/2 -translate-y-1/2">{showPasswords.confirm ? <EyeOff size={20}/> : <Eye size={20}/>}</button>
//                          </div>
//                      </div>
//                     <button type="submit" className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-full font-medium">Change Password</button>
//                 </form>
//                  <div className="mb-6">
//                     <h3 className="text-lg font-semibold mb-2 px-2">Support</h3>
//                     <div className="rounded-2xl border bg-white border-gray-200 shadow-sm overflow-hidden">
//                         <button onClick={() => navigate('/help-center')} className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
//                             <div className="flex items-center gap-3">
//                                 <HelpCircle className="w-6 h-6 text-blue-500" />
//                                 <span className="font-medium">Help Center</span>
//                             </div>
//                             <ChevronRight className="w-5 h-5 text-gray-400" />
//                         </button>
//                         <div className="border-t border-gray-200">
//                             <button onClick={() => navigate('/terms-of-service')} className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
//                                 <div className="flex items-center gap-3">
//                                     <FileText className="w-6 h-6 text-gray-500" />
//                                     <span className="font-medium">Terms of Service</span>
//                                 </div>
//                                 <ChevronRight className="w-5 h-5 text-gray-400" />
//                             </button>
//                         </div>
//                         <div className="border-t border-gray-200">
//                             <button
//                                 onClick={() => navigate('/privacy-policy')}
//                                 className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
//                             >
//                                 <div className="flex items-center gap-3">
//                                     <Shield className="w-6 h-6 text-green-500" />
//                                     <span className="font-medium">Privacy Policy</span>
//                                 </div>
//                                 <ChevronRight className="w-5 h-5 text-gray-400" />
//                             </button>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Logout Button */}
//                 <div className="mt-6">
//                      <button onClick={handleLogout} className="w-full text-red-500 font-semibold py-3 px-4 rounded-full hover:bg-red-50 transition-colors flex items-center justify-center gap-2">
//                         <LogOut size={16} />
//                         Log Out
//                      </button>
//                 </div>
//             </div>

//             <BottomNav />
//         </div>
//     );
// }

import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
  ArrowLeft,
  Bell,
  Sun,
  Moon,
  ChevronRight,
  User,
  Mail,
  Smartphone,
  Edit2,
  LogOut,
  HelpCircle,
  FileText,
  Shield,
  Eye,
  EyeOff,
} from "lucide-react";
import useAuthStore from "../store/useAuthStore";
import useThemeStore from "../store/useThemeStore";
import apiClient from "../api/axiosConfig";
import BottomNav from "../components/layout/BottomNav";
import useNotificationStore from "../store/useNotificationStore";

export default function ProfilePage() {
  const navigate = useNavigate();
  const { userInfo, logout, updateUserInfo } = useAuthStore();
  const { theme, toggleTheme } = useThemeStore();
  const { unreadCount } = useNotificationStore();

  const [stats, setStats] = useState({ pingsCreated: 0, totalParticipate: 0 });
  const [isLoadingStats, setIsLoadingStats] = useState(true);
  const [activeTimeFilter, setActiveTimeFilter] = useState("Week");
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: userInfo?.username || "",
    email: userInfo?.email || "",
    phone: userInfo?.phoneNumber || "",
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  // Effect to fetch user statistics
  useEffect(() => {
    const fetchUserStats = async () => {
      setIsLoadingStats(true);
      try {
        const periodMap = {
          Week: "week",
          Month: "month",
          "All-time": "all-time",
        };
        const period = periodMap[activeTimeFilter];
        const response = await apiClient.get(
          `/api/users/profile-stats?period=${period}`
        );
        setStats(response.data);
      } catch (error) {
        console.error("Failed to fetch user stats:", error);
        toast.error("Could not load profile stats.");
      } finally {
        setIsLoadingStats(false);
      }
    };
    if (userInfo) fetchUserStats();
  }, [activeTimeFilter, userInfo]);

  const handleAvatarClick = () => fileInputRef.current.click();

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const toastId = toast.loading("Uploading...");
    const formData = new FormData();
    formData.append("profilePicture", file);
    try {
      const response = await apiClient.put(
        "/api/users/profile/picture",
        formData
      );
      updateUserInfo(response.data);
      toast.success("Profile picture updated!", { id: toastId });
    } catch (error) {
      toast.error(error.response?.data?.error || "Upload failed.", {
        id: toastId,
      });
    }
  };

  const handleInfoUpdate = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Updating information...");
    try {
      const response = await apiClient.put("/api/users/profile", formData);
      updateUserInfo(response.data);
      toast.success("Information updated!", { id: toastId });
    } catch (error) {
      toast.error(error.response?.data?.error || "Update failed.", {
        id: toastId,
      });
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      return toast.error("New passwords do not match.");
    }
    if (!passwordData.oldPassword || !passwordData.newPassword) {
      return toast.error("Please fill all password fields.");
    }
    const toastId = toast.loading("Changing password...");
    try {
      await apiClient.put("/api/users/profile/password", passwordData);
      toast.success("Password updated successfully!", { id: toastId });
      setPasswordData({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      toast.error(error.response?.data?.error || "Update failed.", {
        id: toastId,
      });
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const getInitials = (name = "") =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() || "?";

  if (!userInfo) {
    React.useEffect(() => {
      navigate("/");
    }, [navigate]);
    return null;
  }

  return (
<div className="mx-auto min-h-screen bg-gray-50 dark:bg-pyngl-dark text-gray-900 dark:text-gray-200 
  max-w-full md:w-7/6 lg:w-4/5 xl:w-3/4 2xl:w-2/3 transition-all duration-300">
{/* Header */}
      <div className="sticky top-0 z-40 border-b bg-white/80 dark:bg-gray-800/80 backdrop-blur-md 
  border-gray-200 dark:border-gray-700 px-4 md:px-6 py-3 md:py-4">
  <div className="flex items-center justify-between">
    <button onClick={() => navigate(-1)}>
      <ArrowLeft className="w-6 h-6 md:w-7 md:h-7" />
    </button>
    <h1 className="text-lg md:text-xl font-semibold">Profile</h1>
    <button onClick={() => navigate("/notifications")} className="relative p-1">
      <Bell className="w-6 h-6 md:w-7 md:h-7" />
      {unreadCount > 0 && (
        <span className="absolute top-0 right-0 flex h-3 w-3 md:h-4 md:w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-full w-full bg-pink-500"></span>
        </span>
      )}
    </button>
  </div>
</div>


      <div className="p-4 pb-24">
        {/* Overview Section */}
        <div className="border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm rounded-2xl p-4 relative mt-10 mb-6">
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24">
            <button
              onClick={handleAvatarClick}
              className="w-full h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg relative group"
            >
              {userInfo.profilePictureUrl ? (
                <img
                  src={userInfo.profilePictureUrl}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <span className="text-white text-4xl font-bold">
                  {getInitials(userInfo.username)}
                </span>
              )}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 rounded-full flex items-center justify-center transition-all duration-300">
                <Edit2 className="w-8 h-8 text-white opacity-0 group-hover:opacity-100" />
              </div>
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/png, image/jpeg"
            />
          </div>
          <p className="text-center font-bold text-xl pt-14">
            {userInfo.username}
          </p>
          <div className="flex justify-around items-center my-4">
            <div className="text-center">
              <div className="text-3xl font-bold">
                {isLoadingStats ? "..." : stats.pingsCreated}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Pings Created
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">
                {isLoadingStats ? "..." : stats.totalParticipate}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Total Participate
              </div>
            </div>
          </div>
          <div className="flex justify-center space-x-2">
            {["Week", "Month", "All-time"].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveTimeFilter(filter)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
                  activeTimeFilter === filter
                    ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-md"
                    : "bg-gray-100 dark:bg-gray-700 dark:text-gray-300 text-gray-600"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Dark Mode Toggle Card */}
        <div
          className="flex items-center justify-between p-4 rounded-2xl mb-6 
     bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm"
        >
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center
        bg-yellow-100 dark:bg-purple-500/20"
            >
              {theme === "light" ? (
                <Moon className="text-purple-500" /> // show Moon icon in light mode
              ) : (
                <Sun className="text-yellow-400" /> // show Sun icon in dark mode
              )}
            </div>
            <div>
              <div className="font-semibold">
                {theme === "light" ? "Dark View" : "Light View"}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {theme === "light"
                  ? "Turn on the night light"
                  : "Turn off the night light"}
              </div>
            </div>
          </div>
          <button
            onClick={toggleTheme}
            className={`relative w-12 h-6 rounded-full transition-colors duration-300 
      ${
        theme === "dark"
          ? "bg-gradient-to-r from-pink-500 to-purple-500"
          : "bg-gray-300"
      }`}
          >
            <div
              className="absolute top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300"
              style={{
                transform:
                  theme === "dark" ? "translateX(28px)" : "translateX(4px)",
              }}
            />
          </button>
        </div>

        {/* Edit Information Form */}
        <form
          onSubmit={handleInfoUpdate}
          className="mb-6 p-4 rounded-2xl border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm space-y-4"
        >
          <h3 className="text-lg font-semibold">Edit Information</h3>
          <div>
            <label className="block text-sm font-medium text-pink-600 mb-1">
              Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full pl-10 pr-4 py-3 rounded-full border bg-gray-50 dark:bg-gray-700 dark:border-gray-600 border-gray-200"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-pink-600 mb-1">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full pl-10 pr-4 py-3 rounded-full border bg-gray-50 dark:bg-gray-700 dark:border-gray-600 border-gray-200"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-pink-600 mb-1">
              Phone
            </label>
            <div className="relative">
              <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full pl-10 pr-4 py-3 rounded-full border bg-gray-50 dark:bg-gray-700 dark:border-gray-600 border-gray-200"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-full font-medium"
          >
            Save Information
          </button>
        </form>

        {/* Account Security Form */}
        <form
          onSubmit={handlePasswordUpdate}
          className="mb-6 p-4 rounded-2xl border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm space-y-4"
        >
          <h3 className="text-lg font-semibold">Account Security</h3>
          <div>
            <label className="block text-sm font-medium text-pink-600 mb-1">
              Old password
            </label>
            <div className="relative">
              <input
                type={showPasswords.old ? "text" : "password"}
                value={passwordData.oldPassword}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    oldPassword: e.target.value,
                  })
                }
                placeholder="••••••••"
                className="w-full pl-4 pr-12 py-3 rounded-full border bg-gray-50 dark:bg-gray-700 dark:border-gray-600 border-gray-200"
              />
              <button
                type="button"
                onClick={() => setShowPasswords((p) => ({ ...p, old: !p.old }))}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPasswords.old ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-pink-600 mb-1">
              New password
            </label>
            <div className="relative">
              <input
                type={showPasswords.new ? "text" : "password"}
                value={passwordData.newPassword}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    newPassword: e.target.value,
                  })
                }
                placeholder="••••••••"
                className="w-full pl-4 pr-12 py-3 rounded-full border bg-gray-50 dark:bg-gray-700 dark:border-gray-600 border-gray-200"
              />
              <button
                type="button"
                onClick={() => setShowPasswords((p) => ({ ...p, new: !p.new }))}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPasswords.new ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-pink-600 mb-1">
              Confirm password
            </label>
            <div className="relative">
              <input
                type={showPasswords.confirm ? "text" : "password"}
                value={passwordData.confirmPassword}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    confirmPassword: e.target.value,
                  })
                }
                placeholder="••••••••"
                className="w-full pl-4 pr-12 py-3 rounded-full border bg-gray-50 dark:bg-gray-700 dark:border-gray-600 border-gray-200"
              />
              <button
                type="button"
                onClick={() =>
                  setShowPasswords((p) => ({ ...p, confirm: !p.confirm }))
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPasswords.confirm ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-full font-medium"
          >
            Change Password
          </button>
        </form>

        {/* Support Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2 px-2">Support</h3>
          <div className="rounded-2xl border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
            <button
              onClick={() => navigate("/help-center")}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <HelpCircle className="w-6 h-6 text-blue-500" />
                <span className="font-medium">Help Center</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
            <div className="border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => navigate("/terms-of-service")}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-6 h-6 text-gray-500" />
                  <span className="font-medium">Terms of Service</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => navigate("/privacy-policy")}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Shield className="w-6 h-6 text-green-500" />
                  <span className="font-medium">Privacy Policy</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <div className="mt-6">
          <button
            onClick={handleLogout}
            className="w-full text-red-500 font-semibold py-3 px-4 rounded-full hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors flex items-center justify-center gap-2"
          >
            <LogOut size={16} />
            Log Out
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
