import {test, expect} from '@playwright/test';

test.describe('mu-badge e2e', () => {
  test.beforeEach(async ({page}) => {
    // ARRANGE
    await page.setContent(`
      <script type="module" src="/src/badge/mu-badge.ts"></script>
      <mu-badge content="3">Mail</mu-badge>
    `);
  });

  test('renders visually correctly and has a11y text', async ({page}) => {
    // ACT
    const badgeElement = page.locator('mu-badge');

    // ASSERT
    await expect(badgeElement).toBeVisible();

    await expect(badgeElement).toContainText('Mail');
    await expect(badgeElement).toContainText('3');
  });
});
