import {test, expect} from '@playwright/test';

test.describe('mu-drawer e2e', () => {
  test('renders drawer on page', async ({page}) => {
    // ARRANGE
    await page.setContent(`
      <!DOCTYPE html>
      <html>
        <body>
          <script type="module" src="/src/drawer/mu-drawer.ts"></script>
          <mu-drawer placement="left">
            <p>Drawer content</p>
          </mu-drawer>
        </body>
      </html>
    `);

    // ACT
    const drawer = page.locator('mu-drawer');

    // ASSERT
    await expect(drawer).toBeAttached();
  });
});
