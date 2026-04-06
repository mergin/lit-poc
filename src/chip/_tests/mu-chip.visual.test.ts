import {test, expect} from '@playwright/test';

test.describe('mu-chip visual regression', (): void => {
  test('mu-chip default snapshot', async ({page}): Promise<void> => {
    // ARRANGE
    await page.goto('/dev/chip.html');
    await page.waitForSelector('mu-chip');
    // ACT / ASSERT
    await expect(page.locator('mu-chip').first()).toHaveScreenshot('mu-chip-default.png');
  });

  test('mu-chip deletable snapshot', async ({page}): Promise<void> => {
    // ARRANGE
    await page.goto('/dev/chip.html');
    await page.waitForSelector('mu-chip[deletable]');
    // ACT / ASSERT
    await expect(page.locator('mu-chip[deletable]').first()).toHaveScreenshot(
      'mu-chip-deletable.png'
    );
  });

  test('mu-chip selected snapshot', async ({page}): Promise<void> => {
    // ARRANGE
    await page.goto('/dev/chip.html');
    await page.waitForSelector('mu-chip');
    // ACT / ASSERT
    await expect(page.locator('mu-chip[selected]').first()).toHaveScreenshot(
      'mu-chip-selected.png'
    );
  });
});
