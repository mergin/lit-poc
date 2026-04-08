import {test, expect} from '@playwright/test';

test.describe('mu-linear-progress e2e', () => {
  test('renders progress bar on page', async ({page}) => {
    // ARRANGE
    await page.goto('/');
    await page.setContent(`
      <!DOCTYPE html>
      <html>
        <body>
          <script type="module" src="/src/linear-progress/mu-linear-progress.ts"></script>
          <mu-linear-progress value="50"></mu-linear-progress>
        </body>
      </html>
    `);
    await page.waitForLoadState('networkidle');
    await page.waitForFunction(
      (): boolean => customElements.get('mu-linear-progress') !== undefined
    );

    // ACT
    const el = page.locator('mu-linear-progress');
    await page.waitForSelector('mu-linear-progress[aria-valuenow]');

    // ASSERT
    await expect(el).toBeAttached();
    await expect(el).toHaveAttribute('aria-valuenow', '50');
  });
});
