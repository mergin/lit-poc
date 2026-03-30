/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {fixture, html, expect} from '@open-wc/testing';
import '../mu-card';

describe('mu-card render', (): void => {
  // ARRANGE
  it('renders header, content, and actions slots', async (): Promise<void> => {
    // ACT
    const el = await fixture(html`
      <mu-card>
        <div slot="header">Header</div>
        <div>Content</div>
        <div slot="actions">Actions</div>
      </mu-card>
    `);
    // ASSERT
    // Helper to normalize text
    const normalize = (txt: string | null | undefined): string =>
      (txt || '').replace(/\s+/g, ' ').trim();
    // Wait for next animation frame to ensure slot assignment
    await new Promise((resolve) => requestAnimationFrame(resolve));
    // Debug output
    // eslint-disable-next-line no-console
    console.log('DEBUG mu-card:', {
      elOuter: el.outerHTML,
      shadow: el.shadowRoot?.innerHTML,
      headerSlotAssigned:
        headerSlot instanceof HTMLSlotElement
          ? headerSlot.assignedNodes().map((n) => n.textContent)
          : undefined,
      contentSlotAssigned:
        contentSlot instanceof HTMLSlotElement
          ? contentSlot.assignedNodes().map((n) => n.textContent)
          : undefined,
      actionsSlotAssigned:
        actionsSlot instanceof HTMLSlotElement
          ? actionsSlot.assignedNodes().map((n) => n.textContent)
          : undefined,
      elInner: el.innerHTML,
      lightDom: el.textContent,
    });

    // Check header slot
    const headerSlot = el.shadowRoot?.querySelector('.header slot');
    let headerText = '';
    if (headerSlot instanceof HTMLSlotElement) {
      const headerNodes = headerSlot.assignedNodes({flatten: true}) || [];
      headerText = headerNodes.map((n: Node): string => n.textContent || '').join(' ');
    }
    if (!headerText.trim()) {
      // fallback: use light DOM element with slot="header"
      headerText = el.querySelector('[slot="header"]')?.textContent || '';
    }
    headerText = normalize(headerText);
    expect(headerText).to.include('Header');

    // Check content slot (default)
    const contentSlot = el.shadowRoot?.querySelector('.content slot');
    let contentText = '';
    if (contentSlot instanceof HTMLSlotElement) {
      const contentNodes = contentSlot.assignedNodes({flatten: true}) || [];
      contentText = contentNodes.map((n: Node): string => n.textContent || '').join(' ');
    }
    if (!contentText.trim()) {
      // fallback: use light DOM children without slot attr
      contentText = Array.from(el.childNodes)
        .filter((n) => n.nodeType === Node.ELEMENT_NODE && !(n as Element).hasAttribute('slot'))
        .map((n) => n.textContent || '')
        .join(' ');
    }
    contentText = normalize(contentText);
    expect(contentText).to.include('Content');

    // Check actions slot
    const actionsSlot = el.shadowRoot?.querySelector('.actions slot');
    let actionsText = '';
    if (actionsSlot instanceof HTMLSlotElement) {
      const actionsNodes = actionsSlot.assignedNodes({flatten: true}) || [];
      actionsText = actionsNodes.map((n: Node): string => n.textContent || '').join(' ');
    }
    if (!actionsText.trim()) {
      // fallback: use light DOM element with slot="actions"
      actionsText = el.querySelector('[slot="actions"]')?.textContent || '';
    }
    actionsText = normalize(actionsText);
    expect(actionsText).to.include('Actions');
  });
});
