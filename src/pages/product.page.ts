import { BasePage } from '../pages/base.page.js';
import { type Page, type Locator } from '@playwright/test';

export class ProductPage extends BasePage {
    readonly addToCartButton: Locator;

    constructor(page: Page) {
        super(page);
        this.addToCartButton = page.getByRole('button', { name: 'ADD TO CART' });
    }

    async addToCart() {
        await this.addToCartButton.click();
    }
}