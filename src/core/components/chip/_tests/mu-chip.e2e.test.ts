import {test, expect} from '@playwright/test';

const CHIP_DEMO_URL = '/dev/chip.html';

test.describe('mu-chip e2e', () => {
  test('fires delete event when cancel icon is clicked', async ({page}) => {
    // ARRANGE
    await page.goto(CHIP_DEMO_URL);
    await page.evaluate(() => {
      const chip = document.querySelector<HTMLElement>('mu-chip[deletable]');
      const result = document.createElement('div');
      result.id = 'result';
      document.body.appendChild(result);
      chip?.addEventListener('delete', () => {
        result.textContent = 'Deleted';
      });
    });

    // ACT
    const deleteBtn = page.locator('mu-chip[deletable]').locator('.delete-btn');
    await deleteBtn.click();

    // ASSERT
    const result = page.locator('#result');
    await expect(result).toHaveText('Deleted');
  });
});
