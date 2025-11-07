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
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LandingPage from "./LandingPage"; // Your simple landing page view
import LoginSheet from "../components/auth/LoginSheet";
import RegisterSheet from "../components/auth/RegisterSheet";
import ForgotPasswordSheet from "../components/auth/ForgotPasswordSheet";
import useAuthStore from "../store/useAuthStore";

// This is the layout for PHONE and TABLET screens.
const MobileAuthPage = () => {
  const [activeSheet, setActiveSheet] = useState(null);
  const { clearError } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate(); // This effect opens the correct sheet based on the URL

  useEffect(() => {
    if (location.pathname === "/login") {
      setActiveSheet("login");
    } else if (location.pathname === "/signup") {
      setActiveSheet("register"); // --- 1. FIX: Added this case ---
    } else if (location.pathname === "/forgot-password") {
      setActiveSheet("forgot");
    } else {
      setActiveSheet(null);
    }
  }, [location.pathname]); // --- 2. FIX: Updated openSheet logic ---

  const openSheet = (sheetName) => {
    clearError(); // Create a map for easy URL lookup
    const pathMap = {
      login: "/login",
      register: "/signup",
      forgot: "/forgot-password",
    }; // Navigate to the correct path based on the sheetName
    const newPath = pathMap[sheetName] || "/";
    navigate(newPath, { replace: true }); // This line was already correct
    setActiveSheet(sheetName);
  };
  const closeSheet = () => {
    navigate("/", { replace: true }); // Go back to main URL on close
    setActiveSheet(null);
  };

  return (
    <div className="font-sans bg-white dark:bg-gray-950 min-h-screen">
                 {" "}
      <div className="w-full h-screen bg-white dark:bg-gray-900">
                        <LandingPage openSheet={openSheet} />           {" "}
      </div>
                  {/* This rendering logic was already correct */}           {" "}
      {activeSheet === "login" && (
        <LoginSheet openSheet={openSheet} closeSheet={closeSheet} />
      )}
                 {" "}
      {activeSheet === "register" && (
        <RegisterSheet openSheet={openSheet} closeSheet={closeSheet} />
      )}
                 {" "}
      {activeSheet === "forgot" && (
        <ForgotPasswordSheet openSheet={openSheet} closeSheet={closeSheet} />
      )}
             {" "}
    </div>
  );
};

export default MobileAuthPage;
