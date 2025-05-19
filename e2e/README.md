# Landometrix - Playwright Tests

This directory contains end-to-end tests for the Landometrix website using Playwright.

## Test Structure

- `e2e/` - End-to-end tests that verify complete user flows
- `tests/` - Unit and component tests

## Running Tests

### Prerequisites

Make sure you have Node.js and npm installed.

### Install Dependencies

If you haven't already installed the project dependencies:

```bash
npm install
```

### Running All Tests

To run all tests with the default configuration:

```bash
npx playwright test
```

### Running Specific Tests

To run a specific test file:

```bash
npx playwright test e2e/contact-form.spec.ts
```

### Running Tests in UI Mode

To run tests with the Playwright UI (useful for debugging):

```bash
npx playwright test --ui
```

### Viewing Test Results

After running the tests, you can view the HTML report:

```bash
npx playwright show-report
```

## Test Coverage

The following features are covered by these tests:

- Home page basic functionality
- Contact form validation and submission
- Form data handling and error states

## Contact Form Tests

The contact form tests validate:

1. Form display and validation
2. Loading states during submission
3. Success message after submission
4. Form reset after successful submission
5. Error handling

## CI/CD Integration

These tests are integrated with GitHub Actions. See `.github/workflows/playwright.yml` for the configuration.

## Debugging Failed Tests

When tests fail, Playwright generates:

- Screenshots of the failure
- Video recordings of the test run
- Traces that can be viewed in the Playwright Trace Viewer

To analyze a trace:

```bash
npx playwright show-trace test-results/trace.zip
```
