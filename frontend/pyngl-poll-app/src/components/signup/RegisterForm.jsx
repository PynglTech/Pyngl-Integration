import React, { useEffect, useRef, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  Loader2,
} from "lucide-react";

// -------------------------------------------------------------------
// ✅ ROBUST API CONFIGURATION
// -------------------------------------------------------------------
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

// --- Validation Helper Component ---
const ValidationMessage = ({ text, type = "error" }) => {
  const base =
    "p-3 rounded-lg flex items-start mt-2 border transition-colors duration-150";
  if (type === "error") {
    return (
      <div
        className={`${base} bg-pink-50 text-pink-600 border-pink-100 dark:bg-[rgba(255,77,116,0.06)] dark:text-[#ffb3c0] dark:border-[rgba(255,77,116,0.12)]`}
      >
        <span className="mr-2 text-lg leading-tight">😒</span>
        <span className="text-sm font-medium">{text}</span>
      </div>
    );
  }

  return (
    <div
      className={`${base} bg-blue-50 text-blue-600 border-blue-100 dark:bg-[rgba(84,103,254,0.06)] dark:text-[#cfe0ff] dark:border-[rgba(84,103,254,0.12)]`}
    >
      <span className="mr-2 text-lg leading-tight">•</span>
      <span className="text-sm font-medium">{text}</span>
    </div>
  );
};

