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
import './App.css';

export default function App() {
    const { isInitialized, userInfo, loading, checkUserStatus } = useAuthStore();
    const { theme } = useThemeStore();
    const [showDelayedLoader, setShowDelayedLoader] = useState(false);

    // This effect runs once when the app starts to check the user's login status.
    useEffect(() => {
        if (!isInitialized) {
            checkUserStatus();
        }
    }, [isInitialized, checkUserStatus]);

    // This effect watches for changes in the theme and updates the entire app's class.
    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(theme);
    }, [theme]);

    // This effect shows a specific loader for a better UX during certain loading states.
    useEffect(() => {
        let timer;
        // If there's a logged-in user but the app is still loading something,
        // show the loader after a short delay to avoid a quick flash.
        if (loading && userInfo) {
            timer = setTimeout(() => {
                setShowDelayedLoader(true);
            }, 300); // 300ms delay
        } else {
            setShowDelayedLoader(false);
        }
        return () => clearTimeout(timer);
    }, [loading, userInfo]);

    // Show the initial loading screen until the first auth check is complete.
    if (!isInitialized) {
        return <LoadingScreen text="Loading..." />;
    }

    // Show the delayed loader if its condition is met.
    if (showDelayedLoader) {
        return <LoadingScreen text="Getting your feed ready..." />;
    }

    // Render the main application.
    return (
        <>
            <Toaster position="top-center" />
            <AppRoutes />
        </>
    );
}

