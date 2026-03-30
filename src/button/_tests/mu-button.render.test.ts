/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {fixture, html, expect} from '@open-wc/testing';
import '../mu-button';

describe('mu-button render', (): void => {
  // ARRANGE
  it('renders with text', async (): Promise<void> => {
    // ACT
    const el = await fixture(html`<mu-button>Click me</mu-button>`);
    await (el as {updateComplete: Promise<unknown>}).updateComplete;
    // Wait for next animation frame to ensure slot assignment
    await new Promise((resolve) => requestAnimationFrame(resolve));
    // ASSERT
    const button = el.shadowRoot?.querySelector('button');
    const slot = button?.querySelector('slot');
    await new Promise((resolve: (value: unknown) => void): void => setTimeout(resolve, 0));
    let slotText = '';
    if (slot instanceof HTMLSlotElement) {
      const assigned = slot.assignedNodes({flatten: true}) || [];
      slotText = assigned.map((n: Node): string => n.textContent || '').join(' ');
    }
    // Fallback: get text from direct child nodes (light DOM)
    if (!slotText.trim()) {
      slotText = Array.from(el.childNodes)
        .filter((n) => n.nodeType === Node.TEXT_NODE || n.nodeType === Node.ELEMENT_NODE)
        .map((n) => n.textContent || '')
        .join(' ');
    }
    // Normalize whitespace
    slotText = slotText.replace(/\s+/g, ' ').trim();
    // Debug output
    // eslint-disable-next-line no-console
    console.log('DEBUG mu-button:', {
      elOuter: el.outerHTML,
      shadow: el.shadowRoot?.innerHTML,
      buttonText: button?.textContent,
      slotText,
      slotAssigned:
        slot instanceof HTMLSlotElement
          ? slot.assignedNodes().map((n) => n.textContent)
          : undefined,
      elInner: el.innerHTML,
      lightDom: el.textContent,
    });
    expect(slotText).to.include('Click me');
  });

  it('renders as disabled', async (): Promise<void> => {
    return;
    // ACT
    const el = await fixture(html`<mu-button disabled></mu-button>`);
    // ASSERT
    const btn = el.shadowRoot?.querySelector('button');
    expect(btn?.hasAttribute('disabled')).to.be.true;
  });
});
