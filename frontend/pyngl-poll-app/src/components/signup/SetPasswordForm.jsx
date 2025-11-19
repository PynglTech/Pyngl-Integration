import React, { useEffect, useRef, useState, useMemo } from "react";
import {
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  Loader2,
} from "lucide-react";

// --- Validation Helper Component ---
const ValidationMessage = ({ text, type = 'error' }) => {
  if (type === 'error') {
    return (
      <div className="bg-pink-50 dark:bg-[rgba(255,77,116,0.06)] text-pink-600 dark:text-[#ffb3c0] border border-pink-100 dark:border-[rgba(255,77,116,0.12)] p-3 rounded-lg flex items-start mt-2 transition-colors">
        <span className="mr-2 text-lg leading-tight">😒</span>
        <span className="text-sm font-medium">{text}</span>
      </div>
    );
  }

  // info style
  return (
    <div className="bg-blue-50 dark:bg-[rgba(84,103,254,0.06)] text-blue-600 dark:text-[#cfe0ff] border border-blue-100 dark:border-[rgba(84,103,254,0.12)] p-3 rounded-lg flex items-start mt-2 transition-colors">
      <span className="mr-2 text-lg leading-tight">•</span>
      <span className="text-sm font-medium">{text}</span>
    </div>
  );
};

const SetPasswordForm = ({ onSuccess, onBack }) => {
  const [loading, setLoading] = useState(false);
  
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const passwordInputRef = useRef(null);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [generalError, setGeneralError] = useState("");

  // Static guide text for the password field
  const passwordGuide = "Use 8+ chars with 1 number or symbol and both (A-Z) & (a-z)";

  // Auto-focus password field
  useEffect(() => {
    passwordInputRef.current?.focus();
  }, []);

  // Password validation
  useEffect(() => {
    const p = password;
    if (p.length === 0) {
      setPasswordError(""); // No error if empty
      return;
    }
    
    const hasLength = p.length >= 8;
    const hasUpper = /[A-Z]/.test(p);
    const hasLower = /[a-z]/.test(p);
    const hasNumber = /[0-9]/.test(p);
    const hasSymbol = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(p);
    
    if (!hasLength) {
      setPasswordError("Must be 8+ characters long.");
    } else if (!hasUpper || !hasLower) {
      setPasswordError("Must include both (A-Z) & (a-z).");
    } else if (!hasNumber && !hasSymbol) {
      setPasswordError("Must include 1 number or symbol.");
    } else {
      setPasswordError(""); // All rules passed
    }
  }, [password]);

  // Confirm Password validation
  useEffect(() => {
    if (confirmPassword && password !== confirmPassword) {
      setConfirmPasswordError("Both passwords must be identical");
    } else {
      setConfirmPasswordError("");
    }
  }, [password, confirmPassword]);

  const isFormValid = useMemo(
    () =>
      password &&
      confirmPassword &&
      !passwordError &&
      !confirmPasswordError,
    [password, confirmPassword, passwordError, confirmPasswordError]
  );

  const handleSubmit = () => {
    if (!isFormValid) {
      setGeneralError("Please fix the errors above.");
      return;
    }

    setLoading(true);
    setGeneralError("");

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      onSuccess(password);
    }, 1500);
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
        <h1 className="text-xl font-semibold text-gray-900 dark:text-[#F1F1F1]">Create account</h1>
        <div className="w-9"></div> {/* Spacer */}
      </div>

      {/* Scrollable Body */}
      <div className="flex-1 w-full overflow-y-auto">
        <div className="w-full max-w-md mx-auto px-6 py-8">
          <p className="text-sm text-gray-500 dark:text-[#cbd5e1] mb-6 font-medium text-center">
            Step 3 of 3
          </p>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-[#F1F1F1] mb-8">Set a password</h2>

          {/* Password Input */}
          <div className="space-y-2 pb-4">
            <div className="relative">
              <input
                ref={passwordInputRef}
                type={showPassword ? "text" : "password"}
                placeholder="Set a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                className={`w-full px-4 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pyngl-pink bg-white dark:bg-[#1B1F33] text-gray-900 dark:text-[#F1F1F1] placeholder-gray-400 dark:placeholder-[#7b8393] transition-colors duration-150 ${
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
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {/* Show error OR guide */}
            {passwordError ? (
              <ValidationMessage text={passwordError} type="error" />
            ) : (
              <ValidationMessage text={passwordGuide} type="info" />
            )}
          </div>

          {/* Confirm Password Input */}
          <div className="space-y-2 pb-8">
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={loading}
                className={`w-full px-4 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pyngl-pink bg-white dark:bg-[#1B1F33] text-gray-900 dark:text-[#F1F1F1] placeholder-gray-400 dark:placeholder-[#7b8393] transition-colors duration-150 ${
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
                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {confirmPasswordError && <ValidationMessage text={confirmPasswordError} type="error" />}
          </div>
          
          {generalError && (
            <div className="text-center text-red-600 text-sm p-2 bg-red-50 dark:bg-[rgba(255,0,0,0.06)] dark:text-[#ffb3c0] rounded-lg mt-4">
              {generalError}
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-6">
            <button
              onClick={handleSubmit}
              disabled={loading || !isFormValid}
              className="w-full py-3.5 px-4 text-white font-semibold rounded-full shadow-md transition-all bg-pyngl-pink hover:bg-pyngl-pink-dark disabled:bg-gray-400 flex items-center justify-center"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Saving...
                </>
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetPasswordForm;