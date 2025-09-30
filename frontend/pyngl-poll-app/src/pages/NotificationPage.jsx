// // // import React, { useEffect } from 'react';
// // // import { useNavigate } from 'react-router-dom';
// // // import { ArrowLeft, Bell, Clock, CheckCircle2 } from 'lucide-react';
// // // import useNotificationStore from '../store/useNotificationStore';
// // // import { formatDistanceToNow } from 'date-fns';

// // // // ✅ NEW: A custom, animated SVG icon for poll notifications that uses your brand's colors.
// // // const AnimatedPollIcon = () => (
// // //     <div className="flex items-center justify-center w-6 h-6">
// // //         {/* The CSS for the animation is defined here for reusability */}
// // //         <style>{`
// // //             .wave-bar {
// // //                 width: 4px;
// // //                 height: 100%;
// // //                 border-radius: 2px;
// // //                 animation: wave-animation 1.2s ease-in-out infinite;
// // //             }
// // //             /* Colors are taken from your branding to ensure consistency */
// // //             .bar-1 { background-color: #4C9CFA; animation-delay: 0s; }
// // //             .bar-2 { background-color: #7B4CFF; animation-delay: 0.1s; }
// // //             .bar-3 { background-color: #E741D2; animation-delay: 0.2s; }
// // //             @keyframes wave-animation {
// // //                 0%, 40%, 100% { transform: scaleY(0.4); }
// // //                 20% { transform: scaleY(1.0); }
// // //             }
// // //         `}</style>
// // //         <div className="flex items-end justify-center w-full h-full gap-0.5">
// // //             <div className="wave-bar bar-1"></div>
// // //             <div className="wave-bar bar-2"></div>
// // //             <div className="wave-bar bar-3"></div>
// // //         </div>
// // //     </div>
// // // );

// // // // A helper function to group notifications by date for better readability
// // // const groupNotificationsByDate = (notifications) => {
// // //     const groups = {
// // //         Today: [],
// // //         Yesterday: [],
// // //         Older: [],
// // //     };

// // //     const today = new Date();
// // //     const yesterday = new Date(today);
// // //     yesterday.setDate(yesterday.getDate() - 1);

// // //     notifications.forEach(notif => {
// // //         const notifDate = new Date(notif.createdAt);
// // //         if (notifDate.toDateString() === today.toDateString()) {
// // //             groups.Today.push(notif);
// // //         } else if (notifDate.toDateString() === yesterday.toDateString()) {
// // //             groups.Yesterday.push(notif);
// // //         } else {
// // //             groups.Older.push(notif);
// // //         }
// // //     });

// // //     return groups;
// // // };

// // // // A reusable component for each notification item with enhanced styling
// // // const NotificationItem = ({ notification }) => {
// // //     const navigate = useNavigate();
// // //     const { handleNotificationClick } = useNotificationStore();

// // //     const handleClick = async () => {
// // //         // 2. Call the new handler, which updates the state and talks to the backend
// // //         await handleNotificationClick(notification);
// // //         // 3. Navigate to the poll page
// // //         navigate(notification.link);
// // //     };

// // //     // Determine the icon based on the notification message content
// // //     const getIcon = () => {
// // //         if (notification.message.includes('created') || notification.message.includes('live')) {
// // //             // ✅ Use the new animated icon for poll creation alerts
// // //             return <AnimatedPollIcon />;
// // //         }
// // //         if (notification.message.includes('ending soon')) {
// // //             return <Clock className="w-6 h-6 text-yellow-500" />;
// // //         }
// // //         // Fallback for other notification types
// // //         return <CheckCircle2 className="w-6 h-6 text-green-500" />;
// // //     };

// // //     return (
// // //         <div 
// // //             onClick={handleClick}
// // //             className={`flex items-start gap-4 p-4 rounded-2xl border cursor-pointer hover:shadow-md transition-all duration-300 ${!notification.read ? 'bg-pink-50 border-pink-200' : 'bg-white border-gray-200'}`}
// // //         >
// // //             <div className="flex-shrink-0 w-10 h-10 bg-white rounded-full flex items-center justify-center border">
// // //                 {getIcon()}
// // //             </div>
// // //             <div className="flex-grow">
// // //                 <p className="font-semibold text-gray-800">{notification.message}</p>
// // //                 <p className="text-sm text-gray-500 mt-1">
// // //                     {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
// // //                 </p>
// // //             </div>
// // //         </div>
// // //     );
// // // };


// // // // export default function NotificationsPage() {
// // // //     const navigate = useNavigate();
// // // //     const { notifications, markAsRead } = useNotificationStore();

// // // //     useEffect(() => {
// // // //         markAsRead();
// // // //     }, [markAsRead]);

// // // //     const groupedNotifications = groupNotificationsByDate(notifications);

