// @vitest-environment node
import {describe, expect, it} from 'vitest';
import {render} from '@lit-labs/ssr';
import {collectResult} from '@lit-labs/ssr/lib/render-result.js';
import {html} from 'lit';

/**
 * SSR smoke tests — run in a Node.js environment (no DOM).
 * Verifies that components can be rendered to HTML strings on the server
 * without throwing, satisfying the `@lit-labs/ssr` integration requirement.
 */
describe('SSR smoke test', (): void => {
  it('renders mu-button to a string without throwing', async (): Promise<void> => {
    // ARRANGE
    // Dynamically import to allow server-side custom element registration
    await import('../core/components/button/mu-button.js');

    // ACT
    const result = render(html`<mu-button>Click</mu-button>`);
    const output = await collectResult(result);

    // ASSERT
    expect(output).toContain('mu-button');

    // CLEANUP — none
  });

  it('collectResult produces a non-empty string', async (): Promise<void> => {
    // ARRANGE / ACT
    const result = render(html`<div>hello ssr</div>`);
    const output = await collectResult(result);

    // ASSERT
    expect(typeof output).toBe('string');
    expect(output.length).toBeGreaterThan(0);

    // CLEANUP — none
  });
});