const RegisterForm = ({ onSuccess, onSocialLogin }) => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const usernameInputRef = useRef(null);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Username State
  const [usernameSuggestions, setUsernameSuggestions] = useState([]);
  const [usernameTaken, setUsernameTaken] = useState(false);
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);

  // Email State
  const [emailTaken, setEmailTaken] = useState(false);
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [generalError, setGeneralError] = useState("");
  
  const passwordGuide =
    "Use 8+ chars with 1 number or symbol and both (A-Z) & (a-z)";

  // --- Handlers ---

  const handleGoogleLogin = () => {
    const backendUrl = getBackendURL();
    window.location.href = `${backendUrl}/auth/google`;
  };

  const handleAppleLogin = () => {
    const appleEmail = "user_apple@example.com";
    onSocialLogin && onSocialLogin("apple", appleEmail);
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const applySuggestion = (suggestion) => {
    setFormData((prev) => ({ ...prev, username: suggestion }));
    setUsernameSuggestions([]);
    setUsernameTaken(false);
  };

  // --- Effects ---

  useEffect(() => {
    usernameInputRef.current?.focus();
  }, []);

  // 1. Real-time Username Check
  useEffect(() => {
    const username = formData.username.trim();
    if (!username || username.length < 3) {
      setUsernameSuggestions([]);
      setUsernameTaken(false);
      return;
    }

    setIsCheckingUsername(true);
    const timer = setTimeout(async () => {
      try {
        const { data } = await apiClient.post('/api/users/check-username', { 
            username: username 
        });

        if (data.available) {
            setUsernameTaken(false);
            setUsernameSuggestions([]);
        } else {
            setUsernameTaken(true);
            setUsernameSuggestions(data.suggestions || []);
        }
      } catch (error) {
        console.error("Error checking username:", error);
      } finally {
        setIsCheckingUsername(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [formData.username]);

  // 2. Real-time Email Check
  useEffect(() => {
    const email = formData.email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !emailRegex.test(email)) {
      setEmailTaken(false);
      return;
    }

    setIsCheckingEmail(true);
    const timer = setTimeout(async () => {
      try {
        const { data } = await apiClient.post('/api/users/check-email', { email });
        
        if (!data.available) {
          setEmailTaken(true);
        } else {
          setEmailTaken(false);
        }
      } catch (error) {
        console.error("Error checking email:", error);
      } finally {
        setIsCheckingEmail(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [formData.email]);

  // 3. Local Validations
  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      setEmailError("Please enter valid email address");
    } else {
      setEmailError("");
    }
  }, [formData.email]);

  useEffect(() => {
    const p = formData.password;
    if (p.length === 0) {
      setPasswordError("");
      return;
    }
    const hasLength = p.length >= 8;
    const hasUpper = /[A-Z]/.test(p);
    const hasLower = /[a-z]/.test(p);
    const hasNumber = /[0-9]/.test(p);
    const hasSymbol = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(p);

    if (!hasLength) setPasswordError("Must be 8+ characters long.");
    else if (!hasUpper) setPasswordError("Must include (A-Z).");
    else if (!hasLower) setPasswordError("Must include (a-z).");
    else if (!hasNumber && !hasSymbol) setPasswordError("Must include 1 number or symbol.");
    else setPasswordError("");
  }, [formData.password]);

  useEffect(() => {
    if (formData.confirmPassword && formData.password !== formData.confirmPassword) {
      setConfirmPasswordError("Both passwords must be identical");
    } else {
      setConfirmPasswordError("");
    }
  }, [formData.password, formData.confirmPassword]);

  // --- Submit ---

  const isFormValid = useMemo(() => 
    formData.username.trim().length >= 3 &&
    formData.email.trim() &&
    formData.password &&
    formData.confirmPassword &&
    !emailError &&
    !passwordError &&
    !confirmPasswordError &&
    !usernameTaken &&
    !emailTaken &&
    !isCheckingUsername &&
    !isCheckingEmail &&
    agreedToTerms,
  [formData, emailError, passwordError, confirmPasswordError, usernameTaken, emailTaken, isCheckingUsername, isCheckingEmail, agreedToTerms]);

  const handleSubmit = async () => {
    if (!isFormValid) {
      setGeneralError("Please complete the form and fix all validation errors.");
      return;
    }

    setLoading(true);
    setGeneralError("");

    try {
      // ✅ Fix: Use formData directly and trim spaces to ensure consistency
      const cleanEmail = formData.email.trim();
      
      // 1. Send OTP
      await apiClient.post('/api/users/send-otp', { email: cleanEmail });
      
      // 2. Proceed to next step
      if (onSuccess) {
        onSuccess(cleanEmail, formData.username, formData.password);
      }
    } catch (err) {
      console.error("OTP Send Error:", err);
      setGeneralError(err.response?.data?.message || "Failed to send verification code.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full w-full items-center justify-center overflow-y-auto px-6 py-8">
      
      <div className="w-full max-w-md">
       {/* Header - Occupies Full Width */}
<div className="w-full flex items-center justify-center relative px-4 py-4 border-b border-gray-100 dark:border-[#2D3148] shrink-0">
  <button
    onClick={() => navigate("/login")}
    className="absolute left-4 p-2 hover:bg-gray-100 dark:hover:bg-[rgba(255,255,255,0.03)] rounded-full transition"
  >
    <ArrowLeft className="h-5 w-5 text-gray-600 dark:text-[#F1F1F1]" />
  </button>

  <h1 className="text-xl font-semibold text-gray-900 dark:text-[#F1F1F1]">
    Create account
  </h1>
</div>


        <div className="space-y-4">
          {/* Username Input */}
          <div className="space-y-2 pb-4">
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-[#9aa4b2]" />
              <input
                ref={usernameInputRef}
                type="text"
                placeholder="Username"
                value={formData.username}
                onChange={(e) => handleInputChange("username", e.target.value)}
                disabled={loading}
                className={`w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pyngl-pink bg-white dark:bg-[#1B1F33] text-gray-900 dark:text-[#F1F1F1] placeholder-gray-400 dark:placeholder-[#7b8393] transition-colors duration-150 ${
                  usernameTaken ? "border-red-500 dark:border-red-400" : "border-gray-300 dark:border-[#2D3148]"
                }`}
              />
              {isCheckingUsername && formData.username.length >= 3 && (
                <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 animate-spin text-gray-400 dark:text-[#9aa4b2]" />
              )}
            </div>
            {usernameTaken && (
              <div>
                <ValidationMessage
                  text="Username already taken try one of these:"
                  type="error"
                />
                <div className="flex flex-wrap gap-2 mt-2">
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

          {/* Email Input */}
          <div className="space-y-2 pb-4">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-[#9aa4b2]" />
              <input
                type="email"
                placeholder="Email address"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                disabled={loading}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pyngl-pink bg-white dark:bg-[#1B1F33] text-gray-900 dark:text-[#F1F1F1] placeholder-gray-400 dark:placeholder-[#7b8393] transition-colors duration-150 ${
                  emailError || emailTaken
                    ? "border-red-500 dark:border-red-400"
                    : "border-gray-300 dark:border-[#2D3148]"
                }`}
              />
              {isCheckingEmail && (
                <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 animate-spin text-gray-400 dark:text-[#9aa4b2]" />
              )}
            </div>
            {emailError && <ValidationMessage text={emailError} type="error" />}
            {!emailError && emailTaken && (
               <ValidationMessage text="Email is already registered." type="error" />
            )}
          </div>

          {/* Password Input */}
          <div className="space-y-2 pb-4">
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-[#9aa4b2]" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                disabled={loading}
                className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pyngl-pink bg-white dark:bg-[#1B1F33] text-gray-900 dark:text-[#F1F1F1] placeholder-gray-400 dark:placeholder-[#7b8393] transition-colors duration-150 ${
                  passwordError
                    ? "border-red-500 dark:border-red-400"
                    : "border-gray-300 dark:border-[#2D3148]"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-[#9aa4b2] p-1"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>

            {passwordError ? (
              <ValidationMessage text={passwordError} type="error" />
            ) : formData.password.length === 0 ? (
              <ValidationMessage text={passwordGuide} type="info" />
            ) : null}
          </div>

          {/* Confirm Password */}
          <div className="space-y-2 pb-8">
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-[#9aa4b2]" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  handleInputChange("confirmPassword", e.target.value)
                }
                disabled={loading}
                className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pyngl-pink bg-white dark:bg-[#1B1F33] text-gray-900 dark:text-[#F1F1F1] placeholder-gray-400 dark:placeholder-[#7b8393] transition-colors duration-150 ${
                  confirmPasswordError
                    ? "border-red-500 dark:border-red-400"
                    : "border-gray-300 dark:border-[#2D3148]"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-[#9aa4b2] p-1"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            {confirmPasswordError && (
              <ValidationMessage text={confirmPasswordError} type="error" />
            )}
          </div>

          {/* Terms */}
          <div className="flex items-start gap-3 pt-6">
            <input
              type="checkbox"
              id="terms"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              disabled={loading}
              className="mt-1 h-4 w-4 rounded border-gray-300 text-pyngl-pink focus:ring-pyngl-pink dark:bg-[#1B1F33] dark:border-[#2D3148]"
            />
            <label
              htmlFor="terms"
              className="text-sm text-gray-600 dark:text-[#cbd5e1]"
            >
              By tapping "Agree and continue", below you agree to the{" "}
              <span
                onClick={() => navigate("/terms-of-service")}
                className="text-blue-600 underline cursor-pointer"
              >
                Terms of services
              </span>{" "}
              and acknowledge that you have read the{" "}
              <span
                onClick={() => navigate("/privacy-policy")}
                className="text-blue-600 underline cursor-pointer"
              >
                Privacy policy
              </span>
              .
            </label>
          </div>

          {generalError && (
            <div className="text-center text-red-600 text-sm p-2 bg-red-50 rounded-lg mt-4 dark:bg-[rgba(255,0,0,0.06)] dark:text-[#ffb3c0]">
              {generalError}
            </div>
          )}

          {/* Continue Button */}
          <div className="pt-6">
            <button
              onClick={handleSubmit}
              disabled={loading || !isFormValid}
              className="w-full py-3.5 px-4 text-white font-semibold rounded-full shadow-md transition-all bg-pyngl-pink hover:bg-pyngl-pink-dark disabled:bg-gray-400 flex items-center justify-center"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Sending Code...
                </>
              ) : (
                "Continue"
              )}
            </button>
          </div>

          {/* Social Login */}
          <div className="relative py-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-[#2D3148]"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white dark:bg-[#131526] px-4 text-sm text-[#5467FE]">
                OR
              </span>
            </div>
          </div>
          <p className="text-sm text-gray-500 dark:text-[#cbd5e1] text-center mb-4">
            Continue with
          </p>

          <div className="flex justify-center gap-4 pb-12">
            <button
              onClick={handleGoogleLogin}
              className="p-3 border border-gray-300 dark:border-[#2D3148] rounded-2xl hover:bg-gray-50 dark:hover:bg-[rgba(255,255,255,0.02)] transition"
              aria-label="Continue with Google"
            >
              <svg className="h-6 w-6" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
            </button>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;