// // // //     return (
// // // //         <div className="mx-auto min-h-screen max-w-md bg-gray-50">
// // // //             {/* Header */}
// // // //             <div className="sticky top-0 z-40 border-b border-gray-100 bg-white/80 backdrop-blur-md">
// // // //                 <div className="flex items-center justify-between p-4">
// // // //                     <button onClick={() => navigate(-1)}><ArrowLeft className="w-6 h-6 text-gray-700" /></button>
// // // //                     <h1 className="text-lg font-semibold">Notifications</h1>
// // // //                     <div className="w-6"></div>
// // // //                 </div>
// // // //             </div>

// // // //             {/* Notification List */}
// // // //             <div className="p-4">
// // // //                 {notifications.length === 0 ? (
// // // //                     <div className="text-center text-gray-500 pt-20">
// // // //                         <Bell size={48} className="mx-auto text-gray-300" />
// // // //                         <h3 className="mt-4 text-xl font-semibold">No Notifications Yet</h3>
// // // //                         <p className="mt-2 text-sm">When you create polls or get important updates, they'll appear here.</p>
// // // //                     </div>
// // // //                 ) : (
// // // //                     Object.keys(groupedNotifications).map(group => (
// // // //                         groupedNotifications[group].length > 0 && (
// // // //                             <div key={group} className="mb-6">
// // // //                                 <h2 className="font-bold text-gray-500 text-sm mb-3 px-2">{group}</h2>
// // // //                                 <div className="space-y-3">
// // // //                                     {groupedNotifications[group].map(notif => (
// // // //                                         <NotificationItem key={notif._id} notification={notif} />
// // // //                                     ))}
// // // //                                 </div>
// // // //                             </div>
// // // //                         )
// // // //                     ))
// // // //                 )}
// // // //             </div>
// // // //         </div>
// // // //     );
// // // // }

// // // export default function NotificationsPage() {
// // //     const navigate = useNavigate();
// // //     const { notifications, markAsRead } = useNotificationStore();

// // //     useEffect(() => {
// // //         markAsRead();
// // //     }, [markAsRead]);

// // //     const groupedNotifications = groupNotificationsByDate(notifications);

// // //     return (
// // //         <div className="mx-auto min-h-screen max-w-md bg-gray-50">
// // //             <div className="sticky top-0 z-40 border-b border-gray-100 bg-white/80 backdrop-blur-md">
// // //                 <div className="flex items-center justify-between p-4">
// // //                     <button onClick={() => navigate(-1)}><ArrowLeft className="w-6 h-6 text-gray-700" /></button>
// // //                     <h1 className="text-lg font-semibold">Notifications</h1>
// // //                     <div className="w-6"></div>
// // //                 </div>
// // //             </div>

// // //             <div className="p-4">
// // //                 {notifications.length === 0 ? (
// // //                     <div className="text-center text-gray-500 pt-20">
// // //                         <Bell size={48} className="mx-auto text-gray-300" />
// // //                         <h3 className="mt-4 text-xl font-semibold">No Notifications Yet</h3>
// // //                         <p className="mt-2 text-sm">When you create polls or get important updates, they'll appear here.</p>
// // //                     </div>
// // //                 ) : (
// // //                     Object.keys(groupedNotifications).map(group => (
// // //                         groupedNotifications[group].length > 0 && (
// // //                             <div key={group} className="mb-6">
// // //                                 <h2 className="font-bold text-gray-500 text-sm mb-3 px-2">{group}</h2>
// // //                                 <div className="space-y-3">
// // //                                     {groupedNotifications[group].map(notif => (
// // //                                         <NotificationItem key={notif._id} notification={notif} />
// // //                                     ))}
// // //                                 </div>
// // //                             </div>
// // //                         )
// // //                     ))
// // //                 )}
// // //             </div>
// // //         </div>
// // //     );
// // // }
// // import React, { useEffect, useRef } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import { ArrowLeft, Bell, Trash2 } from 'lucide-react';
// // import useNotificationStore from '../store/useNotificationStore';
// // import { formatDistanceToNow } from 'date-fns';
// // import { useSpring, animated } from 'react-spring';
// // import { useDrag } from 'react-use-gesture';

// // // A custom, animated SVG icon for poll notifications that uses your brand's colors.
// // const AnimatedPollIcon = () => (
// //     <div className="flex items-center justify-center w-6 h-6">
// //         <style>{`
// //             .wave-bar {
// //                 width: 4px;
// //                 height: 100%;
// //                 border-radius: 2px;
// //                 animation: wave-animation 1.2s ease-in-out infinite;
// //             }
// //             .bar-1 { background-color: #4C9CFA; animation-delay: 0s; }
// //             .bar-2 { background-color: #7B4CFF; animation-delay: 0.1s; }
// //             .bar-3 { background-color: #E741D2; animation-delay: 0.2s; }
// //             @keyframes wave-animation {
// //                 0%, 40%, 100% { transform: scaleY(0.4); }
// //                 20% { transform: scaleY(1.0); }
// //             }
// //         `}</style>
// //         <div className="flex items-end justify-center w-full h-full gap-0.5">
// //             <div className="wave-bar bar-1"></div>
// //             <div className="wave-bar bar-2"></div>
// //             <div className="wave-bar bar-3"></div>
// //         </div>
// //     </div>
// // );

