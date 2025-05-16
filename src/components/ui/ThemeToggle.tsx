'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useContext, useState, useEffect } from 'react';
import Tooltip from './Tooltip';
import { ThemeContext } from '@/components/utils/ThemeProvider';

const ThemeToggle = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark' | 'system'>('system');
  
  // For initial client-side load before ThemeProvider is ready
  const themeContext = useContext(ThemeContext);

  // Make sure component is mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
    
    if (typeof window !== 'undefined') {
      // Default to system preference if theme isn't available from context yet
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(systemPrefersDark);
      
      // Check localStorage for previously saved preference
      const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'system' | null;
      if (savedTheme) {
        setCurrentTheme(savedTheme);
        setIsDarkMode(savedTheme === 'dark' || (savedTheme === 'system' && systemPrefersDark));
      }
    }
  }, []);
  
  // Use effect to update from context when available
  useEffect(() => {
    if (themeContext && mounted) {
      setIsDarkMode(themeContext.isDarkMode);
      setCurrentTheme(themeContext.theme);
    }
  }, [themeContext, mounted]);
  
  const toggleTheme = () => {
    // Cycle through themes: light -> dark -> system -> light
    let newTheme: 'light' | 'dark' | 'system';
    
    if (currentTheme === 'light') {
      newTheme = 'dark';
    } else if (currentTheme === 'dark') {
      newTheme = 'system';
    } else {
      newTheme = 'light';
    }
    
    // Update local state
    setCurrentTheme(newTheme);
    
    // If context is available, use it to update theme
    if (themeContext) {
      themeContext.setTheme(newTheme);
    } else {
      // Otherwise, handle the logic here
      localStorage.setItem('theme', newTheme);
      
      // Apply theme changes
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const newDarkMode = newTheme === 'dark' || (newTheme === 'system' && systemPrefersDark);
      setIsDarkMode(newDarkMode);
      
      // Apply to HTML element
      if (newDarkMode) {
        document.documentElement.classList.add('dark');
        document.documentElement.style.colorScheme = 'dark';
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.style.colorScheme = 'light';
      }
    }
  };

  const getTooltipText = () => {
    if (currentTheme === 'system') {
      return `Using system preference: ${isDarkMode ? 'Dark' : 'Light'} mode`;
    } else if (currentTheme === 'dark') {
      return 'Dark mode active';
    } else {
      return 'Light mode active';
    }
  };

  // Don't render anything until mounted to prevent hydration mismatch
  if (!mounted) {
    return <div className="w-14 h-7" aria-hidden="true" />;
  }

  return (
    <Tooltip content={getTooltipText()}>
      <button
        onClick={toggleTheme}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative flex items-center justify-center w-14 h-7 rounded-full bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-900 dark:to-indigo-900 transition-all duration-300 shadow-inner overflow-hidden hover:shadow-md active:scale-95"
        aria-label={
          currentTheme === 'system' 
            ? "Using system theme, click to switch to light mode" 
            : isDarkMode
              ? "Using dark mode, click to switch to system mode"
              : "Using light mode, click to switch to dark mode"
        }
      >
        <div className="absolute inset-0 flex items-center justify-between px-2">
          <AnimatePresence mode="wait" initial={false}>
            {currentTheme === 'system' ? (
              <motion.svg
                key="system"
                className="w-4 h-4 text-gray-600 dark:text-gray-300"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                <path d="M4 6a2 2 0 012-2h12a2 2 0 012 2v7a2 2 0 01-2 2H6a2 2 0 01-2-2V6z" />
                <path d="M14 15a1 1 0 10-2 0v3a1 1 0 102 0v-3z" />
              </motion.svg>
            ) : isDarkMode ? (
              <motion.svg
                key="sun"
                className="w-4 h-4 text-yellow-300"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </motion.svg>
            ) : (
              <motion.svg
                key="moon"
                className="w-4 h-4 text-blue-600"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                initial={{ opacity: 0, rotate: 90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: -90 }}
                transition={{ duration: 0.2 }}
              >
                <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </motion.svg>
            )}
          </AnimatePresence>
        </div>
        
        <motion.div
          className="absolute w-5 h-5 rounded-full bg-white shadow-lg flex items-center justify-center"        animate={{ 
          x: isDarkMode ? "0.875rem" : currentTheme === 'system' ? "0rem" : "-0.875rem",
          backgroundColor: isDarkMode 
            ? "rgba(255, 255, 255, 0.9)" 
            : currentTheme === 'system' 
              ? "rgba(255, 255, 255, 0.85)"
              : "rgba(255, 255, 255, 1)",
          scale: isHovered ? 1.1 : 1
        }}
        transition={{ 
          type: "spring", 
          stiffness: 500, 
          damping: 30 
        }}
      >
        {currentTheme === 'system' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
            />
          )}
        </motion.div>
      </button>
    </Tooltip>
  );
};

export default ThemeToggle;
