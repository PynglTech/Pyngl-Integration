// // import React from 'react';
// // import { useForm } from 'react-hook-form';
// // import { zodResolver } from '@hookform/resolvers/zod';
// // import { registerSchema } from '../../utils/validationSchemas';
// // import useAuthStore from '../../store/useAuthStore';
// // import BottomSheet from '../common/BottomSheet';
// // import { FormInput, FormError } from '../common/FormInput';
// // import { User, Mail, Smartphone, Lock } from 'lucide-react';

// // const RegisterSheet = ({ openSheet }) => {
// //     const { register: registerUser, loading, error } = useAuthStore();
// //     const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(registerSchema) });
    
// //     const onSubmit = async (data) => {
// //         await registerUser(data.username, data.email, data.password, data.phoneNumber, data.age).catch(e => console.error(e));
// //     };

// //     return (
// //         <BottomSheet>
// //             <div className="text-left mb-6"><h2 className="text-xl font-bold">REGISTER</h2></div>
// //             <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
// //                 {error && <FormError message={error} />}
// //                 <FormInput Icon={User} type="text" label="Username" id="username" register={register} error={errors.username} />
// //                 <FormInput Icon={Mail} type="email" label="Email" id="email" register={register} error={errors.email} />
// //                 <FormInput Icon={Smartphone} type="tel" label="Phone Number" id="phoneNumber" register={register} error={errors.phoneNumber} />
// //                 <FormInput Icon={User} type="number" label="Age" id="age" register={register} error={errors.age} />
// //                 <FormInput Icon={Lock} type="password" label="Choose a password" id="password" register={register} error={errors.password} />
// //                 <button type="submit" disabled={loading} className="w-full py-3.5 px-4 bg-pyngl-purple text-white font-bold rounded-full shadow-lg mt-4 disabled:bg-purple-300">
// //                     {loading ? 'Creating Account...' : 'REGISTER'}
// //                 </button>
// //                 <p className="text-center text-sm text-gray-500 pt-1">
// //                     Already Registered? <button type="button" onClick={() => openSheet('login')} className="font-bold text-pyngl-purple hover:underline">Sign In Here.</button>
// //                 </p>
// //             </form>
// //         </BottomSheet>
// //     );
// // };

// // export default RegisterSheet;

// import React from 'react';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { registerSchema } from '../../utils/validationSchemas';
// import useAuthStore from '../../store/useAuthStore';
// import BottomSheet from '../common/BottomSheet';
// import { FormInput, FormError } from '../common/FormInput';
// // CHANGED: Imported the Calendar icon
// import { User, Mail, Smartphone, Lock, Calendar } from 'lucide-react';

// const RegisterSheet = ({ openSheet }) => {
//     const { register: registerUser, loading, error } = useAuthStore();
//     const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(registerSchema) });
    
//     const onSubmit = async (data) => {
//         // CHANGED: Now sending data.birthDate instead of data.age
//         await registerUser(data.username, data.email, data.password, data.phoneNumber, data.birthDate)
//             .catch(e => console.error(e));
//     };

//     return (
//         <BottomSheet>
//             <div className="text-left mb-6"><h2 className="text-xl font-bold">REGISTER</h2></div>
//             <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//                 {error && <FormError message={error} />}
//                 <FormInput Icon={User} type="text" label="Username" id="username" register={register} error={errors.username} />
//                 <FormInput Icon={Mail} type="email" label="Email" id="email" register={register} error={errors.email} />
//                 <FormInput Icon={Smartphone} type="tel" label="Phone Number" id="phoneNumber" register={register} error={errors.phoneNumber} />
                
//                 {/* --- THIS INPUT HAS BEEN CHANGED --- */}
//                 <FormInput 
//                     Icon={Calendar} 
//                     type="date" 
//                     label="Date of Birth" 
//                     id="birthDate" 
//                     register={register} 
//                     error={errors.birthDate} 
//                 />
                
//                 <FormInput Icon={Lock} type="password" label="Choose a password" id="password" register={register} error={errors.password} />
                
//                 <button type="submit" disabled={loading} className="w-full py-3.5 px-4 bg-pyngl-purple text-white font-bold rounded-full shadow-lg mt-4 disabled:bg-purple-300">
//                     {loading ? 'Creating Account...' : 'REGISTER'}
//                 </button>
//                 <p className="text-center text-sm text-gray-500 pt-1">
//                     Already Registered? <button type="button" onClick={() => openSheet('login')} className="font-bold text-pyngl-purple hover:underline">Sign In Here.</button>
//                 </p>
//             </form>
//         </BottomSheet>
//     );
// };

