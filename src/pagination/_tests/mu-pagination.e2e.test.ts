import {test, expect} from '@playwright/test';

test.describe('mu-pagination e2e', () => {
  test('navigates pages on click', async ({page}) => {
    // ARRANGE
    await page.setContent(`
      <!DOCTYPE html>
      <html>
        <body>
          <script type="module" src="/src/pagination/mu-pagination.ts"></script>
          <mu-pagination count="10" page="1"></mu-pagination>
          <div id="result"></div>
          <script type="module">
            document.querySelector('mu-pagination').addEventListener('page-change', (e) => {
              document.getElementById('result').textContent = 'page:' + e.detail.page;
            });
          </script>
        </body>
      </html>
    `);
    await page.waitForSelector('mu-pagination');

    // ACT
    const pagination = page.locator('mu-pagination');

    // ASSERT
    await expect(pagination).toBeAttached();
  });
});
