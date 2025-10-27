// // import React from "react";

// // // The import statements for images have been removed.

// // const DesktopHomePage = () => {
// //   return (
// //     <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 w-full overflow-x-hidden">
// //       {/* HERO SECTION */}
// //       <section className="flex justify-between items-center px-24 py-20">
// //         <div className="w-1/2">
// //           <h1 className="text-5xl font-bold mb-4 leading-tight">
// //             Poll smarter <br /> Engage smarter
// //           </h1>
// //           <p className="text-lg text-gray-600 mb-6">
// //             Transform text or images into interactive polls your audience loves.
// //           </p>
// //           <div className="flex gap-4">
// //             <button className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-6 py-3 rounded-full">
// //               Text to poll
// //             </button>
// //             <button className="border border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 px-6 py-3 rounded-full">
// //               Image to poll
// //             </button>
// //           </div>
// //         </div>
// //         <div className="w-1/2 flex justify-end">
// //           {/* Changed from {homePageImage1} to "/homePageImage1.png" */}
// //           <img src="/homePageImage1.png" alt="Hero" className="max-w-lg" />
// //         </div>
// //       </section>

// //       {/* FEATURES SECTION */}
// //       <section className="px-24 py-12 space-y-16">
// //         <div className="flex items-center gap-12">
// //           <img src="/homePageImage2.png" alt="Engage" className="w-1/3 rounded-xl" />
// //           <div className="w-2/3">
// //             <h2 className="text-2xl font-semibold mb-3">
// //               Engage your audience in seconds
// //             </h2>
// //             <p className="text-gray-600">
// //               With Pyngl polls, you can capture attention instantly — in stories,
// //               chats, or live streams. No friction, just real-time feedback.
// //             </p>
// //           </div>
// //         </div>

// //         <div className="flex items-center gap-12 flex-row-reverse">
// //           <img src="/homePageImage3.png" alt="Track insights" className="w-1/3 rounded-xl" />
// //           <div className="w-2/3">
// //             <h2 className="text-2xl font-semibold mb-3">
// //               See results live, track insights
// //             </h2>
// //             <p className="text-gray-600">
// //               Real-time analytics with Pyngl help you measure votes, engagement,
// //               and conversions — so you know what works best.
// //             </p>
// //           </div>
// //         </div>

// //         <div className="flex items-center gap-12">
// //           <img src="/homePageImage4.png" alt="Embed everywhere" className="w-1/3 rounded-xl" />
// //           <div className="w-2/3">
// //             <h2 className="text-2xl font-semibold mb-3">
// //               Embed anywhere, share everywhere
// //             </h2>
// //             <p className="text-gray-600">
// //               Share polls across WhatsApp, iMessage, RCS, or embed directly into your
// //               product. Your audience votes where they are.
// //             </p>
// //           </div>
// //         </div>
// //       </section>

// //       {/* PARTNERS, DEMO, TESTIMONIALS, PLANS can be added next */}
// //     </div>
// //   );
// // };

// // export default DesktopHomePage;
// import React from "react";
// import { Link } from "react-router-dom";
// import { Bell, User, Linkedin, Instagram, Facebook, CheckCircle2 } from "lucide-react";

// // Image paths are now direct strings from the /public folder
// const homePageImage1 = "/homePageImage1.png";
// const homePageImage2 = "/homePageImage2.png";
// const homePageImage3 = "/homePageImage3.png";
// const homePageImage4 = "/homePageImage4.png";

// const DesktopHomePage = () => {
//     // A reusable component for Pricing Cards to keep the code clean
//     const PricingCard = ({ tag, planName, price, features, popular = false }) => (
//         <div className={`border ${popular ? 'border-pink-400 shadow-pink-200/50' : 'border-gray-200'} rounded-2xl p-8 flex flex-col shadow-lg`}>
//             <div className={`text-xs font-bold py-1 px-3 rounded-full self-start ${popular ? 'bg-cyan-100 text-cyan-600' : 'bg-green-100 text-green-600'}`}>{tag}</div>
//             <h3 className="text-2xl font-bold mt-4">{planName}</h3>
//             <p className="text-gray-500 my-4 text-4xl font-extrabold">{price}</p>
//             <ul className="space-y-3 text-left mb-8">
//                 {features.map((feature, index) => (
//                     <li key={index} className="flex items-start">
//                         <CheckCircle2 size={18} className="text-green-500 mr-3 mt-1 flex-shrink-0" />
//                         <span>{feature}</span>
//                     </li>
//                 ))}
//             </ul>
//             <button className={`w-full py-3 mt-auto rounded-lg font-bold ${popular ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white' : 'bg-gray-100 text-gray-800'}`}>
//                 {popular ? 'Upgrade to Plus' : 'Current plan'}
//             </button>
//         </div>
//     );

