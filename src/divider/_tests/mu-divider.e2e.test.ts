import {test, expect} from '@playwright/test';

test.describe('mu-divider e2e', () => {
  test.beforeEach(async ({page}) => {
    // ARRANGE
    await page.setContent(`
      <script type="module" src="/src/divider/mu-divider.ts"></script>
      <mu-divider id="div1"></mu-divider>
      <div style="height: 100px; display: flex;">
        <mu-divider id="div2" orientation="vertical"></mu-divider>
      </div>
    `);
  });

  test('renders visibly', async ({page}) => {
    // ACT
    const div1 = page.locator('#div1');
    const div2 = page.locator('#div2');

    // ASSERT
    await expect(div1).toBeVisible();
    await expect(div2).toBeVisible();
  });
});
