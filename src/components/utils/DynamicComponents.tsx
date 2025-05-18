'use client';

import { memo } from 'react';
import dynamic from 'next/dynamic';

// Lazy load non-critical UI components with ssr:false
const ScrollToTop = dynamic(() => import("@/components/ui/ScrollToTop"), { ssr: false });
const CookieConsent = dynamic(() => import("@/components/ui/CookieConsent"), { ssr: false });
const Analytics = dynamic(() => import("@/components/utils/Analytics"), { ssr: false });
const AccessibilityEnhancer = dynamic(() => import("@/components/utils/AccessibilityEnhancer"), { ssr: false });

// Client component to safely handle dynamic imports with ssr:false
const DynamicComponents = memo(() => {
  return (
    <>
      <Analytics />
      <AccessibilityEnhancer />
      <ScrollToTop />
      <CookieConsent />
    </>
  );
});

DynamicComponents.displayName = 'DynamicComponents';

export default DynamicComponents;
