import { create } from 'zustand';
import apiClient from '../api/axiosConfig'; // 1. Import your new apiClient

// Use a relative path
const API_URL = '/api/users';

const useAuthStore = create((set) => ({
    isInitialized: false, 
    userInfo: null,
    loading: false,
    error: null,

    // Checks for existing user session on app startup
    initializeApp: () => {
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            if (userInfo) {
                set({ userInfo });
            }
        } catch (error) {
            console.error("Failed to parse user info from localStorage", error);
            localStorage.removeItem('userInfo');
        }
        set({ isInitialized: true });
    },

    // Called by the UI to turn off the main loading spinner
    finishLoading: () => set({ loading: false }),

    clearError: () => set({ error: null }),

      login: async (email, password) => {
        set({ loading: true, error: null });
        try {
            // 2. Use apiClient instead of axios
            const { data } = await apiClient.post(`${API_URL}/login`, { email, password });
            localStorage.setItem('userInfo', JSON.stringify(data));
            set({ userInfo: data });
        } catch (error) {
            const message = error.response?.data?.message || 'An unexpected error occurred.';
            set({ error: message, loading: false });
            throw new Error(message);
        }
    },

    register: async (username, email, password, phoneNumber) => {
        set({ loading: true, error: null });
        try {
            // 2. Use apiClient instead of axios
            const { data } = await apiClient.post(`${API_URL}/register`, { username, email, password, phoneNumber });
            localStorage.setItem('userInfo', JSON.stringify(data));
            set({ userInfo: data });
        } catch (error) {
            // ... (error handling)
        }
    },

    logout: async () => {
        try {
            // 2. Use apiClient instead of axios
            await apiClient.post(`${API_URL}/logout`);
        } catch (error) {
            console.error('Logout failed:', error);
        } finally {
            localStorage.removeItem('userInfo');
            set({ userInfo: null });
        }
    },
    forgotPassword: async (email) => {
        set({ loading: true, error: null });
        try {
            await axios.post(`${API_URL}/forgotpassword`, { email });
            set({ loading: false });
        } catch (error) {
            const message = error.response?.data?.message || 'An unexpected error occurred.';
            set({ error: message, loading: false });
            throw new Error(message);
        }
    },

    resetPassword: async (email, otp, password) => {
        set({ loading: true, error: null });
        try {
            await axios.put(`${API_URL}/resetpassword`, { email, otp, password });
            set({ loading: false });
        } catch (error) {
            const message = error.response?.data?.message || 'An unexpected error occurred.';
            set({ error: message, loading: false });
            throw new Error(message);
        }
    },

     
}));
// Initialize the app state once, right after the store is defined
useAuthStore.getState().initializeApp();
export default useAuthStore;    