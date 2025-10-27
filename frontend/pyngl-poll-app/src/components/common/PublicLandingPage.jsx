import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, User, Linkedin, Instagram, Facebook, CheckCircle2, Menu, X } from 'lucide-react';

const PublicLandingPage = () => {
    // State for the mobile menu is now correctly inside the component
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Reusable components for cleaner code
    const FeatureSection = ({ imageUrl, title, description, reverse = false }) => ( <div className={`flex flex-col lg:flex-row items-center gap-12 py-16 ${reverse ? "lg:flex-row-reverse" : ""}`}><div className="flex-1"><img src={imageUrl} alt={title} className="rounded-lg w-full max-w-lg mx-auto" /></div><div className="flex-1 text-center lg:text-left"><h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-800 dark:text-white">{title}</h2><p className="text-lg text-gray-600 dark:text-gray-300">{description}</p></div></div> );
    const TestimonialCard = ({ avatar, name, title, quote }) => ( <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg"><div className="flex items-center mb-4"><img src={avatar} alt={name} className="w-14 h-14 rounded-full mr-4" /><div><h4 className="font-bold text-gray-900 dark:text-white">{name}</h4><p className="text-sm text-gray-500">{title}</p></div></div><p className="text-gray-600 dark:text-gray-300">"{quote}"</p></div> );
    const PricingCard = ({ plan, price, description, popular = false }) => ( <div className={`border ${popular ? 'border-pink-500 shadow-lg' : 'border-gray-200 dark:border-gray-700'} rounded-lg p-8 text-center flex flex-col`}><h3 className="text-xl font-bold mb-2">{plan}</h3><p className="text-gray-500 mb-4">{description}</p><p className="text-5xl font-extrabold my-4">${price}<span className="text-base font-medium text-gray-500">/mo</span></p><button className={`w-full py-3 mt-auto rounded-lg font-bold ${popular ? 'bg-pink-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white'}`}>Choose Plan</button></div> );

    return (
        <div className="bg-white dark:bg-gray-900">
            <div className="container mx-auto px-6 lg:px-8">
                {/* --- Responsive Header with Mobile Menu --- */}
                <header className="flex justify-between items-center py-6">
                    <Link to="/"><img src="/pynglLogoImage.png" alt="Pyngl Logo" className="h-8" /></Link>
                    
                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-8"><Link to="/" className="font-semibold text-pink-500">Home</Link><Link to="/trending" className="font-semibold text-gray-600 hover:text-pink-500">Trending</Link><Link to="/analytics" className="font-semibold text-gray-600 hover:text-pink-500">Analytics</Link><Link to="/polls" className="font-semibold text-gray-600 hover:text-pink-500">Polls activity</Link></nav>
                    
                    {/* Desktop Auth Buttons & Icons */}
                    <div className="hidden lg:flex items-center gap-4"><Link to="/login" className="font-bold text-gray-800 hover:text-pink-500">Log In</Link><Link to="/signup" className="bg-gray-800 text-white font-bold py-2 px-5 rounded-lg hover:bg-gray-700">Sign Up</Link><button className="relative ml-2 p-2 rounded-full hover:bg-gray-100"><Bell size={20} className="text-gray-600"/><span className="absolute top-1 right-1 flex h-2 w-2"><span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500"></span></span></button><Link to="/profile" className="p-1 rounded-full hover:bg-gray-100"><User size={20} className="text-gray-600"/></Link></div>

                    {/* Mobile Menu Button */}
                    <div className="lg:hidden">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </header>

                {/* Mobile Menu Dropdown */}
                {isMenuOpen && (
                    <div className="lg:hidden flex flex-col items-center gap-6 py-8 border-b border-gray-200">
                        <Link to="/" className="font-semibold text-pink-500">Home</Link><Link to="/trending" className="font-semibold text-gray-600">Trending</Link><Link to="/analytics" className="font-semibold text-gray-600">Analytics</Link><Link to="/polls" className="font-semibold text-gray-600">Polls activity</Link>
                        <div className="flex flex-col gap-4 w-full mt-4"><Link to="/login" className="text-center font-bold text-gray-800 border border-gray-300 py-2 rounded-lg">Log In</Link><Link to="/signup" className="text-center bg-gray-800 text-white font-bold py-2 rounded-lg">Sign Up</Link></div>
                    </div>
                )}

                <main>
                    <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-16"><div className="text-center lg:text-left"><h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 text-gray-900 dark:text-white">Poll smarter <br /> Engage smarter</h1><p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-lg mx-auto lg:mx-0">Transform text or images into interactive polls your audience loves.</p><div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4"><Link to="/signup" className="bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-3 px-8 rounded-full text-center">Text to poll</Link><Link to="/signup" className="bg-gray-200 text-gray-800 font-bold py-3 px-8 rounded-full text-center">Image to poll</Link></div></div><div><img src="/homePageImage1.png" alt="Illustration of people interacting with polls" className="w-full" /></div></section>
                    <FeatureSection imageUrl="/homePageImage2.png" title="Engage your audience in seconds" description="With Pyngl polls, you can capture attention instantly — in stories, chats, or live streams. No friction, just real-time feedback." />
                    <FeatureSection imageUrl="/homePageImage3.png" title="See results live, track insights" description="Real-time analytics with Pyngl help you measure votes, engagement, and conversions — so you know what works best." reverse={true} />
                    <FeatureSection imageUrl="/homePageImage4.png" title="Embed anywhere, share everywhere" description="Share polls across WhatsApp, iMessage, RCS, or embed directly into your product. Your audience votes where they are." />
                    <section className="py-20"><h2 className="text-4xl font-bold text-center mb-12">Testimonials</h2><div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"><TestimonialCard avatar="/avatar-1.png" name="Dazelle Heater" title="Front End Developer" quote="I've used other kits, but this one is the best. The attention to detail and usability are truly amazing for all designers." /><TestimonialCard avatar="/avatar-2.png" name="Crystal M" title="UX/UI Designer" quote="This UI Kit is incredible. The illustrations are clean, modern, and easy for beginners and pros alike to use." /></div></section>
                    <section className="py-20"><h2 className="text-4xl font-bold text-center mb-4">Choose your plan 🚀</h2><p className="text-center text-gray-500 mb-12">Upgrade to unlock more reach & insight</p><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"><PricingCard plan="Free" price="$0" description="Best for new users" /><PricingCard plan="Plus" price="$2.99/mo" description="Most popular" popular={true} /><PricingCard plan="Creator Pro" price="$9.99/mo" description="Best for high volume creators" /></div></section>
                </main>

        <footer className="text-center py-8 mt-16 border-t border-gray-200 dark:border-gray-700"><p className="text-gray-500">&copy; 2025 Pyngl. All rights reserved.</p></footer>
      </div>
    </div>
  );
};


export default PublicLandingPage;