import {test, expect} from '@playwright/test';
import {assertNoA11yViolations} from '../../../../../internal/utils/a11y.js';

const URL = '/dev/tooltip.html';

test.describe('mu-tooltip (Playwright E2E)', (): void => {
  test('tooltip is not visible on initial load', async ({page}): Promise<void> => {
    // ARRANGE
    await page.goto(URL);

    // ACT
    const isVisible = await page.evaluate((): boolean => {
      const el = document.getElementById('top-tip') as HTMLElement;
      const tooltip = el?.shadowRoot?.querySelector('[role="tooltip"]');
      return tooltip?.classList.contains('visible') ?? false;
    });

    // ASSERT
    expect(isVisible).toBe(false);

    // CLEANUP — none
  });

  test('tooltip renders label text', async ({page}): Promise<void> => {
    // ARRANGE
    await page.goto(URL);

    // ACT
    const text = await page.evaluate((): string => {
      const el = document.getElementById('top-tip') as HTMLElement;
      return el?.shadowRoot?.querySelector('[role="tooltip"]')?.textContent?.trim() ?? '';
    });

    // ASSERT
    expect(text).toBe('Top tooltip');

    // CLEANUP — none
  });

  test('tooltip becomes visible after hover', async ({page}): Promise<void> => {
    // ARRANGE
    await page.goto(URL);

    // ACT — hover over the trigger button and wait for the 300 ms delay
    await page.hover('#top-tip button');
    await page.waitForTimeout(400);

    const isVisible = await page.evaluate((): boolean => {
      const el = document.getElementById('top-tip') as HTMLElement;
      const tooltip = el?.shadowRoot?.querySelector('[role="tooltip"]');
      return tooltip?.classList.contains('visible') ?? false;
    });

    // ASSERT
    expect(isVisible).toBe(true);

    // CLEANUP — none
  });

  test('mu-tooltip has no accessibility violations', async ({page}): Promise<void> => {
    // ARRANGE
    await page.goto(URL);
    await page.waitForSelector('mu-tooltip');
    // ACT / ASSERT
    await assertNoA11yViolations(page);
    // CLEANUP — none
  });
});
