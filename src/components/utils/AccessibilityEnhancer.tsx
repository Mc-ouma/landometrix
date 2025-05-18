'use client';

import { useEffect, useCallback, memo } from 'react';

// This component enhances accessibility throughout the site
function AccessibilityEnhancer() {
  // Memoize keyboard event handler
  const handleKeyDown = useCallback(() => {
    document.body.classList.add('user-is-tabbing');
  }, []);
  
  // Memoize mouse event handler
  const handleMouseDown = useCallback(() => {
    document.body.classList.remove('user-is-tabbing');
  }, []);
  
  // Memoize the skip link creation function
  const addSkipLink = useCallback(() => {
    // Create skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded';
    skipLink.textContent = 'Skip to main content';
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add ID to main content for skip link target
    const mainContent = document.querySelector('main');
    if (mainContent) {
      mainContent.id = 'main-content';
      mainContent.setAttribute('tabindex', '-1');
    }
  }, []);

  // Memoize focus visibility enhancement function
  const enhanceFocusVisibility = useCallback(() => {
    // Add class to improve focus visibility
    document.body.classList.add('js-focus-visible');
    
    // Add event listeners
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('mousedown', handleMouseDown);
    
    // Return cleanup function
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, [handleKeyDown, handleMouseDown]);
  
  // Memoize active nav links function
  const markActiveNavLinks = useCallback(() => {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href && (href === currentPath || (currentPath !== '/' && href !== '/' && currentPath.startsWith(href)))) {
        link.setAttribute('aria-current', 'page');
      }
    });
  }, []);
  
  useEffect(() => {

    // Initialize all accessibility enhancements
    const cleanup1 = enhanceFocusVisibility();
    addSkipLink();
    markActiveNavLinks();

    return () => {
      cleanup1();
    };
  }, []);

  return null; // This component doesn't render anything visible
};

// Export memoized component to prevent unnecessary re-renders
export default memo(AccessibilityEnhancer);
