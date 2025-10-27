import apiClient from '../api/axiosConfig';

const VAPID_PUBLIC_KEY ='BBwTXZ3ZI4uP5GbwC6eAz8-MWH_0PTTBcmIAbSBbN5LJD6WjGFkmSc4liHhDrvLKG3PiVxOdnSnmEbVCn9HmmwQ'; // ⚠️ Paste your actual public key here

// Helper function required by the browser
const urlBase64ToUint8Array = (base64String) => {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
};

// Checks if the user is currently subscribed
export const getSubscription = async () => {
    if ('serviceWorker' in navigator) {
        const registration = await navigator.serviceWorker.ready;
        return await registration.pushManager.getSubscription();
    }
    return null;
};

// Subscribes the user
export const subscribeUser = async () => {
    const registration = await navigator.serviceWorker.ready;
    const applicationServerKey = urlBase64ToUint8Array(VAPID_PUBLIC_KEY);
    
    const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey,
    });
    
    await apiClient.post('/api/subscribe', subscription);
    return subscription;
};

// Unsubscribes the user
export const unsubscribeUser = async () => {
    const subscription = await getSubscription();
    if (subscription) {
        await apiClient.post('/api/unsubscribe', subscription.toJSON());
        await subscription.unsubscribe();
    }
};