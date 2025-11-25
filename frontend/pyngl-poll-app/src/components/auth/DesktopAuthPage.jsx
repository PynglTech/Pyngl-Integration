// import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import {Link} from 'react-router-dom'
// import { zodResolver } from '@hookform/resolvers/zod';
// import { loginSchema, registerSchema } from '../../utils/validationSchemas';
// import useAuthStore from '../../store/useAuthStore';
// import { FormInput } from '../../components/common/FormInput';
// import { Mail, Lock, User, Phone, Calendar, AlertTriangle } from 'lucide-react';

// // This is a dedicated login form component for the desktop page
// const LoginForm = ({ onSwitchToRegister }) => {
//     const { login, loading, error, clearError } = useAuthStore();
//     const { register, handleSubmit, formState: { errors } } = useForm({
//         resolver: zodResolver(loginSchema),
//     });

//     const onSubmit = async (data) => {
//         await login(data.email, data.password);
//     };

//     const handleSwitch = () => {
//         clearError();
//         onSwitchToRegister();
//     };
    
//     return (
//         <div>
//             <div className="text-left mb-8">
//                 <h1 className="text-3xl font-bold tracking-tight">Welcome Back</h1>
//                 <p className="text-gray-500 mt-1">Please enter your credentials to log in.</p>
//             </div>
//             <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//                 {error && (<div className="flex items-center gap-x-3 p-3 text-sm font-semibold text-red-800 bg-red-100 border rounded-lg"><AlertTriangle className="h-5 w-5" /><span>{error}</span></div>)}
//                 <FormInput Icon={Mail} type="email" label="Email" id="email" register={register} error={errors.email} disabled={loading} />
//                 <FormInput Icon={Lock} type="password" label="Password" id="password" register={register} error={errors.password} disabled={loading} />
//                 <div className="flex justify-between items-center text-sm"><Link
//   to="/forgot-password" // <-- This changes the URL
//   className="font-semibold text-pyngl-pink hover:text-pink-700 transition-colors"
// >
//   Forgot password?
// </Link></div>
//                 <button type="submit" disabled={loading} className="w-full mt-4 py-3.5 px-4 bg-pyngl-pink text-white font-bold rounded-full shadow-lg">{loading ? 'Logging in...' : 'LOGIN'}</button>
//                 <p className="text-center text-sm text-gray-500 pt-4">Don't have an account? <button type="button" onClick={handleSwitch} className="font-semibold text-pyngl-pink">Sign up</button></p>
//             </form>
//         </div>
//     );
// };

// // This is a dedicated register form component for the desktop page
// const RegisterForm = ({ onSwitchToLogin }) => {
//     const { register: registerUser, loading, error, clearError } = useAuthStore();
//     const { register, handleSubmit, formState: { errors } } = useForm({
//         resolver: zodResolver(registerSchema),
//     });
    
//     const onSubmit = async (data) => {
//         // We don't need to send confirmPassword to the backend
//         const { confirmPassword, ...userData } = data;
//         await registerUser(userData);
//     };

//     const handleSwitch = () => {
//         clearError();
//         onSwitchToLogin();
//     };

//     return (
//         <div>
//             <div className="text-left mb-8">
//                 <h1 className="text-3xl font-bold tracking-tight">Create an Account</h1>
//                 <p className="text-gray-500 mt-1">Join Pyngl today!</p>
//             </div>
//             {/* The form now has more space between fields for a cleaner look */}
//             <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//                 {error && (<div className="flex items-center gap-x-3 p-3 text-sm font-semibold text-red-800 bg-red-100 border rounded-lg"><AlertTriangle className="h-5 w-5" /><span>{error}</span></div>)}
//                 <FormInput Icon={User} type="text" label="Username" id="username" register={register} error={errors.username} disabled={loading} />
//                 <FormInput Icon={Mail} type="email" label="Email" id="email" register={register} error={errors.email} disabled={loading} />
//                 {/* --- NEW FIELDS ADDED HERE --- */}
//                 <FormInput Icon={Phone} type="tel" label="Phone Number" id="phoneNumber" register={register} error={errors.phoneNumber} disabled={loading} />
//                 <FormInput Icon={Calendar} type="date" label="Date of Birth" id="birthDate" register={register} error={errors.birthDate} disabled={loading} />
//                 <FormInput Icon={Lock} type="password" label="Password" id="password" register={register} error={errors.password} disabled={loading} />
//                 <FormInput Icon={Lock} type="password" label="Confirm Password" id="confirmPassword" register={register} error={errors.confirmPassword} disabled={loading} />
                
