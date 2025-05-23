'use client';

import React, { createContext, useContext, useState, useEffect, memo } from 'react';

interface ThemeContextType {
  isDarkMode: boolean;
}

// Create a constant value object that never changes
const THEME_CONTEXT_VALUE: ThemeContextType = Object.freeze({ 
  isDarkMode: true 
});

// Export ThemeContext so it can be accessed directly
export const ThemeContext = createContext<ThemeContextType>(THEME_CONTEXT_VALUE);

// Internal provider component that's memoized
const ThemeProviderInternal = memo(({ children }: { children: React.ReactNode }) => (
  <ThemeContext.Provider value={THEME_CONTEXT_VALUE}>
    {children}
  </ThemeContext.Provider>
));
ThemeProviderInternal.displayName = 'ThemeProviderInternal';

// The main ThemeProvider with hydration handling
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Apply dark mode and mark as mounted
    document.documentElement.classList.add('dark');
    document.documentElement.style.colorScheme = 'dark';
    setMounted(true);
  }, []);
  
  // Avoid hydration mismatch by not rendering the provider until mounted
  if (!mounted) {
    return <>{children}</>;
  }

  return <ThemeProviderInternal>{children}</ThemeProviderInternal>;
}

// Custom hook to use the theme
export function useTheme() {
  return useContext(ThemeContext);
}
