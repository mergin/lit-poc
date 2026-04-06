import {test, expect} from '@playwright/test';

const URL = '/dev/menu.html';

test.describe('mu-menu e2e', () => {
  test.beforeEach(async ({page}) => {
    await page.goto(URL);
  });

  test('renders the trigger button', async ({page}) => {
    // ARRANGE
    const trigger = page.locator('#basic button[slot="trigger"]');
    // ACT
    await trigger.waitFor();
    // ASSERT
    await expect(trigger).toBeVisible();
    // CLEANUP — none
  });

  test('opens menu on trigger click', async ({page}) => {
    // ARRANGE
    const trigger = page.locator('#basic button[slot="trigger"]');
    // ACT
    await trigger.click();
    // ASSERT
    const menu = page.locator('#basic').locator('[role="menu"]');
    await expect(menu).not.toHaveAttribute('hidden');
    // CLEANUP — none
  });

  test('closes menu on Escape key', async ({page}) => {
    // ARRANGE
    const trigger = page.locator('#basic button[slot="trigger"]');
    await trigger.click();
    // ACT
    await page.keyboard.press('Escape');
    // ASSERT
    const menu = page.locator('#basic').locator('[role="menu"]');
    await expect(menu).toHaveAttribute('hidden', '');
    // CLEANUP — none
  });

  test('keyboard ArrowDown navigates items', async ({page}) => {
    // ARRANGE
    const trigger = page.locator('#basic button[slot="trigger"]');
    await trigger.click();
    // ACT
    await page.keyboard.press('ArrowDown');
    // ASSERT — second item should be focused
    const items = page.locator('#basic mu-menu-item');
    await expect(items.nth(1)).toBeFocused();
    // CLEANUP — none
  });

  test('item disabled is not interactive', async ({page}) => {
    // ARRANGE
    const disabledItem = page.locator('#with-disabled mu-menu-item[disabled]');
    // ACT
    await page.locator('#with-disabled button[slot="trigger"]').click();
    // ASSERT
    await expect(disabledItem).toHaveAttribute('disabled', '');
    // CLEANUP — none
  });
});
