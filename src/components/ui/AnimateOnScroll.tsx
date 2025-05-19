"use client";

import { useEffect, useRef, memo, useCallback, useMemo } from "react";

// Define animation types as a literal type for better type safety
type AnimationType =
  | "fade-in-up"
  | "fade-in"
  | "slide-in-left"
  | "slide-in-right"
  | "zoom-in"
  | "rotate-in"
  | "blur-in"
  | "bounce-in"
  | "swing-in"
  | "stagger-fade"
  | "orbit"
  | "sway"
  | "bounce-gentle"
  | "waving"
  | "morph";

// Define duration options for better type safety
type AnimationDuration = 300 | 500 | 700 | 1000 | 1500 | 2000;

interface AnimateOnScrollProps {
  children: React.ReactNode;
  animation: AnimationType;
  delay?: number; // delay in ms
  threshold?: number; // 0 to 1, how much of the element needs to be visible
  className?: string;
  duration?: AnimationDuration | number; // Animation duration in ms
  once?: boolean; // Whether to trigger animation only once
}

function AnimateOnScroll({
  children,
  animation,
  delay = 0,
  threshold = 0.1,
  className = "",
  duration = 700,
  once = true, // Only trigger once by default
}: AnimateOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const animatedRef = useRef<boolean>(false);

  // Cache the observer reference to prevent multiple creation
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Cleanup function to avoid memory leaks
  const cleanupObserver = useCallback(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }
  }, []);

  useEffect(() => {
    // Skip setup if already animated and only triggering once
    if (once && animatedRef.current) return;

    const currentRef = ref.current;
    if (!currentRef) return;

    // Lazy create observer only when needed
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setTimeout(() => {
                entry.target.classList.add("animate");
                animatedRef.current = true;

                // Clean up observer if we only want to trigger once
                if (once) {
                  cleanupObserver();
                }
              }, delay);
            } else if (!once && animatedRef.current) {
              // If not once, remove the animation class when out of view
              entry.target.classList.remove("animate");
              animatedRef.current = false;
            }
          });
        },
        {
          threshold,
          // Add root margin to trigger slightly before element is in view
          rootMargin: "50px",
        },
      );
    }

    observerRef.current.observe(currentRef);

    // Clean up the observer when component unmounts
    return cleanupObserver;
  }, [delay, threshold, once, cleanupObserver]);

  // Detect reduced motion preference
  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const element = ref.current;

    if (element && mediaQuery.matches) {
      // If user prefers reduced motion, apply animation immediately without transition
      element.classList.add("animate", "no-motion");
      cleanupObserver();
    }

    // Handle changes to this preference
    const handleChange = (event: MediaQueryListEvent) => {
      if (event.matches && element) {
        element.classList.add("animate", "no-motion");
        cleanupObserver();
      } else if (element) {
        element.classList.remove("no-motion");
        // Re-apply observer if needed and not already animated
        if (!once || !animatedRef.current) {
          cleanupObserver();
          const observer = new IntersectionObserver(
            ([entry]) => {
              if (entry.isIntersecting) {
                setTimeout(() => {
                  entry.target.classList.add("animate");
                  animatedRef.current = true;
                  if (once) cleanupObserver();
                }, delay);
              }
            },
            { threshold },
          );
          observer.observe(element);
          observerRef.current = observer;
        }
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [delay, threshold, once, cleanupObserver]);

  // Memoize the animation class generation to prevent recalculation
  const animationClass = useMemo(() => {
    const durationClass = `duration-[${duration}ms]`; // Use exact ms value
    let baseClasses = `opacity-0 transition-all ${durationClass} ease-out`;

    switch (animation) {
      case "fade-in-up":
        return `${baseClasses} translate-y-8`;
      case "fade-in":
        return `${baseClasses} transition-opacity`;
      case "slide-in-left":
        return `${baseClasses} -translate-x-8`;
      case "slide-in-right":
        return `${baseClasses} translate-x-8`;
      case "zoom-in":
        return `${baseClasses} scale-95`;
      case "rotate-in":
        return `${baseClasses} rotate-12`;
      case "blur-in":
        return `${baseClasses} blur-lg`;
      case "bounce-in":
        return `${baseClasses} scale-95 ease-[cubic-bezier(0.175,0.885,0.32,1.275)]`;
      case "swing-in":
        return `${baseClasses} -rotate-3 origin-top`;
      case "stagger-fade":
        return `${baseClasses} transition-opacity`;
      // New animation types
      case "orbit":
        return `${baseClasses} [&.animate]:animate-orbit`;
      case "sway":
        return `${baseClasses} [&.animate]:animate-sway`;
      case "bounce-gentle":
        return `${baseClasses} [&.animate]:animate-bounce-gentle`;
      case "waving":
        return `${baseClasses} [&.animate]:animate-waving`;
      case "morph":
        return `${baseClasses} [&.animate]:animate-morph`;
      default:
        return baseClasses;
    }
  }, [animation, duration]);

  const resetClasses = useMemo(() => {
    return `[&.animate]:opacity-100 [&.animate]:translate-y-0 [&.animate]:translate-x-0 [&.animate]:scale-100 [&.animate]:rotate-0 [&.animate]:blur-0 [&.no-motion]:transition-none [&.no-motion]:animate-none`;
  }, []);

  return (
    <div
      ref={ref}
      className={`${animationClass} ${resetClasses} ${className}`}
      aria-hidden={!animatedRef.current} // Accessibility enhancement
    >
      {children}
    </div>
  );
}

// Export memoized component to prevent unnecessary re-renders
export default memo(AnimateOnScroll);
