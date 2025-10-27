// // import React, { useState, useEffect, useRef } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import { toast } from 'react-hot-toast';
// // import { ArrowLeft, Bell, Sun, Moon, ChevronRight, User, Mail, Smartphone,Laptop, Edit2, LogOut, HelpCircle, FileText, Shield, Eye, EyeOff } from 'lucide-react';
// // import useAuthStore from '../store/useAuthStore';
// // import useThemeStore from '../store/useThemeStore';
// // import apiClient from '../api/axiosConfig';
// // import BottomNav from '../components/layout/BottomNav';
// // import useNotificationStore from '../store/useNotificationStore';
// // import NotificationToggle from '../components/profile/NotificationToggle';
// // const StatSkeleton = () => <div className="h-9 w-16 mx-auto bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse" />;

// // export default function ProfilePage() {
// //     const navigate = useNavigate();
// //     const { userInfo, logout, updateUserInfo } = useAuthStore();
// //     // UPDATED: Using the correct setTheme function
// //     const { theme, setTheme } = useThemeStore(); 
// //     const { unreadCount } = useNotificationStore(); 
    
    
// //     const [stats, setStats] = useState({ pingsCreated: 0, totalParticipate: 0 });
// //     const [isLoadingStats, setIsLoadingStats] = useState(true);
// //     const [activeTimeFilter, setActiveTimeFilter] = useState('Week');
// //     const fileInputRef = useRef(null);

// //     const [formData, setFormData] = useState({
// //         name: userInfo?.username || '',
// //         email: userInfo?.email || '',
// //         phone: userInfo?.phoneNumber || '',
// //     });

// //     const [passwordData, setPasswordData] = useState({
// //         oldPassword: '',
// //         newPassword: '',
// //         confirmPassword: '',
// //     });
// //     const [showPasswords, setShowPasswords] = useState({ old: false, new: false, confirm: false });

// //     // Effect to fetch user statistics
// //     useEffect(() => {
// //         const fetchUserStats = async () => {
// //             setIsLoadingStats(true);
// //             try {
// //                 const periodMap = { 'Week': 'week', 'Month': 'month', 'All-time': 'all-time' };
// //                 const period = periodMap[activeTimeFilter];
// //                 const response = await apiClient.get(`/api/users/profile-stats?period=${period}`);
// //                 setStats(response.data);
// //             } catch (error) {
// //                 console.error("Failed to fetch user stats:", error);
// //                 toast.error("Could not load profile stats.");
// //             } finally {
// //                 setIsLoadingStats(false);
// //             }
// //         };
// //         if (userInfo) fetchUserStats();
// //     }, [activeTimeFilter, userInfo]);

// //     const handleAvatarClick = () => fileInputRef.current.click();

// //     const handleFileChange = async (e) => {
// //         const file = e.target.files[0];
// //         if (!file) return;
// //         const toastId = toast.loading('Uploading...');
// //         const formData = new FormData();
// //         formData.append('profilePicture', file);
// //         try {
// //             const response = await apiClient.put('/api/users/profile/picture', formData);
// //             updateUserInfo(response.data);
// //             toast.success('Profile picture updated!', { id: toastId });
// //         } catch (error) {
// //             toast.error(error.response?.data?.error || 'Upload failed.', { id: toastId });
// //         }
// //     };
    
// //     const handleInfoUpdate = async (e) => {
// //         e.preventDefault();
// //         const toastId = toast.loading('Updating information...');
// //         try {
// //             const response = await apiClient.put('/api/users/profile', formData);
// //             updateUserInfo(response.data);
// //             toast.success('Information updated!', { id: toastId });
// //         } catch (error) {
// //             toast.error(error.response?.data?.error || 'Update failed.', { id: toastId });
// //         }
// //     };

// //     const handlePasswordUpdate = async (e) => {
// //         e.preventDefault();
// //         if (passwordData.newPassword !== passwordData.confirmPassword) {
// //             return toast.error("New passwords do not match.");
// //         }
// //         if (!passwordData.oldPassword || !passwordData.newPassword) {
// //             return toast.error("Please fill all password fields.");
// //         }
// //         const toastId = toast.loading('Changing password...');
// //         try {
// //             await apiClient.put('/api/users/profile/password', passwordData);
// //             toast.success('Password updated successfully!', { id: toastId });
// //             setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
// //         } catch (error) {
// //             toast.error(error.response?.data?.error || 'Update failed.', { id: toastId });
// //         }
// //     };

// //     const handleLogout = () => {
// //         logout();
// //         navigate('/');
// //     };

// //     const getInitials = (name = '') => name.split(' ').map(n => n[0]).join('').toUpperCase() || '?';
    
// //     if (!userInfo) {
// //         React.useEffect(() => { navigate('/'); }, [navigate]);
// //         return null;
// //     }

