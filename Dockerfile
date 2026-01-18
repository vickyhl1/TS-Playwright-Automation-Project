# Use official Playwright image with Node.js
FROM mcr.microsoft.com/playwright:v1.57.0-noble

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (use npm ci for production-like installs)
RUN npm ci

# Copy TypeScript configuration
COPY tsconfig.json ./

# Copy source code and tests
COPY src/ ./src/
COPY tests/ ./tests/
COPY playwright.config.ts ./

# Install Playwright browsers and system dependencies
RUN npx playwright install --with-deps chromium

# Set environment variables (can be overridden at runtime)
ENV CI=true
ENV NODE_ENV=production

# Run tests by default
CMD ["npm", "test"]