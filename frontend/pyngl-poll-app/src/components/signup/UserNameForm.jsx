// // import React, { useEffect, useRef, useState, useMemo } from "react";
// // import { ArrowLeft, Loader2 } from "lucide-react";

// // const UsernameForm = ({ onSuccess, onBack }) => {
// //   const [loading, setLoading] = useState(false);
// //   const [username, setUsername] = useState("");
// //   const usernameInputRef = useRef(null);

// //   const [usernameSuggestions, setUsernameSuggestions] = useState([]);
// //   const [usernameTaken, setUsernameTaken] = useState(false);
// //   const [isCheckingUsername, setIsCheckingUsername] = useState(false);

// //   const [agreedToTerms, setAgreedToTerms] = useState(false);
// //   const [generalError, setGeneralError] = useState("");

// //   // Auto-focus username
// //   useEffect(() => {
// //     usernameInputRef.current?.focus();
// //   }, []);

// //   // Username availability check
// //   useEffect(() => {
// //     const usernameTrimmed = username.trim();
// //     if (!usernameTrimmed || usernameTrimmed.length < 3) {
// //       setUsernameSuggestions([]);
// //       setUsernameTaken(false);
// //       return;
// //     }

// //     setIsCheckingUsername(true);

// //     // Mock taken usernames
// //     const takenUsernames = [
// //       "jorge123", "peteLilly", "jay123", "john", "admin", "user", "test", "patel_jay", "jaypatel_21"
// //     ];

// //     const timer = setTimeout(() => {
// //       if (takenUsernames.includes(usernameTrimmed.toLowerCase())) {
// //         setUsernameTaken(true);
// //         // Provide suggestions
// //         setUsernameSuggestions([
// //           "jay@123",
// //           "patel_jay",
// //           "jay123",
// //         ]);
// //       } else {
// //         setUsernameTaken(false);
// //         setUsernameSuggestions([]);
// //       }
// //       setIsCheckingUsername(false);
// //     }, 500);

// //     return () => clearTimeout(timer);
// //   }, [username]);

// //   const isFormValid = useMemo(
// //     () =>
// //       username.trim().length >= 3 &&
// //       !usernameTaken &&
// //       !isCheckingUsername && // Wait for check to finish
// //       agreedToTerms,
// //     [username, usernameTaken, isCheckingUsername, agreedToTerms]
// //   );

// //   const handleSubmit = () => {
// //     if (!isFormValid) {
// //       setGeneralError("Please agree to the terms to continue.");
// //       return;
// //     }

// //     setLoading(true);
// //     setGeneralError("");

// //     // Simulate API call
// //     setTimeout(() => {
// //       setLoading(false);
// //       onSuccess(username);
// //     }, 1500);
// //   };

// //   const applySuggestion = (suggestion) => {
// //     setUsername(suggestion);
// //     setUsernameSuggestions([]);
// //     setUsernameTaken(false);
// //   };

// //   return (
// //     <div className="flex flex-col h-full w-full bg-white dark:bg-[#131526] transition-colors duration-200">
      
// //       {/* Header */}
// //       <div className="shrink-0 w-full flex items-center justify-between px-4 py-4 border-b border-gray-100 dark:border-[#2D3148]">
// //         <button
// //           onClick={onBack}
// //           className="p-2 hover:bg-gray-100 dark:hover:bg-[rgba(255,255,255,0.03)] rounded-full transition"
// //         >
// //           <ArrowLeft className="h-5 w-5 text-gray-600 dark:text-[#F1F1F1]" />
// //         </button>
// //         {/* Title */}
// //         <h1 className="text-xl font-semibold text-gray-900 dark:text-[#F1F1F1]">Make username</h1>
// //         <div className="w-9"></div> {/* Spacer */}
// //       </div>

// //       {/* Body */}
// //       <div className="flex-1 w-full overflow-y-auto">
// //         <div className="w-full max-w-md mx-auto px-6 py-8">
// //           <p className="text-sm text-gray-500 dark:text-[#cbd5e1] mb-6 font-medium text-center">
// //             Step 2 of 3 
// //           </p>
          
// //           <h2 className="text-2xl font-bold text-gray-900 dark:text-[#F1F1F1] mb-8">Make username</h2>