// //     return (
// //         <div className="mx-auto min-h-screen bg-gray-50 dark:bg-pyngl-dark text-gray-900 dark:text-gray-100 w-full">
// //             {/* Header */}
// //             <div className="sticky top-0 z-40 border-b bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-gray-200 dark:border-gray-700">
// //                 <div className="flex items-center justify-between p-4 max-w-5xl mx-auto">
// //                     <button onClick={() => navigate(-1)}><ArrowLeft className="w-6 h-6" /></button>
// //                     <h1 className="text-lg font-semibold">Profile</h1>
// //                     <button onClick={() => navigate("/notifications")} className="relative p-1">
// //                         <Bell className="w-6 h-6" />
// //                         {unreadCount > 0 && (
// //                             <span className="absolute top-0 right-0 flex h-3 w-3">
// //                                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
// //                                 <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
// //                             </span>
// //                         )}
// //                     </button>
// //                 </div>
// //             </div>
// //                <div className="p-4 md:p-6 pb-24 max-w-5xl mx-auto">
// //                 {/* Overview Section */}
// //                  <div className="border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm rounded-2xl p-4 relative mt-10 mb-6 max-w-lg mx-auto"> 
// //                      <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24">
// //                         <button onClick={handleAvatarClick} className="w-full h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg relative group">
// //                             {userInfo.profilePictureUrl ? (
// //                                 <img src={userInfo.profilePictureUrl} alt="Profile" className="w-full h-full rounded-full object-cover" />
// //                             ) : (
// //                                 <span className="text-white text-4xl font-bold">{getInitials(userInfo.username)}</span>
// //                             )}
// //                             <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 rounded-full flex items-center justify-center transition-all duration-300">
// //                                 <Edit2 className="w-8 h-8 text-white opacity-0 group-hover:opacity-100" />
// //                             </div>
// //                         </button>
// //                         <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/png, image/jpeg" />
// //                     </div>
// //                       <p className="text-center font-bold text-xl pt-14">{userInfo.username}</p>
// //                      <div className="flex justify-around items-center my-4">
// //                         <div className="text-center">
// //                             <div className="text-3xl font-bold">
// //                                 {isLoadingStats ? <StatSkeleton /> : stats.pingsCreated}
// //                             </div>
// //                             <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">Pings Created</div>
// //                         </div>
// //                         <div className="text-center">
// //                             <div className="text-3xl font-bold">
// //                                 {isLoadingStats ? <StatSkeleton /> : stats.totalParticipate}
// //                             </div>
// //                             <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">Participated</div>
// //                         </div>
// //                     </div>  
// //                     <div className="flex justify-center space-x-2">
// //                         {['Week', 'Month', 'All-time'].map((filter) => (
// //                             <button key={filter} onClick={() => setActiveTimeFilter(filter)} className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${activeTimeFilter === filter ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-md' : 'bg-gray-100 dark:bg-gray-700 dark:text-gray-300 text-gray-600'}`}>
// //                                 {filter}
// //                             </button>
// //                         ))}
// //                     </div>
// //                 </div>

// //                 {/* Dark Mode Toggle */}
// //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //                     <div>
// //                         {/* UPDATED: Advanced Dark Mode Toggle */}
// //                         <div className="flex items-center justify-between p-4 rounded-2xl mb-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
// //                             <div className="flex items-center gap-3">
// //                                 <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-700">
// //                                     {theme === 'dark' ? <Moon className="text-pyngl-purple" /> : theme === 'light' ? <Sun className="text-orange-400" /> : <Laptop className="text-gray-500" />}
// //                                 </div>
// //                                 <div>
// //                                     <div className="font-semibold">Appearance</div>
// //                                     <div className="text-sm text-gray-500 dark:text-gray-400">Customize your theme</div>
// //                                 </div>
// //                             </div>
// //                             <div className="flex items-center p-1 space-x-1 bg-gray-100 dark:bg-gray-700 rounded-full">
// //                                 <button onClick={() => setTheme('light')} title="Light" className={`p-1.5 rounded-full ${theme === 'light' ? 'bg-white dark:bg-gray-800 shadow' : ''}`}><Sun size={16} className={theme === 'light' ? 'text-orange-500' : 'text-gray-500 dark:text-gray-400'} /></button>
// //                                 <button onClick={() => setTheme('dark')} title="Dark" className={`p-1.5 rounded-full ${theme === 'dark' ? 'bg-white dark:bg-gray-800 shadow' : ''}`}><Moon size={16} className={theme === 'dark' ? 'text-pyngl-purple' : 'text-gray-500 dark:text-gray-400'} /></button>
// //                                 <button onClick={() => setTheme('system')} title="System" className={`p-1.5 rounded-full ${theme === 'system' ? 'bg-white dark:bg-gray-800 shadow' : ''}`}><Laptop size={16} className={theme === 'system' ? 'text-blue-500' : 'text-gray-500 dark:text-gray-400'} /></button>
// //                             </div>
// //                         </div>
                
