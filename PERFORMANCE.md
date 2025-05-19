# Performance Optimization Guide for Landometrix

This guide outlines the performance optimizations implemented in the Landometrix Next.js site and how to maintain them.

## Key Optimizations Implemented

### 1. Bundle Optimization
- **Code Splitting**: Enhanced chunk splitting for optimized loading
- **Tree Shaking**: Unused code elimination
- **Bundle Analysis**: Added tools for bundle size monitoring

### 2. Image Optimization
- **Format Detection**: Serving modern formats (WebP, AVIF) to supported browsers
- **LQIP**: Low-Quality Image Placeholders for faster perceived loading
- **Lazy Loading**: Optimized with intersection observer and priority hints

### 3. Component Optimization
- **Memoization**: Added React.memo for components to prevent rerenders
- **Lazy Loading**: Non-critical components load only when needed
- **Performance Scaling**: Components adapt to device capabilities

### 4. Animation Performance
- **Reduced Motion**: Respects user preferences for reduced motion
- **Conditional Effects**: Fewer animations on low-end devices
- **RAF/Throttling**: Limited animation frame rates when needed

### 5. Network Optimization
- **Preconnect/Preload**: Added resource hints for critical assets
- **Font Display**: Optimized font loading strategies
- **Resource Prioritization**: Critical resources load first

## Performance Tools Available

### Development Tools
```bash
# Run the development server with performance profiling
npm run perf

# Test performance with Lighthouse
./scripts/performance-test.sh
```

### Build Tools
```bash
# Analyze bundle size
npm run analyze

# Install optimization dependencies
./scripts/optimize.sh
```

## Performance Best Practices

1. **Image Optimization**
   - Always use the `OptimizedImage` component instead of `next/image` directly
   - Provide appropriate width/height to prevent layout shifts
   - Set `priority={true}` only for above-the-fold images

2. **Component Design**
   - Use `React.memo()` for components that don't need frequent re-renders
   - Implement proper dependency arrays in `useEffect` and `useMemo`
   - Split large components into smaller, focused components

3. **Animation Rules**
   - Always check for reduced motion preferences
   - Scale effects based on device performance
   - Debounce event handlers that trigger visual changes

4. **Bundle Size Management**
   - Import only what you need with named imports
   - Use dynamic imports for large dependencies
   - Check bundle size with `npm run analyze` before major changes

## Performance Monitoring

The site includes a built-in performance monitor that tracks Core Web Vitals metrics. It's enabled in development and can be accessed in production by adding `?debug=true` to any URL.

Metrics tracked:
- **LCP**: Largest Contentful Paint
- **FID**: First Input Delay
- **CLS**: Cumulative Layout Shift
- **FCP**: First Contentful Paint
- **TTFB**: Time to First Byte

## Optimized File Structure

```
src/
  ├── lib/
  │   ├── bundleOptimizer.js     # Webpack optimization
  │   ├── imageSupport.ts        # Image format detection
  │   └── importOptimization.tsx # Dynamic import utilities
  │
  ├── components/
  │   ├── ui/
  │   │   ├── AnimatedBackgroundOptimized.tsx # Performance optimized background
  │   │   ├── OptimizedImage.tsx # Enhanced image component
  │   │   └── ...
  │   │
  │   └── utils/
  │       ├── PerformanceMonitor.tsx # Metrics tracking
  │       ├── DynamicComponents.tsx  # Optimized loading
  │       └── ...
  │
  └── app/
      └── layout.tsx # Includes preload hints and core optimizations
```

## Further Recommendations

1. **CDN Setup**: Consider adding a CDN for static assets
2. **Edge Caching**: Implement edge caching for API routes
3. **Service Worker**: Add service worker for offline support and caching
4. **Font Subsetting**: Subset fonts to include only needed characters
