// // // // // // import React from 'react';
// // // // // // import { Outlet, useLocation, useNavigate } from 'react-router-dom';
// // // // // // import BottomNav from "./BottomNav";
// // // // // // import useAuthStore from '../../store/useAuthStore';
// // // // // // import { LogOut, Bell } from 'lucide-react';

// // // // // // // --- The Main AppLayout Component ---
// // // // // // const AppLayout = () => {
// // // // // //     const location = useLocation();
// // // // // //     const navigate = useNavigate();
// // // // // //     const { userInfo, logout } = useAuthStore();

// // // // // //     // Define which pages should show a header from this layout
// // // // // //     const isHomePage = location.pathname === '/dashboard';
// // // // // //     const isCreatePage = location.pathname === '/create-text-poll' || location.pathname === '/create-image-poll';
// // // // // //     const isPreviewPage = location.pathname.startsWith('/preview');

// // // // // //     // This condition determines if ANY AppLayout header should be shown
// // // // // //     const showAppLayoutHeader = isHomePage || isCreatePage || isPreviewPage;

// // // // // //     const getHeaderTitle = () => {
// // // // // //         if (location.pathname === '/create-text-poll') return 'Text to poll';
// // // // // //         if (location.pathname === '/create-image-poll') return 'Image to poll';
// // // // // //         if (isPreviewPage) return 'Preview';
// // // // // //         return '';
// // // // // //     };

// // // // // //     return (
// // // // // //         <div className="font-sans bg-gray-50 sm:bg-gray-200 sm:flex sm:items-center sm:justify-center min-h-screen">
// // // // // //             <div className="w-full h-screen sm:max-w-sm sm:h-[750px] sm:rounded-2xl sm:shadow-lg flex flex-col mx-auto bg-gray-50 relative">
                
// // // // // //                 {/* --- THIS IS THE FIX --- */}
// // // // // //                 {/* The entire header is now conditional. It will NOT render on /trending, /analytics, etc. */}
// // // // // //                 {showAppLayoutHeader && (
// // // // // //                     <header className="flex items-center justify-between p-4 border-b flex-shrink-0 bg-white">
// // // // // //                         {/* Homepage Header */}
// // // // // //                         {isHomePage && (
// // // // // //                             <>
// // // // // //                                 <h1 className="text-lg font-bold">
// // // // // //                                     <img src='/pynglLogoImage.png' alt="Pyngl Logo" style={{ height: '27px', width: '76px' }} />
// // // // // //                                 </h1>
// // // // // //                                 <div className="flex items-center">
// // // // // //                                     <button title="Notifications" className="text-gray-600 p-1">
// // // // // //                                         <Bell className="w-6 h-6 text-gray-700" />
// // // // // //                                     </button>
// // // // // //                                 </div>
// // // // // //                             </>
// // // // // //                         )}
// // // // // //                         {/* Other Pages Header (Create/Preview) */}
// // // // // //                         {(isCreatePage || isPreviewPage) && (
// // // // // //                              <>
// // // // // //                                  <button onClick={() => navigate(-1)} className="text-gray-600 text-lg p-2">←</button>
// // // // // //                                  <h1 className="flex-1 text-center font-semibold">{getHeaderTitle()}</h1>
// // // // // //                                  <div className="w-10"></div> {/* Placeholder for alignment */}
// // // // // //                              </>
// // // // // //                         )}
// // // // // //                     </header>
// // // // // //                 )}

// // // // // //                 <main className="flex-grow overflow-y-auto" style={{ paddingBottom: '75px' }}>
// // // // // //                     <Outlet />
// // // // // //                 </main>
                
// // // // // //                 <BottomNav />
// // // // // //             </div>
// // // // // //         </div>
// // // // // //     );
// // // // // // };

// // // // // // export default AppLayout;
// // // // // import React from 'react';
// // // // // import { Outlet, useLocation, useNavigate } from 'react-router-dom';
// // // // // import BottomNav from "./BottomNav";
// // // // // import useAuthStore from '../../store/useAuthStore';

// // // // // import { Bell } from 'lucide-react';
// // // // // import { Toaster } from 'react-hot-toast';

// // // // // const AppLayout = () => {
// // // // //     const location = useLocation();
// // // // //     const navigate = useNavigate();
// // // // //     const { userInfo, logout } = useAuthStore();

// // // // //     const isHomePage = location.pathname === '/dashboard';
// // // // //     const isCreatePage = location.pathname === '/create-text-poll' || location.pathname === '/create-image-poll';
// // // // //     const isPreviewPage = location.pathname.startsWith('/preview');
// // // // //     const showAppLayoutHeader = isHomePage || isCreatePage || isPreviewPage;

// // // // //     const getHeaderTitle = () => {
// // // // //         if (location.pathname === '/create-text-poll') return 'Text to poll';
// // // // //         if (location.pathname === '/create-image-poll') return 'Image to poll';
// // // // //         if (isPreviewPage) return 'Preview';
// // // // //         return '';
// // // // //     };

// // // // //     return (
// // // // //         <div className="font-sans bg-gray-50 sm:bg-gray-200 sm:flex sm:items-center sm:justify-center min-h-screen">
// // // // //             <div className="w-full h-screen sm:max-w-sm sm:h-[750px] sm:rounded-2xl sm:shadow-lg flex flex-col mx-auto bg-gray-50 relative">
                
// // // // //                 <Toaster
// // // // //                     position="top-center"
// // // // //                     reverseOrder={false}
// // // // //                     toastOptions={{
// // // // //                         duration: 4000,
// // // // //                         style: {
// // // // //                             background: '#333',
// // // // //                             color: '#fff',
// // // // //                             borderRadius: '9999px',
// // // // //                             fontSize: '15px'
// // // // //                         },
// // // // //                         error: {
// // // // //                             style: {
// // // // //                                 background: '#FFF1F2',
// // // // //                                 color: '#DC2626',
// // // // //                                 border: `1px solid #FCA5A5`,
// // // // //                             },
// // // // //                         },
// // // // //                     }}
// // // // //                 />
                
// // // // //                 {showAppLayoutHeader && (
// // // // //                     <header className="flex items-center justify-between p-4 border-b flex-shrink-0 bg-white">
// // // // //                         {isHomePage && (
// // // // //                             <>
// // // // //                                 <h1 className="text-lg font-bold">
// // // // //                                     <img src='/pynglLogoImage.png' alt="Pyngl Logo" style={{ height: '27px', width: '76px' }} />
// // // // //                                 </h1>
// // // // //                                 <div className="flex items-center">
// // // // //                                     <button title="Notifications" className="text-gray-600 p-1">
// // // // //                                         <Bell className="w-6 h-6 text-gray-700" />
// // // // //                                     </button>
// // // // //                                 </div>
// // // // //                             </>
// // // // //                         )}
// // // // //                         {(isCreatePage || isPreviewPage) && (
// // // // //                              <>
// // // // //                                  <button onClick={() => navigate(-1)} className="text-gray-600 text-lg p-2">←</button>
// // // // //                                  <h1 className="flex-1 text-center font-semibold">{getHeaderTitle()}</h1>
// // // // //                                  <div className="w-10"></div>
// // // // //                              </>
// // // // //                         )}
// // // // //                     </header>
// // // // //                 )}

// // // // //                 <main className="flex-grow overflow-y-auto" style={{ paddingBottom: '75px' }}>
// // // // //                     <Outlet />
// // // // //                 </main>
                
// // // // //                 <BottomNav />
// // // // //             </div>
// // // // //         </div>
// // // // //     );
// // // // // };

// // // // // export default AppLayout;

// // // // // import React, { useEffect } from 'react';
// // // // // import { Outlet, useLocation, useNavigate } from 'react-router-dom';
// // // // // import BottomNav from "./BottomNav";
// // // // // import useAuthStore from '../../store/useAuthStore';
// // // // // import useNotificationStore from '../../store/useNotificationStore';
// // // // // import io from 'socket.io-client';
// // // // // import { Bell } from 'lucide-react';
// // // // // import { Toaster } from 'react-hot-toast';
// // // // // import * as Tone from 'tone'; // Corrected import for Tone.js

// // // // // const AppLayout = () => {
// // // // //     const navigate = useNavigate();
// // // // //     const { userInfo } = useAuthStore();
// // // // //     const { addNotification, fetchNotifications, unreadCount } = useNotificationStore();

// // // // //     // Effect to manage the real-time notification connection
// // // // //     useEffect(() => {
// // // // //         if (!userInfo) return;

// // // // //         fetchNotifications();

