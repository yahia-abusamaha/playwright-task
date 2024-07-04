import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  projects: [
    // Setup project
    { name: 'setup', 
      testMatch: 'e2e/tests/auth.setup.ts'
     },

    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        // baseURL: 'https://stage-bertie.forbes.com/',
        // Use prepared auth state.
        storageState: './playwright/.auth/user.json',
        
      },
      dependencies: ['setup'],
    },

    // {
    //   name: 'firefox',
    //   use: {
    //     ...devices['Desktop Firefox'],
        
    //     baseURL: 'https://stage-bertie.forbes.com/',


    //     // Use prepared auth state.
    //     storageState: 'playwright/.auth/user.json',
    //   },
    //   dependencies: ['setup'],
    // },
  ],
});