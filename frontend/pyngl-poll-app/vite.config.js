import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import basicSsl from '@vitejs/plugin-basic-ssl'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    basicSsl(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['vite.svg', 'icons/icon-192x192.png', 'icons/icon-512x512.png'],
      manifest: {
        name: 'Pyngl',
        short_name: 'Pyngl',
        description: 'Polls made simple — Create, Share, and Vote with Pyngl.',
        start_url: '/?source=pwa',
        scope: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#ffffff',
        orientation: 'portrait',
        icons: [
              {
      "src": "/PynglSingleLogo.jpg",
      "sizes": "192x192",
      "type": "image/jpg"
    },
    {
      "src": "/PynglSingleLogo.jpg",
      "sizes": "512x512",
      "type": "image/jpg"
    }
        ]
      }
    })
  ],

  server: {
    https: true,
    proxy: {
      '/api': {
        target: 'https://localhost:5000', // or your backend IP
        changeOrigin: true,
        secure: false,
      },
      '/auth': {
        target: 'https://localhost:5000', // or your backend IP
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
