// // import React from 'react';
// // import { Outlet, useLocation, useNavigate } from 'react-router-dom';
// // import BottomNav from "./BottomNav";
// // import useAuthStore from '../../store/useAuthStore';
// // import { LogOut, Bell } from 'lucide-react';

// // // --- The Main AppLayout Component ---
// // const AppLayout = () => {
// //     const location = useLocation();
// //     const navigate = useNavigate();
// //     const { userInfo, logout } = useAuthStore();

// //     // Define which pages should show a header from this layout
// //     const isHomePage = location.pathname === '/dashboard';
// //     const isCreatePage = location.pathname === '/create-text-poll' || location.pathname === '/create-image-poll';
// //     const isPreviewPage = location.pathname.startsWith('/preview');

// //     // This condition determines if ANY AppLayout header should be shown
// //     const showAppLayoutHeader = isHomePage || isCreatePage || isPreviewPage;

// //     const getHeaderTitle = () => {
// //         if (location.pathname === '/create-text-poll') return 'Text to poll';
// //         if (location.pathname === '/create-image-poll') return 'Image to poll';
// //         if (isPreviewPage) return 'Preview';
// //         return '';
// //     };

// //     return (
// //         <div className="font-sans bg-gray-50 sm:bg-gray-200 sm:flex sm:items-center sm:justify-center min-h-screen">
// //             <div className="w-full h-screen sm:max-w-sm sm:h-[750px] sm:rounded-2xl sm:shadow-lg flex flex-col mx-auto bg-gray-50 relative">
                
// //                 {/* --- THIS IS THE FIX --- */}
// //                 {/* The entire header is now conditional. It will NOT render on /trending, /analytics, etc. */}
// //                 {showAppLayoutHeader && (
// //                     <header className="flex items-center justify-between p-4 border-b flex-shrink-0 bg-white">
// //                         {/* Homepage Header */}
// //                         {isHomePage && (
// //                             <>
// //                                 <h1 className="text-lg font-bold">
// //                                     <img src='/pynglLogoImage.png' alt="Pyngl Logo" style={{ height: '27px', width: '76px' }} />
// //                                 </h1>
// //                                 <div className="flex items-center">
// //                                     <button title="Notifications" className="text-gray-600 p-1">
// //                                         <Bell className="w-6 h-6 text-gray-700" />
// //                                     </button>
// //                                 </div>
// //                             </>
// //                         )}
// //                         {/* Other Pages Header (Create/Preview) */}
// //                         {(isCreatePage || isPreviewPage) && (
// //                              <>
// //                                  <button onClick={() => navigate(-1)} className="text-gray-600 text-lg p-2">←</button>
// //                                  <h1 className="flex-1 text-center font-semibold">{getHeaderTitle()}</h1>
// //                                  <div className="w-10"></div> {/* Placeholder for alignment */}
// //                              </>
// //                         )}
// //                     </header>
// //                 )}

// //                 <main className="flex-grow overflow-y-auto" style={{ paddingBottom: '75px' }}>
// //                     <Outlet />
// //                 </main>
                
// //                 <BottomNav />
// //             </div>
// //         </div>
// //     );
// // };

// // export default AppLayout;
// import React from 'react';
// import { Outlet, useLocation, useNavigate } from 'react-router-dom';
// import BottomNav from "./BottomNav";
// import useAuthStore from '../../store/useAuthStore';

// import { Bell } from 'lucide-react';
// import { Toaster } from 'react-hot-toast';

// const AppLayout = () => {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const { userInfo, logout } = useAuthStore();

//     const isHomePage = location.pathname === '/dashboard';
//     const isCreatePage = location.pathname === '/create-text-poll' || location.pathname === '/create-image-poll';
//     const isPreviewPage = location.pathname.startsWith('/preview');
//     const showAppLayoutHeader = isHomePage || isCreatePage || isPreviewPage;

//     const getHeaderTitle = () => {
//         if (location.pathname === '/create-text-poll') return 'Text to poll';
//         if (location.pathname === '/create-image-poll') return 'Image to poll';
//         if (isPreviewPage) return 'Preview';
//         return '';
//     };

//     return (
//         <div className="font-sans bg-gray-50 sm:bg-gray-200 sm:flex sm:items-center sm:justify-center min-h-screen">
//             <div className="w-full h-screen sm:max-w-sm sm:h-[750px] sm:rounded-2xl sm:shadow-lg flex flex-col mx-auto bg-gray-50 relative">
                
