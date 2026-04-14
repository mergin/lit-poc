import {test, expect} from '@playwright/test';
import {assertNoA11yViolations} from '../../../../internal/utils/a11y.js';

const URL = '/dev/select.html';

test.describe('mu-select (Playwright E2E)', (): void => {
  test('renders a label and native select', async ({page}): Promise<void> => {
    // ARRANGE
    await page.goto(URL);

    // ACT
    const label = await page.evaluate((): string | null => {
      const el = document.getElementById('basic') as HTMLElement;
      return el?.shadowRoot?.querySelector('label')?.textContent?.trim() ?? null;
    });

    // ASSERT
    expect(label).toBe('Country');

    // CLEANUP — none
  });

  test('select with value pre-selects the correct option', async ({page}): Promise<void> => {
    // ARRANGE
    await page.goto(URL);

    // ACT
    const selectValue = await page.evaluate((): string => {
      const el = document.getElementById('has-value') as HTMLElement;
      return (el?.shadowRoot?.querySelector('select') as HTMLSelectElement)?.value ?? '';
    });

    // ASSERT
    expect(selectValue).toBe('lit');

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
    expect(errorText).toBe('Please select a role');

    // CLEANUP — none
  });

  test('mu-select has no accessibility violations', async ({page}): Promise<void> => {
    // ARRANGE
    await page.goto(URL);
    await page.waitForSelector('mu-select');
    // ACT / ASSERT
    await assertNoA11yViolations(page);
    // CLEANUP — none
  });
});
