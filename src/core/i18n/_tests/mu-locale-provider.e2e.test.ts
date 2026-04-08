import {test, expect} from '@playwright/test';

const LOCALE_DEMO_URL = '/dev/locale.html';

test.describe('mu-locale-provider (Playwright E2E)', (): void => {
  test('mu-chip delete button shows default English aria-label without provider', async ({
    page,
  }): Promise<void> => {
    // ARRANGE
    await page.goto(LOCALE_DEMO_URL);

    // ACT
    const ariaLabel = await page.evaluate((): string | null => {
      const chip = document.querySelector('mu-chip') as HTMLElement & {shadowRoot: ShadowRoot};
      return chip.shadowRoot.querySelector('.delete-btn')?.getAttribute('aria-label') ?? null;
    });

    // ASSERT
    expect(ariaLabel).toBe('Delete Tag');

    // CLEANUP — none
  });

  test('mu-chip delete button shows custom German aria-label inside provider', async ({
    page,
  }): Promise<void> => {
    // ARRANGE
    await page.goto(LOCALE_DEMO_URL);

    // ACT
    const ariaLabel = await page.evaluate((): string | null => {
      const chip = document.getElementById('german-chip') as HTMLElement & {shadowRoot: ShadowRoot};
      return chip.shadowRoot.querySelector('.delete-btn')?.getAttribute('aria-label') ?? null;
    });

    // ASSERT
    expect(ariaLabel).toBe('Entfernen Schlagwort');

    // CLEANUP — none
  });

  test('mu-snackbar dismiss button shows default English aria-label without provider', async ({
    page,
  }): Promise<void> => {
    // ARRANGE
    await page.goto(LOCALE_DEMO_URL);

    // ACT
    const ariaLabel = await page.evaluate((): string | null => {
      const snackbar = document.getElementById('default-snackbar') as HTMLElement & {
        shadowRoot: ShadowRoot;
      };
      return snackbar.shadowRoot.querySelector('.close')?.getAttribute('aria-label') ?? null;
    });

    // ASSERT
    expect(ariaLabel).toBe('Dismiss');

    // CLEANUP — none
  });

  test('mu-snackbar dismiss button shows custom German aria-label inside provider', async ({
    page,
  }): Promise<void> => {
    // ARRANGE
    await page.goto(LOCALE_DEMO_URL);

    // ACT
    const ariaLabel = await page.evaluate((): string | null => {
      const snackbar = document.getElementById('german-snackbar') as HTMLElement & {
        shadowRoot: ShadowRoot;
      };
      return snackbar.shadowRoot.querySelector('.close')?.getAttribute('aria-label') ?? null;
    });

    // ASSERT
    expect(ariaLabel).toBe('Verwerfen');

    // CLEANUP — none
  });
});
