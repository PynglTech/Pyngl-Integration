// DesktopSignupFlow.jsx
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import RegisterForm from "../components/signup/RegisterForm";
import OtpForm from "../components/signup/OtpForm";
import DobForm from "../components/signup/DobForm";
import UsernameForm from "../components/signup/UserNameForm";
import SetPasswordForm from "../components/signup/SetPasswordForm";
import SuccessMessage from "../components/signup/SuccessMessage";

export default function DesktopSignupFlow() {
  const [userData, setUserData] = useState({
    email: "",
    username: "",
    dob: "",
    authType: "",
  });

  const navigate = useNavigate();
  const location = useLocation();

  const step = location.pathname.replace("/signup", "") || "/";

  // -------------------------
  // Step Handlers
  // -------------------------

  const handleRegisterSuccess = (email, username) => {
    setUserData(prev => ({ ...prev, email, username, authType: "manual" }));
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

  const handleDobSuccess = (dob) => {
    setUserData(prev => ({ ...prev, dob }));
    navigate(userData.authType === "manual" ? "/signup/success" : "/signup/set-password");
  };

  const handleSetPasswordSuccess = () => navigate("/signup/success");

  const goBack = () => {
    if (step === "/otp") navigate("/signup");
    else if (step === "/dob") navigate(userData.authType === "manual" ? "/signup/otp" : "/signup/username");
    else if (step === "/username") navigate("/signup");
    else if (step === "/set-password") navigate("/signup/dob");
  };

  // -------------------------
  // Select Component to show
  // -------------------------
  const renderStep = () => {
    switch (step) {
      case "/":
        return <RegisterForm 
          onSuccess={handleRegisterSuccess}
          onSocialLogin={handleSocialLoginSuccess}
        />;

      case "/otp":
        return <OtpForm
          email={userData.email}
          onBack={goBack}
          onVerifySuccess={handleOtpSuccess}
        />;

      case "/username":
        return <UsernameForm
          email={userData.email}
          onBack={goBack}
          onSuccess={handleUsernameSuccess}
        />;

      case "/dob":
        return <DobForm
          onBack={goBack}
          onContinue={handleDobSuccess}
        />;

      case "/set-password":
        return <SetPasswordForm
          email={userData.email}
          onBack={goBack}
          onSuccess={handleSetPasswordSuccess}
        />;

      case "/success":
        return <SuccessMessage />;

      default:
        return <RegisterForm />;
    }
  };

  return (
    <div className="w-full min-h-screen grid grid-cols-1 lg:grid-cols-2">

      {/* LEFT SIDE BRANDING */}
      <div className="hidden lg:flex flex-col items-center justify-center bg-gray-50 p-12">
        <img src="/assets/pynglLogoImage.png" className="h-12 mb-8" alt="logo" />
        <img src="/homePageImage1.png" className="max-w-md" alt="illustration" />
        <h2 className="text-3xl font-bold mt-8">Poll smarter, Engage smarter.</h2>
        <p className="text-gray-500 mt-2">The best way to interact with your audience.</p>
      </div>

      {/* RIGHT SIDE STEPS */}
      <div className="flex items-center justify-center px-6 lg:px-12">
        <div className="w-full max-w-md">
          {renderStep()}
        </div>
      </div>
    </div>
  );
}