// // // // //         const socket = io('https://localhost:5000', {
// // // // //             transports: ['websocket']
// // // // //         });

// // // // //         socket.on('connect', () => {
// // // // //             socket.emit('join', userInfo._id);
// // // // //         });

// // // // //         socket.on('new_notification', (notification) => {
// // // // //             addNotification(notification);
            
// // // // //             // Play a sound effect
// // // // //             // Ensure Tone.js is started by user interaction if required by the browser
// // // // //             Tone.start().then(() => {
// // // // //                 const synth = new Tone.Synth().toDestination();
// // // // //                 synth.triggerAttackRelease("C5", "8n");
// // // // //             });
// // // // //         });

// // // // //         return () => {
// // // // //             socket.disconnect();
// // // // //         };
// // // // //     }, [userInfo, addNotification, fetchNotifications]);

// // // // //     const location = useLocation();
// // // // //     const isHomePage = location.pathname === '/dashboard';

// // // // //     return (
// // // // //         <div className="font-sans bg-gray-50 sm:bg-gray-200 sm:flex sm:items-center sm:justify-center min-h-screen">
// // // // //             <div className="w-full h-screen sm:max-w-sm sm:h-[750px] sm:rounded-2xl sm:shadow-lg flex flex-col mx-auto bg-gray-50 relative">
// // // // //                 <Toaster position="top-center" />
                
// // // // //                 {isHomePage && (
// // // // //                     <header className="flex items-center justify-between p-4 border-b flex-shrink-0 bg-white">
// // // // //                         <img src='/pynglLogoImage.png' alt="Pyngl Logo" style={{ height: '27px', width: '76px' }} />
// // // // //                         <button onClick={() => navigate('/notifications')} title="Notifications" className="relative p-1">
// // // // //                             <Bell className="w-6 h-6 text-gray-700" />
// // // // //                             {unreadCount > 0 && (
// // // // //                                 <span className="absolute top-0 right-0 flex h-3 w-3">
// // // // //                                     <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
// // // // //                                     <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
// // // // //                                 </span>
// // // // //                             )}
// // // // //                         </button>
// // // // //                     </header>
// // // // //                 )}

// // // // //                 <main className="flex-grow overflow-y-auto" style={{ paddingBottom: '75px' }}>
// // // // //                     <Outlet />
// // // // //                 </main>
                
// // // // //                 <BottomNav />
// // // // //             </div>
// // // // //         </div>
// // // // //     );
// // // // // };

// // // // // export default AppLayout;

// // // // // import React, { useEffect } from 'react';
// // // // // import { Outlet, useLocation, useNavigate } from 'react-router-dom';
// // // // // import BottomNav from "./BottomNav";
// // // // // import useAuthStore from '../../store/useAuthStore';
// // // // // import useNotificationStore from '../../store/useNotificationStore';
// // // // // import io from 'socket.io-client';
// // // // // import { Bell } from 'lucide-react';
// // // // // import { Toaster } from 'react-hot-toast';
// // // // // import * as Tone from 'tone';

// // // // // const AppLayout = () => {
// // // // //     const navigate = useNavigate();
// // // // //     const { userInfo } = useAuthStore();
// // // // //     const { addNotification, fetchNotifications, unreadCount } = useNotificationStore();

// // // // //     // Effect to manage the real-time notification connection
// // // // //     useEffect(() => {
// // // // //         if (!userInfo) return;

// // // // //         fetchNotifications();

// // // // //         // 1. Connect to your secure HTTPS WebSocket server
// // // // //         const socket = io('https://localhost:5000'||'https://192.168.1.12:5000', { 
// // // // //             transports: ['websocket'],
// // // // //             // 2. This is crucial for development with self-signed certificates.
// // // // //             //    It tells the client to trust your local certificate.
// // // // //             rejectUnauthorized: false 
// // // // //         });

// // // // //         socket.on('connect', () => {
// // // // //             console.log('Secure WebSocket connected:', socket.id);
// // // // //             socket.emit('join', userInfo._id);
// // // // //         });

// // // // //         socket.on('new_notification', (notification) => {
// // // // //             addNotification(notification);
            
// // // // //             // Play a sound effect, ensuring the audio context is ready
// // // // //             Tone.start().then(() => {
// // // // //                 const synth = new Tone.Synth().toDestination();
// // // // //                 synth.triggerAttackRelease("C5", "8n");
// // // // //             }).catch(e => console.warn("Tone.js AudioContext not ready yet.", e));
// // // // //         });
        
// // // // //         socket.on('connect_error', (err) => {
// // // // //             console.error("WebSocket Connection Error:", err.message);
// // // // //         });

// // // // //         return () => {
// // // // //             socket.disconnect();
// // // // //         };
// // // // //     }, [userInfo, addNotification, fetchNotifications]);
    
// // // // //     // This effect handles starting the audio context on the first user interaction anywhere on the page
// // // // //     useEffect(() => {
// // // // //         const startAudio = () => {
// // // // //             Tone.start();
// // // // //             document.body.removeEventListener('click', startAudio);
// // // // //         };
// // // // //         document.body.addEventListener('click', startAudio);
// // // // //         return () => {
// // // // //             document.body.removeEventListener('click', startAudio);
// // // // //         }
// // // // //     },[]);

// // // // //     const location = useLocation();
// // // // //     const isHomePage = location.pathname === '/dashboard';

// // // // //     return (
// // // // //         <div className="font-sans bg-gray-50 sm:bg-gray-200 sm:flex sm:items-center sm:justify-center min-h-screen">
// // // // //             <div className="w-full h-screen sm:max-w-sm sm:h-[750px] sm:rounded-2xl sm:shadow-lg flex flex-col mx-auto bg-gray-50 relative">
// // // // //                 <Toaster position="top-center" />
                
// // // // //                 {isHomePage && (
// // // // //                     <header className="flex items-center justify-between p-4 border-b flex-shrink-0 bg-white">
// // // // //                         <img src='/pynglLogoImage.png' alt="Pyngl Logo" style={{ height: '27px', width: '76px' }} />
// // // // //                         <button onClick={() => navigate('/notifications')} title="Notifications" className="relative p-1">
// // // // //                             <Bell className="w-6 h-6 text-gray-700" />
// // // // //                             {unreadCount > 0 && (
// // // // //                                 <span className="absolute top-0 right-0 flex h-3 w-3">
// // // // //                                     <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
// // // // //                                     <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
// // // // //                                 </span>
// // // // //                             )}
// // // // //                         </button>
// // // // //                     </header>
// // // // //                 )}

// // // // //                 <main className="flex-grow overflow-y-auto" style={{ paddingBottom: '75px' }}>
// // // // //                     <Outlet />
// // // // //                 </main>
                
// // // // //                 <BottomNav />
// // // // //             </div>
// // // // //         </div>
// // // // //     );
// // // // // };

// // // // // export default AppLayout;


// // // // // import React, { useEffect } from 'react';
// // // // // import { Outlet, useLocation, useNavigate } from 'react-router-dom';
// // // // // import BottomNav from "./BottomNav";
// // // // // import useAuthStore from '../../store/useAuthStore';
// // // // // import useNotificationStore from '../../store/useNotificationStore';
// // // // // import io from 'socket.io-client';
// // // // // import { Bell } from 'lucide-react';
// // // // // import { Toaster } from 'react-hot-toast';
// // // // // import * as Tone from 'tone';

// // // // // const AppLayout = () => {
// // // // //     const navigate = useNavigate();
// // // // //     const { userInfo } = useAuthStore();
// // // // //     const { addNotification, fetchNotifications, unreadCount } = useNotificationStore();

// // // // //     // Effect to manage the real-time notification connection
// // // // //     useEffect(() => {
// // // // //         if (!userInfo) return;

// // // // //         fetchNotifications();

// // // // //         const socket = io('https://localhost:5000', {
// // // // //             transports: ['websocket'],
// // // // //             rejectUnauthorized: false // Necessary for self-signed certs in dev
// // // // //         });

// // // // //         socket.on('connect', () => {
// // // // //             console.log('WebSocket connected:', socket.id);
// // // // //             socket.emit('join', userInfo._id);
// // // // //         });

// // // // //         socket.on('new_notification', (notification) => {
// // // // //             addNotification(notification);
            
// // // // //             // This will now work because the audio context will have been started
// // // // //             // by the user's first click.
// // // // //             if (Tone.context.state === 'running') {
// // // // //                 const synth = new Tone.Synth().toDestination();
// // // // //                 synth.triggerAttackRelease("C5", "8n");
// // // // //             }
// // // // //         });
        
