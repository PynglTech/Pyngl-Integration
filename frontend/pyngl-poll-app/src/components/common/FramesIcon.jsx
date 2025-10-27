import React from 'react';

const FramesIcon = ({ className }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2"
        className={className}
    >
        {/* 👇 Make sure your <path>, <circle>, etc. elements from frames.svg are pasted here! 👇 */}
        
        {/* For example, it might look like this: */}
        <path d="M10 20l-2 2-2-2m4-16l2-2 2 2" />
        <path d="M14 4l2 2 2-2m-16 8l-2 2 2 2" />
        <path d="M4 14l-2-2 2-2" />

    </svg>
);

export default FramesIcon;