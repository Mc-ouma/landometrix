import { test, expect, Page, Locator } from '@playwright/test';

/**
 * Helper functions for contact form tests
 */

// Form selectors
const formSelectors = {
  getNameField: (page: Page): Locator => {
    return page.locator('input#name')
      .or(page.locator('input[placeholder*="name" i]'))
      .or(page.locator('input').filter({ has: page.locator('label', { hasText: /name/i }) }))
      .or(page.locator('input[type="text"]').first());
  },

  getEmailField: (page: Page): Locator => {
    return page.locator('input#email')
      .or(page.locator('input[type="email"]'));
  },

  getMessageField: (page: Page): Locator => {
    return page.locator('textarea#message')
      .or(page.locator('textarea'));
  },

  getPhoneField: (page: Page): Locator => {
    return page.locator('input#phone')
      .or(page.locator('input[type="tel"]'))
      .or(page.locator('input[placeholder*="phone" i]'));
  },

  getSubjectField: (page: Page): Locator => {
    return page.locator('select#subject')
      .or(page.locator('select'));
  },

  getSubmitButton: (page: Page): Locator => {
    return page.getByRole('button', { name: /send message|submit|send/i })
      .or(page.locator('form button[type="submit"]'));
  },

  getSuccessMessage: (page: Page): Locator => {
    return page.getByText(/thank you|success|received|submitted successfully|message has been sent/i)
      .or(page.locator('.bg-green-50, .bg-green-900, .text-green-800, .text-green-300'))
      .or(page.locator('div').filter({ hasText: /thank you|success|received|message has been sent/i }));
  },

  getLoadingIndicator: (page: Page): Locator => {
    return page.getByText(/sending|loading|processing/i)
      .or(page.locator('svg:has(circle[class*="opacity"])'));
  }
};

// Helper to fill contact form
async function fillContactForm(
  page: Page, 
  formData: {
    name: string;
    email: string;
    message: string;
    phone?: string;
    subject?: string;
  }
): Promise<void> {
  try {
    // Get form fields
    const nameField = formSelectors.getNameField(page);
    const emailField = formSelectors.getEmailField(page);
    const messageField = formSelectors.getMessageField(page);
    
    // Fill required fields
    await nameField.fill(formData.name);
    await emailField.fill(formData.email);
    await messageField.fill(formData.message);
    
    // Fill optional fields if provided and if they exist
    if (formData.phone) {
      const phoneField = formSelectors.getPhoneField(page);
      if (await phoneField.count() > 0) {
        await phoneField.fill(formData.phone);
      }
    }

    if (formData.subject) {
      const subjectField = formSelectors.getSubjectField(page);
      if (await subjectField.count() > 0) {
        // Check if we need to select an option or fill in text
        if (await subjectField.evaluate((el) => el.tagName === 'SELECT')) {
          await subjectField.selectOption(formData.subject);
        } else {
          await subjectField.fill(formData.subject);
        }
      }
    }
  } catch (error) {
    console.error('Error filling form:', error);
    await page.screenshot({ path: 'test-results/form-fill-error.png' });
    throw error;
  }
}

// Helper to submit form and wait for success
async function submitFormAndWaitForSuccess(page: Page): Promise<void> {
  try {
    // Submit the form
    const submitButton = formSelectors.getSubmitButton(page);
    await submitButton.click().catch(e => {
      console.error('Failed to click submit button:', e.message);
      throw e;
    });
    
    // Check for loading state if it exists
    const loadingIndicator = formSelectors.getLoadingIndicator(page);
    const isLoading = await loadingIndicator.isVisible({ timeout: 1000 })
      .catch(() => false);
    
    if (isLoading) {
      console.log('Loading indicator found');
    } else {
      console.log('No loading indicator visible, continuing');
    }
    
    // Wait for success or for form to be cleared (another success indicator)
    try {
      // Try multiple approaches to verify success
      await Promise.race([
        // Look for success message
        formSelectors.getSuccessMessage(page).waitFor({ state: 'visible', timeout: 5000 }),
        
        // Or check if form fields were cleared (another success indicator)
        page.waitForFunction(() => {
          const nameInput = document.querySelector('input[type="text"]') as HTMLInputElement;
          const emailInput = document.querySelector('input[type="email"]') as HTMLInputElement;
          return nameInput && emailInput && 
                 (!nameInput.value) && (!emailInput.value);
        }, { timeout: 5000 })
      ]);
      
      // Take screenshot of the success state
      await page.screenshot({ path: 'test-results/form-success.png' });
      console.log('Form submission verified');
    } catch (submitError) {
      console.log('Could not verify standard success indicators, checking if form was reset');
      
      // Check if form fields are empty now (alternative success check)
      const nameValue = await formSelectors.getNameField(page).inputValue();
      const emailValue = await formSelectors.getEmailField(page).inputValue();
      
      if (!nameValue && !emailValue) {
        console.log('Form appears to have been reset (fields empty), considering successful');
      } else {
        console.error('Form submission verification failed');
        throw submitError;
      }
    }
  } catch (error) {
    console.error('Error submitting form');
    await page.screenshot({ path: 'test-results/form-submit-error.png' });
    throw error;
  }
}

