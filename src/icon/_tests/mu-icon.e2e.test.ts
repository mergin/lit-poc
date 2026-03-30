import {test, expect} from '@playwright/test';

const ICON_DEMO_URL = 'http://localhost:8000/dev/icon.html';

test.describe('mu-icon (Playwright E2E)', (): void => {
  test('should be focusable', async ({page}): Promise<void> => {
    await page.goto(ICON_DEMO_URL);
    const icon = await page.locator('mu-icon').first();
    await icon.evaluate(function (el: Element): void {
      el.setAttribute('tabindex', '0');
    });
    await icon.focus();
    const tagName: unknown = await page.evaluate(function (): string | undefined {
      return document.activeElement?.tagName;
    });
    if (typeof tagName !== 'string') throw new Error('tagName not string');
    await expect(tagName).toBe('MU-ICON');
  });
});
