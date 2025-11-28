// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { forgotPasswordSchema, resetPasswordSchema } from '../../utils/validationSchemas';
// import useAuthStore from '../../store/useAuthStore';
// import BottomSheet from '../common/BottomSheet';
// import { FormInput, FormError } from '../common/FormInput';
// import { Mail, KeyRound, Lock } from 'lucide-react';

// const ForgotPasswordSheet = ({ openSheet, closeSheet }) => {
//     const [step, setStep] = useState('enterEmail');
//     const [emailForReset, setEmailForReset] = useState('');
//     const { forgotPassword, resetPassword, loading, error } = useAuthStore();
//     const navigate = useNavigate();
    
//     const emailForm = useForm({ resolver: zodResolver(forgotPasswordSchema) });
//   const onEmailSubmit = async (data) => {
//   try {
//     await forgotPassword(data.email);
//     setEmailForReset(data.email);
//     setStep('enterOtp');
//     resetForm.reset({ otp: '', password: '' }); // ✅ clear old values
//   } catch (e) {
//     console.error(e);
//   }
// };


//     const resetForm = useForm({ resolver: zodResolver(resetPasswordSchema) });
//     const onResetSubmit = async (data) => {
//         try {
//             await resetPassword(emailForReset, data.otp, data.password);
//             setStep('success');
//         } catch (e) {
//             console.error(e);
//         }
//     };

//     if (step === 'enterEmail') {
//         return (
//             <BottomSheet>
//                 <div className="text-left mb-6"><h2 className="text-xl font-bold">FORGOT PASSWORD?</h2><p className="text-gray-500 mt-1">Enter your email for a recovery OTP.</p></div>
//                 <form onSubmit={emailForm.handleSubmit(onEmailSubmit)} className="space-y-4">
//                     {error && <FormError message={error} />}
//                     <FormInput Icon={Mail} type="email" label="Email" id="email" register={emailForm.register} error={emailForm.formState.errors.email} />
//                     <button type="submit" disabled={loading} className="w-full py-3.5 px-4 bg-pyngl-pink text-white font-bold rounded-full shadow-lg mt-4 disabled:bg-pink-300">{loading ? 'Sending OTP...' : 'SEND RECOVERY OTP'}</button>
//                     <p className="text-center text-sm text-gray-500 pt-1">Remembered password? <button type="button" onClick={() => openSheet('login')} className="font-bold text-gray-600 hover:underline">Back to Login</button></p>
//                 </form>
//             </BottomSheet>
//         );
//     }

//     if (step === 'enterOtp') {
//         return (
//             <BottomSheet>
//                 <div className="text-left mb-6"><h2 className="text-xl font-bold">CHECK YOUR EMAIL</h2><p className="text-gray-500 mt-1">Enter the OTP sent to {emailForReset} and your new password.</p></div>
//                 <form onSubmit={resetForm.handleSubmit(onResetSubmit)} className="space-y-4">
//                     {error && <FormError message={error} />}
//                     <FormInput Icon={KeyRound} type="text" label="6-Digit OTP" id="otp" register={resetForm.register} error={resetForm.formState.errors.otp} />
//                     <FormInput Icon={Lock} type="password" label="New Password" id="password" register={resetForm.register} error={resetForm.formState.errors.password} />
//                     <button type="submit" disabled={loading} className="w-full py-3.5 px-4 bg-pyngl-purple text-white font-bold rounded-full shadow-lg mt-4 disabled:bg-purple-300">{loading ? 'Resetting...' : 'RESET PASSWORD'}</button>
//                 </form>
//             </BottomSheet>
//         )
//     }

//     if (step === 'success') {
//          return (
//             <BottomSheet>
//                 <div className="text-center p-4">
//                     <h2 className="text-xl font-bold">Success!</h2>
//                     <p className="text-gray-600 mt-2">Your password has been reset. Please log in with your new password.</p>
//                     <button onClick={() => navigate('/login')} className="w-full mt-6 py-3 px-4 bg-pyngl-pink text-white font-bold rounded-full shadow-lg">BACK TO LOGIN</button>
//                 </div>
//             </BottomSheet>
//         );
//     }
// };

// export default ForgotPasswordSheet;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { forgotPasswordSchema, resetPasswordSchema } from '../../utils/validationSchemas';
import useAuthStore from '../../store/useAuthStore';
import BottomSheet from '../common/BottomSheet';
import { FormInput, FormError } from '../common/FormInput';
import { Mail, KeyRound, Lock, Loader2, ArrowLeft } from 'lucide-react';

