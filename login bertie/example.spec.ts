import { test } from '@playwright/test';
  import { LoginPage } from './LoginPage';
  
  test('login to bertie', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.goto();
    await loginPage.login('test.test@test.co', '*********');
    await loginPage.selectOption();
  });