//                 <Toaster
//                     position="top-center"
//                     reverseOrder={false}
//                     toastOptions={{
//                         duration: 4000,
//                         style: {
//                             background: '#333',
//                             color: '#fff',
//                             borderRadius: '9999px',
//                             fontSize: '15px'
//                         },
//                         error: {
//                             style: {
//                                 background: '#FFF1F2',
//                                 color: '#DC2626',
//                                 border: `1px solid #FCA5A5`,
//                             },
//                         },
//                     }}
//                 />
                
//                 {showAppLayoutHeader && (
//                     <header className="flex items-center justify-between p-4 border-b flex-shrink-0 bg-white">
//                         {isHomePage && (
//                             <>
//                                 <h1 className="text-lg font-bold">
//                                     <img src='/pynglLogoImage.png' alt="Pyngl Logo" style={{ height: '27px', width: '76px' }} />
//                                 </h1>
//                                 <div className="flex items-center">
//                                     <button title="Notifications" className="text-gray-600 p-1">
//                                         <Bell className="w-6 h-6 text-gray-700" />
//                                     </button>
//                                 </div>
//                             </>
//                         )}
//                         {(isCreatePage || isPreviewPage) && (
//                              <>
//                                  <button onClick={() => navigate(-1)} className="text-gray-600 text-lg p-2">←</button>
//                                  <h1 className="flex-1 text-center font-semibold">{getHeaderTitle()}</h1>
//                                  <div className="w-10"></div>
//                              </>
//                         )}
//                     </header>
//                 )}

//                 <main className="flex-grow overflow-y-auto" style={{ paddingBottom: '75px' }}>
//                     <Outlet />
//                 </main>
                
//                 <BottomNav />
//             </div>
//         </div>
//     );
// };

// export default AppLayout;

// import React, { useEffect } from 'react';
// import { Outlet, useLocation, useNavigate } from 'react-router-dom';
// import BottomNav from "./BottomNav";
// import useAuthStore from '../../store/useAuthStore';
// import useNotificationStore from '../../store/useNotificationStore';
// import io from 'socket.io-client';
// import { Bell } from 'lucide-react';
// import { Toaster } from 'react-hot-toast';
// import * as Tone from 'tone'; // Corrected import for Tone.js

// const AppLayout = () => {
//     const navigate = useNavigate();
//     const { userInfo } = useAuthStore();
//     const { addNotification, fetchNotifications, unreadCount } = useNotificationStore();

//     // Effect to manage the real-time notification connection
//     useEffect(() => {
//         if (!userInfo) return;

//         fetchNotifications();

//         const socket = io('https://localhost:5000', {
//             transports: ['websocket']
//         });

//         socket.on('connect', () => {
//             socket.emit('join', userInfo._id);
//         });

//         socket.on('new_notification', (notification) => {
//             addNotification(notification);
            
//             // Play a sound effect
//             // Ensure Tone.js is started by user interaction if required by the browser
//             Tone.start().then(() => {
//                 const synth = new Tone.Synth().toDestination();
//                 synth.triggerAttackRelease("C5", "8n");
//             });
//         });

//         return () => {
//             socket.disconnect();
//         };
//     }, [userInfo, addNotification, fetchNotifications]);

//     const location = useLocation();
//     const isHomePage = location.pathname === '/dashboard';

//     return (
//         <div className="font-sans bg-gray-50 sm:bg-gray-200 sm:flex sm:items-center sm:justify-center min-h-screen">
//             <div className="w-full h-screen sm:max-w-sm sm:h-[750px] sm:rounded-2xl sm:shadow-lg flex flex-col mx-auto bg-gray-50 relative">
//                 <Toaster position="top-center" />
                
//                 {isHomePage && (
//                     <header className="flex items-center justify-between p-4 border-b flex-shrink-0 bg-white">
//                         <img src='/pynglLogoImage.png' alt="Pyngl Logo" style={{ height: '27px', width: '76px' }} />
//                         <button onClick={() => navigate('/notifications')} title="Notifications" className="relative p-1">
//                             <Bell className="w-6 h-6 text-gray-700" />
//                             {unreadCount > 0 && (
//                                 <span className="absolute top-0 right-0 flex h-3 w-3">
//                                     <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
//                                     <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
//                                 </span>
//                             )}
//                         </button>
//                     </header>
//                 )}

//                 <main className="flex-grow overflow-y-auto" style={{ paddingBottom: '75px' }}>
//                     <Outlet />
//                 </main>
                
//                 <BottomNav />
//             </div>
//         </div>
//     );
// };

// export default AppLayout;

// import React, { useEffect } from 'react';
// import { Outlet, useLocation, useNavigate } from 'react-router-dom';
// import BottomNav from "./BottomNav";
// import useAuthStore from '../../store/useAuthStore';
// import useNotificationStore from '../../store/useNotificationStore';
// import io from 'socket.io-client';
// import { Bell } from 'lucide-react';
// import { Toaster } from 'react-hot-toast';
// import * as Tone from 'tone';

