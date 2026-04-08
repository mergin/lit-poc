import {test, expect} from '@playwright/test';

test.describe('mu-button visual regression', (): void => {
  test('mu-button default snapshot', async ({page}): Promise<void> => {
    // ARRANGE
    await page.goto('/dev/button.html');
    await page.waitForSelector('mu-button');
    // ACT / ASSERT
    await expect(page).toHaveScreenshot('mu-button-default.png');
  });

  test('mu-button primary snapshot', async ({page}): Promise<void> => {
    // ARRANGE
    await page.goto('/dev/button.html');
    await page.waitForSelector('mu-button');
    // ACT / ASSERT
    await expect(page.locator('mu-button[color="primary"]').first()).toHaveScreenshot(
      'mu-button-primary.png'
    );
  });

  test('mu-button disabled snapshot', async ({page}): Promise<void> => {
    // ARRANGE
    await page.goto('/dev/button.html');
    await page.waitForSelector('mu-button[disabled]');
    // ACT / ASSERT
    await expect(page.locator('mu-button[disabled]').first()).toHaveScreenshot(
      'mu-button-disabled.png'
    );
  });
});