// // // // //         socket.on('connect_error', (err) => {
// // // // //             console.error("WebSocket Connection Error:", err.message);
// // // // //         });

// // // // //         return () => {
// // // // //             socket.disconnect();
// // // // //         };
// // // // //     }, [userInfo, addNotification, fetchNotifications]);
    
// // // // //     // --- THIS IS THE FIX ---
// // // // //     // This effect runs once and sets up a one-time event listener to start the audio.
// // // // //     useEffect(() => {
// // // // //         const startAudio = async () => {
// // // // //             await Tone.start();
// // // // //             console.log('AudioContext started!');
// // // // //             // Once started, we can remove the listener.
// // // // //             document.body.removeEventListener('click', startAudio);
// // // // //         };

// // // // //         // Add the event listener to the entire page
// // // // //         document.body.addEventListener('click', startAudio);

// // // // //         // Cleanup function to remove the listener if the component unmounts
// // // // //         return () => {
// // // // //             document.body.removeEventListener('click', startAudio);
// // // // //         }
// // // // //     },[]);

// // // // //     const location = useLocation();
// // // // //     const isHomePage = location.pathname === '/dashboard';

// // // // //     return (
// // // // //         <div className="font-sans bg-gray-50 sm:bg-gray-200 sm:flex sm:items-center sm:justify-center min-h-screen">
// // // // //             <div className="w-full h-screen sm:max-w-sm sm:h-[750px] sm:rounded-2xl sm:shadow-lg flex flex-col mx-auto bg-gray-50 relative">
// // // // //                 <Toaster position="top-center" />
                
// // // // //                 {isHomePage && (
// // // // //                     <header className="flex items-center justify-between p-4 border-b flex-shrink-0 bg-white">
// // // // //                         <img src='/pynglLogoImage.png' alt="Pyngl Logo" style={{ height: '27px', width: '76px' }} />
// // // // //                         <button onClick={() => navigate('/notifications')} title="Notifications" className="relative p-1">
// // // // //                             <Bell className="w-6 h-6 text-gray-700" />
// // // // //                             {unreadCount > 0 && (
// // // // //                                 <span className="absolute top-0 right-0 flex h-3 w-3">
// // // // //                                     <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
// // // // //                                     <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
// // // // //                                 </span>
// // // // //                             )}
// // // // //                         </button>
// // // // //                     </header>
// // // // //                 )}

// // // // //                 <main className="flex-grow overflow-y-auto" style={{ paddingBottom: '75px' }}>
// // // // //                     <Outlet />
// // // // //                 </main>
                
// // // // //                 <BottomNav />
// // // // //             </div>
// // // // //         </div>
// // // // //     );
// // // // // };

// // // // // export default AppLayout;

// // // // // import React, { useEffect } from 'react';
// // // // // import { Outlet, useLocation, useNavigate } from 'react-router-dom';
// // // // // import BottomNav from "./BottomNav";
// // // // // import useAuthStore from '../../store/useAuthStore';
// // // // // import useNotificationStore from '../../store/useNotificationStore';
// // // // // import io from 'socket.io-client';
// // // // // import { Bell } from 'lucide-react';
// // // // // import { Toaster } from 'react-hot-toast';
// // // // // import * as Tone from 'tone';

// // // // // const AppLayout = () => {
// // // // //     const navigate = useNavigate();
// // // // //     const { userInfo } = useAuthStore();
// // // // //     const { addNotification, fetchNotifications, unreadCount } = useNotificationStore();

// // // // //     // This effect manages the real-time notification connection
// // // // //     useEffect(() => {
// // // // //         if (!userInfo) return;

// // // // //         fetchNotifications();

// // // // //         const socket = io('https://localhost:5000', {
// // // // //             transports: ['websocket'],
// // // // //             rejectUnauthorized: false // Necessary for self-signed certs in dev
// // // // //         });

// // // // //         socket.on('connect', () => {
// // // // //             console.log('WebSocket connected:', socket.id);
// // // // //             socket.emit('join', userInfo._id);
// // // // //         });

// // // // //         socket.on('new_notification', (notification) => {
// // // // //             addNotification(notification);
            
// // // // //             // This will now work because the audio context will have been started
// // // // //             // by the user's first click.
// // // // //             if (Tone.context.state === 'running') {
// // // // //                 const synth = new Tone.Synth().toDestination();
// // // // //                 synth.triggerAttackRelease("C5", "8n");
// // // // //             } else {
// // // // //                 // As a fallback, try to start it again, though it may not work without a gesture
// // // // //                 Tone.start().catch(e => console.warn("Could not start audio context for notification sound."));
// // // // //             }
// // // // //         });
        
// // // // //         socket.on('connect_error', (err) => {
// // // // //             console.error("WebSocket Connection Error:", err.message);
// // // // //         });

// // // // //         return () => {
// // // // //             socket.disconnect();
// // // // //         };
// // // // //     }, [userInfo, addNotification, fetchNotifications]);
    
// // // // //     // --- THIS IS THE FIX ---
// // // // //     // This effect runs once and sets up a one-time event listener to start the audio
// // // // //     // on the very first user interaction with the page.
// // // // //     useEffect(() => {
// // // // //         const startAudioContext = async () => {
// // // // //             await Tone.start();
// // // // //             console.log('AudioContext started successfully!');
// // // // //             // Once the audio is unlocked, we can remove the listener.
// // // // //             document.body.removeEventListener('click', startAudioContext);
// // // // //         };

// // // // //         // Add the event listener to the entire page
// // // // //         document.body.addEventListener('click', startAudioContext);

// // // // //         // Cleanup function to remove the listener if the component unmounts
// // // // //         return () => {
// // // // //             document.body.removeEventListener('click', startAudioContext);
// // // // //         }
// // // // //     },[]); // The empty dependency array ensures this runs only once on mount

// // // // //     const location = useLocation();
// // // // //     const isHomePage = location.pathname === '/dashboard';

// // // // //     return (
// // // // //         <div className="font-sans bg-gray-50 sm:bg-gray-200 sm:flex sm:items-center sm:justify-center min-h-screen">
// // // // //             <div className="w-full h-screen sm:max-w-sm sm:h-[750px] sm:rounded-2xl sm:shadow-lg flex flex-col mx-auto bg-gray-50 relative">
// // // // //                 <Toaster position="top-center" />
                
// // // // //                 {isHomePage && (
// // // // //                     <header className="flex items-center justify-between p-4 border-b flex-shrink-0 bg-white">
// // // // //                         <img src='/pynglLogoImage.png' alt="Pyngl Logo" style={{ height: '27px', width: '76px' }} />
// // // // //                         <button onClick={() => navigate('/notifications')} title="Notifications" className="relative p-1">
// // // // //                             <Bell className="w-6 h-6 text-gray-700" />
// // // // //                             {unreadCount > 0 && (
// // // // //                                 <span className="absolute top-0 right-0 flex h-3 w-3">
// // // // //                                     <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
// // // // //                                     <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
// // // // //                                 </span>
// // // // //                             )}
// // // // //                         </button>
// // // // //                     </header>
// // // // //                 )}

// // // // //                 <main className="flex-grow overflow-y-auto" style={{ paddingBottom: '75px' }}>
// // // // //                     <Outlet />
// // // // //                 </main>
                
// // // // //                 <BottomNav />
// // // // //             </div>
// // // // //         </div>
// // // // //     );
// // // // // };

// // // // // export default AppLayout;

// // // // // import React, { useEffect, useRef } from 'react';
// // // // // import { Outlet, useLocation, useNavigate } from 'react-router-dom';
// // // // // import BottomNav from "./BottomNav";
// // // // // import useAuthStore from '../../store/useAuthStore';
// // // // // import useNotificationStore from '../../store/useNotificationStore';
// // // // // import io from 'socket.io-client';
// // // // // import { Bell } from 'lucide-react';
// // // // // import { Toaster } from 'react-hot-toast';
// // // // // import { Howl } from 'howler'; // 1. Import Howl from howler

// // // // // const AppLayout = () => {
// // // // //     const navigate = useNavigate();
// // // // //     const { userInfo } = useAuthStore();
// // // // //     const { addNotification, fetchNotifications, unreadCount } = useNotificationStore();

// // // // //     // 2. Use a ref to store the sound instance so it's only created once
// // // // //     const notificationSound = useRef(null);

// // // // //     // This effect initializes the sound on the first load
// // // // //     useEffect(() => {
// // // // //         notificationSound.current = new Howl({
// // // // //             src: ['/notification.mp3'] // Points to the file in your /public folder
// // // // //         });
// // // // //     }, []);

