import {expect, test, describe} from 'vitest';
import {fixture, html} from '@open-wc/testing';
import '../mu-drawer';
import type {MuDrawer} from '../mu-drawer';

describe('mu-drawer render', () => {
  test('renders a dialog element', async () => {
    // ARRANGE
    const el = await fixture<MuDrawer>(html`<mu-drawer></mu-drawer>`);

    // ACT
    const dialog = el.shadowRoot?.querySelector('dialog');

    // ASSERT
    expect(dialog).not.toBeNull();
  });

  test('applies placement class to dialog', async () => {
    // ARRANGE
    const el = await fixture<MuDrawer>(html`<mu-drawer placement="right"></mu-drawer>`);

    // ACT
    const dialog = el.shadowRoot?.querySelector('dialog');

    // ASSERT
    expect(dialog?.classList.contains('placement-right')).toBe(true);
  });

  test('applies custom width to dialog', async () => {
    // ARRANGE
    const el = await fixture<MuDrawer>(html`<mu-drawer width="400px"></mu-drawer>`);

    // ACT
    const dialog = el.shadowRoot?.querySelector<HTMLElement>('dialog');

    // ASSERT
    expect(dialog?.style.width).toBe('400px');
  });
});
