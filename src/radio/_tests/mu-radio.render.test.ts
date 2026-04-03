import {describe, it, expect} from 'vitest';
import {fixture, html} from '@open-wc/testing';
import type {MuRadio} from '../mu-radio.js';
import type {MuRadioGroup} from '../mu-radio-group.js';
import '../mu-radio.js';
import '../mu-radio-group.js';

describe('MuRadio — render', (): void => {
  it('renders a radio role element', async (): Promise<void> => {
    // ARRANGE
    const el = await fixture<MuRadio>(html`<mu-radio label="Option A"></mu-radio>`);

    // ACT
    const role = el.shadowRoot?.querySelector('[role="radio"]');

    // ASSERT
    expect(role).not.toBeNull();

    // CLEANUP — none
  });

  it('renders label text', async (): Promise<void> => {
    // ARRANGE
    const el = await fixture<MuRadio>(html`<mu-radio label="Apple"></mu-radio>`);

    // ACT
    const label = el.shadowRoot?.querySelector('.label-text');

    // ASSERT
    expect(label?.textContent?.trim()).toBe('Apple');

    // CLEANUP — none
  });

  it('sets aria-checked="false" when not selected', async (): Promise<void> => {
    // ARRANGE
    const el = await fixture<MuRadio>(html`<mu-radio></mu-radio>`);

    // ACT
    const role = el.shadowRoot?.querySelector('[role="radio"]');

    // ASSERT
    expect(role?.getAttribute('aria-checked')).toBe('false');

    // CLEANUP — none
  });

  it('sets aria-checked="true" when checked', async (): Promise<void> => {
    // ARRANGE
    const el = await fixture<MuRadio>(html`<mu-radio checked></mu-radio>`);

    // ACT
    const role = el.shadowRoot?.querySelector('[role="radio"]');

    // ASSERT
    expect(role?.getAttribute('aria-checked')).toBe('true');

    // CLEANUP — none
  });

  it('sets aria-disabled="true" when disabled', async (): Promise<void> => {
    // ARRANGE
    const el = await fixture<MuRadio>(html`<mu-radio disabled></mu-radio>`);

    // ACT
    const role = el.shadowRoot?.querySelector('[role="radio"]');

    // ASSERT
    expect(role?.getAttribute('aria-disabled')).toBe('true');

    // CLEANUP — none
  });

  it('dispatches change event on click', async (): Promise<void> => {
    // ARRANGE
    const el = await fixture<MuRadio>(html`<mu-radio value="a"></mu-radio>`);
    let fired = false;
    el.addEventListener('change', (): void => {
      fired = true;
    });

    // ACT
    const role = el.shadowRoot?.querySelector<HTMLElement>('[role="radio"]');
    role?.click();

    // ASSERT
    expect(fired).toBe(true);

    // CLEANUP — none
  });

  it('reflects checked attribute on the host when selected', async (): Promise<void> => {
    // ARRANGE
    const el = await fixture<MuRadio>(html`<mu-radio value="x"></mu-radio>`);

    // ACT
    const role = el.shadowRoot?.querySelector<HTMLElement>('[role="radio"]');
    role?.click();
    await el.updateComplete;

    // ASSERT
    expect(el.hasAttribute('checked')).toBe(true);

    // CLEANUP — none
  });
});

describe('MuRadioGroup — render', (): void => {
  it('renders a radiogroup role container', async (): Promise<void> => {
    // ARRANGE
    const el = await fixture<MuRadioGroup>(html`<mu-radio-group label="Options"></mu-radio-group>`);

    // ACT
    const group = el.shadowRoot?.querySelector('[role="radiogroup"]');

    // ASSERT
    expect(group).not.toBeNull();

    // CLEANUP — none
  });

  it('renders a visible label', async (): Promise<void> => {
    // ARRANGE
    const el = await fixture<MuRadioGroup>(html`<mu-radio-group label="Fruit"></mu-radio-group>`);

    // ACT
    const label = el.shadowRoot?.querySelector('#group-label');

    // ASSERT
    expect(label?.textContent?.trim()).toBe('Fruit');

    // CLEANUP — none
  });

  it('does not render a label element when label is empty', async (): Promise<void> => {
    // ARRANGE
    const el = await fixture<MuRadioGroup>(html`<mu-radio-group></mu-radio-group>`);

    // ACT
    const label = el.shadowRoot?.querySelector('#group-label');

    // ASSERT
    expect(label).toBeNull();

    // CLEANUP — none
  });
});