// //                  <NotificationToggle />
// //                 {/* Edit Information Form */}
// //                  <form onSubmit={handleInfoUpdate} className="mb-6 p-4 rounded-2xl border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm space-y-4">
// //                      <h3 className="text-lg font-semibold">Edit Information</h3>
// //                      <div>
// //                          <label className="block text-sm font-medium text-pink-600 mb-1">Name</label>
// //                          <div className="relative">
// //                              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
// //                              <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full pl-10 pr-4 py-3 rounded-full border bg-gray-50 dark:bg-gray-700 dark:border-gray-600 border-gray-200" />
// //                          </div>
// //                      </div>
// //                       <div>
// //                          <label className="block text-sm font-medium text-pink-600 mb-1">Email</label>
// //                          <div className="relative">
// //                              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
// //                              <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full pl-10 pr-4 py-3 rounded-full border bg-gray-50 dark:bg-gray-700 dark:border-gray-600 border-gray-200" />
// //                          </div>
// //                      </div>
// //                      <div>
// //                          <label className="block text-sm font-medium text-pink-600 mb-1">Phone</label>
// //                          <div className="relative">
// //                              <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
// //                              <input type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full pl-10 pr-4 py-3 rounded-full border bg-gray-50 dark:bg-gray-700 dark:border-gray-600 border-gray-200" />
// //                          </div>
// //                      </div>
// //                     <button type="submit" className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-full font-medium">Save Information</button>
// //                 </form>
// //                 </div>
// //                 <div>
// //                         {/* Account Security Form */}
// //                         <form onSubmit={handlePasswordUpdate} className="mb-6 p-4 rounded-2xl border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm space-y-4">
// //                     <h3 className="text-lg font-semibold">Account Security</h3>
// //                     <div>
// //                         <label className="block text-sm font-medium text-pink-600 mb-1">Old password</label>
// //                         <div className="relative">
// //                            <input type={showPasswords.old ? 'text' : 'password'} value={passwordData.oldPassword} onChange={(e) => setPasswordData({...passwordData, oldPassword: e.target.value})} placeholder="••••••••" className="w-full pl-4 pr-12 py-3 rounded-full border bg-gray-50 dark:bg-gray-700 dark:border-gray-600 border-gray-200"/>
// //                            <button type="button" onClick={() => setShowPasswords(p => ({...p, old: !p.old}))} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">{showPasswords.old ? <EyeOff size={20}/> : <Eye size={20}/>}</button>
// //                         </div>
// //                     </div>
// //                     <div>
// //                         <label className="block text-sm font-medium text-pink-600 mb-1">New password</label>
// //                         <div className="relative">
// //                            <input type={showPasswords.new ? 'text' : 'password'} value={passwordData.newPassword} onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})} placeholder="••••••••" className="w-full pl-4 pr-12 py-3 rounded-full border bg-gray-50 dark:bg-gray-700 dark:border-gray-600 border-gray-200"/>
// //                            <button type="button" onClick={() => setShowPasswords(p => ({...p, new: !p.new}))} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">{showPasswords.new ? <EyeOff size={20}/> : <Eye size={20}/>}</button>
// //                         </div>
// //                     </div>
// //                     <div>
// //                         <label className="block text-sm font-medium text-pink-600 mb-1">Confirm password</label>
// //                         <div className="relative">
// //                            <input type={showPasswords.confirm ? 'text' : 'password'} value={passwordData.confirmPassword} onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})} placeholder="••••••••" className="w-full pl-4 pr-12 py-3 rounded-full border bg-gray-50 dark:bg-gray-700 dark:border-gray-600 border-gray-200"/>
// //                            <button type="button" onClick={() => setShowPasswords(p => ({...p, confirm: !p.confirm}))} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">{showPasswords.confirm ? <EyeOff size={20}/> : <Eye size={20}/>}</button>
// //                         </div>
// //                     </div>
// //                     <button type="submit" className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-full font-medium">Change Password</button>
// //                 </form>
// //                 </div>
// //             </div>
// //                 {/* Support Section */}
// //                  <div className="mb-6">
// //                     <h3 className="text-lg font-semibold mb-2 px-2">Support</h3>
// //                     <div className="rounded-2xl border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
// //                         <button onClick={() => navigate('/help-center')} className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
// //                             <div className="flex items-center gap-3">
// //                                 <HelpCircle className="w-6 h-6 text-blue-500" />
// //                                 <span className="font-medium">Help Center</span>
// //                             </div>
// //                             <ChevronRight className="w-5 h-5 text-gray-400" />
// //                         </button>
// //                         <div className="border-t border-gray-200 dark:border-gray-700">
// //                             <button onClick={() => navigate('/terms-of-service')} className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
// //                                 <div className="flex items-center gap-3">
// //                                     <FileText className="w-6 h-6 text-gray-500" />
// //                                     <span className="font-medium">Terms of Service</span>
// //                                 </div>
// //                                 <ChevronRight className="w-5 h-5 text-gray-400" />
// //                             </button>
// //                         </div>
// //                          <div className="border-t border-gray-200 dark:border-gray-700">
// //                             <button onClick={() => navigate('/privacy-policy')} className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
// //                                 <div className="flex items-center gap-3">
// //                                     <Shield className="w-6 h-6 text-green-500" />
// //                                     <span className="font-medium">Privacy Policy</span>
// //                                 </div>
// //                                 <ChevronRight className="w-5 h-5 text-gray-400" />
// //                             </button>
// //                         </div>
// //                     </div>
// //                 </div>

