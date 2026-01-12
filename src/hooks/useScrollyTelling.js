import { useEffect, useState, useRef } from 'react';

/**
 * Hook for scrollytelling - pins a section and cycles through steps based on scroll.
 *
 * @param {number} totalSteps - Number of content steps to cycle through
 * @param {Object} options
 * @param {number} options.scrollPerStep - Pixels of scroll per step (default: window.innerHeight)
 * @returns {[React.RefObject, Object]} - [containerRef, { currentStep, progress, stepProgress, phase }]
 */
export function useScrollyTelling(totalSteps, options = {}) {
  const containerRef = useRef(null);
  const [state, setState] = useState({
    currentStep: 0,
    progress: 0,        // Overall progress 0-1
    stepProgress: 0,    // Progress within current step 0-1
    isPinned: false,
    phase: 'before',    // 'before' | 'pinned' | 'after'
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scrollPerStep = options.scrollPerStep || window.innerHeight * 0.8;
    const totalScrollDistance = scrollPerStep * totalSteps;

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();

      // How far past the top of the container we've scrolled
      const scrolledIntoContainer = -rect.top;

      // Container top has passed viewport top - we're in the pinned zone
      if (scrolledIntoContainer >= 0 && scrolledIntoContainer < totalScrollDistance) {
        const progress = scrolledIntoContainer / totalScrollDistance;
        const exactStep = progress * totalSteps;
        const currentStep = Math.min(Math.floor(exactStep), totalSteps - 1);
        const stepProgress = exactStep - currentStep;

        setState({
          currentStep,
          progress,
          stepProgress,
          isPinned: true,
          phase: 'pinned',
        });
        return;
      }

      // Scrolled past the entire container
      if (scrolledIntoContainer >= totalScrollDistance) {
        setState({
          currentStep: totalSteps - 1,
          progress: 1,
          stepProgress: 1,
          isPinned: false,
          phase: 'after',
        });
        return;
      }

      // Container hasn't reached pin point yet (before)
      setState({
        currentStep: 0,
        progress: 0,
        stepProgress: 0,
        isPinned: false,
        phase: 'before',
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [totalSteps, options.scrollPerStep]);

  return [containerRef, state];
}
