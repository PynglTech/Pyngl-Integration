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

export const FormError = ({ title, message }) => {
    if (!message) return null; // Don't render anything if there's no message

    return (
        <div 
            className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md shadow-sm animate-fade-in" 
            role="alert"
        >
            <div className="flex">
                <div className="py-1">
                    <AlertCircle className="h-6 w-6 text-red-500 mr-4" />
                </div>
                <div>
                    {title && (
                        <h3 className="font-bold text-red-800">{title}</h3>
                    )}
                    <p className="text-sm text-red-700">
                        {message}
                    </p>
                </div>
            </div>
        </div>
    );
};