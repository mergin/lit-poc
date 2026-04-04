import {describe, it, expect} from 'vitest';
import {fixture, html} from '@open-wc/testing';
import type {MuTooltip} from '../mu-tooltip.js';
import '../mu-tooltip.js';

describe('MuTooltip — render', (): void => {
  it('renders a wrapper div in the shadow root', async (): Promise<void> => {
    // ARRANGE
    const el = await fixture<MuTooltip>(html`<mu-tooltip label="Help text"></mu-tooltip>`);

    // ACT
    const wrapper = el.shadowRoot?.querySelector('.wrapper');

    // ASSERT
    expect(wrapper).not.toBeNull();

    // CLEANUP — none
  });

  it('renders a tooltip div with role="tooltip"', async (): Promise<void> => {
    // ARRANGE
    const el = await fixture<MuTooltip>(html`<mu-tooltip label="Help text"></mu-tooltip>`);

    // ACT
    const tooltip = el.shadowRoot?.querySelector('[role="tooltip"]');

    // ASSERT
    expect(tooltip).not.toBeNull();

    // CLEANUP — none
  });

  it('renders the label text in the tooltip', async (): Promise<void> => {
    // ARRANGE
    const el = await fixture<MuTooltip>(html`<mu-tooltip label="Save file"></mu-tooltip>`);

    // ACT
    const tooltip = el.shadowRoot?.querySelector('[role="tooltip"]');

    // ASSERT
    expect(tooltip?.textContent?.trim()).toBe('Save file');

    // CLEANUP — none
  });

  it('sets aria-describedby on the wrapper pointing to the tooltip', async (): Promise<void> => {
    // ARRANGE
    const el = await fixture<MuTooltip>(html`<mu-tooltip label="Info"></mu-tooltip>`);

    // ACT
    const wrapper = el.shadowRoot?.querySelector('.wrapper');
    const tooltipId = el.shadowRoot?.querySelector('[role="tooltip"]')?.id;

    // ASSERT
    expect(wrapper?.getAttribute('aria-describedby')).toBe(tooltipId);

    // CLEANUP — none
  });

  it('reflects placement attribute', async (): Promise<void> => {
    // ARRANGE
    const el = await fixture<MuTooltip>(
      html`<mu-tooltip
        label="Info"
        placement="bottom"
      ></mu-tooltip>`
    );

    // ACT — none

    // ASSERT
    expect(el.getAttribute('placement')).toBe('bottom');

    // CLEANUP — none
  });

  it('tooltip is not visible by default', async (): Promise<void> => {
    // ARRANGE
    const el = await fixture<MuTooltip>(html`<mu-tooltip label="Info"></mu-tooltip>`);

    // ACT
    const tooltip = el.shadowRoot?.querySelector('[role="tooltip"]');

    // ASSERT
    expect(tooltip?.classList.contains('visible')).toBe(false);

    // CLEANUP — none
  });

  it('has a slot for the trigger element', async (): Promise<void> => {
    // ARRANGE
    const el = await fixture<MuTooltip>(html`
      <mu-tooltip label="Submit">
        <button>Submit</button>
      </mu-tooltip>
    `);

    // ACT
    const slot = el.shadowRoot?.querySelector('slot');

    // ASSERT
    expect(slot).not.toBeNull();

    // CLEANUP — none
  });
});
