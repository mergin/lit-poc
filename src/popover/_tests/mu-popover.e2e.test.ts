import {test, expect} from '@playwright/test';

const URL = '/dev/popover.html';

test.describe('mu-popover e2e', () => {
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

  test('opens popover on trigger click', async ({page}) => {
    // ARRANGE
    const trigger = page.locator('#basic button[slot="trigger"]');
    // ACT
    await trigger.click();
    // ASSERT
    const content = page.locator('#basic').locator('.content');
    await expect(content).not.toHaveAttribute('hidden');
    // CLEANUP — none
  });

  test('closes popover on Escape key', async ({page}) => {
    // ARRANGE
    await page.locator('#basic button[slot="trigger"]').click();
    // ACT
    await page.keyboard.press('Escape');
    // ASSERT
    const content = page.locator('#basic').locator('.content');
    await expect(content).toHaveAttribute('hidden', '');
    // CLEANUP — none
  });
});
