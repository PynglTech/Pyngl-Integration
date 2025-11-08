// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import LandingPage from './LandingPage'; // Your simple landing page view
// import LoginSheet from '../components/auth/LoginSheet';
// import RegisterSheet from '../components/auth/RegisterSheet';
// import ForgotPasswordSheet from '../components/auth/ForgotPasswordSheet';
// import useAuthStore from '../store/useAuthStore';

// // This is the layout for PHONE and TABLET screens.
// const MobileAuthPage = () => {
//     const [activeSheet, setActiveSheet] = useState(null);
//     const { clearError } = useAuthStore();
//     const location = useLocation();
//     const navigate = useNavigate();

//     // This effect opens the correct sheet if navigated to /login or /signup
//     useEffect(() => {
//         if (location.pathname === '/login') {
//             setActiveSheet('login');
//         } else if (location.pathname === '/signup') {
//             setActiveSheet('register');
//         } else {
//             setActiveSheet(null);
//         }
//     }, [location.pathname]);

//     const openSheet = (sheetName) => {
//         clearError();
//         // Change URL without full page reload when opening a sheet
//         navigate(sheetName === 'login' ? '/login' : '/signup', { replace: true });
//         setActiveSheet(sheetName);
//     };

//     const closeSheet = () => {
//         navigate('/', { replace: true }); // Go back to main URL on close
//         setActiveSheet(null);
//     };

//     return (
//         <div className="font-sans bg-white dark:bg-gray-950 min-h-screen">
//             <div className="w-full h-screen bg-white dark:bg-gray-900">
//                 <LandingPage openSheet={openSheet} />
//             </div>

//             {activeSheet === 'login' && <LoginSheet openSheet={openSheet} closeSheet={closeSheet} />}
//             {activeSheet === 'register' && <RegisterSheet openSheet={openSheet} closeSheet={closeSheet} />}
//           {activeSheet === 'forgot' && (
//                 <ForgotPasswordSheet
//                     openSheet={openSheet}
//                     closeSheet={closeSheet}
//                 />
//             )}
//         </div>
//     );
// };

// export default MobileAuthPage;
import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LandingPage from "./LandingPage";
import LoginSheet from "../components/auth/LoginSheet";
import RegisterSheet from "../components/auth/RegisterSheet";
import ForgotPasswordSheet from "../components/auth/ForgotPasswordSheet";
import useAuthStore from "../store/useAuthStore";

const MobileAuthPage = () => {
  const [activeSheet, setActiveSheet] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Safely access store methods
  const clearError = useAuthStore((state) => state.clearError);

  // ✅ Map for routes (kept outside handler for clarity)
  const pathMap = {
    login: "/login",
    register: "/signup",
    forgot: "/forgot-password",
  };

  // ✅ Effect: Watch URL and set active sheet accordingly
  useEffect(() => {
    const path = location.pathname;
    if (path === "/login") setActiveSheet("login");
    else if (path === "/signup") setActiveSheet("register");
    else if (path === "/forgot-password") setActiveSheet("forgot");
    else setActiveSheet(null);
  }, [location.pathname]);

  // ✅ Wrapped in useCallback (avoids stale closures)
  const openSheet = useCallback(
    (sheetName) => {
      if (typeof clearError === "function") clearError();
      else console.warn("⚠️ clearError is not a function — check useAuthStore");

      const newPath = pathMap[sheetName] || "/";
      navigate(newPath, { replace: true });
      setActiveSheet(sheetName);
    },
    [navigate, clearError]
  );

  const closeSheet = useCallback(() => {
    navigate("/", { replace: true });
    setActiveSheet(null);
  }, [navigate]);

  return (
    <div className="font-sans bg-white dark:bg-gray-950 min-h-screen">
      {/* Landing Page */}
      <div className="w-full h-screen bg-white dark:bg-gray-900">
        <LandingPage openSheet={openSheet} />
      </div>

      {/* Conditional Modals */}
      {activeSheet === "login" && (
        <LoginSheet openSheet={openSheet} closeSheet={closeSheet} />
      )}

      {activeSheet === "register" && (
        <RegisterSheet openSheet={openSheet} closeSheet={closeSheet} />
      )}

      {activeSheet === "forgot" && (
        <ForgotPasswordSheet openSheet={openSheet} closeSheet={closeSheet} />
      )}
    </div>
  );
};

export default MobileAuthPage;
