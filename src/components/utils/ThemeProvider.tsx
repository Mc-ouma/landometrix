'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isDarkMode: boolean;
}

// Export ThemeContext so it can be accessed directly
export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('system');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    try {
      if (typeof window !== 'undefined') {
        // Initialize theme from localStorage or default to system
        const savedTheme = localStorage.getItem('theme') as Theme | null;
        if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
          setTheme(savedTheme as Theme);
        }
      }
    } catch (error) {
      console.error('Error initializing theme:', error);
    }
  }, []);

  useEffect(() => {
    if (!mounted || typeof window === 'undefined') return;

    try {
      // Save theme preference to localStorage
      localStorage.setItem('theme', theme);

      // Determine if we should apply dark mode
      let darkModeOn = false;
      
      if (theme === 'system') {
        darkModeOn = window.matchMedia('(prefers-color-scheme: dark)').matches;
      } else {
        darkModeOn = theme === 'dark';
      }
      
      setIsDarkMode(darkModeOn);

      // Apply theme to document
      if (darkModeOn) {
        document.documentElement.classList.add('dark');
        document.documentElement.style.colorScheme = 'dark';
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.style.colorScheme = 'light';
      }
    } catch (error) {
      console.error('Error applying theme:', error);
    }
    
  }, [theme, mounted]);

  // Add listener for system preference changes
  useEffect(() => {
    if (!mounted || theme !== 'system') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches);
      if (e.matches) {
        document.documentElement.classList.add('dark');
        document.documentElement.style.colorScheme = 'dark';
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.style.colorScheme = 'light';
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme, mounted]);

  const value = {
    theme,
    setTheme,
    isDarkMode
  };

  // Avoid hydration mismatch by not rendering anything until mounted
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  
  // During SSR or if provider is not available, provide default values
  if (context === undefined) {
    if (typeof window === 'undefined') {
      // When on server, return default values instead of throwing
      return {
        theme: 'system',
        setTheme: () => {},
        isDarkMode: false
      };
    }
    console.error('useTheme must be used within a ThemeProvider');
    // Return defaults for client as well, but log the error
    return {
      theme: 'system',
      setTheme: (t: Theme) => {
        console.warn('Theme provider not available, setting theme directly');
        if (typeof window !== 'undefined') {
          localStorage.setItem('theme', t);
          if (t === 'dark' || (t === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
        }
      },
      isDarkMode: typeof window !== 'undefined' ? 
        document.documentElement.classList.contains('dark') : 
        false
    };
  }
  
  return context;
};
