// // // import React, { useState } from 'react';
// // // import PynglBrand from '../components/common/PynglBrand';
// // // import { ChevronLeft } from 'lucide-react';

// // // const landingSlides = [
// // //     { title: "Know What the World Feels In Real Time", description: "Post questions, share polls, and watch the pulse update live." },
// // //     { title: "Engage Your Audience Instantly", description: "Create beautiful, simple polls in seconds and get immediate feedback." },
// // //     { title: "Data That Drives Decisions", description: "Analyze results with clean, easy-to-understand visuals." }
// // // ];

// // // const LandingPage = ({ openSheet }) => {
// // //     const [currentSlide, setCurrentSlide] = useState(0);
// // //     const goToNext = () => setCurrentSlide(p => (p < landingSlides.length - 1 ? p + 1 : p));
// // //     const goToPrev = () => setCurrentSlide(p => (p > 0 ? p - 1 : p));
    
// // //     return (
// // //         <div className="p-8 flex flex-col items-center text-center justify-between flex-grow">
// // //             <div/>
// // //             <PynglBrand title={landingSlides[currentSlide].title} description={landingSlides[currentSlide].description} />
// // //             <div className="w-full">
// // //                 <div className="flex items-center justify-center space-x-2 my-8">
// // //                     {landingSlides.map((_, i) => <span key={i} className={`w-2 h-2 rounded-full ${i === currentSlide ? 'w-3 h-3 bg-pyngl-pink' : 'bg-gray-300'}`} />)}
// // //                 </div>
// // //                 <div className="flex items-center space-x-4">
// // //                    <button className="flex-1 py-3 px-4 border-2 border-pyngl-teal text-pyngl-teal font-semibold rounded-full">Demo</button>
// // //                    <button onClick={() => openSheet('login')} className="flex-1 py-3 px-4 bg-pyngl-pink text-white font-semibold rounded-full shadow-lg">LOGIN ACCOUNT</button>
// // //                 </div>
// // //                 <div className="flex justify-between text-gray-500 font-semibold mt-6">
// // //                     <button onClick={goToPrev} disabled={currentSlide === 0} className="flex items-center gap-1 disabled:opacity-50"><ChevronLeft size={20} /> Back</button>
// // //                     <button onClick={goToNext} disabled={currentSlide === landingSlides.length - 1} className="disabled:opacity-50">Next <span className="font-bold">&rarr;</span></button>
// // //                 </div>
// // //             </div>
// // //         </div>
// // //     );
// // // };

// // // export default LandingPage;
// // import React, { useState } from 'react';
// // import { useDrag } from '@use-gesture/react';
// // import { motion, AnimatePresence } from 'framer-motion';
// // import PynglBrand from '../components/common/PynglBrand';
// // import { ChevronLeft } from 'lucide-react';

// // const landingSlides = [
// //     { title: "Know What the World Feels In Real Time", description: "Post questions, share polls, and watch the pulse update live." },
// //     { title: "Engage Your Audience Instantly", description: "Create beautiful, simple polls in seconds and get immediate feedback." },
// //     { title: "Data That Drives Decisions", description: "Analyze results with clean, easy-to-understand visuals." }
// // ];

// // // Animation settings for the text
// // const slideVariants = {
// //     hidden: { opacity: 0, y: 20 },
// //     visible: { opacity: 1, y: 0 },
// //     exit: { opacity: 0, y: -20 },
// // };

// // const LandingPage = ({ openSheet }) => {
// //     const [currentSlide, setCurrentSlide] = useState(0);

// //     const goToSlide = (slideIndex) => {
// //         if (slideIndex >= 0 && slideIndex < landingSlides.length) {
// //             setCurrentSlide(slideIndex);
// //         }
// //     };

