import React, { useState } from 'react';
import PynglBrand from '../components/common/PynglBrand';
import { ChevronLeft } from 'lucide-react';

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
  const goToNext = () => setCurrentSlide(p => (p < landingSlides.length - 1 ? p + 1 : p));
  const goToPrev = () => setCurrentSlide(p => (p > 0 ? p - 1 : p));

  return (
    <div className="p-8 flex flex-col items-center text-center justify-between flex-grow bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen md:w-7/6 lg:w-4/5 xl:w-3/4 2xl:w-2/3 transition-all duration-300">
      <div />
      <PynglBrand
        title={landingSlides[currentSlide].title}
        description={landingSlides[currentSlide].description}
        // Optionally pass dark mode styles to PynglBrand if it supports them
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
            LOGIN ACCOUNT
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
    </div>
  );
};

export default LandingPage;
