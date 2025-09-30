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

// Create a new Axios instance. This will be the single source for all API calls.
const apiClient = axios.create({
    // The baseURL can be empty because your Vite proxy is already configured
    // to forward requests to your backend server.
    baseURL: '', 
    
    // This is the most critical setting. It tells Axios to automatically
    // send the httpOnly cookie with every single request to the backend.
    withCredentials: true, 
});

// 🔥 This is a "response interceptor" — a powerful piece of code that acts
// as a global security guard for your entire application. It inspects every
// response that comes back from your server.
apiClient.interceptors.response.use(
    // If the response is successful (e.g., status 200), just pass it through.
    (response) => response, 
    
    // If the response is an error...
    (error) => {
        // ...check if it's a "401 Unauthorized" error. This means the user's
        // login session has expired or is invalid.
        if (error.response && error.response.status === 401) {
            
            // Use the global logout function from your auth store.
            // This clears the user's data from the frontend.
            useAuthStore.getState().logout();
            
            // Redirect the user to the login page.
            window.location.href = '/'; 
        }
        
        // Return any other errors so that individual components can handle them.
        return Promise.reject(error);
    }
);

export default apiClient;

