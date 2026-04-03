import {test, expect} from '@playwright/test';

const URL = '/dev/radio.html';

test.describe('mu-radio (Playwright E2E)', (): void => {
  test('initially checked radio has aria-checked="true"', async ({page}): Promise<void> => {
    // ARRANGE
    await page.goto(URL);

    // ACT
    const ariaChecked = await page.evaluate((): string => {
      const el = document.getElementById('apple') as HTMLElement;
      return el?.shadowRoot?.querySelector('[role="radio"]')?.getAttribute('aria-checked') ?? '';
    });

    // ASSERT
    expect(ariaChecked).toBe('true');

    // CLEANUP — none
  });

  test('clicking a radio selects it', async ({page}): Promise<void> => {
    // ARRANGE
    await page.goto(URL);

    // ACT
    await page.evaluate((): void => {
      const el = document.getElementById('banana') as HTMLElement;
      (el.shadowRoot?.querySelector('[role="radio"]') as HTMLElement)?.click();
    });

    const checked = await page.evaluate((): boolean => {
      return (document.getElementById('banana') as HTMLElement & {checked: boolean}).checked;
    });

    // ASSERT
    expect(checked).toBe(true);

    // CLEANUP — none
  });

  test('disabled radio cannot be selected', async ({page}): Promise<void> => {
    // ARRANGE
    await page.goto(URL);

    // ACT
    await page.evaluate((): void => {
      const el = document.getElementById('cherry') as HTMLElement;
      (el.shadowRoot?.querySelector('[role="radio"]') as HTMLElement)?.click();
    });

    const checked = await page.evaluate((): boolean => {
      return (document.getElementById('cherry') as HTMLElement & {checked: boolean}).checked;
    });

    // ASSERT
    expect(checked).toBe(false);

    // CLEANUP — none
  });
});