// //     // ✨ UX Upgrade 1: Swipe Gestures
// //     const bind = useDrag(({ down, movement: [mx], direction: [xDir], velocity: [vx] }) => {
// //         const trigger = vx > 0.2; // Velocity threshold
// //         if (!down && trigger) {
// //             const dir = xDir > 0 ? -1 : 1; // Figure out direction
// //             goToSlide(currentSlide + dir);
// //         }
// //     });

// //     return (
// //         <div {...bind()} className="p-8 flex flex-col items-center text-center justify-between flex-grow touch-none">
// //             <div /> {/* Spacer */}

// //             {/* ✨ UX Upgrade 2: Animated Text */}
// //             <AnimatePresence mode="wait">
// //                 <motion.div
// //                     key={currentSlide}
// //                     variants={slideVariants}
// //                     initial="hidden"
// //                     animate="visible"
// //                     exit="exit"
// //                     transition={{ duration: 0.3 }}
// //                 >
// //                     <PynglBrand title={landingSlides[currentSlide].title} description={landingSlides[currentSlide].description} />
// //                 </motion.div>
// //             </AnimatePresence>

// //             <div className="w-full">
// //                 {/* Carousel Dots */}
// //                 <div className="flex items-center justify-center space-x-2 my-8">
// //                     {landingSlides.map((_, i) => (
// //                         <div key={i} onClick={() => goToSlide(i)} className="cursor-pointer p-2">
// //                             <div className={`w-2 h-2 rounded-full transition-all duration-300 ${i === currentSlide ? 'w-4 bg-pyngl-pink' : 'bg-gray-300'}`} />
// //                         </div>
// //                     ))}
// //                 </div>

// //                 {/* Action Buttons */}
// //                 <div className="flex items-center space-x-4">
// //                     <button className="flex-1 py-3 px-4 border-2 border-pyngl-teal text-pyngl-teal font-semibold rounded-full hover:bg-pyngl-teal hover:text-white transition-colors">Demo</button>
// //                     <button onClick={() => openSheet('login')} className="flex-1 py-3 px-4 bg-pyngl-pink text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-shadow">LOGIN</button>
// //                 </div>

// //                 {/* Navigation (Next/Back) */}
// //                 <div className="flex justify-between text-gray-500 font-semibold mt-6">
// //                     <button onClick={() => goToSlide(currentSlide - 1)} disabled={currentSlide === 0} className="flex items-center gap-1 disabled:opacity-30 transition-opacity"><ChevronLeft size={20} /> Back</button>
// //                     <button onClick={() => goToSlide(currentSlide + 1)} disabled={currentSlide === landingSlides.length - 1} className="disabled:opacity-30 transition-opacity">Next <span className="font-bold">&rarr;</span></button>
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // };

// // export default LandingPage;
// // import React, { useState } from 'react';
// // import PynglBrand from '../components/common/PynglBrand';
// // import { ChevronLeft } from 'lucide-react';

// // const landingSlides = [
// //   {
// //     title: "Know What the World Feels In Real Time",
// //     description: "Post questions, share polls, and watch the pulse update live."
// //   },
// //   {
// //     title: "Engage Your Audience Instantly",
// //     description: "Create beautiful, simple polls in seconds and get immediate feedback."
// //   },
// //   {
// //     title: "Data That Drives Decisions",
// //     description: "Analyze results with clean, easy-to-understand visuals."
// //   }
// // ];

// // const LandingPage = ({ openSheet }) => {
// //   const [currentSlide, setCurrentSlide] = useState(0);
// //   const goToNext = () => setCurrentSlide(p => (p < landingSlides.length - 1 ? p + 1 : p));
// //   const goToPrev = () => setCurrentSlide(p => (p > 0 ? p - 1 : p));

