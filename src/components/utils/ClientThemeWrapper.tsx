'use client';

import React, { memo } from 'react';
import { ThemeProvider } from './ThemeProvider';

// Pure component wrapper - doesn't add any state, just forwards to ThemeProvider
const ClientThemeWrapper = memo(({ children }: { children: React.ReactNode }) => (
  <ThemeProvider>{children}</ThemeProvider>
));

// Add display name for better debugging in React DevTools
ClientThemeWrapper.displayName = 'ClientThemeWrapper';

export default ClientThemeWrapper;
