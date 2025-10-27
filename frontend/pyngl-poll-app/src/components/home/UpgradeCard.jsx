import React from 'react';

const UpgradeCard = () => (
    <div className="flex h-44 rounded-2xl overflow-hidden shadow-lg bg-gray-900">
        <div className="relative flex-grow">
            <img src="/HomePageImgOne.png" alt="Upgrade to Pro" className="absolute h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent"></div>
            <div className="relative p-4 text-white">
                <h3 className="text-xl font-bold flex items-center gap-2">✨ Upgrade to pro!</h3>
                <p className="text-sm mt-1 max-w-xs">Enjoy all benefits without any restrictions.</p>
            </div>
        </div>
        <button className="flex-shrink-0 bg-gradient-to-b from-cyan-400 via-purple-500 to-pink-500 text-white font-bold p-2 [writing-mode:vertical-rl] [text-orientation:mixed] hover:opacity-90 transition-opacity">
            Upgrade Now
        </button>
    </div>
);
export default UpgradeCard;