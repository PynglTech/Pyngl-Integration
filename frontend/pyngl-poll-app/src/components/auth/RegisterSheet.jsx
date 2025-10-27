// // import React from 'react';
// // import { useForm } from 'react-hook-form';
// // import { zodResolver } from '@hookform/resolvers/zod';
// // import { registerSchema } from '../../utils/validationSchemas';
// // import useAuthStore from '../../store/useAuthStore';
// // import BottomSheet from '../common/BottomSheet';
// // import { FormInput, FormError } from '../common/FormInput';
// // import { User, Mail, Smartphone, Lock } from 'lucide-react';

// // const RegisterSheet = ({ openSheet }) => {
// //     const { register: registerUser, loading, error } = useAuthStore();
// //     const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(registerSchema) });
    
// //     const onSubmit = async (data) => {
// //         await registerUser(data.username, data.email, data.password, data.phoneNumber, data.age).catch(e => console.error(e));
// //     };

// //     return (
// //         <BottomSheet>
// //             <div className="text-left mb-6"><h2 className="text-xl font-bold">REGISTER</h2></div>
// //             <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
// //                 {error && <FormError message={error} />}
// //                 <FormInput Icon={User} type="text" label="Username" id="username" register={register} error={errors.username} />
// //                 <FormInput Icon={Mail} type="email" label="Email" id="email" register={register} error={errors.email} />
// //                 <FormInput Icon={Smartphone} type="tel" label="Phone Number" id="phoneNumber" register={register} error={errors.phoneNumber} />
// //                 <FormInput Icon={User} type="number" label="Age" id="age" register={register} error={errors.age} />
// //                 <FormInput Icon={Lock} type="password" label="Choose a password" id="password" register={register} error={errors.password} />
// //                 <button type="submit" disabled={loading} className="w-full py-3.5 px-4 bg-pyngl-purple text-white font-bold rounded-full shadow-lg mt-4 disabled:bg-purple-300">
// //                     {loading ? 'Creating Account...' : 'REGISTER'}
// //                 </button>
// //                 <p className="text-center text-sm text-gray-500 pt-1">
// //                     Already Registered? <button type="button" onClick={() => openSheet('login')} className="font-bold text-pyngl-purple hover:underline">Sign In Here.</button>
// //                 </p>
// //             </form>
// //         </BottomSheet>
// //     );
// // };

// // export default RegisterSheet;

// import React from 'react';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { registerSchema } from '../../utils/validationSchemas';
// import useAuthStore from '../../store/useAuthStore';
// import BottomSheet from '../common/BottomSheet';
// import { FormInput, FormError } from '../common/FormInput';
// // CHANGED: Imported the Calendar icon
// import { User, Mail, Smartphone, Lock, Calendar } from 'lucide-react';

// const RegisterSheet = ({ openSheet }) => {
//     const { register: registerUser, loading, error } = useAuthStore();
//     const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(registerSchema) });
    
//     const onSubmit = async (data) => {
//         // CHANGED: Now sending data.birthDate instead of data.age
//         await registerUser(data.username, data.email, data.password, data.phoneNumber, data.birthDate)
//             .catch(e => console.error(e));
//     };

//     return (
//         <BottomSheet>
//             <div className="text-left mb-6"><h2 className="text-xl font-bold">REGISTER</h2></div>
//             <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//                 {error && <FormError message={error} />}
//                 <FormInput Icon={User} type="text" label="Username" id="username" register={register} error={errors.username} />
//                 <FormInput Icon={Mail} type="email" label="Email" id="email" register={register} error={errors.email} />
//                 <FormInput Icon={Smartphone} type="tel" label="Phone Number" id="phoneNumber" register={register} error={errors.phoneNumber} />
                
//                 {/* --- THIS INPUT HAS BEEN CHANGED --- */}
//                 <FormInput 
//                     Icon={Calendar} 
//                     type="date" 
//                     label="Date of Birth" 
//                     id="birthDate" 
//                     register={register} 
//                     error={errors.birthDate} 
//                 />
                
