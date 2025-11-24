// import axios from 'axios';
// import useAuthStore from '../store/useAuthStore';

// // Create a new Axios instance
// const apiClient = axios.create({
//     baseURL: '', // The Vite proxy handles the full URL, so this can be empty
//     withCredentials: true, // This is the crucial part that sends cookies
// });

// // 🔥 BONUS: Add an interceptor for global 401 error handling
// apiClient.interceptors.response.use(
//     (response) => response, // Directly return a successful response
//     (error) => {
//         // Check if the error is a 401 Unauthorized
//         if (error.response && error.response.status === 401) {
//             // Use the global logout function from your Zustand store
//             // This prevents an infinite loop if the logout call itself fails
//             if (!error.config.url.includes('/logout')) {
//                 useAuthStore.getState().logout();
//                 window.location.href = '/'; // Redirect to the login page
//             }
//         }
//         // Return any other error so that individual components can handle it
//         return Promise.reject(error);
//     }
// );


// export default apiClient;
import axios from 'axios';
import useAuthStore from '../store/useAuthStore';

// Detect host (works for mobile + desktop)
const host = window.location.hostname;

let baseURL;

// Development mode
if (import.meta.env.MODE === "development") {
  if (host === "localhost") {
    baseURL = "http://localhost:5000";            // Desktop
  } else {
    baseURL = `http://${host}:5000`;              // Mobile on same WiFi
  }
}
// Production (Render)
else {
  baseURL = import.meta.env.VITE_API_URL;
}

// Create Axios instance
const apiClient = axios.create({
  baseURL,
  withCredentials: true,
});

// Global interceptor for 401
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      useAuthStore.getState().logout();
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default apiClient;


