import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, User } from 'lucide-react';

const PublicHeader = () => {
    return (
        <header className="sticky top-0 z-50 flex justify-between items-center px-6 lg:px-24 py-3 border-b border-gray-200 bg-white/80 backdrop-blur-md">
            <Link to="/"><img src="/assets/pynglLogoImage.png" alt="Pyngl Logo" className="h-8" /></Link>
            
            <nav className="hidden lg:flex items-center gap-8">
                <Link to="/" className="font-semibold text-pink-500">Home</Link>
                {/* For visitors, these links should prompt a login */}
                <Link to="/login" className="font-semibold text-gray-600 hover:text-pink-500 transition-colors">Trending</Link>
                <Link to="/login" className="font-semibold text-gray-600 hover:text-pink-500 transition-colors">Analytics</Link>
                <Link to="/login" className="font-semibold text-gray-600 hover:text-pink-500 transition-colors">Polls activity</Link>
            </nav>

            <div className="hidden lg:flex items-center gap-4">
                <Link to="/login" className="font-bold text-gray-800 hover:text-pink-500 transition-colors">Log In</Link>
                <Link to="/signup" className="bg-gray-800 text-white font-bold py-2 px-5 rounded-lg hover:bg-gray-700 transition-all duration-300 hover:scale-105">Sign Up</Link>
                
                {/* These icons are decorative for visitors and link to login */}
                <Link to="/login" title="Notifications" className="relative ml-2 p-2 rounded-full hover:bg-gray-100"><Bell size={20} className="text-gray-600"/></Link>
                <Link to="/login" title="Profile" className="p-1 rounded-full hover:bg-gray-100"><User size={20} className="text-gray-600"/></Link>
            </div>
        </header>
    );
};

export default PublicHeader;
