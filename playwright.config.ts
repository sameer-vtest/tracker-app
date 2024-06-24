import { defineConfig, devices } from '@playwright/test';
import AllureReporter from 'allure-playwright';
import dotenv from "dotenv"

require('dotenv').config();

// dotenv.config({
//   path:`./env`
// });

const enableVideo = process.env.ENABLE_VIDEO === 'off';
const enableTrace = process.env.ENABLE_TRACE === 'off';
const browser = process.env.BROWSER;
const parallelBrowsers = parseInt(process.env.WORKERS || '1');
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  timeout: 600000,
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  // forbidOnly: false,
  /* Retry on CI only */
  // retries: process.env.CI ? 2 : 0,
  retries: 0,
  /* Opt out of parallel tests on CI. */
  // workers: process.env.CI ? 1 : 1,
  workers: parallelBrowsers,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [["line"], [
    "allure-playwright",
    {
      environmentInfo: {
        framework: "playwright",
        browser: browser,
        applicationurl: process.env.BASE_URL,
        tags: process.env.TEST_TAGS,
        workers: parallelBrowsers
      },
      suiteTitle: false,
      outputFolder: process.env.ALLURE_RESULTS_DIR,
    }
  ], ['html', { open: 'never' }], ['junit', { outputFile: 'junit-report/junit-report.xml' }]],
  // reporter: '@playwright/test-html-reporter',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    // /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: process.env.URL,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: enableTrace ? 'off' : 'on',
    screenshot: 'on',
    video: enableVideo ? 'off' : 'retain-on-failure',
    headless: false,
    actionTimeout: 60 * 1000,

    // testIdAttribute: 'data-test-id',
    // baseURL: 'https://reqres.in'
    // baseURL: 'https://dev215245.service-now.com/api/now/table/incident',
  },
  expect: {
    timeout: 20000,
  },
  /* Configure projects for major browsers */
  projects: [
    // {
    //   name: 'chromium',
    //   use: { ...devices['Desktop Chrome'] },
    // },
    // {
    //   name: 'chromium',
    //   use: { ...devices['Desktop Chrome'] },
    //   testMatch: 'C:/Innomatics/tests/admin-tests/admin-sites-tests/**.spec.ts'
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    //   testMatch: 'C:/Innomatics/tests/admin-tests/admin-users-tests/**.spec.ts'
    // },
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    //   testMatch: ['C:/Innomatics/tests/admin-tests/admin-company-settings-test/**.spec.ts', 'C:/Innomatics/tests/admin-tests/admin-contacts-tests/**.spec.ts']
    // },
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    {
      name: 'Google Chrome',
      use: { ...devices['Desktop Chrome'], channel: 'chrome', viewport: { width: 1280, height: 593 }, },
      grep: new RegExp(process.env.TEST_TAGS || '')
    },
  ],
  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});