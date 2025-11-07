// // import React, { useState, useEffect } from 'react';
// // import { Navigate } from 'react-router-dom';
// // import useAuthStore from '../store/useAuthStore';
// // import apiClient from '../api/axiosConfig';
// // import LandingPage from './LandingPage';
// // import LoginSheet from '../components/auth/LoginSheet';
// // import RegisterSheet from '../components/auth/RegisterSheet';
// // import ForgotPasswordSheet from '../components/auth/ForgotPasswordSheet';
// // import LoadingSpinner from '../components/common/LoadingSpinner';
// // const PublicAuthPage = () => {
// //     const [activeSheet, setActiveSheet] = useState(null);
// //     const { userInfo, clearError, setUserInfo } = useAuthStore();
// //     const [isCheckingStatus, setIsCheckingStatus] = useState(true);

// //     useEffect(() => {
// //         const checkUserStatus = async () => {
// //             try {
// //                 const { data } = await apiClient.get('/api/users/profile');
// //                 setUserInfo(data);
// //             } catch (error) {
// //                 console.log("No active session found.");
// //             } finally {
// //                 setIsCheckingStatus(false);
// //             }
// //         };

// //         if (!userInfo) {
// //             checkUserStatus();
// //         } else {
// //             setIsCheckingStatus(false);
// //         }
// //     }, [userInfo, setUserInfo]);

// //     const openSheet = (sheetName) => {
// //         clearError();
// //         setActiveSheet(sheetName);
// //     };
// //       const closeSheet = () => setActiveSheet(null);

// //     // If we have user info, redirect to the dashboard
// //     if (userInfo) {
// //         return <Navigate to="/dashboard" replace />;
// //     }

// //     // While checking, show the new, full-page loading spinner
// //     if (isCheckingStatus) {
// //         return <LoadingSpinner />; // <-- 2. Use the spinner instead of text
// //     }

// //     return (
// //         <div className="font-sans bg-white sm:bg-gray-200 sm:flex sm:items-center sm:justify-center min-h-screen">
// //            <div className="w-full max-w-5xl mx-auto flex flex-col h-screen sm:h-auto sm:my-12 bg-white dark:bg-gray-900 sm:rounded-2xl sm:shadow-lg">
// //     <LandingPage openSheet={openSheet} />
// // </div>
// //             {activeSheet && <div className="fixed inset-0 bg-black bg-opacity-30 z-40 animate-fade-in" onClick={closeSheet} />}
// //             {activeSheet === 'login' && <LoginSheet openSheet={openSheet} />}
// //             {activeSheet === 'register' && <RegisterSheet openSheet={openSheet} />}
// //             {activeSheet === 'forgot' && <ForgotPasswordSheet openSheet={openSheet} closeSheet={closeSheet} />}
// //         </div>
// //     );
// // };

// // export default PublicAuthPage;
// import React, { useState, useEffect } from 'react';
// import { Navigate } from 'react-router-dom';
// import useAuthStore from '../store/useAuthStore';
// import LandingPage from './LandingPage';
// import LoginSheet from '../components/auth/LoginSheet';
// import RegisterSheet from '../components/auth/RegisterSheet';
// import ForgotPasswordSheet from '../components/auth/ForgotPasswordSheet';
// import LoadingSpinner from '../components/common/LoadingSpinner';

// const PublicAuthPage = () => {
//     const [activeSheet, setActiveSheet] = useState(null);
//     // 1. Get isInitialized and checkUserStatus from the store
//     const { userInfo, isInitialized, checkUserStatus, clearError } = useAuthStore();

//     useEffect(() => {
//         // 2. This check now only runs once when the app first loads
//         if (!isInitialized) {
//             checkUserStatus();
//         }
//     }, [isInitialized, checkUserStatus]);

//     const openSheet = (sheetName) => {
//         clearError();
//         setActiveSheet(sheetName);
//     };
    
//     const closeSheet = () => setActiveSheet(null);

//     // Show a loading spinner until the initial authentication check is complete
//     if (!isInitialized) {
//         return <LoadingSpinner />;
//     }

//     // If the user is logged in, redirect them to the dashboard
//     if (userInfo) {
//         return <Navigate to="/dashboard" replace />;
//     }

//     // Once the check is done, render the page
//     return (
//         <div className="font-sans bg-white dark:bg-gray-950 sm:bg-gray-200 sm:flex sm:items-center sm:justify-center min-h-screen">
            
