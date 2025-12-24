import { test, expect } from '@playwright/test';

test('Get categories API returns a list', async ({ request }) => {
  const response = await request.get('https://advantageonlineshopping.com/catalog/api/v1/categories');
  expect(response.status()).toBe(200);
  const data = await response.json();
  expect(Array.isArray(data)).toBeTruthy();
  expect(data.length).toBeGreaterThan(0);
});