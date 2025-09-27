import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../../utils/validationSchemas';
import useAuthStore from '../../store/useAuthStore';
import BottomSheet from '../common/BottomSheet';
import { FormInput, FormError } from '../common/FormInput';
import { Mail, Lock } from 'lucide-react';

const LoginSheet = ({ openSheet }) => {
    const { login, loading, error } = useAuthStore();
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(loginSchema) });
    const onSubmit = async (data) => { await login(data.email, data.password).catch(e => console.error(e)); };
    
    return (
        <BottomSheet>
            <div className="text-left mb-8"><h1 className="text-2xl font-bold">LOGIN</h1><p className="text-gray-500 mt-1">Please enter your credentials.</p></div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {error && <FormError message={error} />}
                <FormInput Icon={Mail} type="email" label="Email" id="email" register={register} error={errors.email} />
                <FormInput Icon={Lock} type="password" label="Password" id="password" register={register} error={errors.password} />
                <div className="flex justify-between items-center text-sm pt-2">
                    <button type="button" onClick={() => openSheet('forgot')} className="font-semibold text-pyngl-pink hover:underline">Forgot password?</button>
                    <button type="button" onClick={() => openSheet('register')} className="font-semibold text-gray-500 hover:underline">Create Account</button>
                </div>
                <button type="submit" disabled={loading} className="w-full mt-4 py-3.5 px-4 bg-pyngl-pink text-white font-bold rounded-full shadow-lg disabled:bg-pink-300">{loading ? 'Logging in...' : 'LOGIN ACCOUNT'}</button>
            </form>
        </BottomSheet>
    );
};

export default LoginSheet;