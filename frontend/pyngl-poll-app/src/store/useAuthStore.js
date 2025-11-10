import { create } from "zustand";
import apiClient from "../api/axiosConfig";

const API_URL = "/api/users";

const useAuthStore = create((set) => ({
  isInitialized: false,
  userInfo: null,
  loading: false,
  error: null,

  // ✅ FIXED: Check BOTH localStorage AND server session
  checkUserStatus: async () => {
    try {
      // First, try to get user from localStorage
      const storedUser = localStorage.getItem("userInfo");
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          set({ userInfo: parsedUser, isInitialized: true });
          return; // User found in localStorage, we're done
        } catch (e) {
          console.error("Failed to parse stored user:", e);
          localStorage.removeItem("userInfo");
        }
      }

      // If no localStorage user, check server session
      const { data } = await apiClient.get('/api/users/status', { 
        withCredentials: true 
      });
      
      if (data.user) {
        // Sync server session to localStorage
        localStorage.setItem("userInfo", JSON.stringify(data.user));
        set({ userInfo: data.user, isInitialized: true });
      } else {
        set({ userInfo: null, isInitialized: true });
      }
    } catch (error) {
      console.error('User status check failed:', error);
      set({ userInfo: null, isInitialized: true });
    }
  },

  finishLoading: () => set({ loading: false }),
  clearError: () => set({ error: null }),

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const { data } = await apiClient.post(`${API_URL}/login`, { 
        email, 
        password 
      }, {
        withCredentials: true // ✅ CRITICAL: Include credentials
      });
      
      // Save to both localStorage and state
      localStorage.setItem("userInfo", JSON.stringify(data));
      set({ userInfo: data, loading: false });
      
      return data; // ✅ Return data for success handling
    } catch (error) {
      const message = error.response?.data?.message || "An unexpected error occurred.";
      set({ error: message, loading: false });
      throw new Error(message);
    }
  },

  register: async (userData) => {
    set({ loading: true, error: null });
    try {
      const { data } = await apiClient.post(`${API_URL}/register`, userData, {
        withCredentials: true // ✅ CRITICAL: Include credentials
      });
      
      // Save to both localStorage and state
      localStorage.setItem("userInfo", JSON.stringify(data));
      set({ userInfo: data, loading: false });
      
      return data; // ✅ Return data for success handling
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Registration failed.";
      set({ error: errorMessage, loading: false });
      throw new Error(errorMessage);
    }
  },

  forgotPassword: async (email) => {
    set({ loading: true, error: null });
    try {
      await apiClient.post(`${API_URL}/forgotpassword`, { email });
      set({ loading: false });
    } catch (error) {
      const message = error.response?.data?.message || "Failed to send OTP";
      set({ loading: false, error: message });
      throw new Error(message);
    }
  },

  resetPassword: async (email, otp, password) => {
    set({ loading: true, error: null });
    try {
      await apiClient.put(`${API_URL}/resetpassword`, { email, otp, password });
      set({ loading: false });
    } catch (error) {
      const message = error.response?.data?.message || "Failed to reset password. Invalid OTP?";
      set({ loading: false, error: message });
      throw new Error(message);
    }
  },

  updateUserInfo: (newInfo) => {
    localStorage.setItem("userInfo", JSON.stringify(newInfo));
    set({ userInfo: newInfo });
  },

  logout: async () => {
    try {
      await apiClient.post(`${API_URL}/logout`, {}, {
        withCredentials: true // ✅ Include credentials
      });
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      localStorage.removeItem("userInfo");
      set({ userInfo: null });
    }
  },
}));

export default useAuthStore;