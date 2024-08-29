import React, { useState, useEffect } from "react";

const CountdownTimer = () => {
  // State for input fields
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  // State for timer
  const [timeLeft, setTimeLeft] = useState(0); // Correct variable name
  const [isRunning, setIsRunning] = useState(false);

  // Handle input changes
  const handleHoursChange = (e) => setHours(parseInt(e.target.value));
  const handleMinutesChange = (e) => setMinutes(parseInt(e.target.value));
  const handleSecondsChange = (e) => setSeconds(parseInt(e.target.value));

  // Handle start button click
  const startTimer = () => {
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    setTimeLeft(totalSeconds); // Correct variable name
    setIsRunning(true);
  };

  // Countdown logic
  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(timeLeft - 1); // Correct variable name
      }, 1000);

      // Clean up interval on component unmount or when timeLeft changes
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      setIsRunning(false);
    }
  }, [isRunning, timeLeft]);

  // Format time
  const formatTime = (time) => String(time).padStart(2, "0");

  const hoursLeft = Math.floor(timeLeft / 3600);
  const minutesLeft = Math.floor((timeLeft % 3600) / 60);
  const secondsLeft = timeLeft % 60;

  return (
    <div>
      <h2>Countdown Timer</h2>
      <div>
        <label>
          Hours:
          <input
            type="number"
            value={hours}
            onChange={handleHoursChange}
            min="0"
          />
        </label>
        <label>
          Minutes:
          <input
            type="number"
            value={minutes}
            onChange={handleMinutesChange}
            min="0"
          />
        </label>
        <label>
          Seconds:
          <input
            type="number"
            value={seconds}
            onChange={handleSecondsChange}
            min="0"
          />
        </label>
        <button onClick={startTimer} disabled={isRunning}>
          Start Timer
        </button>
      </div>
      <div>
        <h3>Time Remaining</h3>
        <p>
          {formatTime(hoursLeft)}:{formatTime(minutesLeft)}:
          {formatTime(secondsLeft)}
        </p>
      </div>
    </div>
  );
};

export default CountdownTimer;
