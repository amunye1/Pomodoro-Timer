import React, { useState, useEffect, useRef } from 'react';

function FifteenMinuteClock() {
  // Set initial time to 900 seconds (15 minutes)
  const [timeLeft, setTimeLeft] = useState(900);
  const timerId = useRef(null);

  
  const startTimer = () => {
    // Prevent multiple intervals from being set if already running
    if (timerId.current !== null) return;

    timerId.current = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          // Stop timer when time runs out
          clearInterval(timerId.current);
          timerId.current = null;
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  const pauseTimer = () => {
   clearInterval(timerId.current)
   timerId.current = null;
  };
  // Clear interval on unmount to avoid memory leaks
  useEffect(() => {
    return () => {
      if (timerId.current !== null) {
        clearInterval(timerId.current);
      }
    };
  }, []);

  // Format time as minutes:seconds
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;

  return (
    <div>
      <p>Time Left: {minutes}:{formattedSeconds}</p>
      <button onClick={startTimer}>Start</button>
      <button onClick={pauseTimer}>Pause</button>
      
    </div>
  );
}

export default FifteenMinuteClock;
