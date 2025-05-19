#!/bin/bash

# Performance testing script for development
# This script runs Lighthouse audits on your Next.js app to measure performance

# Ensure we're in the project root
cd "$(dirname "$0")/.."

# Check if Lighthouse CLI is installed
if ! command -v lighthouse &> /dev/null; then
    echo "Lighthouse CLI not found, installing..."
    npm install -g lighthouse
fi

# Default URL to test
URL=${1:-"http://localhost:3000"}

# Function to run tests
run_test() {
    local page=$1
    local output_path="./lighthouse-reports/$(echo $page | sed 's/\//_/g').html"
    
    echo "📊 Testing $URL$page"
    lighthouse "$URL$page" --output html --output-path "$output_path" --chrome-flags="--headless" --only-categories=performance
}

# Create output directory
mkdir -p ./lighthouse-reports

echo "🚀 Starting performance tests..."
echo "🌐 Testing site: $URL"

# Run tests on main pages
run_test "/"
run_test "/services"
run_test "/about"
run_test "/contact"

echo "✅ Tests completed!"
echo "📁 Reports saved to ./lighthouse-reports/"

# Open report directory
if [[ "$OSTYPE" == "darwin"* ]]; then
    open ./lighthouse-reports/
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    xdg-open ./lighthouse-reports/ 2>/dev/null || echo "Reports available in ./lighthouse-reports/"
elif [[ "$OSTYPE" == "msys" || "$OSTYPE" == "cygwin" ]]; then
    start ./lighthouse-reports/
fi
