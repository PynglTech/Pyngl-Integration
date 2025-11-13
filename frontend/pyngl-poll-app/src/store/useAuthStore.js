import { create } from 'zustand';
import apiClient from '../api/axiosConfig'; // Use your central API client

const API_URL = '/api/users';

const useAuthStore = create((set) => ({
    isInitialized: false, 
    userInfo: null,
    loading: false,
    error: null,

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

    finishLoading: () => set({ loading: false }),
    clearError: () => set({ error: null }),

    login: async (email, password) => {
        set({ loading: true, error: null });
        try {
            const { data } = await apiClient.post(`${API_URL}/login`, { email, password });
            localStorage.setItem('userInfo', JSON.stringify(data));
            set({ userInfo: data });
        } catch (error) {
            const message = error.response?.data?.message || 'An unexpected error occurred.';
            set({ error: message, loading: false });
            throw new Error(message);
        }
    },

  register: async (userData) => { // 1. Ensure 'birthDate' is an argument here
    set({ loading: true, error: null });
    try {
           console.log("DATA SENT:", userData);
            // 2. Pass that object directly to the backend
            const { data } = await apiClient.post('/api/users/register', userData);
      
      set({ userInfo: data, loading: false });
      // You might want to navigate the user or store a token here
      
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Registration failed.';
      set({ error: errorMessage, loading: false });
      throw new Error(errorMessage);
    }
  },
  forgotPassword: async (email) => {

        set({ loading: true, error: null });

        try {

            // Use apiClient, not fetch

            await apiClient.post(`${API_URL}/forgotpassword`, { email });

           

            set({ loading: false });

        } catch (error) {
        console.log("🚀 ~ error:", error)

            // Use the same error handling as your login function

            const message = error.response?.data?.message || 'Failed to send OTP';

            set({ loading: false, error: message });

            throw new Error(message);

        }

    },
  resetPassword: async (email, otp, password) => {
        set({ loading: true, error: null });
        try {
            // Use apiClient, not fetch
            await apiClient.put(`${API_URL}/resetpassword`, { email, otp, password });

            set({ loading: false });
        } catch (error) { // <-- FIX: Added opening brace
            // This code is now correctly inside the catch block
            const message = error.response?.data?.message || 'Failed to reset password. Invalid OTP?';
            set({ loading: false, error: message });
            throw new Error(message);
        } // <-- FIX: Added closing brace
    },

    // ✅ NEW: Function to update user info in the global state and localStorage
    updateUserInfo: (newInfo) => {
        localStorage.setItem('userInfo', JSON.stringify(newInfo));
        set({ userInfo: newInfo });
    },

    logout: async () => {
        try {
            await apiClient.post(`${API_URL}/logout`);
        } catch (error) {
            console.error('Logout failed:', error);
        } finally {
            localStorage.removeItem('userInfo');
            set({ userInfo: null });
        }
        
    },
    
}));

useAuthStore.getState().initializeApp();
export default useAuthStore;

