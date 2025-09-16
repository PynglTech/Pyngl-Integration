import axios from 'axios';
import useAuthStore from '../store/useAuthStore';

// Create a new Axios instance
const apiClient = axios.create({
    baseURL: '', // The Vite proxy handles the full URL, so this can be empty
    withCredentials: true, // This is the crucial part that sends cookies
});

// 🔥 BONUS: Add an interceptor for global 401 error handling
apiClient.interceptors.response.use(
    (response) => response, // Directly return a successful response
    (error) => {
        // Check if the error is a 401 Unauthorized
        if (error.response && error.response.status === 401) {
            // Use the global logout function from your Zustand store
            useAuthStore.getState().logout();
            window.location.href = '/'; // Redirect to the login page
        }
        // Return any other error so that individual components can handle it
        return Promise.reject(error);
    }
);

export default apiClient;