// // // // //     // This effect manages the real-time notification connection
// // // // //     useEffect(() => {
// // // // //         if (!userInfo) return;

// // // // //         fetchNotifications();

// // // // //         const socket = io('https://localhost:5000', {
// // // // //             transports: ['websocket'],
// // // // //             rejectUnauthorized: false
// // // // //         });

// // // // //         socket.on('connect', () => {
// // // // //             socket.emit('join', userInfo._id);
// // // // //         });

// // // // //         socket.on('new_notification', (notification) => {
// // // // //             addNotification(notification);
            
// // // // //             // 3. Play the pre-loaded sound. Howler handles the audio context internally.
// // // // //             if (notificationSound.current) {
// // // // //                 notificationSound.current.play();
// // // // //             }
// // // // //         });
        
// // // // //         socket.on('connect_error', (err) => {
// // // // //             console.error("WebSocket Connection Error:", err.message);
// // // // //         });

// // // // //         return () => {
// // // // //             socket.disconnect();
// // // // //         };
// // // // //     }, [userInfo, addNotification, fetchNotifications]);

// // // // //     const location = useLocation();
// // // // //     const isHomePage = location.pathname === '/dashboard';

// // // // //     return (
// // // // //         <div className="font-sans bg-gray-50 sm:bg-gray-200 sm:flex sm:items-center sm:justify-center min-h-screen">
// // // // //             <div className="w-full h-screen sm:max-w-sm sm:h-[750px] sm:rounded-2xl sm:shadow-lg flex flex-col mx-auto bg-gray-50 relative">
// // // // //                 <Toaster position="top-center" />
                
// // // // //                 {isHomePage && (
// // // // //                     <header className="flex items-center justify-between p-4 border-b flex-shrink-0 bg-white">
// // // // //                         <img src='/pynglLogoImage.png' alt="Pyngl Logo" style={{ height: '27px', width: '76px' }} />
// // // // //                         <button onClick={() => navigate('/notifications')} title="Notifications" className="relative p-1">
// // // // //                             <Bell className="w-6 h-6 text-gray-700" />
// // // // //                             {unreadCount > 0 && (
// // // // //                                 <span className="absolute top-0 right-0 flex h-3 w-3">
// // // // //                                     <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
// // // // //                                     <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
// // // // //                                 </span>
// // // // //                             )}
// // // // //                         </button>
// // // // //                     </header>
// // // // //                 )}

// // // // //                 <main className="flex-grow overflow-y-auto" style={{ paddingBottom: '75px' }}>
// // // // //                     <Outlet />
// // // // //                 </main>
                
// // // // //                 <BottomNav />
// // // // //             </div>
// // // // //         </div>
// // // // //     );
// // // // // };

// // // // // export default AppLayout;

// // // // // import React, { useEffect } from 'react';
// // // // // import { Outlet, useLocation, useNavigate } from 'react-router-dom';
// // // // // import BottomNav from "./BottomNav";
// // // // // import useAuthStore from '../../store/useAuthStore';
// // // // // import useNotificationStore from '../../store/useNotificationStore';
// // // // // import io from 'socket.io-client';
// // // // // import { Bell } from 'lucide-react';
// // // // // import { Toaster } from 'react-hot-toast';
// // // // // import * as Tone from 'tone';

// // // // // const AppLayout = () => {
// // // // //     const navigate = useNavigate();
// // // // //     const { userInfo } = useAuthStore();
// // // // //     const { addNotification, fetchNotifications, unreadCount } = useNotificationStore();

// // // // //     // Effect to manage the real-time notification connection
// // // // //     useEffect(() => {
// // // // //         if (!userInfo) return;

// // // // //         fetchNotifications();

// // // // //         const socket = io('https://localhost:5000', {
// // // // //             transports: ['websocket'],
// // // // //             rejectUnauthorized: false // Necessary for self-signed certs in dev
// // // // //         });

// // // // //         socket.on('connect', () => {
// // // // //             console.log('WebSocket connected:', socket.id);
// // // // //             socket.emit('join', userInfo._id);
// // // // //         });

// // // // //         socket.on('new_notification', (notification) => {
// // // // //             addNotification(notification);
            
// // // // //             // This will now work because the audio context will have been started
// // // // //             // by the user's first click.
// // // // //             if (Tone.context.state === 'running') {
// // // // //                 const synth = new Tone.Synth().toDestination();
// // // // //                 synth.triggerAttackRelease("C5", "8n");
// // // // //             }
// // // // //         });
        
// // // // //         socket.on('connect_error', (err) => {
// // // // //             console.error("WebSocket Connection Error:", err.message);
// // // // //         });

// // // // //         return () => {
// // // // //             socket.disconnect();
// // // // //         };
// // // // //     }, [userInfo, addNotification, fetchNotifications]);
    
// // // // //     // This effect runs once and sets up a one-time event listener to start the audio.
// // // // //     useEffect(() => {
// // // // //         const startAudio = async () => {
// // // // //             await Tone.start();
// // // // //             console.log('AudioContext started!');
// // // // //             // Once started, we can remove the listener.
// // // // //             document.body.removeEventListener('click', startAudio);
// // // // //         };

// // // // //         // Add the event listener to the entire page
// // // // //         document.body.addEventListener('click', startAudio);

// // // // //         // Cleanup function to remove the listener if the component unmounts
// // // // //         return () => {
// // // // //             document.body.removeEventListener('click', startAudio);
// // // // //         }
// // // // //     },[]);

// // // // //     const location = useLocation();
// // // // //     const isHomePage = location.pathname === '/dashboard';

// // // // //     return (
// // // // //         <div className="font-sans bg-gray-50 sm:bg-gray-200 sm:flex sm:items-center sm:justify-center min-h-screen">
// // // // //             <div className="w-full h-screen sm:max-w-sm sm:h-[750px] sm:rounded-2xl sm:shadow-lg flex flex-col mx-auto bg-gray-50 relative">
// // // // //                 <Toaster position="top-center" />
                
// // // // //                 {isHomePage && (
// // // // //                     <header className="flex items-center justify-between p-4 border-b flex-shrink-0 bg-white">
// // // // //                         <img src='/pynglLogoImage.png' alt="Pyngl Logo" style={{ height: '27px', width: '76px' }} />
// // // // //                         <button onClick={() => navigate('/notifications')} title="Notifications" className="relative p-1">
// // // // //                             <Bell className="w-6 h-6 text-gray-700" />
// // // // //                             {unreadCount > 0 && (
// // // // //                                 <span className="absolute top-0 right-0 flex h-3 w-3">
// // // // //                                     <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
// // // // //                                     <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
// // // // //                                 </span>
// // // // //                             )}
// // // // //                         </button>
// // // // //                     </header>
// // // // //                 )}

// // // // //                 <main className="flex-grow overflow-y-auto" style={{ paddingBottom: '75px' }}>
// // // // //                     <Outlet />
// // // // //                 </main>
                
// // // // //                 <BottomNav />
// // // // //             </div>
// // // // //         </div>
// // // // //     );
// // // // // };

// // // // // export default AppLayout;

// // // // // import React, { useEffect } from 'react';
// // // // // import { Outlet, useLocation, useNavigate } from 'react-router-dom';
// // // // // import BottomNav from "./BottomNav";
// // // // // import useAuthStore from '../../store/useAuthStore';
// // // // // import useNotificationStore from '../../store/useNotificationStore';
// // // // // import io from 'socket.io-client';
// // // // // import { Bell } from 'lucide-react';
// // // // // import { Toaster } from 'react-hot-toast';
// // // // // import * as Tone from 'tone';

// // // // // const AppLayout = () => {
// // // // //     const navigate = useNavigate();
// // // // //     const { userInfo } = useAuthStore();
// // // // //     const { addNotification, fetchNotifications, unreadCount } = useNotificationStore();

// // // // //     // Effect to manage the real-time notification connection
// // // // //     useEffect(() => {
// // // // //         if (!userInfo) return;

// // // // //         fetchNotifications();

// // // // //         // --- THIS IS THE FIX for the connection error ---
// // // // //         // 1. Connect to your secure HTTPS WebSocket server
// // // // //         const socket = io('https://localhost:5000', { 
// // // // //             transports: ['websocket'],
// // // // //             // 2. This is crucial for development. It tells the client to trust
// // // // //             //    your self-signed SSL certificate.
// // // // //             rejectUnauthorized: false 
// // // // //         });

// // // // //         socket.on('connect', () => {
// // // // //             console.log('Secure WebSocket connected:', socket.id);
// // // // //             socket.emit('join', userInfo._id);
// // // // //         });

