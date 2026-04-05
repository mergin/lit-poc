import {test, expect} from '@playwright/test';

test.describe('mu-app-bar e2e', () => {
  test('renders app bar on page', async ({page}) => {
    // ARRANGE
    await page.setContent(`
      <!DOCTYPE html>
      <html>
        <body>
          <script type="module" src="/src/app-bar/mu-app-bar.ts"></script>
          <mu-app-bar>
            <span slot="start">☰</span>
            <span>My App</span>
          </mu-app-bar>
        </body>
      </html>
    `);

    // ACT
    const appBar = page.locator('mu-app-bar');

    // ASSERT
    await expect(appBar).toBeAttached();
  });
});
