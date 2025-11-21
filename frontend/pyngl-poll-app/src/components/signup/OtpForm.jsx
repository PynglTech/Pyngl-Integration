// // // // // import React, { useEffect, useRef, useState } from "react";
// // // // // import { ArrowLeft, Loader2 } from "lucide-react";
// // // // // import { useNavigate, useLocation } from "react-router-dom";

// // // // // const OtpForm = () => {
// // // // //   const [otp, setOtp] = useState(new Array(6).fill(""));
// // // // //   const [loading, setLoading] = useState(false);
// // // // //   const [error, setError] = useState("");
// // // // //   const inputRefs = useRef([]);

// // // // //   const navigate = useNavigate();
// // // // //   const location = useLocation();

// // // // //   // Email passed from /signup → RegisterForm.jsx
// // // // //   const email = location.state?.email || "your email";

// // // // //   // Auto-focus first OTP box
// // // // //   useEffect(() => {
// // // // //     inputRefs.current[0]?.focus();
// // // // //   }, []);

// // // // //   const handleChange = (element, index) => {
// // // // //     const value = element.value.slice(-1);
// // // // //     if (!/^\d*$/.test(value)) return;

// // // // //     const newOtp = [...otp];
// // // // //     newOtp[index] = value;
// // // // //     setOtp(newOtp);
// // // // //     setError("");

// // // // //     // Move to next input
// // // // //     if (value !== "" && index < 5) {
// // // // //       inputRefs.current[index + 1]?.focus();
// // // // //     }
// // // // //   };

// // // // //   const handleKeyDown = (e, index) => {
// // // // //     if (e.key === "Backspace" && index > 0 && otp[index] === "") {
// // // // //       inputRefs.current[index - 1]?.focus();
// // // // //     }
// // // // //   };

// // // // //   const handlePaste = (e) => {
// // // // //     e.preventDefault();
// // // // //     const pasteData = e.clipboardData.getData("text").trim();

// // // // //     if (pasteData.length === 6 && /^\d+$/.test(pasteData)) {
// // // // //       setOtp(pasteData.split(""));
// // // // //       inputRefs.current[5]?.focus();
// // // // //       setError("");
// // // // //     } else {
// // // // //       setError("Please paste a valid 6-digit code.");
// // // // //     }
// // // // //   };

// // // // //   const handleSubmit = () => {
// // // // //     const code = otp.join("");

// // // // //     if (code.length !== 6) {
// // // // //       setError("Please enter the complete 6-digit code.");
// // // // //       return;
// // // // //     }

// // // // //     setLoading(true);
// // // // //     setError("");

// // // // //     setTimeout(() => {
// // // // //       setLoading(false);

// // // // //       if (code === "123456") {
// // // // //         navigate("/dob", {
// // // // //           state: { email }, // pass email forward
// // // // //         });
// // // // //       } else {
// // // // //         setError("Invalid verification code. Please try again.");
// // // // //       }
// // // // //     }, 1500);
// // // // //   };

// // // // //   const handleResend = () => {
// // // // //     setOtp(new Array(6).fill(""));
// // // // //     setError("New code sent! Check your email.");
// // // // //     inputRefs.current[0]?.focus();
// // // // //   };

// // // // //   return (
// // // // //     <div className="flex flex-col h-screen w-full max-w-md mx-auto bg-white shadow-xl">

// // // // //       {/* Header */}
// // // // //       <div className="flex items-center justify-center relative px-4 py-4 border-b border-gray-100">
// // // // //         <button
// // // // //           onClick={() => navigate(-1)}
// // // // //           className="absolute left-4 p-2 hover:bg-gray-100 rounded-full"
// // // // //           disabled={loading}
// // // // //         >
// // // // //           <ArrowLeft className="h-5 w-5 text-gray-600" />
// // // // //         </button>

// // // // //         <h1 className="text-xl font-semibold text-gray-900">Create account</h1>
// // // // //       </div>

// // // // //       {/* Body */}
// // // // //       <div className="flex-1 p-6 flex flex-col items-center text-center">
// // // // //         <p className="text-sm text-gray-500 mb-4">Step 2 of 3</p>

// // // // //         <h2 className="text-2xl font-bold mb-4">Confirm your email</h2>

// // // // //         <p className="text-gray-600 mb-8 max-w-xs">
// // // // //           Enter the 6-digit code sent to{" "}
// // // // //           <strong className="text-gray-900">{email}</strong>
// // // // //         </p>

// // // // //         {/* OTP Inputs */}
// // // // //         <div className="flex justify-center gap-2 mb-6" onPaste={handlePaste}>
// // // // //           {otp.map((digit, index) => (
// // // // //             <input
// // // // //               key={index}
// // // // //               ref={(el) => (inputRefs.current[index] = el)}
// // // // //               type="text"
// // // // //               maxLength="1"
// // // // //               value={digit}
// // // // //               onChange={(e) => handleChange(e.target, index)}
// // // // //               onKeyDown={(e) => handleKeyDown(e, index)}
// // // // //               disabled={loading}
// // // // //               className={`otp-input w-12 h-14 text-center text-2xl font-mono border-2 rounded-xl shadow-sm ${
// // // // //                 error ? "border-red-500" : "border-gray-300"
// // // // //               }`}
// // // // //             />
// // // // //           ))}
// // // // //         </div>

