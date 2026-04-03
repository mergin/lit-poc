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
    // Playwright evaluates light dom directly, but piercing shadow DOM needs deep locators or explicit evaluation
    // We can use the playwright locator to pierce shadow DOM:
    const deleteBtn = page.locator('mu-chip >> css=button.delete-btn');
    await deleteBtn.click();

    // ASSERT
    const result = page.locator('#result');
    await expect(result).toHaveText('Deleted');
  });
});
