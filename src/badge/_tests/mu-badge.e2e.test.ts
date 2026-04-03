import {test, expect} from '@playwright/test';

const BADGE_DEMO_URL = '/dev/badge.html';

test.describe('mu-badge e2e', () => {
  test('renders visually correctly and has a11y text', async ({page}) => {
    // ARRANGE
    await page.goto(BADGE_DEMO_URL);
    const badgeElement = page.locator('#badge-mail');

    // ACT / ASSERT
    await expect(badgeElement).toBeVisible();
    await expect(badgeElement).toContainText('Mail');

    const badgeIndicator = page.locator('#badge-mail .badge');
    await expect(badgeIndicator).toContainText('3');
  });
});
