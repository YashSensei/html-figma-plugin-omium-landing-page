import { useEffect, useRef, useState } from 'react';

export function useScrollAnimation(options = {}) {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px',
    triggerOnce = true,
  } = options;

  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, triggerOnce]);

  return [ref, isVisible];
}

export function useMultipleScrollAnimation(count, options = {}) {
  const refs = useRef([]);
  const [visibleStates, setVisibleStates] = useState(Array(count).fill(false));

  const {
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px',
    triggerOnce = true,
    staggerDelay = 100,
  } = options;

  useEffect(() => {
    const observers = refs.current.map((element, index) => {
      if (!element) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setVisibleStates(prev => {
                const newStates = [...prev];
                newStates[index] = true;
                return newStates;
              });
            }, index * staggerDelay);

            if (triggerOnce) {
              observer.unobserve(element);
            }
          } else if (!triggerOnce) {
            setVisibleStates(prev => {
              const newStates = [...prev];
              newStates[index] = false;
              return newStates;
            });
          }
        },
        {
          threshold,
          rootMargin,
        }
      );

      observer.observe(element);
      return observer;
    });

    return () => {
      observers.forEach((observer, index) => {
        if (observer && refs.current[index]) {
          observer.unobserve(refs.current[index]);
        }
      });
    };
  }, [count, threshold, rootMargin, triggerOnce, staggerDelay]);

  const setRef = (index) => (el) => {
    refs.current[index] = el;
  };

  return [setRef, visibleStates];
}
