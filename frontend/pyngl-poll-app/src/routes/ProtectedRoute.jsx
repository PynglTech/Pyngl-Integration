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
    return null; // or loader
  }

  return userInfo ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
