import AxeBuilder from '@axe-core/playwright';
import type {Page} from '@playwright/test';
import {expect} from '@playwright/test';

/**
 * Runs axe-core against the full page and asserts no violations.
 * @param page - The Playwright page to audit.
 */
export async function assertNoA11yViolations(page: Page): Promise<void> {
  const results = await new AxeBuilder({page}).analyze();
  expect(results.violations).toEqual([]);
}
