'use client';

import { memo } from 'react';
import dynamic from 'next/dynamic';

// Lazy load non-critical UI components with ssr:false
const ScrollToTop = dynamic(() => import("@/components/ui/ScrollToTop"), { ssr: false });
const CookieConsent = dynamic(() => import("@/components/ui/CookieConsent"), { ssr: false });
const CursorEffect = dynamic(() => import("@/components/ui/CursorEffect"), { ssr: false });
const Analytics = dynamic(() => import("@/components/utils/Analytics"), { ssr: false });
const AccessibilityEnhancer = dynamic(() => import("@/components/utils/AccessibilityEnhancer"), { ssr: false });

interface DynamicComponentsProps {
  cursorEffectColor?: string;
  cursorEffectTrailColor?: string;
}

// Client component to safely handle dynamic imports with ssr:false
const DynamicComponents = memo(({ 
  cursorEffectColor = 'rgba(37, 99, 235, 0.5)',  
  cursorEffectTrailColor = 'rgba(59, 130, 246, 0.2)'
}: DynamicComponentsProps) => {
  return (
    <>
      <Analytics />
      <AccessibilityEnhancer />
      <ScrollToTop />
      <CookieConsent />
      <CursorEffect 
        color={cursorEffectColor} 
        trailColor={cursorEffectTrailColor} 
      />
    </>
  );
});

DynamicComponents.displayName = 'DynamicComponents';

export default DynamicComponents;
