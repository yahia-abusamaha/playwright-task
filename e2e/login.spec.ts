import { test, expect } from '@playwright/test';
import { LoginPage } from '../e2e/LoginPage';

test('login to bertie and verify modified data', async ({ page }) => {
  const loginPage = new LoginPage(page);

  // Change network response and navigate to trending authors page
  await page.goto('https://stage-bertie.forbes.com/#/dashboard');
  await loginPage.changeNetwork();

  // Verify the modified data
  const modifiedData = page.locator('div[class="page-views selected-filter-text"]').nth(0);
  await expect(modifiedData).toHaveText(`
      Pageviews
    777,777,777`);
});