// // // // A helper function to group notifications by date for better readability
// // // const groupNotificationsByDate = (notifications) => {
// // //     const groups = {
// // //         Today: [],
// // //         Yesterday: [],
// // //         Older: [],
// // //     };
// // //     const today = new Date();
// // //     const yesterday = new Date(today);
// // //     yesterday.setDate(yesterday.getDate() - 1);
// // //     notifications.forEach(notif => {
// // //         const notifDate = new Date(notif.createdAt);
// // //         if (notifDate.toDateString() === today.toDateString()) {
// // //             groups.Today.push(notif);
// // //         } else if (notifDate.toDateString() === yesterday.toDateString()) {
// // //             groups.Yesterday.push(notif);
// // //         } else {
// // //             groups.Older.push(notif);
// // //         }
// // //     });
// // //     return groups;
// // // };

// // // // A reusable component for each notification item with enhanced styling
// // // const NotificationItem = ({ notification }) => {
// // //     const navigate = useNavigate();
// // //     const { handleNotificationClick } = useNotificationStore();

// // //     const handleClick = async () => {
// // //         await handleNotificationClick(notification);
// // //         navigate(notification.link);
// // //     };
    
// // //     const getIcon = () => {
// // //         if (notification.message.includes('created') || notification.message.includes('live')) {
// // //             return <AnimatedPollIcon />;
// // //         }
// // //         if (notification.message.includes('ending soon')) {
// // //             return <Clock className="w-6 h-6 text-yellow-500" />;
// // //         }
// // //         return <CheckCircle2 className="w-6 h-6 text-green-500" />;
// // //     };

// // //     return (
// // //         <div 
// // //             onClick={handleClick}
// // //             className={`flex items-start gap-4 p-4 rounded-2xl border cursor-pointer hover:shadow-md transition-all duration-300 ${!notification.read ? 'bg-pink-50 border-pink-200' : 'bg-white border-gray-200'}`}
// // //         >
// // //             <div className="flex-shrink-0 w-10 h-10 bg-white rounded-full flex items-center justify-center border">
// // //                 {getIcon()}
// // //             </div>
// // //             <div className="flex-grow">
// // //                 <p className="font-semibold text-gray-800">{notification.message}</p>
// // //                 <p className="text-sm text-gray-500 mt-1">
// // //                     {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
// // //                 </p>
// // //             </div>
// // //         </div>
// // //     );
// // // };

// // // export default function NotificationsPage() {
// // //     const navigate = useNavigate();
// // //     const { notifications, markAsRead } = useNotificationStore();

// // //     useEffect(() => {
// // //         markAsRead();
// // //     }, [markAsRead]);

// // //     const groupedNotifications = groupNotificationsByDate(notifications);

// // //     return (
// // //         <div className="mx-auto min-h-screen max-w-md bg-gray-50">
// // //             <div className="sticky top-0 z-40 border-b border-gray-100 bg-white/80 backdrop-blur-md">
// // //                 <div className="flex items-center justify-between p-4">
// // //                     <button onClick={() => navigate(-1)}><ArrowLeft className="w-6 h-6 text-gray-700" /></button>
// // //                     <h1 className="text-lg font-semibold">Notifications</h1>
// // //                     <div className="w-6"></div>
// // //                 </div>
// // //             </div>

// // //             <div className="p-4">
// // //                 {notifications.length === 0 ? (
// // //                     <div className="text-center text-gray-500 pt-20">
// // //                         <Bell size={48} className="mx-auto text-gray-300" />
// // //                         <h3 className="mt-4 text-xl font-semibold">No Notifications Yet</h3>
// // //                         <p className="mt-2 text-sm">When you create polls or get important updates, they'll appear here.</p>
// // //                     </div>
// // //                 ) : (
// // //                     Object.keys(groupedNotifications).map(group => (
// // //                         groupedNotifications[group].length > 0 && (
// // //                             <div key={group} className="mb-6">
// // //                                 <h2 className="font-bold text-gray-500 text-sm mb-3 px-2">{group}</h2>
// // //                                 <div className="space-y-3">
// // //                                     {groupedNotifications[group].map(notif => (
// // //                                         <NotificationItem key={notif._id} notification={notif} />
// // //                                     ))}
// // //                                 </div>
// // //                             </div>
// // //                         )
// // //                     ))
// // //                 )}
// // //             </div>
// // //         </div>
// // //     );
// // // }

