import type { Page, Locator } from '@playwright/test';

export class BasePage {
  readonly page: Page;
  readonly header: Locator;
  readonly footer: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = page.locator('header');
    this.footer = page.locator('footer');
  }

  async goto(path: string = '/') {
    try {
      await this.page.goto(path, { waitUntil: 'networkidle', timeout: 30000 });
    } catch (error) {
      const currentUrl = this.page.url();
      throw new Error(
        `Failed to navigate to "${path}". Current URL: ${currentUrl}. ` +
        `Original error: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }
}