// // // // //         {error && <p className="text-sm text-red-500 mb-4">{error}</p>}

// // // // //         <button
// // // // //           onClick={handleResend}
// // // // //           disabled={loading}
// // // // //           className="text-sm font-medium text-blue-600 hover:text-blue-800"
// // // // //         >
// // // // //           Resend code
// // // // //         </button>
// // // // //       </div>

// // // // //       {/* Footer */}
// // // // //       <div className="p-6 pt-4">
// // // // //         <button
// // // // //           onClick={handleSubmit}
// // // // //           disabled={loading || otp.includes("")}
// // // // //           className="w-full py-4 text-white font-semibold rounded-full bg-pyngl-pink hover:bg-pyngl-pink-dark disabled:bg-gray-400 flex items-center justify-center"
// // // // //         >
// // // // //           {loading ? (
// // // // //             <>
// // // // //               <Loader2 className="mr-2 h-5 w-5 animate-spin" />
// // // // //               Verifying...
// // // // //             </>
// // // // //           ) : (
// // // // //             "Continue"
// // // // //           )}
// // // // //         </button>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default OtpForm;


// // // // import React, { useEffect, useRef, useState } from "react";
// // // // import { ArrowLeft, Loader2 } from "lucide-react";

// // // // const OtpForm = ({ email, onBack, onVerifySuccess }) => {
// // // //   const [otp, setOtp] = useState(new Array(6).fill(""));
// // // //   const [loading, setLoading] = useState(false);
// // // //   const [error, setError] = useState("");
// // // //   const inputRefs = useRef([]);

// // // //   useEffect(() => {
// // // //     inputRefs.current[0]?.focus();
// // // //   }, []);

// // // //   // Handle OTP change
// // // //   const handleChange = (element, index) => {
// // // //     const value = element.value.slice(-1);
// // // //     if (!/^\d*$/.test(value)) return;

// // // //     const newOtp = [...otp];
// // // //     newOtp[index] = value;
// // // //     setOtp(newOtp);
// // // //     setError("");

// // // //     if (value !== "" && index < 5) {
// // // //       inputRefs.current[index + 1]?.focus();
// // // //     }
// // // //   };

// // // //   // Handle Backspace
// // // //   const handleKeyDown = (e, index) => {
// // // //     if (e.key === "Backspace" && index > 0 && otp[index] === "") {
// // // //       inputRefs.current[index - 1]?.focus();
// // // //     }
// // // //   };

// // // //   // Handle Paste
// // // //   const handlePaste = (e) => {
// // // //     e.preventDefault();
// // // //     const pasted = e.clipboardData.getData("text").trim();

// // // //     if (pasted.length === 6 && /^\d+$/.test(pasted)) {
// // // //       setOtp(pasted.split(""));
// // // //       inputRefs.current[5]?.focus();
// // // //       setError("");
// // // //     } else {
// // // //       setError("Please paste a valid 6-digit code.");
// // // //     }
// // // //   };

// // // //   const isOtpComplete = otp.every((d) => d !== "");

// // // //   // Submit OTP
// // // //   const handleSubmit = () => {
// // // //     const code = otp.join("");
// // // //     if (code.length !== 6) {
// // // //       setError("Please enter the complete 6-digit code.");
// // // //       return;
// // // //     }

// // // //     setLoading(true);
// // // //     setError("");

// // // //     setTimeout(() => {
// // // //       setLoading(false);

// // // //       if (code === "123456") {
// // // //         onVerifySuccess(); // step → dob
// // // //       } else {
// // // //         setError("Invalid verification code. Please try again.");
// // // //       }
// // // //     }, 1400);
// // // //   };

// // // //   // Resend OTP
// // // //   const handleResend = () => {
// // // //     setOtp(new Array(6).fill(""));
// // // //     setError("New code sent! Check your email.");
// // // //     inputRefs.current[0]?.focus();
// // // //   };

// // // //   return (
// // // //     <div className="flex flex-col h-full w-full bg-white dark:bg-[#131526] transition-colors duration-200">
      
// // // //       {/* Header - Occupies Full Width */}
// // // //       <div className="shrink-0 w-full flex items-center justify-center relative px-4 py-4 border-b border-gray-100 dark:border-[#2D3148]">
// // // //         <button
// // // //           onClick={onBack}
// // // //           className="absolute left-4 p-2 hover:bg-gray-100 dark:hover:bg-[rgba(255,255,255,0.03)] rounded-full transition"
// // // //           disabled={loading}
// // // //         >
// // // //           <ArrowLeft className="h-5 w-5 text-gray-600 dark:text-[#F1F1F1]" />
// // // //         </button>

// // // //         <h1 className="text-xl font-semibold text-gray-900 dark:text-[#F1F1F1]">
// // // //           Create account
// // // //         </h1>
// // // //       </div>

