// // import { create } from 'zustand';
// // import apiClient from '../api/axiosConfig';

// // const useNotificationStore = create((set, get) => ({
// //     notifications: [],
// //     unreadCount: 0,
    
// //     fetchNotifications: async () => {
// //         try {
// //             const { data } = await apiClient.get('/api/notifications');
// //             set({ notifications: data });
// //             const unread = data.filter(n => !n.read).length;
// //             set({ unreadCount: unread });
// //         } catch (error) {
// //             console.error("Failed to fetch notifications:", error);
// //         }
// //     },

// //     addNotification: (notification) => {
// //         set(state => ({
// //             notifications: [notification, ...state.notifications],
// //             unreadCount: state.unreadCount + 1
// //         }));
// //     },

// //     markAsRead: async () => {
// //         if (get().unreadCount === 0) return;
// //         try {
// //             await apiClient.post('/api/notifications/mark-as-read');
// //             set(state => ({
// //                 notifications: state.notifications.map(n => ({ ...n, read: true })),
// //                 unreadCount: 0
// //             }));
// //         } catch (error) {
// //             console.error("Failed to mark notifications as read:", error);
// //         }
// //     },
// // }));

// // export default useNotificationStore;

// import { create } from 'zustand';
// import apiClient from '../api/axiosConfig';

// const useNotificationStore = create((set, get) => ({
//     notifications: [],
//     unreadCount: 0,
    
//     // This function fetches the initial list of notifications when the app loads.
//     fetchNotifications: async () => {
//         try {
//             const { data } = await apiClient.get('/api/notifications');
//             set({ notifications: data });
//             const unread = data.filter(n => !n.read).length;
//             set({ unreadCount: unread });
//         } catch (error) {
//             console.error("Failed to fetch notifications:", error);
//         }
//     },

//     // This function is called by the WebSocket when a new, single notification arrives.
//     addNotification: (notification) => {
//         set(state => ({
//             notifications: [notification, ...state.notifications],
//             unreadCount: state.unreadCount + 1
//         }));
//     },

//     // ✅ UPDATED: This function now uses an "optimistic update" for a faster UX.
//     markAsRead: async () => {
//         // If there's nothing to mark as read, don't do anything.
//         if (get().unreadCount === 0) return;
        
//         // 1. Store the current state in case we need to revert on error.
//         const previousState = get();

//         // 2. Optimistically update the UI immediately.
//         //    The user sees the change instantly, without waiting for the server.
//         set(state => ({
//             notifications: state.notifications.map(n => ({ ...n, read: true })),
//             unreadCount: 0
//         }));

//         // 3. Send the request to the server in the background.
//         try {
//             await apiClient.post('/api/notifications/mark-as-read');
//         } catch (error) {
//             console.error("Failed to mark notifications as read on the server:", error);
//             // If the server fails, revert the UI back to its original state.
//             set(previousState);
//         }
//     },handleNotificationClick: async (notification) => {
//         if (notification.read) {
//             return; 
//         }
//         const { notifications, unreadCount } = get();
//         set({
//             notifications: notifications.map(n => 
//                 n._id === notification._id ? { ...n, read: true } : n
//             ),
//             unreadCount: unreadCount - 1
//         });
//         try {
//             await apiClient.put(`/api/notifications/${notification._id}/read`);
//         } catch (error) {
//             console.error("Failed to mark single notification as read:", error);
//             set({ notifications, unreadCount }); // Revert on error
//             toast.error("Could not update notification status.");
//         }
//     },
// }));

// export default useNotificationStore;

import { create } from 'zustand';
import apiClient from '../api/axiosConfig';
import { toast } from 'react-hot-toast';

const useNotificationStore = create((set, get) => ({
    notifications: [],
    unreadCount: 0,
    
    fetchNotifications: async () => {
        try {
            const { data } = await apiClient.get('/api/notifications');
            set({ notifications: data });
            const unread = data.filter(n => !n.read).length;
            set({ unreadCount: unread });
        } catch (error) {
            console.error("Failed to fetch notifications:", error);
        }
    },

    addNotification: (notification) => {
        set(state => ({
            notifications: [notification, ...state.notifications],
            unreadCount: state.unreadCount + 1
        }));
    },

    markAsRead: async () => {
        if (get().unreadCount === 0) return;
        const previousState = get();
        set(state => ({
            notifications: state.notifications.map(n => ({ ...n, read: true })),
            unreadCount: 0
        }));
        try {
            await apiClient.post('/api/notifications/mark-as-read');
        } catch (error) {
            console.error("Failed to mark all notifications as read:", error);
            set(previousState); // Revert on error
        }
    },

    // ✅ NEW: Action to handle clicking and marking a single notification as read
    handleNotificationClick: async (notification) => {
        // If the notification is already read, we don't need to do anything
        if (notification.read) {
            return;
        }

        const { notifications, unreadCount } = get();

        // Optimistically update the UI for a faster, smoother experience
        set({
            notifications: notifications.map(n => 
                n._id === notification._id ? { ...n, read: true } : n
            ),
            unreadCount: Math.max(0, unreadCount - 1)
        });

        try {
            // Tell the backend to mark it as read in the database
            await apiClient.put(`/api/notifications/${notification._id}/read`);
        } catch (error) {
            console.error("Failed to mark single notification as read:", error);
            // If the API call fails, revert the state to show it as unread again
            set({ notifications, unreadCount });
            toast.error("Could not update notification status.");
        }
    },
     deleteNotification: async (notificationId) => {
        const { notifications, unreadCount } = get();
        
        // Find the notification to be deleted to check if it was unread
        const notificationToDelete = notifications.find(n => n._id === notificationId);
        const wasUnread = notificationToDelete && !notificationToDelete.read;

        // Optimistically update the UI for an instant response
        set(state => ({
            notifications: state.notifications.filter(n => n._id !== notificationId),
            // Decrement unread count only if the deleted notification was unread
            unreadCount: wasUnread ? Math.max(0, state.unreadCount - 1) : state.unreadCount
        }));

        try {
            // Call the backend to delete the notification from the database
            await apiClient.delete(`/api/notifications/${notificationId}`);
        } catch (error) {
            console.error("Failed to delete notification:", error);
            // If the API call fails, revert the state and show an error
            set({ notifications, unreadCount });
            toast.error("Could not remove notification.");
        }
    },
}));

export default useNotificationStore;

