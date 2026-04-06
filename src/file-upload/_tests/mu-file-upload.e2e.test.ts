import {test, expect} from '@playwright/test';

const URL = '/dev/file-upload.html';

test.describe('mu-file-upload e2e', () => {
  test.beforeEach(async ({page}) => {
    await page.goto(URL);
  });

  test('renders the drop zone', async ({page}) => {
    // ARRANGE
    const zone = page.locator('#basic [role="button"]');
    // ACT
    await zone.waitFor();
    // ASSERT
    await expect(zone).toBeVisible();
    // CLEANUP — none
  });

  test('drop zone is focusable', async ({page}) => {
    // ARRANGE
    const zone = page.locator('#basic [role="button"]');
    // ACT
    await zone.focus();
    // ASSERT
    await expect(zone).toBeFocused();
    // CLEANUP — none
  });

  test('disabled drop zone has tabindex="-1"', async ({page}) => {
    // ARRANGE
    const zone = page.locator('#disabled [role="button"]');
    // ACT
    await zone.waitFor();
    // ASSERT
    await expect(zone).toHaveAttribute('tabindex', '-1');
    // CLEANUP — none
  });
});