//     return (
//         <div className="bg-white text-gray-900 w-full overflow-x-hidden">

//             {/* --- NEW: HEADER SECTION --- */}
//             <header className="flex justify-between items-center px-24 py-4 border-b border-gray-200">
//                 <Link to="/"><img src="/pynglLogoImage.png" alt="Pyngl Logo" className="h-8" /></Link>
//                 <nav className="flex items-center gap-8">
//                     <Link to="/" className="font-semibold text-pink-500">Home</Link>
//                     <Link to="/trending" className="font-semibold text-gray-600 hover:text-pink-500">Trending</Link>
//                     <Link to="/analytics" className="font-semibold text-gray-600 hover:text-pink-500">Analytics</Link>
//                     <Link to="/polls" className="font-semibold text-gray-600 hover:text-pink-500">Polls activity</Link>
//                 </nav>
//                 <div className="flex items-center gap-4">
//                     <Link to="/login" className="font-bold text-gray-800 hover:text-pink-500">Log In</Link>
//                     <Link to="/signup" className="bg-gray-800 text-white font-bold py-2 px-5 rounded-lg hover:bg-gray-700">Sign Up</Link>
//                     <button className="relative ml-2 p-2 rounded-full hover:bg-gray-100"><Bell size={20} className="text-gray-600"/><span className="absolute top-1 right-1 flex h-2 w-2"><span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500"></span></span></button>
//                     <Link to="/profile" className="p-1 rounded-full hover:bg-gray-100"><User size={20} className="text-gray-600"/></Link>
//                 </div>
//             </header>

//             <main>
//                 {/* --- HERO SECTION (Existing) --- */}
//                 <section className="flex justify-between items-center px-24 py-20">
//          <div className="w-1/2">
//            <h1 className="text-5xl font-bold mb-4 leading-tight">
//              Poll smarter <br /> Engage smarter
//            </h1>
//            <p className="text-lg text-gray-600 mb-6">
//              Transform text or images into interactive polls your audience loves.
//            </p>
//            <div className="flex gap-4">
//              <button className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-6 py-3 rounded-full">
//                Text to poll
//              </button>
//              <button className="border border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 px-6 py-3 rounded-full">
//                Image to poll
//              </button>
//            </div>
//          </div>
//          <div className="w-1/2 flex justify-center">
//            {/* Changed from {homePageImage1} to "/homePageImage1.png" */}
//            <img src="/homePageImage1.png" alt="Hero" className="max-w-lg" />
//          </div>
//        </section>

//        {/* FEATURES SECTION */}
//        <section className="px-24 py-12 space-y-16">
//          <div className="flex items-center gap-10">
//            <img src="/homePageImage2.png" alt="Engage" className="w-1/3 rounded-xl" />
//            <div className="w-2/3">
//              <h2 className="text-2xl font-semibold mb-3">
//                Engage your audience in seconds
//              </h2>
//              <p className="text-gray-600">
//                With Pyngl polls, you can capture attention instantly — in stories,
//                chats, or live streams. No friction, just real-time feedback.
//              </p>
//            </div>
//          </div>

//          <div className="flex items-center gap-12 flex-row-reverse">
//            <img src="/homePageImage3.png" alt="Track insights" className="w-1/3 rounded-xl" />
//            <div className="w-2/3">
//              <h2 className="text-2xl font-semibold mb-3">
//                See results live, track insights
//              </h2>
//              <p className="text-gray-600">
//                Real-time analytics with Pyngl help you measure votes, engagement,
//                and conversions — so you know what works best.
//              </p>
//            </div>
//          </div>

