import { test, expect } from '@playwright/test';

test('Get products API returns a list', async ({ request }) => {
  const response = await request.get('https://advantageonlineshopping.com/catalog/api/v1/categories/4/products');
  
  // check status code
  expect(response.status()).toBe(200);

  // Parse response - it's an object, not an array
  const data = await response.json();
  
  // Check that response has products property
  expect(data).toHaveProperty('products');
  
  // Check if products is an array
  expect(Array.isArray(data.products)).toBeTruthy();
  expect(data.products.length).toBeGreaterThan(0);

  // check if the product has the required fields
  const product = data.products[0];
  expect(product).toHaveProperty('productId');
  expect(product).toHaveProperty('productName');
  expect(product).toHaveProperty('price');
});