/**
 * Contact Form Test Suite - Optimized
 * 
 * A more resilient implementation of contact form tests using flexible selectors
 * and helper functions to improve test reliability.
 */
test.describe('Contact Form Tests - Optimized', () => {
  test.beforeEach(async ({ page }) => {
    console.log('Navigating to contact page...');
    await page.goto('http://localhost:3001/contact');
    
    // Wait for the page to load using multiple strategies
    try {
      // Try to wait for any contact heading
      await Promise.any([
        page.waitForSelector('h1:has-text("Contact")', { timeout: 5000 }),
        page.waitForSelector('h2:has-text("Contact")', { timeout: 5000 }),
        page.waitForSelector('h1:has-text("Send a Message")', { timeout: 5000 })
      ]).catch(() => page.waitForLoadState('networkidle'));
      
      console.log('Contact page loaded successfully');
    } catch (e) {
      console.log('Warning: Contact page may not have loaded properly:', e.message);
      await page.screenshot({ path: 'test-results/page-load-warning.png' });
    }
  });

  test('should load contact page with a form', async ({ page }) => {
    // Check page title
    const title = await page.title();
    expect(title.toLowerCase()).toContain('contact');
    
    // Check for form presence
    const form = page.locator('form');
    await expect(form).toBeVisible();
    
    console.log('Contact page loaded with form element');
  });

  test('should display all required form fields', async ({ page }) => {
    // Use our selectors helper to check for form fields
    await expect(formSelectors.getNameField(page)).toBeVisible();
    await expect(formSelectors.getEmailField(page)).toBeVisible();
    await expect(formSelectors.getMessageField(page)).toBeVisible();
    await expect(formSelectors.getSubmitButton(page)).toBeVisible();
    
    console.log('All required form fields are visible');
  });

  test('should validate form and show error for empty fields', async ({ page }) => {
    // Try to submit empty form
    await formSelectors.getSubmitButton(page).click();
    
    // Check we're still on contact page
    expect(page.url()).toContain('/contact');
    
    // Verify no success message appears
    const successMessage = await formSelectors.getSuccessMessage(page).isVisible({ timeout: 2000 })
      .catch(() => false);
    expect(successMessage).toBeFalsy();
    
    console.log('Form validation working - prevented submission of empty form');
  });

  test('should submit form with valid data and show success message', async ({ page }) => {
    // Fill form with valid data using our helper
    await fillContactForm(page, {
      name: 'John Doe',
      email: 'john.doe@example.com',
      message: 'This is a test message from the optimized test suite.',
      phone: '(555) 123-4567',
      subject: 'General Inquiry'
    });
    
    // Take screenshot of filled form
    await page.screenshot({ path: 'test-results/form-filled.png' });
    
    // Submit and wait for success
    await submitFormAndWaitForSuccess(page);
    
    // Verify form has been reset
    await expect(formSelectors.getNameField(page)).toHaveValue('');
    await expect(formSelectors.getEmailField(page)).toHaveValue('');
    await expect(formSelectors.getMessageField(page)).toHaveValue('');
    
    console.log('Form submitted successfully and fields were reset');
  });

  test('should validate email field format', async ({ page }) => {
    // Fill form with invalid email
    await fillContactForm(page, {
      name: 'Test User',
      email: 'not-valid-email',  // Invalid email format
      message: 'Testing email validation'
    });
    
    // Try to submit the form
    await formSelectors.getSubmitButton(page).click();
    
    // Check we're still on contact page
    expect(page.url()).toContain('/contact');
    
    // No success message should appear
    const successVisible = await formSelectors.getSuccessMessage(page).isVisible({ timeout: 2000 })
      .catch(() => false);
    expect(successVisible).toBeFalsy();
    
    console.log('Email validation check completed');
  });
  
  test('should display properly on mobile viewport', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Check that form is still visible and usable
    await expect(page.locator('form')).toBeVisible();
    await expect(formSelectors.getNameField(page)).toBeVisible();
    await expect(formSelectors.getEmailField(page)).toBeVisible();
    await expect(formSelectors.getMessageField(page)).toBeVisible();
    await expect(formSelectors.getSubmitButton(page)).toBeVisible();
    
    // Take screenshot to verify mobile layout
    await page.screenshot({ path: 'test-results/form-mobile-view.png' });
    
    console.log('Mobile viewport display check completed');
  });
});
