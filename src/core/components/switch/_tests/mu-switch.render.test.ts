import {describe, it, expect} from 'vitest';
import {fixture, html} from '@open-wc/testing';
import type {MuSwitch} from '../mu-switch.js';
import '../mu-switch.js';

describe('MuSwitch — render', (): void => {
  it('renders a switch role element', async (): Promise<void> => {
    // ARRANGE
    const el = await fixture<MuSwitch>(html`<mu-switch></mu-switch>`);

    // ACT
    const track = el.shadowRoot?.querySelector('[role="switch"]');

    // ASSERT
    expect(track).not.toBeNull();

    // CLEANUP — none
  });

  it('renders label text', async (): Promise<void> => {
    // ARRANGE
    const el = await fixture<MuSwitch>(html`<mu-switch label="Dark mode"></mu-switch>`);

    // ACT
    const label = el.shadowRoot?.querySelector('.label-text');

    // ASSERT
    expect(label?.textContent?.trim()).toBe('Dark mode');

    // CLEANUP — none
  });

  it('sets aria-checked="false" when off', async (): Promise<void> => {
    // ARRANGE
    const el = await fixture<MuSwitch>(html`<mu-switch></mu-switch>`);

    // ACT
    const track = el.shadowRoot?.querySelector('[role="switch"]');

    // ASSERT
    expect(track?.getAttribute('aria-checked')).toBe('false');

    // CLEANUP — none
  });

  it('sets aria-checked="true" when checked', async (): Promise<void> => {
    // ARRANGE
    const el = await fixture<MuSwitch>(html`<mu-switch checked></mu-switch>`);

    // ACT
    const track = el.shadowRoot?.querySelector('[role="switch"]');

    // ASSERT
    expect(track?.getAttribute('aria-checked')).toBe('true');

    // CLEANUP — none
  });

  it('sets aria-disabled="true" when disabled', async (): Promise<void> => {
    // ARRANGE
    const el = await fixture<MuSwitch>(html`<mu-switch disabled></mu-switch>`);

    // ACT
    const track = el.shadowRoot?.querySelector('[role="switch"]');

    // ASSERT
    expect(track?.getAttribute('aria-disabled')).toBe('true');

    // CLEANUP — none
  });

  it('toggles checked on click', async (): Promise<void> => {
    // ARRANGE
    const el = await fixture<MuSwitch>(html`<mu-switch></mu-switch>`);

    // ACT
    const track = el.shadowRoot?.querySelector<HTMLElement>('[role="switch"]');
    track?.click();
    await el.updateComplete;

    // ASSERT
    expect(el.checked).toBe(true);

    // CLEANUP — none
  });

  it('dispatches change event when toggled', async (): Promise<void> => {
    // ARRANGE
    const el = await fixture<MuSwitch>(html`<mu-switch></mu-switch>`);
    let fired = false;
    el.addEventListener('change', (): void => {
      fired = true;
    });

    // ACT
    const track = el.shadowRoot?.querySelector<HTMLElement>('[role="switch"]');
    track?.click();

    // ASSERT
    expect(fired).toBe(true);

    // CLEANUP — none
  });

  it('does not toggle when disabled', async (): Promise<void> => {
    // ARRANGE
    const el = await fixture<MuSwitch>(html`<mu-switch disabled></mu-switch>`);

    // ACT
    const track = el.shadowRoot?.querySelector<HTMLElement>('[role="switch"]');
    track?.click();

    // ASSERT
    expect(el.checked).toBe(false);

    // CLEANUP — none
  });

  it('reflects checked attribute on the host', async (): Promise<void> => {
    // ARRANGE
    const el = await fixture<MuSwitch>(html`<mu-switch checked></mu-switch>`);

    // ACT — none

    // ASSERT
    expect(el.hasAttribute('checked')).toBe(true);

    // CLEANUP — none
  });
});
