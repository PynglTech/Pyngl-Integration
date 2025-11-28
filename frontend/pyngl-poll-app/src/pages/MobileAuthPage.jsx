// // import React, { useState, useEffect } from 'react';
// // import { useLocation, useNavigate } from 'react-router-dom';
// // import LandingPage from './LandingPage'; // Your simple landing page view
// // import LoginSheet from '../components/auth/LoginSheet';
// // import RegisterSheet from '../components/auth/RegisterSheet';
// // import ForgotPasswordSheet from '../components/auth/ForgotPasswordSheet';
// // import useAuthStore from '../store/useAuthStore';

// // // This is the layout for PHONE and TABLET screens.
// // const MobileAuthPage = () => {
// //     const [activeSheet, setActiveSheet] = useState(null);
// //     const { clearError } = useAuthStore();
// //     const location = useLocation();
// //     const navigate = useNavigate();

// //     // This effect opens the correct sheet if navigated to /login or /signup
// //     useEffect(() => {
// //         if (location.pathname === '/login') {
// //             setActiveSheet('login');
// //         } else if (location.pathname === '/signup') {
// //             setActiveSheet('register');
// //         } else {
// //             setActiveSheet(null);
// //         }
// //     }, [location.pathname]);

// //     const openSheet = (sheetName) => {
// //         clearError();
// //         // Change URL without full page reload when opening a sheet
// //         navigate(sheetName === 'login' ? '/login' : '/signup', { replace: true });
// //         setActiveSheet(sheetName);
// //     };

// //     const closeSheet = () => {
// //         navigate('/', { replace: true }); // Go back to main URL on close
// //         setActiveSheet(null);
// //     };

// //     return (
// //         <div className="font-sans bg-white dark:bg-gray-950 min-h-screen">
// //             <div className="w-full h-screen bg-white dark:bg-gray-900">
// //                 <LandingPage openSheet={openSheet} />
// //             </div>

// //             {activeSheet === 'login' && <LoginSheet openSheet={openSheet} closeSheet={closeSheet} />}
// //             {activeSheet === 'register' && <RegisterSheet openSheet={openSheet} closeSheet={closeSheet} />}
// //           {activeSheet === 'forgot' && (
// //                 <ForgotPasswordSheet
// //                     openSheet={openSheet}
// //                     closeSheet={closeSheet}
// //                 />
// //             )}
// //         </div>
// //     );
// // };

// // export default MobileAuthPage;
// import React, { useState, useEffect, useCallback } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import LandingPage from "./LandingPage";
// import LoginSheet from "../components/auth/LoginSheet";
// import RegisterSheet from "../components/auth/RegisterSheet";
// import ForgotPasswordSheet from "../components/auth/ForgotPasswordSheet";
// import useAuthStore from "../store/useAuthStore";

// const MobileAuthPage = () => {
//   const [activeSheet, setActiveSheet] = useState(null);
//   const navigate = useNavigate();
//   const location = useLocation();

//   const { userInfo, clearError } = useAuthStore();

//   const pathMap = {
//     login: "/login",
//     register: "/signup",
//     forgot: "/forgot-password",
//   };

//   // ✅ Automatically close auth modals after successful login/register
//   useEffect(() => {
//     if (userInfo) {
//       setActiveSheet(null);
//       navigate("/dashboard", { replace: true });
//     }
//   }, [userInfo, navigate]);

//   // ✅ Update active sheet based on URL path
//   useEffect(() => {
//     const path = location.pathname;
//     if (path === "/login") setActiveSheet("login");
//     else if (path === "/signup") setActiveSheet("register");
//     else if (path === "/forgot-password") setActiveSheet("forgot");
//     else setActiveSheet(null);

//     // 🧹 Reset state on unmount
//     return () => setActiveSheet(null);
//   }, [location.pathname]);

//   // ✅ Open sheet handler
//   const openSheet = useCallback(
//     (sheetName) => {
//       if (typeof clearError === "function") clearError();
//       const newPath = pathMap[sheetName] || "/";
//       navigate(newPath, { replace: true });
//       setActiveSheet(sheetName);
//     },
//     [navigate, clearError]
//   );

//   // ✅ Close sheet handler
//   const closeSheet = useCallback(() => {
//     navigate("/", { replace: true });
//     setActiveSheet(null);
//   }, [navigate]);

//   return (
//     <div className="font-sans bg-white dark:bg-gray-950 min-h-screen">
//       <div className="w-full h-screen bg-white dark:bg-gray-900">
//         <LandingPage openSheet={openSheet} />
//       </div>

//       {/* Conditional Auth Sheets */}
//       {activeSheet === "login" && (
//         <LoginSheet openSheet={openSheet} closeSheet={closeSheet} />
//       )}
//       {activeSheet === "register" && (
//         <RegisterSheet openSheet={openSheet} closeSheet={closeSheet} />
//       )}
//       {activeSheet === "forgot" && (
//         <ForgotPasswordSheet openSheet={openSheet} closeSheet={closeSheet} />
//       )}
//     </div>
//   );
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

  const { userInfo, clearError } = useAuthStore();

  const pathMap = {
    login: "/login",
    register: "/signup",
    forgot: "/forgot-password",
  };

  // ✅ Automatically close auth modals after successful login/register
  useEffect(() => {
    if (userInfo) {
      setActiveSheet(null);
      navigate("/dashboard", { replace: true });
    }
  }, [userInfo, navigate]);

  // ✅ Update active sheet based on URL path
  useEffect(() => {
    const path = location.pathname;
    if (path === "/login") setActiveSheet("login");
    else if (path === "/signup") navigate("/signup");
    else if (path === "/forgot-password") setActiveSheet("forgot");
    else setActiveSheet(null);

    // 🧹 Reset state on unmount
    return () => setActiveSheet(null);
  }, [location.pathname]);

  // ✅ Open sheet handler
  const openSheet = useCallback(
    (sheetName) => {
      if (typeof clearError === "function") clearError();
      const newPath = pathMap[sheetName] || "/";
      navigate(newPath, { replace: true });
      setActiveSheet(sheetName);
    },
    [navigate, clearError]
  );

  // ✅ Close sheet handler
  const closeSheet = useCallback(() => {
    navigate("/", { replace: true });
    setActiveSheet(null);
  }, [navigate]);

  return (
    <div className="font-sans bg-white dark:bg-gray-950 min-h-screen">
      <div className="w-full h-screen bg-white dark:bg-gray-900">
        <LandingPage openSheet={openSheet} />
      </div>

      {/* Conditional Auth Sheets */}
      {activeSheet === "login" && (
        <LoginSheet openSheet={openSheet} closeSheet={closeSheet} />
      )}
      {/* {activeSheet === "register" && (
        <RegisterSheet/>
      )} */}
      {activeSheet === "forgot" && (
        <ForgotPasswordSheet openSheet={openSheet} closeSheet={closeSheet} />
      )}
    </div>
  );
};

export default MobileAuthPage;