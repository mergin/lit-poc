import {describe, it, expect} from 'vitest';
import {fixture, html} from '@open-wc/testing';
import type {MuChipInput} from '../mu-chip-input.js';
import '../mu-chip-input.js';

describe('MuChipInput — render', (): void => {
  it('renders a container div with role="group"', async (): Promise<void> => {
    // ARRANGE / ACT
    const el = await fixture<MuChipInput>(html`<mu-chip-input></mu-chip-input>`);
    const container = el.shadowRoot?.querySelector('.container');

    // ASSERT
    expect(container).not.toBeNull();
    expect(container?.getAttribute('role')).toBe('group');

    // CLEANUP — none
  });

  it('renders a text input inside the container', async (): Promise<void> => {
    // ARRANGE / ACT
    const el = await fixture<MuChipInput>(html`<mu-chip-input></mu-chip-input>`);
    const input = el.shadowRoot?.querySelector('input#chip-input');

    // ASSERT
    expect(input).not.toBeNull();

    // CLEANUP — none
  });

  it('renders one mu-chip per chip in the chips array', async (): Promise<void> => {
    // ARRANGE / ACT
    const el = await fixture<MuChipInput>(
      html`<mu-chip-input .chips="${['TypeScript', 'Lit']}"></mu-chip-input>`
    );
    await el.updateComplete;
    const chips = el.shadowRoot?.querySelectorAll('mu-chip');

    // ASSERT
    expect(chips?.length).toBe(2);

    // CLEANUP — none
  });

  it('renders mu-chips with deletable attribute', async (): Promise<void> => {
    // ARRANGE / ACT
    const el = await fixture<MuChipInput>(
      html`<mu-chip-input .chips="${['React']}"></mu-chip-input>`
    );
    await el.updateComplete;
    const chip = el.shadowRoot?.querySelector('mu-chip');

    // ASSERT
    expect(
      chip?.hasAttribute('deletable') || (chip as HTMLElement & {deletable: boolean})?.deletable
    ).toBeTruthy();

    // CLEANUP — none
  });

  it('shows placeholder when chips array is empty', async (): Promise<void> => {
    // ARRANGE / ACT
    const el = await fixture<MuChipInput>(
      html`<mu-chip-input placeholder="Add item…"></mu-chip-input>`
    );
    const input = el.shadowRoot?.querySelector<HTMLInputElement>('input#chip-input');

    // ASSERT
    expect(input?.placeholder).toBe('Add item\u2026');

    // CLEANUP — none
  });

  it('hides placeholder when chips are present', async (): Promise<void> => {
    // ARRANGE / ACT
    const el = await fixture<MuChipInput>(
      html`<mu-chip-input
        placeholder="Add…"
        .chips="${['tag']}"
      ></mu-chip-input>`
    );
    await el.updateComplete;
    const input = el.shadowRoot?.querySelector<HTMLInputElement>('input#chip-input');

    // ASSERT
    expect(input?.placeholder).toBe('');

    // CLEANUP — none
  });

  it('disables the text input when disabled is true', async (): Promise<void> => {
    // ARRANGE / ACT
    const el = await fixture<MuChipInput>(html`<mu-chip-input disabled></mu-chip-input>`);
    const input = el.shadowRoot?.querySelector<HTMLInputElement>('input#chip-input');

    // ASSERT
    expect(input?.disabled).toBe(true);

    // CLEANUP — none
  });
});
