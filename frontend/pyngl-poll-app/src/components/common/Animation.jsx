
import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use'; // A handy hook for getting screen dimensions

export default function WelcomeAnimation({ onComplete }) {
  const { width, height } = useWindowSize();
  const [show, setShow] = useState(true);

  // This effect will automatically stop the animation after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      // Let the parent component know the animation is finished
      if (onComplete) {
        onComplete();
      }
    }, 5000); // 5 seconds duration

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50">
      <Confetti
        width={width}
        height={height}
        recycle={false} // Let the confetti fall and disappear
        numberOfPieces={400}
        gravity={0.1}
      />
    </div>
  );
}