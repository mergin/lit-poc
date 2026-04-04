import {describe, it, expect} from 'vitest';
import {fixture, html} from '@open-wc/testing';
import type {MuSnackbar} from '../mu-snackbar.js';
import '../mu-snackbar.js';

describe('MuSnackbar — render', (): void => {
  it('renders a snackbar container', async (): Promise<void> => {
    // ARRANGE
    const el = await fixture<MuSnackbar>(html`<mu-snackbar message="Hello"></mu-snackbar>`);

    // ACT
    const snackbar = el.shadowRoot?.querySelector('.snackbar');

    // ASSERT
    expect(snackbar).not.toBeNull();

    // CLEANUP — none
  });

  it('renders the message text', async (): Promise<void> => {
    // ARRANGE
    const el = await fixture<MuSnackbar>(html`<mu-snackbar message="Changes saved"></mu-snackbar>`);

    // ACT
    const msg = el.shadowRoot?.querySelector('.message');

    // ASSERT
    expect(msg?.textContent?.trim()).toBe('Changes saved');

    // CLEANUP — none
  });

  it('uses aria-live="polite" for default variant', async (): Promise<void> => {
    // ARRANGE
    const el = await fixture<MuSnackbar>(html`<mu-snackbar message="Info"></mu-snackbar>`);

    // ACT
    const snackbar = el.shadowRoot?.querySelector('.snackbar');

    // ASSERT
    expect(snackbar?.getAttribute('aria-live')).toBe('polite');

    // CLEANUP — none
  });

  it('uses aria-live="assertive" for error variant', async (): Promise<void> => {
    // ARRANGE
    const el = await fixture<MuSnackbar>(
      html`<mu-snackbar
        message="Error"
        variant="error"
      ></mu-snackbar>`
    );

    // ACT
    const snackbar = el.shadowRoot?.querySelector('.snackbar');

    // ASSERT
    expect(snackbar?.getAttribute('aria-live')).toBe('assertive');

    // CLEANUP — none
  });

  it('renders role="status" on the snackbar container', async (): Promise<void> => {
    // ARRANGE
    const el = await fixture<MuSnackbar>(html`<mu-snackbar message="OK"></mu-snackbar>`);

    // ACT
    const snackbar = el.shadowRoot?.querySelector('.snackbar');

    // ASSERT
    expect(snackbar?.getAttribute('role')).toBe('status');

    // CLEANUP — none
  });

  it('renders action button when actionLabel is set', async (): Promise<void> => {
    // ARRANGE
    const el = await fixture<MuSnackbar>(
      html`<mu-snackbar
        message="Item deleted"
        action-label="Undo"
      ></mu-snackbar>`
    );

    // ACT
    const actionBtn = el.shadowRoot?.querySelector('.action');

    // ASSERT
    expect(actionBtn?.textContent?.trim()).toBe('Undo');

    // CLEANUP — none
  });

  it('does not render action button when actionLabel is empty', async (): Promise<void> => {
    // ARRANGE
    const el = await fixture<MuSnackbar>(html`<mu-snackbar message="Saved"></mu-snackbar>`);

    // ACT
    const actionBtn = el.shadowRoot?.querySelector('.action');

    // ASSERT
    expect(actionBtn).toBeNull();

    // CLEANUP — none
  });

  it('renders a dismiss close button', async (): Promise<void> => {
    // ARRANGE
    const el = await fixture<MuSnackbar>(html`<mu-snackbar message="Hello"></mu-snackbar>`);

    // ACT
    const closeBtn = el.shadowRoot?.querySelector('.close');

    // ASSERT
    expect(closeBtn).not.toBeNull();
    expect(closeBtn?.getAttribute('aria-label')).toBe('Dismiss');

    // CLEANUP — none
  });

  it('dispatches mu-close event when dismiss button is clicked', async (): Promise<void> => {
    // ARRANGE
    const el = await fixture<MuSnackbar>(
      html`<mu-snackbar
        message="Hello"
        ?open="${true}"
      ></mu-snackbar>`
    );
    let fired = false;
    el.addEventListener('mu-close', (): void => {
      fired = true;
    });

    // ACT
    (el.shadowRoot?.querySelector('.close') as HTMLElement)?.click();

    // ASSERT
    expect(fired).toBe(true);

    // CLEANUP — none
  });

  it('dispatches mu-action event when action button is clicked', async (): Promise<void> => {
    // ARRANGE
    const el = await fixture<MuSnackbar>(
      html`<mu-snackbar
        message="Deleted"
        action-label="Undo"
        ?open="${true}"
      ></mu-snackbar>`
    );
    let fired = false;
    el.addEventListener('mu-action', (): void => {
      fired = true;
    });

    // ACT
    (el.shadowRoot?.querySelector('.action') as HTMLElement)?.click();

    // ASSERT
    expect(fired).toBe(true);

    // CLEANUP — none
  });
});
