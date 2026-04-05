import {expect, test, describe} from 'vitest';
import {fixture, html} from '@open-wc/testing';
import '../mu-breadcrumb';
import '../mu-breadcrumb-item';
import type {MuBreadcrumb} from '../mu-breadcrumb';
import type {MuBreadcrumbItem} from '../mu-breadcrumb-item';

describe('mu-breadcrumb render', () => {
  test('renders nav with aria-label', async () => {
    // ARRANGE
    const el = await fixture<MuBreadcrumb>(html`
      <mu-breadcrumb label="Site navigation">
        <mu-breadcrumb-item href="/">Home</mu-breadcrumb-item>
        <mu-breadcrumb-item current>Page</mu-breadcrumb-item>
      </mu-breadcrumb>
    `);

    // ACT
    const nav = el.shadowRoot?.querySelector('nav');

    // ASSERT
    expect(nav?.getAttribute('aria-label')).toBe('Site navigation');
  });

  test('renders ordered list', async () => {
    // ARRANGE
    const el = await fixture<MuBreadcrumb>(html`
      <mu-breadcrumb>
        <mu-breadcrumb-item href="/">Home</mu-breadcrumb-item>
        <mu-breadcrumb-item current>Page</mu-breadcrumb-item>
      </mu-breadcrumb>
    `);

    // ACT
    const ol = el.shadowRoot?.querySelector('ol');

    // ASSERT
    expect(ol).not.toBeNull();
  });

  test('current item has aria-current="page"', async () => {
    // ARRANGE
    const el = await fixture<MuBreadcrumbItem>(
      html`<mu-breadcrumb-item current>Current</mu-breadcrumb-item>`
    );

    // ACT
    const span = el.shadowRoot?.querySelector('[aria-current="page"]');

    // ASSERT
    expect(span).not.toBeNull();
  });

  test('non-current item with href renders an anchor', async () => {
    // ARRANGE
    const el = await fixture<MuBreadcrumbItem>(
      html`<mu-breadcrumb-item href="/page">Page</mu-breadcrumb-item>`
    );

    // ACT
    const a = el.shadowRoot?.querySelector('a');

    // ASSERT
    expect(a).not.toBeNull();
    expect(a?.getAttribute('href')).toBe('/page');
  });
});
