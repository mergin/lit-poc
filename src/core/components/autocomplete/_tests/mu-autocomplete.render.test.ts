import {fixture, html, expect} from '@open-wc/testing';
import {describe, it, beforeEach} from 'vitest';
import type {MuAutocomplete} from '../mu-autocomplete.js';
import '../mu-autocomplete.js';

const OPTIONS = [
  {value: 'us', label: 'United States'},
  {value: 'gb', label: 'United Kingdom'},
  {value: 'ca', label: 'Canada'},
];

describe('MuAutocomplete — render', () => {
  let el: MuAutocomplete;

  beforeEach(async () => {
    // ARRANGE
    el = await fixture<MuAutocomplete>(
      html`<mu-autocomplete
        label="Country"
        .options="${OPTIONS}"
      ></mu-autocomplete>`
    );
  });

  it('renders an input with role="combobox"', async () => {
    // ARRANGE — done in beforeEach
    // ACT
    const input = el.shadowRoot?.querySelector('[role="combobox"]');
    // ASSERT
    expect(input).to.exist;
    // CLEANUP — none
  });

  it('input starts with aria-expanded="false"', async () => {
    // ARRANGE — done in beforeEach
    // ACT
    const input = el.shadowRoot?.querySelector('input');
    // ASSERT
    expect(input?.getAttribute('aria-expanded')).to.equal('false');
    // CLEANUP — none
  });

  it('renders a listbox (hidden by default)', async () => {
    // ARRANGE — done in beforeEach
    // ACT
    const listbox = el.shadowRoot?.querySelector('[role="listbox"]');
    // ASSERT
    expect(listbox).to.exist;
    expect(listbox?.hasAttribute('hidden')).to.be.true;
    // CLEANUP — none
  });

  it('shows filtered options when input has sufficient characters', async () => {
    // ARRANGE — done in beforeEach
    const input = el.shadowRoot?.querySelector<HTMLInputElement>('input');
    // ACT
    input!.value = 'can';
    input!.dispatchEvent(new InputEvent('input', {bubbles: true}));
    await el.updateComplete;
    // ASSERT
    const options = el.shadowRoot?.querySelectorAll('[role="option"]');
    expect(options?.length).to.be.greaterThan(0);
    // CLEANUP — none
  });

  it('label text is rendered', async () => {
    // ARRANGE — done in beforeEach
    // ACT
    const labelEl = el.shadowRoot?.querySelector('.label-text');
    // ASSERT
    expect(labelEl?.textContent?.trim()).to.equal('Country');
    // CLEANUP — none
  });

  it('input is disabled when disabled prop is true', async () => {
    // ARRANGE
    el = await fixture<MuAutocomplete>(
      html`<mu-autocomplete
        disabled
        .options="${OPTIONS}"
      ></mu-autocomplete>`
    );
    // ACT
    const input = el.shadowRoot?.querySelector('input');
    // ASSERT
    expect(input?.hasAttribute('disabled')).to.be.true;
    // CLEANUP — none
  });

  it('passes basic accessibility audit', async () => {
    // ARRANGE — done in beforeEach
    // ACT + ASSERT
    await expect(el).to.be.accessible();
    // CLEANUP — none
  });
});
