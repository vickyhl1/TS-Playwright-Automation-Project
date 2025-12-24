import { test, expect } from '@playwright/test';
import { BasePage } from '../../src/pages/base.page.js';
import { SearchComponent } from '../../src/components/search-component.js';
import { ResultsPage } from '../../src/pages/results.page.js';

test.describe('Search Functionality', () => {
    const searchTerm = 'Laptop';

    test.beforeEach(async ({ page }) => {
        const basePage = new BasePage(page);
        await basePage.goto();

        // Initialize component once
        const searchComponent = new SearchComponent(page);
        
        // Perform search once for all tests
        await searchComponent.searchFor(searchTerm);
    });

    test('should navigate to search results page after search', async ({ page }) => {
        await expect(page).toHaveURL(new RegExp(`/search/\\?viewAll=${searchTerm}`));
    });

    test('should display at least one product in search results', async ({ page }) => {
        const resultsPage = new ResultsPage(page);
        const hasResults = await resultsPage.hasResults();
        expect(hasResults).toBe(true);
    });

    test('should display relevant products matching search term', async ({ page }) => {
        const resultsPage = new ResultsPage(page);
        const firstResult = resultsPage.getFirstResult();
        const firstResultText = await firstResult.textContent();
        expect(firstResultText?.toLowerCase()).toContain(searchTerm.toLowerCase());
    });

    test('should display the correct header text', async ({ page }) => {
        const resultsPage = new ResultsPage(page);
        const header = resultsPage.getHeaderLocator();
        await expect(header).toHaveText(`Search result: "${searchTerm}"`);
    });
});