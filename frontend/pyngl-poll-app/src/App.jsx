import React, { useState, useEffect } from 'react';
import useAuthStore from './store/useAuthStore';
import LoadingScreen from './components/common/LoadingScreen';
import AppRoutes from './routes/AppRoutes';
import './App.css';
export default function App() {
    const { isInitialized, userInfo, loading } = useAuthStore();
    const [showDelayedLoader, setShowDelayedLoader] = useState(false);
    useEffect(() => {
        let timer;
        if (loading && userInfo) {
            timer = setTimeout(() => {
                setShowDelayedLoader(true);
            }, 300);
        } else {
            setShowDelayedLoader(false);
        }
        return () => clearTimeout(timer);
    }, [loading, userInfo]);
    if (!isInitialized) {
        return <LoadingScreen text="Loading..." />;
    }
    if (showDelayedLoader) {
        return <LoadingScreen text="Getting your feed ready..." />;
    }
    return <AppRoutes />;
}