// //                 {/* Logout Button */}
// //               <div className="mt-6 max-w-md mx-auto">
// //                     <button onClick={handleLogout} className="w-full text-red-500 font-semibold py-3 px-4 rounded-full hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors flex items-center justify-center gap-2">
// //                         <LogOut size={16} />
// //                         Log Out
// //                     </button>
// //                 </div>
// //             </div>
// //             <BottomNav />
// //         </div>
// //     );
// // }
// import React, { useState, useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-hot-toast';
// import { ArrowLeft, Bell, Sun, Moon, ChevronRight, User, Mail, Smartphone, Edit2, LogOut, HelpCircle, FileText, Shield, Eye, EyeOff } from 'lucide-react';
// import useAuthStore from '../store/useAuthStore';
// import useThemeStore from '../store/useThemeStore';
// import apiClient from '../api/axiosConfig';
// import BottomNav from '../components/layout/BottomNav';
// import useNotificationStore from '../store/useNotificationStore';

// const StatSkeleton = () => <div className="h-7 w-16 mx-auto bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse" />;

// export default function ProfilePage() {
//     const navigate = useNavigate();
//     const { userInfo, logout, updateUserInfo } = useAuthStore();
//     const { theme, toggleTheme } = useThemeStore(); 
//     const { unreadCount } = useNotificationStore(); 
    
//     const [stats, setStats] = useState({ pingsCreated: 0, totalParticipate: 0 });
//     const [isLoadingStats, setIsLoadingStats] = useState(true);
//     const [activeTimeFilter, setActiveTimeFilter] = useState('Week');
//     const fileInputRef = useRef(null);

//     const [formData, setFormData] = useState({
//         name: userInfo?.username || '',
//         email: userInfo?.email || '',
//         phone: userInfo?.phoneNumber || '',
//     });

//     const [passwordData, setPasswordData] = useState({
//         oldPassword: '',
//         newPassword: '',
//         confirmPassword: '',
//     });
//     const [showPasswords, setShowPasswords] = useState({ old: false, new: false, confirm: false });

//     // Effect to fetch user statistics
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
//         if (userInfo) fetchUserStats();
//     }, [activeTimeFilter, userInfo]);

//     const handleAvatarClick = () => fileInputRef.current.click();

//     const handleFileChange = async (e) => {
//         const file = e.target.files[0];
//         if (!file) return;
//         const toastId = toast.loading('Uploading...');
//         const formData = new FormData();
//         formData.append('profilePicture', file);
//         try {
//             const response = await apiClient.put('/api/users/profile/picture', formData);
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
    
//     if (!userInfo) {
//         React.useEffect(() => { navigate('/'); }, [navigate]);
//         return null;
//     }

//     return (
//         <div className="mx-auto min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 w-full">
//             {/* Header */}
//             <div className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md">
//                 <div className="flex items-center justify-between p-4 max-w-2xl mx-auto">
//                     <button onClick={() => navigate(-1)}><ArrowLeft className="w-6 h-6" /></button>
//                     <h1 className="text-lg font-semibold">Profile</h1>
//                     <button onClick={() => navigate("/notifications")} className="relative p-1">
//                         <Bell className="w-6 h-6" />
//                         {unreadCount > 0 && (
//                             <span className="absolute top-0 right-0 flex h-3 w-3">
//                                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
//                                 <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
//                             </span>
//                         )}
//                     </button>
//                 </div>
//             </div>
//             <div className="p-4 md:p-6 pb-24 max-w-2xl mx-auto">
//                 {/* Overview Section */}
//                 <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm rounded-2xl p-6 text-center"> 
//                     <button onClick={handleAvatarClick} className="w-16 h-16 mx-auto bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg relative group mb-2">
//                         <img src={userInfo.profilePictureUrl} alt="Profile" className="w-full h-full rounded-full object-cover" />
//                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 rounded-full flex items-center justify-center transition-all duration-300">
//                             <Edit2 className="w-6 h-6 text-white opacity-0 group-hover:opacity-100" />
//                         </div>
//                     </button>
//                      <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/png, image/jpeg" />
//                     <p className="font-bold text-lg">{userInfo.username}</p>
//                     <div className="flex justify-around items-center my-4">
//                         <div className="text-center">
//                             <div className="text-2xl font-bold">
//                                 {isLoadingStats ? <StatSkeleton /> : stats.pingsCreated}
//                             </div>
//                             <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Pings Created</div>
//                         </div>
//                         <div className="text-center">
//                             <div className="text-2xl font-bold">
//                                 {isLoadingStats ? <StatSkeleton /> : stats.totalParticipate}
//                             </div>
//                             <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Total Participate</div>
//                         </div>
//                     </div>  
//                     <div className="flex justify-center space-x-2">
//                         {['Week', 'Month', 'All-time'].map((filter) => (
//                             <button key={filter} onClick={() => setActiveTimeFilter(filter)} className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${activeTimeFilter === filter ? 'bg-black dark:bg-white text-white dark:text-black shadow-md' : 'bg-gray-100 dark:bg-gray-700 dark:text-gray-300 text-gray-600'}`}>
//                                 {filter}
//                             </button>
//                         ))}
//                     </div>
//                 </div>