// // // //       {/* Scrollable Area */}
// // // //       <div className="flex-1 w-full overflow-y-auto">
// // // //         {/* Inner Container - Centered and constrained to max-w-md */}
// // // //         <div className="w-full max-w-md mx-auto px-6 py-8 flex flex-col items-center text-center">
          
// // // //           <p className="text-sm text-gray-500 dark:text-[#cbd5e1] mb-6 font-medium">
// // // //             Step 2 of 3
// // // //           </p>

// // // //           <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-[#F1F1F1]">
// // // //             Confirm your email
// // // //           </h2>

// // // //           <p className="text-gray-600 dark:text-[#9aa4b2] mb-8 max-w-xs">
// // // //             Enter the code sent to{" "}
// // // //             <strong className="font-medium text-gray-900 dark:text-white">
// // // //               {email}
// // // //             </strong>
// // // //           </p>

// // // //           {/* OTP Inputs */}
// // // //           <div className="flex justify-center gap-2 mb-6 w-full" onPaste={handlePaste}>
// // // //             {otp.map((digit, index) => (
// // // //               <input
// // // //                 key={index}
// // // //                 ref={(el) => (inputRefs.current[index] = el)}
// // // //                 type="text"
// // // //                 inputMode="numeric"
// // // //                 maxLength="1"
// // // //                 value={digit}
// // // //                 onChange={(e) => handleChange(e.target, index)}
// // // //                 onKeyDown={(e) => handleKeyDown(e, index)}
// // // //                 disabled={loading}
// // // //                 className={`w-12 h-14 text-center text-2xl font-mono border-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-pyngl-pink transition-colors duration-150 
// // // //                   bg-white dark:bg-[#1B1F33] 
// // // //                   text-gray-900 dark:text-[#F1F1F1]
// // // //                   ${
// // // //                     error
// // // //                       ? "border-red-500 dark:border-red-400"
// // // //                       : "border-gray-300 dark:border-[#2D3148]"
// // // //                   }`}
// // // //               />
// // // //             ))}
// // // //           </div>

// // // //           {error && (
// // // //             <div className="text-center text-red-600 text-sm p-2 bg-red-50 rounded-lg mb-4 w-full dark:bg-[rgba(255,0,0,0.06)] dark:text-[#ffb3c0]">
// // // //               {error}
// // // //             </div>
// // // //           )}

// // // //           <button
// // // //             onClick={handleResend}
// // // //             disabled={loading}
// // // //             className="text-sm font-medium text-blue-600 dark:text-[#5467FE] hover:text-blue-800 dark:hover:text-[#7b8aff] mb-8 transition-colors"
// // // //           >
// // // //             Resend code
// // // //           </button>

// // // //           {/* Continue Button */}
// // // //           <div className="w-full">
// // // //             <button
// // // //               onClick={handleSubmit}
// // // //               disabled={loading || !isOtpComplete}
// // // //               className="w-full py-3.5 px-4 text-white font-semibold rounded-full shadow-md transition-all bg-pyngl-pink hover:bg-pyngl-pink-dark disabled:bg-gray-400 flex items-center justify-center"
// // // //             >
// // // //               {loading ? (
// // // //                 <>
// // // //                   <Loader2 className="mr-2 h-5 w-5 animate-spin" />
// // // //                   Verifying...
// // // //                 </>
// // // //               ) : (
// // // //                 "Continue"
// // // //               )}
// // // //             </button>
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default OtpForm;
// // // import React, { useEffect, useRef, useState } from "react";
// // // import { ArrowLeft, Loader2 } from "lucide-react";
// // // import axios from "axios"; // ✅ Import axios

// // // const OtpForm = ({ email, onBack, onVerifySuccess }) => {
// // //   const [otp, setOtp] = useState(new Array(6).fill(""));
// // //   const [loading, setLoading] = useState(false);
// // //   const [error, setError] = useState("");
// // //   const inputRefs = useRef([]);

// // //   useEffect(() => {
// // //     inputRefs.current[0]?.focus();
// // //   }, []);

// // //   // Handle OTP change
// // //   const handleChange = (element, index) => {
// // //     const value = element.value.slice(-1);
// // //     if (!/^\d*$/.test(value)) return;

// // //     const newOtp = [...otp];
// // //     newOtp[index] = value;
// // //     setOtp(newOtp);
// // //     setError("");

// // //     if (value !== "" && index < 5) {
// // //       inputRefs.current[index + 1]?.focus();
// // //     }
// // //   };

// // //   // Handle Backspace
// // //   const handleKeyDown = (e, index) => {
// // //     if (e.key === "Backspace" && index > 0 && otp[index] === "") {
// // //       inputRefs.current[index - 1]?.focus();
// // //     }
// // //   };

// // //   // Handle Paste
// // //   const handlePaste = (e) => {
// // //     e.preventDefault();
// // //     const pasted = e.clipboardData.getData("text").trim();

// // //     if (pasted.length === 6 && /^\d+$/.test(pasted)) {
// // //       setOtp(pasted.split(""));
// // //       inputRefs.current[5]?.focus();
// // //       setError("");
// // //     } else {
// // //       setError("Please paste a valid 6-digit code.");
// // //     }
// // //   };

