import { BasePage } from './base.page.js';
import type { Page, Locator } from '@playwright/test';
import { expect } from '@playwright/test';

export class LoginPage extends BasePage {
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly loginModalTrigger: Locator; // Button/link that opens the login modal

    constructor(page: Page) {
        super(page);
        this.usernameInput = page.locator('input[name="username"]');
        this.passwordInput = page.locator('input[name="password"]');
        this.loginButton = page.getByRole('button', { name: 'SIGN IN' });
        // User menu link that opens the login modal
        this.loginModalTrigger = page.locator('#menuUserLink');
    }

    /**
     * Navigate to base page and open the login modal
     * Since login is in a popup, we don't navigate to a different URL
     */
    async goto(path: string = '/') {
        try {
          await super.goto(path);
          
          // Open the login modal/popup
          try {
            await this.loginModalTrigger.waitFor({ state: 'visible', timeout: 5000 });
            await this.loginModalTrigger.click();
          } catch (error) {
            throw new Error(
              `Failed to open login modal. Login trigger button not found or not clickable. ` +
              `Original error: ${error instanceof Error ? error.message : String(error)}`
            );
          }
          
          // Wait for login form elements to be visible
          await expect(this.usernameInput).toBeVisible({ timeout: 5000 });
          await expect(this.passwordInput).toBeVisible({ timeout: 5000 });
          await expect(this.loginButton).toBeVisible({ timeout: 5000 });
        } catch (error) {
          if (error instanceof Error && error.message.includes('Failed to open login modal')) {
            throw error; // Re-throw our custom error
          }
          throw new Error(
            `Failed to initialize login page at path "${path}". ` +
            `Login form elements not visible. ` +
            `Original error: ${error instanceof Error ? error.message : String(error)}`
          );
        }
      }
      
      async login(username: string, password: string) {
        try {
          if (!username || !password) {
            throw new Error('Username and password are required');
          }
      
          await this.usernameInput.fill(username);
          await this.passwordInput.fill(password);
          await this.loginButton.click();
          
          // Wait for navigation or modal close
          await this.page.waitForLoadState('networkidle', { timeout: 10000 });
        } catch (error) {
          throw new Error(
            `Failed to login with username "${username}". ` +
            `Original error: ${error instanceof Error ? error.message : String(error)}`
          );
        }
      }

    /**
     * Verify that login was successful by checking if login form is closed
     * and user is logged in
     */
    async verifyLoginSuccess(username: string ) {
        // Login modal/form should be closed (not visible)
        await expect(this.usernameInput).not.toBeVisible();
        await expect(this.passwordInput).not.toBeVisible();
        
        await expect(this.page.locator('#menuUserLink')).toContainText(username);
    }

    async verifyLoginFailure() {
        // Login modal/form should still be visible
        await expect(this.usernameInput).toBeVisible();
        await expect(this.passwordInput).toBeVisible();
        await expect(this.loginButton).toBeVisible();
        await expect(this.page.locator('#signInResultMessage')).toContainText('Incorrect user name or password.');
    }
}