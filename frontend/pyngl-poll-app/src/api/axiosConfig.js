// // import axios from 'axios';
// // import useAuthStore from '../store/useAuthStore';

// // // Create a new Axios instance
// // const apiClient = axios.create({
// //     baseURL: '', // The Vite proxy handles the full URL, so this can be empty
// //     withCredentials: true, // This is the crucial part that sends cookies
// // });

// // // 🔥 BONUS: Add an interceptor for global 401 error handling
// // apiClient.interceptors.response.use(
// //     (response) => response, // Directly return a successful response
// //     (error) => {
// //         // Check if the error is a 401 Unauthorized
// //         if (error.response && error.response.status === 401) {
// //             // Use the global logout function from your Zustand store
// //             // This prevents an infinite loop if the logout call itself fails
// //             if (!error.config.url.includes('/logout')) {
// //                 useAuthStore.getState().logout();
// //                 window.location.href = '/'; // Redirect to the login page
// //             }
// //         }
// //         // Return any other error so that individual components can handle it
// //         return Promise.reject(error);
// //     }
// // );


// // export default apiClient;
// import axios from 'axios';
// import useAuthStore from '../store/useAuthStore';

// // ✅ Dynamic API base URL
// const baseURL =
//   import.meta.env.MODE === 'development'
//     ? 'https://pyngl-integration-backend.onrender.com' // your local dev backend
//     : import.meta.env.VITE_API_URL; // Render backend for production

// // ✅ Create Axios instance
// const apiClient = axios.create({
//   baseURL: "https://pyngl-integration-backend.onrender.com",
//   withCredentials: true   // ⬅ IMPORTANT
// });
// // ✅ Global interceptor for 401 Unauthorized
// apiClient.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       useAuthStore.getState().logout();
//       window.location.href = '/';
//     }
//     return Promise.reject(error);
//   }
// );

// export default apiClient;


import axios from 'axios';
import useAuthStore from '../store/useAuthStore';

// Determine correct BASE URL
const baseURL =
  import.meta.env.MODE === "development"
    ? ["https://pyngl-integration-backend.onrender.com", 'https://pyngl-integration-backend.onrender.com'] // or localhost
    : import.meta.env.VITE_API_URL;

// Create API client
const apiClient = axios.create({
  baseURL: "https://pyngl-integration-backend.onrender.com",   // or your backend URL
  withCredentials: true
});

// Global 401 handler
// apiClient.interceptors.response.use(
//   (res) => res,
//   (err) => {
//     if (err.response?.status === 401) {
//       useAuthStore.getState().logout();
//       window.location.href = "/";
//     }
//     return Promise.reject(err);
//   }
// );

apiClient.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      // DO NOT REDIRECT ON LOGIN FAILURE
      useAuthStore.getState().logout();
    }
    return Promise.reject(err);
  }
);

export default apiClient;