const ForgotPasswordSheet = ({ openSheet, closeSheet }) => {
    const [step, setStep] = useState('enterEmail');
    const [emailForReset, setEmailForReset] = useState('');
    const { forgotPassword, resetPassword, loading, error } = useAuthStore();
    const navigate = useNavigate();
    
    const emailForm = useForm({ resolver: zodResolver(forgotPasswordSchema) });
  const onEmailSubmit = async (data) => {
  try {
    await forgotPassword(data.email);
    setEmailForReset(data.email);
    setStep('enterOtp');
    resetForm.reset({ otp: '', password: '' }); // ✅ clear old values
  } catch (e) {
    console.error(e);
  }
};


    const resetForm = useForm({ resolver: zodResolver(resetPasswordSchema) });
    const onResetSubmit = async (data) => {
        try {
            await resetPassword(emailForReset, data.otp, data.password);
            setStep('success');
        } catch (e) {
            console.error(e);
        }
    };

   if (step === 'enterEmail') {
        return (
            <BottomSheet closeSheet={closeSheet}>
                <div className="text-left mb-6">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-[#F1F1F1]">Forgot Password?</h2>
                    <p className="text-gray-500 dark:text-[#9aa4b2] mt-1 text-sm">
                        Enter your email address and we'll send you a recovery code.
                    </p>
                </div>

                <form onSubmit={emailForm.handleSubmit(onEmailSubmit)} className="space-y-5">
                    {error && <FormError message={error} />}
                    
                    <FormInput 
                        Icon={Mail} 
                        type="email" 
                        label="Email Address" 
                        id="email" 
                        register={emailForm.register}
                        validation={{ 
                          required: "Email is required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address"
                          }
                        }}
                        error={emailForm.formState.errors.email} 
                    />
                    
                    <button 
                        type="submit" 
                        disabled={loading} 
                        className="w-full py-3.5 px-4 bg-pyngl-pink hover:bg-pyngl-pink-dark text-white font-semibold rounded-full shadow-lg shadow-pyngl-pink/20 disabled:opacity-70 disabled:cursor-not-allowed transition-all flex items-center justify-center"
                    >
                        {loading ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Sending...</> : 'Send Recovery Code'}
                    </button>
                    
                    <p className="text-center text-sm text-gray-500 dark:text-[#9aa4b2] pt-2">
                        Remembered your password?{' '}
                        <button 
                            type="button" 
                            onClick={() => openSheet('login')} 
                            className="font-semibold text-gray-700 dark:text-[#F1F1F1] hover:text-pyngl-pink dark:hover:text-pyngl-pink transition-colors underline decoration-transparent hover:decoration-current"
                        >
                            Back to Login
                        </button>
                    </p>
                </form>
            </BottomSheet>
        );
    }

  if (step === 'enterOtp') {
        return (
            <BottomSheet closeSheet={closeSheet}>
                <div className="text-left mb-6">
                    <button 
                        type="button"
                        onClick={() => setStep('enterEmail')}
                        className="mb-4 -ml-2 p-2 text-gray-500 hover:text-gray-900 dark:text-[#9aa4b2] dark:hover:text-white transition-colors"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </button>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-[#F1F1F1]">Check your email</h2>
                    <p className="text-gray-500 dark:text-[#9aa4b2] mt-1 text-sm">
                        We sent a code to <span className="font-medium text-gray-900 dark:text-white">{emailForReset}</span>. Enter it below to reset your password.
                    </p>
                </div>

                <form onSubmit={resetForm.handleSubmit(onResetSubmit)} className="space-y-4">
                    {error && <FormError message={error} />}
                    
                    <FormInput 
                        Icon={KeyRound} 
                        type="text" 
                        label="6-Digit Code" 
                        id="otp" 
                        register={resetForm.register}
                        validation={{ required: "OTP is required", minLength: { value: 6, message: "Must be 6 digits" } }}
                        error={resetForm.formState.errors.otp} 
                    />
                    
                    <FormInput 
                        Icon={Lock} 
                        type="password" 
                        label="New Password" 
                        id="password" 
                        register={resetForm.register}
                        validation={{ required: "Password is required", minLength: { value: 6, message: "Must be at least 6 chars" } }} 
                        error={resetForm.formState.errors.password} 
                    />
                    
                    <button 
                        type="submit" 
                        disabled={loading} 
                        className="w-full py-3.5 px-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-full shadow-lg shadow-purple-600/20 mt-4 disabled:opacity-70 disabled:cursor-not-allowed transition-all flex items-center justify-center"
                    >
                        {loading ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Resetting...</> : 'Reset Password'}
                    </button>
                </form>
            </BottomSheet>
        )
    }
    
    if (step === 'success') {
         return (
            <BottomSheet closeSheet={closeSheet}>
                <div className="text-center p-6">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Lock className="h-8 w-8 text-green-600 dark:text-green-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-[#F1F1F1] mb-2">Success!</h2>
                    <p className="text-gray-600 dark:text-[#9aa4b2] mb-8">
                        Your password has been successfully reset. You can now log in with your new password.
                    </p>
                    <button 
                        onClick={() => openSheet('login')} 
                        className="w-full py-3.5 px-4 bg-pyngl-pink hover:bg-pyngl-pink-dark text-white font-bold rounded-full shadow-lg shadow-pyngl-pink/20 transition-all"
                    >
                        Back to Login
                    </button>
                </div>
            </BottomSheet>
        );
    }
};

export default ForgotPasswordSheet;