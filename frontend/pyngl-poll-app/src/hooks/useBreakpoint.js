import { useState, useEffect } from 'react';

// This is a simple hook that tells us if the screen is "desktop" size or not.
// We'll define desktop as 1024px or wider, which is the standard 'lg' breakpoint.
const useBreakpoint = () => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    window.addEventListener('resize', handleResize);

    // Clean up the event listener when the component unmounts
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isDesktop;
};

export default useBreakpoint;
