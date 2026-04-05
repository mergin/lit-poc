import {test, expect} from '@playwright/test';

test.describe('mu-alert e2e', () => {
  test('renders alert on page', async ({page}) => {
    // ARRANGE
    await page.setContent(`
      <!DOCTYPE html>
      <html>
        <body>
          <script type="module" src="/src/alert/mu-alert.ts"></script>
          <mu-alert severity="error" close-label="Close">Something went wrong.</mu-alert>
        </body>
      </html>
    `);

    // ACT
    const alert = page.locator('mu-alert');

    // ASSERT
    await expect(alert).toBeAttached();
  });
});