// // const groupNotificationsByDate = (notifications) => {
// //     const groups = { Today: [], Yesterday: [], Older: [] };
// //     const today = new Date();
// //     const yesterday = new Date(today);
// //     yesterday.setDate(yesterday.getDate() - 1);
// //     notifications.forEach(notif => {
// //         const notifDate = new Date(notif.createdAt);
// //         if (notifDate.toDateString() === today.toDateString()) groups.Today.push(notif);
// //         else if (notifDate.toDateString() === yesterday.toDateString()) groups.Yesterday.push(notif);
// //         else groups.Older.push(notif);
// //     });
// //     return groups;
// // };

// // const NotificationItem = ({ notification }) => {
// //     const navigate = useNavigate();
// //     const { handleNotificationClick, deleteNotification } = useNotificationStore();
// //     const itemRef = useRef(null);

// //     const [{ x }, api] = useSpring(() => ({ x: 0 }));

// //     const bind = useDrag(({ down, movement: [mx], direction: [xDir], distance, cancel }) => {
// //         if (distance > (itemRef.current?.offsetWidth || 0) / 2 && xDir < 0) {
// //             cancel();
// //             api.start({ 
// //                 x: -(itemRef.current?.offsetWidth || 0), 
// //                 onResolve: () => deleteNotification(notification._id) 
// //             });
// //         } else {
// //             api.start({ x: down ? mx : 0, immediate: down });
// //         }
// //     }, {
// //         axis: 'x',
// //         bounds: { left: -Infinity, right: 0 },
// //         rubberband: true
// //     });

// //     const handleClick = async () => {
// //         await handleNotificationClick(notification);
// //         navigate(notification.link);
// //     };
// //       const getIcon = () => {
// //         if (notification.message.includes('created') || notification.message.includes('live')) {
// //             return <AnimatedPollIcon />;
// //         }
// //         if (notification.message.includes('ending soon')) {
// //             return <Clock className="w-6 h-6 text-yellow-500" />;
// //         }
// //         return <CheckCircle2 className="w-6 h-6 text-green-500" />;
// //     };


// //     return (
// //         <div ref={itemRef} className="relative bg-red-500 rounded-2xl overflow-hidden">
// //             <div className="absolute inset-0 flex items-center justify-end pr-8 text-white">
// //                 <Trash2 size={24} />
// //             </div>
            
// //             <animated.div
// //                 {...bind()}
// //                 style={{ x, touchAction: 'pan-y' }}
// //                 className={`relative z-10 flex items-start gap-4 p-4 rounded-2xl border cursor-pointer ${!notification.read ? 'bg-pink-50 border-pink-200' : 'bg-white border-gray-200'}`}
// //             >
// //                 <div onClick={handleClick} className="flex items-start gap-4 w-full">
// //                     <div className="flex-shrink-0 w-10 h-10 bg-white rounded-full flex items-center justify-center border">
// //                         {getIcon()}
// //                     </div>
// //                     <div className="flex-grow">
// //                         <p className="font-semibold text-gray-800">{notification.message}</p>
// //                         <p className="text-sm text-gray-500 mt-1">
// //                             {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
// //                         </p>
// //                     </div>
// //                 </div>
// //             </animated.div>
// //         </div>
// //     );
// // };

// // export default function NotificationsPage() {
// //     const navigate = useNavigate();
// //     const { notifications, markAsRead } = useNotificationStore();

// //     useEffect(() => {
// //         markAsRead();
// //     }, [markAsRead]);

// //     const groupedNotifications = groupNotificationsByDate(notifications);

// //     return (
// //         <div className="mx-auto min-h-screen max-w-md bg-gray-50">
// //             <div className="sticky top-0 z-40 border-b border-gray-100 bg-white/80 backdrop-blur-md">
// //                 <div className="flex items-center justify-between p-4">
// //                     <button onClick={() => navigate(-1)}><ArrowLeft className="w-6 h-6 text-gray-700" /></button>
// //                     <h1 className="text-lg font-semibold">Notifications</h1>
// //                     <div className="w-6"></div>
// //                 </div>
// //             </div>

// //             <div className="p-4">
// //                 {notifications.length === 0 ? (
// //                     <div className="text-center text-gray-500 pt-20">
// //                         <Bell size={48} className="mx-auto text-gray-300" />
// //                         <h3 className="mt-4 text-xl font-semibold">No Notifications Yet</h3>
// //                         <p className="mt-2 text-sm">When you create polls or get important updates, they'll appear here.</p>
// //                     </div>
// //                 ) : (
// //                     Object.keys(groupedNotifications).map(group => (
// //                         groupedNotifications[group].length > 0 && (
// //                             <div key={group} className="mb-6">
// //                                 <h2 className="font-bold text-gray-500 text-sm mb-3 px-2">{group}</h2>
// //                                 <div className="space-y-3">
// //                                     {groupedNotifications[group].map(notif => (
// //                                         <NotificationItem key={notif._id} notification={notif} />
// //                                     ))}
// //                                 </div>
// //                             </div>
// //                         )
// //                     ))
// //                 )}
// //             </div>
// //         </div>
// //     );
// // }
// import React, { useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { ArrowLeft, Bell, Trash2, Clock, CheckCircle2, PartyPopper, Lightbulb } from 'lucide-react';
// import useNotificationStore from '../store/useNotificationStore';
// import { formatDistanceToNow } from 'date-fns';
// import { useSpring, animated } from 'react-spring';
// import { useDrag } from 'react-use-gesture';

