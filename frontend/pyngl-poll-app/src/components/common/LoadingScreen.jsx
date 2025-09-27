import React from 'react';

const LoadingScreen = ({ text }) => (
    <div className="font-sans bg-white sm:bg-gray-200 flex items-center justify-center min-h-screen">
        <div className="w-full h-screen sm:max-w-sm sm:h-[750px] sm:rounded-2xl sm:shadow-lg flex flex-col items-center justify-center gap-6 mx-auto bg-white">
            <div className="relative w-24 h-24">
                <div className="absolute inset-0 rounded-full" style={{
                    backgroundImage: 'conic-gradient(from 0deg, #20D9E8 6%, #4C9CFA 35%, #E741D2 60%, #7B4CFF 100%)',
                    animation: 'spin 1.5s linear infinite'
                }} />
                <div className="absolute inset-1.5 bg-white rounded-full flex items-center justify-center gap-1">
                    <div className="bar bar-1"></div>
                    <div className="bar bar-2"></div>
                    <div className="bar bar-3"></div>
                </div>
            </div>
            <p className="text-gray-500 text-lg animate-pulse">{text}</p>
        </div>
    </div>
);

export default LoadingScreen;