// export default RegisterSheet;
// import React, { useEffect, useRef } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { registerSchema } from "../../utils/validationSchemas";
// import useAuthStore from "../../store/useAuthStore";
// import BottomSheet from "../common/BottomSheet";
// import { FormInput } from "../common/FormInput";
// import {
//   User,
//   Mail,
//   Smartphone,
//   Lock,
//   Calendar,
//   AlertTriangle,
// } from "lucide-react";

// const RegisterSheet = ({ openSheet, closeSheet }) => {
//   const { register: registerUser, loading, error, clearError } = useAuthStore();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: zodResolver(registerSchema),
//   });

//   const usernameInputRef = useRef(null);

//   useEffect(() => {
//     usernameInputRef.current?.focus();
//   }, []);

//   // ✅ Submit with error reset and safe handling
//   const onSubmit = async (data) => {
//     try {
//       clearError?.();
//       await registerUser(data);
//       // ✅ MobileAuthPage will handle redirect
//       closeSheet?.();
//     } catch {
//       // Zustand handles error display
//     }
//   };

//   return (
//     <BottomSheet closeSheet={closeSheet}>
//       <div className="flex flex-col w-full p-8">
//         <div className="text-left mb-8">
//           <h1 className="text-3xl font-bold tracking-tight">Create Account</h1>
//           <p className="text-gray-500 mt-1">
//             Join the Pyngl community today!
//           </p>
//         </div>

//         <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-5">
//           {error && (
//             <div className="flex items-center gap-x-3 p-3 text-sm font-semibold text-red-800 bg-red-100 border border-red-200 rounded-lg">
//               <AlertTriangle className="h-5 w-5" />
//               <span>{error}</span>
//             </div>
//           )}

//           <FormInput
//             Icon={User}
//             type="text"
//             label="Username"
//             id="username"
//             register={register}
//             error={errors.username}
//             ref={usernameInputRef}
//             disabled={loading}
//           />
//           <FormInput
//             Icon={Mail}
//             type="email"
//             label="Email"
//             id="email"
//             register={register}
//             error={errors.email}
//             disabled={loading}
//           />
//           <FormInput
//             Icon={Smartphone}
//             type="tel"
//             label="Phone Number"
//             id="phoneNumber"
//             register={register}
//             error={errors.phoneNumber}
//             disabled={loading}
//           />
//           <FormInput
//             Icon={Calendar}
//             type="date"
//             label="Date of Birth"
//             id="birthDate"
//             register={register}
//             error={errors.birthDate}
//             disabled={loading}
//           />
//           <FormInput
//             Icon={Lock}
//             type="password"
//             label="Password"
//             id="password"
//             register={register}
//             error={errors.password}
//             disabled={loading}
//           />
//           <FormInput
//             Icon={Lock}
//             type="password"
//             label="Confirm Password"
//             id="confirmPassword"
//             register={register}
//             error={errors.confirmPassword}
//             disabled={loading}
//           />

//           <div className="pt-2">
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full py-3.5 px-4 bg-pyngl-pink text-white font-bold rounded-full shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pyngl-pink disabled:bg-pink-300 disabled:cursor-not-allowed"
//             >
//               {loading ? "Creating Account..." : "CREATE ACCOUNT"}
//             </button>
//           </div>

//           <p className="text-center text-sm text-gray-500 pt-1">
//             Already have an account?{" "}
//             <button
//               type="button"
//               onClick={() => openSheet("login")}
//               className="font-semibold text-pyngl-pink hover:underline"
//               disabled={loading}
//             >
//               Sign In
//             </button>
//           </p>
//         </form>
//       </div>
//     </BottomSheet>
//   );
// };

// export default RegisterSheet;


import React, { useEffect, useRef, useState, useMemo } from "react";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  Loader2,
  CheckCircle,
  Calendar,
} from "lucide-react";