// // // // //         socket.on('new_notification', (notification) => {
// // // // //             addNotification(notification);
            
// // // // //             // This will now work because the audio context is started by the user's first click.
// // // // //             if (Tone.context.state === 'running') {
// // // // //                 const synth = new Tone.Synth().toDestination();
// // // // //                 synth.triggerAttackRelease("C5", "8n");
// // // // //             }
// // // // //         });
        
// // // // //         socket.on('connect_error', (err) => {
// // // // //             console.error("WebSocket Connection Error:", err.message);
// // // // //         });

// // // // //         return () => {
// // // // //             socket.disconnect();
// // // // //         };
// // // // //     }, [userInfo, addNotification, fetchNotifications]);
    
// // // // //     // --- THIS IS THE FIX for the audio error ---
// // // // //     // This effect runs once and sets up a one-time event listener to start the audio
// // // // //     // on the very first user interaction with the page.
// // // // //     useEffect(() => {
// // // // //         const startAudio = async () => {
// // // // //             await Tone.start();
// // // // //             console.log('AudioContext started!');
// // // // //             document.body.removeEventListener('click', startAudio);
// // // // //         };
// // // // //         document.body.addEventListener('click', startAudio);
// // // // //         return () => {
// // // // //             document.body.removeEventListener('click', startAudio);
// // // // //         }
// // // // //     },[]);

// // // // //     const location = useLocation();
// // // // //     const isHomePage = location.pathname === '/dashboard';

// // // // //     return (
// // // // //         <div className="font-sans bg-gray-50 sm:bg-gray-200 sm:flex sm:items-center sm:justify-center min-h-screen">
// // // // //             <div className="w-full h-screen sm:max-w-sm sm:h-[750px] sm:rounded-2xl sm:shadow-lg flex flex-col mx-auto bg-gray-50 relative">
// // // // //                 <Toaster position="top-center" />
                
// // // // //                 {isHomePage && (
// // // // //                     <header className="flex items-center justify-between p-4 border-b flex-shrink-0 bg-white">
// // // // //                         <img src='/pynglLogoImage.png' alt="Pyngl Logo" style={{ height: '27px', width: '76px' }} />
// // // // //                         <button onClick={() => navigate('/notifications')} title="Notifications" className="relative p-1">
// // // // //                             <Bell className="w-6 h-6 text-gray-700" />
// // // // //                             {unreadCount > 0 && (
// // // // //                                 <span className="absolute top-0 right-0 flex h-3 w-3">
// // // // //                                     <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
// // // // //                                     <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
// // // // //                                 </span>
// // // // //                             )}
// // // // //                         </button>
// // // // //                     </header>
// // // // //                 )}

// // // // //                 <main className="flex-grow overflow-y-auto" style={{ paddingBottom: '75px' }}>
// // // // //                     <Outlet />
// // // // //                 </main>
                
// // // // //                 <BottomNav />
// // // // //             </div>
// // // // //         </div>
// // // // //     );
// // // // // };

// // // // // export default AppLayout;

// // // // // import React, { useEffect, useRef } from 'react';
// // // // // import { Outlet, useLocation, useNavigate } from 'react-router-dom';
// // // // // import BottomNav from "./BottomNav";
// // // // // import useAuthStore from '../../store/useAuthStore';
// // // // // import useNotificationStore from '../../store/useNotificationStore';
// // // // // import io from 'socket.io-client';
// // // // // import { Bell } from 'lucide-react';
// // // // // import { Toaster } from 'react-hot-toast';
// // // // // import { Howl } from 'howler'; // 1. Import Howl from the new library

// // // // // const AppLayout = () => {
// // // // //     const navigate = useNavigate();
// // // // //     const { userInfo } = useAuthStore();
// // // // //     const { addNotification, fetchNotifications, unreadCount } = useNotificationStore();

// // // // //     // 2. Use a ref to store the sound instance so it's only created once.
// // // // //     const notificationSound = useRef(null);

// // // // //     // This effect initializes the sound when the component first loads.
// // // // //     useEffect(() => {
// // // // //         notificationSound.current = new Howl({
// // // // //             src: ['/notification.wav'], // Points to the new file in your /public folder
// // // // //             volume: 0.9,
// // // // //         });
// // // // //     }, []);

// // // // //     // This effect manages the real-time notification connection.
// // // // //     useEffect(() => {
// // // // //         if (!userInfo) return;

// // // // //         fetchNotifications();

// // // // //         const socket = io('https://localhost:5000', {
// // // // //             transports: ['websocket'],
// // // // //             rejectUnauthorized: false
// // // // //         });

// // // // //         socket.on('connect', () => {
// // // // //             console.log('WebSocket connected:', socket.id);
// // // // //             socket.emit('join', userInfo._id);
// // // // //         });

// // // // //         socket.on('new_notification', (notification) => {
// // // // //             addNotification(notification);
            
// // // // //             // 3. Play the pre-loaded sound. Howler handles unlocking the audio context
// // // // //             //    on the first user interaction automatically.
// // // // //             if (notificationSound.current) {
// // // // //                 notificationSound.current.play();
// // // // //             }
// // // // //         });
        
// // // // //         socket.on('connect_error', (err) => {
// // // // //             console.error("WebSocket Connection Error:", err.message);
// // // // //         });

// // // // //         return () => {
// // // // //             socket.disconnect();
// // // // //         };
// // // // //     }, [userInfo, addNotification, fetchNotifications]);
    
// // // // //     const location = useLocation();
// // // // //     const isHomePage = location.pathname === '/dashboard';

// // // // //     return (
// // // // //         <div className="font-sans bg-gray-50 sm:bg-gray-200 sm:flex sm:items-center sm:justify-center min-h-screen">
// // // // //             <div className="w-full h-screen sm:max-w-sm sm:h-[750px] sm:rounded-2xl sm:shadow-lg flex flex-col mx-auto bg-gray-50 relative">
// // // // //                 <Toaster position="top-center" />
                
// // // // //                 {isHomePage && (
// // // // //                     <header className="flex items-center justify-between p-4 border-b flex-shrink-0 bg-white">
// // // // //                         <img src='/pynglLogoImage.png' alt="Pyngl Logo" style={{ height: '27px', width: '76px' }} />
// // // // //                         <button onClick={() => navigate('/notifications')} title="Notifications" className="relative p-1">
// // // // //                             <Bell className="w-6 h-6 text-gray-700" />
// // // // //                             {unreadCount > 0 && (
// // // // //                                 <span className="absolute top-0 right-0 flex h-3 w-3">
// // // // //                                     <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
// // // // //                                     <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
// // // // //                                 </span>
// // // // //                             )}
// // // // //                         </button>
// // // // //                     </header>
// // // // //                 )}

// // // // //                 <main className="flex-grow overflow-y-auto" style={{ paddingBottom: '75px' }}>
// // // // //                     <Outlet />
// // // // //                 </main>
                
// // // // //                 <BottomNav />
// // // // //             </div>
// // // // //         </div>
// // // // //     );
// // // // // };

// // // // // export default AppLayout;


// // // // import React, { useEffect, useRef } from 'react';
// // // // import { Outlet, useLocation, useNavigate } from 'react-router-dom';
// // // // import BottomNav from "./BottomNav";
// // // // import useAuthStore from '../../store/useAuthStore';
// // // // import useNotificationStore from '../../store/useNotificationStore';
// // // // import io from 'socket.io-client';
// // // // import { Bell } from 'lucide-react';
// // // // import { Toaster } from 'react-hot-toast';
// // // // import { Howl, Howler } from 'howler';

// // // // const AppLayout = () => {
// // // //     const navigate = useNavigate();
// // // //     const { userInfo } = useAuthStore();
// // // //     const { addNotification, fetchNotifications, unreadCount } = useNotificationStore();
// // // //     const notificationSound = useRef(null);

// // // //     // This effect initializes the sound when the component first loads.
// // // //     useEffect(() => {
// // // //         notificationSound.current = new Howl({
// // // //             src: ['/notification.mp3'], // Points to the sound file in your /public folder
// // // //             volume: 0.6,
// // // //         });
// // // //     }, []);

// // // //     // This effect manages the real-time notification connection.
// // // //     useEffect(() => {
// // // //         if (!userInfo) return;

// // // //         fetchNotifications();

// // // //         const socket = io('https://192.168.1.8:5000', {
// // // //             transports: ['websocket'],
// // // //             rejectUnauthorized: false
// // // //         });

// // // //         socket.on('connect', () => {
// // // //             console.log('WebSocket connected:', socket.id);
// // // //             socket.emit('join', userInfo._id);
// // // //         });

