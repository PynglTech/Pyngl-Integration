

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