// // //   const isOtpComplete = otp.every((d) => d !== "");

// // //   // ✅ Submit OTP to Backend
// // //   const handleSubmit = async () => {
// // //     const code = otp.join("");
// // //     if (code.length !== 6) {
// // //       setError("Please enter the complete 6-digit code.");
// // //       return;
// // //     }

// // //     setLoading(true);
// // //     setError("");

// // //     try {
// // //       // Call the verification endpoint
// // //       await axios.post('/api/users/verify-otp', {
// // //         email,
// // //         otp: code
// // //       });
      
// // //       // If successful:
// // //       onVerifySuccess(); 

// // //     } catch (err) {
// // //       const msg = err.response?.data?.message || "Invalid verification code. Please try again.";
// // //       setError(msg);
// // //       // Clear OTP field on error? Optional.
// // //       // setOtp(new Array(6).fill("")); 
// // //       // inputRefs.current[0]?.focus();
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   // ✅ Resend OTP via Backend
// // //   const handleResend = async () => {
// // //     setLoading(true);
// // //     setError("");
    
// // //     try {
// // //       await axios.post('/api/users/send-otp', { email });
// // //       setError("New code sent! Check your email."); // Using setError for success msg temporarily or add a success state
      
// // //       setOtp(new Array(6).fill(""));
// // //       inputRefs.current[0]?.focus();
// // //     } catch (err) {
// // //       const msg = err.response?.data?.message || "Failed to resend code.";
// // //       setError(msg);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   return (
// // //     <div className="flex flex-col h-full w-full bg-white dark:bg-[#131526] transition-colors duration-200">
      
// // //       {/* Header - Occupies Full Width */}
// // //       <div className="shrink-0 w-full flex items-center justify-center relative px-4 py-4 border-b border-gray-100 dark:border-[#2D3148]">
// // //         <button
// // //           onClick={onBack}
// // //           className="absolute left-4 p-2 hover:bg-gray-100 dark:hover:bg-[rgba(255,255,255,0.03)] rounded-full transition"
// // //           disabled={loading}
// // //         >
// // //           <ArrowLeft className="h-5 w-5 text-gray-600 dark:text-[#F1F1F1]" />
// // //         </button>

// // //         <h1 className="text-xl font-semibold text-gray-900 dark:text-[#F1F1F1]">
// // //           Create account
// // //         </h1>
// // //       </div>

// // //       {/* Scrollable Area */}
// // //       <div className="flex-1 w-full overflow-y-auto">
// // //         {/* Inner Container - Centered and constrained to max-w-md */}
// // //         <div className="w-full max-w-md mx-auto px-6 py-8 flex flex-col items-center text-center">
          
// // //           <p className="text-sm text-gray-500 dark:text-[#cbd5e1] mb-6 font-medium">
// // //             Step 2 of 3
// // //           </p>

// // //           <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-[#F1F1F1]">
// // //             Confirm your email
// // //           </h2>

// // //           <p className="text-gray-600 dark:text-[#9aa4b2] mb-8 max-w-xs">
// // //             Enter the code sent to{" "}
// // //             <strong className="font-medium text-gray-900 dark:text-white">
// // //               {email}
// // //             </strong>
// // //           </p>

// // //           {/* OTP Inputs */}
// // //           <div className="flex justify-center gap-2 mb-6 w-full" onPaste={handlePaste}>
// // //             {otp.map((digit, index) => (
// // //               <input
// // //                 key={index}
// // //                 ref={(el) => (inputRefs.current[index] = el)}
// // //                 type="text"
// // //                 inputMode="numeric"
// // //                 maxLength="1"
// // //                 value={digit}
// // //                 onChange={(e) => handleChange(e.target, index)}
// // //                 onKeyDown={(e) => handleKeyDown(e, index)}
// // //                 disabled={loading}
// // //                 className={`w-12 h-14 text-center text-2xl font-mono border-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-pyngl-pink transition-colors duration-150 
// // //                   bg-white dark:bg-[#1B1F33] 
// // //                   text-gray-900 dark:text-[#F1F1F1]
// // //                   ${
// // //                     error
// // //                       ? "border-red-500 dark:border-red-400"
// // //                       : "border-gray-300 dark:border-[#2D3148]"
// // //                   }`}
// // //               />
// // //             ))}
// // //           </div>

// // //           {error && (
// // //             <div className={`text-center text-sm p-2 rounded-lg mb-4 w-full ${
// // //                 error.includes("sent") 
// // //                 ? "text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-900/20" 
// // //                 : "text-red-600 bg-red-50 dark:text-[#ffb3c0] dark:bg-[rgba(255,0,0,0.06)]"
// // //             }`}>
// // //               {error}
// // //             </div>
// // //           )}

// // //           <button
// // //             onClick={handleResend}
// // //             disabled={loading}
// // //             className="text-sm font-medium text-blue-600 dark:text-[#5467FE] hover:text-blue-800 dark:hover:text-[#7b8aff] mb-8 transition-colors disabled:opacity-50"
// // //           >
// // //             Resend code
// // //           </button>

