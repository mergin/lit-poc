import {test, expect} from '@playwright/test';

test.describe('mu-spinner e2e', () => {
  test('renders progressbar on page', async ({page}) => {
    // ARRANGE
    await page.setContent(`
      <!DOCTYPE html>
      <html>
        <body>
          <script type="module" src="/src/spinner/mu-spinner.ts"></script>
          <mu-spinner></mu-spinner>
        </body>
      </html>
    `);

    // ACT
    const spinner = page.locator('mu-spinner');

    // ASSERT
    await expect(spinner).toBeAttached();
  });
});