//          <div className="flex items-center gap-12">
//            <img src="/homePageImage4.png" alt="Embed everywhere" className="w-1/3 rounded-xl" />
//            <div className="w-2/3">
//              <h2 className="text-2xl font-semibold mb-3">
//                Embed anywhere, share everywhere
//              </h2>
//              <p className="text-gray-600">
//                Share polls across WhatsApp, iMessage, RCS, or embed directly into your
//                product. Your audience votes where they are.
//              </p>
//            </div>
//          </div>
//        </section>

//                 {/* --- NEW: PRICING SECTION --- */}
//                 <section className="px-24 py-20 text-center bg-gray-50">
//                     <h2 className="text-4xl font-bold mb-4">Choose your plan 🚀</h2>
//                     <p className="text-gray-500 mb-12 max-w-md mx-auto">Upgrade to unlock more reach & insight</p>
//                     <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
//                         <PricingCard 
//                             tag="Best for new users" 
//                             planName="Free" 
//                             price="$0" 
//                             features={["Unlimited voting", "Create up to 5 polls/day", "Ad-supported experience", "Basic result breakdown"]} 
//                         />
//                         <PricingCard 
//                             tag="Most popular" 
//                             planName="Plus" 
//                             price="$2.99/mo" 
//                             features={["No ads in feed", "Advanced filter (geo, time, demographics)", "50% higher distribution boost", "1 custom pinned poll"]}
//                             popular={true} 
//                         />
//                         <PricingCard 
//                             tag="Breakthrough creators" 
//                             planName="Creator pro" 
//                             price="$9.99/mo" 
//                             features={["Full analytics suite (funnels, retention, demographics)", "Priority distribution", "Direct brand collab inbox", "Brand templates & watermark removal"]} 
//                         />
//                     </div>
//                     <div className="max-w-4xl mx-auto mt-12 p-6 bg-white rounded-2xl shadow-lg flex justify-between items-center">
//                         <div>
//                             <h3 className="font-bold text-lg">Enterprise plan</h3>
//                             <p className="text-gray-500">Upgrade to unlock more reach & insight</p>
//                         </div>
//                         <button className="bg-pink-500 text-white font-bold py-3 px-6 rounded-lg">Get in touch</button>
//                     </div>
//                 </section>
//             </main>

//             {/* --- NEW: FOOTER SECTION --- */}
//             <footer className="bg-[#1a0c3f] text-white px-24 py-16">
//                 <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
//                     <div className="md:col-span-2"><img src="/pynglLogoImage-white.png" alt="Pyngl Logo" className="h-10" /></div>
//                     <div>
//                         <h4 className="font-bold mb-4">Company</h4>
//                         <ul className="space-y-2 text-gray-300"><li className="hover:text-white"><Link to="/home">Home</Link></li><li className="hover:text-white"><Link to="/trending">Trending</Link></li><li className="hover:text-white"><Link to="/analytics">Analytics</Link></li><li className="hover:text-white"><Link to="/profile">Profile</Link></li></ul>
//                     </div>
//                     <div>
//                         <h4 className="font-bold mb-4">Help</h4>
//                         <ul className="space-y-2 text-gray-300"><li className="hover:text-white"><Link to="/support">Customer Support</Link></li><li className="hover:text-white"><Link to="/terms">Terms & Conditions</Link></li><li className="hover:text-white"><Link to="/privacy">Privacy Policy</Link></li></ul>
//                     </div>
//                     <div>
//                         <h4 className="font-bold mb-4">Follow us</h4>
//                         <div className="flex gap-4 mb-6"><Link to="#"><Linkedin /></Link><Link to="#"><Instagram /></Link><Link to="#"><Facebook /></Link></div>
//                         <h4 className="font-bold mb-2">CALL US</h4>
//                         <p className="text-gray-300">(+01) 456-493355</p>
//                         <h4 className="font-bold mb-2 mt-4">EMAIL US</h4>
//                         <p className="text-gray-300">Pyngl@example.com</p>
//                     </div>
//                 </div>
//                 <div className="mt-16 pt-8 border-t border-gray-700 text-center text-gray-400">
//                     &copy; Copyright 2025, All Rights Reserved
//                 </div>
//             </footer>
//         </div>
//     );
// };