// const AppLayout = () => {
//     const navigate = useNavigate();
//     const { userInfo } = useAuthStore();
//     const { addNotification, fetchNotifications, unreadCount } = useNotificationStore();

//     // Effect to manage the real-time notification connection
//     useEffect(() => {
//         if (!userInfo) return;

//         fetchNotifications();

//         // 1. Connect to your secure HTTPS WebSocket server
//         const socket = io('https://localhost:5000'||'https://192.168.1.12:5000', { 
//             transports: ['websocket'],
//             // 2. This is crucial for development with self-signed certificates.
//             //    It tells the client to trust your local certificate.
//             rejectUnauthorized: false 
//         });

//         socket.on('connect', () => {
//             console.log('Secure WebSocket connected:', socket.id);
//             socket.emit('join', userInfo._id);
//         });

//         socket.on('new_notification', (notification) => {
//             addNotification(notification);
            
//             // Play a sound effect, ensuring the audio context is ready
//             Tone.start().then(() => {
//                 const synth = new Tone.Synth().toDestination();
//                 synth.triggerAttackRelease("C5", "8n");
//             }).catch(e => console.warn("Tone.js AudioContext not ready yet.", e));
//         });
        
//         socket.on('connect_error', (err) => {
//             console.error("WebSocket Connection Error:", err.message);
//         });

//         return () => {
//             socket.disconnect();
//         };
//     }, [userInfo, addNotification, fetchNotifications]);
    
//     // This effect handles starting the audio context on the first user interaction anywhere on the page
//     useEffect(() => {
//         const startAudio = () => {
//             Tone.start();
//             document.body.removeEventListener('click', startAudio);
//         };
//         document.body.addEventListener('click', startAudio);
//         return () => {
//             document.body.removeEventListener('click', startAudio);
//         }
//     },[]);

//     const location = useLocation();
//     const isHomePage = location.pathname === '/dashboard';

//     return (
//         <div className="font-sans bg-gray-50 sm:bg-gray-200 sm:flex sm:items-center sm:justify-center min-h-screen">
//             <div className="w-full h-screen sm:max-w-sm sm:h-[750px] sm:rounded-2xl sm:shadow-lg flex flex-col mx-auto bg-gray-50 relative">
//                 <Toaster position="top-center" />
                
//                 {isHomePage && (
//                     <header className="flex items-center justify-between p-4 border-b flex-shrink-0 bg-white">
//                         <img src='/pynglLogoImage.png' alt="Pyngl Logo" style={{ height: '27px', width: '76px' }} />
//                         <button onClick={() => navigate('/notifications')} title="Notifications" className="relative p-1">
//                             <Bell className="w-6 h-6 text-gray-700" />
//                             {unreadCount > 0 && (
//                                 <span className="absolute top-0 right-0 flex h-3 w-3">
//                                     <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
//                                     <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
//                                 </span>
//                             )}
//                         </button>
//                     </header>
//                 )}

//                 <main className="flex-grow overflow-y-auto" style={{ paddingBottom: '75px' }}>
//                     <Outlet />
//                 </main>
                
//                 <BottomNav />
//             </div>
//         </div>
//     );
// };

// export default AppLayout;


// import React, { useEffect } from 'react';
// import { Outlet, useLocation, useNavigate } from 'react-router-dom';
// import BottomNav from "./BottomNav";
// import useAuthStore from '../../store/useAuthStore';
// import useNotificationStore from '../../store/useNotificationStore';
// import io from 'socket.io-client';
// import { Bell } from 'lucide-react';
// import { Toaster } from 'react-hot-toast';
// import * as Tone from 'tone';

// const AppLayout = () => {
//     const navigate = useNavigate();
//     const { userInfo } = useAuthStore();
//     const { addNotification, fetchNotifications, unreadCount } = useNotificationStore();

//     // Effect to manage the real-time notification connection
//     useEffect(() => {
//         if (!userInfo) return;

//         fetchNotifications();

//         const socket = io('https://localhost:5000', {
//             transports: ['websocket'],
//             rejectUnauthorized: false // Necessary for self-signed certs in dev
//         });

//         socket.on('connect', () => {
//             console.log('WebSocket connected:', socket.id);
//             socket.emit('join', userInfo._id);
//         });

//         socket.on('new_notification', (notification) => {
//             addNotification(notification);
            
//             // This will now work because the audio context will have been started
//             // by the user's first click.
//             if (Tone.context.state === 'running') {
//                 const synth = new Tone.Synth().toDestination();
//                 synth.triggerAttackRelease("C5", "8n");
//             }
//         });
        
