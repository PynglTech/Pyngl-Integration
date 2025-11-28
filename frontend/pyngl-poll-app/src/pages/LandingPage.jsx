// // import React, { useState } from 'react';
// // import PynglBrand from '../components/common/PynglBrand';
// // import { ChevronLeft } from 'lucide-react';

// // const landingSlides = [
// //     { title: "Know What the World Feels In Real Time", description: "Post questions, share polls, and watch the pulse update live." },
// //     { title: "Engage Your Audience Instantly", description: "Create beautiful, simple polls in seconds and get immediate feedback." },
// //     { title: "Data That Drives Decisions", description: "Analyze results with clean, easy-to-understand visuals." }
// // ];

// // const LandingPage = ({ openSheet }) => {
// //     const [currentSlide, setCurrentSlide] = useState(0);
// //     const goToNext = () => setCurrentSlide(p => (p < landingSlides.length - 1 ? p + 1 : p));
// //     const goToPrev = () => setCurrentSlide(p => (p > 0 ? p - 1 : p));
    
// //     return (
// //         <div className="p-8 flex flex-col items-center text-center justify-between flex-grow">
// //             <div/>
// //             <PynglBrand title={landingSlides[currentSlide].title} description={landingSlides[currentSlide].description} />
// //             <div className="w-full">
// //                 <div className="flex items-center justify-center space-x-2 my-8">
// //                     {landingSlides.map((_, i) => <span key={i} className={`w-2 h-2 rounded-full ${i === currentSlide ? 'w-3 h-3 bg-pyngl-pink' : 'bg-gray-300'}`} />)}
// //                 </div>
// //                 <div className="flex items-center space-x-4">
// //                    <button className="flex-1 py-3 px-4 border-2 border-pyngl-teal text-pyngl-teal font-semibold rounded-full">Demo</button>
// //                    <button onClick={() => openSheet('login')} className="flex-1 py-3 px-4 bg-pyngl-pink text-white font-semibold rounded-full shadow-lg">LOGIN ACCOUNT</button>
// //                 </div>
// //                 <div className="flex justify-between text-gray-500 font-semibold mt-6">
// //                     <button onClick={goToPrev} disabled={currentSlide === 0} className="flex items-center gap-1 disabled:opacity-50"><ChevronLeft size={20} /> Back</button>
// //                     <button onClick={goToNext} disabled={currentSlide === landingSlides.length - 1} className="disabled:opacity-50">Next <span className="font-bold">&rarr;</span></button>
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // };

// // export default LandingPage;
// import React, { useState } from 'react';
// import { useDrag } from '@use-gesture/react';
// import { motion, AnimatePresence } from 'framer-motion';
// import PynglBrand from '../components/common/PynglBrand';
// import { ChevronLeft } from 'lucide-react';

// const landingSlides = [
//     { title: "Know What the World Feels In Real Time", description: "Post questions, share polls, and watch the pulse update live." },
//     { title: "Engage Your Audience Instantly", description: "Create beautiful, simple polls in seconds and get immediate feedback." },
//     { title: "Data That Drives Decisions", description: "Analyze results with clean, easy-to-understand visuals." }
// ];

// // Animation settings for the text
// const slideVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0 },
//     exit: { opacity: 0, y: -20 },
// };

// const LandingPage = ({ openSheet }) => {
//     const [currentSlide, setCurrentSlide] = useState(0);

//     const goToSlide = (slideIndex) => {
//         if (slideIndex >= 0 && slideIndex < landingSlides.length) {
//             setCurrentSlide(slideIndex);
//         }
//     };

//     // ✨ UX Upgrade 1: Swipe Gestures
//     const bind = useDrag(({ down, movement: [mx], direction: [xDir], velocity: [vx] }) => {
//         const trigger = vx > 0.2; // Velocity threshold
//         if (!down && trigger) {
//             const dir = xDir > 0 ? -1 : 1; // Figure out direction
//             goToSlide(currentSlide + dir);
//         }
//     });

//     return (
//         <div {...bind()} className="p-8 flex flex-col items-center text-center justify-between flex-grow touch-none">
//             <div /> {/* Spacer */}

//             {/* ✨ UX Upgrade 2: Animated Text */}
//             <AnimatePresence mode="wait">
//                 <motion.div
//                     key={currentSlide}
//                     variants={slideVariants}
//                     initial="hidden"
//                     animate="visible"
//                     exit="exit"
//                     transition={{ duration: 0.3 }}
//                 >
//                     <PynglBrand title={landingSlides[currentSlide].title} description={landingSlides[currentSlide].description} />
//                 </motion.div>
//             </AnimatePresence>

