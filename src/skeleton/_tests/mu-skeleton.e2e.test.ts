import {test, expect} from '@playwright/test';

test.describe('mu-skeleton e2e', () => {
  test('renders skeleton placeholder on page', async ({page}) => {
    // ARRANGE
    await page.setContent(`
      <!DOCTYPE html>
      <html>
        <body>
          <script type="module" src="/src/skeleton/mu-skeleton.ts"></script>
          <mu-skeleton variant="rectangular" width="200px" height="80px"></mu-skeleton>
        </body>
      </html>
    `);

    // ACT
    const skeleton = page.locator('mu-skeleton');

    // ASSERT
    await expect(skeleton).toBeAttached();
  });
});