//         socket.on('connect_error', (err) => {
//             console.error("WebSocket Connection Error:", err.message);
//         });

//         return () => {
//             socket.disconnect();
//         };
//     }, [userInfo, addNotification, fetchNotifications]);
    
//     // --- THIS IS THE FIX ---
//     // This effect runs once and sets up a one-time event listener to start the audio.
//     useEffect(() => {
//         const startAudio = async () => {
//             await Tone.start();
//             console.log('AudioContext started!');
//             // Once started, we can remove the listener.
//             document.body.removeEventListener('click', startAudio);
//         };

//         // Add the event listener to the entire page
//         document.body.addEventListener('click', startAudio);

//         // Cleanup function to remove the listener if the component unmounts
//         return () => {
//             document.body.removeEventListener('click', startAudio);
//         }
//     },[]);

//     const location = useLocation();
//     const isHomePage = location.pathname === '/dashboard';

//     return (
//         <div className="font-sans bg-gray-50 sm:bg-gray-200 sm:flex sm:items-center sm:justify-center min-h-screen">
//             <div className="w-full h-screen sm:max-w-sm sm:h-[750px] sm:rounded-2xl sm:shadow-lg flex flex-col mx-auto bg-gray-50 relative">
//                 <Toaster position="top-center" />
                
//                 {isHomePage && (
//                     <header className="flex items-center justify-between p-4 border-b flex-shrink-0 bg-white">
//                         <img src='/pynglLogoImage.png' alt="Pyngl Logo" style={{ height: '27px', width: '76px' }} />
//                         <button onClick={() => navigate('/notifications')} title="Notifications" className="relative p-1">
//                             <Bell className="w-6 h-6 text-gray-700" />
//                             {unreadCount > 0 && (
//                                 <span className="absolute top-0 right-0 flex h-3 w-3">
//                                     <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
//                                     <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
//                                 </span>
//                             )}
//                         </button>
//                     </header>
//                 )}

//                 <main className="flex-grow overflow-y-auto" style={{ paddingBottom: '75px' }}>
//                     <Outlet />
//                 </main>
                
//                 <BottomNav />
//             </div>
//         </div>
//     );
// };

// export default AppLayout;

// import React, { useEffect } from 'react';
// import { Outlet, useLocation, useNavigate } from 'react-router-dom';
// import BottomNav from "./BottomNav";
// import useAuthStore from '../../store/useAuthStore';
// import useNotificationStore from '../../store/useNotificationStore';
// import io from 'socket.io-client';
// import { Bell } from 'lucide-react';
// import { Toaster } from 'react-hot-toast';
// import * as Tone from 'tone';

// const AppLayout = () => {
//     const navigate = useNavigate();
//     const { userInfo } = useAuthStore();
//     const { addNotification, fetchNotifications, unreadCount } = useNotificationStore();

//     // This effect manages the real-time notification connection
//     useEffect(() => {
//         if (!userInfo) return;

//         fetchNotifications();

//         const socket = io('https://localhost:5000', {
//             transports: ['websocket'],
//             rejectUnauthorized: false // Necessary for self-signed certs in dev
//         });

//         socket.on('connect', () => {
//             console.log('WebSocket connected:', socket.id);
//             socket.emit('join', userInfo._id);
//         });

//         socket.on('new_notification', (notification) => {
//             addNotification(notification);
            
//             // This will now work because the audio context will have been started
//             // by the user's first click.
//             if (Tone.context.state === 'running') {
//                 const synth = new Tone.Synth().toDestination();
//                 synth.triggerAttackRelease("C5", "8n");
//             } else {
//                 // As a fallback, try to start it again, though it may not work without a gesture
//                 Tone.start().catch(e => console.warn("Could not start audio context for notification sound."));
//             }
//         });
        
//         socket.on('connect_error', (err) => {
//             console.error("WebSocket Connection Error:", err.message);
//         });

//         return () => {
//             socket.disconnect();
//         };
//     }, [userInfo, addNotification, fetchNotifications]);
    
//     // --- THIS IS THE FIX ---
//     // This effect runs once and sets up a one-time event listener to start the audio
//     // on the very first user interaction with the page.
//     useEffect(() => {
//         const startAudioContext = async () => {
//             await Tone.start();
//             console.log('AudioContext started successfully!');
//             // Once the audio is unlocked, we can remove the listener.
//             document.body.removeEventListener('click', startAudioContext);
//         };

//         // Add the event listener to the entire page
//         document.body.addEventListener('click', startAudioContext);

//         // Cleanup function to remove the listener if the component unmounts
//         return () => {
//             document.body.removeEventListener('click', startAudioContext);
//         }
//     },[]); // The empty dependency array ensures this runs only once on mount

