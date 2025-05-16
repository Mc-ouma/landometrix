'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // This function would typically integrate with your analytics provider 
    // such as Google Analytics, Plausible, Fathom, etc.
    const trackPageView = (url: string) => {
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
    };

    // Create URL from pathname and search params
    const url = pathname + searchParams.toString();
    
    // This check ensures we only log consented page views
    const hasConsent = localStorage.getItem('cookieConsent') === 'accepted';
    
    if (hasConsent) {
      trackPageView(url);
    }
    
  }, [pathname, searchParams]);

  return null; // This component doesn't render anything
}
