// // // // // import React from "react";
// // // // // import { CheckCircle } from "lucide-react";
// // // // // import { useNavigate } from "react-router-dom";

// // // // // const SuccessMessage = () => {
// // // // //   const navigate = useNavigate();

// // // // //   const handleStartOver = () => {
// // // // //     navigate("/register", { replace: true });
// // // // //   };

// // // // //   return (
// // // // //     <div className="flex flex-col h-screen w-full max-w-md mx-auto bg-white shadow-xl items-center justify-center text-center p-8">
// // // // //       <CheckCircle className="h-16 w-16 text-green-500 mb-6" />

// // // // //       <h2 className="text-3xl font-bold text-gray-900 mb-3">
// // // // //         Account Complete!
// // // // //       </h2>

// // // // //       <p className="text-lg text-gray-600 mb-8">
// // // // //         Your account has been created successfully.
// // // // //       </p>

// // // // //       <button
// // // // //         onClick={handleStartOver}
// // // // //         className="w-full py-3.5 bg-pyngl-pink text-white font-semibold rounded-full shadow-lg transition-all hover:bg-pyngl-pink-dark"
// // // // //       >
// // // // //         Start
// // // // //       </button>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default SuccessMessage;


// // // // import React from "react";
// // // // import { CheckCircle } from "lucide-react";
// // // // import { useNavigate } from "react-router-dom";

// // // // const SuccessMessage = () => {
// // // //   const navigate = useNavigate();

// // // //   const goToDashboard = () => {
// // // //     navigate("/dashboard");
// // // //   };

// // // //   return (
// // // //     <div className="flex flex-col h-screen w-full max-w-md mx-auto bg-white items-center justify-center text-center p-8">

// // // //       <CheckCircle className="h-16 w-16 text-green-500 mb-6" />

// // // //       <h2 className="text-3xl font-bold text-gray-900 mb-3">
// // // //         Account Complete!
// // // //       </h2>

// // // //       <p className="text-lg text-gray-600 mb-8">
// // // //         Your account has been created successfully 🎉
// // // //       </p>

// // // //       <button
// // // //         onClick={goToDashboard}
// // // //         className="w-full py-3.5 bg-pyngl-pink text-white rounded-full shadow-lg hover:bg-pyngl-pink-dark font-semibold"
// // // //       >
// // // //         Go to Dashboard
// // // //       </button>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default SuccessMessage;
// // // import React from "react";
// // // import { CheckCircle } from "lucide-react";
// // // import { useNavigate } from "react-router-dom";
// // // import useAuthStore from "../../store/useAuthStore"; // Optional: to verify state if needed

// // // const SuccessMessage = () => {
// // //   const navigate = useNavigate();
// // //   const { checkUserStatus } = useAuthStore();

// // //   const goToDashboard = async () => {
// // //     // Optional: Ensure store is synced with the cookie before redirecting
// // //     await checkUserStatus(); 
// // //     navigate("/"); // Redirect to home/dashboard
// // //   };

// // //   return (
// // //     <div className="flex flex-col h-full w-full bg-white dark:bg-[#131526] items-center justify-center text-center p-8 transition-colors duration-200">
      
// // //       <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-full">
// // //         <CheckCircle className="h-16 w-16 text-green-500" />
// // //       </div>

// // //       <h2 className="text-3xl font-bold text-gray-900 dark:text-[#F1F1F1] mb-3">
// // //         Account Complete!
// // //       </h2>

// // //       <p className="text-lg text-gray-600 dark:text-[#cbd5e1] mb-8">
// // //         Your account has been created successfully 🎉
// // //       </p>

// // //       <button
// // //         onClick={goToDashboard}
// // //         className="w-full max-w-xs py-3.5 bg-pyngl-pink hover:bg-pyngl-pink-dark text-white rounded-full shadow-lg font-semibold transition-all transform hover:scale-105"
// // //       >
// // //         Go to Dashboard
// // //       </button>
// // //     </div>
// // //   );
// // // };

// // // export default SuccessMessage;
// // import React from "react";
// // import { CheckCircle } from "lucide-react";
// // import { useNavigate } from "react-router-dom";

// // const SuccessMessage = () => {
// //   const navigate = useNavigate();

// //   const goToDashboard = () => {
// //     // The session cookie is already set by the registration API.
// //     // We can simply redirect to the dashboard/home.
// //     // If you need to force a state update locally, you can uncomment the store logic in your local setup.
    
// //     navigate("/"); // Redirect to home/dashboard
// //   };

// //   return (
// //     <div className="flex flex-col h-full w-full bg-white dark:bg-[#131526] items-center justify-center text-center p-8 transition-colors duration-200">
      
// //       <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-full">
// //         <CheckCircle className="h-16 w-16 text-green-500" />
// //       </div>