// export default DesktopHomePage;
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Bell, User, Linkedin, Instagram, Facebook, CheckCircle2, PlayCircle, Star, ChevronDown, CheckCheck } from "lucide-react";
import useNotificationStore from "../store/useNotificationStore";
import { motion, AnimatePresence, useInView , useAnimation} from 'framer-motion';

const WelcomeAnimation = ({ onAnimationEnd }) => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start("visible");
    const timer = setTimeout(() => {
      controls.start("exit");
      setTimeout(onAnimationEnd, 1500);
    }, 4000);
    return () => clearTimeout(timer);
  }, [controls, onAnimationEnd]);

  // ---- Variants ----
  const container = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.12,
        delayChildren: 0.3,
      },
    },
    exit: {
      opacity: 0,
      scale: 1.2,
      transition: { duration: 1.2, ease: "easeInOut" },
    },
  };

  const letter = {
    hidden: { opacity: 0, y: 80, rotateX: -90, scale: 0.7 },
    visible: i => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        delay: i * 0.08,
        type: "spring",
        stiffness: 120,
        damping: 12,
      },
    }),
  };

  const tagline = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: 1.8, duration: 1, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center bg-[#0A0118] overflow-hidden z-[9999]"
      variants={container}
      initial="hidden"
      animate={controls}
      style={{ perspective: 1000 }}
    >
      {/* Background gradient shimmer */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,0,150,0.1),_transparent_60%)]"></div>
      <div className="absolute w-full h-full overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(255,255,255,0.07)_1px,transparent_1px)] bg-[length:3px_3px] animate-[pulse_3s_ease-in-out_infinite]" />
      </div>

      {/* Particle burst */}
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full bg-gradient-to-tr from-pink-500/20 to-purple-600/10 blur-3xl"
        initial={{ scale: 0, opacity: 0.5 }}
        animate={{
          scale: [0, 1.4, 1],
          opacity: [0.5, 0.2, 0.1],
        }}
        transition={{ duration: 3, ease: "easeOut" }}
      />

      {/* 3D Text */}
      <motion.div
        className="flex text-7xl md:text-9xl font-extrabold tracking-widest text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]"
        style={{ transformStyle: "preserve-3d" }}
      >
        {"Pyngl".split("").map((char, i) => (
          <motion.span
            key={i}
            custom={i}
            variants={letter}
            style={{
              textShadow: "0 0 25px rgba(255, 100, 200, 0.7)",
              display: "inline-block",
            }}
          >
            {char}
          </motion.span>
        ))}
      </motion.div>

      {/* Light trail behind text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 0.4, 0],
          scale: [0.8, 1.2, 1.4],
        }}
        transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 0.5 }}
        className="absolute top-[48%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-600/20 blur-3xl"
      ></motion.div>

      {/* Tagline */}
      <motion.p
        className="mt-6 text-xl text-gray-300 font-light tracking-wider"
        variants={tagline}
      >
        Poll smarter. Engage smarter.
      </motion.p>

      {/* Bottom subtle glow line */}
      <motion.div
        initial={{ width: "0%" }}
        animate={{ width: "60%" }}
        transition={{ duration: 1.5, delay: 2 }}
        className="absolute bottom-[20%] h-[1px] bg-gradient-to-r from-transparent via-pink-500/60 to-transparent"
      />
    </motion.div>
  );
};



