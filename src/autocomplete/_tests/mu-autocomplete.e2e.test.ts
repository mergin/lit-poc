import {test, expect} from '@playwright/test';

const URL = '/dev/autocomplete.html';

test.describe('mu-autocomplete e2e', () => {
  test.beforeEach(async ({page}) => {
    await page.goto(URL);
  });

  test('renders the combobox input', async ({page}) => {
    // ARRANGE
    const input = page.locator('#basic [role="combobox"]');
    // ACT
    await input.waitFor();
    // ASSERT
    await expect(input).toBeVisible();
    // CLEANUP — none
  });

  test('shows options when typing', async ({page}) => {
    // ARRANGE
    const input = page.locator('#basic [role="combobox"]');
    // ACT
    await input.fill('can');
    // ASSERT
    const options = page.locator('#basic [role="option"]');
    await expect(options.first()).toBeVisible();
    // CLEANUP — none
  });

  test('keyboard ArrowDown focuses first option', async ({page}) => {
    // ARRANGE
    const input = page.locator('#basic [role="combobox"]');
    await input.fill('uni');
    // ACT
    await page.keyboard.press('ArrowDown');
    // ASSERT
    const activeDesc = await input.getAttribute('aria-activedescendant');
    expect(activeDesc).not.toBe('');
    // CLEANUP — none
  });

  test('Enter selects the active option', async ({page}) => {
    // ARRANGE
    const input = page.locator('#basic [role="combobox"]');
    await input.fill('can');
    await page.keyboard.press('ArrowDown');
    // ACT
    await page.keyboard.press('Enter');
    // ASSERT
    const value = await page
      .locator('#basic')
      .evaluate((el: HTMLElement & {value: string}) => el.value);
    expect(value).toBe('ca');
    // CLEANUP — none
  });

  test('Escape closes the dropdown', async ({page}) => {
    // ARRANGE
    const input = page.locator('#basic [role="combobox"]');
    await input.fill('uni');
    // ACT
    await page.keyboard.press('Escape');
    // ASSERT
    const listbox = page.locator('#basic [role="listbox"]');
    await expect(listbox).toHaveAttribute('hidden', '');
    // CLEANUP — none
  });
});
