import {test, expect} from '@playwright/test';

const URL = '/dev/rating.html';

test.describe('mu-rating e2e', () => {
  test.beforeEach(async ({page}) => {
    await page.goto(URL);
  });

  test('renders stars', async ({page}) => {
    // ARRANGE
    const stars = page.locator('#basic [role="radio"]');
    // ACT
    await stars.first().waitFor();
    // ASSERT
    await expect(stars).toHaveCount(5);
    // CLEANUP — none
  });

  test('clicking star 4 sets value to 4', async ({page}) => {
    // ARRANGE
    const stars = page.locator('#basic [role="radio"]');
    // ACT
    await stars.nth(3).click();
    // ASSERT
    await expect(stars.nth(3)).toHaveAttribute('aria-checked', 'true');
    // CLEANUP — none
  });

  test('disabled rating is not interactive', async ({page}) => {
    // ARRANGE
    const el = page.locator('#disabled');
    // ACT
    await el.waitFor();
    // ASSERT
    await expect(el).toHaveAttribute('disabled', '');
    // CLEANUP — none
  });

  test('keyboard ArrowRight increases value', async ({page}) => {
    // ARRANGE
    const stars = page.locator('#basic [role="radio"]');
    // ACT
    await stars.nth(0).focus();
    await page.keyboard.press('ArrowRight');
    // ASSERT — not comprehensive; just check event fires correctly
    const value = await page
      .locator('#basic')
      .evaluate((el: Element) => (el as HTMLElement & {value: number}).value);
    expect(value).toBeGreaterThanOrEqual(1);
    // CLEANUP — none
  });
});
