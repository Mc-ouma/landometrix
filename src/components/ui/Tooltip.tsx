'use client';

import { useState, useEffect, ReactNode, useCallback, useRef, memo } from 'react';

interface TooltipProps {
  children: ReactNode;
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
}

const Tooltip = ({ 
  children, 
  content,
  position = 'top',
  delay = 300
}: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [mounted, setMounted] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Make sure we're in the browser before any DOM manipulation
  useEffect(() => {
    setMounted(true);
    
    // Clean up any lingering timers
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  // Memoize event handlers to prevent unnecessary re-renders
  const showTip = useCallback(() => {
    if (!mounted) return;
    
    timerRef.current = setTimeout(() => {
      setShouldRender(true);
      setTimeout(() => setIsVisible(true), 20);
    }, delay);
  }, [mounted, delay]);

  const hideTip = useCallback(() => {
    if (!mounted) return;
    
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setIsVisible(false);
    setTimeout(() => setShouldRender(false), 200);
  }, [mounted]);
  
  const positionClasses = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2 mb-1',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 translate-y-2 mt-1',
    left: 'right-full top-1/2 transform -translate-y-1/2 -translate-x-2 mr-1',
    right: 'left-full top-1/2 transform -translate-y-1/2 translate-x-2 ml-1'
  };
  
  const arrowClasses = {
    top: 'bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full border-t-zinc-800 dark:border-t-zinc-200 border-x-transparent border-b-transparent',
    bottom: 'top-0 left-1/2 transform -translate-x-1/2 -translate-y-full border-b-zinc-800 dark:border-b-zinc-200 border-x-transparent border-t-transparent',
    left: 'right-0 top-1/2 transform translate-x-full -translate-y-1/2 border-l-zinc-800 dark:border-l-zinc-200 border-y-transparent border-r-transparent',
    right: 'left-0 top-1/2 transform -translate-x-full -translate-y-1/2 border-r-zinc-800 dark:border-r-zinc-200 border-y-transparent border-l-transparent'
  };

  // Return the children as-is if not mounted yet (prevents hydration issues)
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <div className="relative inline-block" onMouseEnter={showTip} onMouseLeave={hideTip}>
      {children}
      
      {shouldRender && (
        <div className={`absolute z-50 w-max max-w-xs ${positionClasses[position]}`}>
          <div 
            className={`
              pointer-events-none bg-zinc-800 dark:bg-zinc-200 text-white dark:text-zinc-800 
              px-2 py-1 rounded text-xs font-medium whitespace-nowrap transition-opacity duration-200 shadow-lg
              ${isVisible ? 'opacity-100' : 'opacity-0'}
            `}
          >
            {content}
            <div className={`absolute w-0 h-0 border-4 ${arrowClasses[position]}`} />
          </div>
        </div>
      )}
    </div>
  );
};

// Export memoized component to prevent unnecessary re-renders
export default memo(Tooltip);
