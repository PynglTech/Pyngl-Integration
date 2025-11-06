import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import basicSsl from '@vitejs/plugin-basic-ssl'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    basicSsl(),

    // ✅ Enable PWA in both dev & build
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['vite.svg', 'PynglLogo-192.png', 'PynglLogo-512.png'],

      // ✅ Enable service worker in dev mode (this is the missing piece)
      devOptions: {
        enabled: true, // <--- REQUIRED for Chrome install prompt during `npm run dev`
      },

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
            type: 'image/png',
            purpose: 'any maskable',
          },
          {
            src: '/PynglLogo-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
    }),
  ],

  server: {
    https: false,
    host: true,     // ✅ expose to LAN

    proxy: {
      '/api': {
        target: 'https://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
      '/auth': {
        target: 'https://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
  