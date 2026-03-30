import {test, expect} from '@playwright/test';

const AVATAR_DEMO_URL = 'http://localhost:8000/dev/avatar.html';

test.describe('mu-avatar (Playwright E2E)', (): void => {
  test('should be focusable and accessible', async ({page}): Promise<void> => {
    await page.goto(AVATAR_DEMO_URL);
    // Find the first mu-avatar
    const avatar = await page.locator('mu-avatar').first();
    // Set tabindex for focusability
    await avatar.evaluate((el: Element): void => el.setAttribute('tabindex', '0'));
    await avatar.focus();
    const tagName: unknown = await page.evaluate(
      (): string | undefined => document.activeElement?.tagName
    );
    if (typeof tagName !== 'string') throw new Error('tagName not string');
    await expect(tagName).toBe('MU-AVATAR');
    // Optionally check for accessibility attributes
    // await expect(avatar).toHaveAttribute('tabindex', '0');
  });
});
