// // import { useEffect, useRef } from 'react';
// // import useAuthStore from '../store/useAuthStore';
// // import useNotificationStore from '../store/useNotificationStore';
// // import io from 'socket.io-client';
// // import { Howl, Howler } from 'howler';

// // export const useNotificationsSocket = () => {
// //     const { userInfo } = useAuthStore();
// //     const { addNotification, fetchNotifications } = useNotificationStore();
// //     const notificationSound = useRef(null);

// //     // 1. Initialize the sound
// //     useEffect(() => {
// //         notificationSound.current = new Howl({
// //             src: ['/notification.mp3'],
// //             volume: 0.6,
// //         }); 
// //     }, []);

// //     // 2. Manage the WebSocket connection
// //     useEffect(() => {
// //         if (!userInfo) return;

// //         fetchNotifications();

// //         const socket = io('https://192.168.1.8:5000', {
// //             transports: ['websocket'],
// //             rejectUnauthorized: false
// //         });

// //         socket.on('connect', () => {
// //             console.log('WebSocket connected:', socket.id);
// //             socket.emit('join', userInfo._id);
// //         });

// //         socket.on('new_notification', (notification) => {
// //             addNotification(notification);
// //             if (notificationSound.current) {
// //                 notificationSound.current.play();
// //             }
// //         });

// //         socket.on('connect_error', (err) => console.error("WebSocket Connection Error:", err.message));

// //         return () => socket.disconnect();
// //     }, [userInfo, addNotification, fetchNotifications]);
    
// //     // 3. Unlock audio on first user interaction
// //     useEffect(() => {
// //         const unlockAudio = () => {
// //             if (Howler.ctx && Howler.ctx.state === 'suspended') {
// //                 Howler.ctx.resume();
// //             }
// //             // Clean up listeners after the first interaction
// //             document.body.removeEventListener('click', unlockAudio);
// //             document.body.removeEventListener('touchstart', unlockAudio);
// //         };
        
// //         document.body.addEventListener('click', unlockAudio);
// //         document.body.addEventListener('touchstart', unlockAudio);

// //         return () => {
// //             document.body.removeEventListener('click', unlockAudio);
// //             document.body.removeEventListener('touchstart', unlockAudio);
// //         }
// //     },[]);
// // };
// import { useEffect, useRef } from 'react';
// import useAuthStore from '../store/useAuthStore';
// import useNotificationStore from '../store/useNotificationStore';
// import io from 'socket.io-client';
// import { Howl, Howler } from 'howler';

// export const useNotificationsSocket = () => {
//     const { userInfo } = useAuthStore();
//     const { addNotification, fetchNotifications } = useNotificationStore();
//     const notificationSound = useRef(null);

//     // 1. Initialize the sound
//     useEffect(() => {
//         notificationSound.current = new Howl({
//             src: ['/notification.mp3'],
//             volume: 0.6,
//         });
//     }, []);

//     // 2. Manage the WebSocket connection
//     useEffect(() => {
//         if (!userInfo) return;

//         fetchNotifications();

//         // --- UPDATED: Using the environment variable ---
//         const socket = io(import.meta.env.VITE_API_BASE_URL, {
//             transports: ['websocket'],
//             rejectUnauthorized: false
//         });

//         socket.on('connect', () => {
//             console.log('WebSocket connected:', socket.id);
//             socket.emit('join', userInfo._id);
//         });

//         socket.on('new_notification', (notification) => {
//             addNotification(notification);
//             if (notificationSound.current) {
//                 notificationSound.current.play();
//             }
//         });

//         socket.on('connect_error', (err) => console.error("WebSocket Connection Error:", err.message));

//         return () => socket.disconnect();
//     }, [userInfo, addNotification, fetchNotifications]);
    
//     // 3. Unlock audio on first user interaction
//     useEffect(() => {
//         const unlockAudio = () => {
//             if (Howler.ctx && Howler.ctx.state === 'suspended') {
//                 Howler.ctx.resume();
//             }
//             document.body.removeEventListener('click', unlockAudio);
//             document.body.removeEventListener('touchstart', unlockAudio);
//         };
        
//         document.body.addEventListener('click', unlockAudio);
//         document.body.addEventListener('touchstart', unlockAudio);

//         return () => {
//             document.body.removeEventListener('click', unlockAudio);
//             document.body.removeEventListener('touchstart', unlockAudio);
//         }
//     },[]);
// };
import { useEffect, useRef } from 'react';
import useAuthStore from '../store/useAuthStore';
import useNotificationStore from '../store/useNotificationStore';
import io from 'socket.io-client';
import { Howl, Howler } from 'howler';

export const useNotificationsSocket = () => {
    const { userInfo } = useAuthStore();
    const { addNotification, fetchNotifications } = useNotificationStore();
    const notificationSound = useRef(null);

    // 1. Initialize the sound
    useEffect(() => {
        notificationSound.current = new Howl({
            src: ['/notification.mp3'], // Sound file in your /public folder
            volume: 0.6,
        });
    }, []);

    // 2. Manage the WebSocket connection and play sound
    useEffect(() => {
        if (!userInfo) return;

        fetchNotifications();

        const socket = io(import.meta.env.VITE_API_BASE_URL, {
            transports: ['websocket'],
            rejectUnauthorized: false
        });

        socket.on('connect', () => {
            console.log('WebSocket connected:', socket.id);
            socket.emit('join', userInfo._id);
        });

        socket.on('new_notification', (notification) => {
            addNotification(notification);
            // --- THIS IS THE SOUND LOGIC ---
            if (notificationSound.current) {
                notificationSound.current.play();
            }
        });

        socket.on('connect_error', (err) => console.error("WebSocket Connection Error:", err.message));

        return () => socket.disconnect();
    }, [userInfo, addNotification, fetchNotifications]);
    
    // 3. Unlock audio on first user interaction
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
};