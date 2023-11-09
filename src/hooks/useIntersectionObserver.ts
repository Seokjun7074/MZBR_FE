import { useEffect, useRef } from 'react';

export const useIntersectionObserver = (onObserve: () => void, outObserve: () => void) => {
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) onObserve();
        else outObserve();
      });
    };

    const observer = new IntersectionObserver(callback, options);
    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return observerRef;
};
