import {test, expect} from '@playwright/test';

test.describe('mu-linear-progress e2e', () => {
  test('renders progress bar on page', async ({page}) => {
    // ARRANGE
    await page.setContent(`
      <!DOCTYPE html>
      <html>
        <body>
          <script type="module" src="/src/linear-progress/mu-linear-progress.ts"></script>
          <mu-linear-progress value="50"></mu-linear-progress>
        </body>
      </html>
    `);

    // ACT
    const el = page.locator('mu-linear-progress');

    // ASSERT
    await expect(el).toBeAttached();
    await expect(el).toHaveAttribute('aria-valuenow', '50');
  });
});
