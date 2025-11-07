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
import {
  Bell,
  User,
  Linkedin,
  Instagram,
  Facebook,
  CheckCircle2,
  PlayCircle,
  Star,
  CheckCheck,
} from "lucide-react";
import useNotificationStore from "../store/useNotificationStore";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import DesktopNav from "../components/layout/DesktopNav";

// ============================
// WELCOME ANIMATION
// ============================
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
    visible: (i) => ({
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
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,0,150,0.1),_transparent_60%)]"></div>

      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full bg-gradient-to-tr from-pink-500/20 to-purple-600/10 blur-3xl"
        initial={{ scale: 0, opacity: 0.5 }}
        animate={{
          scale: [0, 1.4, 1],
          opacity: [0.5, 0.2, 0.1],
        }}
        transition={{ duration: 3, ease: "easeOut" }}
      />

      <motion.div
        className="flex text-7xl md:text-9xl font-extrabold tracking-widest text-white"
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

      <motion.p
        className="mt-6 text-xl text-gray-300 font-light tracking-wider"
        variants={tagline}
      >
        Poll smarter. Engage smarter.
      </motion.p>
    </motion.div> 
  );
};

// ============================
// MAIN DESKTOP HOME PAGE
// ============================
const DesktopHomePage = () => {
  const notificationsPanelRef = useRef(null);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const { notifications } = useNotificationStore();
  const unreadCount = notifications.filter((n) => !n.read).length;
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    const hasSeenAnimation = sessionStorage.getItem("hasSeenWelcomeAnimation");
    if (!hasSeenAnimation) {
      setShowWelcome(true);
      sessionStorage.setItem("hasSeenWelcomeAnimation", "true");
    }
  }, []);

  const handleAnimationEnd = () => setShowWelcome(false);

  const NotificationsPanel = ({ onClose }) => {
    const { notifications, unreadCount, markAllAsRead } =
      useNotificationStore();
    return (
      <div className="absolute top-14 right-0 w-80 md:w-96 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden animate-fade-in-down">
        <div className="p-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
          <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100">
            Notifications
          </h3>
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="text-sm text-pink-500 font-semibold hover:text-pink-400 flex items-center gap-1"
            >
              <CheckCheck size={16} /> Mark all as read
            </button>
          )}
        </div>
        <div className="max-h-96 overflow-y-auto">
          {notifications.length > 0 ? (
            notifications.map((notif) => (
              <div
                key={notif._id}
                className={`p-4 border-b border-gray-100 dark:border-gray-700 flex items-start gap-3 ${
                  !notif.isRead ? "bg-pink-50 dark:bg-pink-900/20" : ""
                }`}
              >
                <div
                  className="w-2 h-2 rounded-full bg-pink-500 mt-2 flex-shrink-0"
                  style={{ opacity: !notif.isRead ? 1 : 0 }}
                ></div>
                <div>
                  <p className="text-gray-800 dark:text-gray-100">
                    {notif.message}
                  </p>
                  <span className="text-xs text-gray-400">
                    {new Date(notif.createdAt).toLocaleString()}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="p-8 text-center text-gray-500 dark:text-gray-400">
              You have no notifications.
            </p>
          )}
        </div>
      </div>
    );
  };

  const PricingCard = ({
    tag,
    planName,
    price,
    features,
    popular = false,
  }) => (
    <div
      className={`border ${
        popular
          ? "border-pink-400 shadow-pink-200/50 transform scale-105"
          : "border-gray-200 dark:border-gray-700"
      } rounded-2xl p-8 flex flex-col shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 bg-white dark:bg-gray-800`}
    >
      <div
        className={`text-xs font-bold py-1 px-3 rounded-full self-start ${
          popular
            ? "bg-cyan-100 text-cyan-600 dark:bg-cyan-900 dark:text-cyan-200"
            : "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-200"
        }`}
      >
        {tag}
      </div>
      <h3 className="text-2xl font-bold mt-4 text-gray-900 dark:text-white">
        {planName}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 my-4 text-4xl font-extrabold">
        {price}
      </p>
      <ul className="space-y-3 text-left mb-8 text-gray-600 dark:text-gray-300">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start">
            <CheckCircle2
              size={18}
              className="text-green-500 mr-3 mt-1 flex-shrink-0"
            />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <button
        className={`w-full py-3 mt-auto rounded-lg font-bold transition-transform duration-300 ${
          popular
            ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:scale-105"
            : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-600"
        }`}
      >
        {popular ? "Upgrade to Plus" : "Current plan"}
      </button>
    </div>
  );

  const FeatureSection = ({ imageUrl, title, description, reverse = false }) => (
    <div
      className={`flex items-center gap-12 flex-col lg:flex-row ${
        reverse ? "lg:flex-row-reverse" : ""
      }`}
    >
      <div className="lg:w-1/2">
        <img
          src={imageUrl}
          alt={title}
          className="w-full rounded-2xl shadow-xl transition-transform duration-500 hover:scale-105"
        />
      </div>
      <div className="lg:w-1/2">
        <h2 className="text-3xl font-bold mb-4 leading-tight text-gray-900 dark:text-white">
          {title}
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          {description}
        </p>
      </div>
    </div>
  );

  const TestimonialCard = ({ avatar, name, title, quote }) => (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700">
      <div className="flex items-center mb-4">
        <img src={avatar} alt={name} className="w-16 h-16 rounded-full mr-4" />
        <div>
          <h4 className="font-bold text-lg text-gray-900 dark:text-white">
            {name}
          </h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
        </div>
      </div>
      <div className="flex mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="text-yellow-400" fill="currentColor" />
        ))}
      </div>
      <p className="text-gray-600 dark:text-gray-300 italic">"{quote}"</p>
    </div>
  );

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 
                 w-full overflow-x-hidden antialiased 
                 transition-colors duration-300 
                 pt-[72px]">
      <AnimatePresence>
        {showWelcome && <WelcomeAnimation onAnimationEnd={handleAnimationEnd} />}
      </AnimatePresence>

      {/* HEADER */}
      {/* <header className="sticky top-0 z-50 flex justify-between items-center px-6 lg:px-24 py-3 border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-[#0A0118]/80 backdrop-blur-md">
        <Link to="/">
          <img src="/pynglLogoImage.png" alt="Pyngl Logo" className="h-8" />
        </Link>
        <nav className="hidden lg:flex items-center gap-8">
          <Link to="/" className="font-semibold text-pink-500">
            Home
          </Link>
          <Link
            to="/trending"
            className="font-semibold text-gray-600 dark:text-gray-300 hover:text-pink-500 transition-colors"
          >
            Trending
          </Link>
          <Link
            to="/analytics"
            className="font-semibold text-gray-600 dark:text-gray-300 hover:text-pink-500 transition-colors"
          >
            Analytics
          </Link>
          <Link
            to="/polls"
            className="font-semibold text-gray-600 dark:text-gray-300 hover:text-pink-500 transition-colors"
          >
            Polls Activity
          </Link>
        </nav>
        <div className="hidden lg:flex items-center gap-4">
          <Link
            to="/login"
            className="font-bold text-gray-800 dark:text-gray-100 hover:text-pink-500 transition-colors"
          >
            Log In
          </Link>
          <Link
            to="/signup"
            className="bg-gray-800 dark:bg-pink-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-gray-700 dark:hover:bg-pink-500 transition-all duration-300 hover:scale-105"
          >
            Sign Up
          </Link>
          <div ref={notificationsPanelRef} className="relative">
            <button
              onClick={() => setIsNotificationsOpen((p) => !p)}
              title="Notifications"
              className="relative p-1"
            >
              <Bell className="w-6 h-6 text-gray-700 dark:text-gray-200" />
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
                </span>
              )}
            </button>
            {isNotificationsOpen && (
              <NotificationsPanel onClose={() => setIsNotificationsOpen(false)} />
            )}
          </div>
          <Link
            to="/profile"
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <User size={20} className="text-gray-600 dark:text-gray-300" />
          </Link>
        </div>
      </header> */}
      <DesktopNav />

      {/* HERO */}
      <section className="relative flex justify-between items-center px-6 lg:px-24 py-20 lg:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,77,166,0.1),_transparent_40%)]"></div>
        <div className="lg:w-1/2 z-10">
          <h1 className="text-5xl lg:text-6xl font-extrabold mb-4 leading-tight">
            Poll smarter <br /> Engage smarter
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Transform text or images into interactive polls your audience loves.
          </p>
          <div className="flex gap-4">
            <Link
              to="/create-text-poll"
              className="bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold px-7 py-3 rounded-full hover:scale-105 shadow-lg transition-all"
            >
              Text to poll
            </Link>
            <Link
              to="/create-image-poll"
              className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-100 px-7 py-3 rounded-full font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 hover:scale-105 transition-all"
            >
              Image to poll
            </Link>
          </div>
        </div>
        <div className="hidden lg:flex w-1/2 justify-center z-10">
          <img src="/homePageImage1.png" alt="Hero" className="max-w-xl" />
        </div>
      </section>

      {/* FEATURES */}
      <section className="px-6 lg:px-24 py-20 space-y-24 bg-slate-50 dark:bg-[#12092A]">
        <FeatureSection
          imageUrl="/homePageImage2.png"
          title="Engage your audience in seconds"
          description="With Pyngl polls, you can capture attention instantly — in stories, chats, or live streams."
        />
        <FeatureSection
          imageUrl="/homePageImage3.png"
          title="See results live, track insights"
          description="Real-time analytics with Pyngl help you measure engagement — so you know what works."
          reverse
        />
        <FeatureSection
          imageUrl="/homePageImage4.png"
          title="Embed anywhere, share everywhere"
          description="Share polls across WhatsApp, iMessage, RCS, or embed directly into your product."
        />
      </section>

      {/* DEMO */}
      <section className="text-center py-20 px-6 lg:px-24">
        <h2 className="text-4xl font-bold mb-8">Watch the Demo</h2>
        <div className="max-w-4xl mx-auto rounded-2xl shadow-2xl overflow-hidden group">
          <div className="relative">
            <img
              src="https://placehold.co/1200x675/1a0c3f/ffffff?text=Pyngl+Demo"
              alt="Pyngl Demo"
              className="w-full"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <PlayCircle
                size={80}
                className="text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all"
              />
            </div>
          </div>
        </div>
      </section>

           {/* TESTIMONIALS */}
      {/* <section className="px-6 lg:px-24 py-20 bg-slate-50 dark:bg-[#12092A]">
        <h2 className="text-4xl font-bold text-center mb-16">Loved by Creators and Brands</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          <TestimonialCard
            avatar="/user1.png"
            name="Aarav Sharma"
            title="Social Media Manager, Zynlo"
            quote="Pyngl helped us create instant engagement with polls that looked beautiful and loaded instantly. Our audience loved it!"
          />
          <TestimonialCard
            avatar="/user2.png"
            name="Sarah Williams"
            title="Content Creator"
            quote="This tool is a game changer — I’ve doubled my engagement rate since using Pyngl polls on Instagram and WhatsApp stories."
          />
          <TestimonialCard
            avatar="/user3.png"
            name="Rohit Patel"
            title="Startup Founder"
            quote="Creating audience polls has never been this smooth. Pyngl’s analytics dashboard gives us powerful insights instantly."
          />
        </div>
      </section> */}

      {/* PRICING */}
      <section className="px-6 lg:px-24 py-24">
        <h2 className="text-4xl font-bold text-center mb-16">Choose Your Plan</h2>
        <div className="grid lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
          <PricingCard
            tag="Free"
            planName="Starter"
            price="$0/month"
            features={[
              "Create unlimited text polls",
              "Share polls via link or QR code",
              "Access to basic analytics",
            ]}
          />
          <PricingCard
            tag="Recommended"
            planName="Plus"
            price="$9.99/month"
            popular
            features={[
              "Everything in Starter",
              "Image-to-poll AI generator",
              "Priority support",
              "Advanced analytics dashboard",
            ]}
          />
          <PricingCard
            tag="Pro"
            planName="Business"
            price="$29.99/month"
            features={[
              "Unlimited polls with AI",
              "API & Embedding tools",
              "Team collaboration access",
              "Enterprise-level analytics",
            ]}
          />
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="relative text-center py-24 px-6 lg:px-24 bg-gradient-to-br from-pink-600 via-purple-600 to-blue-700 text-white overflow-hidden rounded-t-3xl shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_rgba(255,255,255,0.15),_transparent_60%)]"></div>
        <h2 className="text-5xl font-extrabold mb-6">Ready to create your first poll?</h2>
        <p className="text-lg mb-10 text-gray-200">
          Start engaging your audience in seconds with Pyngl’s simple AI-powered tools.
        </p>
        <Link
          to="/create-text-poll"
          className="bg-white text-pink-600 font-bold px-8 py-4 rounded-full shadow-xl hover:scale-105 hover:bg-gray-100 transition-all"
        >
          Get Started for Free
        </Link>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#090016] text-gray-400 py-14 px-6 lg:px-24 border-t border-gray-800">
        <div className="grid md:grid-cols-4 gap-10 max-w-7xl mx-auto">
          <div>
            <img src="/assets/pynglLogoImage.png" alt="Pyngl" className="h-8 mb-4" />
            <p className="text-sm">
              Pyngl helps you create interactive, beautiful polls powered by AI — in seconds.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white mb-3">Product</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/create-text-poll" className="hover:text-pink-400 transition">
                  Create Text Poll
                </Link>
              </li>
              <li>
                <Link to="/create-image-poll" className="hover:text-pink-400 transition">
                  Create Image Poll
                </Link>
              </li>
              <li>
                <Link to="/analytics" className="hover:text-pink-400 transition">
                  Analytics Dashboard
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-3">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="hover:text-pink-400 transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-pink-400 transition">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-pink-400 transition">
                  Terms & Privacy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-3">Connect</h4>
            <div className="flex space-x-4 mt-4">
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-400"
              >
                <Linkedin size={22} />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-400"
              >
                <Instagram size={22} />
              </a>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-400"
              >
                <Facebook size={22} />
              </a>
            </div>
          </div>
        </div>

        <div className="text-center text-sm text-gray-500 mt-10 border-t border-gray-800 pt-6">
          © {new Date().getFullYear()} Pyngl. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default DesktopHomePage;



