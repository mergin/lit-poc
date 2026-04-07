import AxeBuilder from '@axe-core/playwright';
import type {Page} from '@playwright/test';
import {expect} from '@playwright/test';

/**
 * Runs axe-core against the full page and asserts no violations.
 * Page-level structure rules (landmark-one-main, page-has-heading-one, region)
 * are intentionally disabled as they are the responsibility of the consuming
 * application, not individual components.
 * @param page - The Playwright page to audit.
 */
export async function assertNoA11yViolations(page: Page): Promise<void> {
  const results = await new AxeBuilder({page})
    .disableRules(['landmark-one-main', 'page-has-heading-one', 'region'])
    .analyze();
  expect(results.violations).toEqual([]);
}
