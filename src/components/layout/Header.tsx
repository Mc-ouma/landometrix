'use client';

import Link from 'next/link';
import { useState, useCallback, memo, useEffect } from 'react';
// ThemeClient import removed as it's not being used
import { usePathname } from 'next/navigation';

// Define navigation links outside component to prevent recreation on each render
const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' }
];

// CSS constants to avoid duplication
const DESKTOP_LINK_CLASS = "text-gray-800 dark:text-gray-200 hover:text-primary dark:hover:text-primary-light font-medium";
const MOBILE_LINK_CLASS = "block text-gray-800 dark:text-gray-200 hover:text-primary dark:hover:text-primary-light py-2";

// Memoize menu button icons to prevent unnecessary re-renders
const CloseIcon = memo(() => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
));
CloseIcon.displayName = 'CloseIcon';

const MenuIcon = memo(() => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
));
MenuIcon.displayName = 'MenuIcon';

// Memoize the GetStarted button component
const GetStartedButton = memo(({ isMobile = false, onClick = undefined }: { isMobile?: boolean, onClick?: () => void }) => (
  <Link 
    href="/contact" 
    className={`${isMobile ? 'block w-full text-center mt-3' : ''} bg-primary hover:bg-primary-hover dark:bg-primary-dark dark:hover:bg-primary text-white px-${isMobile ? '4' : '5'} py-2 rounded-md transition-colors shadow-sm ${isMobile ? '' : 'hover:shadow-md'}`}
    onClick={onClick}
  >
    Get Started
  </Link>
));
GetStartedButton.displayName = 'GetStartedButton';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  
  // Memoized toggle handler to prevent unnecessary re-renders
  const toggleMenu = useCallback(() => setIsMenuOpen(prev => !prev), []);
  
  // Memoized close handler
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);
  
  // Effect to close menu when route changes
  useEffect(() => {
    if (isMenuOpen) setIsMenuOpen(false);
  }, [pathname, isMenuOpen]);

  return (
    <header className="py-4 px-6 md:px-12 bg-surface-1 shadow-md fixed w-full z-10 backdrop-blur-sm bg-opacity-95">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary dark:from-primary-light dark:to-secondary-light bg-clip-text text-transparent">
            Landometrix
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {NAV_LINKS.map(({ href, label }) => (
            <Link 
              key={href}
              href={href} 
              className={DESKTOP_LINK_CLASS}
            >
              {label}
            </Link>
          ))}
          
          {/* ThemeClient removed - component is unused */}
          <GetStartedButton />
        </nav>

        <div className="flex items-center gap-4 md:hidden">
          {/* ThemeClient removed - component is unused */}
          
          {/* Mobile Menu Button */}
          <button 
            className="text-gray-800 dark:text-gray-200"
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation - Only render when needed */}
      {isMenuOpen && (
        <nav className="md:hidden pt-4 pb-3 px-6 space-y-3 bg-surface-1 border-t border-gray-200 dark:border-gray-800 animate-fadeIn">
          {NAV_LINKS.map(({ href, label }) => (
            <Link 
              key={href}
              href={href} 
              className={MOBILE_LINK_CLASS}
              onClick={closeMenu}
            >
              {label}
            </Link>
          ))}
          
          <GetStartedButton isMobile={true} onClick={closeMenu} />
        </nav>
      )}
    </header>
  );
};

// Export memoized component to prevent unnecessary re-renders from parent components
export default memo(Header);