//             <div className="w-full">
//                 {/* Carousel Dots */}
//                 <div className="flex items-center justify-center space-x-2 my-8">
//                     {landingSlides.map((_, i) => (
//                         <div key={i} onClick={() => goToSlide(i)} className="cursor-pointer p-2">
//                             <div className={`w-2 h-2 rounded-full transition-all duration-300 ${i === currentSlide ? 'w-4 bg-pyngl-pink' : 'bg-gray-300'}`} />
//                         </div>
//                     ))}
//                 </div>

//                 {/* Action Buttons */}
//                 <div className="flex items-center space-x-4">
//                     <button className="flex-1 py-3 px-4 border-2 border-pyngl-teal text-pyngl-teal font-semibold rounded-full hover:bg-pyngl-teal hover:text-white transition-colors">Demo</button>
//                     <button onClick={() => openSheet('login')} className="flex-1 py-3 px-4 bg-pyngl-pink text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-shadow">LOGIN</button>
//                 </div>

//                 {/* Navigation (Next/Back) */}
//                 <div className="flex justify-between text-gray-500 font-semibold mt-6">
//                     <button onClick={() => goToSlide(currentSlide - 1)} disabled={currentSlide === 0} className="flex items-center gap-1 disabled:opacity-30 transition-opacity"><ChevronLeft size={20} /> Back</button>
//                     <button onClick={() => goToSlide(currentSlide + 1)} disabled={currentSlide === landingSlides.length - 1} className="disabled:opacity-30 transition-opacity">Next <span className="font-bold">&rarr;</span></button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default LandingPage;
// import React, { useState } from 'react';
// import PynglBrand from '../components/common/PynglBrand';
// import { ChevronLeft } from 'lucide-react';

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
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const goToNext = () => setCurrentSlide(p => (p < landingSlides.length - 1 ? p + 1 : p));
//   const goToPrev = () => setCurrentSlide(p => (p > 0 ? p - 1 : p));

//   return (
//     <div className="p-8 flex flex-col items-center text-center justify-between flex-grow bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
//       <div />
//       <PynglBrand
//         title={landingSlides[currentSlide].title}
//         description={landingSlides[currentSlide].description}
//         // Optionally pass dark mode styles to PynglBrand if it supports them
//       />
//       <div className="w-full">
//         <div className="flex items-center justify-center space-x-2 my-8">
//           {landingSlides.map((_, i) => (
//             <span
//               key={i}
//               className={`w-2 h-2 rounded-full transition-all ${
//                 i === currentSlide
//                   ? 'w-3 h-3 bg-pyngl-pink'
//                   : 'bg-gray-300 dark:bg-gray-600'
//               }`}
//             />
//           ))}
//         </div>

//         <div className="flex items-center space-x-4">
//           <button className="flex-1 py-3 px-4 border-2 border-pyngl-teal text-pyngl-teal font-semibold rounded-full dark:border-pyngl-teal dark:text-pyngl-teal">
//             Demo
//           </button>
//           <button
//             onClick={() => openSheet('login')}
//             className="flex-1 py-3 px-4 bg-pyngl-pink text-white font-semibold rounded-full shadow-lg hover:opacity-90"
//           >
//             LOGIN ACCOUNT
//           </button>
//         </div>

//         <div className="flex justify-between text-gray-500 dark:text-gray-400 font-semibold mt-6">
//           <button
//             onClick={goToPrev}
//             disabled={currentSlide === 0}
//             className="flex items-center gap-1 disabled:opacity-50"
//           >
//             <ChevronLeft size={20} /> Back
//           </button>
//           <button
//             onClick={goToNext}
//             disabled={currentSlide === landingSlides.length - 1}
//             className="disabled:opacity-50"
//           >
//             Next <span className="font-bold">&rarr;</span>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LandingPage;
// import React, { useState } from 'react';
// import PynglBrand from '../components/common/PynglBrand';
// import { ChevronLeft } from 'lucide-react';

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
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const goToNext = () => setCurrentSlide(p => (p < landingSlides.length - 1 ? p + 1 : p));
//   const goToPrev = () => setCurrentSlide(p => (p > 0 ? p - 1 : p));

//   return (
//     <div className="p-8 flex flex-col items-center text-center justify-between flex-grow bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen md:w-7/6 lg:w-4/5 xl:w-3/4 2xl:w-2/3 transition-all duration-300">
//       <div />
//       <PynglBrand
//         title={landingSlides[currentSlide].title}
//         description={landingSlides[currentSlide].description}
//         // Optionally pass dark mode styles to PynglBrand if it supports them
//       />
//       <div className="w-full">
//         <div className="flex items-center justify-center space-x-2 my-8">
//           {landingSlides.map((_, i) => (
//             <span
//               key={i}
//               className={`w-2 h-2 rounded-full transition-all ${
//                 i === currentSlide
//                   ? 'w-3 h-3 bg-pyngl-pink'
//                   : 'bg-gray-300 dark:bg-gray-600'
//               }`}
//             />
//           ))}
//         </div>

