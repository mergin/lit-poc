import {fixture, html, expect} from '@open-wc/testing';
import {describe, it, beforeEach} from 'vitest';
import type {MuStepper} from '../mu-stepper.js';
import type {MuStep} from '../mu-step.js';
import '../mu-stepper.js';
import '../mu-step.js';

describe('MuStepper — render', () => {
  let el: MuStepper;

  beforeEach(async () => {
    // ARRANGE
    el = await fixture<MuStepper>(html`
      <mu-stepper>
        <mu-step label="Step 1"></mu-step>
        <mu-step label="Step 2"></mu-step>
        <mu-step label="Step 3"></mu-step>
      </mu-stepper>
    `);
    await el.updateComplete;
  });

  it('renders the stepper with role="group"', async () => {
    // ARRANGE — done in beforeEach
    // ACT
    const list = el.shadowRoot?.querySelector('[role="group"]');
    // ASSERT
    expect(list).to.exist;
    // CLEANUP — none
  });

  it('first step has state="active"', async () => {
    // ARRANGE — done in beforeEach
    // ACT
    const steps = el.querySelectorAll<MuStep>('mu-step');
    // ASSERT
    expect(steps[0].state).to.equal('active');
    // CLEANUP — none
  });

  it('subsequent steps have state="disabled"', async () => {
    // ARRANGE — done in beforeEach
    // ACT
    const steps = el.querySelectorAll<MuStep>('mu-step');
    // ASSERT
    expect(steps[1].state).to.equal('disabled');
    expect(steps[2].state).to.equal('disabled');
    // CLEANUP — none
  });

  it('passes basic accessibility audit', async () => {
    // ARRANGE — done in beforeEach
    // ACT + ASSERT
    await expect(el).to.be.accessible();
    // CLEANUP — none
  });
});

describe('MuStep — render', () => {
  let step: MuStep;

  beforeEach(async () => {
    // ARRANGE
    step = await fixture<MuStep>(
      html`<mu-step
        label="Account"
        state="active"
        index="1"
      ></mu-step>`
    );
  });

  it('indicator exists', async () => {
    // ARRANGE — done in beforeEach
    // ACT
    const indicator = step.shadowRoot?.querySelector('[part="indicator"]');
    // ASSERT
    expect(indicator).to.exist;
    // CLEANUP — none
  });

  it('indicator has aria-current="step" when active', async () => {
    // ARRANGE — done in beforeEach
    // ACT
    const indicator = step.shadowRoot?.querySelector('[part="indicator"]');
    // ASSERT
    expect(indicator?.getAttribute('aria-current')).to.equal('step');
    // CLEANUP — none
  });

  it('indicator has aria-disabled="true" when disabled', async () => {
    // ARRANGE
    step = await fixture<MuStep>(
      html`<mu-step
        label="Disabled"
        state="disabled"
        index="2"
      ></mu-step>`
    );
    // ACT
    const indicator = step.shadowRoot?.querySelector('[part="indicator"]');
    // ASSERT
    expect(indicator?.getAttribute('aria-disabled')).to.equal('true');
    // CLEANUP — none
  });

  it('renders label', async () => {
    // ARRANGE — done in beforeEach
    // ACT
    const labelEl = step.shadowRoot?.querySelector('[part="label"]');
    // ASSERT
    expect(labelEl?.textContent?.trim()).to.equal('Account');
    // CLEANUP — none
  });

  it('passes basic accessibility audit', async () => {
    // ARRANGE — done in beforeEach
    // ACT + ASSERT
    await expect(step).to.be.accessible();
    // CLEANUP — none
  });
});
