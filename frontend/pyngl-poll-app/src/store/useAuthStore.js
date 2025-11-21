// // import { create } from "zustand";
// // import apiClient from "../api/axiosConfig";

// // const API_URL = "/api/users";

// // const useAuthStore = create((set, get) => ({
// //   isInitialized: false,
// //   userInfo: null,
// //   loading: false,
// //   error: null,

// //   // ✅ Check current session (local + cookie)
// //   checkUserStatus: async () => {
// //     try {
// //       const { userInfo } = get();
// //       if (userInfo) return; // Don't overwrite if already logged in

// //       // 🔹 Check localStorage first
// //       const storedUser = localStorage.getItem("userInfo");
// //       if (storedUser) {
// //         try {
// //           const parsed = JSON.parse(storedUser);
// //           set({ userInfo: parsed, isInitialized: true });
// //           return;
// //         } catch {
// //           localStorage.removeItem("userInfo");
// //         }
// //       }

// //       // 🔹 Check backend (cookie session)
// //       const { data } = await apiClient.get(`${API_URL}/status`, {
// //         withCredentials: true,
// //       });

// //       // ✅ FIX: unwrap `data.user`
// //       if (data?.user) {
// //         localStorage.setItem("userInfo", JSON.stringify(data.user));
// //         set({ userInfo: data.user, isInitialized: true });
// //       } else {
// //         set({ userInfo: null, isInitialized: true });
// //       }
// //     } catch (error) {
// //       console.error("❌ User status check failed:", error);
// //       set({ userInfo: null, isInitialized: true });
// //     }
// //   },

// //   finishLoading: () => set({ loading: false }),
// //   clearError: () => set({ error: null }),

// //   // ✅ Login
// //   login: async (email, password) => {
// //     const { loading } = get();
// //     if (loading) return;

// //     set({ loading: true, error: null });

// //     try {
// //       // 1️⃣ Login request
// //       const response = await apiClient.post(
// //         `${API_URL}/login`,
// //         { email, password },
// //         { withCredentials: true }
// //       );

// //       // ✅ FIX: the backend returns only user object (not { user: ... })
// //       const userData = response?.data;
// //       if (!userData) throw new Error("Empty response from server");

// //       // 2️⃣ Save locally
// //       localStorage.setItem("userInfo", JSON.stringify(userData));
// //       set({ userInfo: userData, loading: false, error: null });

// //       // 3️⃣ Wait for cookie to sync (to allow backend to read it)
// //       await new Promise((resolve) => setTimeout(resolve, 1000));

// //       // 4️⃣ Verify session again
// //       const { data: statusData } = await apiClient.get(`${API_URL}/status`, {
// //         withCredentials: true,
// //       });

// //       if (statusData?.user) {
// //         localStorage.setItem("userInfo", JSON.stringify(statusData.user));
// //         set({ userInfo: statusData.user });
// //       }

// //       return userData;
// //     } catch (error) {
// //       const message =
// //         error.response?.data?.error ||
// //         error.response?.data?.message ||
// //         "Login failed. Please try again.";
// //       console.error("❌ Login error:", message);
// //       set({ error: message, loading: false });
// //       throw new Error(message);
// //     }
// //   },

// //   // ✅ Register
// //   register: async (userData) => {
// //     const { loading } = get();
// //     if (loading) return;

// //     set({ loading: true, error: null });

// //     try {
// //       const response = await apiClient.post(`${API_URL}/register`, userData, {
// //         withCredentials: true,
// //       });

// //       // ✅ FIX: unwrap actual user object
// //       const newUser = response?.data;
// //       localStorage.setItem("userInfo", JSON.stringify(newUser));
// //       set({ userInfo: newUser, loading: false, error: null });

// //       // Wait for cookie to sync
// //       await new Promise((resolve) => setTimeout(resolve, 1000));

// //       // Verify session
// //       const { data: statusData } = await apiClient.get(`${API_URL}/status`, {
// //         withCredentials: true,
// //       });

// //       if (statusData?.user) {
// //         localStorage.setItem("userInfo", JSON.stringify(statusData.user));
// //         set({ userInfo: statusData.user });
// //       }

// //       return newUser;
// //     } catch (err) {
// //       const message =
// //         err.response?.data?.error ||
// //         err.response?.data?.message ||
// //         "Registration failed.";
// //       console.error("❌ Registration error:", message);
// //       set({ error: message, loading: false });
// //       throw new Error(message);
// //     }
// //   },

// //   // ✅ Logout
// //   logout: async () => {
// //     try {
// //       await apiClient.post(`${API_URL}/logout`, {}, { withCredentials: true });
// //     } catch (error) {
// //       console.warn("⚠️ Logout request failed:", error.message);
// //     } finally {
// //       localStorage.removeItem("userInfo");
// //       set({ userInfo: null, error: null });
// //     }
// //   },
// // }));

// // export default useAuthStore;

// import { create } from "zustand";
// import apiClient from "../api/axiosConfig";

// const API_URL = "/api/users";

