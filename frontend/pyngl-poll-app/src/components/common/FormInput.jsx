import React from 'react';
import { AlertCircle } from 'lucide-react';

export const FormInput = ({ Icon, type, label, id, register, error }) => (
    <div className="relative">
        <div className="flex justify-between items-center mb-1">
            <label htmlFor={id} className="text-sm font-semibold text-gray-600">{label}</label>
            <span className="text-xs text-gray-400">(Required)</span>
        </div>
        <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-1 pointer-events-none"><Icon className="text-gray-400" size={20} /></div>
            <input {...register(id)} type={type} id={id} className={`w-full pl-8 py-2 bg-transparent border-0 border-b-2 ${error ? 'border-red-500' : 'border-gray-300'} focus:ring-0 focus:border-pyngl-pink`} />
        </div>
        {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
    </div>
);
export const FormError = ({ message }) => (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative" role="alert">
        <div className="flex items-center">
            <AlertCircle className="h-5 w-5 mr-2" />
            <span className="block sm:inline">{message}</span>
        </div>
    </div>
);