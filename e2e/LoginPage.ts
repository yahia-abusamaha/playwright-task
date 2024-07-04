import { Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly bertieUrl = 'https://stage-bertie.forbes.com/#/login';
  readonly bertieInput = 'input[name="email"]';
  readonly bertieLogin = 'button[type="submit"]';
  readonly bertiePassword = 'input[name="password"]';
  readonly hamburgerMenu = '.menu-bars .ng-tns-c778662712-2';
  readonly trendingUsers = 'a[routerlink="/trending/authors"]';
  readonly routeChange = /https:\/\/stage-bertie\.forbes\.com\/tamagotchi\/v1\/fetchTrendingAuthors\?id=all&fromDate=.*&toDate=.*&start=\d+&limit=\d+&sortField=viewsRank&sortDirection=asc/;

  constructor(page: Page) {
    this.page = page;
  }

  async changeNetwork() {
    // Intercept network request before navigation
    await this.page.route(this.routeChange, async (route) => {
      const response = await route.fetch();
      let body = await response.json();
      body.authors = body.authors.map(author => {
        if (author.name === "David Axe") {
          author.views = 777777777;
        }
        return author;
      });

      await route.fulfill({
        response,
        body: JSON.stringify(body),
        headers: {
          ...response.headers(),
          'content-type': 'application/json'
        }
      });
    });

    const hamburgerMenu = await this.page.waitForSelector(this.hamburgerMenu);
    await hamburgerMenu?.click();
    await this.page.locator(this.trendingUsers).click();
  }
}