// //           {/* Username Input */}
// //           <div className="space-y-2 pb-4">
// //             <div className="relative">
// //               <input
// //                 ref={usernameInputRef}
// //                 type="text"
// //                 placeholder="Enter username"
// //                 value={username}
// //                 onChange={(e) => setUsername(e.target.value)}
// //                 disabled={loading}
// //                 className={`w-full px-4 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pyngl-pink bg-white dark:bg-[#1B1F33] text-gray-900 dark:text-[#F1F1F1] placeholder-gray-400 dark:placeholder-[#7b8393] transition-colors duration-150 ${
// //                   usernameTaken 
// //                     ? "border-red-500 dark:border-red-400" 
// //                     : "border-gray-300 dark:border-[#2D3148]"
// //                 }`}
// //               />
// //               {isCheckingUsername && username.length >= 3 && (
// //                 <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 animate-spin text-gray-400 dark:text-[#9aa4b2]" />
// //               )}
// //             </div>

// //             {/* Suggestions */}
// //             {usernameTaken && (
// //               <div className="bg-pink-50 dark:bg-[rgba(255,77,116,0.06)] text-pink-600 dark:text-[#ffb3c0] border border-pink-100 dark:border-[rgba(255,77,116,0.12)] p-3 rounded-lg mt-2 transition-colors">
// //                 <div className="flex items-start">
// //                   <span className="mr-2 text-lg leading-tight">😒</span>
// //                   <span className="text-sm font-medium">
// //                     Username already taken, try one of these:
// //                   </span>
// //                 </div>
// //                 <div className="flex flex-wrap gap-2 mt-3">
// //                   {usernameSuggestions.map((suggestion, index) => (
// //                     <button
// //                       key={index}
// //                       type="button"
// //                       onClick={() => applySuggestion(suggestion)}
// //                       className="px-4 py-1.5 bg-pyngl-pink text-white text-sm font-semibold rounded-full hover:bg-pyngl-pink-dark transition"
// //                     >
// //                       {suggestion}
// //                     </button>
// //                   ))}
// //                 </div>
// //               </div>
// //             )}
// //           </div>
          
// //           {/* Terms */}
// //           <div className="flex items-start gap-3 pt-6 mt-4">
// //             <input
// //               type="checkbox"
// //               id="terms"
// //               checked={agreedToTerms}
// //               onChange={(e) => setAgreedToTerms(e.target.checked)}
// //               disabled={loading}
// //               className="mt-1 h-4 w-4 rounded border-gray-300 text-pyngl-pink focus:ring-pyngl-pink dark:bg-[#1B1F33] dark:border-[#2D3148]"
// //             />
// //             <label htmlFor="terms" className="text-sm text-gray-600 dark:text-[#cbd5e1]">
// //               By tapping "Agree and continue", below
// //               you agree to the{" "}
// //               <span className="text-blue-600 dark:text-[#5467FE] underline cursor-pointer">
// //                 Terms of services
// //               </span>{" "}
// //               and acknowledge that you have read the{" "}
// //               <span className="text-blue-600 dark:text-[#5467FE] underline cursor-pointer">
// //                 Privacy policy
// //               </span>
// //               .
// //             </label>
// //           </div>

// //           {generalError && (
// //             <div className="text-center text-red-600 text-sm p-2 bg-red-50 dark:bg-[rgba(255,0,0,0.06)] dark:text-[#ffb3c0] rounded-lg mt-4">
// //               {generalError}
// //             </div>
// //           )}

// //           {/* Continue Button */}
// //           <div className="pt-6">
// //             <button
// //               onClick={handleSubmit}
// //               disabled={loading || !isFormValid}
// //               className="w-full py-3.5 px-4 text-white font-semibold rounded-full shadow-md transition-all bg-pyngl-pink hover:bg-pyngl-pink-dark disabled:bg-gray-400 flex items-center justify-center"
// //             >
// //               {loading ? (
// //                 <>
// //                   <Loader2 className="mr-2 h-5 w-5 animate-spin" />
// //                   Please wait...
// //                 </>
// //               ) : (
// //                 "Agree and continue"
// //               )}
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default UsernameForm;
// import React, { useEffect, useRef, useState, useMemo } from "react";
// import { ArrowLeft, Loader2 } from "lucide-react";
// import apiClient from "../../api/axiosConfig"; // ✅ Import your API client

// const UsernameForm = ({ onSuccess, onBack }) => {
//   const [loading, setLoading] = useState(false);
//   const [username, setUsername] = useState("");
//   const usernameInputRef = useRef(null);

//   const [usernameSuggestions, setUsernameSuggestions] = useState([]);
//   const [usernameTaken, setUsernameTaken] = useState(false);
//   const [isCheckingUsername, setIsCheckingUsername] = useState(false);

