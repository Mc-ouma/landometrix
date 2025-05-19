#!/bin/bash

# Script to install performance optimization dependencies
echo "📦 Installing performance optimization packages..."

# Core dependencies for bundle optimization
npm install --save-dev webpack-bundle-analyzer compression-webpack-plugin terser-webpack-plugin

# Performance monitoring dependencies
npm install --save web-vitals

# Update existing packages to latest versions
echo "🔄 Updating core packages..."
npm update framer-motion next react react-dom

echo "✅ Performance optimization packages installed successfully!"
echo "🚀 Run 'npm run build' to apply optimizations"
echo "📊 Run 'npm run analyze' to view bundle analysis"
