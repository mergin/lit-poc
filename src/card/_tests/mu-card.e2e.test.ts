import {test, expect} from '@playwright/test';

const CARD_DEMO_URL = '/dev/card.html';

test.describe('mu-card (Playwright E2E)', (): void => {
  test('should be focusable', async ({page}): Promise<void> => {
    await page.goto(CARD_DEMO_URL);
    const card = await page.locator('mu-card').first();
    await card.evaluate(function (el: Element): void {
      el.setAttribute('tabindex', '0');
    });
    await card.focus();
    const tagName: unknown = await page.evaluate(function (): string | undefined {
      return document.activeElement?.tagName;
    });
    if (typeof tagName !== 'string') throw new Error('tagName not string');
    await expect(tagName).toBe('MU-CARD');
  });
});