// // // //         socket.on('new_notification', (notification) => {
// // // //             addNotification(notification);
            
// // // //             // This will now work reliably because the audio context
// // // //             // will have been unlocked by the user's first click.
// // // //             if (notificationSound.current) {
// // // //                 notificationSound.current.play();
// // // //             }
// // // //         });
        
// // // //         socket.on('connect_error', (err) => {
// // // //             console.error("WebSocket Connection Error:", err.message);
// // // //         });

// // // //         return () => {
// // // //             socket.disconnect();
// // // //         };
// // // //     }, [userInfo, addNotification, fetchNotifications]);
    
// // // //     // This effect runs once and sets up a one-time event listener to unlock the audio
// // // //     // on the very first user interaction with the page.
// // // //     useEffect(() => {
// // // //         const unlockAudio = () => {
// // // //             if (Howler.ctx && Howler.ctx.state === 'suspended') {
// // // //                 Howler.ctx.resume();
// // // //             }
// // // //             document.body.removeEventListener('click', unlockAudio);
// // // //             document.body.removeEventListener('touchstart', unlockAudio);
// // // //         };
        
// // // //         document.body.addEventListener('click', unlockAudio);
// // // //         document.body.addEventListener('touchstart', unlockAudio);

// // // //         return () => {
// // // //             document.body.removeEventListener('click', unlockAudio);
// // // //             document.body.removeEventListener('touchstart', unlockAudio);
// // // //         }
// // // //     },[]);

// // // //     const location = useLocation();
// // // //     const isHomePage = location.pathname === '/dashboard';

// // // //     return (
// // // //         <div className="font-sans bg-gray-50 sm:bg-gray-200 sm:flex sm:items-center sm:justify-center min-h-screen">
// // // //             <div className="w-full h-screen sm:max-w-sm sm:h-[750px] sm:rounded-2xl sm:shadow-lg flex flex-col mx-auto bg-gray-50 relative">
// // // //                 <Toaster position="top-center" />
                
// // // //                 {isHomePage && (
// // // //                     <header className="flex items-center justify-between p-4 border-b flex-shrink-0 bg-white">
// // // //                         <img src='/pynglLogoImage.png' alt="Pyngl Logo" style={{ height: '27px', width: '76px' }} />
// // // //                         <button onClick={() => navigate('/notifications')} title="Notifications" className="relative p-1">
// // // //                             <Bell className="w-6 h-6 text-gray-700" />
// // // //                             {unreadCount > 0 && (
// // // //                                 <span className="absolute top-0 right-0 flex h-3 w-3">
// // // //                                     <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
// // // //                                     <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
// // // //                                 </span>
// // // //                             )}
// // // //                         </button>
// // // //                     </header>
// // // //                 )}

// // // //                 <main className="flex-grow overflow-y-auto" style={{ paddingBottom: '75px' }}>
// // // //                     <Outlet />
// // // //                 </main>
                
// // // //                 <BottomNav />
// // // //             </div>
// // // //         </div>
// // // //     );
// // // // };

// // // // export default AppLayout;

// // // // import React, { useEffect, useRef } from "react";
// // // // import { Outlet, useLocation, useNavigate } from "react-router-dom";
// // // // import BottomNav from "./BottomNav";
// // // // import useAuthStore from "../../store/useAuthStore";
// // // // import useNotificationStore from "../../store/useNotificationStore";
// // // // import io from "socket.io-client";
// // // // import { Bell } from "lucide-react";
// // // // import { Toaster } from "react-hot-toast";
// // // // import { Howl, Howler } from "howler";
// // // // import useThemeStore from "../../store/useThemeStore"; // Added import

// // // // const AppLayout = () => {
// // // //     const navigate = useNavigate();
// // // //     const { userInfo } = useAuthStore();
// // // //     const { addNotification, fetchNotifications, unreadCount } =
// // // //         useNotificationStore();
// // // //     const notificationSound = useRef(null);

// // // //     // This effect initializes the sound when the component first loads.
// // // //     useEffect(() => {
// // // //         notificationSound.current = new Howl({
// // // //             src: ["/notification.mp3"],
// // // //             volume: 0.6,
// // // //         });
// // // //     }, []);

// // // //     // This effect manages the real-time notification connection.
// // // //     useEffect(() => {
// // // //         if (!userInfo) return;

// // // //         fetchNotifications();

// // // //         const socket = io("https://192.168.1.8:5000", {
// // // //             transports: ["websocket"],
// // // //             rejectUnauthorized: false,
// // // //         });

// // // //         socket.on("connect", () => {
// // // //             console.log("WebSocket connected:", socket.id);
// // // //             socket.emit("join", userInfo._id);
// // // //         });

// // // //         socket.on("new_notification", (notification) => {
// // // //             addNotification(notification);
// // // //             if (notificationSound.current) {
// // // //                 notificationSound.current.play();
// // // //             }
// // // //         });

// // // //         socket.on("connect_error", (err) => {
// // // //             console.error("WebSocket Connection Error:", err.message);
// // // //         });

// // // //         return () => {
// // // //             socket.disconnect();
// // // //         };
// // // //     }, [userInfo, addNotification, fetchNotifications]);

// // // //     // This effect runs once and sets up a one-time event listener to unlock the audio
// // // //     useEffect(() => {
// // // //         const unlockAudio = () => {
// // // //             if (Howler.ctx && Howler.ctx.state === "suspended") {
// // // //                 Howler.ctx.resume();
// // // //             }
// // // //             document.body.removeEventListener("click", unlockAudio);
// // // //             document.body.removeEventListener("touchstart", unlockAudio);
// // // //         };

// // // //         document.body.addEventListener("click", unlockAudio);
// // // //         document.body.addEventListener("touchstart", unlockAudio);

// // // //         return () => {
// // // //             document.body.removeEventListener("click", unlockAudio);
// // // //             document.body.removeEventListener("touchstart", unlockAudio);
// // // //         };
// // // //     }, []);

// // // //     const location = useLocation();
// // // //     const isHomePage = location.pathname === "/dashboard";

// // // //     return (
// // // //         // Updated with dark mode classes
// // // //         <div className="font-sans bg-gray-50 dark:bg-gray-900 sm:bg-gray-200 sm:dark:bg-gray-950 sm:flex sm:items-center sm:justify-center min-h-screen transition-colors">
// // // //             {/* Updated with dark mode classes */}
// // // //             <div className="w-full h-screen sm:max-w-sm sm:h-[750px] sm:rounded-2xl sm:shadow-lg flex flex-col mx-auto bg-gray-50 dark:bg-gray-900 relative transition-colors">
// // // //                 <Toaster position="top-center" />

// // // //                 {isHomePage && (
// // // //                     // Updated with dark mode classes
// // // //                     <header className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0 bg-white dark:bg-gray-800 transition-colors">
// // // //                         {/* Updated to show different logos for light/dark mode */}
// // // //                         <img
// // // //                             src="/pynglLogoImage.png"
// // // //                             alt="Logo"
// // // //                             className="h-[27px] w-[76px] block dark:hidden"
// // // //                         />
// // // //                         <img
// // // //                             src="/logo_dark.svg"
// // // //                             alt="Logo Dark"
// // // //                             className="h-[27px] w-[76px] hidden dark:block"
// // // //                         />
// // // //                         <button onClick={() => navigate('/notifications')} title="Notifications" className="relative p-1">
// // // //                             {/* Updated with dark mode class */}
// // // //                             <Bell className="w-6 h-6 text-gray-700 dark:text-gray-200" />
// // // //                             {unreadCount > 0 && (
// // // //                                 <span className="absolute top-0 right-0 flex h-3 w-3">
// // // //                                     <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
// // // //                                     <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
// // // //                                 </span>
// // // //                             )}
// // // //                         </button>
// // // //                     </header>
// // // //                 )}

// // // //                 <main className="flex-grow overflow-y-auto" style={{ paddingBottom: '75px' }}>
// // // //                     <Outlet />
// // // //                 </main>

// // // //                 <BottomNav />
// // // //             </div>
// // // //         </div>
// // // //     );
// // // // };

// // // // export default AppLayout;
// // // import React, { useEffect, useRef } from "react";
// // // import { Outlet, useLocation, useNavigate } from "react-router-dom";
// // // import BottomNav from "./BottomNav";
// // // import useAuthStore from "../../store/useAuthStore";
// // // import useNotificationStore from "../../store/useNotificationStore";
// // // import io from "socket.io-client";
// // // import { Bell } from "lucide-react";
// // // import { Toaster } from "react-hot-toast";
// // // import { Howl, Howler } from "howler";