// --- Custom Tailwind Configuration (for pyngl-pink) ---
const CustomStyles = () => (
  <style>
    {`
      .bg-pyngl-pink { background-color: #ec4899; }
      .hover\\:bg-pyngl-pink-dark:hover { background-color: #db2777; }
      .text-pyngl-pink { color: #ec4899; }
      .focus\\:ring-pyngl-pink:focus { --tw-ring-color: #ec4899; }
      .otp-input:focus {
        border-color: #ec4899;
        box-shadow: 0 0 0 2px #ec4899;
        outline: none;
      }
      .date-picker-overlay {
        position: fixed; inset: 0; background-color: rgba(0, 0, 0, 0.5);
        display: flex; align-items: flex-end; justify-content: center; z-index: 50;
      }
      .date-picker-content {
        background-color: white; width: 100%; max-width: 400px;
        padding-bottom: 24px; border-top-left-radius: 24px; border-top-right-radius: 24px;
        box-shadow: 0 -10px 30px rgba(0, 0, 0, 0.2);
      }
    `}
  </style>
);

// -------------------------------------------------------------------
// --- 1. Register Sheet Component (Step 1) ---
// -------------------------------------------------------------------
const RegisterSheet = ({ onSuccess, loading, setLoading }) => {
  const [formData, setFormData] = useState({ username: "", email: "", password: "", confirmPassword: "" });
  const usernameInputRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [usernameSuggestions, setUsernameSuggestions] = useState([]);
  const [usernameTaken, setUsernameTaken] = useState(false);
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [generalError, setGeneralError] = useState("");
  useEffect(() => { usernameInputRef.current?.focus(); }, []);
  useEffect(() => {
    const username = formData.username.trim();
    if (!username || username.length < 3) { setUsernameSuggestions([]); setUsernameTaken(false); return; }
    setIsCheckingUsername(true);
    const checkUsername = () => {
      const takenUsernames = ['jorge123', 'peteLilly', 'jay123', 'john', 'admin', 'user', 'test'];
      if (takenUsernames.includes(username.toLowerCase())) {
        setUsernameTaken(true);
        setUsernameSuggestions([`${username}_1`, `${username}_23`, `${username}${Math.floor(Math.random() * 100)}`]);
      } else { setUsernameTaken(false); setUsernameSuggestions([]); }
      setIsCheckingUsername(false);
    };
    const timer = setTimeout(checkUsername, 500);
    return () => clearTimeout(timer);
  }, [formData.username]);
  useEffect(() => { const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; setEmailError(formData.email && !emailRegex.test(formData.email) ? "Please enter a valid email address." : ""); }, [formData.email]);
  useEffect(() => { const p = formData.password; setPasswordError(p.length > 0 && p.length < 8 ? "Must include: 8+ characters" : ""); }, [formData.password]);
  useEffect(() => { setConfirmPasswordError(formData.confirmPassword && formData.password !== formData.confirmPassword ? "Passwords must be identical." : ""); }, [formData.password, formData.confirmPassword]);
  const handleInputChange = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));
  const isFormValid = useMemo(() => (formData.username.trim() && formData.email.trim() && formData.password && formData.confirmPassword && !emailError && !passwordError && !confirmPasswordError && !usernameTaken && agreedToTerms), [formData, emailError, passwordError, confirmPasswordError, usernameTaken, agreedToTerms]);
  const handleSubmit = () => {
    if (!isFormValid) { setGeneralError("Please complete the form and fix all validation errors."); return; }
    setLoading(true); setGeneralError("");
    setTimeout(() => { setLoading(false); onSuccess(formData.email, formData.username); }, 1500);
  };
  const applySuggestion = (suggestion) => { setFormData(prev => ({ ...prev, username: suggestion })); setUsernameSuggestions([]); setUsernameTaken(false); };
  return (
    <div className="flex flex-col h-screen w-full max-w-md mx-auto bg-white shadow-xl">
      <div className="flex items-center justify-center relative px-4 py-4 border-b border-gray-100">
        <h1 className="text-xl font-semibold text-gray-900">Create account</h1>
      </div>
      <div className="flex-1 px-6 py-8 overflow-y-auto">
        <div className="w-full space-y-6">
          <p className="text-sm text-gray-500 mb-6 font-medium text-center">Step 1 of 3 (Account Credentials)</p>
          <div className="space-y-2">
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input ref={usernameInputRef} type="text" placeholder="Username (for login)" value={formData.username} onChange={(e) => handleInputChange('username', e.target.value)} disabled={loading || isCheckingUsername} className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pyngl-pink ${usernameTaken ? 'border-red-500' : 'border-gray-300'}`} />
              {isCheckingUsername && formData.username.length >= 3 && (<Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 animate-spin text-gray-400" />)}
            </div>
            {usernameTaken && (<div className="pl-4 flex items-start gap-2"><span className="text-sm">😭</span><div className="flex-1"><p className="text-sm text-red-500 mb-2">Username taken. Try:</p><div className="flex flex-wrap gap-2">{usernameSuggestions.map((suggestion, index) => (<button key={index} type="button" onClick={() => applySuggestion(suggestion)} className="px-3 py-1 bg-pyngl-pink text-white text-xs font-medium rounded-full hover:shadow-md">{suggestion}</button>))}</div></div></div>)}
          </div>
          <div className="space-y-2">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input type="email" placeholder="Email address" value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)} disabled={loading} className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pyngl-pink ${emailError ? 'border-red-500' : 'border-gray-300'}`} />
            </div>
            {emailError && (<div className="pl-4 flex items-start gap-2"><span className="text-sm text-red-500">•</span><p className="text-sm text-red-500">{emailError}</p></div>)}
          </div>
          <div className="space-y-2">
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input type={showPassword ? "text" : "password"} placeholder="Enter password" value={formData.password} onChange={(e) => handleInputChange('password', e.target.value)} disabled={loading} className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pyngl-pink ${passwordError ? 'border-red-500' : 'border-gray-300'}`} />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 p-1">{showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}</button>
            </div>
            {passwordError && (<div className="pl-4 flex items-start gap-2"><span className="text-sm text-red-500">•</span><p className="text-sm text-red-500">{passwordError}</p></div>)}
          </div>
          <div className="space-y-2">
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input type={showConfirmPassword ? "text" : "password"} placeholder="Confirm password" value={formData.confirmPassword} onChange={(e) => handleInputChange('confirmPassword', e.target.value)} disabled={loading} className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pyngl-pink ${confirmPasswordError ? 'border-red-500' : 'border-gray-300'}`} />
              <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 p-1">{showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}</button>
            </div>
            {confirmPasswordError && (<div className="pl-4 flex items-start gap-2"><span className="text-sm text-red-500">•</span><p className="text-sm text-red-500">{confirmPasswordError}</p></div>)}
          </div>
          <div className="flex items-start gap-3 pt-6">
            <input type="checkbox" id="terms" checked={agreedToTerms} onChange={(e) => setAgreedToTerms(e.target.checked)} className="mt-1 h-4 w-4 rounded border-gray-300 text-pyngl-pink focus:ring-pyngl-pink" disabled={loading} />
            <label htmlFor="terms" className="text-sm text-gray-600">By tapping "Continue", you agree to the <span className="text-blue-500 underline cursor-pointer">Terms of services</span> and <span className="text-blue-500 underline cursor-pointer">privacy policy</span>.</label>
          </div>
          {generalError && (<div className="text-center text-red-600 text-sm p-2 bg-red-50 rounded-lg">{generalError}</div>)}
          <div className="pt-2">
            <button onClick={handleSubmit} disabled={loading || !isFormValid} className="w-full py-3.5 px-4 text-white font-semibold rounded-full shadow-md transition-all bg-pyngl-pink hover:bg-pyngl-pink-dark disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center">
              {loading ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" />Registering...</> : "Continue"}
            </button>
          </div>
          <div className="relative py-4"><div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-300"></div></div><div className="relative flex justify-center"><span className="bg-white px-4 text-sm text-gray-500 font-medium">OR</span></div></div>
          <div className="flex justify-center gap-4 pb-12">
            <button type="button" className="p-3 border border-gray-300 rounded-2xl hover:bg-gray-50" disabled={loading}><svg className="h-6 w-6" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg></button>
            <button type="button" className="p-3 border border-gray-300 rounded-2xl hover:bg-gray-50 bg-black" disabled={loading}><svg className="h-6 w-6" viewBox="0 0 24 24" fill="white"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" /></svg></button>
          </div>
        </div>
      </div>
    </div>
  );
};