// const useAuthStore = create((set, get) => ({
//   isInitialized: false,
//   userInfo: null,
//   loading: false,
//   error: null,

//   // ✅ Check current session (local + cookie)
//   checkUserStatus: async () => {
//     try {
//       const { userInfo } = get();
//       if (userInfo) return; // Don't overwrite if already logged in

//       // 🔹 Check localStorage first
//       const storedUser = localStorage.getItem("userInfo");
//       if (storedUser) {
//         try {
//           const parsed = JSON.parse(storedUser);
//           set({ userInfo: parsed, isInitialized: true });
//           return;
//         } catch {
//           localStorage.removeItem("userInfo");
//         }
//       }

//       // 🔹 Check backend (cookie session)
//       const { data } = await apiClient.get(`${API_URL}/status`, {
//         withCredentials: true,
//       });

//       // ✅ FIX: unwrap `data.user`
//       if (data?.user) {
//         localStorage.setItem("userInfo", JSON.stringify(data.user));
//         set({ userInfo: data.user, isInitialized: true });
//       } else {
//         set({ userInfo: null, isInitialized: true });
//       }
//     } catch (error) {
//       console.error("❌ User status check failed:", error);
//       set({ userInfo: null, isInitialized: true });
//     }
//   },

//   finishLoading: () => set({ loading: false }),
//   clearError: () => set({ error: null }),

//   // ✅ Login
// login: async (email, password) => {
//   const { loading } = get();
//   if (loading) return;

//   set({ loading: true, error: null });

//   try {
//     const response = await apiClient.post(
//       `${API_URL}/login`,
//       { email, password },
//       { withCredentials: true }
//     );

//     // FIX: unwrap ONLY the actual user
//     const userData = response?.data?.user;
//     console.log("🚀 ~ userData:", userData)
//     if (!userData) {
//       throw new Error("Invalid email or password");
//     }

//     localStorage.setItem("userInfo", JSON.stringify(userData));
//     set({ userInfo: userData, loading: false, error: null });

//     return userData;
//   } catch (error) {
//     const message =
//       error.response?.data?.error ||
//       error.response?.data?.message ||
//       "Invalid email or password";

//     set({ error: message, loading: false });
//     throw new Error(message);
//   }
// },


//   // ✅ Register
// register: async (userData) => {
//   const { loading } = get();
//   if (loading) return;

//   set({ loading: true, error: null });

//   try {
//     const response = await apiClient.post(`${API_URL}/register`, userData, {
//       withCredentials: true,
//     });

//     // ✅ FIX: unwrap actual user object
//     const newUser = response?.data;
//     localStorage.setItem("userInfo", JSON.stringify(newUser));
//     set({ userInfo: newUser, loading: false, error: null });

//     // Wait for cookie to sync
//     await new Promise((resolve) => setTimeout(resolve, 1000));

//     // Verify session
//     const { data: statusData } = await apiClient.get(`${API_URL}/status`, {
//       withCredentials: true,
//     });

//     if (statusData?.user) {
//       localStorage.setItem("userInfo", JSON.stringify(statusData.user));
//       set({ userInfo: statusData.user });
//     }

//     return newUser;
//   } catch (err) {
//     const message =
//       err.response?.data?.error ||
//       err.response?.data?.message ||
//       "Registration failed.";
//     console.error("❌ Registration error:", message);
//     set({ error: message, loading: false });
//     throw new Error(message);
//   }
// },

//   // ✅ Forgot Password (Send OTP)
//   forgotPassword: async (email) => {
//     const { loading } = get();
//     if (loading) return;

//     set({ loading: true, error: null });

//     try {
//       // Updated to match backend: POST /api/users/forgotpassword
//       await apiClient.post(`${API_URL}/forgotpassword`, { email });
//       set({ loading: false, error: null });
//     } catch (error) {
//       const message =
//         error.response?.data?.error ||
//         error.response?.data?.message ||
//         "Failed to send OTP. Please try again.";
//       console.error("❌ Forgot password error:", message);
//       set({ error: message, loading: false });
//       throw new Error(message);
//     }
//   },

//   // ✅ Reset Password (Verify OTP + Set New Password)
//   resetPassword: async (email, otp, password) => {
//     const { loading } = get();
//     if (loading) return;

//     set({ loading: true, error: null });

//     try {
//       // Updated to match backend: PUT /api/users/resetpassword
//       await apiClient.put(`${API_URL}/resetpassword`, {
//         email,
//         otp,
//         password,
//       });
//       set({ loading: false, error: null });
//     } catch (error) {
//       const message =
//         error.response?.data?.error ||
//         error.response?.data?.message ||
//         "Password reset failed. Please check your OTP.";
//       console.error("❌ Reset password error:", message);
//       set({ error: message, loading: false });
//       throw new Error(message);
//     }
//   },
//   // ✅ Logout
// logout: async () => {
//   try {
//     await apiClient.post(`${API_URL}/logout`, {}, { withCredentials: true });
//   } catch (error) {
//     console.warn("⚠️ Logout request failed:", error.message);
//   } finally {
//     localStorage.removeItem("userInfo");
//     set({ userInfo: null, error: null });
//   }
// },
// }));

