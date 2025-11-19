// import React, { useState } from "react";

// // Step Components
// import RegisterForm from "../components/signup/RegisterForm";
// import OtpForm from "../components/signup/OtpForm";
// import DobForm from "../components/signup/DobForm";
// import UsernameForm from "../components/signup/UsernameForm";
// import SetPasswordForm from "../components/signup/SetPasswordForm";
// import SuccessMessage from "../components/signup/SuccessMessage";

// export default function SignupFlow() {
//   const [step, setStep] = useState("register");

//   const [userData, setUserData] = useState({
//     email: "",
//     username: "",
//     dob: "",
//     authType: "", // "manual", "google", "apple"
//   });

//   // ------------------------------
//   // 1️⃣ Manual Signup Flow
//   // ------------------------------
//   const handleRegisterSuccess = (email, username) => {
//     setUserData((prev) => ({
//       ...prev,
//       email,
//       username,
//       authType: "manual",
//     }));
//     setStep("otp");
//   };

//   const handleOtpSuccess = () => setStep("dob");

//   // ------------------------------
//   // 2️⃣ Social Login Flow
//   // ------------------------------
//   const handleSocialLoginSuccess = (provider, email) => {
//     setUserData((prev) => ({
//       ...prev,
//       authType: provider,
//       email,
//     }));
//     setStep("username");
//   };

//   const handleUsernameSuccess = (username) => {
//     setUserData((prev) => ({ ...prev, username }));
//     setStep("dob");
//   };

//   const handleDobSuccess = (dob) => {
//     setUserData((prev) => ({ ...prev, dob }));

//     if (userData.authType === "manual") {
//       setStep("success");
//     } else {
//       setStep("setPassword");
//     }
//   };

//   const handleSetPasswordSuccess = () => {
//     setStep("success");
//   };

//   // ------------------------------
//   // Back Button Logic
//   // ------------------------------
//   const handleBack = () => {
//     switch (step) {
//       case "otp":
//         setStep("register");
//         break;
//       case "dob":
//         setStep(userData.authType === "manual" ? "otp" : "username");
//         break;
//       case "username":
//         setStep("register");
//         break;
//       case "setPassword":
//         setStep("dob");
//         break;
//       default:
//         break;
//     }
//   };

//   // ------------------------------
//   // Current Step UI
//   // ------------------------------
//   const renderStep = () => {
//     switch (step) {
//       case "register":
//         return (
//           <RegisterForm
//             onSuccess={handleRegisterSuccess}
//             onSocialLogin={handleSocialLoginSuccess}
//           />
//         );

//       case "otp":
//         return (
//           <OtpForm
//             email={userData.email}
//             onBack={handleBack}
//             onVerifySuccess={handleOtpSuccess}
//           />
//         );

//       case "username":
//         return (
//           <UsernameForm
//             email={userData.email}
//             onBack={handleBack}
//             onSuccess={handleUsernameSuccess}
//           />
//         );

//       case "dob":
//         return <DobForm onBack={handleBack} onContinue={handleDobSuccess} />;

//       case "setPassword":
//         return (
//           <SetPasswordForm
//             email={userData.email}
//             onBack={handleBack}
//             onSuccess={handleSetPasswordSuccess}
//           />
//         );

//       case "success":
//         return <SuccessMessage />;

//       default:
//         return null;
//     }
//   };

//   // ------------------------------
//   // UI for Mobile & Desktop
//   // ------------------------------
//   return (
//     <div className="w-full min-h-screen bg-white lg:grid lg:grid-cols-2">

//     {/* Left Side: Image / Branding */}
//       <div className="hidden lg:flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-12">
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

//       {/* RIGHT SIDE — Mobile = full screen, Desktop = right half */}
//       <div className="flex items-center justify-center lg:p-12">
//         <div className="w-full max-w-md">{renderStep()}</div>
//       </div>
//     </div>
//   );
// }


// DesktopSignupFlow.jsx
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import RegisterForm from "../components/signup/RegisterForm";
import OtpForm from "../components/signup/OtpForm";
import DobForm from "../components/signup/DobForm";
import UsernameForm from "../components/signup/UsernameForm";
import SetPasswordForm from "../components/signup/SetPasswordForm";
import SuccessMessage from "../components/signup/SuccessMessage";

export default function SignupFlow() {
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
    <div className="w-full h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* LEFT SIDE BRANDING - Unchanged */}
      <div className="hidden lg:flex flex-col items-center justify-center bg-gray-50 p-12 dark:bg-[#131526]">
        <img
          src="/assets/pynglLogoImage.png"
          className="h-12 mb-8"
          alt="logo"
        />
        <img
          src="/homePageImage1.png"
          className="max-w-md"
          alt="illustration"
        />
        <h2 className="text-3xl font-bold mt-8">
          Poll smarter, Engage smarter.
        </h2>
        <p className="text-gray-500 mt-2">
          The best way to interact with your audience.
        </p>
      </div>

      {/* RIGHT SIDE STEPS - UPDATED */}
      {/* 1. Removed 'flex items-center justify-center': We don't want to center the whole box anymore.
         2. Removed inner 'max-w-md': We let the child component expand to full width.
         3. Added 'h-full': Ensures the child can use 100% height for scrolling.
      */}
      <div className="w-full h-full bg-white dark:bg-[#131526]">
        {renderStep()}
      </div>
    </div>
  );
}