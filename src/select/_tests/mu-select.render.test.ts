import {describe, it, expect} from 'vitest';
import {fixture, html} from '@open-wc/testing';
import type {MuSelect} from '../mu-select.js';
import '../mu-select.js';

const OPTS = [
  {value: 'a', label: 'Alpha'},
  {value: 'b', label: 'Beta'},
  {value: 'c', label: 'Gamma', disabled: true},
];

describe('MuSelect — render', (): void => {
  it('renders a native select element', async (): Promise<void> => {
    // ARRANGE
    const el = await fixture<MuSelect>(html`<mu-select></mu-select>`);

    // ACT
    const select = el.shadowRoot?.querySelector('select');

    // ASSERT
    expect(select).not.toBeNull();

    // CLEANUP — none
  });

  it('renders a label when label is set', async (): Promise<void> => {
    // ARRANGE
    const el = await fixture<MuSelect>(html`<mu-select label="Country"></mu-select>`);
    el.options = OPTS;
    await el.updateComplete;

    // ACT
    const label = el.shadowRoot?.querySelector('label');

    // ASSERT
    expect(label?.textContent?.trim()).toContain('Country');

    // CLEANUP — none
  });

  it('does not render a label when label is empty', async (): Promise<void> => {
    // ARRANGE
    const el = await fixture<MuSelect>(html`<mu-select></mu-select>`);

    // ACT
    const label = el.shadowRoot?.querySelector('label');

    // ASSERT
    expect(label).toBeNull();

    // CLEANUP — none
  });

  it('renders options in the native select', async (): Promise<void> => {
    // ARRANGE
    const el = await fixture<MuSelect>(html`<mu-select></mu-select>`);
    el.options = OPTS;
    await el.updateComplete;

    // ACT
    const options = el.shadowRoot?.querySelectorAll('option');

    // ASSERT
    expect(options?.length).toBe(3);

    // CLEANUP — none
  });

  it('renders placeholder as first disabled option', async (): Promise<void> => {
    // ARRANGE
    const el = await fixture<MuSelect>(html`<mu-select placeholder="Choose one"></mu-select>`);
    el.options = OPTS;
    await el.updateComplete;

    // ACT
    const first = el.shadowRoot?.querySelector('option');

    // ASSERT
    expect(first?.textContent?.trim()).toBe('Choose one');
    expect(first?.disabled).toBe(true);

    // CLEANUP — none
  });

  it('pre-selects the option matching value', async (): Promise<void> => {
    // ARRANGE
    const el = await fixture<MuSelect>(html`<mu-select value="b"></mu-select>`);
    el.options = OPTS;
    await el.updateComplete;

    // ACT
    const selected = el.shadowRoot?.querySelector('option[selected]');

    // ASSERT
    expect((selected as HTMLOptionElement)?.value).toBe('b');

    // CLEANUP — none
  });

  it('disables the select when disabled', async (): Promise<void> => {
    // ARRANGE
    const el = await fixture<MuSelect>(html`<mu-select disabled></mu-select>`);

    // ACT
    const select = el.shadowRoot?.querySelector('select');

    // ASSERT
    expect(select?.disabled).toBe(true);

    // CLEANUP — none
  });

  it('renders error text with aria-invalid when error is set', async (): Promise<void> => {
    // ARRANGE
    const el = await fixture<MuSelect>(
      html`<mu-select error="This field is required"></mu-select>`
    );

    // ACT
    const helper = el.shadowRoot?.querySelector('.error-text');
    const select = el.shadowRoot?.querySelector('select');

    // ASSERT
    expect(helper?.textContent?.trim()).toBe('This field is required');
    expect(select?.getAttribute('aria-invalid')).toBe('true');

    // CLEANUP — none
  });

  it('dispatches change event when selection changes', async (): Promise<void> => {
    // ARRANGE
    const el = await fixture<MuSelect>(html`<mu-select></mu-select>`);
    el.options = OPTS;
    await el.updateComplete;
    let fired = false;
    el.addEventListener('change', (): void => {
      fired = true;
    });

    // ACT
    const select = el.shadowRoot?.querySelector<HTMLSelectElement>('select');
    if (select) {
      select.value = 'b';
      select.dispatchEvent(new Event('change'));
    }

    // ASSERT
    expect(fired).toBe(true);

    // CLEANUP — none
  });
});
