import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // frontend/vite.config.js
server: {
    proxy: {
      // This will proxy any request starting with /api to your backend
      '/api': {
        target: 'http://192.168.1.4:5000', // IMPORTANT: Replace with your backend server's address
        changeOrigin: true, // Recommended for virtual hosted sites
        secure: false,      // Can be needed if backend is not https
      },
    },
  },
})