// // // const AppLayout = () => {
// // //   const navigate = useNavigate();
// // //   const { userInfo } = useAuthStore();
// // //   const { addNotification, fetchNotifications, unreadCount } =
// // //     useNotificationStore();
// // //   const notificationSound = useRef(null);

// // //   // Load sound
// // //   useEffect(() => {
// // //     notificationSound.current = new Howl({
// // //       src: ["/notification.mp3"],
// // //       volume: 0.6,
// // //     });
// // //   }, []);

// // //   // WebSocket notifications
// // //   useEffect(() => {
// // //     if (!userInfo) return;

// // //     fetchNotifications();

// // //     const socket = io("https://192.168.1.8:5000", {
// // //       transports: ["websocket"],
// // //       rejectUnauthorized: false,
// // //     });

// // //     socket.on("connect", () => {
// // //       console.log("WebSocket connected:", socket.id);
// // //       socket.emit("join", userInfo._id);
// // //     });

// // //     socket.on("new_notification", (notification) => {
// // //       addNotification(notification);
// // //       if (notificationSound.current) notificationSound.current.play();
// // //     });

// // //     socket.on("connect_error", (err) => {
// // //       console.error("WebSocket Connection Error:", err.message);
// // //     });

// // //     return () => {
// // //       socket.disconnect();
// // //     };
// // //   }, [userInfo, addNotification, fetchNotifications]);

// // //   // Unlock audio on first interaction
// // //   useEffect(() => {
// // //     const unlockAudio = () => {
// // //       if (Howler.ctx && Howler.ctx.state === "suspended") Howler.ctx.resume();
// // //       document.body.removeEventListener("click", unlockAudio);
// // //       document.body.removeEventListener("touchstart", unlockAudio);
// // //     };

// // //     document.body.addEventListener("click", unlockAudio);
// // //     document.body.addEventListener("touchstart", unlockAudio);

// // //     return () => {
// // //       document.body.removeEventListener("click", unlockAudio);
// // //       document.body.removeEventListener("touchstart", unlockAudio);
// // //     };
// // //   }, []);

// // //   const location = useLocation();
// // //   const isHomePage = location.pathname === "/dashboard";

// // //   return (
// // //     <div className="font-sans bg-gray-50 dark:bg-gray-900 w-full min-h-screen flex justify-center transition-colors">
// // //       <div className="flex flex-col w-full h-full md:w-7/6 lg:w-4/5 xl:w-3/4 2xl:w-2/3 bg-gray-50 dark:bg-gray-900 transition-colors">
// // //         <Toaster position="top-center" />

// // //         {/* Header */}
// // //         {isHomePage && (
// // //           <header className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0 bg-white dark:bg-gray-800 transition-colors">
// // //             <img
// // //               src="/pynglLogoImage.png"
// // //               alt="Logo"
// // //               className="h-[27px] w-[76px] block dark:hidden"
// // //             />
// // //             <img
// // //               src="/logo_dark.svg"
// // //               alt="Logo Dark"
// // //               className="h-[27px] w-[76px] hidden dark:block"
// // //             />

// // //             <button
// // //               onClick={() => navigate("/notifications")}
// // //               title="Notifications"
// // //               className="relative p-1"
// // //             >
// // //               <Bell className="w-6 h-6 text-gray-700 dark:text-gray-200" />
// // //               {unreadCount > 0 && (
// // //                 <span className="absolute top-0 right-0 flex h-3 w-3">
// // //                   <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
// // //                   <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
// // //                 </span>
// // //               )}
// // //             </button>
// // //           </header>
// // //         )}

// // //         {/* Main content */}
// // //         <main className="flex-grow overflow-y-auto">
// // //           <Outlet />
// // //         </main>

// // //         {/* Bottom Navigation */}
// // //         <BottomNav />
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default AppLayout;
// // import React from 'react';
// // import { Outlet, useLocation, useNavigate } from 'react-router-dom';
// // import { Toaster } from 'react-hot-toast';
// // import { Bell } from 'lucide-react';
// // import BottomNav from "./BottomNav";
// // import useNotificationStore from '../../store/useNotificationStore';
// // import { useNotificationsSocket } from '../../hooks/useNotificationsSocket';

// // const AppHeader = () => {
// //     const navigate = useNavigate();
// //     const { unreadCount } = useNotificationStore();

// //     return (
// //         <header className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md sticky top-0 z-30">
// //             <img
// //                 src="/pynglLogoImage.png"
// //                 alt="Logo"
// //                 className="h-[27px] w-[76px] block dark:hidden"
// //             />
// //             <img
// //                 src="/logo_dark.svg"
// //                 alt="Logo Dark"
// //                 className="h-[27px] w-[76px] hidden dark:block"
// //             />
// //             <button
// //                 onClick={() => navigate("/notifications")}
// //                 title="Notifications"
// //                 className="relative p-1"
// //             >
// //                 <Bell className="w-6 h-6 text-gray-700 dark:text-gray-200" />
// //                 {unreadCount > 0 && (
// //                     <span className="absolute top-0 right-0 flex h-3 w-3">
// //                         <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
// //                         <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
// //                     </span>
// //                 )}
// //             </button>
// //         </header>
// //     );
// // };

// // const AppLayout = () => {
// //     // This one hook handles all background logic for notifications and sound.
// //     useNotificationsSocket();
    
// //     const location = useLocation();
// //     const isHomePage = location.pathname === "/dashboard";

// //     return (
// //         <div className="font-sans bg-gray-50 dark:bg-gray-900 w-full min-h-screen transition-colors">
// //             <Toaster position="top-center" />

// //             {/* The responsive BottomNav, which becomes a sidebar on tablets/desktops */}
// //             <BottomNav />
            
// //             {/* The main content area that makes space for the sidebar on larger screens */}
// //             <div className="md:pl-64">
// //                 {isHomePage && <AppHeader />}

// //                 <main className="flex-grow">
// //                     <Outlet />
// //                 </main>
// //             </div>
// //         </div>
// //     );
// // };

// // export default AppLayout;

// import React, { useEffect, useRef } from "react";
// import { Outlet, useLocation, useNavigate } from "react-router-dom";
// import BottomNav from "./BottomNav";
// import useAuthStore from "../../store/useAuthStore";
// import useNotificationStore from "../../store/useNotificationStore";
// import io from "socket.io-client";
// import { Bell } from "lucide-react";
// import { Toaster } from "react-hot-toast";
// import { Howl, Howler } from "howler";
// const AppHeader = () => {
//     const navigate = useNavigate();
//     const { unreadCount } = useNotificationStore();

//     return (
//         <header className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md sticky top-0 z-30">
//             <img src="/pynglLogoImage.png" alt="Logo" className="h-[27px] w-[76px] block dark:hidden" />
//             <img src="/logo_dark.svg" alt="Logo Dark" className="h-[27px] w-[76px] hidden dark:block" />
//             <button onClick={() => navigate("/notifications")} title="Notifications" className="relative p-1">
//                 <Bell className="w-6 h-6 text-gray-700 dark:text-gray-200" />
//                 {unreadCount > 0 && (
//                     <span className="absolute top-0 right-0 flex h-3 w-3">
//                         <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
//                         <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
//                     </span>
//                 )}
//             </button>
//         </header>
//     );
// };
// const AppLayout = () => {
//   const navigate = useNavigate();
//    const location = useLocation();
//   const { userInfo } = useAuthStore();
//   const { addNotification, fetchNotifications, unreadCount } =
//     useNotificationStore();
//   const notificationSound = useRef(null);
//  const hideBottomNavOnRoutes = [
//         '/create-text-poll',
//         '/create-image-poll'
//     ];
//        const shouldShowBottomNav = !hideBottomNavOnRoutes.includes(location.pathname);

//   // Load sound
//   useEffect(() => {
//     notificationSound.current = new Howl({
//       src: ["/notification.mp3"],
//       volume: 0.6,
//     });
//   }, []);

//   // WebSocket notifications
//   useEffect(() => {
//     if (!userInfo) return;

//     fetchNotifications();

//     const socket = io("https://192.168.1.12:5000", {
//       transports: ["websocket"],
//       rejectUnauthorized: false,
//     });

//     socket.on("connect", () => {
//       console.log("WebSocket connected:", socket.id);
//       socket.emit("join", userInfo._id);
//     });

//     socket.on("new_notification", (notification) => {
//       addNotification(notification);
//       if (notificationSound.current) notificationSound.current.play();
//     });