//                 {/* Dark Mode Toggle */}
//                 <div className="flex items-center justify-between p-4 my-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
//                     <div className="flex items-center gap-3">
//                         <div className="w-10 h-10 rounded-full flex items-center justify-center bg-yellow-100 dark:bg-purple-900/50">
//                             <Sun className="text-yellow-500" />
//                         </div>
//                         <div>
//                             <div className="font-semibold">Dark View</div>
//                             <div className="text-sm text-gray-500 dark:text-gray-400">Turn on the night</div>
//                         </div>
//                     </div>
//                     <button onClick={toggleTheme} className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${theme === 'dark' ? 'bg-pink-500' : 'bg-gray-200 dark:bg-gray-700'}`}>
//                         <div className="absolute top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300" style={{ transform: theme === 'dark' ? 'translateX(28px)' : 'translateX(4px)' }} />
//                     </button>
//                 </div>

//                 {/* Upgrade to Pro */}
//                 <div className="p-6 my-6 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 text-white text-center shadow-lg">
//                     <h3 className="text-xl font-bold">Upgrade to pro</h3>
//                     <p className="mt-1 mb-4 text-sm opacity-90">Unlock analytics & unlimited polls</p>
//                     <button className="bg-white text-pink-600 font-bold py-2 px-6 rounded-full shadow-md hover:bg-gray-100 transition-colors">₹125 / Month</button>
//                 </div>

//                 {/* Edit Information Form */}
//                 <form onSubmit={handleInfoUpdate} className="my-6 p-6 rounded-2xl border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm space-y-4">
//                     <h3 className="text-lg font-semibold">Edit Information</h3>
//                     <div className="space-y-4">
//                         <div>
//                             <label className="block text-xs font-medium text-pink-600 dark:text-pink-400 mb-1">Name</label>
//                             <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full p-2 border-b bg-transparent dark:border-gray-600 border-gray-200 focus:outline-none focus:border-pink-500" />
//                         </div>
//                         <div>
//                             <label className="block text-xs font-medium text-pink-600 dark:text-pink-400 mb-1">Email</label>
//                             <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full p-2 border-b bg-transparent dark:border-gray-600 border-gray-200 focus:outline-none focus:border-pink-500" />
//                         </div>
//                         <div>
//                             <label className="block text-xs font-medium text-pink-600 dark:text-pink-400 mb-1">Phone</label>
//                             <input type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full p-2 border-b bg-transparent dark:border-gray-600 border-gray-200 focus:outline-none focus:border-pink-500" />
//                         </div>
//                     </div>
//                     <button type="submit" className="w-full mt-4 bg-pink-500 text-white py-3 rounded-full font-medium hover:bg-pink-600 transition-colors">Save Information</button>
//                 </form>

//                 {/* Account Security Form */}
//                 <form onSubmit={handlePasswordUpdate} className="my-6 p-6 rounded-2xl border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm space-y-4">
//                     <h3 className="text-lg font-semibold">Account Security</h3>
//                      <div className="space-y-4">
//                         <div>
//                             <label className="block text-xs font-medium text-pink-600 dark:text-pink-400 mb-1">Enter current password</label>
//                             <input type={showPasswords.old ? 'text' : 'password'} value={passwordData.oldPassword} onChange={(e) => setPasswordData({...passwordData, oldPassword: e.target.value})} className="w-full p-2 border-b bg-transparent dark:border-gray-600 border-gray-200 focus:outline-none focus:border-pink-500"/>
//                         </div>
//                         <div>
//                             <label className="block text-xs font-medium text-pink-600 dark:text-pink-400 mb-1">New password</label>
//                             <input type={showPasswords.new ? 'text' : 'password'} value={passwordData.newPassword} onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})} className="w-full p-2 border-b bg-transparent dark:border-gray-600 border-gray-200 focus:outline-none focus:border-pink-500"/>
//                         </div>
//                         <div>
//                             <label className="block text-xs font-medium text-pink-600 dark:text-pink-400 mb-1">Confirm password</label>
//                             <input type={showPasswords.confirm ? 'text' : 'password'} value={passwordData.confirmPassword} onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})} className="w-full p-2 border-b bg-transparent dark:border-gray-600 border-gray-200 focus:outline-none focus:border-pink-500"/>
//                         </div>
//                     </div>
//                     <button type="submit" className="w-full mt-4 bg-pink-500 text-white py-3 rounded-full font-medium hover:bg-pink-600 transition-colors">Save Information</button>
//                 </form>
                
