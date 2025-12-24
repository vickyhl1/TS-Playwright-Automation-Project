import { test, expect } from '@playwright/test';
import { BasePage } from '../../src/pages/base.page.js';
import { CartPage } from '../../src/pages/cart.page.js';
import { ProductPage } from '../../src/pages/product.page.js';
import { SearchComponent } from '../../src/components/search-component.js';
import { ResultsPage } from '../../src/pages/results.page.js';

test('should display correct cart count after adding product', async ({ page }) => {
    const basePage = new BasePage(page);
    const cartPage = new CartPage(page);
    const productPage = new ProductPage(page);
    const resultsPage = new ResultsPage(page);
    await basePage.goto();
    const searchComponent = new SearchComponent(page);
    await searchComponent.searchFor('Laptop');
    await resultsPage.clickProduct('HP Pavilion 15t Touch Laptop');
    await productPage.addToCart();
    await cartPage.goto();
    const cartCount = await cartPage.getCartCountFromHeader();
    expect(cartCount).toBe(1);

});