//     socket.on("connect_error", (err) => {
//       console.error("WebSocket Connection Error:", err.message);
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, [userInfo, addNotification, fetchNotifications]);

//   // Unlock audio on first interaction
//   useEffect(() => {
//     const unlockAudio = () => {
//       if (Howler.ctx && Howler.ctx.state === "suspended") Howler.ctx.resume();
//       document.body.removeEventListener("click", unlockAudio);
//       document.body.removeEventListener("touchstart", unlockAudio);
//     };

//     document.body.addEventListener("click", unlockAudio);
//     document.body.addEventListener("touchstart", unlockAudio);

//     return () => {
//       document.body.removeEventListener("click", unlockAudio);
//       document.body.removeEventListener("touchstart", unlockAudio);
//     };
//   }, []);

  
//   const isHomePage = location.pathname === "/dashboard";

//   return (
//     <div className="font-sans bg-gray-50 dark:bg-gray-900 w-full min-h-screen flex justify-center transition-colors">
//       <div className="flex flex-col w-full h-full md:w-7/6 lg:w-4/5 xl:w-3/4 2xl:w-2/3 bg-gray-50 dark:bg-gray-900 transition-colors">
//         <Toaster position="top-center" />

//         {/* Header */}
//         {isHomePage && (
//           <header className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0 bg-white dark:bg-gray-800 transition-colors">
//             <img
//               src="/pynglLogoImage.png"
//               alt="Logo"
//               className="h-[27px] w-[76px] block dark:hidden"
//             />
//             <img
//               src="/logo_dark.svg"
//               alt="Logo Dark"
//               className="h-[27px] w-[76px] hidden dark:block"
//             />

//             <button
//               onClick={() => navigate("/notifications")}
//               title="Notifications"
//               className="relative p-1"
//             >
//               <Bell className="w-6 h-6 text-gray-700 dark:text-gray-200" />
//               {unreadCount > 0 && (
//                 <span className="absolute top-0 right-0 flex h-3 w-3">
//                   <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
//                   <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
//                 </span>
//               )}
//             </button>
//           </header>
//         )}

//         {/* Main content */}
//         <main className="flex-grow overflow-y-auto">
//           <Outlet />
//         </main>

//         {/* Bottom Navigation */}
//         {shouldShowBottomNav && <BottomNav />}
//       </div>
//     </div>
//   );
// };

// export default AppLayout;
import React, { useEffect, useRef, useState } from "react";
import { Outlet, useLocation, useNavigate, Link } from "react-router-dom";
import BottomNav from "./BottomNav";
import useAuthStore from "../../store/useAuthStore";
import useNotificationStore from "../../store/useNotificationStore";
import io from "socket.io-client";
import { Bell, CheckCheck } from "lucide-react";
import { Toaster } from "react-hot-toast";
import { Howl, Howler } from "howler";
const useClickOutside = (ref, handler) => {
    useEffect(() => {
        const listener = (event) => {
            if (!ref.current || ref.current.contains(event.target)) {
                return;
            }
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
// This component is now used in the AppLayout

const ProfileAvatar = () => {
    const { userInfo } = useAuthStore();

    // Helper to get initials from a name
    const getInitials = (firstName = '', lastName = '') => {
        const firstInitial = firstName ? firstName[0] : '';
        const lastInitial = lastName ? lastName[0] : '';
        return `${firstInitial}${lastInitial}`.toUpperCase();
    };

    if (!userInfo) return null;

    return (
        <Link to="/profile" title="Profile" className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
            {userInfo.profilePhoto ? (
                // If a profile photo exists, display it
                <img 
                    src={userInfo.profilePhoto} 
                    alt="Profile" 
                    className="w-8 h-8 rounded-full object-cover" 
                />
            ) : (
                // Otherwise, display the initials
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
                {unreadCount > 0 && (
                    <button onClick={markAllAsRead} className="text-sm text-pink-500 font-semibold hover:text-pink-700 flex items-center gap-1">
                        <CheckCheck size={16} /> Mark all as read
                    </button>
                )}
            </div>
            <div className="max-h-96 overflow-y-auto">
                {notifications.length > 0 ? (
                    notifications.map(notif => (
                        <div key={notif._id} className={`p-4 border-b border-gray-100 dark:border-gray-700 flex items-start gap-3 ${!notif.isRead ? 'bg-pink-50 dark:bg-pink-900/20' : ''}`}>
                            <div className="w-2 h-2 rounded-full bg-pink-500 mt-2 flex-shrink-0" style={{ opacity: !notif.isRead ? 1 : 0 }}></div>
                            <div>
                                <p className="text-gray-800 dark:text-gray-100">{notif.message}</p>
                                <span className="text-xs text-gray-400">{new Date(notif.createdAt).toLocaleString()}</span>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="p-8 text-center text-gray-500">You have no notifications.</p>
                )}
            </div>
        </div>
    );
};
const AppHeader = () => {
    const navigate = useNavigate();
    const { unreadCount } = useNotificationStore();
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const notificationsPanelRef = useRef(null);

    // Use the custom hook to close the panel when clicking outside
    useClickOutside(notificationsPanelRef, () => setIsNotificationsOpen(false));
    
    return (
        <header className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md sticky top-0 z-30">
            <Link to="/dashboard">
                <img src="/assets/pynglLogoImage.png" alt="Logo" className="h-[27px] w-[76px] block dark:hidden" />
                <img src="/assets/logo_dark.png" alt="Logo Dark" className="h-[27px] w-[76px] hidden dark:block" />
            </Link>
            
            <div className="flex items-center gap-4">
                {/* Bell icon now opens the notification panel */}
                <div ref={notificationsPanelRef} className="relative">
                    <button onClick={() => setIsNotificationsOpen(prev => !prev)} title="Notifications" className="relative p-1">
                        <Bell className="w-6 h-6 text-gray-700 dark:text-gray-200" />
                        {unreadCount > 0 && (
                            <span className="absolute top-0 right-0 flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span></span>
                        )}
                    </button>
                    {isNotificationsOpen && <NotificationsPanel onClose={() => setIsNotificationsOpen(false)} />}
                </div>          
            </div>
        </header>
    );
};

const AppLayout = () => {
    const location = useLocation();
    const { userInfo } = useAuthStore();
    const { addNotification, fetchNotifications } = useNotificationStore();
    const notificationSound = useRef(null);

    // --- Component Visibility Logic ---
    const showHeaderOnRoutes = ['/dashboard'];
    const hideBottomNavOnRoutes = ['/create-text-poll', '/create-image-poll'];
    
    const shouldShowHeader = showHeaderOnRoutes.includes(location.pathname);
    const shouldShowBottomNav = !hideBottomNavOnRoutes.includes(location.pathname);

    // --- Effects for Sound and WebSockets (No changes needed here) ---
    useEffect(() => {
        notificationSound.current = new Howl({ src: ["/notification.mp3"], volume: 0.6 });
    }, []);

    useEffect(() => {
        if (!userInfo) return;
        fetchNotifications();
        const socket = io(["http://localhost:5000",'http://localhost:5000' ], { transports: ["websocket"], rejectUnauthorized: false });
        socket.on("connect", () => {
            console.log("WebSocket connected:", socket.id);
            socket.emit("join", userInfo._id);
        });
        socket.on("new_notification", (notification) => {
            addNotification(notification);
            notificationSound.current?.play();
        });
        socket.on("connect_error", (err) => {
            console.error("WebSocket Connection Error:", err.message);
        });
        return () => socket.disconnect();
    }, [userInfo, addNotification, fetchNotifications]);

    useEffect(() => {
        const unlockAudio = () => {
            if (Howler.ctx?.state === "suspended") Howler.ctx.resume();
            document.body.removeEventListener("click", unlockAudio);
        };
        document.body.addEventListener("click", unlockAudio);
        return () => document.body.removeEventListener("click", unlockAudio);
    }, []); 

    return (
        <div className="font-sans bg-gray-50 dark:bg-gray-900 w-full min-h-screen flex justify-center">
           <div className="flex flex-col w-full h-full bg-white dark:bg-gray-900">
                <Toaster position="top-center" />

                {/* Header is now cleanly rendered here */}
                 <div className="lg:hidden">
                {shouldShowHeader && <AppHeader />}
            </div>
                {/* Main content */}
                <main className="flex-grow overflow-y-auto">
                    <Outlet />
                </main>

                {/* Bottom Navigation */}
               <div className="lg:hidden">
                    {shouldShowBottomNav && <BottomNav />}
                </div>
            </div>
        </div>
    );
};

export default AppLayout;