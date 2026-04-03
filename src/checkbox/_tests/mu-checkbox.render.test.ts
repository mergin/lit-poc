import {describe, it, expect} from 'vitest';
import {fixture, html} from '@open-wc/testing';
import type {MuCheckbox} from '../mu-checkbox.js';
import '../mu-checkbox.js';

describe('MuCheckbox — render', (): void => {
  it('renders a checkbox role element', async (): Promise<void> => {
    // ARRANGE
    const el = await fixture<MuCheckbox>(html`<mu-checkbox></mu-checkbox>`);

    // ACT
    const wrapper = el.shadowRoot?.querySelector('[role="checkbox"]');

    // ASSERT
    expect(wrapper).not.toBeNull();

    // CLEANUP — none
  });

  it('renders label text', async (): Promise<void> => {
    // ARRANGE
    const el = await fixture<MuCheckbox>(html`<mu-checkbox label="Accept"></mu-checkbox>`);

    // ACT
    const label = el.shadowRoot?.querySelector('.label-text');

    // ASSERT
    expect(label?.textContent?.trim()).toBe('Accept');

    // CLEANUP — none
  });

  it('sets aria-checked="false" when unchecked', async (): Promise<void> => {
    // ARRANGE
    const el = await fixture<MuCheckbox>(html`<mu-checkbox></mu-checkbox>`);

    // ACT
    const wrapper = el.shadowRoot?.querySelector('[role="checkbox"]');

    // ASSERT
    expect(wrapper?.getAttribute('aria-checked')).toBe('false');

    // CLEANUP — none
  });

  it('sets aria-checked="true" when checked', async (): Promise<void> => {
    // ARRANGE
    const el = await fixture<MuCheckbox>(html`<mu-checkbox checked></mu-checkbox>`);

    // ACT
    const wrapper = el.shadowRoot?.querySelector('[role="checkbox"]');

    // ASSERT
    expect(wrapper?.getAttribute('aria-checked')).toBe('true');

    // CLEANUP — none
  });

  it('sets aria-checked="mixed" when indeterminate', async (): Promise<void> => {
    // ARRANGE
    const el = await fixture<MuCheckbox>(html`<mu-checkbox indeterminate></mu-checkbox>`);

    // ACT
    const wrapper = el.shadowRoot?.querySelector('[role="checkbox"]');

    // ASSERT
    expect(wrapper?.getAttribute('aria-checked')).toBe('mixed');

    // CLEANUP — none
  });

  it('sets aria-disabled="true" when disabled', async (): Promise<void> => {
    // ARRANGE
    const el = await fixture<MuCheckbox>(html`<mu-checkbox disabled></mu-checkbox>`);

    // ACT
    const wrapper = el.shadowRoot?.querySelector('[role="checkbox"]');

    // ASSERT
    expect(wrapper?.getAttribute('aria-disabled')).toBe('true');

    // CLEANUP — none
  });

  it('dispatches change event when clicked', async (): Promise<void> => {
    // ARRANGE
    const el = await fixture<MuCheckbox>(html`<mu-checkbox></mu-checkbox>`);
    let fired = false;
    el.addEventListener('change', (): void => {
      fired = true;
    });

    // ACT
    const wrapper = el.shadowRoot?.querySelector<HTMLElement>('[role="checkbox"]');
    wrapper?.click();

    // ASSERT
    expect(fired).toBe(true);

    // CLEANUP — none
  });

  it('toggles checked on click', async (): Promise<void> => {
    // ARRANGE
    const el = await fixture<MuCheckbox>(html`<mu-checkbox></mu-checkbox>`);

    // ACT
    const wrapper = el.shadowRoot?.querySelector<HTMLElement>('[role="checkbox"]');
    wrapper?.click();

    // ASSERT
    expect(el.checked).toBe(true);

    // CLEANUP — none
  });

  it('does not toggle when disabled', async (): Promise<void> => {
    // ARRANGE
    const el = await fixture<MuCheckbox>(html`<mu-checkbox disabled></mu-checkbox>`);

    // ACT
    const wrapper = el.shadowRoot?.querySelector<HTMLElement>('[role="checkbox"]');
    wrapper?.click();

    // ASSERT
    expect(el.checked).toBe(false);

    // CLEANUP — none
  });

  it('reflects checked attribute on the host', async (): Promise<void> => {
    // ARRANGE
    const el = await fixture<MuCheckbox>(html`<mu-checkbox checked></mu-checkbox>`);

    // ACT — none

    // ASSERT
    expect(el.hasAttribute('checked')).toBe(true);

    // CLEANUP — none
  });
});