// // //           {/* Continue Button */}
// // //           <div className="w-full">
// // //             <button
// // //               onClick={handleSubmit}
// // //               disabled={loading || !isOtpComplete}
// // //               className="w-full py-3.5 px-4 text-white font-semibold rounded-full shadow-md transition-all bg-pyngl-pink hover:bg-pyngl-pink-dark disabled:bg-gray-400 flex items-center justify-center"
// // //             >
// // //               {loading ? (
// // //                 <>
// // //                   <Loader2 className="mr-2 h-5 w-5 animate-spin" />
// // //                   Verifying...
// // //                 </>
// // //               ) : (
// // //                 "Continue"
// // //               )}
// // //             </button>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default OtpForm;
// // import React, { useEffect, useRef, useState } from "react";
// // import { ArrowLeft, Loader2 } from "lucide-react";
// // import axios from "axios";

// // const OtpForm = ({ email, onBack, onVerifySuccess }) => {
// //   const [otp, setOtp] = useState(new Array(6).fill(""));
// //   const [loading, setLoading] = useState(false);
// //   const [resendLoading, setResendLoading] = useState(false); // Separate loading state for resend
// //   const [error, setError] = useState("");
// //   const [successMsg, setSuccessMsg] = useState("");
// //   const inputRefs = useRef([]);

// //   useEffect(() => {
// //     inputRefs.current[0]?.focus();
// //   }, []);

// //   // Handle OTP change
// //   const handleChange = (element, index) => {
// //     const value = element.value.slice(-1);
// //     if (!/^\d*$/.test(value)) return;

// //     const newOtp = [...otp];
// //     newOtp[index] = value;
// //     setOtp(newOtp);
// //     setError("");

// //     if (value !== "" && index < 5) {
// //       inputRefs.current[index + 1]?.focus();
// //     }
// //   };

// //   // Handle Backspace
// //   const handleKeyDown = (e, index) => {
// //     if (e.key === "Backspace" && index > 0 && otp[index] === "") {
// //       inputRefs.current[index - 1]?.focus();
// //     }
// //   };

// //   // Handle Paste
// //   const handlePaste = (e) => {
// //     e.preventDefault();
// //     const pasted = e.clipboardData.getData("text").trim();

// //     if (pasted.length === 6 && /^\d+$/.test(pasted)) {
// //       setOtp(pasted.split(""));
// //       inputRefs.current[5]?.focus();
// //       setError("");
// //     } else {
// //       setError("Please paste a valid 6-digit code.");
// //     }
// //   };

// //   const isOtpComplete = otp.every((d) => d !== "");

// //   // ✅ Submit OTP to Backend
// //   const handleSubmit = async () => {
// //     const code = otp.join("");
// //     if (code.length !== 6) {
// //       setError("Please enter the complete 6-digit code.");
// //       return;
// //     }

// //     setLoading(true);
// //     setError("");

// //     try {
// //       // Call the verification endpoint
// //       await axios.post('/api/users/verify-otp', {
// //         email,
// //         otp: code
// //       });
      
// //       // If successful:
// //       onVerifySuccess(); 

// //     } catch (err) {
// //       const msg = err.response?.data?.message || "Invalid verification code. Please try again.";
// //       setError(msg);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // ✅ Resend OTP via Backend
// //   const handleResend = async () => {
// //     setResendLoading(true);
// //     setError("");
// //     setSuccessMsg("");
    
// //     try {
// //       await axios.post('/api/users/send-otp', { email });
// //       setSuccessMsg("New code sent! Check your email.");
      
// //       // Reset OTP input
// //       setOtp(new Array(6).fill(""));
// //       inputRefs.current[0]?.focus();
// //     } catch (err) {
// //       console.error("Resend Error:", err);
// //       const msg = err.response?.data?.message || "Failed to send code. Server might be down.";
// //       setError(msg);
// //     } finally {
// //       setResendLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="flex flex-col h-full w-full bg-white dark:bg-[#131526] transition-colors duration-200">
      
// //       {/* Header */}
// //       <div className="shrink-0 w-full flex items-center justify-center relative px-4 py-4 border-b border-gray-100 dark:border-[#2D3148]">
// //         <button
// //           onClick={onBack}
// //           className="absolute left-4 p-2 hover:bg-gray-100 dark:hover:bg-[rgba(255,255,255,0.03)] rounded-full transition"
// //           disabled={loading}
// //         >
// //           <ArrowLeft className="h-5 w-5 text-gray-600 dark:text-[#F1F1F1]" />
// //         </button>

// //         <h1 className="text-xl font-semibold text-gray-900 dark:text-[#F1F1F1]">
// //           Create account
// //         </h1>
// //       </div>

// //       {/* Body */}
// //       <div className="flex-1 w-full overflow-y-auto">
// //         <div className="w-full max-w-md mx-auto px-6 py-8 flex flex-col items-center text-center">
          
