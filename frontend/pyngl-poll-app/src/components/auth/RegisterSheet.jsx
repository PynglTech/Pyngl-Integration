// import React from 'react';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { registerSchema } from '../../utils/validationSchemas';
// import useAuthStore from '../../store/useAuthStore';
// import BottomSheet from '../common/BottomSheet';
// import { FormInput, FormError } from '../common/FormInput';
// import { User, Mail, Smartphone, Lock } from 'lucide-react';

// const RegisterSheet = ({ openSheet }) => {
//     const { register: registerUser, loading, error } = useAuthStore();
//     const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(registerSchema) });
    
//     const onSubmit = async (data) => {
//         await registerUser(data.username, data.email, data.password, data.phoneNumber, data.age).catch(e => console.error(e));
//     };

//     return (
//         <BottomSheet>
//             <div className="text-left mb-6"><h2 className="text-xl font-bold">REGISTER</h2></div>
//             <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//                 {error && <FormError message={error} />}
//                 <FormInput Icon={User} type="text" label="Username" id="username" register={register} error={errors.username} />
//                 <FormInput Icon={Mail} type="email" label="Email" id="email" register={register} error={errors.email} />
//                 <FormInput Icon={Smartphone} type="tel" label="Phone Number" id="phoneNumber" register={register} error={errors.phoneNumber} />
//                 <FormInput Icon={User} type="number" label="Age" id="age" register={register} error={errors.age} />
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

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '../../utils/validationSchemas';
import useAuthStore from '../../store/useAuthStore';
import BottomSheet from '../common/BottomSheet';
import { FormInput, FormError } from '../common/FormInput';
// CHANGED: Imported the Calendar icon
import { User, Mail, Smartphone, Lock, Calendar } from 'lucide-react';

const RegisterSheet = ({ openSheet }) => {
    const { register: registerUser, loading, error } = useAuthStore();
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(registerSchema) });
    
    const onSubmit = async (data) => {
        // CHANGED: Now sending data.birthDate instead of data.age
        await registerUser(data.username, data.email, data.password, data.phoneNumber, data.birthDate)
            .catch(e => console.error(e));
    };

    return (
        <BottomSheet>
            <div className="text-left mb-6"><h2 className="text-xl font-bold">REGISTER</h2></div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {error && <FormError message={error} />}
                <FormInput Icon={User} type="text" label="Username" id="username" register={register} error={errors.username} />
                <FormInput Icon={Mail} type="email" label="Email" id="email" register={register} error={errors.email} />
                <FormInput Icon={Smartphone} type="tel" label="Phone Number" id="phoneNumber" register={register} error={errors.phoneNumber} />
                
                {/* --- THIS INPUT HAS BEEN CHANGED --- */}
                <FormInput 
                    Icon={Calendar} 
                    type="date" 
                    label="Date of Birth" 
                    id="birthDate" 
                    register={register} 
                    error={errors.birthDate} 
                />
                
                <FormInput Icon={Lock} type="password" label="Choose a password" id="password" register={register} error={errors.password} />
                
                <button type="submit" disabled={loading} className="w-full py-3.5 px-4 bg-pyngl-purple text-white font-bold rounded-full shadow-lg mt-4 disabled:bg-purple-300">
                    {loading ? 'Creating Account...' : 'REGISTER'}
                </button>
                <p className="text-center text-sm text-gray-500 pt-1">
                    Already Registered? <button type="button" onClick={() => openSheet('login')} className="font-bold text-pyngl-purple hover:underline">Sign In Here.</button>
                </p>
            </form>
        </BottomSheet>
    );
};

export default RegisterSheet;