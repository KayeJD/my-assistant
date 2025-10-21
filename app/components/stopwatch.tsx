import React, { useState, useEffect } from "react";
import { Button } from "~/components/ui/button";
import "./../app.css";

const Stopwatch = () => {
  const [time, setTime] = useState(0);

  // state to check stopwatch running or not
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>;

    if (isRunning) {
      intervalId = setInterval(() => setTime((prev) => prev + 1), 10);
    }

    return () => clearInterval(intervalId);
  }, [isRunning]);

  const hours = Math.floor(time / 360000);
  const minutes = Math.floor((time % 360000) / 6000);
  const seconds = Math.floor((time % 6000) / 100);
  const milliseconds = time % 100;

  const startAndStop = () => {
    setIsRunning(!isRunning);
  };

  const reset = () => {
    setTime(0);
  };
  return (
    <div className="stopwatch-container">
      <p className="stopwatch-time">
        {hours.toString().padStart(2, "0")}:
        {minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}:
        {milliseconds.toString().padStart(2, "0")}
      </p>

      <div className="stopwatch-buttons">
        <Button variant="default" className="stopwatch-button flex items-center gap-2" onClick={startAndStop}>
          {isRunning ? "Stop" : "Start"}
        </Button>

        <Button variant="default" className="stopwatch-button flex items-center gap-2" onClick={reset}>
          Reset
        </Button>
      </div>
    </div>
  );
};

export default Stopwatch;