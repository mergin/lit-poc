import {test, expect} from '@playwright/test';

const URL = '/dev/switch.html';

test.describe('mu-switch (Playwright E2E)', (): void => {
  test('renders as unchecked by default', async ({page}): Promise<void> => {
    // ARRANGE
    await page.goto(URL);

    // ACT
    const ariaChecked = await page.evaluate((): string => {
      const el = document.getElementById('basic') as HTMLElement;
      return el?.shadowRoot?.querySelector('[role="switch"]')?.getAttribute('aria-checked') ?? '';
    });

    // ASSERT
    expect(ariaChecked).toBe('false');

    // CLEANUP — none
  });

  test('toggles on click', async ({page}): Promise<void> => {
    // ARRANGE
    await page.goto(URL);

    // ACT
    await page.evaluate((): void => {
      const el = document.getElementById('basic') as HTMLElement;
      (el.shadowRoot?.querySelector('[role="switch"]') as HTMLElement)?.click();
    });

    const checked = await page.evaluate((): boolean => {
      return (document.getElementById('basic') as HTMLElement & {checked: boolean}).checked;
    });

    // ASSERT
    expect(checked).toBe(true);

    // CLEANUP — none
  });

  test('disabled switch cannot be toggled', async ({page}): Promise<void> => {
    // ARRANGE
    await page.goto(URL);

    // ACT
    await page.evaluate((): void => {
      const el = document.getElementById('disabled') as HTMLElement;
      (el.shadowRoot?.querySelector('[role="switch"]') as HTMLElement)?.click();
    });

    const checked = await page.evaluate((): boolean => {
      return (document.getElementById('disabled') as HTMLElement & {checked: boolean}).checked;
    });

    // ASSERT
    expect(checked).toBe(false);

    // CLEANUP — none
  });
});
