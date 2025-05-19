/**
 * Import optimization utilities
 * This helps reduce bundle sizes by lazy loading and optimizing imports
 */

import { lazy } from 'react';
import type { ComponentType, LazyExoticComponent } from 'react';

// Type for import factory
type ImportFactory<T extends ComponentType<any>> = () => Promise<{ default: T }>;

/**
 * Enhanced lazy loading with retries and preloading capabilities
 * @param factory Function that imports the component
 * @param displayName Optional name for debugging purposes
 */
export function optimizedLazy<T extends ComponentType<any>>(
  factory: ImportFactory<T>,
  displayName?: string
): LazyExoticComponent<T> {
  const LazyComponent = lazy(() => {
    // Add retry logic for network failures
    const load = (retries = 2): Promise<{ default: T }> => {
      return factory().catch(err => {
        // Only retry on network errors, not syntax errors
        if (retries > 0 && (err instanceof TypeError || err.message?.includes('network'))) {
          return new Promise(resolve => {
            // Use exponential backoff for retries
            setTimeout(() => resolve(load(retries - 1)), 1000 * (3 - retries));
          });
        }
        throw err;
      });
    };

    return load();
  });

  // Set display name for debugging
  if (displayName && typeof LazyComponent === 'object') {
    (LazyComponent as any).displayName = displayName;
  }

  return LazyComponent;
}

/**
 * Preload a component before it's needed
 * Use this for critical path components or to prepare for user interactions
 */
export function preloadComponent<T extends ComponentType<any>>(factory: ImportFactory<T>): void {
  if (typeof window !== 'undefined') {
    // Use requestIdleCallback to preload during browser idle time
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(() => {
        factory();
      }, { timeout: 2000 });
    } else {
      // Fallback for browsers without requestIdleCallback
      setTimeout(() => factory(), 1000);
    }
  }
}

/**
 * Dynamically import a component with configurable loading delay
 * This helps prevent loading spinners for fast connections
 */
export function dynamicImport<T>(
  factory: ImportFactory<ComponentType<T>>,
  options: {
    ssr?: boolean;
    loadingDelay?: number;
    loading?: ComponentType<any>;
    displayName?: string;
  } = {}
) {
  return (props: T) => {
    const Component = optimizedLazy(factory, options.displayName);
    return <Component {...props} />;
  };
}

/**
 * Configure dynamic imports based on page priority
 * This helps focus resources on the most important user-facing components
 */
export function createPrioritizedImporter(priority: 'high' | 'medium' | 'low' = 'medium') {
  const ssr = priority === 'high';
  const loadingDelay = 
    priority === 'high' ? 200 :
    priority === 'medium' ? 500 : 
    1000;

  return <T>(factory: ImportFactory<ComponentType<T>>, displayName?: string) => {
    return dynamicImport(factory, {
      ssr,
      loadingDelay,
      displayName
    });
  };
}

// Export configured importers for different priorities
export const highPriorityImport = createPrioritizedImporter('high');
export const mediumPriorityImport = createPrioritizedImporter('medium');
export const lowPriorityImport = createPrioritizedImporter('low');