// const AnimatedPollIcon = () => (
//     <div className="flex items-center justify-center w-6 h-6">
//         <style>{`
//             .wave-bar {
//                 width: 4px;
//                 height: 100%;
//                 border-radius: 2px;
//                 animation: wave-animation 1.2s ease-in-out infinite;
//             }
//             .bar-1 { background-color: #4C9CFA; animation-delay: 0s; }
//             .bar-2 { background-color: #7B4CFF; animation-delay: 0.1s; }
//             .bar-3 { background-color: #E741D2; animation-delay: 0.2s; }
//             @keyframes wave-animation {
//                 0%, 40%, 100% { transform: scaleY(0.4); }
//                 20% { transform: scaleY(1.0); }
//             }
//         `}</style>
//         <div className="flex items-end justify-center w-full h-full gap-0.5">
//             <div className="wave-bar bar-1"></div>
//             <div className="wave-bar bar-2"></div>
//             <div className="wave-bar bar-3"></div>
//         </div>
//     </div>
// );

// const groupNotificationsByDate = (notifications) => {
//     const groups = { Today: [], Yesterday: [], Older: [] };
//     const today = new Date();
//     const yesterday = new Date(today);
//     yesterday.setDate(yesterday.getDate() - 1);
//     notifications.forEach(notif => {
//         const notifDate = new Date(notif.createdAt);
//         if (notifDate.toDateString() === today.toDateString()) groups.Today.push(notif);
//         else if (notifDate.toDateString() === yesterday.toDateString()) groups.Yesterday.push(notif);
//         else groups.Older.push(notif);
//     });
//     return groups;
// };

// const NotificationItem = ({ notification }) => {
//     const navigate = useNavigate();
//     const { handleNotificationClick, deleteNotification } = useNotificationStore();
//     const itemRef = useRef(null);

//     const [{ x }, api] = useSpring(() => ({ x: 0 }));

//     const bind = useDrag(({ down, movement: [mx], direction: [xDir], distance, cancel }) => {
//         if (distance > (itemRef.current?.offsetWidth || 0) / 2 && xDir < 0) {
//             cancel();
//             api.start({ 
//                 x: -(itemRef.current?.offsetWidth || 0), 
//                 onResolve: () => deleteNotification(notification._id) 
//             });
//         } else {
//             api.start({ x: down ? mx : 0, immediate: down });
//         }
//     }, {
//         axis: 'x',
//         bounds: { left: -Infinity, right: 0 },
//         rubberband: true
//     });

//     const handleClick = async () => {
//         await handleNotificationClick(notification);
//         navigate(notification.link);
//     };
    
//     const getIcon = () => {
//         const message = notification.message.toLowerCase();
//         if (message.includes('welcome')) {
//             return <PartyPopper className="w-6 h-6 text-purple-500" />;
//         }
//         if (message.includes('hungry for opinions') || message.includes('scrolling endlessly') || message.includes('need drama')) {
//             return <Lightbulb className="w-6 h-6 text-yellow-500" />;
//         }
//         if (message.includes('created') || message.includes('live')) {
//             return <AnimatedPollIcon />;
//         }
//         if (message.includes('ending soon')) {
//             return <Clock className="w-6 h-6 text-orange-500" />;
//         }
//         return <CheckCircle2 className="w-6 h-6 text-green-500" />;
//     };

//     return (
//         <div ref={itemRef} className="relative bg-red-500 rounded-2xl overflow-hidden">
//             <div className="absolute inset-0 flex items-center justify-end pr-8 text-white">
//                 <Trash2 size={24} />
//             </div>
            
//             <animated.div
//                 {...bind()}
//                 style={{ x, touchAction: 'pan-y' }}
//                 className={`relative z-10 flex items-start gap-4 p-4 rounded-2xl border cursor-pointer ${!notification.read ? 'bg-pink-50 border-pink-200' : 'bg-white border-gray-200'}`}
//             >
//                 <div onClick={handleClick} className="flex items-start gap-4 w-full">
//                     <div className="flex-shrink-0 w-10 h-10 bg-white rounded-full flex items-center justify-center border">
//                         {getIcon()}
//                     </div>
//                     <div className="flex-grow">
//                         <p className="font-semibold text-gray-800">{notification.message}</p>
//                         <p className="text-sm text-gray-500 mt-1">
//                             {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
//                         </p>
//                     </div>
//                 </div>
//             </animated.div>
//         </div>
//     );
// };