// -------------------------------------------------------------------
// --- 2. OTP Verification Component (Step 2) ---
// -------------------------------------------------------------------
const OtpVerificationSheet = ({ onBack, email, onVerificationSuccess }) => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRefs = useRef([]);
  useEffect(() => { inputRefs.current[0]?.focus(); }, []);
  const handleChange = (element, index) => {
    const value = element.value.slice(-1);
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp]; newOtp[index] = value; setOtp(newOtp); setError("");
    if (value !== "" && index < 5) inputRefs.current[index + 1]?.focus();
  };
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && index > 0 && otp[index] === "") inputRefs.current[index - 1]?.focus();
  };
  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').trim();
    if (pasteData.length === 6 && /^\d+$/.test(pasteData)) {
      setOtp(pasteData.split(''));
      inputRefs.current[5]?.focus();
      setError("");
    } else { setError("Please paste a valid 6-digit code."); }
  };
  const handleSubmit = () => {
    const code = otp.join("");
    if (code.length !== 6) { setError("Please enter the complete 6-digit code."); return; }
    setLoading(true); setError("");
    setTimeout(() => {
      setLoading(false);
      if (code === "123456") { onVerificationSuccess(); } // Mock success
      else { setError("Invalid verification code. Please try again."); }
    }, 1500);
  };
  const handleResend = () => {
    setOtp(new Array(6).fill(""));
    setError("New code sent! Check your email.");
    inputRefs.current[0]?.focus();
  };
  const isOtpComplete = otp.every(digit => digit !== "");
  return (
    <div className="flex flex-col h-screen w-full max-w-md mx-auto bg-white shadow-xl">
      <div className="flex items-center justify-center relative px-4 py-4 border-b border-gray-100">
        <button onClick={onBack} className="absolute left-4 p-2 hover:bg-gray-100 rounded-full" disabled={loading}><ArrowLeft className="h-5 w-5 text-gray-600" /></button>
        <h1 className="text-xl font-semibold text-gray-900">Create account</h1>
      </div>
      <div className="flex-1 p-6 flex flex-col items-center text-center">
        <p className="text-sm text-gray-500 mb-6 font-medium">Step 2 of 3</p>
        <h2 className="text-2xl font-bold mb-4">Confirm your email</h2>
        <p className="text-gray-600 mb-8 max-w-xs">Enter the code sent to <strong className="font-medium text-gray-800">{email}</strong></p>
        <div className="flex justify-center gap-2 mb-6" onPaste={handlePaste}>
          {otp.map((digit, index) => (
            <input key={index} ref={(el) => (inputRefs.current[index] = el)} type="text" maxLength="1" value={digit} onChange={(e) => handleChange(e.target, index)} onKeyDown={(e) => handleKeyDown(e, index)} disabled={loading} className={`otp-input w-12 h-14 text-center text-2xl font-mono border-2 rounded-xl shadow-sm ${error ? 'border-red-500' : 'border-gray-300'}`} />
          ))}
        </div>
        {error && (<p className="text-sm text-red-500 mb-4">{error}</p>)}
        <button onClick={handleResend} disabled={loading} className="text-sm font-medium text-blue-600 hover:text-blue-800">Resend code</button>
      </div>
      <div className="p-6 pt-4">
        <button onClick={handleSubmit} disabled={loading || !isOtpComplete} className="w-full py-4 text-white font-semibold rounded-full shadow-lg transition-all bg-pyngl-pink hover:bg-pyngl-pink-dark disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center">
          {loading ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" />Verifying...</> : "Continue"}
        </button>
      </div>
    </div>
  );
};

