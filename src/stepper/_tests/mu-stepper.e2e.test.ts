import {test, expect} from '@playwright/test';

const URL = '/dev/stepper.html';

test.describe('mu-stepper e2e', () => {
  test.beforeEach(async ({page}) => {
    await page.goto(URL);
  });

  test('renders the stepper', async ({page}) => {
    // ARRANGE
    const stepper = page.locator('#basic');
    // ACT
    await stepper.waitFor();
    // ASSERT
    await expect(stepper).toBeVisible();
    // CLEANUP — none
  });

  test('first step is active by default', async ({page}) => {
    // ARRANGE
    const firstStep = page.locator('#basic mu-step').first();
    // ACT
    await firstStep.waitFor();
    // ASSERT
    const state = await firstStep.getAttribute('state');
    expect(state).toBe('active');
    // CLEANUP — none
  });

  test('next button advances to step 2', async ({page}) => {
    // ARRANGE
    const nextBtn = page.locator('#next-btn');
    // ACT
    await nextBtn.click();
    // ASSERT
    const stepper = page.locator('#basic');
    const activeStep = await stepper.evaluate(
      (el: HTMLElement & {activeStep: number}) => el.activeStep
    );
    expect(activeStep).toBe(1);
    // CLEANUP — none
  });
});
