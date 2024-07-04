import { test as setup, expect } from '@playwright/test';

const authFile = './playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
  // Navigate to the login page
  await page.goto('https://stage-bertie.forbes.com/');

  // Perform the login steps
  await page.locator('input[name="email"]').fill('qa_automation');
  await page.locator('button[type="submit"]').click();
  await page.locator('input[name="password"]').fill('Bertie123@');
  await page.getByRole('button').click();
  await expect(page).toHaveURL('https://stage-bertie.forbes.com/#/dashboard');


  // Save the authentication state to a file
  await page.context().storageState({ path: authFile });

});
