import {test, expect} from '@playwright/test';

test.describe('mu-breadcrumb e2e', () => {
  test('renders breadcrumb navigation on page', async ({page}) => {
    // ARRANGE
    await page.setContent(`
      <!DOCTYPE html>
      <html>
        <body>
          <script type="module" src="/src/breadcrumb/mu-breadcrumb.ts"></script>
          <mu-breadcrumb>
            <mu-breadcrumb-item href="/">Home</mu-breadcrumb-item>
            <mu-breadcrumb-item current>Current Page</mu-breadcrumb-item>
          </mu-breadcrumb>
        </body>
      </html>
    `);

    // ACT
    const breadcrumb = page.locator('mu-breadcrumb');

    // ASSERT
    await expect(breadcrumb).toBeAttached();
  });
});
