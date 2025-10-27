import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {Link} from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, registerSchema } from '../../utils/validationSchemas';
import useAuthStore from '../../store/useAuthStore';
import { FormInput } from '../../components/common/FormInput';
import { Mail, Lock, User, Phone, Calendar, AlertTriangle } from 'lucide-react';

// This is a dedicated login form component for the desktop page
const LoginForm = ({ onSwitchToRegister }) => {
    const { login, loading, error, clearError } = useAuthStore();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data) => {
        await login(data.email, data.password);
    };

    const handleSwitch = () => {
        clearError();
        onSwitchToRegister();
    };
    
    return (
        <div>
            <div className="text-left mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Welcome Back</h1>
                <p className="text-gray-500 mt-1">Please enter your credentials to log in.</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {error && (<div className="flex items-center gap-x-3 p-3 text-sm font-semibold text-red-800 bg-red-100 border rounded-lg"><AlertTriangle className="h-5 w-5" /><span>{error}</span></div>)}
                <FormInput Icon={Mail} type="email" label="Email" id="email" register={register} error={errors.email} disabled={loading} />
                <FormInput Icon={Lock} type="password" label="Password" id="password" register={register} error={errors.password} disabled={loading} />
                <div className="flex justify-between items-center text-sm"><Link
  to="/forgot-password" // <-- This changes the URL
  className="font-semibold text-pyngl-pink hover:text-pink-700 transition-colors"
>
  Forgot password?
</Link></div>
                <button type="submit" disabled={loading} className="w-full mt-4 py-3.5 px-4 bg-pyngl-pink text-white font-bold rounded-full shadow-lg">{loading ? 'Logging in...' : 'LOGIN'}</button>
                <p className="text-center text-sm text-gray-500 pt-4">Don't have an account? <button type="button" onClick={handleSwitch} className="font-semibold text-pyngl-pink">Sign up</button></p>
            </form>
        </div>
    );
};

// This is a dedicated register form component for the desktop page
const RegisterForm = ({ onSwitchToLogin }) => {
    const { register: registerUser, loading, error, clearError } = useAuthStore();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(registerSchema),
    });
    
    const onSubmit = async (data) => {
        // We don't need to send confirmPassword to the backend
        const { confirmPassword, ...userData } = data;
        await registerUser(userData);
    };

    const handleSwitch = () => {
        clearError();
        onSwitchToLogin();
    };

    return (
        <div>
            <div className="text-left mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Create an Account</h1>
                <p className="text-gray-500 mt-1">Join Pyngl today!</p>
            </div>
            {/* The form now has more space between fields for a cleaner look */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {error && (<div className="flex items-center gap-x-3 p-3 text-sm font-semibold text-red-800 bg-red-100 border rounded-lg"><AlertTriangle className="h-5 w-5" /><span>{error}</span></div>)}
                <FormInput Icon={User} type="text" label="Username" id="username" register={register} error={errors.username} disabled={loading} />
                <FormInput Icon={Mail} type="email" label="Email" id="email" register={register} error={errors.email} disabled={loading} />
                {/* --- NEW FIELDS ADDED HERE --- */}
                <FormInput Icon={Phone} type="tel" label="Phone Number" id="phoneNumber" register={register} error={errors.phoneNumber} disabled={loading} />
                <FormInput Icon={Calendar} type="date" label="Date of Birth" id="birthDate" register={register} error={errors.birthDate} disabled={loading} />
                <FormInput Icon={Lock} type="password" label="Password" id="password" register={register} error={errors.password} disabled={loading} />
                <FormInput Icon={Lock} type="password" label="Confirm Password" id="confirmPassword" register={register} error={errors.confirmPassword} disabled={loading} />
                
                <button type="submit" disabled={loading} className="w-full mt-4 py-3.5 px-4 bg-pyngl-pink text-white font-bold rounded-full shadow-lg">{loading ? 'Creating Account...' : 'SIGN UP'}</button>
                <p className="text-center text-sm text-gray-500 pt-4">Already have an account? <button type="button" onClick={handleSwitch} className="font-semibold text-pyngl-pink">Log in</button></p>
            </form>
        </div>
    );
};


// The main desktop component with the two-column layout
const DesktopAuthPage = () => {
    const [activeForm, setActiveForm] = useState('login'); // can be 'login' or 'register'

    return (
        <div className="w-full min-h-screen grid grid-cols-1 lg:grid-cols-2">
            {/* Left Side: Image / Branding */}
            <div className="hidden lg:flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-12">
                <img src="/pynglLogoImage.png" alt="Pyngl Logo" className="h-12 mb-8" />
                <img src="/homePageImage1.png" alt="Poll smarter" className="max-w-md" />
                <h2 className="text-3xl font-bold mt-8">Poll smarter, Engage smarter.</h2>
                <p className="text-gray-500 mt-2">The best way to interact with your audience.</p>
            </div>

            {/* Right Side: Form */}
            <div className="flex items-center justify-center p-8 lg:p-12">
                <div className="max-w-md w-full">
                    {activeForm === 'login' ? (
                        <LoginForm onSwitchToRegister={() => setActiveForm('register')} />
                    ) : (
                        <RegisterForm onSwitchToLogin={() => setActiveForm('login')} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default DesktopAuthPage;

