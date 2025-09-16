import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import LandingPage from './LandingPage';
import LoginSheet from '../components/auth/LoginSheet';
import RegisterSheet from '../components/auth/RegisterSheet';
import ForgotPasswordSheet from '../components/auth/ForgotPasswordSheet';

const PublicAuthPage = () => {
    const [activeSheet, setActiveSheet] = useState(null);
    const { userInfo, clearError } = useAuthStore();

    const openSheet = (sheetName) => {
        clearError();
        setActiveSheet(sheetName);
    };
    const closeSheet = () => setActiveSheet(null);
    
    if (userInfo) {
        return <Navigate to="/dashboard" replace />;
    }

    return (
        <div className="font-sans bg-white sm:bg-gray-200 sm:flex sm:items-center sm:justify-center min-h-screen">
            <div className="w-full h-screen sm:max-w-sm sm:h-[750px] sm:rounded-2xl sm:shadow-lg flex flex-col mx-auto bg-white">
                <LandingPage openSheet={openSheet} />
            </div>
            {activeSheet && <div className="fixed inset-0 bg-black bg-opacity-30 z-40 animate-fade-in" onClick={closeSheet} />}
            {activeSheet === 'login' && <LoginSheet openSheet={openSheet} />}
            {activeSheet === 'register' && <RegisterSheet openSheet={openSheet} />}
            {activeSheet === 'forgot' && <ForgotPasswordSheet openSheet={openSheet} closeSheet={closeSheet} />}
        </div>
    );
};

export default PublicAuthPage;  