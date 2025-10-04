import React from 'react';

const BottomSheet = ({ children }) => (
  <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center">
    <div
      className="w-full max-w-sm 
      bg-white dark:bg-gray-900 
      rounded-t-3xl shadow-2xl animate-slide-up 
      max-h-[90vh] flex flex-col"
    >
      <div className="flex-shrink-0 py-4 flex justify-center">
        <div className="w-12 h-1.5 bg-gray-300 dark:bg-gray-600 rounded-full" />
      </div>
      <div className="overflow-y-auto px-8 pb-8 text-gray-900 dark:text-gray-100">
        {children}
      </div>
    </div>
  </div>
);

export default BottomSheet;