// -------------------------------------------------------------------
// --- 3. Date of Birth Component (DOB) (Step 3) ---
// -------------------------------------------------------------------
const DOB_MIN_AGE = 15;
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const DatePickerWheel = ({ value, onChange, options }) => {
  const containerRef = useRef(null);
  useEffect(() => {
    if (containerRef.current) {
      const selectedIndex = options.indexOf(value);
      if (selectedIndex !== -1) {
        const itemHeight = containerRef.current.children[3]?.offsetHeight || 40;
        const scrollTo = (selectedIndex + 3) * itemHeight - (containerRef.current.offsetHeight / 2) + (itemHeight / 2);
        containerRef.current.scrollTop = scrollTo;
      }
    }
  }, [options, value]);
  const handleScroll = () => {
    const container = containerRef.current;
    if (!container) return;
    if (container.scrollTimeout) clearTimeout(container.scrollTimeout);
    container.scrollTimeout = setTimeout(() => {
      const itemHeight = container.children[3]?.offsetHeight || 40;
      const middleScroll = container.scrollTop + container.offsetHeight / 2;
      const closestFullIndex = Math.round(middleScroll / itemHeight - 0.5);
      const closestDataIndex = Math.min(Math.max(0, closestFullIndex - 3), options.length - 1);
      const newValue = options[closestDataIndex];
      const snapTo = (closestDataIndex + 3) * itemHeight - (container.offsetHeight / 2) + (itemHeight / 2);
      container.scrollTop = snapTo;
      if (newValue !== value) onChange(newValue);
    }, 150);
  };
  const paddingItems = [1, 2, 3];
  return (
    <div ref={containerRef} onScroll={handleScroll} className="h-60 overflow-y-scroll text-center py-20 scroll-smooth" style={{ WebkitOverflowScrolling: 'touch' }}>
      {paddingItems.map(i => <div key={`p-t-${i}`} className="py-2 text-2xl font-semibold text-gray-100 select-none"></div>)} 
      {options.map((option, index) => (
        <div key={index} className={`py-2 text-2xl font-semibold transition-colors duration-200 select-none ${option === value ? 'text-gray-900' : 'text-gray-400'}`}>{option}</div>
      ))}
      {paddingItems.map(i => <div key={`p-b-${i}`} className="py-2 text-2xl font-semibold text-gray-100 select-none"></div>)}
    </div>
  );
};
const DOBSelector = ({ onContinue, onBack }) => {
  const today = new Date();
  const [date, setDate] = useState(() => {
    const defaultDate = new Date();
    defaultDate.setFullYear(defaultDate.getFullYear() - DOB_MIN_AGE);
    return { month: MONTHS[defaultDate.getMonth()], day: defaultDate.getDate(), year: defaultDate.getFullYear() };
  });
  const [showPicker, setShowPicker] = useState(false);
  const daysInMonth = useMemo(() => new Date(date.year, MONTHS.indexOf(date.month) + 1, 0).getDate(), [date.month, date.year]);
  const dayOptions = useMemo(() => Array.from({ length: daysInMonth }, (_, i) => i + 1), [daysInMonth]);
  const yearOptions = useMemo(() => Array.from({ length: 120 }, (_, i) => today.getFullYear() - i), [today]);
  const isUserEligible = useMemo(() => {
    const selectedDate = new Date(date.year, MONTHS.indexOf(date.month), date.day, 0, 0, 0, 0); 
    const cutoffDate = new Date();
    cutoffDate.setFullYear(cutoffDate.getFullYear() - DOB_MIN_AGE, cutoffDate.getMonth(), cutoffDate.getDate());
    cutoffDate.setHours(0, 0, 0, 0);
    return selectedDate <= cutoffDate;
  }, [date]);
  const dobDisplay = `${date.month} ${date.day}, ${date.year}`;
  useEffect(() => { if (date.day > daysInMonth) setDate(prev => ({ ...prev, day: daysInMonth })); }, [daysInMonth]);
  const handlePickerChange = (key, value) => setDate(prev => ({ ...prev, [key]: value }));
  const handleContinue = () => { if (isUserEligible) onContinue(dobDisplay); };
  return (
    <div className="flex flex-col h-screen w-full max-w-md mx-auto bg-white shadow-xl">
      <div className="flex items-center justify-between relative px-4 py-4 border-b border-gray-100">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full"><ArrowLeft className="h-5 w-5 text-gray-600" /></button>
        <h1 className="text-xl font-semibold text-gray-900">Create account</h1>
        <div className="w-10"></div>
      </div>
      <div className="flex-1 p-6 flex flex-col">
        <p className="text-sm text-gray-500 mb-6 font-medium text-center">Step 3 of 3</p>
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Birthday</h2>
        <div className="relative">
          <input type="text" readOnly value={dobDisplay} onClick={() => setShowPicker(true)} placeholder="Select your date of birth" className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg text-lg font-medium focus:outline-none focus:border-pyngl-pink cursor-pointer" />
          <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
        </div>
        {!isUserEligible && (
          <div className="mt-3 flex items-center text-sm text-red-500 font-medium"><span className="mr-2 text-lg">😔</span><p>Users under {DOB_MIN_AGE} are not eligible to create a Pyngl account</p></div>
        )}
      </div>
      <div className="p-6 pt-4">
        <button onClick={handleContinue} disabled={!isUserEligible} className={`w-full py-4 text-white font-semibold rounded-full shadow-lg transition-all ${isUserEligible ? 'bg-pyngl-pink hover:bg-pyngl-pink-dark' : 'bg-gray-400 cursor-not-allowed'}`}>Continue</button>
      </div>
      {showPicker && (
        <div className="date-picker-overlay">
          <div className="date-picker-content">
            <div className="flex justify-between items-center px-6 pt-4 pb-2 border-b border-gray-100">
              <h3 className="text-xl font-semibold">Select Birthday</h3>
              <button onClick={() => setShowPicker(false)} className="text-gray-500 hover:text-gray-800 font-bold text-sm px-3 py-1.5 rounded-full hover:bg-gray-100">Done</button>
            </div>
            <div className="flex justify-around items-center pt-2 relative">
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-10 bg-gray-100 pointer-events-none mx-6 rounded-lg"></div>
              <div className="w-1/3 text-lg z-10"><DatePickerWheel value={date.month} onChange={(val) => handlePickerChange('month', val)} options={MONTHS} /></div>
              <div className="w-1/3 text-lg z-10"><DatePickerWheel value={date.day} onChange={(val) => handlePickerChange('day', val)} options={dayOptions} /></div>
              <div className="w-1/3 text-lg z-10"><DatePickerWheel value={date.year} onChange={(val) => handlePickerChange('year', val)} options={yearOptions} /></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// -------------------------------------------------------------------
// --- 4. Success Component (Final Screen) ---
// -------------------------------------------------------------------
const SuccessScreen = ({ onReset }) => {
  return (
    <div className="flex flex-col h-screen w-full max-w-md mx-auto bg-white shadow-xl items-center justify-center text-center p-8">
      <CheckCircle className="h-16 w-16 text-green-500 mb-6" />
      <h2 className="text-3xl font-bold text-gray-900 mb-3">
        Account Complete!
      </h2>
      <p className="text-lg text-gray-600 mb-8">
        Your account has been created.
      </p>
      <button
        onClick={onReset}
        className="w-full py-3.5 bg-pyngl-pink text-white font-semibold rounded-full shadow-lg transition-all hover:bg-pyngl-pink-dark"
    >
        Start Over
      </button>
    </div>
  );
};


// -------------------------------------------------------------------
// --- Main Application Component (Manages Flow) ---
// -------------------------------------------------------------------
const App = () => {
  // 'register', 'otp', 'dob', 'success'
  const [currentPage, setCurrentPage] = useState('register'); 
  
  const [userData, setUserData] = useState({
    email: '',
    username: '', 
    dob: '',
  });
  const [loading, setLoading] = useState(false);

  // --- Registration Flow Handlers ---
  const handleRegistrationSuccess = (email, username) => {
    setUserData(prev => ({ ...prev, email, username }));
    setCurrentPage('otp');
  };
  const handleVerificationSuccess = () => setCurrentPage('dob');
  
  const handleDOBContinue = (dob) => {
    setUserData(prev => ({ ...prev, dob }));
    setCurrentPage('success');
  };
  
  // --- Reset Handler ---
  const handleReset = () => {
    // Reset all state
    setUserData({ email: '', username: '', dob: '' });
    setCurrentPage('register');
  };

  // --- Navigation Handlers ---
  const handleBack = () => {
    switch(currentPage) {
      case 'otp':
        setCurrentPage('register');
        break;
      case 'dob':
        setCurrentPage('otp');
        break;
      default:
        // No back action from register or success
        break;
    }
  };

  // --- Render Logic ---
  let content;
  const commonProps = { loading, setLoading, onBack: handleBack };
  
  switch (currentPage) {
    case 'register':
      content = <RegisterSheet {...commonProps} onSuccess={handleRegistrationSuccess} />;
      break;
    case 'otp':
      content = <OtpVerificationSheet {...commonProps} email={userData.email} onVerificationSuccess={handleVerificationSuccess} />;
      break;
    case 'dob':
        content = <DOBSelector {...commonProps} onContinue={handleDOBContinue} />;
        break;
    case 'success':
      content = <SuccessScreen onReset={handleReset} />;
      break;
    default:
      content = <RegisterSheet {...commonProps} onSuccess={handleRegistrationSuccess} />;
  }

  return (
    <div className="h-screen w-screen bg-gray-100 flex items-center justify-center">
      <CustomStyles />
      {content}
    </div>
  );
};

export default App;