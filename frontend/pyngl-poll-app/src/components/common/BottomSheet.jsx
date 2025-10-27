// import React from 'react';

// const BottomSheet = ({ children }) => (
//     <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center">
//         <div className="w-full max-w-sm bg-white rounded-t-3xl shadow-2xl animate-slide-up max-h-[90vh] flex flex-col">
//             <div className="flex-shrink-0 py-4 flex justify-center"><div className="w-12 h-1.5 bg-gray-300 rounded-full" /></div>
//             <div className="overflow-y-auto px-8 pb-8">{children}</div>
//         </div>
//     </div>
// );

// export default BottomSheet;
// import React from 'react';

// const BottomSheet = ({ children, closeSheet }) => {
//     return (
//         // 1. Kept the full-screen, semi-transparent overlay
//         <div 
//             className="fixed inset-0 z-50 flex flex-col justify-end bg-black bg-opacity-40 animate-fade-in"
//             onClick={closeSheet} 
//         >
//             {/* This is the sheet content that slides up */}
//             <div
//                 className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 rounded-t-2xl shadow-2xl max-h-[90vh] flex flex-col animate-slide-up"
//                 onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside
//             >
//                 {/* 2. Added the grabber handle from your friend's version */}
//                 <div className="flex-shrink-0 py-4 flex justify-center">
//                     <div className="w-12 h-1.5 bg-gray-300 dark:bg-gray-600 rounded-full" />
//                 </div>
                
//                 {/* 3. The component now handles its own internal padding */}
//                 <div className="overflow-y-auto px-6 pb-6">
//                     {children}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default BottomSheet;
import React from 'react';

const BottomSheet = ({ children, closeSheet }) => {
    return (
        // This is the semi-transparent background overlay.
        // The onClick handler here is the key to the solution.
        <div 
            className="fixed inset-0 z-50 flex flex-col justify-end bg-black bg-opacity-40 animate-fade-in"
            onClick={closeSheet} 
        >
            {/* This is the sheet content that slides up. */}
            <div
                // This onClick stops the click from "bubbling up" to the background,
                // which would otherwise close the sheet when you click inside it.
                onClick={(e) => e.stopPropagation()} 
                className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 rounded-t-2xl shadow-2xl max-h-[90vh] flex flex-col animate-slide-up"
            >
                {/* A handle for visual polish */}
                <div className="flex-shrink-0 py-4 flex justify-center">
                    <div className="w-12 h-1.5 bg-gray-300 dark:bg-gray-600 rounded-full" />
                </div>
                
                <div className="overflow-y-auto px-6 pb-8">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default BottomSheet;