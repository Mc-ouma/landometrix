'use client';

import { useEffect } from 'react';

// This component enhances accessibility throughout the site
export default function AccessibilityEnhancer() {
  useEffect(() => {
    // Skip to content functionality
    const addSkipLink = () => {
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
    };

    // Improve focus visibility
    const enhanceFocusVisibility = () => {
      // Add class to improve focus visibility
      document.body.classList.add('js-focus-visible');
      
      // Track whether the user is using keyboard navigation
      let usingKeyboard = false;
      
      const handleKeyDown = () => {
        usingKeyboard = true;
        document.body.classList.add('user-is-tabbing');
      };
      
      const handleMouseDown = () => {
        usingKeyboard = false;
        document.body.classList.remove('user-is-tabbing');
      };
      
      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('mousedown', handleMouseDown);
      
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('mousedown', handleMouseDown);
      };
    };

    // Add aria-current="page" to active nav links
    const markActiveNavLinks = () => {
      const currentPath = window.location.pathname;
      const navLinks = document.querySelectorAll('nav a');
      
      navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && (href === currentPath || (currentPath !== '/' && href !== '/' && currentPath.startsWith(href)))) {
          link.setAttribute('aria-current', 'page');
        }
      });
    };

    // Initialize all accessibility enhancements
    const cleanup1 = enhanceFocusVisibility();
    addSkipLink();
    markActiveNavLinks();

    return () => {
      cleanup1();
    };
  }, []);

  return null; // This component doesn't render anything visible
}
