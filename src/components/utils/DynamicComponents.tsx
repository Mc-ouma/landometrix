'use client';

import { memo, useEffect, useState, lazy, Suspense } from 'react';
import dynamic from 'next/dynamic';

// Import performance monitor
const PerformanceMonitor = dynamic(() => import("@/components/utils/PerformanceMonitor"), {
  ssr: false,
  loading: () => null
});

// Lazy load non-critical UI components with optimized loading strategy
const ScrollToTop = dynamic(() => import("@/components/ui/ScrollToTop"), { 
  ssr: false,
  loading: () => null // Remove loading fallback to reduce unnecessary renders
});

// Load cookie consent with a slight delay to prioritize main content rendering
const CookieConsent = dynamic(() => 
  new Promise(resolve => {
    // Use requestIdleCallback for the lowest priority components
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      (window as any).requestIdleCallback(
        () => resolve(import("@/components/ui/CookieConsent")),
        { timeout: 3000 }
      );
    } else {
      // Fallback with timeout
      setTimeout(() => resolve(import("@/components/ui/CookieConsent")), 2500);
    }
  }) as Promise<{ default: React.ComponentType }>, 
  { ssr: false }
);

// Load analytics with low priority 
const Analytics = dynamic(() => import("@/components/utils/Analytics"), { 
  ssr: false,
  loading: () => null 
});

// Load accessibility features with lower priority
const AccessibilityEnhancer = dynamic(() => import("@/components/utils/AccessibilityEnhancer"), { 
  ssr: false,
  loading: () => null
});

// Client component to safely handle dynamic imports with ssr:false
const DynamicComponents = memo(() => {
  // Only load non-critical components after page is fully loaded
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  // Track if this is the first render
  const [isFirstRender, setIsFirstRender] = useState(true);
  
  // Use different loading strategies based on device performance
  const [devicePerformance, setDevicePerformance] = useState<'low'|'medium'|'high'>('high');
  
  // Detect device performance once on mount
  useEffect(() => {
    // First render completed
    setIsFirstRender(false);
    
    // Check if this is a mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
    
    // Check device memory if available
    const memory = (navigator as any).deviceMemory;
    
    if (isMobile) {
      setDevicePerformance('low');
    } else if (memory && memory < 4) {
      setDevicePerformance('medium');
    }
    
    // Check if window exists (client-side only)
    if (typeof window !== 'undefined') {
      if (document.readyState === 'complete') {
        setIsPageLoaded(true);
      } else {
        // Set up load event listener
        const handleLoad = () => setIsPageLoaded(true);
        window.addEventListener('load', handleLoad);
        return () => window.removeEventListener('load', handleLoad);
      }
    }
  }, []);

  // Don't render anything during first render to speed up initial load
  if (isFirstRender) return null;
  
  // For low performance devices, delay loading components even more
  if (devicePerformance === 'low' && !isPageLoaded) {
    return null;
  }

  return (
    <Suspense fallback={null}>
      <>
        {/* Only load analytics after page is fully loaded */}
        {isPageLoaded && <Analytics />}
        
        {/* Load accessibility features based on device performance */}
        {(devicePerformance !== 'low' || isPageLoaded) && <AccessibilityEnhancer />}
        
        {/* Always show scroll to top after initial render */}
        <ScrollToTop />
        
        {/* Only show cookie consent after page is fully loaded */}
        {isPageLoaded && <CookieConsent />}
        
        {/* Performance monitoring in development or debug mode */}
        {(process.env.NODE_ENV === 'development' || 
         (typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('debug') === 'true')) && 
         <PerformanceMonitor />}
      </>
    </Suspense>
  );
});

DynamicComponents.displayName = 'DynamicComponents';

export default DynamicComponents;
