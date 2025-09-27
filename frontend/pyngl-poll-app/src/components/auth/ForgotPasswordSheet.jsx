import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { forgotPasswordSchema, resetPasswordSchema } from '../../utils/validationSchemas';
import useAuthStore from '../../store/useAuthStore';
import BottomSheet from '../common/BottomSheet';
import { FormInput, FormError } from '../common/FormInput';
import { Mail, KeyRound, Lock } from 'lucide-react';

const ForgotPasswordSheet = ({ openSheet, closeSheet }) => {
    const [step, setStep] = useState('enterEmail');
    const [emailForReset, setEmailForReset] = useState('');
    const { forgotPassword, resetPassword, loading, error } = useAuthStore();
    
    const emailForm = useForm({ resolver: zodResolver(forgotPasswordSchema) });
    const onEmailSubmit = async (data) => {
        try {
            await forgotPassword(data.email);
            setEmailForReset(data.email);
            setStep('enterOtp');
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
            <BottomSheet>
                <div className="text-left mb-6"><h2 className="text-xl font-bold">FORGOT PASSWORD?</h2><p className="text-gray-500 mt-1">Enter your email for a recovery OTP.</p></div>
                <form onSubmit={emailForm.handleSubmit(onEmailSubmit)} className="space-y-4">
                    {error && <FormError message={error} />}
                    <FormInput Icon={Mail} type="email" label="Email" id="email" register={emailForm.register} error={emailForm.formState.errors.email} />
                    <button type="submit" disabled={loading} className="w-full py-3.5 px-4 bg-pyngl-pink text-white font-bold rounded-full shadow-lg mt-4 disabled:bg-pink-300">{loading ? 'Sending OTP...' : 'SEND RECOVERY OTP'}</button>
                    <p className="text-center text-sm text-gray-500 pt-1">Remembered password? <button type="button" onClick={() => openSheet('login')} className="font-bold text-gray-600 hover:underline">Back to Login</button></p>
                </form>
            </BottomSheet>
        );
    }

    if (step === 'enterOtp') {
        return (
            <BottomSheet>
                <div className="text-left mb-6"><h2 className="text-xl font-bold">CHECK YOUR EMAIL</h2><p className="text-gray-500 mt-1">Enter the OTP sent to {emailForReset} and your new password.</p></div>
                <form onSubmit={resetForm.handleSubmit(onResetSubmit)} className="space-y-4">
                    {error && <FormError message={error} />}
                    <FormInput Icon={KeyRound} type="text" label="6-Digit OTP" id="otp" register={resetForm.register} error={resetForm.formState.errors.otp} />
                    <FormInput Icon={Lock} type="password" label="New Password" id="password" register={resetForm.register} error={resetForm.formState.errors.password} />
                    <button type="submit" disabled={loading} className="w-full py-3.5 px-4 bg-pyngl-purple text-white font-bold rounded-full shadow-lg mt-4 disabled:bg-purple-300">{loading ? 'Resetting...' : 'RESET PASSWORD'}</button>
                </form>
            </BottomSheet>
        )
    }

    if (step === 'success') {
         return (
            <BottomSheet>
                <div className="text-center p-4">
                    <h2 className="text-xl font-bold">Success!</h2>
                    <p className="text-gray-600 mt-2">Your password has been reset. Please log in with your new password.</p>
                    <button onClick={() => openSheet('login')} className="w-full mt-6 py-3 px-4 bg-pyngl-pink text-white font-bold rounded-full shadow-lg">BACK TO LOGIN</button>
                </div>
            </BottomSheet>
        );
    }
};

export default ForgotPasswordSheet;