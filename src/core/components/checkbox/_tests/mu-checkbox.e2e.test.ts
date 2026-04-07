import {test, expect} from '@playwright/test';
import {assertNoA11yViolations} from '../../../../test/a11y.js';

const URL = '/dev/checkbox.html';

test.describe('mu-checkbox (Playwright E2E)', (): void => {
  test('renders and is unchecked by default', async ({page}): Promise<void> => {
    // ARRANGE
    await page.goto(URL);

    // ACT
    const ariaChecked = await page.evaluate((): string => {
      const el = document.getElementById('basic') as HTMLElement;
      return el?.shadowRoot?.querySelector('[role="checkbox"]')?.getAttribute('aria-checked') ?? '';
    });

    // ASSERT
    expect(ariaChecked).toBe('false');

    // CLEANUP — none
  });

  test('toggles to checked on click', async ({page}): Promise<void> => {
    // ARRANGE
    await page.goto(URL);

    // ACT
    await page.evaluate((): void => {
      const el = document.getElementById('basic') as HTMLElement;
      (el.shadowRoot?.querySelector('[role="checkbox"]') as HTMLElement)?.click();
    });

    const checked = await page.evaluate((): boolean => {
      return (document.getElementById('basic') as HTMLElement & {checked: boolean}).checked;
    });

    // ASSERT
    expect(checked).toBe(true);

    // CLEANUP — none
  });

  test('disabled checkbox cannot be toggled', async ({page}): Promise<void> => {
    // ARRANGE
    await page.goto(URL);

    // ACT
    await page.evaluate((): void => {
      const el = document.getElementById('disabled') as HTMLElement;
      (el.shadowRoot?.querySelector('[role="checkbox"]') as HTMLElement)?.click();
    });

    const checked = await page.evaluate((): boolean => {
      return (document.getElementById('disabled') as HTMLElement & {checked: boolean}).checked;
    });

    // ASSERT
    expect(checked).toBe(false);

    // CLEANUP — none
  });

  test('mu-checkbox has no accessibility violations', async ({page}): Promise<void> => {
    // ARRANGE
    await page.goto(URL);
    await page.waitForSelector('mu-checkbox');
    // ACT / ASSERT
    await assertNoA11yViolations(page);
    // CLEANUP — none
  });
});
