// import React from 'react';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { loginSchema } from '../../utils/validationSchemas';
// import useAuthStore from '../../store/useAuthStore';
// import BottomSheet from '../common/BottomSheet';
// import { FormInput, FormError } from '../common/FormInput';
// import { Mail, Lock } from 'lucide-react';

// const LoginSheet = ({ openSheet }) => {
//     const { login, loading, error } = useAuthStore();
//     const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(loginSchema) });
//     const onSubmit = async (data) => { await login(data.email, data.password).catch(e => console.error(e)); };
    
//     return (
//         <BottomSheet>
//             <div className="text-left mb-8"><h1 className="text-2xl font-bold">LOGIN</h1><p className="text-gray-500 mt-1">Please enter your credentials.</p></div>
//             <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//                 {error && <FormError message={error} />}
//                 <FormInput Icon={Mail} type="email" label="Email" id="email" register={register} error={errors.email} />
//                 <FormInput Icon={Lock} type="password" label="Password" id="password" register={register} error={errors.password} />
//                 <div className="flex justify-between items-center text-sm pt-2">
//                     <button type="button" onClick={() => openSheet('forgot')} className="font-semibold text-pyngl-pink hover:underline">Forgot password?</button>
//                     <button type="button" onClick={() => openSheet('register')} className="font-semibold text-gray-500 hover:underline">Create Account</button>
//                 </div>
//                 <button type="submit" disabled={loading} className="w-full mt-4 py-3.5 px-4 bg-pyngl-pink text-white font-bold rounded-full shadow-lg disabled:bg-pink-300">{loading ? 'Logging in...' : 'LOGIN ACCOUNT'}</button>
//             </form>
//         </BottomSheet>
//     );
// };

// export default LoginSheet;
import React, { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../../utils/validationSchemas';
import useAuthStore from '../../store/useAuthStore';
import BottomSheet from '../common/BottomSheet';
import { FormInput } from '../common/FormInput';
import { Mail, Lock, AlertTriangle } from 'lucide-react';

const LoginSheet = ({ openSheet, closeSheet }) => {
    const { login, loading, error } = useAuthStore();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(loginSchema),
    });

    const emailInputRef = useRef(null);
    useEffect(() => {
        emailInputRef.current?.focus();
    }, []);

    const onSubmit = async (data) => {
        await login(data.email, data.password);
    };

    return (
        // The BottomSheet now gets the closeSheet prop to enable background clicks
        <BottomSheet closeSheet={closeSheet}>
            {/* ## THE KEY FIX ##: A padded container for all content */}
            <div className="flex flex-col w-full p-8">
                {/* Improved Header */}
                <div className="text-left mb-8">
                    <h1 className="text-3xl font-bold tracking-tight">Welcome Back</h1>
                    <p className="text-gray-500 mt-1">Please enter your credentials to log in.</p>
                </div>

                {/* Main Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
                    {/* Global error message */}
                    {error && (
                        <div className="flex items-center gap-x-3 p-3 text-sm font-semibold text-red-800 bg-red-100 border border-red-200 rounded-lg">
                            <AlertTriangle className="h-5 w-5" />
                            <span>{error}</span>
                        </div>
                    )}

                    {/* Form Inputs */}
                    <FormInput
                        Icon={Mail}
                        type="email"
                        label="Email"
                        id="email"
                        register={register}
                        error={errors.email}
                        ref={emailInputRef}
                        disabled={loading}
                    />
                    <FormInput
                        Icon={Lock}
                        type="password"
                        label="Password"
                        id="password"
                        register={register}
                        error={errors.password}
                        disabled={loading}
                    />

                    {/* Action links */}
                    <div className="flex justify-between items-center text-sm pt-1">
                        <button
                            type="button"
                            onClick={() => openSheet('forgot')}
                            className="font-semibold text-pyngl-pink hover:text-pink-700 transition-colors duration-200"
                        >
                            Forgot password?
                        </button>
                        <button
                            type="button"
                            onClick={() => openSheet('register')}
                            className="font-semibold text-gray-500 hover:text-gray-800 transition-colors duration-200"
                        >
                            Create Account
                        </button>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-4 py-3.5 px-4 bg-pyngl-pink text-white font-bold rounded-full shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pyngl-pink disabled:bg-pink-300 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Logging in...' : 'LOGIN'}
                    </button>
                </form>
            </div>
        </BottomSheet>
    );
};

export default LoginSheet;  