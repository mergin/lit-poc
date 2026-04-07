import {LitElement, html, css, type TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {consume} from '@lit/context';
import {sharedStyles} from '../../../internal/utils/shared-styles.js';
import {classMap} from 'lit/directives/class-map.js';
import {localeContext} from '../../i18n/mu-locale-provider.js';
import {defaultLocale, type MuLocale} from '../../i18n/default-locale.js';

/**
 * A badge component to display status descriptors or unread counts.
 * @csspart badge - The badge bubble element positioned in the corner of its anchor.
 * @cssproperty --mu-badge-bg - Background colour; defaults to `--mu-primary`.
 * @cssproperty --mu-badge-color - Text colour; defaults to `--mu-primary-contrast`.
 * @cssproperty --mu-badge-radius - Border radius; defaults to 10 px for a pill shape.
 */
@customElement('mu-badge')
export class MuBadge extends LitElement {
  /** The content rendered within the badge. */
  @property() content: string | number = '';

  /** The color of the badge. */
  @property({type: String}) color = 'primary';

  /** If true, the badge is hidden. */
  @property({type: Boolean, reflect: true}) invisible = false;

  /** Accessible label for the badge content. Defaults to 'Badge: [content]'. */
  @property({type: String}) label = '';

  /** Current locale strings; provided via `mu-locale-provider` or defaults to English. */
  @consume({context: localeContext, subscribe: true})
  private _locale: MuLocale = defaultLocale;

  static override styles = [
    sharedStyles,
    css`
      :host {
        --mu-badge-bg: var(--mu-primary);
        --mu-badge-color: var(--mu-primary-contrast);
        --mu-badge-radius: 10px;
        display: inline-flex;
        position: relative;
        vertical-align: middle;
        flex-shrink: 0;
      }
      .badge {
        display: flex;
        flex-wrap: wrap;
        place-content: center;
        align-items: center;
        position: absolute;
        box-sizing: border-box;
        font-family: inherit;
        font-weight: var(--mu-font-weight-medium);
        font-size: 0.75rem;
        min-width: 20px;
        line-height: 1;
        padding: 0 6px;
        height: 20px;
        border-radius: 10px;
        z-index: 1;
        transition: transform var(--mu-duration-shorter, 200ms)
          var(--mu-easing-standard, cubic-bezier(0.4, 0, 0.2, 1)) 0ms;
        top: 0;
        right: 0;
        transform: scale(1) translate(50%, -50%);
        transform-origin: 100% 0%;
      }
      .badge.invisible {
        transform: scale(0) translate(50%, -50%);
      }
      /* Colors */
      .color-primary {
        background-color: var(--mu-primary);
        color: var(--mu-primary-contrast);
      }
      .color-secondary {
        background-color: var(--mu-secondary);
        color: var(--mu-secondary-contrast);
      }
      .color-error {
        background-color: var(--mu-error);
        color: #fff;
      }
      .color-success {
        background-color: var(--mu-success);
        color: #fff;
      }
      .color-warning {
        background-color: var(--mu-warning);
        color: #fff;
      }
      .color-info {
        background-color: var(--mu-info);
        color: #fff;
      }
      /* We only show the badge visually if it has content, unless configured otherwise. But typically dot badges are useful too (no content). */
      .badge.dot {
        min-width: 8px;
        height: 8px;
        border-radius: 4px;
        padding: 0;
      }
    `,
  ];

  override render(): TemplateResult {
    const isDot = this.content === '';
    const badgeClasses = {
      badge: true,
      invisible: this.invisible,
      dot: isDot,
      [`color-${this.color}`]: true,
    };

    const ariaLabel = this.label || this._locale.badge.defaultLabel(this.content);

    return html`
      <slot></slot>
      <span
        class="${classMap(badgeClasses)}"
        part="badge"
        aria-hidden="true"
        >${this.content}</span
      >
      <span class="visually-hidden">${ariaLabel}</span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mu-badge': MuBadge;
  }
}
