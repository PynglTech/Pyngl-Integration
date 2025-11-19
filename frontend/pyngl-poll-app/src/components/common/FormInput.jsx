import React from 'react';
import { AlertCircle } from 'lucide-react';

export const FormInput = ({ Icon, type, label, id, register, error, ...props }) => (
  <div className="space-y-1">
    <div className="relative group">
      {Icon && (
        <Icon 
          className={`absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors duration-200 ${
            error ? "text-red-400" : "text-gray-400 group-focus-within:text-pyngl-pink dark:text-[#9aa4b2] dark:group-focus-within:text-pyngl-pink"
          }`} 
        />
      )}
      <input
        type={type}
        id={id}
        placeholder={label}
        {...register(id, { required: `${label} is required` })}
        className={`w-full pl-10 pr-4 py-3 border rounded-lg outline-none transition-all duration-200
          bg-white dark:bg-[#1B1F33] 
          text-gray-900 dark:text-[#F1F1F1] 
          placeholder-gray-400 dark:placeholder-[#7b8393]
          ${
            error 
              ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500" 
              : "border-gray-300 dark:border-[#2D3148] focus:border-pyngl-pink focus:ring-2 focus:ring-pyngl-pink/20"
          }
        `}
        {...props}
      />
    </div>
    {error && (
      <p className="text-red-500 dark:text-[#ffb3c0] text-xs pl-1 font-medium animate-in slide-in-from-top-1">
        {error.message}
      </p>
    )}
  </div>
);

export const FormError = ({ message }) => (
  <div className="flex items-center gap-x-2 p-3 mb-4 text-sm font-semibold text-red-800 bg-red-50 dark:bg-[rgba(255,77,116,0.1)] dark:text-[#ffb3c0] rounded-lg border border-red-100 dark:border-[rgba(255,77,116,0.2)] animate-in zoom-in-95">
    <AlertCircle className="h-5 w-5 shrink-0" />
    <span>{message}</span>
  </div>
);