//   const [agreedToTerms, setAgreedToTerms] = useState(false);
//   const [generalError, setGeneralError] = useState("");

//   // Auto-focus username
//   useEffect(() => {
//     usernameInputRef.current?.focus();
//   }, []);

//   // ✅ Real-time Username availability check
//   useEffect(() => {
//     const usernameTrimmed = username.trim();
    
//     // Reset state if input is too short
//     if (!usernameTrimmed || usernameTrimmed.length < 3) {
//       setUsernameSuggestions([]);
//       setUsernameTaken(false);
//       return;
//     }

//     setIsCheckingUsername(true);

//     // Debounce: Wait 500ms after user stops typing
//     const timer = setTimeout(async () => {
//       try {
//         // Hit the new backend endpoint
//         const { data } = await apiClient.post('/users/check-username', { 
//             username: usernameTrimmed 
//         });

//         if (data.available) {
//             setUsernameTaken(false);
//             setUsernameSuggestions([]);
//         } else {
//             // If taken, backend returns available: false AND suggestions array
//             setUsernameTaken(true);
//             setUsernameSuggestions(data.suggestions || []);
//         }
//       } catch (error) {
//         console.error("Error checking username:", error);
//         // Optional: Handle server error (e.g., setGeneralError("Network error"))
//       } finally {
//         setIsCheckingUsername(false);
//       }
//     }, 500);

//     return () => clearTimeout(timer);
//   }, [username]);

//   const isFormValid = useMemo(
//     () =>
//       username.trim().length >= 3 &&
//       !usernameTaken &&
//       !isCheckingUsername && // Wait for check to finish
//       agreedToTerms,
//     [username, usernameTaken, isCheckingUsername, agreedToTerms]
//   );

//   const handleSubmit = () => {
//     if (!isFormValid) {
//       setGeneralError("Please agree to the terms to continue.");
//       return;
//     }

//     setLoading(true);
//     setGeneralError("");

//     // Proceed to next step
//     // (No need to verify again here since the useEffect handles it, 
//     // but you could do one final check if you wanted to be strictly safe)
//     onSuccess(username);
//   };

//   const applySuggestion = (suggestion) => {
//     setUsername(suggestion);
//     setUsernameSuggestions([]);
//     setUsernameTaken(false);
//   };

//   return (
//     <div className="flex flex-col h-full w-full bg-white dark:bg-[#131526] transition-colors duration-200">
      
//       {/* Header */}
//       <div className="shrink-0 w-full flex items-center justify-between px-4 py-4 border-b border-gray-100 dark:border-[#2D3148]">
//         <button
//           onClick={onBack}
//           className="p-2 hover:bg-gray-100 dark:hover:bg-[rgba(255,255,255,0.03)] rounded-full transition"
//         >
//           <ArrowLeft className="h-5 w-5 text-gray-600 dark:text-[#F1F1F1]" />
//         </button>
//         {/* Title */}
//         <h1 className="text-xl font-semibold text-gray-900 dark:text-[#F1F1F1]">Make username</h1>
//         <div className="w-9"></div> {/* Spacer */}
//       </div>

//       {/* Body */}
//       <div className="flex-1 w-full overflow-y-auto">
//         <div className="w-full max-w-md mx-auto px-6 py-8">
//           <p className="text-sm text-gray-500 dark:text-[#cbd5e1] mb-6 font-medium text-center">
//             Step 2 of 3 
//           </p>
          
//           <h2 className="text-2xl font-bold text-gray-900 dark:text-[#F1F1F1] mb-8">Make username</h2>

//           {/* Username Input */}
//           <div className="space-y-2 pb-4">
//             <div className="relative">
//               <input
//                 ref={usernameInputRef}
//                 type="text"
//                 placeholder="Enter username"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 disabled={loading}
//                 className={`w-full px-4 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pyngl-pink bg-white dark:bg-[#1B1F33] text-gray-900 dark:text-[#F1F1F1] placeholder-gray-400 dark:placeholder-[#7b8393] transition-colors duration-150 ${
//                   usernameTaken 
//                     ? "border-red-500 dark:border-red-400" 
//                     : "border-gray-300 dark:border-[#2D3148]"
//                 }`}
//               />
//               {isCheckingUsername && username.length >= 3 && (
//                 <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 animate-spin text-gray-400 dark:text-[#9aa4b2]" />
//               )}
//             </div>

