import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import basicSsl from '@vitejs/plugin-basic-ssl'; 
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
  basicSsl()
  ],
  // frontend/vite.config.js
server: {
   https: true,
    proxy: {
      // This will proxy any request starting with /api to your backend
      '/api': {
        target: 'http://localhost:5000', // IMPORTANT: Replace with your backend server's address
        changeOrigin: true, // Recommended for virtual hosted sites
        secure: false,      // Can be needed if backend is not https
      },
    },
  },
})