//     const location = useLocation();
//     const isHomePage = location.pathname === '/dashboard';

//     return (
//         <div className="font-sans bg-gray-50 sm:bg-gray-200 sm:flex sm:items-center sm:justify-center min-h-screen">
//             <div className="w-full h-screen sm:max-w-sm sm:h-[750px] sm:rounded-2xl sm:shadow-lg flex flex-col mx-auto bg-gray-50 relative">
//                 <Toaster position="top-center" />
                
//                 {isHomePage && (
//                     <header className="flex items-center justify-between p-4 border-b flex-shrink-0 bg-white">
//                         <img src='/pynglLogoImage.png' alt="Pyngl Logo" style={{ height: '27px', width: '76px' }} />
//                         <button onClick={() => navigate('/notifications')} title="Notifications" className="relative p-1">
//                             <Bell className="w-6 h-6 text-gray-700" />
//                             {unreadCount > 0 && (
//                                 <span className="absolute top-0 right-0 flex h-3 w-3">
//                                     <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
//                                     <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
//                                 </span>
//                             )}
//                         </button>
//                     </header>
//                 )}

//                 <main className="flex-grow overflow-y-auto" style={{ paddingBottom: '75px' }}>
//                     <Outlet />
//                 </main>
                
//                 <BottomNav />
//             </div>
//         </div>
//     );
// };

// export default AppLayout;

// import React, { useEffect, useRef } from 'react';
// import { Outlet, useLocation, useNavigate } from 'react-router-dom';
// import BottomNav from "./BottomNav";
// import useAuthStore from '../../store/useAuthStore';
// import useNotificationStore from '../../store/useNotificationStore';
// import io from 'socket.io-client';
// import { Bell } from 'lucide-react';
// import { Toaster } from 'react-hot-toast';
// import { Howl } from 'howler'; // 1. Import Howl from howler

// const AppLayout = () => {
//     const navigate = useNavigate();
//     const { userInfo } = useAuthStore();
//     const { addNotification, fetchNotifications, unreadCount } = useNotificationStore();

//     // 2. Use a ref to store the sound instance so it's only created once
//     const notificationSound = useRef(null);

//     // This effect initializes the sound on the first load
//     useEffect(() => {
//         notificationSound.current = new Howl({
//             src: ['/notification.mp3'] // Points to the file in your /public folder
//         });
//     }, []);

//     // This effect manages the real-time notification connection
//     useEffect(() => {
//         if (!userInfo) return;

//         fetchNotifications();

//         const socket = io('https://localhost:5000', {
//             transports: ['websocket'],
//             rejectUnauthorized: false
//         });

//         socket.on('connect', () => {
//             socket.emit('join', userInfo._id);
//         });

//         socket.on('new_notification', (notification) => {
//             addNotification(notification);
            
//             // 3. Play the pre-loaded sound. Howler handles the audio context internally.
//             if (notificationSound.current) {
//                 notificationSound.current.play();
//             }
//         });
        
//         socket.on('connect_error', (err) => {
//             console.error("WebSocket Connection Error:", err.message);
//         });

//         return () => {
//             socket.disconnect();
//         };
//     }, [userInfo, addNotification, fetchNotifications]);

//     const location = useLocation();
//     const isHomePage = location.pathname === '/dashboard';

//     return (
//         <div className="font-sans bg-gray-50 sm:bg-gray-200 sm:flex sm:items-center sm:justify-center min-h-screen">
//             <div className="w-full h-screen sm:max-w-sm sm:h-[750px] sm:rounded-2xl sm:shadow-lg flex flex-col mx-auto bg-gray-50 relative">
//                 <Toaster position="top-center" />
                
//                 {isHomePage && (
//                     <header className="flex items-center justify-between p-4 border-b flex-shrink-0 bg-white">
//                         <img src='/pynglLogoImage.png' alt="Pyngl Logo" style={{ height: '27px', width: '76px' }} />
//                         <button onClick={() => navigate('/notifications')} title="Notifications" className="relative p-1">
//                             <Bell className="w-6 h-6 text-gray-700" />
//                             {unreadCount > 0 && (
//                                 <span className="absolute top-0 right-0 flex h-3 w-3">
//                                     <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
//                                     <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
//                                 </span>
//                             )}
//                         </button>
//                     </header>
//                 )}

//                 <main className="flex-grow overflow-y-auto" style={{ paddingBottom: '75px' }}>
//                     <Outlet />
//                 </main>
                
//                 <BottomNav />
//             </div>
//         </div>
//     );
// };

// export default AppLayout;

