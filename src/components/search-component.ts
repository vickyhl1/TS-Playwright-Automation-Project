import { BasePage } from '../pages/base.page.js';
import { type Page, type Locator } from '@playwright/test';

export class SearchComponent extends BasePage {
    readonly searchInput: Locator;
    readonly searchButton: Locator;

    constructor(page: Page) {
        super(page);
        this.searchInput = this.page.getByRole('textbox', { name: 'Search' });
        this.searchButton = this.page.locator("#searchSection");
    }
  
    async searchFor(itemName: string) {
      await this.searchButton.click();
      await this.searchInput.fill(itemName);
      await this.page.keyboard.press('Enter');
      
      //Using waitForURL with glob pattern 
      await this.page.waitForURL(`**/search/?viewAll=${itemName}`, { timeout: 10000 });
    }
}
  