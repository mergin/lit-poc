import {test, expect} from '@playwright/test';

const CHIP_INPUT_URL = '/dev/chip-input.html';

test.describe('mu-chip-input e2e', (): void => {
  test('adds a chip when Enter is pressed after typing', async ({page}): Promise<void> => {
    // ARRANGE
    await page.goto(CHIP_INPUT_URL);
    await page.waitForSelector('mu-chip-input');
    const chipInput = page.locator('mu-chip-input').first();
    const input = chipInput.locator('input');

    // ACT
    await input.fill('TypeScript');
    await input.press('Enter');

    // ASSERT
    await expect(chipInput.locator('mu-chip')).toHaveCount(1);

    // CLEANUP — none
  });

  test('adds a chip when comma is pressed after typing', async ({page}): Promise<void> => {
    // ARRANGE
    await page.goto(CHIP_INPUT_URL);
    await page.waitForSelector('mu-chip-input');
    const chipInput = page.locator('mu-chip-input').first();
    const input = chipInput.locator('input');

    // ACT
    await input.fill('React');
    await page.keyboard.press(',');

    // ASSERT
    await expect(chipInput.locator('mu-chip')).toHaveCount(1);

    // CLEANUP — none
  });

  test('removes the last chip when Backspace is pressed on empty input', async ({
    page,
  }): Promise<void> => {
    // ARRANGE
    await page.goto(CHIP_INPUT_URL);
    await page.waitForSelector('mu-chip-input');
    await page.evaluate((): void => {
      const el = document.querySelector('mu-chip-input') as HTMLElement & {chips: string[]};
      el.chips = ['Angular', 'Vue'];
    });
    const chipInput = page.locator('mu-chip-input').first();
    const input = chipInput.locator('input');
    await expect(chipInput.locator('mu-chip')).toHaveCount(2);

    // ACT
    await input.focus();
    await page.keyboard.press('Backspace');

    // ASSERT
    await expect(chipInput.locator('mu-chip')).toHaveCount(1);

    // CLEANUP — none
  });

  test('dispatches change event with updated chips array', async ({page}): Promise<void> => {
    // ARRANGE
    await page.goto(CHIP_INPUT_URL);
    await page.waitForSelector('mu-chip-input');
    await page.evaluate((): void => {
      const el = document.querySelector('mu-chip-input') as HTMLElement;
      const log = document.createElement('div');
      log.id = 'event-log';
      document.body.appendChild(log);
      el.addEventListener('change', (e: Event): void => {
        log.textContent = JSON.stringify((e as CustomEvent<{chips: string[]}>).detail.chips);
      });
    });
    const chipInput = page.locator('mu-chip-input').first();
    const input = chipInput.locator('input');

    // ACT
    await input.fill('Svelte');
    await input.press('Enter');

    // ASSERT
    await expect(page.locator('#event-log')).toHaveText('["Svelte"]');

    // CLEANUP — none
  });
});
