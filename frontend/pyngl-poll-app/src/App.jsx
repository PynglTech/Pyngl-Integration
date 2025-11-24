// import React, { useState, useEffect } from 'react';
// import useAuthStore from './store/useAuthStore';
// import LoadingScreen from './components/common/LoadingScreen';
// import useThemeStore from './store/useThemeStore.js'; 
// import AppRoutes from './routes/AppRoutes';
// import './App.css';
// export default function App() {
//     const { isInitialized, userInfo, loading } = useAuthStore();
//      const { theme } = useThemeStore(); 
//     const [showDelayedLoader, setShowDelayedLoader] = useState(false);
//     useEffect(() => {
//         let timer;
//         if (loading && userInfo) {
//             timer = setTimeout(() => {
//                 setShowDelayedLoader(true);
//             }, 300);
//         } else {
//             setShowDelayedLoader(false);
//         }
//         return () => clearTimeout(timer);
        
//     }, [loading, userInfo]);
//     if (!isInitialized) {
//         return <LoadingScreen text="Loading..." />;
//     }
//     if (showDelayedLoader) {
//         return <LoadingScreen text="Getting your feed ready..." />;
//     }
//     return <AppRoutes />;
// }
import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import useAuthStore from './store/useAuthStore';
import useThemeStore from './store/useThemeStore';
import AppRoutes from './routes/AppRoutes';
import LoadingScreen from './components/common/LoadingScreen';
import { useThemeEffect } from './hooks/useThemeEffect';
import './App.css';

export default function App() {
  const { isInitialized, userInfo, loading, checkUserStatus } = useAuthStore();
  const { theme } = useThemeStore();
  const [showDelayedLoader, setShowDelayedLoader] = useState(false);

  useThemeEffect();

  // ✅ Verify session or initialize local user
useEffect(() => {
  checkUserStatus();   // always check on app load
}, []);


  // ✅ Sync theme globally
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  // ✅ Manage delayed loader
  useEffect(() => {
    let timer;
    if (loading && userInfo) {
      timer = setTimeout(() => setShowDelayedLoader(true), 300);
    } else {
      setShowDelayedLoader(false);
    }
    return () => clearTimeout(timer);
  }, [loading, userInfo]);

  // ✅ Controlled loading states
  if (!isInitialized) return <LoadingScreen text="Loading..." />;
  if (showDelayedLoader) return <LoadingScreen text="Getting your feed ready..." />;

  // ✅ Main app render
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <AppRoutes />
    </>
  );
}

