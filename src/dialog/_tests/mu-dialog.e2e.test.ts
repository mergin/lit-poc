import {test, expect} from '@playwright/test';
import {assertNoA11yViolations} from '../../test/a11y.js';

const URL = '/dev/dialog.html';

test.describe('mu-dialog (Playwright E2E)', (): void => {
  test('dialog is closed by default', async ({page}): Promise<void> => {
    // ARRANGE
    await page.goto(URL);

    // ACT
    const isOpen = await page.evaluate((): boolean => {
      return (document.getElementById('my-dialog') as HTMLElement & {open: boolean}).open;
    });

    // ASSERT
    expect(isOpen).toBe(false);

    // CLEANUP — none
  });

  test('opens when open property is set to true', async ({page}): Promise<void> => {
    // ARRANGE
    await page.goto(URL);

    // ACT
    await page.evaluate((): void => {
      (document.getElementById('my-dialog') as HTMLElement & {open: boolean}).open = true;
    });

    const isOpen = await page.evaluate((): boolean => {
      return (document.getElementById('my-dialog') as HTMLElement & {open: boolean}).open;
    });

    // ASSERT
    expect(isOpen).toBe(true);

    // CLEANUP — none
  });

  test('closes when cancel button is clicked', async ({page}): Promise<void> => {
    // ARRANGE
    await page.goto(URL);
    await page.evaluate((): void => {
      (document.getElementById('my-dialog') as HTMLElement & {open: boolean}).open = true;
    });

    // ACT
    await page.click('#cancel-btn');

    const isOpen = await page.evaluate((): boolean => {
      return (document.getElementById('my-dialog') as HTMLElement & {open: boolean}).open;
    });

    // ASSERT
    expect(isOpen).toBe(false);

    // CLEANUP — none
  });

  test('mu-dialog has no accessibility violations', async ({page}): Promise<void> => {
    // ARRANGE
    await page.goto(URL);
    await page.waitForSelector('mu-dialog');
    // ACT / ASSERT
    await assertNoA11yViolations(page);
    // CLEANUP — none
  });
});
