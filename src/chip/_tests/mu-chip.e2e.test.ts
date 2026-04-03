import {test, expect} from '@playwright/test';

test.describe('mu-chip e2e', () => {
  test.beforeEach(async ({page}) => {
    // ARRANGE
    await page.setContent(`
      <script type="module" src="/src/chip/mu-chip.ts"></script>
      <mu-chip label="Pizza" deletable id="chip"></mu-chip>
      <div id="result"></div>
      <script>
        document.getElementById('chip').addEventListener('delete', () => {
          document.getElementById('result').innerText = 'Deleted';
        });
      </script>
    `);
  });

  test('fires delete event when cancel icon is clicked', async ({page}) => {
    // ACT
    const deleteBtn = page.locator('#chip').locator('.delete-btn');
    await deleteBtn.click();

    // ASSERT
    const result = page.locator('#result');
    await expect(result).toHaveText('Deleted');
  });
});