//                 {/* Support Section */}
//                 <div className="mb-6">
//                     <h3 className="text-lg font-semibold mb-2 px-2">Support</h3>
//                     <div className="rounded-2xl border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
//                         <button onClick={() => navigate('/help-center')} className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
//                            <div className="flex items-center gap-3">
//                                 <HelpCircle className="w-6 h-6 text-blue-500" />
//                                 <span className="font-medium">Help Center</span>
//                             </div>
//                             <ChevronRight className="w-5 h-5 text-gray-400" />
//                         </button>
//                         <div className="border-t border-gray-200 dark:border-gray-700">
//                             <button onClick={() => navigate('/terms-of-service')} className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
//                                 <div className="flex items-center gap-3">
//                                     <FileText className="w-6 h-6 text-gray-500" />
//                                     <span className="font-medium">Terms of Service</span>
//                                 </div>
//                                 <ChevronRight className="w-5 h-5 text-gray-400" />
//                             </button>
//                         </div>
//                          <div className="border-t border-gray-200 dark:border-gray-700">
//                             <button onClick={() => navigate('/privacy-policy')} className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
//                                 <div className="flex items-center gap-3">
//                                     <Shield className="w-6 h-6 text-green-500" />
//                                     <span className="font-medium">Privacy Policy</span>
//                                 </div>
//                                 <ChevronRight className="w-5 h-5 text-gray-400" />
//                             </button>
//                         </div>
//                     </div>
//                 </div>

//               <div className="mt-6">
//                     <button onClick={handleLogout} className="w-full text-red-500 font-semibold py-3 px-4 rounded-full hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors flex items-center justify-center gap-2">
//                         <LogOut size={16} />
//                         Log Out
//                     </button>
//                 </div>
//             </div>
//             <BottomNav />
//         </div>
//     );
// }


import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { ArrowLeft, Bell, Sun, Moon, ChevronRight, User, Mail, Smartphone, Laptop, Edit2, LogOut, HelpCircle, FileText, Shield, Eye, EyeOff } from 'lucide-react';
import useAuthStore from '../store/useAuthStore';
import useThemeStore from '../store/useThemeStore';
import apiClient from '../api/axiosConfig';
import BottomNav from '../components/layout/BottomNav';
import useNotificationStore from '../store/useNotificationStore';
import DesktopNav from '../components/layout/DesktopNav'; // Import DesktopNav
import useBreakpoint from '../hooks/useBreakpoint'; // Import useBreakpoint
const StatSkeleton = () => <div className="h-9 w-16 mx-auto bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse" />;

// This is a placeholder for your actual NotificationToggle component
const NotificationToggle = () => (
    <div className="flex items-center justify-between p-4 rounded-2xl mb-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-700">
                <Bell className="text-gray-500" />
            </div>
            <div>
                <div className="font-semibold">Notifications</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Manage your alerts</div>
            </div>
        </div>
        <div className="relative w-12 h-6 rounded-full bg-green-500">
            <div className="absolute top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300" style={{ transform: 'translateX(28px)' }} />
        </div>
    </div>
);