// import React, { useEffect } from 'react';
// import { Outlet, useLocation, useNavigate } from 'react-router-dom';
// import BottomNav from "./BottomNav";
// import useAuthStore from '../../store/useAuthStore';
// import useNotificationStore from '../../store/useNotificationStore';
// import io from 'socket.io-client';
// import { Bell } from 'lucide-react';
// import { Toaster } from 'react-hot-toast';
// import * as Tone from 'tone';

// const AppLayout = () => {
//     const navigate = useNavigate();
//     const { userInfo } = useAuthStore();
//     const { addNotification, fetchNotifications, unreadCount } = useNotificationStore();

//     // Effect to manage the real-time notification connection
//     useEffect(() => {
//         if (!userInfo) return;

//         fetchNotifications();

//         const socket = io('https://localhost:5000', {
//             transports: ['websocket'],
//             rejectUnauthorized: false // Necessary for self-signed certs in dev
//         });

//         socket.on('connect', () => {
//             console.log('WebSocket connected:', socket.id);
//             socket.emit('join', userInfo._id);
//         });

//         socket.on('new_notification', (notification) => {
//             addNotification(notification);
            
//             // This will now work because the audio context will have been started
//             // by the user's first click.
//             if (Tone.context.state === 'running') {
//                 const synth = new Tone.Synth().toDestination();
//                 synth.triggerAttackRelease("C5", "8n");
//             }
//         });
        
//         socket.on('connect_error', (err) => {
//             console.error("WebSocket Connection Error:", err.message);
//         });

//         return () => {
//             socket.disconnect();
//         };
//     }, [userInfo, addNotification, fetchNotifications]);
    
//     // This effect runs once and sets up a one-time event listener to start the audio.
//     useEffect(() => {
//         const startAudio = async () => {
//             await Tone.start();
//             console.log('AudioContext started!');
//             // Once started, we can remove the listener.
//             document.body.removeEventListener('click', startAudio);
//         };

//         // Add the event listener to the entire page
//         document.body.addEventListener('click', startAudio);

//         // Cleanup function to remove the listener if the component unmounts
//         return () => {
//             document.body.removeEventListener('click', startAudio);
//         }
//     },[]);

//     const location = useLocation();
//     const isHomePage = location.pathname === '/dashboard';

//     return (
//         <div className="font-sans bg-gray-50 sm:bg-gray-200 sm:flex sm:items-center sm:justify-center min-h-screen">
//             <div className="w-full h-screen sm:max-w-sm sm:h-[750px] sm:rounded-2xl sm:shadow-lg flex flex-col mx-auto bg-gray-50 relative">
//                 <Toaster position="top-center" />
                
//                 {isHomePage && (
//                     <header className="flex items-center justify-between p-4 border-b flex-shrink-0 bg-white">
//                         <img src='/pynglLogoImage.png' alt="Pyngl Logo" style={{ height: '27px', width: '76px' }} />
//                         <button onClick={() => navigate('/notifications')} title="Notifications" className="relative p-1">
//                             <Bell className="w-6 h-6 text-gray-700" />
//                             {unreadCount > 0 && (
//                                 <span className="absolute top-0 right-0 flex h-3 w-3">
//                                     <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
//                                     <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
//                                 </span>
//                             )}
//                         </button>
//                     </header>
//                 )}

//                 <main className="flex-grow overflow-y-auto" style={{ paddingBottom: '75px' }}>
//                     <Outlet />
//                 </main>
                
//                 <BottomNav />
//             </div>
//         </div>
//     );
// };

// export default AppLayout;

// import React, { useEffect } from 'react';
// import { Outlet, useLocation, useNavigate } from 'react-router-dom';
// import BottomNav from "./BottomNav";
// import useAuthStore from '../../store/useAuthStore';
// import useNotificationStore from '../../store/useNotificationStore';
// import io from 'socket.io-client';
// import { Bell } from 'lucide-react';
// import { Toaster } from 'react-hot-toast';
// import * as Tone from 'tone';

// const AppLayout = () => {
//     const navigate = useNavigate();
//     const { userInfo } = useAuthStore();
//     const { addNotification, fetchNotifications, unreadCount } = useNotificationStore();

//     // Effect to manage the real-time notification connection
//     useEffect(() => {
//         if (!userInfo) return;

//         fetchNotifications();

//         // --- THIS IS THE FIX for the connection error ---
//         // 1. Connect to your secure HTTPS WebSocket server
//         const socket = io('https://localhost:5000', { 
//             transports: ['websocket'],
//             // 2. This is crucial for development. It tells the client to trust
//             //    your self-signed SSL certificate.
//             rejectUnauthorized: false 
//         });

