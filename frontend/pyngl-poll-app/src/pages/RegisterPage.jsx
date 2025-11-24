import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useSearchParams, Routes, Route } from "react-router-dom";
import axios from "axios";
import { Loader2 } from "lucide-react";

import RegisterForm from "../components/signup/RegisterForm";
import OtpForm from "../components/signup/OtpForm";
import DobForm from "../components/signup/DobForm";
import UsernameForm from "../components/signup/UserNameForm";
import SetPasswordForm from "../components/signup/SetPasswordForm";
import SuccessMessage from "../components/signup/SuccessMessage";

// -------------------------------------------------------------------
// ✅ ROBUST API CLIENT (Works on Localhost & Network IP)
// -------------------------------------------------------------------
const getBackendURL = () => {
  try {
    if (import.meta.env.VITE_API_URL) return import.meta.env.VITE_API_URL;
  } catch (e) {
    // Ignore error if import.meta is not available
  }
  
  const protocol = window.location.protocol; 
  const hostname = window.location.hostname;
  return `${protocol}//${hostname}:5000`;
};

const apiClient = axios.create({
  baseURL: getBackendURL(),
  withCredentials: true,
});

export default function SignupFlow() {
  const [userData, setUserData] = useState({
    email: "",
    username: "",
    password: "", // ✅ Store password for final submission
    dob: "",
    authType: "",
  });
  
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const step = location.pathname.replace("/signup", "") || "/";

  // Capture Google Redirect Data
  useEffect(() => {
    const emailParam = searchParams.get("email");
    const authTypeParam = searchParams.get("authType");
    if (emailParam && !userData.email) {
      setUserData((prev) => ({ ...prev, email: emailParam, authType: authTypeParam || "google" }));
    }
  }, [searchParams, userData.email]);

  // Redirect to start if essential data is missing
  useEffect(() => {
    if (step !== "/" && step !== "/username" && !userData.email) {
      if (step !== "/success") {
        navigate("/signup");
      }
    }
  }, [step, userData.email, navigate]);

  // -------------------------
  // Step Handlers
  // -------------------------

  const handleRegisterSuccess = (email, username, password) => {
    setUserData(prev => ({ 
        ...prev, 
        email, 
        username, 
        password, 
        authType: "manual" 
    }));
    navigate("/signup/otp");
  };

  const handleOtpSuccess = () => navigate("/signup/dob");

  const handleSocialLoginSuccess = (provider, email) => {
    setUserData(prev => ({ ...prev, authType: provider, email }));
    navigate("/signup/username");
  };

  const handleUsernameSuccess = (username) => {
    setUserData(prev => ({ ...prev, username }));
    navigate("/signup/dob");
  };

  const handleDobSuccess = async (dob) => {
    const updatedData = { ...userData, dob };
    setUserData(updatedData);

    if (userData.authType === "manual") {
      await performFinalRegistration(updatedData);
    } else {
      navigate("/signup/set-password");
    }
  };

  const handleSetPasswordSuccess = async (password) => {
    const updatedData = { ...userData, password };
    setUserData(updatedData);
    await performFinalRegistration(updatedData);
  };

  // ✅ Final API Call to Register User
  const performFinalRegistration = async (data) => {
    setIsRegistering(true);
    try {
      await apiClient.post("/api/users/register", {
        username: data.username,
        email: data.email,
        password: data.password,
        dob: data.dob,
      });
      
      setIsRegistering(false);
      navigate("/signup/success");
    } catch (error) {
      console.error("Registration failed", error);
      alert(error.response?.data?.message || "Registration failed. Please try again.");
      setIsRegistering(false);
    }
  };

  const goBack = () => {
    if (step === "/otp") navigate("/signup");
    else if (step === "/dob") navigate(userData.authType === "manual" ? "/signup/otp" : "/signup/username");
    else if (step === "/username") navigate("/signup");
    else if (step === "/set-password") navigate("/signup/dob");
  };

  if (isRegistering) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-white dark:bg-[#131526]">
        <Loader2 className="h-10 w-10 animate-spin text-pyngl-pink mb-4" />
        <p className="text-gray-500 dark:text-gray-400">Creating your account...</p>
      </div>
    );
  }

  const renderStep = () => {
    switch (step) {
      case "/":
        return <RegisterForm onSuccess={handleRegisterSuccess} onSocialLogin={handleSocialLoginSuccess} />;
      case "/otp":
        return <OtpForm email={userData.email} onBack={goBack} onVerifySuccess={handleOtpSuccess} />;
      case "/username":
        return <UsernameForm email={userData.email} onBack={goBack} onSuccess={handleUsernameSuccess} />;
      case "/dob":
        return <DobForm onBack={goBack} onContinue={handleDobSuccess} />;
      case "/set-password":
        return <SetPasswordForm email={userData.email} onBack={goBack} onSuccess={handleSetPasswordSuccess} />;
      case "/success":
        return <SuccessMessage />;
      default:
        return <RegisterForm onSuccess={handleRegisterSuccess} />;
    }
  };

  return (
    <div className="w-full h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="hidden lg:flex flex-col items-center justify-center bg-gray-50 p-12 dark:bg-[#131526]">
        <img src="/assets/pynglLogoImage.png" className="h-12 mb-8" alt="logo" />
        <img src="/homePageImage1.png" className="max-w-md" alt="illustration" />
        <h2 className="text-3xl font-bold mt-8 text-gray-900 dark:text-[#F1F1F1]">Poll smarter, Engage smarter.</h2>
        <p className="text-gray-500 mt-2">The best way to interact with your audience.</p>
      </div>
      <div className="w-full h-full bg-white dark:bg-[#131526]">
        {renderStep()}
      </div>
    </div>
  );
}