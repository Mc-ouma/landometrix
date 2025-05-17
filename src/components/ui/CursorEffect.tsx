'use client';

import { useEffect, useState } from 'react';

type CursorEffectProps = {
  color?: string;
  size?: number;
  trailLength?: number;
  trailColor?: string;
  showOnMobile?: boolean;
};

export default function CursorEffect({ 
  color = 'rgba(37, 99, 235, 0.5)', // Default is a semi-transparent blue
  size = 40,
  trailLength = 8,
  trailColor = 'rgba(59, 130, 246, 0.2)', // Default is a lighter semi-transparent blue
  showOnMobile = false,
}: CursorEffectProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [trail, setTrail] = useState<Array<{ x: number, y: number }>>([]);
  const [isPointer, setIsPointer] = useState(false);
  const [isTouching, setIsTouching] = useState(false);

  useEffect(() => {
    // Don't show custom cursor on touch devices unless explicitly enabled
    if ('ontouchstart' in window && !showOnMobile) {
      return;
    }

    const updateCursorPosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      setTrail(prevTrail => {
        const newTrail = [...prevTrail, { x: e.clientX, y: e.clientY }];
        if (newTrail.length > trailLength) {
          return newTrail.slice(newTrail.length - trailLength);
        }
        return newTrail;
      });

      // Check if cursor is over a clickable element
      const target = e.target as HTMLElement;
      const isClickable = target.tagName === 'BUTTON' || 
                        target.tagName === 'A' || 
                        target.tagName === 'INPUT' ||
                        target.tagName === 'SELECT' ||
                        target.tagName === 'TEXTAREA' ||
                        target.closest('button') ||
                        target.closest('a') ||
                        target.closest('input') ||
                        target.closest('select') ||
                        target.closest('textarea');

      setIsPointer(isClickable);
    };

    const showCursor = () => setIsVisible(true);
    const hideCursor = () => setIsVisible(false);
    
    // Touch events for mobile when enabled
    const handleTouchStart = (e: TouchEvent) => {
      if (showOnMobile) {
        setIsTouching(true);
        const touch = e.touches[0];
        setPosition({ x: touch.clientX, y: touch.clientY });
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (showOnMobile && isTouching) {
        const touch = e.touches[0];
        setPosition({ x: touch.clientX, y: touch.clientY });
      }
    };

    const handleTouchEnd = () => {
      if (showOnMobile) {
        setIsTouching(false);
      }
    };

    document.addEventListener('mousemove', updateCursorPosition);
    document.addEventListener('mouseenter', showCursor);
    document.addEventListener('mouseleave', hideCursor);
    
    if (showOnMobile) {
      document.addEventListener('touchstart', handleTouchStart);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleTouchEnd);
    }
    
    // Hide the default cursor
    document.documentElement.style.cursor = 'none';
    
    // Clean up
    return () => {
      document.removeEventListener('mousemove', updateCursorPosition);
      document.removeEventListener('mouseenter', showCursor);
      document.removeEventListener('mouseleave', hideCursor);
      
      if (showOnMobile) {
        document.removeEventListener('touchstart', handleTouchStart);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      }
      
      // Restore default cursor
      document.documentElement.style.cursor = '';
    };
  }, [trailLength, showOnMobile, isTouching]);

  if (!isVisible && !isTouching) return null;

  return (
    <>
      {/* Cursor trails */}
      {trail.map((point, index) => (
        <div
          key={index}
          className="fixed pointer-events-none z-[9999] rounded-full mix-blend-overlay transition-opacity"
          style={{
            left: `${point.x}px`,
            top: `${point.y}px`,
            width: `${size * 0.8 * (index / trail.length + 0.3)}px`,
            height: `${size * 0.8 * (index / trail.length + 0.3)}px`,
            backgroundColor: trailColor,
            opacity: index / trail.length,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}
      
      {/* Main cursor */}
      <div
        className={`fixed pointer-events-none z-[10000] rounded-full transition-all duration-100 ease-out ${
          isPointer ? 'scale-[0.5] mix-blend-difference' : 'scale-100 mix-blend-overlay'
        }`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: `${size}px`,
          height: `${size}px`,
          backgroundColor: color,
          transform: 'translate(-50%, -50%)',
          boxShadow: isPointer ? '0 0 20px 5px rgba(59, 130, 246, 0.5)' : 'none',
        }}
      />
    </>
  );
}
