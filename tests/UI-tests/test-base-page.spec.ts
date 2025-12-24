import { test, expect } from '@playwright/test';
import { BasePage } from '../../src/pages/base.page.js';

test('Base Page Header', async ({ page }) => {
  const basePage = new BasePage(page);
  await basePage.goto();
  await expect(basePage.header).toBeVisible();
});