// export default function NotificationsPage() {
//     const navigate = useNavigate();
//     const { notifications, markAsRead } = useNotificationStore();

//     useEffect(() => {
//         markAsRead();
//     }, [markAsRead]);

//     const groupedNotifications = groupNotificationsByDate(notifications);

//     return (
//         <div className="mx-auto min-h-screen max-w-md bg-gray-50">
//             <div className="sticky top-0 z-40 border-b border-gray-100 bg-white/80 backdrop-blur-md">
//                 <div className="flex items-center justify-between p-4">
//                     <button onClick={() => navigate(-1)}><ArrowLeft className="w-6 h-6 text-gray-700" /></button>
//                     <h1 className="text-lg font-semibold">Notifications</h1>
//                     <div className="w-6"></div>
//                 </div>
//             </div>

//             <div className="p-4">
//                 {notifications.length === 0 ? (
//                     <div className="text-center text-gray-500 pt-20">
//                         <Bell size={48} className="mx-auto text-gray-300" />
//                         <h3 className="mt-4 text-xl font-semibold">No Notifications Yet</h3>
//                         <p className="mt-2 text-sm">When you create polls or get important updates, they'll appear here.</p>
//                     </div>
//                 ) : (
//                     Object.keys(groupedNotifications).map(group => (
//                         groupedNotifications[group].length > 0 && (
//                             <div key={group} className="mb-6">
//                                 <h2 className="font-bold text-gray-500 text-sm mb-3 px-2">{group}</h2>
//                                 <div className="space-y-3">
//                                     {groupedNotifications[group].map(notif => (
//                                         <NotificationItem key={notif._id} notification={notif} />
//                                     ))}
//                                 </div>
//                             </div>
//                         )
//                     ))
//                 )}
//             </div>
//         </div>
//     );
// }

// import React, { useEffect, useRef, useState} from 'react';
// import { useNavigate } from 'react-router-dom';
// import { ArrowLeft, Bell, Trash2, Clock, CheckCircle2, PartyPopper, Lightbulb } from 'lucide-react';
// import useNotificationStore from '../store/useNotificationStore';
// import { formatDistanceToNow } from 'date-fns';
// import { useSpring, animated } from 'react-spring';
// import { useDrag } from 'react-use-gesture';
// import WelcomeAnimation from '../components/common/Animation.jsx';
// // A custom, animated SVG icon for poll notifications
// const AnimatedPollIcon = () => (
//     <div className="flex items-center justify-center w-6 h-6">
//         <style>{`
//             .wave-bar { width: 4px; height: 100%; border-radius: 2px; animation: wave-animation 1.2s ease-in-out infinite; }
//             .bar-1 { background-color: #4C9CFA; animation-delay: 0s; }
//             .bar-2 { background-color: #7B4CFF; animation-delay: 0.1s; }
//             .bar-3 { background-color: #E741D2; animation-delay: 0.2s; }
//             @keyframes wave-animation { 0%, 40%, 100% { transform: scaleY(0.4); } 20% { transform: scaleY(1.0); } }
//         `}</style>
//         <div className="flex items-end justify-center w-full h-full gap-0.5">
//             <div className="wave-bar bar-1"></div>
//             <div className="wave-bar bar-2"></div>
//             <div className="wave-bar bar-3"></div>
//         </div>
//     </div>
// );

// // A helper function to group notifications by date
// const groupNotificationsByDate = (notifications) => {
//     const groups = { Today: [], Yesterday: [], Older: [] };
//     const today = new Date();
//     const yesterday = new Date(today);
//     yesterday.setDate(yesterday.getDate() - 1);

//     notifications.forEach(notif => {
//         const notifDate = new Date(notif.createdAt);
//         if (notifDate.toDateString() === today.toDateString()) {
//             groups.Today.push(notif);
//         } else if (notifDate.toDateString() === yesterday.toDateString()) {
//             groups.Yesterday.push(notif);
//         } else {
//             groups.Older.push(notif);
//         }
//     });

//     return groups;
// };

// // This component is now smarter and handles the new notification types
// const NotificationItem = ({ notification, onWelcomeClick }) => {
//     const navigate = useNavigate();
//     const { handleNotificationClick, deleteNotification } = useNotificationStore();
//     const itemRef = useRef(null);
//     const [{ x }, api] = useSpring(() => ({ x: 0 }));

//     const bind = useDrag(({ down, movement: [mx], direction: [xDir], distance, cancel }) => {
//         if (distance > (itemRef.current?.offsetWidth || 0) / 2 && xDir < 0) {
//             cancel();
//             api.start({ 
//                 x: -(itemRef.current?.offsetWidth || 0), 
//                 onResolve: () => deleteNotification(notification._id) 
//             });
//         } else {
//             api.start({ x: down ? mx : 0, immediate: down });
//         }
//     }, {
//         axis: 'x',
//         bounds: { left: -Infinity, right: 0 },
//         rubberband: true
//     });

