import {test, expect} from '@playwright/test';

test.describe('mu-typography e2e', () => {
  test.beforeEach(async ({page}) => {
    // ARRANGE
    // We assume there's a routing to e2e test pages or storybook iframe, but standard playwright e2e structure
    // Since we don't have a specific test page running locally, we will use an inline evaluate pattern if needed,
    // or just assume this file is standard Playwright e2e for web components.
    // For now we will setup a basic test page using content.
    await page.setContent(`
      <script type="module" src="/src/typography/mu-typography.ts"></script>
      <mu-typography variant="h1">Heading E2E</mu-typography>
    `);
  });

  test('renders visually correctly and contains text', async ({page}) => {
    // ACT
    const header = page.locator('mu-typography');

    // ASSERT
    await expect(header).toBeVisible();
    await expect(header).toHaveText('Heading E2E');
  });
});
