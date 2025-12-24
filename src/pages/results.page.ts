import { BasePage } from '../pages/base.page.js';
import { type Page, type Locator } from '@playwright/test';

export class ResultsPage extends BasePage {
    readonly results: Locator;
    readonly header: Locator;

    constructor(page: Page) {
        super(page);
        this.results = page.locator('.cell.categoryRight').filter({ has: page.locator('ul') });
        this.header = page.locator('#searchResultLabel');
    }

    /**
     * Get the results locator (for further interactions)
     */
    getResults(): Locator {
        return this.results.filter({ has: this.page.locator('li') });
    }

    /**
     * Check if at least one result is displayed
     * @returns true if at least one result exists, false otherwise
     */
    async hasResults(): Promise<boolean> {
        const results = this.getResults();
        const count = await results.count();
        return count > 0;
    }

    /**
     * Get the count of results
     */
    async getResultsCount(): Promise<number> {
        const results = this.getResults();
        return await results.count();
    }

    /**
     * Get the first result locator
     */
    getFirstResult(): Locator {
        return this.getResults().first();
    }

    /**
     * Get the header locator
     */
    getHeaderLocator(): Locator {
        return this.header;
    }

    /**
     * Get the header text
     */
    async getHeaderText(): Promise<string> {
        const text = await this.header.textContent();
        if (text === null) {
            throw new Error('Header text not found');
        }
        return text;
    }

    async clickProduct(productName: string) {
        const productLink = this.getResults()
            .filter({ hasText: productName })
            .first()
            .locator('a')
            .first();
        
        if (await productLink.count() === 0) {
            throw new Error(`Product "${productName}" not found in results`);
        }
        
        await productLink.waitFor({ state: 'visible' });
        await productLink.click();
        await this.page.waitForURL(/.*product.*/, { timeout: 10000 });
    }
}