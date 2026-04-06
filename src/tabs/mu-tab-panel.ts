import {LitElement, html, css, type TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';

/**
 * Content panel associated with a `mu-tab`.
 * Visibility is managed by `mu-tabs`; do not use standalone.
 * @csspart tab-panel - The `div[role="tabpanel"]` element.
 * @cssproperty --mu-tab-panel-padding - Padding inside the panel; defaults to 16 px.
 */
@customElement('mu-tab-panel')
export class MuTabPanel extends LitElement {
  /** Whether this panel is currently visible. */
  @property({type: Boolean, reflect: true}) active = false;

  /** ID of the `mu-tab` that controls this panel. */
  @property({type: String}) labelledby = '';

  static override styles = css`
    :host {
      --mu-tab-panel-padding: 16px;
      display: block;
    }

    :host(:not([active])) {
      display: none;
    }

    .panel {
      padding: 16px;
    }
  `;

  /**
   * @returns The rendered panel template.
   */
  override render(): TemplateResult {
    return html`
      <div
        class="panel"
        part="tab-panel"
        role="tabpanel"
        aria-labelledby="${this.labelledby}"
        tabindex="0"
      >
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mu-tab-panel': MuTabPanel;
  }
}
