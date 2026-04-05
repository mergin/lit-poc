import {expect, test, describe} from 'vitest';
import {fixture, html} from '@open-wc/testing';
import '../mu-alert';
import type {MuAlert} from '../mu-alert';

describe('mu-alert render', () => {
  test('renders slotted content', async () => {
    // ARRANGE
    const el = await fixture<MuAlert>(html`<mu-alert severity="info">Hello alert</mu-alert>`);

    // ACT
    const text = el.textContent?.trim();

    // ASSERT
    expect(text).toBe('Hello alert');
  });

  test('uses role="alert" for error severity', async () => {
    // ARRANGE
    const el = await fixture<MuAlert>(html`<mu-alert severity="error">Error message</mu-alert>`);

    // ACT
    const div = el.shadowRoot?.querySelector('[role]');

    // ASSERT
    expect(div?.getAttribute('role')).toBe('alert');
  });

  test('uses role="status" for non-error severity', async () => {
    // ARRANGE
    const el = await fixture<MuAlert>(html`<mu-alert severity="success">Success</mu-alert>`);

    // ACT
    const div = el.shadowRoot?.querySelector('[role]');

    // ASSERT
    expect(div?.getAttribute('role')).toBe('status');
  });

  test('renders close button when closeLabel is set', async () => {
    // ARRANGE
    const el = await fixture<MuAlert>(
      html`<mu-alert
        severity="info"
        closeLabel="Dismiss"
      >
        Content
      </mu-alert>`
    );

    // ACT
    const btn = el.shadowRoot?.querySelector('button.close-btn');

    // ASSERT
    expect(btn).not.toBeNull();
    expect(btn?.getAttribute('aria-label')).toBe('Dismiss');
  });

  test('does not render close button without closeLabel', async () => {
    // ARRANGE
    const el = await fixture<MuAlert>(html`<mu-alert severity="info">Content</mu-alert>`);

    // ACT
    const btn = el.shadowRoot?.querySelector('button.close-btn');

    // ASSERT
    expect(btn).toBeNull();
  });

  test('dispatches mu-close when close button is clicked', async () => {
    // ARRANGE
    const el = await fixture<MuAlert>(
      html`<mu-alert
        severity="info"
        closeLabel="Close"
      >
        Content
      </mu-alert>`
    );
    let fired = false;
    el.addEventListener('mu-close', () => {
      fired = true;
    });

    // ACT
    const btn = el.shadowRoot?.querySelector<HTMLButtonElement>('button.close-btn');
    btn?.click();

    // ASSERT
    expect(fired).toBe(true);
  });
});