// //   return (
// //     <div className="p-8 flex flex-col items-center text-center justify-between flex-grow bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
// //       <div />
// //       <PynglBrand
// //         title={landingSlides[currentSlide].title}
// //         description={landingSlides[currentSlide].description}
// //         // Optionally pass dark mode styles to PynglBrand if it supports them
// //       />
// //       <div className="w-full">
// //         <div className="flex items-center justify-center space-x-2 my-8">
// //           {landingSlides.map((_, i) => (
// //             <span
// //               key={i}
// //               className={`w-2 h-2 rounded-full transition-all ${
// //                 i === currentSlide
// //                   ? 'w-3 h-3 bg-pyngl-pink'
// //                   : 'bg-gray-300 dark:bg-gray-600'
// //               }`}
// //             />
// //           ))}
// //         </div>

// //         <div className="flex items-center space-x-4">
// //           <button className="flex-1 py-3 px-4 border-2 border-pyngl-teal text-pyngl-teal font-semibold rounded-full dark:border-pyngl-teal dark:text-pyngl-teal">
// //             Demo
// //           </button>
// //           <button
// //             onClick={() => openSheet('login')}
// //             className="flex-1 py-3 px-4 bg-pyngl-pink text-white font-semibold rounded-full shadow-lg hover:opacity-90"
// //           >
// //             LOGIN ACCOUNT
// //           </button>
// //         </div>

// //         <div className="flex justify-between text-gray-500 dark:text-gray-400 font-semibold mt-6">
// //           <button
// //             onClick={goToPrev}
// //             disabled={currentSlide === 0}
// //             className="flex items-center gap-1 disabled:opacity-50"
// //           >
// //             <ChevronLeft size={20} /> Back
// //           </button>
// //           <button
// //             onClick={goToNext}
// //             disabled={currentSlide === landingSlides.length - 1}
// //             className="disabled:opacity-50"
// //           >
// //             Next <span className="font-bold">&rarr;</span>
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default LandingPage;
// // import React, { useState } from 'react';
// // import PynglBrand from '../components/common/PynglBrand';
// // import { ChevronLeft } from 'lucide-react';

// // const landingSlides = [
// //   {
// //     title: "Know What the World Feels In Real Time",
// //     description: "Post questions, share polls, and watch the pulse update live."
// //   },
// //   {
// //     title: "Engage Your Audience Instantly",
// //     description: "Create beautiful, simple polls in seconds and get immediate feedback."
// //   },
// //   {
// //     title: "Data That Drives Decisions",
// //     description: "Analyze results with clean, easy-to-understand visuals."
// //   }
// // ];

// // const LandingPage = ({ openSheet }) => {
// //   const [currentSlide, setCurrentSlide] = useState(0);
// //   const goToNext = () => setCurrentSlide(p => (p < landingSlides.length - 1 ? p + 1 : p));
// //   const goToPrev = () => setCurrentSlide(p => (p > 0 ? p - 1 : p));

// //   return (
// //     <div className="p-8 flex flex-col items-center text-center justify-between flex-grow bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen md:w-7/6 lg:w-4/5 xl:w-3/4 2xl:w-2/3 transition-all duration-300">
// //       <div />
// //       <PynglBrand
// //         title={landingSlides[currentSlide].title}
// //         description={landingSlides[currentSlide].description}
// //         // Optionally pass dark mode styles to PynglBrand if it supports them
// //       />
// //       <div className="w-full">
// //         <div className="flex items-center justify-center space-x-2 my-8">
// //           {landingSlides.map((_, i) => (
// //             <span
// //               key={i}
// //               className={`w-2 h-2 rounded-full transition-all ${
// //                 i === currentSlide
// //                   ? 'w-3 h-3 bg-pyngl-pink'
// //                   : 'bg-gray-300 dark:bg-gray-600'
// //               }`}
// //             />
// //           ))}
// //         </div>

// //         <div className="flex items-center space-x-4">
// //           <button className="flex-1 py-3 px-4 border-2 border-pyngl-teal text-pyngl-teal font-semibold rounded-full dark:border-pyngl-teal dark:text-pyngl-teal">
// //             Demo
// //           </button>
// //           <button
// //             onClick={() => openSheet('login')}
// //             className="flex-1 py-3 px-4 bg-pyngl-pink text-white font-semibold rounded-full shadow-lg hover:opacity-90"
// //           >
// //             LOGIN ACCOUNT
// //           </button>
// //         </div>

