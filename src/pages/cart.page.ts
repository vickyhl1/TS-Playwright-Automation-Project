import { BasePage } from '../pages/base.page.js';
import { type Page, type Locator } from '@playwright/test';

export class CartPage extends BasePage {
    readonly cartCount: Locator;


    constructor(page: Page) {
        super(page);
        this.cartCount = page.locator('span[ng-show*="productsInCart.length"]');
    }

    async goto(path: string = '/#/shoppingCart') {
        await super.goto(path);
    }

    /**
     * Get cart count from header (the number in parentheses)
     */
    async getCartCountFromHeader(): Promise<number> {
        const text = await this.cartCount.textContent();
        const match = text?.match(/\((\d+)\)/);
        if (!match) {
            throw new Error(
              `Could not parse cart count from text: "${text}". ` +
              `Expected format: (number)`
            );
          }

        return match ? parseInt(match[1] ?? '0', 10) : 0;
    }
}