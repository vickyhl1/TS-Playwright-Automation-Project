# TS Playwright Automation Project

A comprehensive end-to-end test automation framework for Advantage Online Shopping built with TypeScript and Playwright. This project implements the Page Object Model (POM) pattern and includes both UI and API test suites.

## 🚀 Features

- **Page Object Model**: Well-structured page objects and reusable components for maintainable test code
- **UI Testing**: Comprehensive UI tests covering search, login, cart, and product pages
- **API Testing**: REST and SOAP API tests for products, categories, and authentication
- **TypeScript**: Full TypeScript support with strict type checking and ESM modules
- **Environment Configuration**: Environment variable support via `.env` files
- **Test Reports**: HTML and list reporters with automatic screenshots on failure
- **Trace Files**: Automatic trace generation on test failures for debugging
- **CI/CD Ready**: Configured for continuous integration environments


## 🛠️ Technologies

- **Playwright**: Modern end-to-end testing framework
- **TypeScript**: Type-safe JavaScript with ESM modules
- **dotenv**: Environment variable management
- **Node.js**: Runtime environment

## 📋 Test Coverage

### UI Tests
- ✅ Base page navigation and header/footer verification
- ✅ User login functionality (success and failure scenarios)
- ✅ Product search with result validation
- ✅ Shopping cart operations (add to cart, cart count verification)

### API Tests
- ✅ Products API: Fetch products by category
- ✅ Categories API: Retrieve product categories
- ✅ Login API: SOAP-based authentication with JWT token validation

## 🏃 Running Tests

# Run all tests
npm test
 
# Run tests in headed mode (visible browser)
npm run test:headed

# Run tests in debug mode
npm run test:debug

# Run tests with UI mode (interactive)
npm run test:ui

# Run specific test file
npx playwright test tests/UI-tests/test-login-page.spec.ts

# Run tests in a specific browser
npx playwright test --project=chromium## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the root directory (use `.env.example` as a template):

BASE_URL=https://advantageonlineshopping.com/#/### Playwright Configuration

The `playwright.config.ts` file includes:
- Base URL configuration
- Timeout settings (30 seconds)
- Screenshot on failure
- Trace on first retry
- HTML and list reporters

## 📝 Prerequisites

- **Node.js**: v18 or higher
- **npm**: Comes with Node.js
- **Git**: For version control

## 🔧 Installation

# Clone the repository
git clone https://github.com/vickyhl1/TS-Playwright-Automation-Project.git
cd TS-Playwright-Automation-Project

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install## 🧪 Writing Tests

### UI Test Example

import { test, expect } from '@playwright/test';
import { BasePage } from '../../src/pages/base.page.js';
import { SearchComponent } from '../../src/components/search-component.js';

test('should search for products', async ({ page }) => {
  const basePage = new BasePage(page);
  await basePage.goto();
  
  const searchComponent = new SearchComponent(page);
  await searchComponent.searchFor('Laptop');
  
  await expect(page).toHaveURL(/\/search/);
});### API Test Example

import { test, expect } from '@playwright/test';

test('Get products API returns a list', async ({ request }) => {
  const response = await request.get(
    'https://advantageonlineshopping.com/catalog/api/v1/categories/4/products'
  );
  
  expect(response.status()).toBe(200);
  const data = await response.json();
  expect(data).toHaveProperty('products');
  expect(Array.isArray(data.products)).toBeTruthy();
});## 🐛 Debugging

### Debug Modeash
npm run test:debug### UI Mode (Interactive)
npm run test:ui### Playwright Inspector
Add `await page.pause()` in your test code to open the inspector at that point.

### Codegen (Generate Tests)
npx playwright codegen https://advantageonlineshopping.com## 📊 Test Reports

After running tests, view the HTML report:

npx playwright show-report## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👤 Author

**Vicky Oknin**

- GitHub: [@vickyhl1](https://github.com/vickyhl1)

## 🙏 Acknowledgments

- Advantage Online Shopping for providing the test application
- Playwright team for the excellent testing framework

# Clone the repository
git clone https://github.com/vickyhl1/TS-Playwright-Automation-Project.git
cd TS-Playwright-Automation-Project

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