// //         <div className="flex justify-between text-gray-500 dark:text-gray-400 font-semibold mt-6">
// //           <button
// //             onClick={goToPrev}
// //             disabled={currentSlide === 0}
// //             className="flex items-center gap-1 disabled:opacity-50"
// //           >
// //             <ChevronLeft size={20} /> Back
// //           </button>
// //           <button
// //             onClick={goToNext}
// //             disabled={currentSlide === landingSlides.length - 1}
// //             className="disabled:opacity-50"
// //           >
// //             Next <span className="font-bold">&rarr;</span>
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default LandingPage;
// import React, { useState, useEffect } from 'react';
// import PynglBrand from '../components/common/PynglBrand';
// import { ChevronLeft,ChevronRight } from 'lucide-react';

// const landingSlides = [
//   {
//     title: "Know What the World Feels In Real Time",
//     description: "Post questions, share polls, and watch the pulse update live."
//   },
//   {
//     title: "Engage Your Audience Instantly",
//     description: "Create beautiful, simple polls in seconds and get immediate feedback."
//   },
//   {
//     title: "Data That Drives Decisions",
//     description: "Analyze results with clean, easy-to-understand visuals."
//   }
// ];

// const LandingPage = ({ openSheet }) => {
//     const [currentSlide, setCurrentSlide] = useState(0);

//     // Manual navigation functions remain the same
//     const goToNext = () => setCurrentSlide(p => (p < landingSlides.length - 1 ? p + 1 : p));
//     const goToPrev = () => setCurrentSlide(p => (p > 0 ? p - 1 : p));

//     // 2. Add the useEffect hook to handle the automatic slide transition
//     useEffect(() => {
//         // Set up an interval to advance the slide every 3 seconds (3000 milliseconds)
//         const slideInterval = setInterval(() => {
//             setCurrentSlide(prevSlide => (prevSlide + 1) % landingSlides.length);
//         }, 3000);

//         // This is a cleanup function. It runs when the component unmounts
//         // or before the effect runs again. It's crucial for preventing bugs.
//         return () => {
//             clearInterval(slideInterval);
//         };
//     }, [currentSlide]); // The effect will reset its timer whenever currentSlide changes

