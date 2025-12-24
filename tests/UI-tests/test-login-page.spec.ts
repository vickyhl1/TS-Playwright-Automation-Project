import { test } from '@playwright/test';
import { LoginPage } from '../../src/pages/login.page.js';

test('Login functionality', async ({ page }) => {
    const username = 'testuserv';
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(username, process.env.TEST_PASSWORD ?? '');
    
    // Verify login was successful
    await loginPage.verifyLoginSuccess(username);
});

test('Invalid login credentials', async ({ page }) => {
    const username = process.env.TEST_USERNAME ?? '';
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(username, 'Invalidpassword');
    
    // Verify login was unsuccessful
    await loginPage.verifyLoginFailure();
});