import {expect, test, describe} from 'vitest';
import {fixture, html} from '@open-wc/testing';
import '../mu-pagination';
import type {MuPagination} from '../mu-pagination';

describe('mu-pagination render', () => {
  test('renders nav with aria-label', async () => {
    // ARRANGE
    const el = await fixture<MuPagination>(
      html`<mu-pagination
        count="5"
        page="1"
      ></mu-pagination>`
    );

    // ACT
    const nav = el.shadowRoot?.querySelector('nav');

    // ASSERT
    expect(nav?.getAttribute('aria-label')).toBe('Pagination');
  });

  test('marks active page with aria-current', async () => {
    // ARRANGE
    const el = await fixture<MuPagination>(
      html`<mu-pagination
        count="5"
        page="3"
      ></mu-pagination>`
    );

    // ACT
    const activeBtn = el.shadowRoot?.querySelector('button[aria-current="page"]');

    // ASSERT
    expect(activeBtn?.textContent?.trim()).toBe('3');
  });

  test('disables prev button on first page', async () => {
    // ARRANGE
    const el = await fixture<MuPagination>(
      html`<mu-pagination
        count="5"
        page="1"
      ></mu-pagination>`
    );

    // ACT
    const prev = el.shadowRoot?.querySelector<HTMLButtonElement>(
      'button[aria-label="Previous page"]'
    );

    // ASSERT
    expect(prev?.disabled).toBe(true);
  });

  test('disables next button on last page', async () => {
    // ARRANGE
    const el = await fixture<MuPagination>(
      html`<mu-pagination
        count="5"
        page="5"
      ></mu-pagination>`
    );

    // ACT
    const next = el.shadowRoot?.querySelector<HTMLButtonElement>('button[aria-label="Next page"]');

    // ASSERT
    expect(next?.disabled).toBe(true);
  });

  test('fires page-change when page button is clicked', async () => {
    // ARRANGE
    const el = await fixture<MuPagination>(
      html`<mu-pagination
        count="5"
        page="1"
      ></mu-pagination>`
    );
    let newPage = -1;
    el.addEventListener('page-change', (e) => {
      newPage = (e as CustomEvent<{page: number}>).detail.page;
    });

    // ACT
    const buttons = el.shadowRoot?.querySelectorAll<HTMLButtonElement>('button');
    const page2Btn = Array.from(buttons ?? []).find((b) => b.textContent?.trim() === '2');
    page2Btn?.click();
    await el.updateComplete;

    // ASSERT
    expect(newPage).toBe(2);
    expect(el.page).toBe(2);
  });
});