export default function ProfilePage() {
    const navigate = useNavigate();
    const { userInfo, logout, updateUserInfo } = useAuthStore();
    const { theme, setTheme } = useThemeStore(); 
    const { unreadCount } = useNotificationStore(); 
    const isDesktop = useBreakpoint();
    const [stats, setStats] = useState({ pingsCreated: 0, totalParticipate: 0 });
    const [isLoadingStats, setIsLoadingStats] = useState(true);
    const [activeTimeFilter, setActiveTimeFilter] = useState('Week');
    const fileInputRef = useRef(null);

    const [formData, setFormData] = useState({
        name: userInfo?.username || '',
        email: userInfo?.email || '',
        phone: userInfo?.phoneNumber || '',
    });

    const [passwordData, setPasswordData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    });
    const [showPasswords, setShowPasswords] = useState({ old: false, new: false, confirm: false });

    // Effect to fetch user statistics
    useEffect(() => {
        const fetchUserStats = async () => {
            setIsLoadingStats(true);
            try {
                const periodMap = { 'Week': 'week', 'Month': 'month', 'All-time': 'all-time' };
                const period = periodMap[activeTimeFilter];
                const response = await apiClient.get(`/api/users/profile-stats?period=${period}`);
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
        const toastId = toast.loading('Uploading...');
        const formData = new FormData();
        formData.append('profilePicture', file);
        try {
            const response = await apiClient.put('/api/users/profile/picture', formData);
            updateUserInfo(response.data);
            toast.success('Profile picture updated!', { id: toastId });
        } catch (error) {
            toast.error(error.response?.data?.error || 'Upload failed.', { id: toastId });
        }
    };
    
    const handleInfoUpdate = async (e) => {
        e.preventDefault();
        const toastId = toast.loading('Updating information...');
        try {
            const response = await apiClient.put('/api/users/profile', formData);
            updateUserInfo(response.data);
            toast.success('Information updated!', { id: toastId });
        } catch (error) {
            toast.error(error.response?.data?.error || 'Update failed.', { id: toastId });
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
        const toastId = toast.loading('Changing password...');
        try {
            await apiClient.put('/api/users/profile/password', passwordData);
            toast.success('Password updated successfully!', { id: toastId });
            setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
        } catch (error) {
            toast.error(error.response?.data?.error || 'Update failed.', { id: toastId });
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const getInitials = (name = '') => name.split(' ').map(n => n[0]).join('').toUpperCase() || '?';
    
    if (!userInfo) {
        React.useEffect(() => { navigate('/'); }, [navigate]);
        return null;
    }

    return (
        <div className="mx-auto min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 w-full">
            {/* Header */}
          {isDesktop ? (
                // On Desktop, show the main sticky nav and breadcrumbs
                <>
                    <DesktopNav />
                    <div className="px-6 lg:px-24 py-4 text-sm text-gray-500 border-b border-gray-200 dark:border-gray-700">
                        <Link to="/dashboard" className="hover:text-pink-500">Home</Link>
                        <span className="mx-2">/</span>
                        <span className="font-semibold">Profile</span>
                    </div>
                </>
            ) : (
                // On Mobile/Tablet, show the simple header
                <div className="sticky top-0 z-40 border-b bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between p-4 max-w-5xl mx-auto">
                        <button onClick={() => navigate(-1)}><ArrowLeft className="w-6 h-6" /></button>
                        <h1 className="text-lg font-semibold">Profile</h1>
                        <button onClick={() => navigate("/notifications")} className="relative p-1">
                            <Bell className="w-6 h-6" />
                            {unreadCount > 0 && (
                                <span className="absolute top-0 right-0 flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            )}
            {/* FIX: Added pb-24 for bottom nav spacing to solve scroll issue */}
            <div className="p-4 md:p-6 pb-24 max-w-5xl mx-auto">
                {/* Overview Section */}
                <div className="border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm rounded-2xl p-4 relative mt-10 mb-6 max-w-lg mx-auto"> 
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24">
                        <button onClick={handleAvatarClick} className="w-full h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg relative group">
                            {userInfo.profilePictureUrl ? (
                                <img src={userInfo.profilePictureUrl} alt="Profile" className="w-full h-full rounded-full object-cover" />
                            ) : (
                                <span className="text-white text-4xl font-bold">{getInitials(userInfo.username)}</span>
                            )}
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 rounded-full flex items-center justify-center transition-all duration-300">
                                <Edit2 className="w-8 h-8 text-white opacity-0 group-hover:opacity-100" />
                            </div>
                        </button>
                        <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/png, image/jpeg" />
                    </div>
                    <p className="text-center font-bold text-xl pt-14">{userInfo.username}</p>
                    <div className="flex justify-around items-center my-4">
                        <div className="text-center">
                            <div className="text-3xl font-bold">
                                {isLoadingStats ? <StatSkeleton /> : stats.pingsCreated}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">Pings Created</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold">
                                {isLoadingStats ? <StatSkeleton /> : stats.totalParticipate}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">Participated</div>
                        </div>
                    </div>  
                    <div className="flex justify-center space-x-2">
                        {['Week', 'Month', 'All-time'].map((filter) => (
                            <button key={filter} onClick={() => setActiveTimeFilter(filter)} className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${activeTimeFilter === filter ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-md' : 'bg-gray-100 dark:bg-gray-700 dark:text-gray-300 text-gray-600'}`}>
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        {/* UPDATED: Advanced Dark Mode Toggle */}
                        <div className="flex items-center justify-between p-4 rounded-2xl mb-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-700">
                                    {theme === 'dark' ? <Moon className="text-purple-400" /> : theme === 'light' ? <Sun className="text-orange-400" /> : <Laptop className="text-gray-500" />}
                                </div>
                                <div>
                                    <div className="font-semibold">Appearance</div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">Customize your theme</div>
                                </div>
                            </div>
                            <div className="flex items-center p-1 space-x-1 bg-gray-100 dark:bg-gray-700 rounded-full">
                                <button onClick={() => setTheme('light')} title="Light" className={`p-1.5 rounded-full ${theme === 'light' ? 'bg-white dark:bg-gray-800 shadow' : ''}`}><Sun size={16} className={theme === 'light' ? 'text-orange-500' : 'text-gray-500 dark:text-gray-400'} /></button>
                                <button onClick={() => setTheme('dark')} title="Dark" className={`p-1.5 rounded-full ${theme === 'dark' ? 'bg-white dark:bg-gray-800 shadow' : ''}`}><Moon size={16} className={theme === 'dark' ? 'text-purple-400' : 'text-gray-500 dark:text-gray-400'} /></button>
                                <button onClick={() => setTheme('system')} title="System" className={`p-1.5 rounded-full ${theme === 'system' ? 'bg-white dark:bg-gray-800 shadow' : ''}`}><Laptop size={16} className={theme === 'system' ? 'text-blue-500' : 'text-gray-500 dark:text-gray-400'} /></button>
                            </div>
                        </div>
            
                        <NotificationToggle />
                        {/* Edit Information Form */}
                        <form onSubmit={handleInfoUpdate} className="mb-6 p-4 rounded-2xl border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm space-y-4">
                            <h3 className="text-lg font-semibold">Edit Information</h3>
                            <div>
                                <label className="block text-sm font-medium text-pink-600 mb-1">Name</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full pl-10 pr-4 py-3 rounded-full border bg-gray-50 dark:bg-gray-700 dark:border-gray-600 border-gray-200" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-pink-600 mb-1">Email</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full pl-10 pr-4 py-3 rounded-full border bg-gray-50 dark:bg-gray-700 dark:border-gray-600 border-gray-200" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-pink-600 mb-1">Phone</label>
                                <div className="relative">
                                    <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full pl-10 pr-4 py-3 rounded-full border bg-gray-50 dark:bg-gray-700 dark:border-gray-600 border-gray-200" />
                                </div>
                            </div>
                            <button type="submit" className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-full font-medium">Save Information</button>
                        </form>
                    </div>
                    <div>
                        {/* Account Security Form */}
                        <form onSubmit={handlePasswordUpdate} className="mb-6 p-4 rounded-2xl border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm space-y-4">
                            <h3 className="text-lg font-semibold">Account Security</h3>
                            <div>
                                <label className="block text-sm font-medium text-pink-600 mb-1">Old password</label>
                                <div className="relative">
                                    <input type={showPasswords.old ? 'text' : 'password'} value={passwordData.oldPassword} onChange={(e) => setPasswordData({...passwordData, oldPassword: e.target.value})} placeholder="••••••••" className="w-full pl-4 pr-12 py-3 rounded-full border bg-gray-50 dark:bg-gray-700 dark:border-gray-600 border-gray-200"/>
                                    <button type="button" onClick={() => setShowPasswords(p => ({...p, old: !p.old}))} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">{showPasswords.old ? <EyeOff size={20}/> : <Eye size={20}/>}</button>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-pink-600 mb-1">New password</label>
                                <div className="relative">
                                    <input type={showPasswords.new ? 'text' : 'password'} value={passwordData.newPassword} onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})} placeholder="••••••••" className="w-full pl-4 pr-12 py-3 rounded-full border bg-gray-50 dark:bg-gray-700 dark:border-gray-600 border-gray-200"/>
                                    <button type="button" onClick={() => setShowPasswords(p => ({...p, new: !p.new}))} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">{showPasswords.new ? <EyeOff size={20}/> : <Eye size={20}/>}</button>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-pink-600 mb-1">Confirm password</label>
                                <div className="relative">
                                    <input type={showPasswords.confirm ? 'text' : 'password'} value={passwordData.confirmPassword} onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})} placeholder="••••••••" className="w-full pl-4 pr-12 py-3 rounded-full border bg-gray-50 dark:bg-gray-700 dark:border-gray-600 border-gray-200"/>
                                    <button type="button" onClick={() => setShowPasswords(p => ({...p, confirm: !p.confirm}))} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">{showPasswords.confirm ? <EyeOff size={20}/> : <Eye size={20}/>}</button>
                                </div>
                            </div>
                            <button type="submit" className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-full font-medium">Change Password</button>
                        </form>
                    </div>
                </div>
                {/* Support Section */}
                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2 px-2">Support</h3>
                    <div className="rounded-2xl border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
                        <button onClick={() => navigate('/help-center')} className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                            <div className="flex items-center gap-3">
                                <HelpCircle className="w-6 h-6 text-blue-500" />
                                <span className="font-medium">Help Center</span>
                            </div>
                            <ChevronRight className="w-5 h-5 text-gray-400" />
                        </button>
                        <div className="border-t border-gray-200 dark:border-gray-700">
                            <button onClick={() => navigate('/terms-of-service')} className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                <div className="flex items-center gap-3">
                                    <FileText className="w-6 h-6 text-gray-500" />
                                    <span className="font-medium">Terms of Service</span>
                                </div>
                                <ChevronRight className="w-5 h-5 text-gray-400" />
                            </button>
                        </div>
                        <div className="border-t border-gray-200 dark:border-gray-700">
                            <button onClick={() => navigate('/privacy-policy')} className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
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
                <div className="mt-6 max-w-md mx-auto">
                    <button onClick={handleLogout} className="w-full text-red-500 font-semibold py-3 px-4 rounded-full hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors flex items-center justify-center gap-2">
                        <LogOut size={16} />
                        Log Out
                    </button>
                </div>
            </div>
          <div className="lg:hidden">
                <BottomNav />
            </div>
        </div>
    );
}

