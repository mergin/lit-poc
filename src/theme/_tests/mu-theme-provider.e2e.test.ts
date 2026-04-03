import {test, expect} from '@playwright/test';

const THEME_DEMO_URL = '/dev/theme.html';

test.describe('mu-theme-provider (Playwright E2E)', (): void => {
  test('renders children in light mode with correct primary token', async ({
    page,
  }): Promise<void> => {
    // ARRANGE
    await page.goto(THEME_DEMO_URL);

    // ACT
    const primary = await page.evaluate((): string => {
      const provider = document.querySelector('mu-theme-provider') as HTMLElement;
      return provider?.style.getPropertyValue('--mu-primary').trim() ?? '';
    });

    // ASSERT
    expect(primary).toBe('#1976d2');

    // CLEANUP — none
  });

  test('applies dark tokens when mode is set to dark', async ({page}): Promise<void> => {
    // ARRANGE
    await page.goto(THEME_DEMO_URL);

    // ACT
    await page.evaluate((): void => {
      const provider = document.querySelector('mu-theme-provider') as HTMLElement & {mode: string};
      provider.mode = 'dark';
    });

    const primary = await page.evaluate((): string => {
      const provider = document.querySelector('mu-theme-provider') as HTMLElement;
      return provider?.style.getPropertyValue('--mu-primary').trim() ?? '';
    });

    // ASSERT
    expect(primary).toBe('#90caf9');

    // CLEANUP — none
  });

  test('switching back to light restores light tokens', async ({page}): Promise<void> => {
    // ARRANGE
    await page.goto(THEME_DEMO_URL);
    await page.evaluate((): void => {
      const provider = document.querySelector('mu-theme-provider') as HTMLElement & {mode: string};
      provider.mode = 'dark';
    });

    // ACT
    await page.evaluate((): void => {
      const provider = document.querySelector('mu-theme-provider') as HTMLElement & {mode: string};
      provider.mode = 'light';
    });

    const bgPaper = await page.evaluate((): string => {
      const provider = document.querySelector('mu-theme-provider') as HTMLElement;
      return provider?.style.getPropertyValue('--mu-bg-paper').trim() ?? '';
    });

    // ASSERT
    expect(bgPaper).toBe('#fff');

    // CLEANUP — none
  });
});
