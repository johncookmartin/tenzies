import { useState, useEffect } from 'react';

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState(() => getWindowSize());

  function getWindowSize() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }

  useEffect(() => {
    function watchWindowSize() {
      setWindowSize(getWindowSize);
    }
    window.addEventListener('resize', watchWindowSize);
    return () => {
      window.removeEventListener('resize', watchWindowSize);
    };
  }, []);

  return { windowSize };
};
