import {test, expect} from '@playwright/test';

const URL = '/dev/text-field.html';

test.describe('mu-text-field (Playwright E2E)', (): void => {
  test('renders a visible label and input', async ({page}): Promise<void> => {
    // ARRANGE
    await page.goto(URL);

    // ACT
    const label = await page.evaluate((): string | null => {
      const el = document.getElementById('basic') as HTMLElement;
      return el?.shadowRoot?.querySelector('label')?.textContent?.trim() ?? null;
    });

    // ASSERT
    expect(label).toBe('Full name');

    // CLEANUP — none
  });

  test('typing updates the value property', async ({page}): Promise<void> => {
    // ARRANGE
    await page.goto(URL);

    // ACT
    await page.evaluate((): void => {
      const el = document.getElementById('basic') as HTMLElement;
      const input = el.shadowRoot?.querySelector<HTMLInputElement>('input');
      if (input) {
        input.value = 'Jane Doe';
        input.dispatchEvent(new Event('input', {bubbles: true}));
      }
    });

    const value = await page.evaluate((): string => {
      return (document.getElementById('basic') as HTMLElement & {value: string}).value;
    });

    // ASSERT
    expect(value).toBe('Jane Doe');

    // CLEANUP — none
  });

  test('error message is visible when error is set', async ({page}): Promise<void> => {
    // ARRANGE
    await page.goto(URL);

    // ACT
    const errorText = await page.evaluate((): string | null => {
      const el = document.getElementById('error') as HTMLElement;
      return el?.shadowRoot?.querySelector('.error-text')?.textContent?.trim() ?? null;
    });

    // ASSERT
    expect(errorText).toBe('Minimum 3 characters');

    // CLEANUP — none
  });
});
