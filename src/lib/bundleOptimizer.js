/**
 * Script-based bundle optimization for Next.js
 * 
 * This script analyzes and optimizes bundle size as part of the build process.
 * It hooks into the webpack configuration to split chunks more effectively and
 * applies more aggressive code splitting strategies.
 */

const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

/**
 * Enhanced bundle optimization for Next.js config
 * @param {object} config - The webpack config to enhance
 * @param {boolean} analyze - Whether to run the bundle analyzer
 * @returns {object} - The enhanced webpack config
 */
function enhanceBundleOptimization(config, analyze = false) {
  // Add bundle analyzer if requested
  if (analyze) {
    config.plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: 'server',
        analyzerPort: 8888,
        openAnalyzer: true,
      })
    );
  }
  
  // Add Gzip compression
  config.plugins.push(
    new CompressionPlugin({
      algorithm: 'gzip',
      test: /\.(js|css|html|svg)$/,
      threshold: 10240, // Only compress files > 10kb
      minRatio: 0.8, // Only compress if compression ratio is better than 0.8
    })
  );

  // Enhanced terser options
  config.optimization.minimizer = [
    new TerserPlugin({
      terserOptions: {
        compress: {
          drop_console: process.env.NODE_ENV === 'production', // Remove console.log in production
          drop_debugger: true,
          pure_funcs: process.env.NODE_ENV === 'production' ? ['console.log', 'console.debug', 'console.info'] : [],
        },
        mangle: true,
        output: {
          comments: false,
        },
        ecma: 2020, // Use ES2020 syntax for better minification
      },
      extractComments: false,
    }),
  ];

  // Optimize chunking strategy
  config.optimization.splitChunks = {
    chunks: 'all',
    maxInitialRequests: Infinity, 
    minSize: 20000, // 20kb min chunk size for better compression
    cacheGroups: {
      framework: {
        name: 'framework',
        test: /[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|use-subscription)[\\/]/,
        priority: 40,
        // Only use these packages once
        enforce: true, 
      },
      // Group all framer-motion code
      framerMotion: {
        test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
        name: 'framer-motion',
        priority: 30,
        reuseExistingChunk: true,
      },
      // Vendor chunk for all node_modules
      vendor: {
        name: 'vendor',
        test: /[\\/]node_modules[\\/]/,
        priority: 20,
        reuseExistingChunk: true,
      },
      // Bundle common utilities used in multiple places
      utils: {
        name: 'utils',
        test: /[\\/]src[\\/]lib[\\/]/,
        minChunks: 2,
        priority: 15,
        reuseExistingChunk: true,
      },
      // Bundle common UI components
      components: {
        name: 'components',
        test: /[\\/]src[\\/]components[\\/]/,
        minChunks: 2,
        priority: 10,
        reuseExistingChunk: true,
      },
      // Default catch-all chunk
      default: {
        minChunks: 2,
        priority: -20,
        reuseExistingChunk: true,
      },
    },
  };

  return config;
}

module.exports = enhanceBundleOptimization;