//                 <button type="submit" disabled={loading} className="w-full mt-4 py-3.5 px-4 bg-pyngl-pink text-white font-bold rounded-full shadow-lg">{loading ? 'Creating Account...' : 'SIGN UP'}</button>
//                 <p className="text-center text-sm text-gray-500 pt-4">Already have an account? <button type="button" onClick={handleSwitch} className="font-semibold text-pyngl-pink">Log in</button></p>
//             </form>
//         </div>
//     );
// };


// // The main desktop component with the two-column layout
// const DesktopAuthPage = () => {
//     const [activeForm, setActiveForm] = useState('login'); // can be 'login' or 'register'

//     return (
//         <div className="w-full min-h-screen grid grid-cols-1 lg:grid-cols-2">
//             {/* Left Side: Image / Branding */}
//             <div className="hidden lg:flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-12">
//                 <img src="/assets/pynglLogoImage.png" alt="Pyngl Logo" className="h-12 mb-8" />
//                 <img src="/homePageImage1.png" alt="Poll smarter" className="max-w-md" />
//                 <h2 className="text-3xl font-bold mt-8">Poll smarter, Engage smarter.</h2>
//                 <p className="text-gray-500 mt-2">The best way to interact with your audience.</p>
//             </div>

//             {/* Right Side: Form */}
//             <div className="flex items-center justify-center p-8 lg:p-12">
//                 <div className="max-w-md w-full">
//                     {activeForm === 'login' ? (
//                         <LoginForm onSwitchToRegister={() => setActiveForm('register')} />
//                     ) : (
//                         <RegisterForm onSwitchToLogin={() => setActiveForm('login')} />
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default DesktopAuthPage;


import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, registerSchema } from "../../utils/validationSchemas";
import useAuthStore from "../../store/useAuthStore";
import { FormInput } from "../../components/common/FormInput";
import ValidationMessage from "../../components/common/ValidationMessage";

import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Phone,
  Calendar,
  AlertTriangle,
} from "lucide-react";
import SignupFlow from "../../pages/RegisterPage";

// This is a dedicated login form component for the desktop page
const LoginForm = ({ onSwitchToRegister }) => {
  const { login, loading, error, clearError } = useAuthStore();
  const [identifierError, setIdentifierError] = useState("");
const [passwordLocalError, setPasswordLocalError] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });
  useEffect(() => {
    const v = (watch("identifier") || "").trim();

    if (!v) {
      setIdentifierError("Please enter your email or username.");
    } else if (!v.includes("@") && v.length < 3) {
      setIdentifierError("Username must be at least 3 characters.");
    } else if (v.includes("@")) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(v)) {
        setIdentifierError("Please enter a valid email address.");
      } else {
        setIdentifierError("");
      }
    } else {
      setIdentifierError("");
    }
  }, [watch("identifier")]);

  useEffect(() => {
    const p = watch("password") || "";
    if (!p) {
      setPasswordLocalError("Password is required.");
    } else if (p.length < 6) {
      setPasswordLocalError("Password must be at least 6 characters.");
    } else {
      setPasswordLocalError("");
    }
  }, [watch("password")]);
const getBackendURL = () => {
  try {
    if (import.meta.env.VITE_API_URL) return import.meta.env.VITE_API_URL;
  } catch (e) {}

  const protocol = window.location.protocol;
  const hostname = window.location.hostname;
  return `${protocol}//${hostname}:5000`;
};
const handleGoogleLogin = () => {
    const backendUrl = getBackendURL();
    window.location.href = `${backendUrl}/auth/google`;
  };
  const [showPassword, setShowPassword] = React.useState(false);

  const onSubmit = async (data) => {
   await login(data.identifier || data.email, data.password).catch(() => {});

  };

  const handleSwitch = () => {
    clearError();
    onSwitchToRegister();
  };