//                 <FormInput Icon={Lock} type="password" label="Choose a password" id="password" register={register} error={errors.password} />
                
//                 <button type="submit" disabled={loading} className="w-full py-3.5 px-4 bg-pyngl-purple text-white font-bold rounded-full shadow-lg mt-4 disabled:bg-purple-300">
//                     {loading ? 'Creating Account...' : 'REGISTER'}
//                 </button>
//                 <p className="text-center text-sm text-gray-500 pt-1">
//                     Already Registered? <button type="button" onClick={() => openSheet('login')} className="font-bold text-pyngl-purple hover:underline">Sign In Here.</button>
//                 </p>
//             </form>
//         </BottomSheet>
//     );
// };

// export default RegisterSheet;
import React, { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '../../utils/validationSchemas';
import useAuthStore from '../../store/useAuthStore';
import BottomSheet from '../common/BottomSheet';
import { FormInput } from '../common/FormInput';
import { User, Mail, Smartphone, Lock, Calendar, AlertTriangle } from 'lucide-react';

const RegisterSheet = ({ openSheet, closeSheet }) => {
    // Renamed to avoid conflict with the 'register' from react-hook-form
    const { register: registerUser, loading, error } = useAuthStore();
    
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(registerSchema)
    });

    const usernameInputRef = useRef(null);

    // Auto-focus the first field for better UX
    useEffect(() => {
        usernameInputRef.current?.focus();
    }, []);

    const onSubmit = async (data) => {
        // We no longer need the .catch here as the store handles the error state
        await registerUser(data.username, data.email, data.password, data.phoneNumber, data.birthDate);
    };

    return (
        <BottomSheet closeSheet={closeSheet}>
            {/* Main padded container for a systematic layout */}
            <div className="flex flex-col w-full p-8">
                {/* Improved Header */}
                <div className="text-left mb-8">
                    <h1 className="text-3xl font-bold tracking-tight">Create an Account</h1>
                    <p className="text-gray-500 mt-1">Join the Pyngl community today!</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-5">
                    {/* Global error message */}
                    {error && (
                        <div className="flex items-center gap-x-3 p-3 text-sm font-semibold text-red-800 bg-red-100 border border-red-200 rounded-lg">
                            <AlertTriangle className="h-5 w-5" />
                            <span>{error}</span>
                        </div>
                    )}

                    <FormInput Icon={User} type="text" label="Username" id="username" register={register} error={errors.username} ref={usernameInputRef} disabled={loading} />
                    <FormInput Icon={Mail} type="email" label="Email" id="email" register={register} error={errors.email} disabled={loading} />
                    <FormInput Icon={Smartphone} type="tel" label="Phone Number" id="phoneNumber" register={register} error={errors.phoneNumber} disabled={loading} />
                    <FormInput Icon={Calendar} type="date" label="Date of Birth" id="birthDate" register={register} error={errors.birthDate} disabled={loading} />
                    <FormInput Icon={Lock} type="password" label="Choose a password" id="password" register={register} error={errors.password} disabled={loading} />
                    
                    {/* ✨ NEW: Confirm Password Field */}
                    <FormInput Icon={Lock} type="password" label="Confirm password" id="confirmPassword" register={register} error={errors.confirmPassword} disabled={loading} />

                    <div className="pt-2">
                        <button type="submit" disabled={loading} className="w-full py-3.5 px-4 bg-pyngl-pink text-white font-bold rounded-full shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pyngl-pink disabled:bg-pink-300 disabled:cursor-not-allowed">
                            {loading ? 'Creating Account...' : 'CREATE ACCOUNT'}
                        </button>
                    </div>

                    <p className="text-center text-sm text-gray-500 pt-1">
                        Already have an account?{' '}
                        <button type="button" onClick={() => openSheet('login')} className="font-semibold text-pyngl-pink hover:underline">
                            Sign In
                        </button>
                    </p>
                </form>
            </div>
        </BottomSheet>
    );
};

export default RegisterSheet;