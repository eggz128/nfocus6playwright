import { defineConfig, devices } from '@playwright/test';
import { TestOptions } from './tests/my-base-test'

export const STORAGE_STATE = 'user.json'
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig<TestOptions>({ //Added the TestOptions type to make parameterised projects work!
  //expect: {timeout: 10 * 1000},
  timeout: 30 * 1000,
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: 1,//process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['html'],['json', {outputFile: 'jsonreport/jsonreport.json'}],['junit', {outputFile: 'jnuitreport/test-results.xml'}]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  
  use: {
    actionTimeout: 5000,
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'https://www.edgewordstraining.co.uk/',
    /* For debugging - slow down test execution */
    //launchOptions: { slowMo: 2000 },
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on',
    //headless: false,
    launchOptions: {slowMo: 500},
    screenshot: 'on',
    video: 'on',
    
    
  },

  /* Configure projects for major browsers */
  projects: [

    {
      name: 'setup',
      testMatch: /global\.setup\.ts/,
      teardown: 'teardown',
      timeout: 2 * 60 * 1000 //Login action needs more time to complete
    },
    {
      name: 'teardown',
      testMatch: /global\.teardown\.ts/,
      use: {
        storageState: STORAGE_STATE
      }

    },



    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        person: 'Alice',
        storageState: STORAGE_STATE,
      },
      dependencies: ['setup'],
    },
    {
      name: 'chromiummax',
      use: {
        //...devices['Desktop Chrome'],
        launchOptions: { args: ["--start-maximized"] },
        headless: false,
        viewport: null,
        storageState: STORAGE_STATE,
      },
      dependencies: ['setup'],
    },

    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        headless: false,
        person: 'Bob',
        storageState: STORAGE_STATE,
      },
      dependencies: ['setup'],
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    /* Test against mobile viewports. */
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 7'], headless: false },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },

    /* Test against branded browsers. */
    {
      name: 'Microsoft Edge',
      use: { ...devices['Desktop Edge'], channel: 'msedge', headless: false },
    },
    {
      name: 'Google Chrome',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
