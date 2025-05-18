'use client';

import { useEffect, useCallback, memo } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

const Analytics = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Memoize the trackPageView function to prevent recreation on each render
  const trackPageView = useCallback((url: string) => {
    if (typeof window !== 'undefined') {
      // Example for console logging page views (for demonstration)
      console.log(`Page view: ${url}`);
      
      // Example of how you would send this to Google Analytics 4
      // if (window.gtag) {
      //   window.gtag('event', 'page_view', {
      //     page_title: document.title,
      //     page_location: url,
      //     page_path: pathname,
      //   });
      // }
    }
  }, [pathname]);

  useEffect(() => {
    // Create URL from pathname and search params
    const url = pathname + searchParams.toString();
    
    // This check ensures we only log consented page views
    if (typeof window !== 'undefined') {
      const hasConsent = localStorage.getItem('cookieConsent') === 'accepted';
      
      if (hasConsent) {
        trackPageView(url);
      }
    }
  }, [pathname, searchParams, trackPageView]);

  return null; // This component doesn't render anything
};

// Export memoized component to prevent unnecessary re-renders
export default memo(Analytics);