//         socket.on('connect', () => {
//             console.log('Secure WebSocket connected:', socket.id);
//             socket.emit('join', userInfo._id);
//         });

//         socket.on('new_notification', (notification) => {
//             addNotification(notification);
            
//             // This will now work because the audio context is started by the user's first click.
//             if (Tone.context.state === 'running') {
//                 const synth = new Tone.Synth().toDestination();
//                 synth.triggerAttackRelease("C5", "8n");
//             }
//         });
        
//         socket.on('connect_error', (err) => {
//             console.error("WebSocket Connection Error:", err.message);
//         });

//         return () => {
//             socket.disconnect();
//         };
//     }, [userInfo, addNotification, fetchNotifications]);
    
//     // --- THIS IS THE FIX for the audio error ---
//     // This effect runs once and sets up a one-time event listener to start the audio
//     // on the very first user interaction with the page.
//     useEffect(() => {
//         const startAudio = async () => {
//             await Tone.start();
//             console.log('AudioContext started!');
//             document.body.removeEventListener('click', startAudio);
//         };
//         document.body.addEventListener('click', startAudio);
//         return () => {
//             document.body.removeEventListener('click', startAudio);
//         }
//     },[]);

//     const location = useLocation();
//     const isHomePage = location.pathname === '/dashboard';

//     return (
//         <div className="font-sans bg-gray-50 sm:bg-gray-200 sm:flex sm:items-center sm:justify-center min-h-screen">
//             <div className="w-full h-screen sm:max-w-sm sm:h-[750px] sm:rounded-2xl sm:shadow-lg flex flex-col mx-auto bg-gray-50 relative">
//                 <Toaster position="top-center" />
                
//                 {isHomePage && (
//                     <header className="flex items-center justify-between p-4 border-b flex-shrink-0 bg-white">
//                         <img src='/pynglLogoImage.png' alt="Pyngl Logo" style={{ height: '27px', width: '76px' }} />
//                         <button onClick={() => navigate('/notifications')} title="Notifications" className="relative p-1">
//                             <Bell className="w-6 h-6 text-gray-700" />
//                             {unreadCount > 0 && (
//                                 <span className="absolute top-0 right-0 flex h-3 w-3">
//                                     <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
//                                     <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
//                                 </span>
//                             )}
//                         </button>
//                     </header>
//                 )}

//                 <main className="flex-grow overflow-y-auto" style={{ paddingBottom: '75px' }}>
//                     <Outlet />
//                 </main>
                
//                 <BottomNav />
//             </div>
//         </div>
//     );
// };

// export default AppLayout;

// import React, { useEffect, useRef } from 'react';
// import { Outlet, useLocation, useNavigate } from 'react-router-dom';
// import BottomNav from "./BottomNav";
// import useAuthStore from '../../store/useAuthStore';
// import useNotificationStore from '../../store/useNotificationStore';
// import io from 'socket.io-client';
// import { Bell } from 'lucide-react';
// import { Toaster } from 'react-hot-toast';
// import { Howl } from 'howler'; // 1. Import Howl from the new library

// const AppLayout = () => {
//     const navigate = useNavigate();
//     const { userInfo } = useAuthStore();
//     const { addNotification, fetchNotifications, unreadCount } = useNotificationStore();

//     // 2. Use a ref to store the sound instance so it's only created once.
//     const notificationSound = useRef(null);

//     // This effect initializes the sound when the component first loads.
//     useEffect(() => {
//         notificationSound.current = new Howl({
//             src: ['/notification.wav'], // Points to the new file in your /public folder
//             volume: 0.9,
//         });
//     }, []);

//     // This effect manages the real-time notification connection.
//     useEffect(() => {
//         if (!userInfo) return;

//         fetchNotifications();

//         const socket = io('https://localhost:5000', {
//             transports: ['websocket'],
//             rejectUnauthorized: false
//         });

//         socket.on('connect', () => {
//             console.log('WebSocket connected:', socket.id);
//             socket.emit('join', userInfo._id);
//         });

//         socket.on('new_notification', (notification) => {
//             addNotification(notification);
            
//             // 3. Play the pre-loaded sound. Howler handles unlocking the audio context
//             //    on the first user interaction automatically.
//             if (notificationSound.current) {
//                 notificationSound.current.play();
//             }
//         });
        
//         socket.on('connect_error', (err) => {
//             console.error("WebSocket Connection Error:", err.message);
//         });

//         return () => {
//             socket.disconnect();
//         };
//     }, [userInfo, addNotification, fetchNotifications]);
    
//     const location = useLocation();
//     const isHomePage = location.pathname === '/dashboard';

