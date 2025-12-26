# Project Requirements

## System Requirements

### Node.js
- **Version**: 18.x or higher
- **Download**: https://nodejs.org/
- **Verify**: `node --version`

### npm
- **Version**: 9.x or higher (comes with Node.js)
- **Verify**: `npm --version`

### Operating System
- Windows 10/11
- macOS 10.15+
- Linux (Ubuntu 20.04+, Debian 11+, etc.)

### Git
- **Version**: 2.30+
- **Download**: https://git-scm.com/
- **Verify**: `git --version`

## Dependencies

### Production Dependencies
None (this is a test automation project)

### Development Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `@playwright/test` | ^1.57.0 | End-to-end testing framework |
| `@types/node` | ^20.14.0 | TypeScript type definitions for Node.js |
| `dotenv` | ^17.2.3 | Environment variable management |
| `typescript` | ^5.9.3 | TypeScript compiler |

## Browser Requirements

Playwright will automatically install browsers on first run:
- Chromium (Chrome/Edge)
- Firefox (optional)
- WebKit (Safari, optional)

**Installation**: `npx playwright install`

## Environment Variables

Required environment variables (see `.env.example`):

- `BASE_URL`: Base URL for the application (optional, has default)
- `TEST_USERNAME`: Test account username (required for login tests)
- `TEST_PASSWORD`: Test account password (required for login tests)

## Disk Space

- Minimum: 500 MB (for dependencies)
- Recommended: 1 GB (includes browser binaries)

## Memory

- Minimum: 4 GB RAM
- Recommended: 8 GB RAM

## Network

- Internet connection required for:
  - Installing dependencies (`npm install`)
  - Installing Playwright browsers
  - Running tests against remote application

## Installation Steps

1. **Install Node.js** (if not already installed)
   ```bash
   # Verify installation
   node --version
   npm --version
   ```

2. **Clone the repository**
   ```bash
   git clone https://github.com/vickyhl1/TS-Playwright-Automation-Project.git
   cd TS-Playwright-Automation-Project
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Install Playwright browsers**
   ```bash
   npx playwright install
   ```

5. **Set up environment variables**
   ```bash
   # Copy example file
   cp .env.example .env
   
   # Edit .env file with your credentials
   # Windows PowerShell:
   Copy-Item .env.example .env
   ```

6. **Verify installation**
   ```bash
   npm test
   ```

## Verification Checklist

- [ ] Node.js 18+ installed
- [ ] npm 9+ installed
- [ ] Git installed
- [ ] Dependencies installed (`npm install`)
- [ ] Playwright browsers installed (`npx playwright install`)
- [ ] `.env` file configured
- [ ] Tests run successfully (`npm test`)

## Troubleshooting

### Node.js version issues
- Use `nvm` (Node Version Manager) to manage multiple Node.js versions
- Windows: https://github.com/coreybutler/nvm-windows
- macOS/Linux: https://github.com/nvm-sh/nvm

### Playwright browser installation fails
- Check internet connection
- Run: `npx playwright install --with-deps`
- For Linux, install system dependencies manually

### Permission errors
- Windows: Run PowerShell/CMD as Administrator
- macOS/Linux: Use `sudo` if needed (not recommended for npm install)

### TypeScript errors
- Ensure `tsconfig.json` is properly configured
- Restart TypeScript server in your IDE
- Run: `npx tsc --noEmit` to check for type errors

### Module resolution errors
- Ensure file imports use `.js` extension (required for ESM)
- Check that `package.json` has `"type": "module"`
- Verify `tsconfig.json` has `"module": "nodenext"`

### Environment variables not loading
- Ensure `.env` file exists in project root
- Verify `dotenv` is installed: `npm list dotenv`
- Check that `playwright.config.ts` imports and configures `dotenv`

## IDE Setup (Optional but Recommended)

### VS Code / Cursor Extensions
- **Playwright Test for VS Code**: Playwright-specific IntelliSense
- **ESLint**: Code linting (optional)
- **Prettier**: Code formatting (optional)

### TypeScript Configuration
- Ensure workspace TypeScript version matches project
- Press `Ctrl + Shift + P` → "TypeScript: Select TypeScript Version"
- Choose "Use Workspace Version"

## CI/CD Requirements

### GitHub Actions
- Node.js 18+ runner
- Access to GitHub Secrets for:
  - `TEST_USERNAME`
  - `TEST_PASSWORD`
  - `BASE_URL` (optional)

### Environment Variables in CI
- Use GitHub Secrets for sensitive data
- Set `CI=true` for CI environment detection
- Configure test retries and workers in `playwright.config.ts`

## Additional Resources

- [Playwright Documentation](https://playwright.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Node.js Documentation](https://nodejs.org/docs/)
- [Git Documentation](https://git-scm.com/doc)
