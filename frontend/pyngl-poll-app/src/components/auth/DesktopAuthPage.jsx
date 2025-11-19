import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, registerSchema } from "../../utils/validationSchemas";
import useAuthStore from "../../store/useAuthStore";
import { FormInput } from "../../components/common/FormInput";
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  const [showPassword, setShowPassword] = React.useState(false);

  const onSubmit = async (data) => {
    await login(data.email, data.password).catch(() => {});
  };

  const handleSwitch = () => {
    clearError();
    onSwitchToRegister();
  };

  return (
    <div className="w-full">
      {/* Title */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-[#F1F1F1]">LOGIN</h1>
        <p className="text-gray-500 dark:text-[#cbd5e1] mt-1">Please enter your credentials.</p>
      </div>

      {/* Error Box */}
      {error && (
        <div className="flex items-center gap-x-3 p-3 mb-4 text-sm font-semibold text-red-800 bg-red-100 dark:bg-[rgba(255,0,0,0.06)] dark:text-[#ffb3c0] border border-transparent dark:border-[rgba(255,0,0,0.1)] rounded-lg transition-colors">
          <AlertTriangle className="h-5 w-5" />
          <span>{error}</span>
        </div>
      )}

      {/* FORM */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Email Field */}
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-[#9aa4b2]" />
          <input
            type="text"
            placeholder="Email"
            {...register("email")}
            disabled={loading}
            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pyngl-pink dark:bg-[#1B1F33] text-gray-900 dark:text-[#F1F1F1] placeholder-gray-400 dark:placeholder-[#7b8393] transition-colors duration-150 ${
              errors.email ? "border-red-500 dark:border-red-400" : "border-gray-300 dark:border-[#2D3148]"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 dark:text-[#ffb3c0] text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password Field */}
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-[#9aa4b2]" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            disabled={loading}
            {...register("password")}
            className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pyngl-pink bg-white dark:bg-[#1B1F33] text-gray-900 dark:text-[#F1F1F1] placeholder-gray-400 dark:placeholder-[#7b8393] transition-colors duration-150 ${
              errors.password   ? "border-red-500 dark:border-red-400"
                : "border-gray-300 dark:border-[#2D3148]"
            }`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-[#9aa4b2] hover:text-gray-600 dark:hover:text-gray-300 p-1"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>

          {errors.password && (
            <p className="text-red-500 dark:text-[#ffb3c0] text-xs mt-1">
              {errors.password.message}
            </p>
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
            className="border border-gray-300 dark:border-[#2D3148] rounded-3xl hover:bg-gray-50 dark:hover:bg-[rgba(255,255,255,0.02)] transition"
          >
            <img
              src="/icons/google-icon.svg"
              alt="Google Login"
              className="h-16 w-16"
            />
          </button>

          {/* Apple */}
          <button
            type="button"
            className="border border-gray-300 dark:border-[#2D3148] rounded-2xl hover:bg-gray-50 dark:hover:bg-[rgba(255,255,255,0.02)] transition bg-black"
          >
            <img
              src="/icons/apple-icon.svg"
              alt="Apple Login"
              className="h-16 w-16"
            />
          </button>
        </div>
      </form>
    </div>
  );
};


// The main desktop component with the two-column layout
const DesktopAuthPage = () => {
  const [activeForm, setActiveForm] = useState("login"); // can be 'login' or 'register'
//    const location = useLocation();
  const navigate = useNavigate();
  const switchToRegister = () => navigate("/signup", { replace: true });

  return (
    <div className="w-full min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white dark:bg-[#131526]">
      {/* Left Side: Image / Branding */}
      <div className="hidden lg:flex flex-col items-center justify-center bg-gray-50dark:bg-[#131526] p-12 transition-colors duration-200">
        <img
          src="/assets/pynglLogoImage.png"
          alt="Pyngl Logo"
          className="h-12 mb-8"
        />
        <img
          src="/homePageImage1.png"
          alt="Poll smarter"
          className="max-w-md"
        />
        <h2 className="text-3xl font-bold mt-8">
          Poll smarter, Engage smarter.
        </h2>
        <p className="text-gray-500 mt-2">
          The best way to interact with your audience.
        </p>
      </div>

      {/* Right Side: Form */}
      <div className="flex items-center justify-center p-8 lg:p-12 bg-white dark:bg-[#131526] transition-colors duration-200">
        <div className="max-w-md w-full">
          {activeForm === "login" ? (
            <LoginForm onSwitchToRegister={switchToRegister} />
          ) : (
            <SignupFlow />
          )}
        </div>
      </div>
    </div>
  );
};

export default DesktopAuthPage;
