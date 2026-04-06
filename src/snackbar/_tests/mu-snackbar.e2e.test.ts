import {test, expect} from '@playwright/test';
import {assertNoA11yViolations} from '../../test/a11y.js';

const URL = '/dev/snackbar.html';

test.describe('mu-snackbar (Playwright E2E)', (): void => {
  test('snackbar is closed on initial load', async ({page}): Promise<void> => {
    // ARRANGE
    await page.goto(URL);

    // ACT
    const isOpen = await page.evaluate((): boolean => {
      return (document.getElementById('snackbar') as HTMLElement & {open: boolean}).open;
    });

    // ASSERT
    expect(isOpen).toBe(false);

    // CLEANUP — none
  });

  test('shows default snackbar with correct message', async ({page}): Promise<void> => {
    // ARRANGE
    await page.goto(URL);

    // ACT
    await page.click('#show-default');
    const message = await page.evaluate((): string => {
      const el = document.getElementById('snackbar') as HTMLElement;
      return el?.shadowRoot?.querySelector('.message')?.textContent?.trim() ?? '';
    });

    // ASSERT
    expect(message).toBe('Changes saved');

    // CLEANUP — none
  });

  test('dismiss button closes the snackbar', async ({page}): Promise<void> => {
    // ARRANGE
    await page.goto(URL);
    await page.click('#show-default');

    // ACT
    await page.evaluate((): void => {
      const el = document.getElementById('snackbar') as HTMLElement;
      (el?.shadowRoot?.querySelector('.close') as HTMLElement)?.click();
    });

    const isOpen = await page.evaluate((): boolean => {
      return (document.getElementById('snackbar') as HTMLElement & {open: boolean}).open;
    });

    // ASSERT
    expect(isOpen).toBe(false);

    // CLEANUP — none
  });

  test('mu-snackbar has no accessibility violations', async ({page}): Promise<void> => {
    // ARRANGE
    await page.goto(URL);
    await page.waitForSelector('mu-snackbar', {state: 'attached'});
    // ACT / ASSERT
    await assertNoA11yViolations(page);
    // CLEANUP — none
  });
});
