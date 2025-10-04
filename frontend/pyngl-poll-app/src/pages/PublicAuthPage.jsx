// import React, { useState } from 'react';
// import { Navigate } from 'react-router-dom';
// import useAuthStore from '../store/useAuthStore';
// import LandingPage from './LandingPage';
// import LoginSheet from '../components/auth/LoginSheet';
// import RegisterSheet from '../components/auth/RegisterSheet';
// import ForgotPasswordSheet from '../components/auth/ForgotPasswordSheet';

// const PublicAuthPage = () => {
//     const [activeSheet, setActiveSheet] = useState(null);
//     const { userInfo, clearError } = useAuthStore();

//     const openSheet = (sheetName) => {
//         clearError();
//         setActiveSheet(sheetName);
//     };
//     const closeSheet = () => setActiveSheet(null);
    
//     if (userInfo) {
//         return <Navigate to="/dashboard" replace />;
//     }

//     return (
//         <div className="font-sans bg-white sm:bg-gray-200 sm:flex sm:items-center sm:justify-center min-h-screen">
//             <div className="w-full h-screen sm:max-w-sm sm:h-[750px] sm:rounded-2xl sm:shadow-lg flex flex-col mx-auto bg-white">
//                 <LandingPage openSheet={openSheet} />
//             </div>
//             {activeSheet && <div className="fixed inset-0 bg-black bg-opacity-30 z-40 animate-fade-in" onClick={closeSheet} />}
//             {activeSheet === 'login' && <LoginSheet openSheet={openSheet} />}
//             {activeSheet === 'register' && <RegisterSheet openSheet={openSheet} />}
//             {activeSheet === 'forgot' && <ForgotPasswordSheet openSheet={openSheet} closeSheet={closeSheet} />}
//         </div>
//     );
// };

// export default PublicAuthPage;  
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import apiClient from '../api/axiosConfig';
import LandingPage from './LandingPage';
import LoginSheet from '../components/auth/LoginSheet';
import RegisterSheet from '../components/auth/RegisterSheet';
import ForgotPasswordSheet from '../components/auth/ForgotPasswordSheet';

const PublicAuthPage = () => {
    const [activeSheet, setActiveSheet] = useState(null);
    // Get the new setUserInfo function from the store
    const { userInfo, clearError, setUserInfo } = useAuthStore();
    const [isCheckingStatus, setIsCheckingStatus] = useState(true);

    // This effect performs the silent login check when the component first mounts
    useEffect(() => {
        const checkUserStatus = async () => {
            try {
                // This API call will automatically include the secure httpOnly cookie.
                // If the cookie is valid, this request will succeed.
                const { data } = await apiClient.get('/api/users/profile');
                
                // If we get data back, it means the user is logged in.
                // We update our global state with this user data.
                setUserInfo(data);
            } catch (error) {
                // If this request fails (e.g., a 401 error), it simply means
                // no one is logged in. We don't need to do anything.
                console.log("No active session found.");
            } finally {
                setIsCheckingStatus(false);
            }
        };

        // We only run this check if there isn't already user info in our state
        if (!userInfo) {
            checkUserStatus();
        } else {
            setIsCheckingStatus(false);
        }
    }, [userInfo, setUserInfo]);

    const openSheet = (sheetName) => {
        clearError();
        setActiveSheet(sheetName);
    };
    const closeSheet = () => setActiveSheet(null);
    
    // If we have user info, redirect to the dashboard
    if (userInfo) {
        return <Navigate to="/dashboard" replace />;
    }
    
    // While checking, we can show a loading state
    if (isCheckingStatus) {
        return <div>Loading...</div>; // Or a more stylish loading component
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