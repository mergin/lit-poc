import {describe, it, expect, vi} from 'vitest';
import {fixture, html} from '@open-wc/testing';
import type {MuDialog} from '../mu-dialog.js';
import '../mu-dialog.js';

describe('MuDialog — render', (): void => {
  it('renders a native dialog element in the shadow root', async (): Promise<void> => {
    // ARRANGE
    const el = await fixture<MuDialog>(html`<mu-dialog></mu-dialog>`);

    // ACT
    const dialog = el.shadowRoot?.querySelector('dialog');

    // ASSERT
    expect(dialog).not.toBeNull();

    // CLEANUP — none
  });

  it('sets aria-modal="true" on the dialog element', async (): Promise<void> => {
    // ARRANGE
    const el = await fixture<MuDialog>(html`<mu-dialog></mu-dialog>`);

    // ACT
    const dialog = el.shadowRoot?.querySelector('dialog');

    // ASSERT
    expect(dialog?.getAttribute('aria-modal')).toBe('true');

    // CLEANUP — none
  });

  it('sets aria-labelledby="headline" on the dialog element', async (): Promise<void> => {
    // ARRANGE
    const el = await fixture<MuDialog>(html`<mu-dialog></mu-dialog>`);

    // ACT
    const dialog = el.shadowRoot?.querySelector('dialog');

    // ASSERT
    expect(dialog?.getAttribute('aria-labelledby')).toBe('headline');

    // CLEANUP — none
  });

  it('renders the headline text in the #headline element', async (): Promise<void> => {
    // ARRANGE
    const el = await fixture<MuDialog>(html`<mu-dialog headline="Delete item"></mu-dialog>`);

    // ACT
    const headline = el.shadowRoot?.querySelector('#headline');

    // ASSERT
    expect(headline?.textContent?.trim()).toBe('Delete item');

    // CLEANUP — none
  });

  it('has a content slot for body', async (): Promise<void> => {
    // ARRANGE
    const el = await fixture<MuDialog>(html`<mu-dialog></mu-dialog>`);

    // ACT
    const slot = el.shadowRoot?.querySelector('.content slot');

    // ASSERT
    expect(slot).not.toBeNull();

    // CLEANUP — none
  });

  it('has a named actions slot for footer buttons', async (): Promise<void> => {
    // ARRANGE
    const el = await fixture<MuDialog>(html`<mu-dialog></mu-dialog>`);

    // ACT
    const actionsSlot = el.shadowRoot?.querySelector('slot[name="actions"]');

    // ASSERT
    expect(actionsSlot).not.toBeNull();

    // CLEANUP — none
  });

  it('reflects the open property to an attribute', async (): Promise<void> => {
    // ARRANGE
    const el = await fixture<MuDialog>(html`<mu-dialog></mu-dialog>`);

    // ACT — spy on showModal to prevent test environment errors
    const dialogEl = el.shadowRoot?.querySelector('dialog') as HTMLDialogElement;
    if (dialogEl) {
      dialogEl.showModal = vi.fn();
    }
    el.open = true;
    await el.updateComplete;

    // ASSERT
    expect(el.hasAttribute('open')).toBe(true);

    // CLEANUP
    el.open = false;
  });

  it('dispatches mu-open event when opened', async (): Promise<void> => {
    // ARRANGE
    const el = await fixture<MuDialog>(html`<mu-dialog></mu-dialog>`);
    const dialogEl = el.shadowRoot?.querySelector('dialog') as HTMLDialogElement;
    if (dialogEl) {
      dialogEl.showModal = vi.fn();
    }
    let fired = false;
    el.addEventListener('mu-open', (): void => {
      fired = true;
    });

    // ACT
    el.open = true;
    await el.updateComplete;

    // ASSERT
    expect(fired).toBe(true);

    // CLEANUP
    el.open = false;
  });
});
