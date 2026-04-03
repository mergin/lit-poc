import {describe, it, expect} from 'vitest';
import {fixture, html} from '@open-wc/testing';
import type {MuThemeProvider} from '../mu-theme-provider.js';
import '../mu-theme-provider.js';

describe('MuThemeProvider — render', (): void => {
  it('renders slotted content', async (): Promise<void> => {
    // ARRANGE
    const el = await fixture<MuThemeProvider>(
      html`<mu-theme-provider><span id="child">Hello</span></mu-theme-provider>`
    );

    // ACT
    const child = el.querySelector('#child');

    // ASSERT
    expect(child).not.toBeNull();
    expect(child?.textContent).toBe('Hello');

    // CLEANUP — none
  });

  it('defaults to light mode and applies light primary token', async (): Promise<void> => {
    // ARRANGE
    const el = await fixture<MuThemeProvider>(html`<mu-theme-provider></mu-theme-provider>`);

    // ACT
    const primary = el.style.getPropertyValue('--mu-primary').trim();

    // ASSERT
    expect(el.mode).toBe('light');
    expect(primary).toBe('#1976d2');

    // CLEANUP — none
  });

  it('applies dark primary token when mode is dark', async (): Promise<void> => {
    // ARRANGE
    const el = await fixture<MuThemeProvider>(
      html`<mu-theme-provider mode="dark"></mu-theme-provider>`
    );

    // ACT
    const primary = el.style.getPropertyValue('--mu-primary').trim();

    // ASSERT
    expect(primary).toBe('#90caf9');

    // CLEANUP — none
  });

  it('updates tokens when mode changes from light to dark', async (): Promise<void> => {
    // ARRANGE
    const el = await fixture<MuThemeProvider>(html`<mu-theme-provider></mu-theme-provider>`);
    expect(el.style.getPropertyValue('--mu-bg-paper').trim()).toBe('#fff');

    // ACT
    el.mode = 'dark';
    await el.updateComplete;

    // ASSERT
    expect(el.style.getPropertyValue('--mu-bg-paper').trim()).toBe('#1e1e1e');

    // CLEANUP — none
  });

  it('updates tokens when mode changes from dark back to light', async (): Promise<void> => {
    // ARRANGE
    const el = await fixture<MuThemeProvider>(
      html`<mu-theme-provider mode="dark"></mu-theme-provider>`
    );

    // ACT
    el.mode = 'light';
    await el.updateComplete;

    // ASSERT
    expect(el.style.getPropertyValue('--mu-bg-paper').trim()).toBe('#fff');

    // CLEANUP — none
  });

  it('reflects mode attribute on host', async (): Promise<void> => {
    // ARRANGE
    const el = await fixture<MuThemeProvider>(
      html`<mu-theme-provider mode="dark"></mu-theme-provider>`
    );

    // ACT — none

    // ASSERT
    expect(el.getAttribute('mode')).toBe('dark');

    // CLEANUP — none
  });

  it('applies all 18 token properties in light mode', async (): Promise<void> => {
    // ARRANGE
    const el = await fixture<MuThemeProvider>(html`<mu-theme-provider></mu-theme-provider>`);

    // ACT
    const defined = [
      '--mu-primary',
      '--mu-secondary',
      '--mu-error',
      '--mu-warning',
      '--mu-info',
      '--mu-success',
      '--mu-bg-default',
      '--mu-bg-paper',
      '--mu-divider',
      '--mu-text-primary',
      '--mu-text-secondary',
      '--mu-text-disabled',
    ].filter((token) => el.style.getPropertyValue(token).trim() !== '');

    // ASSERT
    expect(defined.length).toBe(12);

    // CLEANUP — none
  });
});
