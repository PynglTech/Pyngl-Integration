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
  includeAssets: ['vite.svg', 'PynglLogo-192.png', 'PynglLogo-512.png'],
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
        src: '/PynglLogo-192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: '/PynglLogo-512.png',
        sizes: '512x512',
        type: 'image/png'
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
