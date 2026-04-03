import {describe, it, expect} from 'vitest';
import {fixture, html} from '@open-wc/testing';
import type {MuTextField} from '../mu-text-field.js';
import '../mu-text-field.js';

describe('MuTextField — render', (): void => {
  it('renders a native input element', async (): Promise<void> => {
    // ARRANGE
    const el = await fixture<MuTextField>(html`<mu-text-field></mu-text-field>`);

    // ACT
    const input = el.shadowRoot?.querySelector('input');

    // ASSERT
    expect(input).not.toBeNull();

    // CLEANUP — none
  });

  it('renders a label element when label is set', async (): Promise<void> => {
    // ARRANGE
    const el = await fixture<MuTextField>(html`<mu-text-field label="Name"></mu-text-field>`);

    // ACT
    const label = el.shadowRoot?.querySelector('label');

    // ASSERT
    expect(label?.textContent?.trim()).toBe('Name');

    // CLEANUP — none
  });

  it('does not render a label when label is empty', async (): Promise<void> => {
    // ARRANGE
    const el = await fixture<MuTextField>(html`<mu-text-field></mu-text-field>`);

    // ACT
    const label = el.shadowRoot?.querySelector('label');

    // ASSERT
    expect(label).toBeNull();

    // CLEANUP — none
  });

  it('sets the input type attribute', async (): Promise<void> => {
    // ARRANGE
    const el = await fixture<MuTextField>(html`<mu-text-field type="email"></mu-text-field>`);

    // ACT
    const input = el.shadowRoot?.querySelector('input');

    // ASSERT
    expect(input?.type).toBe('email');

    // CLEANUP — none
  });

  it('sets the input placeholder', async (): Promise<void> => {
    // ARRANGE
    const el = await fixture<MuTextField>(
      html`<mu-text-field placeholder="Enter value"></mu-text-field>`
    );

    // ACT
    const input = el.shadowRoot?.querySelector('input');

    // ASSERT
    expect(input?.placeholder).toBe('Enter value');

    // CLEANUP — none
  });

  it('reflects the value on the input element', async (): Promise<void> => {
    // ARRANGE
    const el = await fixture<MuTextField>(html`<mu-text-field value="hello"></mu-text-field>`);

    // ACT
    const input = el.shadowRoot?.querySelector('input');

    // ASSERT
    expect(input?.value).toBe('hello');

    // CLEANUP — none
  });

  it('disables the input when disabled', async (): Promise<void> => {
    // ARRANGE
    const el = await fixture<MuTextField>(html`<mu-text-field disabled></mu-text-field>`);

    // ACT
    const input = el.shadowRoot?.querySelector('input');

    // ASSERT
    expect(input?.disabled).toBe(true);

    // CLEANUP — none
  });

  it('renders error text and aria-invalid when error is set', async (): Promise<void> => {
    // ARRANGE
    const el = await fixture<MuTextField>(html`<mu-text-field error="Required"></mu-text-field>`);

    // ACT
    const helper = el.shadowRoot?.querySelector('.error-text');
    const input = el.shadowRoot?.querySelector('input');

    // ASSERT
    expect(helper?.textContent?.trim()).toBe('Required');
    expect(input?.getAttribute('aria-invalid')).toBe('true');

    // CLEANUP — none
  });

  it('renders helper text when helperText is set and no error', async (): Promise<void> => {
    // ARRANGE
    const el = await fixture<MuTextField>(
      html`<mu-text-field helper-text="At least 8 chars"></mu-text-field>`
    );

    // ACT
    const helper = el.shadowRoot?.querySelector('.helper');

    // ASSERT
    expect(helper?.textContent?.trim()).toBe('At least 8 chars');

    // CLEANUP — none
  });
});
