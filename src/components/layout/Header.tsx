'use client';

import Link from 'next/link';
import { useState } from 'react';
import ThemeClient from '@/components/ui/ThemeClient';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="py-4 px-6 md:px-12 bg-surface-1 dark:bg-surface-1 shadow-md fixed w-full z-10 backdrop-blur-sm bg-opacity-95 dark:bg-opacity-95">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary dark:from-primary-light dark:to-secondary-light bg-clip-text text-transparent">
            Landometrix
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/" className="text-gray-800 dark:text-gray-200 hover:text-primary dark:hover:text-primary-light font-medium">
            Home
          </Link>
          <Link href="/services" className="text-gray-800 dark:text-gray-200 hover:text-primary dark:hover:text-primary-light font-medium">
            Services
          </Link>
          <Link href="/about" className="text-gray-800 dark:text-gray-200 hover:text-primary dark:hover:text-primary-light font-medium">
            About
          </Link>
          <Link href="/contact" className="text-gray-800 dark:text-gray-200 hover:text-primary dark:hover:text-primary-light font-medium">
            Contact
          </Link>
          <Link href="/showcase" className="text-gray-800 dark:text-gray-200 hover:text-primary dark:hover:text-primary-light font-medium">
            Showcase
          </Link>
          <ThemeClient />
          <Link 
            href="/contact" 
            className="bg-primary hover:bg-primary-hover dark:bg-primary-dark dark:hover:bg-primary text-white px-5 py-2 rounded-md transition-colors shadow-sm hover:shadow-md"
          >
            Get Started
          </Link>
        </nav>

        <div className="flex items-center gap-4 md:hidden">
          <ThemeClient />
          
          {/* Mobile Menu Button */}
          <button 
            className="text-gray-800 dark:text-gray-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden pt-4 pb-3 px-6 space-y-3 bg-surface-1 dark:bg-surface-1 border-t border-gray-200 dark:border-gray-800 animate-fadeIn">
          <Link 
            href="/" 
            className="block text-gray-800 dark:text-gray-200 hover:text-primary dark:hover:text-primary-light py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            href="/services" 
            className="block text-gray-800 dark:text-gray-200 hover:text-primary dark:hover:text-primary-light py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Services
          </Link>
          <Link 
            href="/about" 
            className="block text-gray-800 dark:text-gray-200 hover:text-primary dark:hover:text-primary-light py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </Link>
          <Link 
            href="/contact" 
            className="block text-gray-800 dark:text-gray-200 hover:text-primary dark:hover:text-primary-light py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </Link>
          <Link 
            href="/showcase" 
            className="block text-gray-800 dark:text-gray-200 hover:text-primary dark:hover:text-primary-light py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Showcase
          </Link>
          <Link 
            href="/contact" 
            className="block bg-primary hover:bg-primary-hover dark:bg-primary-dark dark:hover:bg-primary text-white px-4 py-2 rounded-md w-full text-center mt-3 shadow-sm"
            onClick={() => setIsMenuOpen(false)}
          >
            Get Started
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Header;