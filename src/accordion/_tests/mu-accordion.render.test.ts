import {expect, test, describe} from 'vitest';
import {fixture, html} from '@open-wc/testing';
import '../mu-accordion';
import '../mu-accordion-item';
import type {MuAccordionItem} from '../mu-accordion-item';

describe('mu-accordion render', () => {
  test('renders header button', async () => {
    // ARRANGE
    const el = await fixture<MuAccordionItem>(
      html`<mu-accordion-item heading="Test">Content</mu-accordion-item>`
    );

    // ACT
    const btn = el.shadowRoot?.querySelector('button.header');

    // ASSERT
    expect(btn).not.toBeNull();
    expect(btn?.getAttribute('aria-expanded')).toBe('false');
  });

  test('expands on header click', async () => {
    // ARRANGE
    const el = await fixture<MuAccordionItem>(
      html`<mu-accordion-item heading="Test">Content</mu-accordion-item>`
    );

    // ACT
    const btn = el.shadowRoot?.querySelector<HTMLButtonElement>('button.header');
    btn?.click();
    await el.updateComplete;

    // ASSERT
    expect(el.expanded).toBe(true);
    expect(btn?.getAttribute('aria-expanded')).toBe('true');
  });

  test('dispatches accordion-toggle with expanded detail', async () => {
    // ARRANGE
    const el = await fixture<MuAccordionItem>(
      html`<mu-accordion-item heading="Test">Content</mu-accordion-item>`
    );
    let detail: {expanded: boolean} | undefined;
    el.addEventListener('accordion-toggle', (e) => {
      detail = (e as CustomEvent<{expanded: boolean}>).detail;
    });

    // ACT
    const btn = el.shadowRoot?.querySelector<HTMLButtonElement>('button.header');
    btn?.click();
    await el.updateComplete;

    // ASSERT
    expect(detail?.expanded).toBe(true);
  });

  test('does not toggle when disabled', async () => {
    // ARRANGE
    const el = await fixture<MuAccordionItem>(
      html`<mu-accordion-item
        heading="Test"
        disabled
      >
        Content
      </mu-accordion-item>`
    );

    // ACT
    const btn = el.shadowRoot?.querySelector<HTMLButtonElement>('button.header');
    btn?.click();
    await el.updateComplete;

    // ASSERT
    expect(el.expanded).toBe(false);
  });

  test('accordion collapses other items when allowMultiple is false', async () => {
    // ARRANGE
    const container = await fixture(html`
      <mu-accordion>
        <mu-accordion-item
          heading="A"
          expanded
          >AA</mu-accordion-item
        >
        <mu-accordion-item heading="B">BB</mu-accordion-item>
      </mu-accordion>
    `);
    const items = Array.from(container.querySelectorAll<MuAccordionItem>('mu-accordion-item'));

    // ACT
    const btnB = items[1].shadowRoot?.querySelector<HTMLButtonElement>('button.header');
    btnB?.click();
    await items[1].updateComplete;
    await items[0].updateComplete;

    // ASSERT
    expect(items[0].expanded).toBe(false);
    expect(items[1].expanded).toBe(true);
  });
});
