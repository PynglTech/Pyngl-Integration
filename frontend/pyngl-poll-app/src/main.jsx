import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// ✅ Import the PWA Service Worker register helper
import { registerSW } from 'virtual:pwa-register'

// ✅ Register service worker (auto update)
registerSW({
  immediate: true, // Ensures it activates as soon as possible
  onNeedRefresh() {
    console.log("🔄 New content available, refresh to update.")
  },
  onOfflineReady() {
    console.log("✅ App ready to work offline.")
  },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
