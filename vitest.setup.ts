import '@webcomponents/webcomponentsjs/webcomponents-loader.js';
import 'lit/polyfill-support.js';

// Shim ElementInternals for happy-dom which does not yet implement attachInternals().
if (typeof HTMLElement !== 'undefined' && !HTMLElement.prototype.attachInternals) {
  HTMLElement.prototype.attachInternals = function (): ElementInternals {
    return {
      setFormValue: (): void => {},
      setValidity: (): void => {},
      checkValidity: (): boolean => true,
      reportValidity: (): boolean => true,
      get validity(): ValidityState {
        return {
          badInput: false,
          customError: false,
          patternMismatch: false,
          rangeOverflow: false,
          rangeUnderflow: false,
          stepMismatch: false,
          tooLong: false,
          tooShort: false,
          typeMismatch: false,
          valid: true,
          valueMissing: false,
        };
      },
      get validationMessage(): string {
        return '';
      },
      get willValidate(): boolean {
        return true;
      },
      get form(): HTMLFormElement | null {
        return null;
      },
      get labels(): NodeList {
        return document.createDocumentFragment().childNodes;
      },
      shadowRoot: null,
      role: null,
      ariaAtomic: null,
      ariaAutoComplete: null,
      ariaBusy: null,
      ariaChecked: null,
      ariaColCount: null,
      ariaColIndex: null,
      ariaColSpan: null,
      ariaCurrent: null,
      ariaDescription: null,
      ariaDisabled: null,
      ariaExpanded: null,
      ariaHasPopup: null,
      ariaHidden: null,
      ariaInvalid: null,
      ariaKeyShortcuts: null,
      ariaLabel: null,
      ariaLevel: null,
      ariaLive: null,
      ariaModal: null,
      ariaMultiLine: null,
      ariaMultiSelectable: null,
      ariaOrientation: null,
      ariaPlaceholder: null,
      ariaPosInSet: null,
      ariaPressed: null,
      ariaReadOnly: null,
      ariaRequired: null,
      ariaRoleDescription: null,
      ariaRowCount: null,
      ariaRowIndex: null,
      ariaRowSpan: null,
      ariaSelected: null,
      ariaSetSize: null,
      ariaSort: null,
      ariaValueMax: null,
      ariaValueMin: null,
      ariaValueNow: null,
      ariaValueText: null,
    } as unknown as ElementInternals;
  };
}