// //           <p className="text-sm text-gray-500 dark:text-[#cbd5e1] mb-6 font-medium">
// //             Step 2 of 3
// //           </p>

// //           <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-[#F1F1F1]">
// //             Confirm your email
// //           </h2>

// //           <p className="text-gray-600 dark:text-[#9aa4b2] mb-8 max-w-xs">
// //             Enter the code sent to{" "}
// //             <strong className="font-medium text-gray-900 dark:text-white">
// //               {email}
// //             </strong>
// //           </p>

// //           {/* OTP Inputs */}
// //           <div className="flex justify-center gap-2 mb-6 w-full" onPaste={handlePaste}>
// //             {otp.map((digit, index) => (
// //               <input
// //                 key={index}
// //                 ref={(el) => (inputRefs.current[index] = el)}
// //                 type="text"
// //                 inputMode="numeric"
// //                 maxLength="1"
// //                 value={digit}
// //                 onChange={(e) => handleChange(e.target, index)}
// //                 onKeyDown={(e) => handleKeyDown(e, index)}
// //                 disabled={loading}
// //                 className={`w-12 h-14 text-center text-2xl font-mono border-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-pyngl-pink transition-colors duration-150 
// //                   bg-white dark:bg-[#1B1F33] 
// //                   text-gray-900 dark:text-[#F1F1F1]
// //                   ${
// //                     error
// //                       ? "border-red-500 dark:border-red-400"
// //                       : "border-gray-300 dark:border-[#2D3148]"
// //                   }`}
// //               />
// //             ))}
// //           </div>

// //           {/* Error Message */}
// //           {error && (
// //             <div className="text-center text-sm p-2 rounded-lg mb-4 w-full text-red-600 bg-red-50 dark:text-[#ffb3c0] dark:bg-[rgba(255,0,0,0.06)]">
// //               {error}
// //             </div>
// //           )}

// //           {/* Success Message (Resend) */}
// //           {successMsg && (
// //             <div className="text-center text-sm p-2 rounded-lg mb-4 w-full text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-900/20">
// //               {successMsg}
// //             </div>
// //           )}

// //           <button
// //             onClick={handleResend}
// //             disabled={loading || resendLoading}
// //             className="text-sm font-medium text-blue-600 dark:text-[#5467FE] hover:text-blue-800 dark:hover:text-[#7b8aff] mb-8 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
// //           >
// //             {resendLoading && <Loader2 className="h-3 w-3 animate-spin" />}
// //             Resend code
// //           </button>

// //           {/* Continue Button */}
// //           <div className="w-full">
// //             <button
// //               onClick={handleSubmit}
// //               disabled={loading || !isOtpComplete}
// //               className="w-full py-3.5 px-4 text-white font-semibold rounded-full shadow-md transition-all bg-pyngl-pink hover:bg-pyngl-pink-dark disabled:bg-gray-400 flex items-center justify-center"
// //             >
// //               {loading ? (
// //                 <>
// //                   <Loader2 className="mr-2 h-5 w-5 animate-spin" />
// //                   Verifying...
// //                 </>
// //               ) : (
// //                 "Continue"
// //               )}
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default OtpForm;
// import React, { useEffect, useRef, useState } from "react";
// import { ArrowLeft, Loader2 } from "lucide-react";
// import apiClient from "../../api/axiosConfig"; // ✅ Use your configured API Client

// const OtpForm = ({ email, onBack, onVerifySuccess }) => {
//   const [otp, setOtp] = useState(new Array(6).fill(""));
//   const [loading, setLoading] = useState(false);
//   const [resendLoading, setResendLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [successMsg, setSuccessMsg] = useState("");
//   const inputRefs = useRef([]);

//   useEffect(() => {
//     inputRefs.current[0]?.focus();
//   }, []);

//   // Handle OTP change
//   const handleChange = (element, index) => {
//     const value = element.value.slice(-1);
//     if (!/^\d*$/.test(value)) return;

//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);
//     setError("");

//     if (value !== "" && index < 5) {
//       inputRefs.current[index + 1]?.focus();
//     }
//   };

//   // Handle Backspace
//   const handleKeyDown = (e, index) => {
//     if (e.key === "Backspace" && index > 0 && otp[index] === "") {
//       inputRefs.current[index - 1]?.focus();
//     }
//   };

//   // Handle Paste
//   const handlePaste = (e) => {
//     e.preventDefault();
//     const pasted = e.clipboardData.getData("text").trim();

//     if (pasted.length === 6 && /^\d+$/.test(pasted)) {
//       setOtp(pasted.split(""));
//       inputRefs.current[5]?.focus();
//       setError("");
//     } else {
//       setError("Please paste a valid 6-digit code.");
//     }
//   };

//   const isOtpComplete = otp.every((d) => d !== "");

//   // ✅ Submit OTP using apiClient
//   const handleSubmit = async () => {
//     const code = otp.join("");
//     if (code.length !== 6) {
//       setError("Please enter the complete 6-digit code.");
//       return;
//     }

//     setLoading(true);
//     setError("");

