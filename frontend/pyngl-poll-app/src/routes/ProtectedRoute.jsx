// import React from 'react';
// import { Outlet, Navigate } from 'react-router-dom';
// import useAuthStore from '../store/useAuthStore';

// // const ProtectedRoute = () => {
// //     const { userInfo } = useAuthStore();
// //     return userInfo ? <Outlet /> : <Navigate to="/" replace />;
// // };

// // export default ProtectedRoute;  
// const ProtectedRoute = () => {
//   const { userInfo, isChecking } = useAuthStore();

//   // While checking user status, don't redirect yet
//   if (isChecking) {
//     return (
//       <div className="w-full h-screen flex items-center justify-center">
//         <p>Loading...</p>
//       </div>
//     );
//   }

//   // When check is done: allow or redirect
//   return userInfo ? <Outlet /> : <Navigate to="/" replace />;
// };

// export default ProtectedRoute;

import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

const ProtectedRoute = () => {
  const { userInfo, isInitialized } = useAuthStore();

if (!isInitialized) {
    return (
      <div className="flex items-center justify-center h-screen w-full bg-white dark:bg-[#0f111a]">
        <Loader2 className="h-10 w-10 animate-spin text-pyngl-pink" />
      </div>
    );
  }

  return userInfo ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
