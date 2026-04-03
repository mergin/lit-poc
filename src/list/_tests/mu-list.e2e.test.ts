import {test, expect} from '@playwright/test';

test.describe('mu-list e2e', () => {
  test.beforeEach(async ({page}) => {
    // ARRANGE
    await page.setContent(`
      <script type="module" src="/src/list/mu-list.ts"></script>
      <script type="module" src="/src/list/mu-list-item.ts"></script>
      <mu-list>
        <mu-list-item>Item 1</mu-list-item>
        <mu-list-item>Item 2</mu-list-item>
      </mu-list>
    `);
  });

  test('renders visibly and contains items', async ({page}) => {
    // ACT
    const list = page.locator('mu-list');
    const items = page.locator('mu-list-item');

    // ASSERT
    await expect(list).toBeVisible();
    expect(await items.count()).toBe(2);
    await expect(items.nth(0)).toHaveText('Item 1');
  });
});