//   return (
//       <div className="p-8 flex flex-col items-center text-center justify-between flex-grow bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen md:w-7/6 lg:w-4/5 xl:w-3/4 2xl:w-2/3 transition-all duration-300">
//       <div />
//        <PynglBrand
//                 title={landingSlides[currentSlide].title}
//                 description={landingSlides[currentSlide].description}
//             />
//             <div className="w-full">
//                 <div className="flex items-center justify-center space-x-2 my-8">
//                     {landingSlides.map((_, i) => (
//                         <span
//                             key={i}
//                             className={`w-2 h-2 rounded-full transition-all ${
//                                 i === currentSlide
//                                     ? 'w-3 h-3 bg-pyngl-pink'
//                                     : 'bg-gray-300 dark:bg-gray-600'
//                             }`}
//                         />
//                     ))}
//                 </div>
//                 <div className="flex items-center space-x-4">
//                     <button className="flex-1 py-3 px-4 border-2 border-pyngl-teal text-pyngl-teal font-semibold rounded-full dark:border-pyngl-teal dark:text-pyngl-teal">
//                         Demo
//                     </button>
//                     <button
//                         onClick={() => openSheet('login')}
//                         className="flex-1 py-3 px-4 bg-pyngl-pink text-white font-semibold rounded-full shadow-lg hover:opacity-90"
//                     >
//                         Login Account
//                     </button>
//                 </div>
//                 <div className="flex justify-between text-gray-500 dark:text-gray-400 font-semibold mt-6">
//                     <button
//                         onClick={goToPrev}
//                         disabled={currentSlide === 0}
//                         className="flex items-center gap-1 disabled:opacity-50"
//                     >
//                         <ChevronLeft size={20} /> Back
//                     </button>
//                     <button
//                         onClick={goToNext}
//                         disabled={currentSlide === landingSlides.length - 1}
//                         className="disabled:opacity-50"
//                     >
//                         Next <span className="font-bold">&rarr;</span>
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default LandingPage;     
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../utils/validationSchemas'; // ⚠️ Make sure path is correct
import PynglBrand from '../components/common/PynglBrand';
import useAuthStore from '../store/useAuthStore';
import { FormInput } from '../components/common/FormInput'; // ⚠️ Make sure path is correct
import {
    Mail,
    Lock,
    Eye,
    EyeOff,
    AlertTriangle,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';

// --- ⚠️ ACTION REQUIRED ---
// Please update these paths to where your images are stored in the /public folder
const PYNGL_ILLUSTRATION = '/pynglPhoto.png'; // <-- Update this path
const GOOGLE_LOGO = '/google-logo.svg'; // <-- Update this path
const APPLE_LOGO = '/apple-logo.svg'; // <-- Update this path
// -------------------------

// Carousel text from your old file
const landingSlides = [
  {
    title: "know what the world feels in real time",
    description: "Post questions, swipe to vote, and watch the pulse update live. anonymous-first, shareable polls, and enterprise-grade insights."
  },
  {
    title: "Engage Your Audience Instantly",
    description: "Create beautiful, simple polls in seconds and get immediate feedback."
  },
  {
    title: "Data That Drives Decisions",
    description: "Analyze results with clean, easy-to-understand visuals."
  }
];

// NOTE: The 'openSheet' prop is no longer needed
const LandingPage = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const navigate = useNavigate();
    const { login, loading, error, loginWithGoogle, clearError } = useAuthStore();
    const [showPassword, setShowPassword] = useState(false);

    // --- Form & Auth Logic (from LoginSheet.js) ---
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(loginSchema),
    });

    useEffect(() => {
        clearError();
    }, [clearError, currentSlide]); // Clear error on slide change too

    const onSubmit = async (data) => {
        const success = await login(data.email, data.password);
        if (success) {
            navigate('/dashboard'); // or wherever users go after login
        }
    };

    const handleGoogleLogin = async () => {
        const success = await loginWithGoogle();
        if (success) {
            navigate('/dashboard'); // or wherever users go after login
        }
    };

    // --- Carousel Logic (from LandingPage.js) ---
    const goToNext = () => setCurrentSlide(p => (p < landingSlides.length - 1 ? p + 1 : p));
    const goToPrev = () => setCurrentSlide(p => (p > 0 ? p - 1 : p));

    // Auto-slide effect from your old file
    useEffect(() => {
        const slideInterval = setInterval(() => {
            setCurrentSlide(prevSlide => (prevSlide + 1) % landingSlides.length);
        }, 4000); // 4 seconds
        return () => clearInterval(slideInterval);
    }, []); // Run only once

    // --- Reusable Password Input (from LoginSheet.js logic) ---
    const PasswordInput = () => (
        <div className="relative">
            <label
                htmlFor="password"
                className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900"
            >
                Password
            </label>
            <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                    <Lock className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    {...register('password')}
                    disabled={loading}
                    placeholder="Enter your password"
                    className={`block w-full rounded-lg border-0 py-3.5 pl-11 pr-10 text-gray-900 ring-1 ring-inset ${
                        errors.password ? 'ring-red-500' : 'ring-gray-300'
                    } placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-500 sm:text-sm`}
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                    {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                        <Eye className="h-5 w-5 text-gray-400" />
                    )}
                </button>
            </div>
            {errors.password && (
                <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>
            )}
        </div>
    );

    // --- Main JSX ---
    return (
        <div className="flex min-h-screen flex-col bg-white px-6 py-8 sm:px-8">
            
            {/* 1. Header (Replaces PynglBrand) */}
            <div className="flex flex-col items-center pt-12">
                <img src={PYNGL_ILLUSTRATION} alt="Pyngl" className="h-40 w-auto" />
                <h1 className="mt-8 text-center text-2xl font-bold tracking-tight text-gray-900">
                    {/* Use carousel title */}
                    {landingSlides[currentSlide].title}
                </h1>
                <p className="mt-3 max-w-sm text-center text-sm text-gray-500">
                    {/* Use carousel description */}
                    {landingSlides[currentSlide].description}
                </p>
            </div>

            {/* 2. Form (from LoginSheet.js) */}
            <form onSubmit={handleSubmit(onSubmit)} className="mt-10 w-full space-y-5">
                {error && (
                    <div className="flex items-center gap-x-3 rounded-lg border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-800">
                        <AlertTriangle className="h-5 w-5 flex-none" />
                        <span>{error}</span>
                    </div>
                )}
                <FormInput
                    Icon={Mail}
                    type="email"
                    label="Email/username"
                    id="email"
                    register={register}
                    error={errors.email}
                    disabled={loading}
                    placeholder="example@mail.com"
                />
                <PasswordInput />
                <div className="flex justify-between text-sm">
                    <Link
                        to="/forgot-password"
                        className="font-semibold text-pink-500 hover:text-pink-400"
                    >
                        Forgot password?
                    </Link>
                    <Link
                        to="/signup"
                        className="font-semibold text-blue-600 hover:text-blue-500"
                    >
                        Sign Up
                    </Link>
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="flex w-full justify-center rounded-full bg-pink-500 px-3 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-pink-600 disabled:bg-pink-300"
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>

            {/* 3. "OR" Divider */}
            <div className="relative my-8">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="bg-white px-2 text-gray-400">OR</span>
                </div>
            </div>

            {/* 4. Social Logins */}
            <div className="space-y-4">
                <p className="text-center text-sm text-gray-500">Sign In with</p>
                <div className="flex justify-center gap-4">
                    <button
                        type="button"
                        onClick={handleGoogleLogin}
                        disabled={loading}
                        className="flex h-14 w-14 items-center justify-center rounded-full border border-gray-300 bg-white shadow-sm hover:bg-gray-50"
                    >
                        <img src={GOOGLE_LOGO} alt="Google" className="h-6 w-6" />
                    </button>
                    <button
                        type="button"
                        disabled={loading} // Add apple login logic here
                        className="flex h-14 w-14 items-center justify-center rounded-full border border-gray-900 bg-black shadow-sm hover:bg-gray-800"
                    >
                        <img src={APPLE_LOGO} alt="Apple" className="h-6 w-6" />
                    </button>
                </div>
            </div>
            
            {/* 5. Footer (from LandingPage.js, with pagination dots) */}
            <footer className="mt-auto pt-10">
                {/* Dots */}
                <div className="flex items-center justify-center space-x-2 my-8">
                    {landingSlides.map((_, i) => (
                        <span
                            key={i}
                            className={`h-2 rounded-full transition-all ${
                                i === currentSlide
                                    ? 'w-2 bg-pink-500' // Current slide
                                    : 'w-2 bg-gray-300' // Other slides
                            }`}
                        />
                    ))}
                </div>
                {/* Back/Next Buttons */}
                <div className="flex justify-between text-gray-600 font-semibold">
                    <button
                        onClick={goToPrev}
                        disabled={currentSlide === 0}
                        className="flex items-center gap-1 disabled:opacity-50"
                    >
                        <ChevronLeft size={20} /> Back
                    </button>
                    <button
                        onClick={goToNext}
                        disabled={currentSlide === landingSlides.length - 1}
                        className="flex items-center gap-1 disabled:opacity-50"
                    >
                        Next <ChevronRight size={20} />
                    </button>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;