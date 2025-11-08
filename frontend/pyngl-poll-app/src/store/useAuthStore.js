import { create } from "zustand";
import apiClient from "../api/axiosConfig";

const API_URL = "/api/users";

const useAuthStore = create((set) => ({
  isInitialized: false,
  userInfo: null,
  loading: false,
  error: null,

  // ✅ Check user session from cookie (Render)
  checkUserStatus: async () => {
    set({ loading: true, error: null });
    try {
      const { data } = await apiClient.get(`${API_URL}/status`);
      if (data?.user) {
        localStorage.setItem("userInfo", JSON.stringify(data.user));
        set({ userInfo: data.user, isInitialized: true, loading: false });
      } else {
        localStorage.removeItem("userInfo");
        set({ userInfo: null, isInitialized: true, loading: false });
      }
    } catch (error) {
      console.error("checkUserStatus error:", error);
      set({ userInfo: null, isInitialized: true, loading: false });
    }
  },

  finishLoading: () => set({ loading: false }),
  clearError: () => set({ error: null }),

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const { data } = await apiClient.post(`${API_URL}/login`, { email, password });
      localStorage.setItem("userInfo", JSON.stringify(data));
      set({ userInfo: data, loading: false });
    } catch (error) {
      const message = error.response?.data?.message || "An unexpected error occurred.";
      set({ error: message, loading: false });
      throw new Error(message);
    }
  },

  register: async (userData) => {
    set({ loading: true, error: null });
    try {
      const { data } = await apiClient.post(`${API_URL}/register`, userData);
      localStorage.setItem("userInfo", JSON.stringify(data));
      set({ userInfo: data, loading: false });
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
      await apiClient.post(`${API_URL}/logout`);
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      localStorage.removeItem("userInfo");
      set({ userInfo: null });
    }
  },
}));

export default useAuthStore;
