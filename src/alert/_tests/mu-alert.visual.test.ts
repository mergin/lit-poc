import {test, expect} from '@playwright/test';

test.describe('mu-alert visual regression', (): void => {
  test('mu-alert info severity snapshot', async ({page}): Promise<void> => {
    // ARRANGE
    await page.setContent(`
      <!DOCTYPE html>
      <html>
        <body style="padding: 16px; background: white;">
          <script type="module" src="/src/alert/mu-alert.ts"></script>
          <mu-alert severity="info">This is an info alert.</mu-alert>
        </body>
      </html>
    `);
    await page.waitForSelector('mu-alert');
    // ACT / ASSERT
    await expect(page.locator('mu-alert').first()).toHaveScreenshot('mu-alert-info.png');
  });

  test('mu-alert success severity snapshot', async ({page}): Promise<void> => {
    // ARRANGE
    await page.setContent(`
      <!DOCTYPE html>
      <html>
        <body style="padding: 16px; background: white;">
          <script type="module" src="/src/alert/mu-alert.ts"></script>
          <mu-alert severity="success">Operation completed successfully.</mu-alert>
        </body>
      </html>
    `);
    await page.waitForSelector('mu-alert');
    // ACT / ASSERT
    await expect(page.locator('mu-alert').first()).toHaveScreenshot('mu-alert-success.png');
  });

  test('mu-alert warning severity snapshot', async ({page}): Promise<void> => {
    // ARRANGE
    await page.setContent(`
      <!DOCTYPE html>
      <html>
        <body style="padding: 16px; background: white;">
          <script type="module" src="/src/alert/mu-alert.ts"></script>
          <mu-alert severity="warning">Proceed with caution.</mu-alert>
        </body>
      </html>
    `);
    await page.waitForSelector('mu-alert');
    // ACT / ASSERT
    await expect(page.locator('mu-alert').first()).toHaveScreenshot('mu-alert-warning.png');
  });

  test('mu-alert error severity snapshot', async ({page}): Promise<void> => {
    // ARRANGE
    await page.setContent(`
      <!DOCTYPE html>
      <html>
        <body style="padding: 16px; background: white;">
          <script type="module" src="/src/alert/mu-alert.ts"></script>
          <mu-alert severity="error">Something went wrong.</mu-alert>
        </body>
      </html>
    `);
    await page.waitForSelector('mu-alert');
    // ACT / ASSERT
    await expect(page.locator('mu-alert').first()).toHaveScreenshot('mu-alert-error.png');
  });
});