//     return (
//         <div className="font-sans bg-gray-50 sm:bg-gray-200 sm:flex sm:items-center sm:justify-center min-h-screen">
//             <div className="w-full h-screen sm:max-w-sm sm:h-[750px] sm:rounded-2xl sm:shadow-lg flex flex-col mx-auto bg-gray-50 relative">
//                 <Toaster position="top-center" />
                
//                 {isHomePage && (
//                     <header className="flex items-center justify-between p-4 border-b flex-shrink-0 bg-white">
//                         <img src='/pynglLogoImage.png' alt="Pyngl Logo" style={{ height: '27px', width: '76px' }} />
//                         <button onClick={() => navigate('/notifications')} title="Notifications" className="relative p-1">
//                             <Bell className="w-6 h-6 text-gray-700" />
//                             {unreadCount > 0 && (
//                                 <span className="absolute top-0 right-0 flex h-3 w-3">
//                                     <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
//                                     <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
//                                 </span>
//                             )}
//                         </button>
//                     </header>
//                 )}

//                 <main className="flex-grow overflow-y-auto" style={{ paddingBottom: '75px' }}>
//                     <Outlet />
//                 </main>
                
//                 <BottomNav />
//             </div>
//         </div>
//     );
// };

// export default AppLayout;


import React, { useEffect, useRef } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import BottomNav from "./BottomNav";
import useAuthStore from '../../store/useAuthStore';
import useNotificationStore from '../../store/useNotificationStore';
import io from 'socket.io-client';
import { Bell } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import { Howl, Howler } from 'howler';

const AppLayout = () => {
    const navigate = useNavigate();
    const { userInfo } = useAuthStore();
    const { addNotification, fetchNotifications, unreadCount } = useNotificationStore();
    const notificationSound = useRef(null);

    // This effect initializes the sound when the component first loads.
    useEffect(() => {
        notificationSound.current = new Howl({
            src: ['/notification.mp3'], // Points to the sound file in your /public folder
            volume: 0.6,
        });
    }, []);

    // This effect manages the real-time notification connection.
    useEffect(() => {
        if (!userInfo) return;

        fetchNotifications();

        const socket = io('https://192.168.1.17:5000', {
            transports: ['websocket'],
            rejectUnauthorized: false
        });

        socket.on('connect', () => {
            console.log('WebSocket connected:', socket.id);
            socket.emit('join', userInfo._id);
        });

        socket.on('new_notification', (notification) => {
            addNotification(notification);
            
            // This will now work reliably because the audio context
            // will have been unlocked by the user's first click.
            if (notificationSound.current) {
                notificationSound.current.play();
            }
        });
        
        socket.on('connect_error', (err) => {
            console.error("WebSocket Connection Error:", err.message);
        });

        return () => {
            socket.disconnect();
        };
    }, [userInfo, addNotification, fetchNotifications]);
    
    // This effect runs once and sets up a one-time event listener to unlock the audio
    // on the very first user interaction with the page.
    useEffect(() => {
        const unlockAudio = () => {
            if (Howler.ctx && Howler.ctx.state === 'suspended') {
                Howler.ctx.resume();
            }
            document.body.removeEventListener('click', unlockAudio);
            document.body.removeEventListener('touchstart', unlockAudio);
        };
        
        document.body.addEventListener('click', unlockAudio);
        document.body.addEventListener('touchstart', unlockAudio);

        return () => {
            document.body.removeEventListener('click', unlockAudio);
            document.body.removeEventListener('touchstart', unlockAudio);
        }
    },[]);

    const location = useLocation();
    const isHomePage = location.pathname === '/dashboard';

    return (
        <div className="font-sans bg-gray-50 sm:bg-gray-200 sm:flex sm:items-center sm:justify-center min-h-screen">
            <div className="w-full h-screen sm:max-w-sm sm:h-[750px] sm:rounded-2xl sm:shadow-lg flex flex-col mx-auto bg-gray-50 relative">
                <Toaster position="top-center" />
                
                {isHomePage && (
                    <header className="flex items-center justify-between p-4 border-b flex-shrink-0 bg-white">
                        <img src='/pynglLogoImage.png' alt="Pyngl Logo" style={{ height: '27px', width: '76px' }} />
                        <button onClick={() => navigate('/notifications')} title="Notifications" className="relative p-1">
                            <Bell className="w-6 h-6 text-gray-700" />
                            {unreadCount > 0 && (
                                <span className="absolute top-0 right-0 flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
                                </span>
                            )}
                        </button>
                    </header>
                )}

                <main className="flex-grow overflow-y-auto" style={{ paddingBottom: '75px' }}>
                    <Outlet />
                </main>
                
                <BottomNav />
            </div>
        </div>
    );
};

export default AppLayout;

