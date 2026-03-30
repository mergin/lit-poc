/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {test, expect} from '@playwright/test';

const BUTTON_DEMO_URL = 'http://localhost:8000/dev/button.html';

test.describe('mu-button (Playwright E2E)', (): void => {
  test('renders with text', async ({page}): Promise<void> => {
    await page.goto(BUTTON_DEMO_URL);
    // Find the first mu-button with text
    const button = await page.locator('mu-button').first();
    const innerButton = button.locator('button');
    await expect(innerButton).toHaveText(/Accessible Button/);
  });

  test('renders as disabled', async ({page}): Promise<void> => {
    await page.goto(BUTTON_DEMO_URL);
    // Find the second mu-button (disabled example)
    const button = await page.locator('mu-button').nth(1);
    const innerButton = button.locator('button');
    // The demo does not have disabled, so let's set it
    await button.evaluate((el: Element): void => el.setAttribute('disabled', ''));
    await expect(innerButton).toBeDisabled();
  });

  test('fires click event', async ({page}): Promise<void> => {
    await page.goto(BUTTON_DEMO_URL);
    // Find the first mu-button
    const button = await page.locator('mu-button').first();
    const innerButton = button.locator('button');
    // Attach a click handler in the browser context
    await page.evaluate(function (): void {
      (window as unknown as {clicked: boolean}).clicked = false;
      document.querySelector('mu-button')?.addEventListener('click', () => {
        (window as unknown as {clicked: boolean}).clicked = true;
      });
    });
    await innerButton.click();
    const clicked: unknown = await page.evaluate(function (): boolean | undefined {
      return (window as unknown as {clicked?: boolean}).clicked;
    });
    expect(clicked).toBe(true);
  });
});
