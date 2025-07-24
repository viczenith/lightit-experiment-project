import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

export function useScrollTrigger(options = {}) {
  const [isVisible, setIsVisible] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
    ...options
  });
  
  useEffect(() => {
    if (inView) {
      setIsVisible(true);
    }
  }, [inView]);
  
  return [ref, isVisible];
}