//   return (
//     <div className="w-full">
//       {/* Title */}
//       <div className="text-center mb-8">
//         <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-[#F1F1F1]">LOGIN</h1>
//         <p className="text-gray-500 dark:text-[#cbd5e1] mt-1">Please enter your credentials.</p>
//       </div>

//       {/* Error Box */}
//       {error && (
//         <div className="flex items-center gap-x-3 p-3 mb-4 text-sm font-semibold text-red-800 bg-red-100 dark:bg-[rgba(255,0,0,0.06)] dark:text-[#ffb3c0] border border-transparent dark:border-[rgba(255,0,0,0.1)] rounded-lg transition-colors">
//           <AlertTriangle className="h-5 w-5" />
//           <span>{error}</span>
//         </div>
//       )}

//       {/* FORM */}
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//         {/* Email Field */}
//       {/* Email / Username Field */}
// <div className="relative">
//   <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-[#9aa4b2]" />
//   <input
//     type="text"
//     placeholder="Email or Username"
//     {...register("identifier")}
//     disabled={loading}
//     className={`w-full pl-10 pr-4 py-3 border rounded-lg ...`}
//   />
//   {identifierError && (
//   <ValidationMessage text={identifierError} type="error" />
// )}

//   {errors.identifier && (
//     <p className="text-red-500 text-xs mt-1">{errors.identifier.message}</p>
//   )}
// </div>


//         {/* Password Field */}
//         <div className="relative">
//           <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-[#9aa4b2]" />
//           <input
//             type={showPassword ? "text" : "password"}
//             placeholder="Password"
//             disabled={loading}
//             {...register("password")}
//             className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pyngl-pink bg-white dark:bg-[#1B1F33] text-gray-900 dark:text-[#F1F1F1] placeholder-gray-400 dark:placeholder-[#7b8393] transition-colors duration-150 ${
//               errors.password   ? "border-red-500 dark:border-red-400"
//                 : "border-gray-300 dark:border-[#2D3148]"
//             }`}
//           />
//           <button
//             type="button"
//             onClick={() => setShowPassword(!showPassword)}
//             className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-[#9aa4b2] hover:text-gray-600 dark:hover:text-gray-300 p-1"
//           >
//             {showPassword ? (
//               <EyeOff className="h-5 w-5" />
//             ) : (
//               <Eye className="h-5 w-5" />
//             )}
//           </button>