//         <div className="flex items-center space-x-4">
//           <button className="flex-1 py-3 px-4 border-2 border-pyngl-teal text-pyngl-teal font-semibold rounded-full dark:border-pyngl-teal dark:text-pyngl-teal">
//             Demo
//           </button>
//           <button
//             onClick={() => openSheet('login')}
//             className="flex-1 py-3 px-4 bg-pyngl-pink text-white font-semibold rounded-full shadow-lg hover:opacity-90"
//           >
//             LOGIN ACCOUNT
//           </button>
//         </div>

//         <div className="flex justify-between text-gray-500 dark:text-gray-400 font-semibold mt-6">
//           <button
//             onClick={goToPrev}
//             disabled={currentSlide === 0}
//             className="flex items-center gap-1 disabled:opacity-50"
//           >
//             <ChevronLeft size={20} /> Back
//           </button>
//           <button
//             onClick={goToNext}
//             disabled={currentSlide === landingSlides.length - 1}
//             className="disabled:opacity-50"
//           >
//             Next <span className="font-bold">&rarr;</span>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LandingPage;
// import React, { useState, useEffect } from 'react';
// import PynglBrand from '../components/common/PynglBrand';
// import { ChevronLeft,ChevronRight } from 'lucide-react';
// // import InstallPrompt from './InstallPrompt';

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
//                         Login Accounttt
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
//             {/* <InstallPrompt /> */}
//         </div>
        
//     );
// };

// export default LandingPage;     
import React, { useState, useEffect } from 'react';
import PynglBrand from '../components/common/PynglBrand';
import { ChevronLeft,ChevronRight } from 'lucide-react';
import InstallPrompt from './InstallPrompt';

const landingSlides = [
  {
    title: "Know What the World Feels In Real Time",
    description: "Post questions, share polls, and watch the pulse update live."
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

const LandingPage = ({ openSheet }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    // Manual navigation functions remain the same
    const goToNext = () => setCurrentSlide(p => (p < landingSlides.length - 1 ? p + 1 : p));
    const goToPrev = () => setCurrentSlide(p => (p > 0 ? p - 1 : p));

    // 2. Add the useEffect hook to handle the automatic slide transition
    useEffect(() => {
        // Set up an interval to advance the slide every 3 seconds (3000 milliseconds)
        const slideInterval = setInterval(() => {
            setCurrentSlide(prevSlide => (prevSlide + 1) % landingSlides.length);
        }, 3000);

        // This is a cleanup function. It runs when the component unmounts
        // or before the effect runs again. It's crucial for preventing bugs.
        return () => {
            clearInterval(slideInterval);
        };
    }, [currentSlide]); // The effect will reset its timer whenever currentSlide changes

  return (
      <div className="p-8 flex flex-col items-center text-center justify-between flex-grow bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen md:w-7/6 lg:w-4/5 xl:w-3/4 2xl:w-2/3 transition-all duration-300">
      <div />
       <PynglBrand
                title={landingSlides[currentSlide].title}
                description={landingSlides[currentSlide].description}
            />
            <div className="w-full">
                <div className="flex items-center justify-center space-x-2 my-8">
                    {landingSlides.map((_, i) => (
                        <span
                            key={i}
                            className={`w-2 h-2 rounded-full transition-all ${
                                i === currentSlide
                                    ? 'w-3 h-3 bg-pyngl-pink'
                                    : 'bg-gray-300 dark:bg-gray-600'
                            }`}
                        />
                    ))}
                </div>
                <div className="flex items-center space-x-4">
                    <button className="flex-1 py-3 px-4 border-2 border-pyngl-teal text-pyngl-teal font-semibold rounded-full dark:border-pyngl-teal dark:text-pyngl-teal">
                        Demo
                    </button>
                    <button
                        onClick={() => openSheet('login')}
                        className="flex-1 py-3 px-4 bg-pyngl-pink text-white font-semibold rounded-full shadow-lg hover:opacity-90"
                    >
                        Login Account   
                    </button>
                </div>
                <div className="flex justify-between text-gray-500 dark:text-gray-400 font-semibold mt-6">
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
                        className="disabled:opacity-50"
                    >
                        Next <span className="font-bold">&rarr;</span>
                    </button>
                </div>
            </div>
            {/* <InstallPrompt /> */}
        </div>
        
    );
};

export default LandingPage;     