//             {/* Suggestions */}
//             {usernameTaken && (
//               <div className="bg-pink-50 dark:bg-[rgba(255,77,116,0.06)] text-pink-600 dark:text-[#ffb3c0] border border-pink-100 dark:border-[rgba(255,77,116,0.12)] p-3 rounded-lg mt-2 transition-colors">
//                 <div className="flex items-start">
//                   <span className="mr-2 text-lg leading-tight">😒</span>
//                   <span className="text-sm font-medium">
//                     Username already taken, try one of these:
//                   </span>
//                 </div>
//                 <div className="flex flex-wrap gap-2 mt-3">
//                   {usernameSuggestions.map((suggestion, index) => (
//                     <button
//                       key={index}
//                       type="button"
//                       onClick={() => applySuggestion(suggestion)}
//                       className="px-4 py-1.5 bg-pyngl-pink text-white text-sm font-semibold rounded-full hover:bg-pyngl-pink-dark transition"
//                     >
//                       {suggestion}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
          
//           {/* Terms */}
//           <div className="flex items-start gap-3 pt-6 mt-4">
//             <input
//               type="checkbox"
//               id="terms"
//               checked={agreedToTerms}
//               onChange={(e) => setAgreedToTerms(e.target.checked)}
//               disabled={loading}
//               className="mt-1 h-4 w-4 rounded border-gray-300 text-pyngl-pink focus:ring-pyngl-pink dark:bg-[#1B1F33] dark:border-[#2D3148]"
//             />
//             <label htmlFor="terms" className="text-sm text-gray-600 dark:text-[#cbd5e1]">
//               By tapping "Agree and continue", below
//               you agree to the{" "}
//               <span className="text-blue-600 dark:text-[#5467FE] underline cursor-pointer">
//                 Terms of services
//               </span>{" "}
//               and acknowledge that you have read the{" "}
//               <span className="text-blue-600 dark:text-[#5467FE] underline cursor-pointer">
//                 Privacy policy
//               </span>
//               .
//             </label>
//           </div>

//           {generalError && (
//             <div className="text-center text-red-600 text-sm p-2 bg-red-50 dark:bg-[rgba(255,0,0,0.06)] dark:text-[#ffb3c0] rounded-lg mt-4">
//               {generalError}
//             </div>
//           )}

//           {/* Continue Button */}
//           <div className="pt-6">
//             <button
//               onClick={handleSubmit}
//               disabled={loading || !isFormValid}
//               className="w-full py-3.5 px-4 text-white font-semibold rounded-full shadow-md transition-all bg-pyngl-pink hover:bg-pyngl-pink-dark disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
//             >
//               {loading ? (
//                 <>
//                   <Loader2 className="mr-2 h-5 w-5 animate-spin" />
//                   Please wait...
//                 </>
//               ) : (
//                 "Agree and continue"
//               )}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UsernameForm;

import React, { useEffect, useRef, useState, useMemo } from "react";
import { ArrowLeft, Loader2 } from "lucide-react";
import apiClient from "../../api/axiosConfig";

