import {LitElement, html, css, type TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {sharedStyles} from '../styles/shared-styles.js';

/**
 * Application top bar with three named slots: `start`, default, and `end`.
 * Renders as a sticky header.
 */
@customElement('mu-app-bar')
export class MuAppBar extends LitElement {
  /** Elevation level controlling box-shadow (0 = flat, 1 = default raised). */
  @property({type: Number}) elevation = 1;

  /** Background color token or explicit CSS color. */
  @property({type: String}) color = 'var(--mu-primary, #1976d2)';

  /** Makes the app bar position:fixed so it stays at the top during scroll. */
  @property({type: Boolean, reflect: true}) fixed = false;

  static override styles = [
    sharedStyles,
    css`
      :host {
        display: block;
        position: sticky;
        top: 0;
        z-index: 100;
      }

      :host([fixed]) {
        position: fixed;
        left: 0;
        right: 0;
      }

      header {
        display: flex;
        align-items: center;
        min-height: 64px;
        padding: 0 16px;
        gap: 16px;
        color: #fff;
        box-sizing: border-box;
        width: 100%;
      }

      .elevation-0 {
        box-shadow: none;
      }

      .elevation-1 {
        box-shadow: var(
          --mu-elevation-2,
          0 3px 6px rgba(0, 0, 0, 0.16),
          0 3px 6px rgba(0, 0, 0, 0.23)
        );
      }

      .slot-start,
      .slot-end {
        display: flex;
        align-items: center;
        gap: 8px;
        flex-shrink: 0;
      }

      .slot-center {
        flex: 1;
        min-width: 0;
        display: flex;
        align-items: center;
      }
    `,
  ];

  /**
   * @returns The rendered app bar template.
   */
  override render(): TemplateResult {
    return html`
      <header
        class="elevation-${this.elevation}"
        style="background-color: ${this.color};"
        role="banner"
      >
        <div class="slot-start">
          <slot name="start"></slot>
        </div>
        <div class="slot-center">
          <slot></slot>
        </div>
        <div class="slot-end">
          <slot name="end"></slot>
        </div>
      </header>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mu-app-bar': MuAppBar;
  }
}
