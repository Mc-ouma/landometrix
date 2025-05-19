/**
 * Test helpers for Contact Form tests
 * These helpers make our tests more resilient by providing flexible selectors
 * and error handling functions
 */
import { Page, Locator, expect } from '@playwright/test';

/**
 * Helper to find form elements with fallback selectors
 */
export const formSelectors = {
  /**
   * Find the name input field with multiple possible selectors
   */
  getNameField: (page: Page): Locator => {
    return page.locator('input#name')
      .or(page.locator('input[placeholder*="name" i]'))
      .or(page.locator('input').filter({ has: page.locator('label', { hasText: /name/i }) }))
      .or(page.locator('input[type="text"]').first());
  },

  /**
   * Find the email input field
   */
  getEmailField: (page: Page): Locator => {
    return page.locator('input#email')
      .or(page.locator('input[type="email"]'));
  },

  /**
   * Find the message textarea
   */
  getMessageField: (page: Page): Locator => {
    return page.locator('textarea#message')
      .or(page.locator('textarea'));
  },

  /**
   * Find the phone input field
   */
  getPhoneField: (page: Page): Locator => {
    return page.locator('input#phone')
      .or(page.locator('input[type="tel"]'))
      .or(page.locator('input[placeholder*="phone" i]'));
  },

  /**
   * Find the subject select field
   */
  getSubjectField: (page: Page): Locator => {
    return page.locator('select#subject')
      .or(page.locator('select'));
  },

  /**
   * Find the submit button
   */
  getSubmitButton: (page: Page): Locator => {
    return page.getByRole('button', { name: /send message|submit|send/i })
      .or(page.locator('form button[type="submit"]'));
  },

  /**
   * Find success message
   */
  getSuccessMessage: (page: Page): Locator => {
    return page.getByText(/thank you|success|received|submitted successfully/i)
      .filter({ visible: true });
  },

  /**
   * Find loading indicator
   */
  getLoadingIndicator: (page: Page): Locator => {
    return page.getByText(/sending|loading|processing/i)
      .or(page.locator('svg:has(circle[class*="opacity"])'));
  }
};

/**
 * Helper to fill out the contact form
 */
export async function fillContactForm(
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

/**
 * Helper to submit the contact form and wait for success
 */
export async function submitFormAndWaitForSuccess(page: Page): Promise<void> {
  try {
    // Submit the form
    const submitButton = formSelectors.getSubmitButton(page);
    await submitButton.click();
    
    // Check for loading state if it exists
    try {
      const loadingIndicator = formSelectors.getLoadingIndicator(page);
      if (await loadingIndicator.isVisible({ timeout: 1000 })) {
        console.log('Loading indicator found');
      }
    } catch (error) {
      console.log('No loading indicator found or visible');
    }
    
    // Wait for success message
    const successMessage = formSelectors.getSuccessMessage(page);
    await expect(successMessage).toBeVisible({ timeout: 10000 });
    console.log('Form submitted successfully');
  } catch (error) {
    console.error('Error submitting form:', error);
    await page.screenshot({ path: 'test-results/form-submit-error.png' });
    throw error;
  }
}
