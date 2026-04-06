import {test, expect} from '@playwright/test';

const URL = '/dev/slider.html';

test.describe('mu-slider e2e', () => {
  test.beforeEach(async ({page}) => {
    await page.goto(URL);
  });

  test('renders the basic slider', async ({page}) => {
    // ARRANGE
    const slider = page.locator('#basic');
    // ACT
    await slider.waitFor();
    // ASSERT
    await expect(slider).toBeVisible();
    // CLEANUP — none
  });

  test('thumb has correct ARIA attributes', async ({page}) => {
    // ARRANGE
    const slider = page.locator('#basic');
    // ACT
    const thumb = slider.locator('[role="slider"]');
    // ASSERT
    await expect(thumb).toHaveAttribute('aria-valuemin', '0');
    await expect(thumb).toHaveAttribute('aria-valuemax', '100');
    await expect(thumb).toHaveAttribute('aria-valuenow', '30');
    // CLEANUP — none
  });

  test('keyboard ArrowRight increases value', async ({page}) => {
    // ARRANGE
    const slider = page.locator('#basic');
    const thumb = slider.locator('[role="slider"]');
    await thumb.waitFor();
    // ACT
    await thumb.focus();
    await page.keyboard.press('ArrowRight');
    // ASSERT
    const newValue = await slider.evaluate((el: HTMLElement) =>
      el.shadowRoot?.querySelector('[role="slider"]')?.getAttribute('aria-valuenow')
    );
    expect(Number(newValue)).toBe(31);
    // CLEANUP — none
  });

  test('keyboard ArrowLeft decreases value', async ({page}) => {
    // ARRANGE
    const slider = page.locator('#basic');
    const thumb = slider.locator('[role="slider"]');
    // ACT
    await thumb.focus();
    await page.keyboard.press('ArrowLeft');
    // ASSERT
    const newValue = await slider.evaluate((el: HTMLElement) =>
      el.shadowRoot?.querySelector('[role="slider"]')?.getAttribute('aria-valuenow')
    );
    expect(Number(newValue)).toBe(29);
    // CLEANUP — none
  });

  test('keyboard Home sets value to min', async ({page}) => {
    // ARRANGE
    const slider = page.locator('#basic');
    const thumb = slider.locator('[role="slider"]');
    // ACT
    await thumb.focus();
    await page.keyboard.press('Home');
    // ASSERT
    const val = await slider.evaluate((el: HTMLElement) =>
      el.shadowRoot?.querySelector('[role="slider"]')?.getAttribute('aria-valuenow')
    );
    expect(Number(val)).toBe(0);
    // CLEANUP — none
  });

  test('keyboard End sets value to max', async ({page}) => {
    // ARRANGE
    const slider = page.locator('#basic');
    const thumb = slider.locator('[role="slider"]');
    // ACT
    await thumb.focus();
    await page.keyboard.press('End');
    // ASSERT
    const val = await slider.evaluate((el: HTMLElement) =>
      el.shadowRoot?.querySelector('[role="slider"]')?.getAttribute('aria-valuenow')
    );
    expect(Number(val)).toBe(100);
    // CLEANUP — none
  });

  test('disabled slider is not interactive', async ({page}) => {
    // ARRANGE
    const slider = page.locator('#disabled');
    // ACT
    await slider.waitFor();
    // ASSERT
    const thumb = slider.locator('[role="slider"]');
    await expect(thumb).toHaveAttribute('aria-disabled', 'true');
    await expect(thumb).toHaveAttribute('tabindex', '-1');
    // CLEANUP — none
  });

  test('emits change event on keyboard interaction', async ({page}) => {
    // ARRANGE
    const slider = page.locator('#basic');
    const thumb = slider.locator('[role="slider"]');
    const eventFired = page.evaluate(
      () =>
        new Promise<number>((resolve) => {
          document
            .querySelector('#basic')
            ?.addEventListener('change', (e: Event) =>
              resolve((e as CustomEvent<{value: number}>).detail.value)
            );
        })
    );
    // ACT
    await thumb.focus();
    await page.keyboard.press('ArrowRight');
    // ASSERT
    expect(await eventFired).toBe(31);
    // CLEANUP — none
  });
});
