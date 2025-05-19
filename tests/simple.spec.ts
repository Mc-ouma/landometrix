/**
 * Simple Test
 * 
 * Basic test to verify Playwright setup is working correctly
 */
import { test, expect } from '@playwright/test';

test('simple test - verify site loads', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Landometrix/);
  
  // Take a screenshot to verify the page loaded
  await page.screenshot({ path: 'test-results/home-page.png' });
});
