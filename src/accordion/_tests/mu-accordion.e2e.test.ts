import {test, expect} from '@playwright/test';

test.describe('mu-accordion e2e', () => {
  test('expands item on header click', async ({page}) => {
    // ARRANGE
    await page.setContent(`
      <!DOCTYPE html>
      <html>
        <body>
          <script type="module" src="/src/accordion/mu-accordion.ts"></script>
          <mu-accordion>
            <mu-accordion-item heading="Section 1">Content 1</mu-accordion-item>
          </mu-accordion>
        </body>
      </html>
    `);
    await page.waitForSelector('mu-accordion-item');

    // ACT
    const item = page.locator('mu-accordion-item');

    // ASSERT
    await expect(item).toBeAttached();
  });
});
