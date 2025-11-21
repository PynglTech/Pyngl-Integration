// import React from 'react';
// import { AlertCircle } from 'lucide-react';

// export const FormInput = ({ Icon, type, label, id, register, error }) => (
//     <div className="relative">
//         <div className="flex justify-between items-center mb-1">
//             <label htmlFor={id} className="text-sm font-semibold text-gray-600">{label}</label>
//             <span className="text-xs text-gray-400">(Required)</span>
//         </div>
//         <div className="relative">
//             <div className="absolute inset-y-0 left-0 flex items-center pl-1 pointer-events-none"><Icon className="text-gray-400" size={20} /></div>
//             <input {...register(id)} type={type} id={id} className={`w-full pl-8 py-2 bg-transparent border-0 border-b-2 ${error ? 'border-red-500' : 'border-gray-300'} focus:ring-0 focus:border-pyngl-pink`} />
//         </div>
//         {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
//     </div>
// );
// export const FormError = ({ message }) => (
//     <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative" role="alert">
//         <div className="flex items-center">
//             <AlertCircle className="h-5 w-5 mr-2" />
//             <span className="block sm:inline">{message}</span>
//         </div>
//     </div>
// );
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