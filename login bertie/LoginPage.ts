import { Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly bertieUrl = 'https://stage-bertie.forbes.com/#/login';
  readonly emailInput = 'input[name="identifier"]';
  readonly bertieInput = 'input[name="email"]';
  readonly bertieLogin = 'button[type="submit"]';
  readonly passwordInput = 'input[name="credentials.passcode"]';
  readonly selectButtonOkta = 'a[aria-label="Select to get a push notification to the Okta Verify app."]';

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto(this.bertieUrl);
  }

  async login(email: string, password: string) {
    await this.page.locator(this.bertieInput).fill(email);
    await this.page.locator(this.bertieLogin).click();
    await this.page.locator(this.emailInput).fill(email);
    await this.page.locator(this.passwordInput).fill(password);
    await this.page.getByRole('button').click();
  }

  async selectOption() {
    await this.page.locator(this.selectButtonOkta).click();
  }
}
