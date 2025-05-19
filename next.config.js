// Import the bundle optimizer
const enhanceBundleOptimization = require('./src/lib/bundleOptimizer');

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even with
    // ESLint errors. This should be a temporary measure for deployment.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Warning: This allows production builds to successfully complete even with
    // TypeScript errors. This should be a temporary measure for deployment.
    ignoreBuildErrors: true,
  },
  // Performance optimizations
  swcMinify: true, // Use SWC for minification (better performance)
  reactStrictMode: true, // Enable React strict mode for better debugging
  images: {
    // Optimize image loading
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    minimumCacheTTL: 60 * 60 * 24, // Cache images for 24 hours
    // Add image domains if needed
    domains: [],
  },
  experimental: {
    // Enable modern optimizations
    optimizeFonts: true,
    optimizePackageImports: ['framer-motion'],
    // Improve development experience with turbopack
    turbo: {
      rules: {
        // Configure turbopack rules if needed
      },
    },
  },
  // Compression for better performance
  compress: true,
  // Optimize loading of large pages
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  // Enhanced webpack configuration
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Only apply bundle optimization in production builds
    if (!dev) {
      config = enhanceBundleOptimization(
        config, 
        process.env.ANALYZE === 'true'
      );
    }
    
    // Add any additional webpack plugins/configs here
    
    return config;
  },
};

module.exports = nextConfig;
