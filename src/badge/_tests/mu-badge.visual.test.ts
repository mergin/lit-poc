import {test, expect} from '@playwright/test';

test.describe('mu-badge visual regression', (): void => {
  test('mu-badge default snapshot', async ({page}): Promise<void> => {
    // ARRANGE
    await page.goto('/dev/badge.html');
    await page.waitForSelector('mu-badge');
    // ACT / ASSERT
    await expect(page.locator('mu-badge').first()).toHaveScreenshot('mu-badge-default.png');
  });

  test('mu-badge primary variant snapshot', async ({page}): Promise<void> => {
    // ARRANGE
    await page.goto('/dev/badge.html');
    await page.waitForSelector('mu-badge');
    // ACT / ASSERT
    await expect(page.locator('mu-badge[color="primary"]').first()).toHaveScreenshot(
      'mu-badge-primary.png'
    );
  });

  test('mu-badge error variant snapshot', async ({page}): Promise<void> => {
    // ARRANGE
    await page.goto('/dev/badge.html');
    await page.waitForSelector('mu-badge');
    // ACT / ASSERT
    await expect(page.locator('mu-badge[color="error"]').first()).toHaveScreenshot(
      'mu-badge-error.png'
    );
  });
});
