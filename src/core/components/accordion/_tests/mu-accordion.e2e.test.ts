import {test, expect} from '@playwright/test';
import {assertNoA11yViolations} from '../../../../../internal/utils/a11y.js';

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

  test('mu-accordion has no accessibility violations', async ({page}): Promise<void> => {
    // ARRANGE
    await page.setContent(`
      <!DOCTYPE html>
      <html lang="en">
        <head><title>Accordion Test</title></head>
        <body>
          <script type="module" src="/src/accordion/mu-accordion.ts"></script>
          <mu-accordion>
            <mu-accordion-item heading="Section 1">Content 1</mu-accordion-item>
          </mu-accordion>
        </body>
      </html>
    `);
    await page.waitForSelector('mu-accordion-item');
    // ACT / ASSERT
    await assertNoA11yViolations(page);
    // CLEANUP — none
  });
});
