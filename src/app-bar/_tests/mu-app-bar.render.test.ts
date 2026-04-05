import {expect, test, describe} from 'vitest';
import {fixture, html} from '@open-wc/testing';
import '../mu-app-bar';
import type {MuAppBar} from '../mu-app-bar';

describe('mu-app-bar render', () => {
  test('renders a header with role="banner"', async () => {
    // ARRANGE
    const el = await fixture<MuAppBar>(html`<mu-app-bar></mu-app-bar>`);

    // ACT
    const header = el.shadowRoot?.querySelector('header');

    // ASSERT
    expect(header?.getAttribute('role')).toBe('banner');
  });

  test('applies custom background color', async () => {
    // ARRANGE
    const el = await fixture<MuAppBar>(html`<mu-app-bar color="#ff0000"></mu-app-bar>`);

    // ACT
    const header = el.shadowRoot?.querySelector<HTMLElement>('header');

    // ASSERT
    expect(header?.style.backgroundColor).toBe('#ff0000');
  });

  test('renders start, default and end slots', async () => {
    // ARRANGE
    const el = await fixture<MuAppBar>(html`
      <mu-app-bar>
        <span slot="start">Start</span>
        <span>Title</span>
        <span slot="end">End</span>
      </mu-app-bar>
    `);

    // ACT
    const slots = el.shadowRoot?.querySelectorAll('slot');

    // ASSERT
    expect(slots?.length).toBe(3);
  });
});
