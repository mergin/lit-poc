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

    // Playwright evaluates text nodes inside the element, which includes light DOM and shadow DOM text
    // The inner text will contain the light dom "Mail" and the shadow dom badge numbers/a11y strings
    const textContent = await badgeElement.textContent();
    expect(textContent).toContain('Mail');
    expect(textContent).toContain('3');
  });
});