//             <div className="w-full max-w-5xl mx-auto flex flex-col h-screen sm:h-auto sm:my-12 bg-white dark:bg-gray-900 sm:rounded-2xl sm:shadow-lg overflow-hidden">
//                 <LandingPage openSheet={openSheet} />
//             </div>

//             {/* The overlay is now correctly managed by the sheet components themselves */}
//             {activeSheet === 'login' && <LoginSheet openSheet={openSheet} closeSheet={closeSheet} />}
//             {activeSheet === 'register' && <RegisterSheet openSheet={openSheet} closeSheet={closeSheet} />}
//             {activeSheet === 'forgot' && <ForgotPasswordSheet openSheet={openSheet} closeSheet={closeSheet} />}
//         </div>
//     );
// };

// export default PublicAuthPage;
// import React, { useState, useEffect } from 'react';
// import { Navigate } from 'react-router-dom';
// import useAuthStore from '../store/useAuthStore';
// import LoadingSpinner from '../components/common/LoadingSpinner';

// // Import the two different layouts
// import DesktopHomePage from './DesktopHomePage';
// import MobileAuthPage from './MobileAuthPage';

// // Simple hook to check for desktop screen size
// const useIsDesktop = () => {
//     const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
//     useEffect(() => {
//         const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
//         window.addEventListener('resize', handleResize);
//         return () => window.removeEventListener('resize', handleResize);
//     }, []);
//     return isDesktop;
// };

// const PublicAuthPage = () => {
//     const { userInfo, isInitialized, checkUserStatus } = useAuthStore();
//     const isDesktop = useIsDesktop(); // Check screen size

//     useEffect(() => {
//         if (!isInitialized) {
//             checkUserStatus();
//         }
//     }, [isInitialized, checkUserStatus]);

//     // Show a loading spinner while checking auth status
//     if (!isInitialized) {
//         return <LoadingSpinner />;
//     }

//     // If user is logged in, redirect to the dashboard
//     if (userInfo) {
//         return <Navigate to="/dashboard" replace />;
//     }

//     // ** THE SWITCH LOGIC **
//     // If it's a desktop screen, show the DesktopHomePage.
//     // Otherwise, show the MobileAuthPage with the sheets.
//     return isDesktop ? <DesktopHomePage /> : <MobileAuthPage />;
// };

// export default PublicAuthPage;


import React, { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ForgotPasswordSheet from '../components/auth/ForgotPasswordSheet';

import DesktopHomePage from './DesktopHomePage';
import DesktopAuthPage from '../components/auth/DesktopAuthPage';
import MobileAuthPage from './MobileAuthPage';
import InstallPrompt from './InstallPrompt';

const useIsDesktop = () => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return isDesktop;
};
    

const PublicAuthPage = () => {
  const { userInfo, isInitialized, checkUserStatus } = useAuthStore();
  const isDesktop = useIsDesktop();
  const location = useLocation();

  useEffect(() => {
    if (!isInitialized) {
      checkUserStatus();
    }
  }, [isInitialized, checkUserStatus]);

  if (!isInitialized) {
    return <LoadingSpinner />;
  }

<<<<<<< HEAD
    // ** THE NEW, SMARTER SWITCH LOGIC **
    if (isDesktop) {
        // On desktop, check the path to decide which page to show
        if (location.pathname === '/login' || location.pathname === '/signup') {
            return <DesktopAuthPage />;
        }
        if (location.pathname === '/forgot-password') {
            return <ForgotPasswordSheet />;
        }
        // For any other path (like '/'), show the main landing page
        return <DesktopHomePage />;
=======
  if (userInfo) {
    return <Navigate to="/dashboard" replace />;
  }

  // Render different layouts
  let content;
  if (isDesktop) {
    if (location.pathname === '/login' || location.pathname === '/signup') {
      content = <DesktopAuthPage />;
    } else if (location.pathname === '/forgot-password') {
      content = <ForgotPasswordsheet />;
>>>>>>> 154d2881a3fc30d186e2a0a0fb2cdc595f6e75a8
    } else {
      content = <DesktopHomePage />;
    }
  } else {
    content = <MobileAuthPage />;
  }

  return (
    <>
      {content}
      <InstallPrompt /> 
    </>
  );
};

export default PublicAuthPage;