//     const handleClick = async () => {
//         const message = notification.message.toLowerCase();
        
//         // Check if this is the welcome notification
//         if (message.includes('welcome')) {
//             if (!notification.read) {
//                 await handleNotificationClick(notification);
//             }
//             onWelcomeClick(); // Trigger the animation
//         } else {
//             // For all other notifications, perform the standard action
//             await handleNotificationClick(notification);
//             if (notification.link) {
//                 navigate(notification.link);
//             }
//         }
//     };
    
    
//     const getIcon = () => {
//         const message = notification.message.toLowerCase();
//         if (message.includes('welcome')) {
//             return <PartyPopper className="w-6 h-6 text-purple-500" />;
//         }
//         if (notification.link === '/image-to-poll' && !message.includes('welcome')) {
//              return <Lightbulb className="w-6 h-6 text-yellow-500" />;
//         }
//         if (message.includes('created') || message.includes('live')) {
//             return <AnimatedPollIcon />;
//         }
//         if (message.includes('ending soon')) {
//             return <Clock className="w-6 h-6 text-orange-500" />;
//         }
//         return <CheckCircle2 className="w-6 h-6 text-green-500" />;
//     };

//     // Determine if the item should have a hover effect and pointer cursor
//     const isClickable = !notification.message.toLowerCase().includes('welcome') && notification.link !== '/create-poll';

//     return (
//         <div ref={itemRef} className="relative bg-red-500 rounded-2xl overflow-hidden">
//             <div className="absolute inset-0 flex items-center justify-end pr-8 text-white">
//                 <Trash2 size={24} />
//             </div>
            
//                      <animated.div
//                 {...bind()}
//                 style={{ x, touchAction: 'pan-y' }}
//                 className={`relative z-10`}
//                 onClick={handleClick}
//             >
//                 <div className={`flex items-start gap-4 p-4 rounded-2xl border ${!notification.read ? 'bg-pink-50 border-pink-200' : 'bg-white border-gray-200'} ${isClickable ? 'cursor-pointer hover:shadow-md' : 'cursor-default'}`}>
//                     <div className="flex-shrink-0 w-10 h-10 bg-white rounded-full flex items-center justify-center border">
//                         {getIcon()}
//                     </div>
//                     <div className="flex-grow">
//                         <p className="font-semibold text-gray-800">{notification.message}</p>
//                         <p className="text-sm text-gray-500 mt-1">
//                             {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
//                         </p>
//                     </div>
//                 </div>
//             </animated.div>
//         </div>
//     );
// };

// // export default function NotificationsPage() {
// //     const navigate = useNavigate();
// //     const { notifications, markAsRead } = useNotificationStore();
// //     const [showWelcome, setShowWelcome] = useState(false); // 2. Add state for the animation

// //     useEffect(() => {
// //         markAsRead();
// //     }, [markAsRead]);

// //     const groupedNotifications = groupNotificationsByDate(notifications);

// //     return (
// //         <div className="mx-auto min-h-screen max-w-md bg-gray-50">
// //             {/* 3. Conditionally render the welcome animation */}
// //             {showWelcome && <WelcomeAnimation onComplete={() => setShowWelcome(false)} />}

// //             {/* Header */}
// //             <div className="sticky top-0 z-40 border-b border-gray-100 bg-white/80 backdrop-blur-md">
// //                 <div className="flex items-center justify-between p-4">
// //                     <button onClick={() => navigate(-1)}><ArrowLeft className="w-6 h-6 text-gray-700" /></button>
// //                     <h1 className="text-lg font-semibold">Notifications</h1>
// //                     <div className="w-6"></div>
// //                 </div>
// //             </div>

// //             {/* Notification List */}
// //             <div className="p-4">
// //                 {notifications.length === 0 ? (
// //                     <div className="text-center text-gray-500 pt-20">
// //                         {/* ... Your "No Notifications" message ... */}
// //                     </div>
// //                 ) : (
// //                     Object.keys(groupedNotifications).map(group => (
// //                         groupedNotifications[group].length > 0 && (
// //                             <div key={group} className="mb-6">
// //                                 <h2 className="font-bold text-gray-500 text-sm mb-3 px-2">{group}</h2>
// //                                 <div className="space-y-3">
// //                                     {groupedNotifications[group].map(notif => (
// //                                         <NotificationItem 
// //                                             key={notif._id} 
// //                                             notification={notif} 
// //                                             // 4. Pass the function to trigger the animation
// //                                             onWelcomeClick={() => setShowWelcome(true)} 
// //                                         />
// //                                     ))}
// //                                 </div>
// //                             </div>
// //                         )
// //                     ))
// //                 )}
// //             </div>
// //         </div>
// //     );
// // }
// export default function NotificationsPage() {
//     const navigate = useNavigate();
//     const { notifications, markAsRead } = useNotificationStore();
//     const [showWelcome, setShowWelcome] = useState(false);

