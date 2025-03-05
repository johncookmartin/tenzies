import { useState, useRef } from 'react';

export const useTracker = (gameWon) => {
  const [rollCount, setRollCount] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const timerRef = useRef(null);

  const resetTracker = () => {
    setRollCount(0);
    setSeconds(0);
  };

  const incrementRollCount = () => {
    setRollCount((prev) => prev + 1);
  };

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
  };

  return {
    rollCount,
    seconds,
    resetTracker,
    incrementRollCount,
    startTimer,
    stopTimer,
  };
};
