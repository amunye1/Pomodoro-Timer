import React, { useState, useEffect, useRef } from "react";
import "./Clock.css";
import Buttons from "./Buttons";

function Clock({ setBackgroundColor }) {
  // Set initial time to 1500 seconds (25 minutes)
  const [timeLeft, setTimeLeft] = useState(1500);

  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState("pomodoro");
  const [pomodoroTotal, setPomodoroTotal] = useState(1);
  const [shortBreakTotal, setShortBreakTotal] = useState(1);
  const [longBreakTotal, setLongBreakTotal] = useState(1);
  const [color, setColor] = useState("#ede7db");
  const [pomodoroCount, setPomodoroCount] = useState(0);
  
  let btnName = "Start";
  const timerId = useRef(null);

  const startTimer = () => {
    // Prevent multiple intervals from being set if already running
    if (timerId.current !== null) return;

    timerId.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime === 1) {
          clearInterval(timerId.current);
          timerId.current = null;
          setIsRunning(false); // Ensure we set isRunning to false
          
          // Handle timer completion and mode switching
          if (mode === "pomodoro") {
            setPomodoroTotal((prev) => prev + 1);
            const newCount = pomodoroCount + 1;
            setPomodoroCount(newCount);
            
            // After 4 pomodoros, switch to long break
            if (newCount % 4 === 0) {
              setMode("longBreak");
            } else {
              // Otherwise switch to short break
              setMode("shortBreak");
            }
          } else if (mode === "shortBreak") {
            setShortBreakTotal((prev) => prev + 1);
            setMode("pomodoro");
          } else if (mode === "longBreak") {
            setLongBreakTotal((prev) => prev + 1);
            setMode("pomodoro");
            setPomodoroCount(0); // Reset pomodoro count after long break
          }
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    setIsRunning(true);
  };

  const pauseTimer = () => {
    clearInterval(timerId.current);
    timerId.current = null;
    setIsRunning(false);
  };

  // Toggle between starting and pausing the timer
  const toggleTimer = () => {
    if (isRunning) {
      pauseTimer();
    } else {
      startTimer();
    }
  };
 
  // Clear interval on unmount to avoid memory leaks
  useEffect(() => {
    return () => {
      if (timerId.current !== null) {
        clearInterval(timerId.current);
      }
    };
  }, []);

  useEffect(() => {
    if (mode === "pomodoro") {
      setTimeLeft(1);
      setBackgroundColor("rgb(212 197 168)");
      setColor("rgba(255, 255, 255, 0.1)");
    } else if (mode === "shortBreak") {
      setTimeLeft(30);
      setBackgroundColor("rgb(57, 112, 151)");
      setColor("rgba(255, 255, 255, 0.1)");
    } else if (mode === "longBreak") {
      setTimeLeft(9);
      setBackgroundColor("rgb(56, 133, 138)");
      setColor("rgba(255, 255, 255, 0.1)");
    }
  }, [mode, setBackgroundColor]);



  // Format time as minutes:seconds
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedSeconds = seconds < 10 ? "0" + seconds : seconds;

  return (
    <div className="container max-auto">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-10 col-md-8 col-lg-6">
          <div className="card text-center mt-6 p-5" style={{ backgroundColor: color }}>
            <div className="card-body">
              <div>
                <Buttons mode={mode} setMode={setMode} />
                <p className="card-text time-font">
                  {minutes}:{formattedSeconds}
                </p>
                <button className="p-2" onClick={toggleTimer}>
                  {isRunning ? "Pause" : "Start"}
                </button>
              </div>
              
            </div>
            {mode === "pomodoro" ? (
              <>
                <p>#{pomodoroTotal}</p>
                <p>Time to focus!</p>
              </>
            ) : mode === "shortBreak" ? (
              <>
                <p>#{shortBreakTotal}</p>
                <p>Time for a break!</p>
              </>
            ) : mode === "longBreak" ? (
              <>
                <p>#{longBreakTotal}</p>
                <p>Time for a long break!</p>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Clock;