//     // This effect marks all notifications as read when the page is opened
//     useEffect(() => {
//         markAsRead();
//     }, [markAsRead]);

//     // ✅ NEW: This effect automatically triggers the welcome animation
//     useEffect(() => {
//         // Find if there is an unread welcome notification in the list
//         const unreadWelcome = notifications.find(n => !n.read && n.message.toLowerCase().includes('welcome'));

//         // If one is found, show the animation
//         if (unreadWelcome) {
//             setShowWelcome(true);
//         }
//     }, [notifications]); // This runs whenever the notifications list is loaded or updated

//     const groupedNotifications = groupNotificationsByDate(notifications);

//     return (
//         <div className="mx-auto min-h-screen max-w-md bg-gray-50">
//             {/* The welcome animation will now render automatically when appropriate */}
//             {showWelcome && <WelcomeAnimation onComplete={() => setShowWelcome(false)} />}

//             <div className="sticky top-0 z-40 border-b border-gray-100 bg-white/80 backdrop-blur-md">
//                 <div className="flex items-center justify-between p-4">
//                     <button onClick={() => navigate(-1)}><ArrowLeft className="w-6 h-6 text-gray-700" /></button>
//                     <h1 className="text-lg font-semibold">Notifications</h1>
//                     <div className="w-6"></div>
//                 </div>
//             </div>

//             <div className="p-4">
//                 {notifications.length === 0 ? (
//                     <div className="text-center text-gray-500 pt-20">
//                         <Bell size={48} className="mx-auto text-gray-300" />
//                         <h3 className="mt-4 text-xl font-semibold">No Notifications Yet</h3>
//                         <p className="mt-2 text-sm">Create your first poll to see updates here!</p>
//                     </div>
//                 ) : (
//                     Object.keys(groupedNotifications).map(group => (
//                         groupedNotifications[group].length > 0 && (
//                             <div key={group} className="mb-6">
//                                 <h2 className="font-bold text-gray-500 text-sm mb-3 px-2">{group}</h2>
//                                 <div className="space-y-3">
//                                     {groupedNotifications[group].map(notif => (
//                                         <NotificationItem 
//                                             key={notif._id} 
//                                             notification={notif} 
//                                             onWelcomeClick={() => setShowWelcome(true)} 
//                                         />
//                                     ))}
//                                 </div>
//                             </div>
//                         )
//                     ))
//                 )}
//             </div>
//         </div>
//     );
// }
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell, Trash2, Clock, CheckCircle2, PartyPopper, Lightbulb } from 'lucide-react';
import useNotificationStore from '../store/useNotificationStore';
import { formatDistanceToNow } from 'date-fns';
import { useSpring, animated } from 'react-spring';
import { useDrag } from 'react-use-gesture';
import WelcomeAnimation from '../components/common/Animation.jsx';

// A custom, animated SVG icon for poll notifications
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
                className={`relative z-10 flex items-start gap-4 p-4 rounded-2xl border ${isClickable ? 'cursor-pointer hover:shadow-md' : 'cursor-default'} ${!notification.read ? 'bg-pink-50 border-pink-200' : 'bg-white border-gray-200'}`}
            >
                <div className="flex-shrink-0 w-10 h-10 bg-white rounded-full flex items-center justify-center border">
                    {getIcon()}
                </div>
                <div className="flex-grow">
                    <p className="font-semibold text-gray-800">{notification.message}</p>
                    <p className="text-sm text-gray-500 mt-1">
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
        <div className="mx-auto min-h-screen max-w-md bg-gray-50">
            {showWelcome && <WelcomeAnimation onComplete={() => setShowWelcome(false)} />}

            <div className="sticky top-0 z-40 border-b border-gray-100 bg-white/80 backdrop-blur-md">
                <div className="flex items-center justify-between p-4">
                    <button onClick={() => navigate(-1)}><ArrowLeft className="w-6 h-6 text-gray-700" /></button>
                    <h1 className="text-lg font-semibold">Notifications</h1>
                    <div className="w-6"></div>
                </div>
            </div>

            <div className="p-4">
                {notifications.length === 0 ? (
                    <div className="text-center text-gray-500 pt-20">
                        <Bell size={48} className="mx-auto text-gray-300" />
                        <h3 className="mt-4 text-xl font-semibold">No Notifications Yet</h3>
                        <p className="mt-2 text-sm">Create your first poll to see updates here!</p>
                    </div>
                ) : (
                    Object.keys(groupedNotifications).map(group => (
                        groupedNotifications[group].length > 0 && (
                            <div key={group} className="mb-6">
                                <h2 className="font-bold text-gray-500 text-sm mb-3 px-2">{group}</h2>
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