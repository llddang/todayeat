import { useEffect, useState } from 'react';

const useIsMobile = () => {
  const [windowSize, setWindowSize] = useState(isMobile());

  useEffect(() => {
    const handleResize = () => {
      setWindowSize(isMobile());
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

export default useIsMobile;

const isMobile = () => window.innerWidth < 1280;
