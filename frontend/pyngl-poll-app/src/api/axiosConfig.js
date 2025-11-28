
import axios from "axios";
import useAuthStore from "../store/useAuthStore";

const host = window.location.hostname;
const protocol = window.location.protocol; // http: or https:

let baseURL;

// ============= DEVELOPMENT ENV (localhost or LAN) =============
if (import.meta.env.MODE === "development") {
  if (host === "localhost") {
    baseURL = "http://localhost:5000";
  } else if (host.startsWith("192.168")) {
    baseURL = `http://${host}:5000`;
  } else if (host.endsWith("ngrok-free.dev")) {
    // ⭐ NGROK FRONTEND → use ngrok backend (same domain)
    baseURL = `${protocol}//${host}`;
  }
}

// ============= PRODUCTION ENV =============
else {
  baseURL = import.meta.env.VITE_API_URL;
}

const apiClient = axios.create({
  baseURL,
  withCredentials: true,
});

// Global 401 handler
apiClient.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      useAuthStore.getState().logout();
    }
    return Promise.reject(err);
  }
);

export default apiClient;