const DesktopHomePage = () => {
    // --- Reusable Components for a Cleaner Structure ---
  const notificationsPanelRef = React.useRef(null);
  const [isNotificationsOpen, setIsNotificationsOpen] = React.useState(false);
  const { notifications } = useNotificationStore();
 const [showWelcome, setShowWelcome] = useState(false);
   useEffect(() => {
        // This effect runs only once when the component mounts
        const hasSeenAnimation = sessionStorage.getItem('hasSeenWelcomeAnimation');
        if (!hasSeenAnimation) {
            // If the user hasn't seen the animation in this session, show it.
            setShowWelcome(true);
            sessionStorage.setItem('hasSeenWelcomeAnimation', 'true');
        }
    }, []);

    const handleAnimationEnd = () => {
        setShowWelcome(false);
    };
  const unreadCount = notifications.filter(n => !n.read).length;
  const NotificationsPanel = ({ onClose }) => {
    const { notifications, unreadCount, markAllAsRead } = useNotificationStore();
    return (
        <div className="absolute top-14 right-0 w-80 md:w-96 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden animate-fade-in-down">
            <div className="p-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-lg">Notifications</h3>
                {unreadCount > 0 && (<button onClick={markAllAsRead} className="text-sm text-pink-500 font-semibold hover:text-pink-700 flex items-center gap-1"><CheckCheck size={16} /> Mark all as read</button>)}
            </div>
            <div className="max-h-96 overflow-y-auto">{notifications.length > 0 ? ( notifications.map(notif => ( <div key={notif._id} className={`p-4 border-b border-gray-100 dark:border-gray-700 flex items-start gap-3 ${!notif.isRead ? 'bg-pink-50 dark:bg-pink-900/20' : ''}`}><div className="w-2 h-2 rounded-full bg-pink-500 mt-2 flex-shrink-0" style={{ opacity: !notif.isRead ? 1 : 0 }}></div><div><p className="text-gray-800 dark:text-gray-100">{notif.message}</p><span className="text-xs text-gray-400">{new Date(notif.createdAt).toLocaleString()}</span></div></div>))) : ( <p className="p-8 text-center text-gray-500">You have no notifications.</p> )}</div>
        </div>
    );
};
    const PricingCard = ({ tag, planName, price, features, popular = false }) => (
        <div className={`border ${popular ? 'border-pink-400 shadow-pink-200/50 transform scale-105' : 'border-gray-200'} rounded-2xl p-8 flex flex-col shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2`}>
            <div className={`text-xs font-bold py-1 px-3 rounded-full self-start ${popular ? 'bg-cyan-100 text-cyan-600' : 'bg-green-100 text-green-600'}`}>{tag}</div>
            <h3 className="text-2xl font-bold mt-4">{planName}</h3>
            <p className="text-gray-500 my-4 text-4xl font-extrabold">{price}</p>
            <ul className="space-y-3 text-left mb-8 text-gray-600">
                {features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                        <CheckCircle2 size={18} className="text-green-500 mr-3 mt-1 flex-shrink-0" />
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>
            <button className={`w-full py-3 mt-auto rounded-lg font-bold transition-transform duration-300 ${popular ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:scale-105' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}>
                {popular ? 'Upgrade to Plus' : 'Current plan'}
            </button>
        </div>
    );

    const FeatureSection = ({ imageUrl, title, description, reverse = false }) => (
        <div className={`flex items-center gap-12 flex-col lg:flex-row ${reverse ? 'lg:flex-row-reverse' : ''}`}>
            <div className="lg:w-1/2">
                <img src={imageUrl} alt={title} className="w-full rounded-2xl shadow-xl transition-transform duration-500 hover:scale-105" />
            </div>
            <div className="lg:w-1/2">
                <h2 className="text-3xl font-bold mb-4 leading-tight">{title}</h2>
                <p className="text-lg text-gray-600">{description}</p>
            </div>
        </div>
    );

    const TestimonialCard = ({ avatar, name, title, quote }) => (
         <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <div className="flex items-center mb-4">
                <img src={avatar} alt={name} className="w-16 h-16 rounded-full mr-4"/>
                <div>
                    <h4 className="font-bold text-lg">{name}</h4>
                    <p className="text-sm text-gray-500">{title}</p>
                </div>
            </div>
            <div className="flex mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} className="text-yellow-400" fill="currentColor" size={20} />)}
            </div>
            <p className="text-gray-600 italic">"{quote}"</p>
         </div>
    );

    return (
        <div className="bg-white text-gray-900 w-full overflow-x-hidden antialiased">
           <AnimatePresence>
                {showWelcome && <WelcomeAnimation onAnimationEnd={handleAnimationEnd} />}
            </AnimatePresence>
            {/* --- ENHANCED HEADER --- */}
            <header className="sticky top-0 z-50 flex justify-between items-center px-6 lg:px-24 py-3 border-b border-gray-200 bg-white/80 backdrop-blur-md">
                <Link to="/"><img src="/pynglLogoImage.png" alt="Pyngl Logo" className="h-8" /></Link>
                <nav className="hidden lg:flex items-center gap-8">
                    <Link to="/" className="font-semibold text-pink-500">Home</Link>
                    <Link to="/trending" className="font-semibold text-gray-600 hover:text-pink-500 transition-colors">Trending</Link>
                    <Link to="/analytics" className="font-semibold text-gray-600 hover:text-pink-500 transition-colors">Analytics</Link>
                    <Link to="/polls" className="font-semibold text-gray-600 hover:text-pink-500 transition-colors">Polls activity</Link>
                </nav>
                <div className="hidden lg:flex items-center gap-4">
                    <Link to="/login" className="font-bold text-gray-800 hover:text-pink-500 transition-colors">Log In</Link>
                    <Link to="/signup" className="bg-gray-800 text-white font-bold py-2 px-5 rounded-lg hover:bg-gray-700 transition-all duration-300 hover:scale-105">Sign Up</Link>
                    <div ref={notificationsPanelRef} className="relative">
                                       <button onClick={() => setIsNotificationsOpen(prev => !prev)} title="Notifications" className="relative p-1">
                                           <Bell className="w-6 h-6 text-gray-700 dark:text-gray-200" />
                                           {unreadCount > 0 && (
                                               <span className="absolute top-0 right-0 flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span></span>
                                           )}
                                       </button>
                                       {isNotificationsOpen && <NotificationsPanel onClose={() => setIsNotificationsOpen(false)} />}
                                   </div>
                   
                    <Link to="/profile" className="p-1 rounded-full hover:bg-gray-100"><User size={20} className="text-gray-600"/></Link>
                </div>
            </header>

            <main>
                {/* --- ENHANCED HERO SECTION --- */}
                <section className="relative flex justify-between items-center px-6 lg:px-24 py-20 lg:py-32">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,77,166,0.1),_transparent_40%)]"></div>
                    <div className="lg:w-1/2 z-10">
                        <h1 className="text-5xl lg:text-6xl font-extrabold mb-4 leading-tight animate-fade-in-down">
                            Poll smarter <br /> Engage smarter
                        </h1>
                        <p className="text-lg text-gray-600 mb-8 animate-fade-in-up">
                            Transform text or images into interactive polls your audience loves.
                        </p>
                        <div className="flex gap-4">
                            <a href="/create-text-poll"> 
                              <button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold px-7 py-3 rounded-full transition-all duration-300 hover:scale-105 shadow-lg">
                                Text to poll
                              </button>
                            </a>
                               <a href="/create-image-poll">
                                 <button className="border border-gray-300 hover:bg-gray-100 text-gray-700 px-7 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105">
                                     Image to poll
                                   </button>
                                 </a> 
                        </div>
                    </div>
                    <div className="hidden lg:flex w-1/2 justify-center z-10">
                        <img src="/homePageImage1.png" alt="Hero" className="max-w-xl" />
                    </div>
                </section>

                {/* --- ENHANCED FEATURES SECTION --- */}
                <section className="px-6 lg:px-24 py-20 space-y-24 bg-slate-50">
                    <FeatureSection imageUrl="/homePageImage2.png" title="Engage your audience in seconds" description="With Pyngl polls, you can capture attention instantly — in stories, chats, or live streams. No friction, just real-time feedback." />
                    <FeatureSection imageUrl="/homePageImage3.png" title="See results live, track insights" description="Real-time analytics with Pyngl help you measure votes, engagement, and conversions — so you know what works best." reverse={true} />
                    <FeatureSection imageUrl="/homePageImage4.png" title="Embed anywhere, share everywhere" description="Share polls across WhatsApp, iMessage, RCS, or embed directly into your product. Your audience votes where they are." />
                </section>

                {/* --- NEW: WATCH DEMO SECTION --- */}
                 <section className="text-center py-20 px-6 lg:px-24">
                    <h2 className="text-4xl font-bold mb-8">Watch the Demo</h2>
                    <div className="max-w-4xl mx-auto rounded-2xl shadow-2xl overflow-hidden group">
                        <div className="relative">
                             <img src="https://placehold.co/1200x675/1a0c3f/ffffff?text=Pyngl+Demo" alt="Pyngl Demo Video Thumbnail" className="w-full" />
                             <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                <PlayCircle size={80} className="text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
                             </div>
                        </div>
                    </div>
                </section>

                 {/* --- NEW: TESTIMONIALS SECTION --- */}
                <section className="bg-slate-50 py-20 px-6 lg:px-24">
                    <h2 className="text-4xl font-bold text-center mb-12">Loved by Creators Worldwide</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        <TestimonialCard avatar="https://placehold.co/100x100/ffa3bf/ffffff?text=DH" name="Dazelle Heater" title="Front End Developer" quote="I've used other kits, but this one is the best. The attention to detail and usability are truly amazing for all designers and developers." />
                        <TestimonialCard avatar="https://placehold.co/100x100/b698ff/ffffff?text=CM" name="Crystal M" title="UX/UI Designer" quote="This UI Kit is incredible. The illustrations are clean, modern, and easy for beginners and pros alike to use. Saved me hours of work!" />
                    </div>
                </section>

                {/* --- ENHANCED PRICING SECTION --- */}
                <section className="px-6 lg:px-24 py-20 text-center">
                    <h2 className="text-4xl font-bold mb-4">Choose your plan 🚀</h2>
                    <p className="text-gray-500 mb-12 max-w-md mx-auto">Upgrade to unlock more reach & insight</p>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        <PricingCard tag="Best for new users" planName="Free" price="$0" features={["Unlimited voting", "Create up to 5 polls/day", "Ad-supported experience", "Basic result breakdown"]} />
                        <PricingCard tag="Most popular" planName="Plus" price="$2.99/mo" features={["No ads in feed", "Advanced filter (geo, time, demographics)", "50% higher distribution boost", "1 custom pinned poll"]} popular={true} />
                        <PricingCard tag="Breakthrough creators" planName="Creator pro" price="$9.99/mo" features={["Full analytics suite", "Priority distribution", "Direct brand collab inbox", "Brand templates"]} />
                    </div>
                    <div className="max-w-6xl mx-auto mt-16 p-8 rounded-2xl shadow-lg flex flex-col lg:flex-row justify-between items-center">
                        <div className="text-center lg:text-left mb-6 lg:mb-0">
                            <h3 className="font-bold text-2xl">Enterprise Plan</h3>
                            <p className="opacity-90">For large-scale needs and custom solutions.</p>
                        </div>
                       <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 px-8 rounded-full transition-transform duration-300 hover:scale-105">Get in touch</button>
                    </div>
                </section>
            </main>

            {/* --- ENHANCED FOOTER SECTION --- */}
            <footer className="bg-[#1a0c3f] text-white px-6 lg:px-24 py-16">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                    <div className="md:col-span-2"><img src="/logo_dark.svg" alt="Pyngl Logo" className="h-10" /></div>
                    <div><h4 className="font-bold mb-4">Company</h4><ul className="space-y-2 text-gray-300"><li className="hover:text-white transition-colors"><Link to="/dashboard">Home</Link></li><li className="hover:text-white transition-colors"><Link to="/trending">Trending</Link></li><li className="hover:text-white transition-colors"><Link to="/analytics">Analytics</Link></li><li className="hover:text-white transition-colors"><Link to="/profile">Profile</Link></li></ul></div>
                    <div><h4 className="font-bold mb-4">Help</h4><ul className="space-y-2 text-gray-300"><li className="hover:text-white transition-colors"><Link to="/help-center">Support</Link></li><li className="hover:text-white transition-colors"><Link to="/terms-of-service">Terms</Link></li><li className="hover:text-white transition-colors"><Link to="/privacy-policy">Privacy</Link></li></ul></div>
                    <div><h4 className="font-bold mb-4">Follow us</h4><div className="flex gap-4 mb-6"><Link to="#" className="hover:text-pink-400 transition-colors"><Linkedin /></Link><Link to="#" className="hover:text-pink-400 transition-colors"><Instagram /></Link><Link to="#" className="hover:text-pink-400 transition-colors"><Facebook /></Link></div></div>
                </div>
                <div className="mt-16 pt-8 border-t border-gray-700 text-center text-gray-400">&copy; Copyright 2025, All Rights Reserved</div>
            </footer>
        </div>
    );
};

export default DesktopHomePage;

