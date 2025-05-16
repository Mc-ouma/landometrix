'use client';

import { useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle';

// This is a dedicated client component that wraps the ThemeToggle
// to ensure it only renders on the client side
export default function ThemeClient() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Return placeholder of same size to prevent layout shift
    return <div className="w-14 h-7" />;
  }

  return <ThemeToggle />;
}