// export default useAuthStore;
import { create } from "zustand";
import apiClient from "../api/axiosConfig";

const API_URL = "/api/users";

const useAuthStore = create((set, get) => ({
  isInitialized: false,
  userInfo: null,
  loading: false,
  error: null,

  // ✅ Check current session (local + cookie)
  checkUserStatus: async () => {
    try {
      // ✅ CRITICAL FIX: Stop if we have already checked status once.
      // This prevents the infinite loop/blinking.
      const { isInitialized, userInfo } = get();
      if (isInitialized) return; 

      // 🔹 Check localStorage first
      const storedUser = localStorage.getItem("userInfo");
      if (storedUser) {
        try {
          const parsed = JSON.parse(storedUser);
          set({ userInfo: parsed, isInitialized: true });
          return;
        } catch {
          localStorage.removeItem("userInfo");
        }
      }

      // 🔹 Check backend (cookie session)
      // We wrap this in a try/catch specifically for the request to ensure isInitialized is always set
      try {
        const { data } = await apiClient.get(`${API_URL}/status`, {
          withCredentials: true,
        });

        if (data?.user) {
          localStorage.setItem("userInfo", JSON.stringify(data.user));
          set({ userInfo: data.user, isInitialized: true });
        } else {
          set({ userInfo: null, isInitialized: true });
        }
      } catch (apiError) {
        // If the backend fails or returns 401, we still mark initialization as done
        console.warn("Session check failed or no active session");
        set({ userInfo: null, isInitialized: true });
      }

    } catch (error) {
      console.error("❌ User status check failed:", error);
      // Even on fatal error, mark initialized to stop infinite loops
      set({ userInfo: null, isInitialized: true });
    }
  },

  finishLoading: () => set({ loading: false }),
  clearError: () => set({ error: null }),

  // ✅ Login
  login: async (email, password) => {
    const { loading } = get();
    if (loading) return;

    set({ loading: true, error: null });

    try {
      const response = await apiClient.post(
        `${API_URL}/login`,
        { email, password },
        { withCredentials: true }
      );

      // FIX: unwrap ONLY the actual user
      const userData = response?.data?.user;
      console.log("🚀 ~ userData:", userData)
      if (!userData) {
        throw new Error("Invalid email or password");
      }

      localStorage.setItem("userInfo", JSON.stringify(userData));
      set({ userInfo: userData, loading: false, error: null });

      return userData;
    } catch (error) {
      const message =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Invalid email or password";

      set({ error: message, loading: false });
      throw new Error(message);
    }
  },

  // ✅ Register
  register: async (userData) => {
    const { loading } = get();
    if (loading) return;

    set({ loading: true, error: null });

    try {
      const response = await apiClient.post(`${API_URL}/register`, userData, {
        withCredentials: true,
      });

      // ✅ FIX: unwrap actual user object
      const newUser = response?.data;
      localStorage.setItem("userInfo", JSON.stringify(newUser));
      set({ userInfo: newUser, loading: false, error: null });

      // Wait for cookie to sync
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Verify session
      const { data: statusData } = await apiClient.get(`${API_URL}/status`, {
        withCredentials: true,
      });

      if (statusData?.user) {
        localStorage.setItem("userInfo", JSON.stringify(statusData.user));
        set({ userInfo: statusData.user });
      }

      return newUser;
    } catch (err) {
      const message =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Registration failed.";
      console.error("❌ Registration error:", message);
      set({ error: message, loading: false });
      throw new Error(message);
    }
  },

  // ✅ Forgot Password (Send OTP)
  forgotPassword: async (email) => {
    const { loading } = get();
    if (loading) return;

    set({ loading: true, error: null });

    try {
      await apiClient.post(`${API_URL}/forgotpassword`, { email });
      set({ loading: false, error: null });
    } catch (error) {
      const message =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Failed to send OTP. Please try again.";
      console.error("❌ Forgot password error:", message);
      set({ error: message, loading: false });
      throw new Error(message);
    }
  },

  // ✅ Reset Password
  resetPassword: async (email, otp, password) => {
    const { loading } = get();
    if (loading) return;

    set({ loading: true, error: null });

    try {
      await apiClient.put(`${API_URL}/resetpassword`, {
        email,
        otp,
        password,
      });
      set({ loading: false, error: null });
    } catch (error) {
      const message =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Password reset failed. Please check your OTP.";
      console.error("❌ Reset password error:", message);
      set({ error: message, loading: false });
      throw new Error(message);
    }
  },

  // ✅ Logout
  logout: async () => {
    try {
      await apiClient.post(`${API_URL}/logout`, {}, { withCredentials: true });
    } catch (error) {
      console.warn("⚠️ Logout request failed:", error.message);
    } finally {
      localStorage.removeItem("userInfo");
      // Reset initialization so a future login can re-check if needed
      set({ userInfo: null, error: null, isInitialized: true }); 
    }
  },
}));

export default useAuthStore;