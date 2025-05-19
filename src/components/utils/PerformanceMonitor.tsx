'use client';

import { useState, useEffect, memo } from 'react';

interface PerformanceMetrics {
  lcp: number | null; // Largest Contentful Paint
  fid: number | null; // First Input Delay
  cls: number | null; // Cumulative Layout Shift
  fcp: number | null; // First Contentful Paint
  ttfb: number | null; // Time to First Byte
}

/**
 * Component that monitors and logs Core Web Vitals and other performance metrics
 * Only used in development or when explicitly enabled
 */
const PerformanceMonitor = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    lcp: null,
    fid: null,
    cls: null,
    fcp: null,
    ttfb: null
  });
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Only run in development or when ?debug=true is in URL
    const isDebug = 
      process.env.NODE_ENV === 'development' ||
      (typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('debug') === 'true');
    
    if (!isDebug) return;
    
    // Show debug panel
    setIsVisible(true);
    
    // Initialize performance observer
    try {
      // Load the web vitals polyfill for older browsers
      import('web-vitals').then(({ getLCP, getFID, getCLS, getFCP, getTTFB }) => {
        getLCP(metric => {
          setMetrics(prev => ({ ...prev, lcp: metric.value }));
          console.log('LCP:', metric.value);
        });
        
        getFID(metric => {
          setMetrics(prev => ({ ...prev, fid: metric.value }));
          console.log('FID:', metric.value);
        });
        
        getCLS(metric => {
          setMetrics(prev => ({ ...prev, cls: metric.value }));
          console.log('CLS:', metric.value);
        });
        
        getFCP(metric => {
          setMetrics(prev => ({ ...prev, fcp: metric.value }));
          console.log('FCP:', metric.value);
        });
        
        getTTFB(metric => {
          setMetrics(prev => ({ ...prev, ttfb: metric.value }));
          console.log('TTFB:', metric.value);
        });
      });
      
      // Get Performance Navigation and Resource Timing details
      if ('performance' in window) {
        // Log navigation timing
        setTimeout(() => {
          const perfData = window.performance.timing;
          const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
          console.log('Total page load time:', pageLoadTime / 1000, 'seconds');
          
          // DOM Content Loaded time
          const domContentLoaded = perfData.domContentLoadedEventEnd - perfData.navigationStart;
          console.log('DOMContentLoaded:', domContentLoaded / 1000, 'seconds');
          
          // Time to first byte
          const ttfb = perfData.responseStart - perfData.navigationStart;
          console.log('TTFB:', ttfb / 1000, 'seconds');
        }, 0);
      }
      
      // Log resource timing
      setTimeout(() => {
        if ('performance' in window && window.performance.getEntriesByType) {
          const resources = window.performance.getEntriesByType('resource');
          
          // Group resources by type
          const resourcesByType = resources.reduce((acc: Record<string, any[]>, resource: any) => {
            const type = resource.initiatorType;
            if (!acc[type]) acc[type] = [];
            acc[type].push(resource);
            return acc;
          }, {});
          
          // Log slow resources (taking more than 500ms)
          const slowResources = resources.filter((r: any) => r.duration > 500);
          if (slowResources.length > 0) {
            console.warn('Slow resources (>500ms):', slowResources.map((r: any) => ({
              name: r.name,
              duration: r.duration.toFixed(2) + 'ms',
              type: r.initiatorType
            })));
          }
          
          // Log resource stats
          console.log('Resource timing by type:', 
            Object.entries(resourcesByType).map(([type, items]) => ({
              type,
              count: items.length,
              totalSize: items.reduce((sum, item: any) => sum + (item.transferSize || 0), 0) / 1024,
              avgDuration: items.reduce((sum, item: any) => sum + item.duration, 0) / items.length
            }))
          );
        }
      }, 1000);
      
    } catch (e) {
      console.error('Performance monitoring error:', e);
    }
  }, []);
  
  // Don't render anything if not in debug mode
  if (!isVisible) return null;
  
  // Determine performance scores
  const getLCPScore = (lcp: number | null) => {
    if (lcp === null) return 'Loading...';
    return lcp < 2500 ? 'Good' : lcp < 4000 ? 'Needs Improvement' : 'Poor';
  };
  
  const getFIDScore = (fid: number | null) => {
    if (fid === null) return 'Waiting for input...';
    return fid < 100 ? 'Good' : fid < 300 ? 'Needs Improvement' : 'Poor';
  };
  
  const getCLSScore = (cls: number | null) => {
    if (cls === null) return 'Measuring...';
    return cls < 0.1 ? 'Good' : cls < 0.25 ? 'Needs Improvement' : 'Poor';
  };

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-4 rounded-lg z-50 text-xs font-mono shadow-lg backdrop-blur-sm">
      <div className="flex justify-between mb-2">
        <h4 className="font-semibold">Performance Monitor</h4>
        <button 
          onClick={() => setIsVisible(false)} 
          className="text-gray-400 hover:text-white"
        >
          ✕
        </button>
      </div>
      <table className="w-full">
        <tbody>
          <tr>
            <td className="pr-4">LCP:</td>
            <td className={`
              ${metrics.lcp === null ? 'text-gray-400' : 
                metrics.lcp < 2500 ? 'text-green-400' : 
                metrics.lcp < 4000 ? 'text-yellow-400' : 'text-red-400'}
            `}>
              {metrics.lcp ? `${metrics.lcp.toFixed(2)}ms` : 'Loading...'}
            </td>
            <td className="text-right">
              {getLCPScore(metrics.lcp)}
            </td>
          </tr>
          <tr>
            <td className="pr-4">FID:</td>
            <td className={`
              ${metrics.fid === null ? 'text-gray-400' : 
                metrics.fid < 100 ? 'text-green-400' : 
                metrics.fid < 300 ? 'text-yellow-400' : 'text-red-400'}
            `}>
              {metrics.fid ? `${metrics.fid.toFixed(2)}ms` : 'Waiting...'}
            </td>
            <td className="text-right">
              {getFIDScore(metrics.fid)}
            </td>
          </tr>
          <tr>
            <td className="pr-4">CLS:</td>
            <td className={`
              ${metrics.cls === null ? 'text-gray-400' : 
                metrics.cls < 0.1 ? 'text-green-400' : 
                metrics.cls < 0.25 ? 'text-yellow-400' : 'text-red-400'}
            `}>
              {metrics.cls ? metrics.cls.toFixed(3) : 'Measuring...'}
            </td>
            <td className="text-right">
              {getCLSScore(metrics.cls)}
            </td>
          </tr>
          <tr>
            <td className="pr-4">FCP:</td>
            <td className={`
              ${metrics.fcp === null ? 'text-gray-400' : 
                metrics.fcp < 1800 ? 'text-green-400' : 
                metrics.fcp < 3000 ? 'text-yellow-400' : 'text-red-400'}
            `}>
              {metrics.fcp ? `${metrics.fcp.toFixed(2)}ms` : 'Loading...'}
            </td>
          </tr>
          <tr>
            <td className="pr-4">TTFB:</td>
            <td className={`
              ${metrics.ttfb === null ? 'text-gray-400' : 
                metrics.ttfb < 800 ? 'text-green-400' : 
                metrics.ttfb < 1800 ? 'text-yellow-400' : 'text-red-400'}
            `}>
              {metrics.ttfb ? `${metrics.ttfb.toFixed(2)}ms` : 'Loading...'}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default memo(PerformanceMonitor);
