import {expect, test, describe} from 'vitest';
import {fixture, html} from '@open-wc/testing';
import '../mu-linear-progress';
import type {MuLinearProgress} from '../mu-linear-progress';

describe('mu-linear-progress render', () => {
  test('renders determinate bar with correct width', async () => {
    // ARRANGE
    const el = await fixture<MuLinearProgress>(
      html`<mu-linear-progress value="60"></mu-linear-progress>`
    );

    // ACT
    const bar = el.shadowRoot?.querySelector('.bar') as HTMLElement | null;

    // ASSERT
    expect(bar).not.toBeNull();
    expect(bar?.style.width).toBe('60%');
  });

  test('renders indeterminate bars', async () => {
    // ARRANGE
    const el = await fixture<MuLinearProgress>(
      html`<mu-linear-progress indeterminate></mu-linear-progress>`
    );

    // ACT
    const bars = el.shadowRoot?.querySelectorAll('.bar');

    // ASSERT
    expect(bars?.length).toBe(2);
  });

  test('sets role="progressbar" on host', async () => {
    // ARRANGE
    const el = await fixture<MuLinearProgress>(
      html`<mu-linear-progress value="30"></mu-linear-progress>`
    );

    // ACT
    // (no action needed)

    // ASSERT
    expect(el.getAttribute('role')).toBe('progressbar');
    expect(el.getAttribute('aria-valuenow')).toBe('30');
  });

  test('dispatches mu-complete when value reaches 100', async () => {
    // ARRANGE
    const el = await fixture<MuLinearProgress>(
      html`<mu-linear-progress value="50"></mu-linear-progress>`
    );
    let fired = false;
    el.addEventListener('mu-complete', () => {
      fired = true;
    });

    // ACT
    el.value = 100;
    await el.updateComplete;

    // ASSERT
    expect(fired).toBe(true);
  });
});