const UsernameForm = ({ onSuccess, onBack }) => {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const usernameInputRef = useRef(null);

  const [usernameSuggestions, setUsernameSuggestions] = useState([]);
  const [usernameTaken, setUsernameTaken] = useState(false);
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);

  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [generalError, setGeneralError] = useState("");

  // Auto-focus username
  useEffect(() => {
    usernameInputRef.current?.focus();
  }, []);

  // ✅ Real-time Username availability check
  useEffect(() => {
    const usernameTrimmed = username.trim();
    
    // Reset state if input is too short
    if (!usernameTrimmed || usernameTrimmed.length < 3) {
      setUsernameSuggestions([]);
      setUsernameTaken(false);
      return;
    }

    setIsCheckingUsername(true);

    // Debounce: Wait 500ms after user stops typing
    const timer = setTimeout(async () => {
      try {
        // ✅ Using full path '/api/users/check-username' to match backend routes
        const { data } = await apiClient.post('/api/users/check-username', { 
            username: usernameTrimmed 
        });

        if (data.available) {
            setUsernameTaken(false);
            setUsernameSuggestions([]);
        } else {
            // If taken, backend returns available: false AND suggestions array
            setUsernameTaken(true);
            setUsernameSuggestions(data.suggestions || []);
        }
      } catch (error) {
        console.error("Error checking username:", error);
        // Optional: Handle server error (e.g., setGeneralError("Network error"))
      } finally {
        setIsCheckingUsername(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [username]);

  const isFormValid = useMemo(
    () =>
      username.trim().length >= 3 &&
      !usernameTaken &&
      !isCheckingUsername && // Wait for check to finish
      agreedToTerms,
    [username, usernameTaken, isCheckingUsername, agreedToTerms]
  );

  const handleSubmit = () => {
    if (!isFormValid) {
      setGeneralError("Please agree to the terms to continue.");
      return;
    }

    setLoading(true);
    setGeneralError("");

    // Proceed to next step
    onSuccess(username);
  };

  const applySuggestion = (suggestion) => {
    setUsername(suggestion);
    setUsernameSuggestions([]);
    setUsernameTaken(false);
  };

  return (
    <div className="flex flex-col h-full w-full bg-white dark:bg-[#131526] transition-colors duration-200">
      
      {/* Header */}
      <div className="shrink-0 w-full flex items-center justify-between px-4 py-4 border-b border-gray-100 dark:border-[#2D3148]">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-100 dark:hover:bg-[rgba(255,255,255,0.03)] rounded-full transition"
        >
          <ArrowLeft className="h-5 w-5 text-gray-600 dark:text-[#F1F1F1]" />
        </button>
        {/* Title */}
        <h1 className="text-xl font-semibold text-gray-900 dark:text-[#F1F1F1]">Make username</h1>
        <div className="w-9"></div> {/* Spacer */}
      </div>

      {/* Body */}
      <div className="flex-1 w-full overflow-y-auto">
        <div className="w-full max-w-md mx-auto px-6 py-8">
          <p className="text-sm text-gray-500 dark:text-[#cbd5e1] mb-6 font-medium text-center">
            Step 2 of 3 
          </p>
          
          <h2 className="text-2xl font-bold text-gray-900 dark:text-[#F1F1F1] mb-8">Make username</h2>

          {/* Username Input */}
          <div className="space-y-2 pb-4">
            <div className="relative">
              <input
                ref={usernameInputRef}
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={loading}
                className={`w-full px-4 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pyngl-pink bg-white dark:bg-[#1B1F33] text-gray-900 dark:text-[#F1F1F1] placeholder-gray-400 dark:placeholder-[#7b8393] transition-colors duration-150 ${
                  usernameTaken 
                    ? "border-red-500 dark:border-red-400" 
                    : "border-gray-300 dark:border-[#2D3148]"
                }`}
              />
              {isCheckingUsername && username.length >= 3 && (
                <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 animate-spin text-gray-400 dark:text-[#9aa4b2]" />
              )}
            </div>

            {/* Suggestions */}
            {usernameTaken && (
              <div className="bg-pink-50 dark:bg-[rgba(255,77,116,0.06)] text-pink-600 dark:text-[#ffb3c0] border border-pink-100 dark:border-[rgba(255,77,116,0.12)] p-3 rounded-lg mt-2 transition-colors">
                <div className="flex items-start">
                  <span className="mr-2 text-lg leading-tight">😒</span>
                  <span className="text-sm font-medium">
                    Username already taken, try one of these:
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {usernameSuggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => applySuggestion(suggestion)}
                      className="px-4 py-1.5 bg-pyngl-pink text-white text-sm font-semibold rounded-full hover:bg-pyngl-pink-dark transition"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Terms */}
          <div className="flex items-start gap-3 pt-6 mt-4">
            <input
              type="checkbox"
              id="terms"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              disabled={loading}
              className="mt-1 h-4 w-4 rounded border-gray-300 text-pyngl-pink focus:ring-pyngl-pink dark:bg-[#1B1F33] dark:border-[#2D3148]"
            />
            <label htmlFor="terms" className="text-sm text-gray-600 dark:text-[#cbd5e1]">
              By tapping "Agree and continue", below
              you agree to the{" "}
              <span className="text-blue-600 dark:text-[#5467FE] underline cursor-pointer">
                Terms of services
              </span>{" "}
              and acknowledge that you have read the{" "}
              <span className="text-blue-600 dark:text-[#5467FE] underline cursor-pointer">
                Privacy policy
              </span>
              .
            </label>
          </div>

          {generalError && (
            <div className="text-center text-red-600 text-sm p-2 bg-red-50 dark:bg-[rgba(255,0,0,0.06)] dark:text-[#ffb3c0] rounded-lg mt-4">
              {generalError}
            </div>
          )}

          {/* Continue Button */}
          <div className="pt-6">
            <button
              onClick={handleSubmit}
              disabled={loading || !isFormValid}
              className="w-full py-3.5 px-4 text-white font-semibold rounded-full shadow-md transition-all bg-pyngl-pink hover:bg-pyngl-pink-dark disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Please wait...
                </>
              ) : (
                "Agree and continue"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsernameForm;