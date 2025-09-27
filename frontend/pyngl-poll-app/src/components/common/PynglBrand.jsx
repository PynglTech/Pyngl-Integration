import React from 'react';

const PynglBrand = ({ title, description }) => (
    <div className="flex flex-col items-center text-center space-y-4">
        <div className="w-[227px] h-[227px] flex items-center justify-center">
            <img src="/finalImage.png" alt="Pyngl Logo" className="w-[227px] h-[227px]" />
        </div>
        <div className="w-[283px]"><h2 className="text-xl font-semibold">{title}</h2>{description && <p className="text-gray-500 mt-2 text-sm">{description}</p>}</div>
    </div>
);

export default PynglBrand;  