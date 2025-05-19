/**
 * Home Page Tests
 * 
 * Tests for the Landometrix home page functionality
 */
import { test, expect } from '@playwright/test';

test.describe('Home Page Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to home page
    await page.goto('/');
    
    // Wait for page to load
    await page.waitForLoadState('networkidle');
  });

  test('should display the home page correctly', async ({ page }) => {
    // Check page title
    const title = await page.title();
    expect(title).toContain('Landometrix');
    
    // Check for header/navigation
    await expect(page.locator('header')).toBeVisible();
    
    // Check for main content area
    await expect(page.locator('main')).toBeVisible();
    
    // Check for footer
    await expect(page.locator('footer')).toBeVisible();
  });

  test('should have working navigation links', async ({ page }) => {
    // Find navigation links
    const navLinks = page.locator('header').getByRole('link');
    
    // Ensure we have at least some navigation links
    expect(await navLinks.count()).toBeGreaterThan(0);
    
    // Check that the first link is visible and clickable
    await expect(navLinks.first()).toBeVisible();
  });
});