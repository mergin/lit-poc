import {LitElement, html, css, type TemplateResult, type PropertyValues} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import {sharedStyles} from '../styles/shared-styles.js';

/**
 * File upload form component with drag-and-drop support.
 * Participates natively in HTML forms.
 *
 * @csspart dropzone         - The clickable drop zone container.
 * @csspart dropzone--active - Applied to the drop zone when a file is dragged over.
 * @csspart label            - The main label text inside the drop zone.
 * @csspart hint             - The secondary hint text inside the drop zone.
 *
 * @fires mu-change - Dispatched when files are selected. Detail: `{ files: FileList }`.
 */
@customElement('mu-file-upload')
export class MuFileUpload extends LitElement {
  /** Enables form association via ElementInternals. */
  static readonly formAssociated = true;

  private readonly _internals: ElementInternals;

  /** Allows selection of multiple files. */
  @property({type: Boolean}) multiple = false;

  /** MIME type accept string (e.g. `image/*,.pdf`). */
  @property({type: String}) accept = '';

  /** Disables the file upload control. */
  @property({type: Boolean, reflect: true}) disabled = false;

  /** Primary label text shown inside the drop zone. */
  @property({type: String}) label = 'Choose file';

  /** Secondary hint text shown below the label. */
  @property({type: String}) dragLabel = 'or drag and drop here';

  /** Form field name. */
  @property({type: String}) name = '';

  /** Whether a file is currently being dragged over the drop zone. */
  @state() private _dragActive = false;

  /** Currently selected/dropped files (for display purposes). */
  @state() private _files: FileList | null = null;

  /** Creates a MuFileUpload instance and registers it with the form. */
  constructor() {
    super();
    this._internals = this.attachInternals();
  }

  static override styles = [
    sharedStyles,
    css`
      :host {
        display: block;
      }
      :host([disabled]) {
        opacity: 0.38;
        cursor: not-allowed;
        pointer-events: none;
      }
      .dropzone {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 4px;
        padding: 32px 16px;
        border: 2px dashed var(--mu-text-disabled, #919eab);
        border-radius: 8px;
        background: var(--mu-background, #f4f6f8);
        cursor: pointer;
        transition: border-color 0.2s, background 0.2s;
        part: dropzone;
      }
      .dropzone:hover,
      .dropzone:focus-visible {
        border-color: var(--mu-primary, #1976d2);
        background: rgba(25, 118, 210, 0.04);
      }
      .dropzone.active {
        border-color: var(--mu-primary, #1976d2);
        background: rgba(25, 118, 210, 0.08);
        part: dropzone dropzone--active;
      }
      .dropzone:focus-visible {
        outline: 2px solid var(--mu-primary, #1976d2);
        outline-offset: 2px;
      }
      .label {
        font-size: 0.875rem;
        font-weight: 600;
        color: var(--mu-primary, #1976d2);
        part: label;
      }
      .hint {
        font-size: 0.75rem;
        color: var(--mu-text-secondary, #637381);
        part: hint;
      }
      .file-list {
        margin-top: 8px;
        font-size: 0.75rem;
        color: var(--mu-text-primary, #212b36);
      }
      .visually-hidden {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
      }
    `,
  ];

  /**
   * Syncs form value when the name changes.
   * @param changedProps - Map of changed properties.
   */
  override updated(changedProps: PropertyValues): void {
    super.updated(changedProps);
    if (changedProps.has('name')) {
      this._syncFormValue(this._files);
    }
  }

  /**
   * Sets the form value from a FileList using FormData.
   * @param files - The FileList to sync.
   */
  private _syncFormValue(files: FileList | null): void {
    if (!files || files.length === 0) {
      this._internals.setFormValue(null);
      return;
    }
    const formData = new FormData();
    Array.from(files).forEach((file: File): void => {
      formData.append(this.name || 'file', file);
    });
    this._internals.setFormValue(formData);
  }

  /**
   * Processes a FileList: updates state, syncs form value, dispatches event.
   * @param files - The FileList to process.
   */
  private _processFiles(files: FileList | null): void {
    if (!files || files.length === 0) return;
    this._files = files;
    this._syncFormValue(files);
    this.dispatchEvent(
      new CustomEvent<{files: FileList}>('mu-change', {
        bubbles: true,
        composed: true,
        detail: {files},
      })
    );
  }

  /** Opens the hidden file input via a programmatic click. */
  private _openFilePicker(): void {
    if (this.disabled) return;
    this.shadowRoot?.querySelector<HTMLInputElement>('input[type="file"]')?.click();
  }

  /**
   * Handles change event on the hidden file input.
   * @param e - The input change event.
   */
  private _handleInputChange(e: Event): void {
    const input = e.target as HTMLInputElement;
    this._processFiles(input.files);
  }

  /**
   * Handles dragenter to activate the drop zone highlight.
   * @param e - The drag event.
   */
  private _handleDragEnter(e: DragEvent): void {
    e.preventDefault();
    this._dragActive = true;
  }

  /**
   * Handles dragover to allow drop.
   * @param e - The drag event.
   */
  private _handleDragOver(e: DragEvent): void {
    e.preventDefault();
    this._dragActive = true;
  }

  /**
   * Handles dragleave to deactivate the drop zone highlight.
   */
  private _handleDragLeave(): void {
    this._dragActive = false;
  }

  /**
   * Handles drop to process the dropped files.
   * @param e - The drag event.
   */
  private _handleDrop(e: DragEvent): void {
    e.preventDefault();
    this._dragActive = false;
    this._processFiles(e.dataTransfer?.files ?? null);
  }

  /**
   * Handles keydown on the drop zone for keyboard accessibility.
   * @param e - The keyboard event.
   */
  private _handleKeyDown(e: KeyboardEvent): void {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this._openFilePicker();
    }
  }

  override render(): TemplateResult {
    const fileNames = this._files
      ? Array.from(this._files)
          .map((f: File): string => f.name)
          .join(', ')
      : null;

    return html`
      <div
        class="dropzone ${this._dragActive ? 'active' : ''}"
        part="dropzone"
        role="button"
        tabindex="${this.disabled ? '-1' : '0'}"
        aria-label="${this.label}"
        aria-disabled="${this.disabled ? 'true' : 'false'}"
        @click="${this._openFilePicker}"
        @keydown="${this._handleKeyDown}"
        @dragenter="${this._handleDragEnter}"
        @dragover="${this._handleDragOver}"
        @dragleave="${this._handleDragLeave}"
        @drop="${this._handleDrop}"
      >
        <span
          class="label"
          part="label"
          >${this.label}</span
        >
        <span
          class="hint"
          part="hint"
          >${this.dragLabel}</span
        >
        ${fileNames ? html`<span class="file-list">${fileNames}</span>` : ''}
      </div>
      <input
        class="visually-hidden"
        type="file"
        tabindex="-1"
        aria-hidden="true"
        ?multiple="${this.multiple}"
        accept="${this.accept}"
        ?disabled="${this.disabled}"
        @change="${this._handleInputChange}"
      />
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mu-file-upload': MuFileUpload;
  }
}
