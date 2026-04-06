import {test, expect} from '@playwright/test';

const URL = '/dev/data-table.html';

test.describe('mu-data-table e2e', () => {
  test.beforeEach(async ({page}) => {
    await page.goto(URL);
  });

  test('renders the table', async ({page}) => {
    // ARRANGE
    const table = page.locator('#basic [role="grid"]');
    // ACT
    await table.waitFor();
    // ASSERT
    await expect(table).toBeVisible();
    // CLEANUP — none
  });

  test('renders column headers', async ({page}) => {
    // ARRANGE
    const headers = page.locator('#basic [role="columnheader"]');
    // ACT
    await headers.first().waitFor();
    // ASSERT
    await expect(headers).toHaveCount(3);
    // CLEANUP — none
  });

  test('renders data rows', async ({page}) => {
    // ARRANGE
    const rows = page.locator('#basic tbody [role="row"]');
    // ACT
    await rows.first().waitFor();
    // ASSERT
    await expect(rows).toHaveCount(4);
    // CLEANUP — none
  });

  test('clicking sortable header triggers sort-change event', async ({page}) => {
    // ARRANGE
    const header = page.locator('#basic [role="columnheader"]').first();
    const eventFired = page.evaluate(
      () =>
        new Promise<string>((resolve) => {
          document
            .querySelector('#basic')
            ?.addEventListener('sort-change', (e: Event) =>
              resolve((e as CustomEvent<{key: string}>).detail.key)
            );
        })
    );
    // ACT
    await header.click();
    // ASSERT
    expect(await eventFired).toBe('name');
    // CLEANUP — none
  });

  test('loading table shows skeleton rows', async ({page}) => {
    // ARRANGE
    const skeletonRows = page.locator('#loading tbody [role="row"]');
    // ACT
    await skeletonRows.first().waitFor();
    // ASSERT
    await expect(skeletonRows).toHaveCount(5);
    // CLEANUP — none
  });
});
