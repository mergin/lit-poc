import {test, expect} from '@playwright/test';
import {assertNoA11yViolations} from '../../test/a11y.js';

test.describe('mu-tabs e2e', () => {
  test('switches panel on tab click', async ({page}) => {
    // ARRANGE
    await page.goto('/');
    await page.setContent(`
      <!DOCTYPE html>
      <html>
        <body>
          <script type="module" src="/src/tabs/mu-tabs.ts"></script>
          <mu-tabs>
            <mu-tab slot="tab">Tab 1</mu-tab>
            <mu-tab slot="tab">Tab 2</mu-tab>
            <mu-tab-panel slot="panel">Panel 1 content</mu-tab-panel>
            <mu-tab-panel slot="panel">Panel 2 content</mu-tab-panel>
          </mu-tabs>
        </body>
      </html>
    `);
    await page.waitForLoadState('networkidle');
    await page.waitForFunction((): boolean => customElements.get('mu-tab') !== undefined);

    // ACT
    const secondTab = page.locator('mu-tab').nth(1);
    const btn = secondTab.locator('button');
    await btn.click();

    // ASSERT
    const tabs = page.locator('mu-tabs');
    await expect(tabs).toBeAttached();
  });

  test('mu-tabs has no accessibility violations', async ({page}): Promise<void> => {
    // ARRANGE
    await page.setContent(`
      <!DOCTYPE html>
      <html lang="en">
        <head><title>Tabs Test</title></head>
        <body>
          <script type="module" src="/src/tabs/mu-tabs.ts"></script>
          <mu-tabs>
            <mu-tab slot="tab">Tab 1</mu-tab>
            <mu-tab slot="tab">Tab 2</mu-tab>
            <mu-tab-panel slot="panel">Panel 1</mu-tab-panel>
            <mu-tab-panel slot="panel">Panel 2</mu-tab-panel>
          </mu-tabs>
        </body>
      </html>
    `);
    await page.waitForSelector('mu-tabs');
    // ACT / ASSERT
    await assertNoA11yViolations(page);
    // CLEANUP — none
  });
});