//     try {
//       // Using apiClient ensures it hits http://192.168.1.5:5000/api/...
//       await apiClient.post('/api/users/verify-otp', {
//         email,
//         otp: code
//       });
      
//       onVerifySuccess(); 

//     } catch (err) {
//       const msg = err.response?.data?.message || "Invalid verification code. Please try again.";
//       setError(msg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Resend OTP using apiClient
//   const handleResend = async () => {
//     setResendLoading(true);
//     setError("");
//     setSuccessMsg("");
    
//     try {
//       // Using apiClient ensures it hits the same backend as ForgotPassword
//       await apiClient.post('/api/users/send-otp', { email });
//       setSuccessMsg("New code sent! Check your email.");
      
//       setOtp(new Array(6).fill(""));
//       inputRefs.current[0]?.focus();
//     } catch (err) {
//       console.error("Resend Error:", err);
//       const msg = err.response?.data?.message || "Failed to send code. Server might be down.";
//       setError(msg);
//     } finally {
//       setResendLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col h-full w-full bg-white dark:bg-[#131526] transition-colors duration-200">
      
//       {/* Header */}
//       <div className="shrink-0 w-full flex items-center justify-center relative px-4 py-4 border-b border-gray-100 dark:border-[#2D3148]">
//         <button
//           onClick={onBack}
//           className="absolute left-4 p-2 hover:bg-gray-100 dark:hover:bg-[rgba(255,255,255,0.03)] rounded-full transition"
//           disabled={loading}
//         >
//           <ArrowLeft className="h-5 w-5 text-gray-600 dark:text-[#F1F1F1]" />
//         </button>

//         <h1 className="text-xl font-semibold text-gray-900 dark:text-[#F1F1F1]">
//           Create account
//         </h1>
//       </div>

//       {/* Body */}
//       <div className="flex-1 w-full overflow-y-auto">
//         <div className="w-full max-w-md mx-auto px-6 py-8 flex flex-col items-center text-center">
          
//           <p className="text-sm text-gray-500 dark:text-[#cbd5e1] mb-6 font-medium">
//             Step 2 of 3
//           </p>

//           <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-[#F1F1F1]">
//             Confirm your email
//           </h2>

//           <p className="text-gray-600 dark:text-[#9aa4b2] mb-8 max-w-xs">
//             Enter the code sent to{" "}
//             <strong className="font-medium text-gray-900 dark:text-white">
//               {email}
//             </strong>
//           </p>

//           {/* OTP Inputs */}
//           <div className="flex justify-center gap-2 mb-6 w-full" onPaste={handlePaste}>
//             {otp.map((digit, index) => (
//               <input
//                 key={index}
//                 ref={(el) => (inputRefs.current[index] = el)}
//                 type="text"
//                 inputMode="numeric"
//                 maxLength="1"
//                 value={digit}
//                 onChange={(e) => handleChange(e.target, index)}
//                 onKeyDown={(e) => handleKeyDown(e, index)}
//                 disabled={loading}
//                 className={`w-12 h-14 text-center text-2xl font-mono border-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-pyngl-pink transition-colors duration-150 
//                   bg-white dark:bg-[#1B1F33] 
//                   text-gray-900 dark:text-[#F1F1F1]
//                   ${
//                     error
//                       ? "border-red-500 dark:border-red-400"
//                       : "border-gray-300 dark:border-[#2D3148]"
//                   }`}
//               />
//             ))}
//           </div>

//           {error && (
//             <div className="text-center text-sm p-2 rounded-lg mb-4 w-full text-red-600 bg-red-50 dark:text-[#ffb3c0] dark:bg-[rgba(255,0,0,0.06)]">
//               {error}
//             </div>
//           )}

//           {successMsg && (
//             <div className="text-center text-sm p-2 rounded-lg mb-4 w-full text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-900/20">
//               {successMsg}
//             </div>
//           )}

//           <button
//             onClick={handleResend}
//             disabled={loading || resendLoading}
//             className="text-sm font-medium text-blue-600 dark:text-[#5467FE] hover:text-blue-800 dark:hover:text-[#7b8aff] mb-8 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
//           >
//             {resendLoading && <Loader2 className="h-3 w-3 animate-spin" />}
//             Resend code
//           </button>

//           {/* Continue Button */}
//           <div className="w-full">
//             <button
//               onClick={handleSubmit}
//               disabled={loading || !isOtpComplete}
//               className="w-full py-3.5 px-4 text-white font-semibold rounded-full shadow-md transition-all bg-pyngl-pink hover:bg-pyngl-pink-dark disabled:bg-gray-400 flex items-center justify-center"
//             >
//               {loading ? (
//                 <>
//                   <Loader2 className="mr-2 h-5 w-5 animate-spin" />
//                   Verifying...
//                 </>
//               ) : (
//                 "Continue"
//               )}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OtpForm;
import React, { useEffect, useRef, useState } from "react";
import { ArrowLeft, Loader2 } from "lucide-react";
import axios from "axios";

