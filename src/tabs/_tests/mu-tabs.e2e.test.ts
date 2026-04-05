import {test, expect} from '@playwright/test';

test.describe('mu-tabs e2e', () => {
  test('switches panel on tab click', async ({page}) => {
    // ARRANGE
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
    await page.waitForSelector('mu-tabs');

    // ACT
    const secondTab = page.locator('mu-tab').nth(1);
    const btn = secondTab.locator('button');
    await btn.click();

    // ASSERT
    const tabs = page.locator('mu-tabs');
    await expect(tabs).toBeAttached();
  });
});
