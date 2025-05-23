'use client';

import { memo, useEffect, useState } from 'react';
import Link from 'next/link';
import AnimateOnScroll from './AnimateOnScroll';
// Use optimized background for better performance
import AnimatedBackgroundOptimized from './AnimatedBackgroundOptimized';
import OptimizedImage from './OptimizedImage';

const HeroSection = () => {
  // Detect device performance to optimize animations
  const [devicePerformance, setDevicePerformance] = useState<'low'|'medium'|'high'>('high');
  
  useEffect(() => {
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
  }, []);
  
  return (
    <div className="relative overflow-hidden min-h-screen flex items-center pt-28 md:pt-32">
      <AnimatedBackgroundOptimized 
        particleCount={devicePerformance === 'low' ? 40 : devicePerformance === 'medium' ? 60 : 80}
        performanceMode={devicePerformance !== 'high'}
        highQualityEffects={devicePerformance === 'high'}
        connectionLines={devicePerformance !== 'low'}
      />
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24 lg:py-32 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="bg-white/10 dark:bg-gray-900/20 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-white/10">
            <AnimateOnScroll animation="fade-in-up">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6">
                <span className="block text-white drop-shadow-md">Transform Your</span>
                <span className="block bg-gradient-to-r from-blue-400 to-teal-300 bg-clip-text text-transparent drop-shadow">
                  Data & Web Presence
                </span>
              </h1>
            </AnimateOnScroll>
            
            <AnimateOnScroll animation="fade-in-up" delay={200}>
              <p className="text-xl text-white/90 mb-8 max-w-lg text-shadow">
                Landometrix delivers cutting-edge data analysis and professional web services to help your business grow.
              </p>
            </AnimateOnScroll>
            
            <AnimateOnScroll animation="fade-in-up" delay={400}>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/services" 
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-md text-center transition-colors"
                >
                  Our Services
                </Link>
                <Link href="/contact" 
                  className="bg-white hover:bg-gray-100 text-blue-600 font-medium px-8 py-3 rounded-md border border-blue-200 text-center transition-colors dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                >
                  Contact Us
                </Link>
              </div>
            </AnimateOnScroll>
          </div>
          
          <div className="hidden lg:block">
            <AnimateOnScroll animation="fade-in" delay={300}>
              <div className="relative">
                {/* Optimized background elements using CSS instead of divs for better performance */}
                <div className="absolute -top-6 -right-6 w-72 h-72 bg-blue-500 opacity-20 rounded-full filter blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-teal-500 opacity-20 rounded-full filter blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
                <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden p-1 border border-white/20">
                  <div className="rounded-xl overflow-hidden">
                    <div className="aspect-[4/3] bg-gradient-to-br from-blue-500 to-teal-400 flex items-center justify-center relative">
                      {/* Use optimized image with proper loading strategy */}
                      <OptimizedImage
                        src="/images/dashboard-preview.webp"
                        lowQualitySrc="/images/dashboard-preview-low.webp"
                        fallbackSrc="/images/dashboard-preview-fallback.jpg"
                        alt="Landometrix Dashboard Preview"
                        width={600}
                        height={450}
                        className="w-full h-full object-cover"
                        priority={true} // Load immediately for above-the-fold content
                        quality={85}
                      />
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.2)_0%,_rgba(255,255,255,0)_60%)] animate-ping-slow"></div>
                      <svg className="w-32 h-32 text-white/90 relative z-10 animate-float" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </div>
    </div>
  );
};

// Export memoized component to prevent unnecessary re-renders
export default memo(HeroSection);