// //       <h2 className="text-3xl font-bold text-gray-900 dark:text-[#F1F1F1] mb-3">
// //         Account Complete!
// //       </h2>

// //       <p className="text-lg text-gray-600 dark:text-[#cbd5e1] mb-8">
// //         Your account has been created successfully 🎉
// //       </p>

// //       <button
// //         onClick={goToDashboard}
// //         className="w-full max-w-xs py-3.5 bg-pyngl-pink hover:bg-pyngl-pink-dark text-white rounded-full shadow-lg font-semibold transition-all transform hover:scale-105"
// //       >
// //         Go to Dashboard
// //       </button>
// //     </div>
// //   );
// // };

// // export default SuccessMessage;
// import React, { useState } from "react";
// import { CheckCircle, Loader2 } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import useAuthStore from "../../store/useAuthStore";

// const SuccessMessage = () => {
//   const navigate = useNavigate();
//   const { checkUserStatus } = useAuthStore();
//   const [isLoading, setIsLoading] = useState(false);

//   const goToDashboard = async () => {
//     setIsLoading(true);
//     try {
//       // ✅ CRITICAL: Sync frontend state with the backend cookie
//       // This fetches the user we just created so the Dashboard lets us in.
//       await checkUserStatus();
      
//       // Now navigate
//       navigate("/"); 
//     } catch (error) {
//       console.error("Failed to sync session:", error);
//       // Fallback: If sync fails, send to login manually
//       navigate("/login");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col h-full w-full bg-white dark:bg-[#131526] items-center justify-center text-center p-8 transition-colors duration-200">
      
//       <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-full">
//         <CheckCircle className="h-16 w-16 text-green-500" />
//       </div>

//       <h2 className="text-3xl font-bold text-gray-900 dark:text-[#F1F1F1] mb-3">
//         Account Complete!
//       </h2>

//       <p className="text-lg text-gray-600 dark:text-[#cbd5e1] mb-8">
//         Your account has been created successfully 🎉
//       </p>

//       <button
//         onClick={goToDashboard}
//         disabled={isLoading}
//         className="w-full max-w-xs py-3.5 bg-pyngl-pink hover:bg-pyngl-pink-dark text-white rounded-full shadow-lg font-semibold transition-all transform hover:scale-105 flex items-center justify-center gap-2"
//       >
//         {isLoading ? (
//           <>
//             <Loader2 className="h-5 w-5 animate-spin" />
//             Loading...
//           </>
//         ) : (
//           "Go to Dashboard"
//         )}
//       </button>
//     </div>
//   );
// };

// export default SuccessMessage;
import React, { useState } from "react";
import { CheckCircle, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
// ✅ UNCOMMENT the line below in your local project to sync session
import useAuthStore from "../../store/useAuthStore";

const SuccessMessage = () => {
  const navigate = useNavigate();
  // ✅ UNCOMMENT the line below in your local project
  const { checkUserStatus } = useAuthStore();
  
  const [isLoading, setIsLoading] = useState(false);

//   const goToDashboard = async () => {
//     setIsLoading(true);
//     try {
//       // ✅ UNCOMMENT the line below in your local project to fetch the user before redirecting
//     setTimeout(() => {
//   navigate("/dashboard");
// }, 300); // 300ms delay so browser writes cookie

//     } catch (error) {
//       console.error("Failed to sync session:", error);
//       // Fallback: If sync fails, send to login manually
//       navigate("/login");
//     } finally {
//       setIsLoading(false);
//     }
//   };
const goToDashboard = async () => {
  setIsLoading(true);

  try {
    // Wait 2 seconds so browser fully writes cookie
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Re-check session (important)
    await checkUserStatus();

    navigate("/dashboard", { replace: true });

  } catch (error) {
    console.error("Failed redirect:", error);
    navigate("/login");
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="flex flex-col h-full w-full bg-white dark:bg-[#131526] items-center justify-center text-center p-8 transition-colors duration-200">
      
      <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-full">
        <CheckCircle className="h-16 w-16 text-green-500" />
      </div>

      <h2 className="text-3xl font-bold text-gray-900 dark:text-[#F1F1F1] mb-3">
        Account Complete!
      </h2>

      <p className="text-lg text-gray-600 dark:text-[#cbd5e1] mb-8">
        Your account has been created successfully 🎉
      </p>

      <button
        onClick={goToDashboard}
        disabled={isLoading}
        className="w-full max-w-xs py-3.5 bg-pyngl-pink hover:bg-pyngl-pink-dark text-white rounded-full shadow-lg font-semibold transition-all transform hover:scale-105 flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Loading...
          </>
        ) : (
          "Go to Dashboard"
        )}
      </button>
    </div>
  );
};

export default SuccessMessage;