//           {errors.password && (
//             <p className="text-red-500 dark:text-[#ffb3c0] text-xs mt-1">
//               {errors.password.message}
//             </p>
//           )}
//         </div>
return (
  <div className="w-full">
    {/* Title */}
    <div className="text-center mb-8">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-[#F1F1F1]">LOGIN</h1>
      <p className="text-gray-500 dark:text-[#cbd5e1] mt-1">Please enter your credentials.</p>
    </div>

    {/* Error Box (server error) */}
    {error && (
      <div className="flex items-center gap-x-3 p-3 mb-4 text-sm font-semibold text-red-800 bg-red-100 dark:bg-[rgba(255,0,0,0.06)] dark:text-[#ffb3c0] border border-transparent dark:border-[rgba(255,0,0,0.1)] rounded-lg transition-colors">
        <AlertTriangle className="h-5 w-5" />
        <span>{error}</span>
      </div>
    )}

    {/* FORM */}
  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

  {/* Identifier Field */}
  <div className="space-y-2">
    <div className="relative">
      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />

      <input
        type="text"
        placeholder="Email or Username"
        {...register("identifier")}
        disabled={loading}
        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors
          ${identifierError ? "border-red-500 ring-red-200" : "border-gray-300"}`}
      />
    </div>

    {identifierError && (
      <ValidationMessage text={identifierError} type="error" />
    )}
  </div>

  {/* Password Field */}
  <div className="space-y-2">
    <div className="relative">
      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />

      <input
        type={showPassword ? "text" : "password"}
        placeholder="Password"
        {...register("password")}
        disabled={loading}
        className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors
          ${passwordLocalError ? "border-red-500 ring-red-200" : "border-gray-300"}`}
      />

      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 p-1"
      >
        {showPassword ? <EyeOff /> : <Eye />}
      </button>
    </div>

    {passwordLocalError && (
      <ValidationMessage text={passwordLocalError} type="error" />
    )}
  </div>

        {/* Forgot / Switch */}
        <div className="flex justify-between text-sm mt-2">
          <a
            href="/forgot-password"
            className="font-medium text-gray-600 dark:text-[#cbd5e1] hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            Forgot password?
          </a>
          <button
            type="button"
            onClick={handleSwitch}
            className="font-medium text-blue-600 dark:text-[#5467FE] hover:text-blue-700 dark:hover:text-[#7b8aff] transition-colors"
          >
            Sign Up
          </button>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full mt-4 py-3.5 px-4 bg-pyngl-pink hover:bg-pyngl-pink-dark text-white font-semibold rounded-full shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-all"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Divider */}
        <div className="relative py-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-[#2D3148]"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white dark:bg-[#131526] px-4 text-sm text-[#5467FE] transition-colors duration-200">OR</span>
          </div>
        </div>

        {/* Social Login */}
        <p className="text-center text-sm text-gray-500 dark:text-[#cbd5e1] mb-4">Continue with</p>
        <div className="flex justify-center gap-6 mt-6">
          {/* Google */}
         <button
  type="button"
  onClick={handleGoogleLogin}
  className="border border-gray-300 dark:border-[#2D3148] rounded-3xl hover:bg-gray-50 dark:hover:bg-[rgba(255,255,255,0.02)] transition"
>
  <img src="/icons/google-icon.svg" alt="Google Login" className="h-16 w-16" />
</button>


          {/* Apple */}
         
        </div>
      </form>
    </div>
  );
};
const DesktopAuthPage = () => {
  const [activeForm, setActiveForm] = useState("login");
  const { userInfo } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) navigate("/dashboard", { replace: true });
  }, [userInfo]);

  const switchToRegister = () => navigate("/signup", { replace: true });

  return (
    <div className="w-full min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white dark:bg-[#131526]">
      {/* LEFT SIDE */}
      <div className="hidden lg:flex flex-col items-center justify-center bg-gray-50 dark:bg-[#131526] p-12">
        <img src="/assets/pynglLogoImage.png" alt="Pyngl Logo" className="h-12 mb-8" />
        <img src="/homePageImage1.png" alt="Poll smarter" className="max-w-md" />
        <h2 className="text-3xl font-bold mt-8">Poll smarter, Engage smarter.</h2>
        <p className="text-gray-500 mt-2">The best way to interact with your audience.</p>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center justify-center p-8 lg:p-12">
        <div className="max-w-md w-full">
          <LoginForm onSwitchToRegister={switchToRegister} />
        </div>
      </div>
    </div>
  );
};
export default DesktopAuthPage;

// // The main desktop component with the two-column layout
// const DesktopAuthPage = () => {
//   const [activeForm, setActiveForm] = useState("login"); // can be 'login' or 'register'
// //    const location = useLocation();
//   const navigate = useNavigate();
//   const switchToRegister = () => navigate("/signup", { replace: true });

//   return (
//     <div className="w-full min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white dark:bg-[#131526]">
//       {/* Left Side: Image / Branding */}
//       <div className="hidden lg:flex flex-col items-center justify-center bg-gray-50dark:bg-[#131526] p-12 transition-colors duration-200">
//         <img
//           src="/assets/pynglLogoImage.png"
//           alt="Pyngl Logo"
//           className="h-12 mb-8"
//         />
//         <img
//           src="/homePageImage1.png"
//           alt="Poll smarter"
//           className="max-w-md"
//         />
//         <h2 className="text-3xl font-bold mt-8">
//           Poll smarter, Engage smarter.
//         </h2>
//         <p className="text-gray-500 mt-2">
//           The best way to interact with your audience.
//         </p>
//       </div>

//       {/* Right Side: Form */}
//       <div className="flex items-center justify-center p-8 lg:p-12 bg-white dark:bg-[#131526] transition-colors duration-200">
//         <div className="max-w-md w-full">
//           {activeForm === "login" ? (
//             <LoginForm onSwitchToRegister={switchToRegister} />
//           ) : (
//             <SignupFlow />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DesktopAuthPage;
