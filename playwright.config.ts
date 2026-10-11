import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: false,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: process.env.CI ? [['line'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL: 'http://localhost:3100',
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
    video: 'retain-on-failure',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: [
    {
      command: 'corepack pnpm --filter @portfolio/api dev',
      name: 'API',
      reuseExistingServer: !process.env.CI,
      stderr: 'pipe',
      timeout: 120_000,
      url: 'http://localhost:4100/api/v1/health',
    },
    {
      command: 'corepack pnpm --filter @portfolioEGR/web dev',
      name: 'Web',
      reuseExistingServer: !process.env.CI,
      stderr: 'pipe',
      timeout: 120_000,
      url: 'http://localhost:3100',
    },
  ],
});