// ✅ ROBUST API CONFIGURATION
const getBackendURL = () => {
  try {
    if (import.meta.env.VITE_API_URL) return import.meta.env.VITE_API_URL;
  } catch (e) {}
  
  const protocol = window.location.protocol; 
  const hostname = window.location.hostname;
  return `${protocol}//${hostname}:5000`;
};

const apiClient = axios.create({
  baseURL: getBackendURL(),
  withCredentials: true,
});

const OtpForm = ({ email, onBack, onVerifySuccess }) => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const inputRefs = useRef([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  // Handle OTP change
  const handleChange = (element, index) => {
    const value = element.value.slice(-1);
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError("");

    if (value !== "" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && index > 0 && otp[index] === "") {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").trim();

    if (pasted.length === 6 && /^\d+$/.test(pasted)) {
      setOtp(pasted.split(""));
      inputRefs.current[5]?.focus();
      setError("");
    } else {
      setError("Please paste a valid 6-digit code.");
    }
  };

  const isOtpComplete = otp.every((d) => d !== "");

  // ✅ Submit OTP
  const handleSubmit = async () => {
    const code = otp.join("");
    if (code.length !== 6) {
      setError("Please enter the complete 6-digit code.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // ✅ Critical Fix: Trim and lowercase the email before sending
      const cleanEmail = email.toLowerCase().trim();
      
      await apiClient.post('/api/users/verify-otp', {
        email: cleanEmail,
        otp: code
      });
      
      onVerifySuccess(); 

    } catch (err) {
      const msg = err.response?.data?.message || "Invalid verification code. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Resend OTP
  const handleResend = async () => {
    setResendLoading(true);
    setError("");
    setSuccessMsg("");
    
    try {
      // ✅ Critical Fix: Trim and lowercase here too
      const cleanEmail = email.toLowerCase().trim();
      
      await apiClient.post('/api/users/send-otp', { email: cleanEmail });
      setSuccessMsg("New code sent! Check your email.");
      
      setOtp(new Array(6).fill(""));
      inputRefs.current[0]?.focus();
    } catch (err) {
      console.error("Resend Error:", err);
      const msg = err.response?.data?.message || "Failed to send code. Server might be down.";
      setError(msg);
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-white dark:bg-[#131526] transition-colors duration-200">
      
      <div className="shrink-0 w-full flex items-center justify-center relative px-4 py-4 border-b border-gray-100 dark:border-[#2D3148]">
        <button
          onClick={onBack}
          className="absolute left-4 p-2 hover:bg-gray-100 dark:hover:bg-[rgba(255,255,255,0.03)] rounded-full transition"
          disabled={loading}
        >
          <ArrowLeft className="h-5 w-5 text-gray-600 dark:text-[#F1F1F1]" />
        </button>

        <h1 className="text-xl font-semibold text-gray-900 dark:text-[#F1F1F1]">
          Create account
        </h1>
      </div>

      <div className="flex-1 w-full overflow-y-auto">
        <div className="w-full max-w-md mx-auto px-6 py-8 flex flex-col items-center text-center">
          
          <p className="text-sm text-gray-500 dark:text-[#cbd5e1] mb-6 font-medium">
            Step 2 of 3
          </p>

          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-[#F1F1F1]">
            Confirm your email
          </h2>

          <p className="text-gray-600 dark:text-[#9aa4b2] mb-8 max-w-xs">
            Enter the code sent to{" "}
            <strong className="font-medium text-gray-900 dark:text-white">
              {email}
            </strong>
          </p>

          <div className="flex justify-center gap-2 mb-6 w-full" onPaste={handlePaste}>
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e.target, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                disabled={loading}
                className={`w-12 h-14 text-center text-2xl font-mono border-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-pyngl-pink transition-colors duration-150 
                  bg-white dark:bg-[#1B1F33] 
                  text-gray-900 dark:text-[#F1F1F1]
                  ${
                    error
                      ? "border-red-500 dark:border-red-400"
                      : "border-gray-300 dark:border-[#2D3148]"
                  }`}
              />
            ))}
          </div>

          {error && (
            <div className="text-center text-sm p-2 rounded-lg mb-4 w-full text-red-600 bg-red-50 dark:text-[#ffb3c0] dark:bg-[rgba(255,0,0,0.06)]">
              {error}
            </div>
          )}

          {successMsg && (
            <div className="text-center text-sm p-2 rounded-lg mb-4 w-full text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-900/20">
              {successMsg}
            </div>
          )}

          <button
            onClick={handleResend}
            disabled={loading || resendLoading}
            className="text-sm font-medium text-blue-600 dark:text-[#5467FE] hover:text-blue-800 dark:hover:text-[#7b8aff] mb-8 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {resendLoading && <Loader2 className="h-3 w-3 animate-spin" />}
            Resend code
          </button>

          <div className="w-full">
            <button
              onClick={handleSubmit}
              disabled={loading || !isOtpComplete}
              className="w-full py-3.5 px-4 text-white font-semibold rounded-full shadow-md transition-all bg-pyngl-pink hover:bg-pyngl-pink-dark disabled:bg-gray-400 flex items-center justify-center"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Verifying...
                </>
              ) : (
                "Continue"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpForm;