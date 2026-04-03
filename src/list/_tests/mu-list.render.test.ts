import {expect, test, describe} from 'vitest';
import {fixture, html} from '@open-wc/testing';
import '../mu-list';
import '../mu-list-item';
import type {MuList} from '../mu-list';
import type {MuListItem} from '../mu-list-item';

describe('mu-list render', () => {
  test('renders native ul element', async () => {
    // ARRANGE
    const el = await fixture<MuList>(html`<mu-list></mu-list>`);

    // ACT
    const ul = el.shadowRoot?.querySelector('ul');

    // ASSERT
    expect(ul).not.toBeNull();
    expect(ul?.getAttribute('role')).toBe('list');
  });
});

describe('mu-list-item render', () => {
  test('renders native li element', async () => {
    // ARRANGE
    const el = await fixture<MuListItem>(html`<mu-list-item>Item</mu-list-item>`);

    // ACT
    const li = el.shadowRoot?.querySelector('li');

    // ASSERT
    expect(li).not.toBeNull();
    expect(li?.getAttribute('role')).toBe('listitem');
  });
});
