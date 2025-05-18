'use client';

import React, { memo } from 'react';
import { ThemeProvider } from './ThemeProvider';

// Memoized wrapper component to prevent unnecessary re-renders
function ClientThemeWrapper({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  // The mounted state is now handled in ThemeProvider itself

  // During SSR and first client render, use a simplified version
  // This prevents hydration mismatch errors and ensures we only 
  // apply theme classes once the component is properly mounted
  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  );
}

// Export memoized component to prevent unnecessary re-renders
export default memo(ClientThemeWrapper);
