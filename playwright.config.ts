import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // Global timeout for tests
  timeout: 60000,
  
  // Base URL for the tests
  // Change this to your production URL for CI environments
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on',
    video: 'on',
    // Add viewport size to ensure consistent testing environment
    viewport: { width: 1280, height: 720 },
    // Only take screenshots on failure
    screenshot: 'only-on-failure',
  },
  
  // Test directory structure
  testDir: './tests',
  
  // Pattern for test files
  testMatch: ['**/*.spec.ts'],
  
  // Output directory for test results
  outputDir: 'test-results/',
  
  // Launch a development web server during tests
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120000, // Extra long timeout for Next.js to build
  },
  
  // Test projects for different browsers
  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        // Slow down tests for debugging if needed
        // launchOptions: { slowMo: 100 },
      },
    },
    // Uncomment to add additional browser testing
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
  ],
  
  // Better reporting
  reporter: [
    ['html', { open: 'never' }], // HTML report
    ['list']                    // Console list
  ],
});