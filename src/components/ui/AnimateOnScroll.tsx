'use client';

import { useEffect, useRef } from 'react';

type AnimateOnScrollProps = {
  children: React.ReactNode;
  animation: 'fade-in-up' | 'fade-in' | 'slide-in-left' | 'slide-in-right' | 'zoom-in' | 'rotate-in' | 'blur-in' | 'bounce-in' | 'swing-in' | 'stagger-fade';
  delay?: number; // delay in ms
  threshold?: number; // 0 to 1, how much of the element needs to be visible
  className?: string;
  duration?: number; // animation duration in ms
};

export default function AnimateOnScroll({ 
  children, 
  animation, 
  delay = 0,
  threshold = 0.1,
  className = '',
  duration = 700,
}: AnimateOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('animate');
          }, delay);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold,
      }
    );

    const element = ref.current;
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [delay, threshold]);

  const getAnimationClass = () => {
    const durationClass = `duration-${duration}`;
    
    switch (animation) {
      case 'fade-in-up':
        return `opacity-0 translate-y-8 transition-all ${durationClass} ease-out`;
      case 'fade-in':
        return `opacity-0 transition-opacity ${durationClass} ease-out`;
      case 'slide-in-left':
        return `opacity-0 -translate-x-8 transition-all ${durationClass} ease-out`;
      case 'slide-in-right':
        return `opacity-0 translate-x-8 transition-all ${durationClass} ease-out`;
      case 'zoom-in':
        return `opacity-0 scale-95 transition-all ${durationClass} ease-out`;
      case 'rotate-in':
        return `opacity-0 rotate-12 transition-all ${durationClass} ease-out`;
      case 'blur-in':
        return `opacity-0 blur-lg transition-all ${durationClass} ease-out`;
      case 'bounce-in':
        return `opacity-0 scale-95 transition-all ${durationClass} bounce`;
      case 'swing-in':
        return `opacity-0 -rotate-3 origin-top transition-all ${durationClass} swing`;
      case 'stagger-fade':
        return `opacity-0 transition-opacity ${durationClass} stagger`;
      default:
        return `opacity-0 transition-opacity ${durationClass} ease-out`;
    }
  };

  return (
    <div 
      ref={ref} 
      className={`${getAnimationClass()} ${className} [&.animate]:opacity-100 [&.animate]:translate-y-0 [&.animate]:translate-x-0 [&.animate]:scale-100 [&.animate]:rotate-0 [&.animate]:blur-0`}
    >
      {children}
    </div>
  );
}
