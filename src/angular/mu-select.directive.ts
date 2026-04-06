import {Directive, ElementRef, HostListener, forwardRef, inject} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import type {MuSelect, SelectValue} from '../select/mu-select.js';

/**
 * Angular `ControlValueAccessor` directive for `<mu-select>`.
 * Bridges the element's `value` property and `change` event to Angular's
 * reactive forms API. The element does not dispatch `input` events, so this
 * directive is needed in place of `[ngDefaultControl]`.
 * @example
 * ```html
 * <mu-select [formControl]="countryCtrl" label="Country" [options]="countries"></mu-select>
 * ```
 */
@Directive({
  selector: 'mu-select[formControlName], mu-select[formControl], mu-select[ngModel]',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef((): typeof MuSelectControlDirective => MuSelectControlDirective),
      multi: true,
    },
  ],
})
export class MuSelectControlDirective implements ControlValueAccessor {
  private readonly _el = inject<ElementRef<MuSelect>>(ElementRef);

  /** Registered onChange callback provided by Angular forms. */
  private _onChange: (value: SelectValue) => void = (): void => {
    /* no-op until Angular registers a handler */
  };

  /** Registered onTouched callback provided by Angular forms. */
  private _onTouched: () => void = (): void => {
    /* no-op until Angular registers a handler */
  };

  /**
   * Handles the host `change` event, forwarding the current `value` to the
   * registered `onChange` callback.
   */
  @HostListener('change')
  _handleChange(): void {
    this._onChange(this._el.nativeElement.value);
    this._onTouched();
  }

  /**
   * Writes a new value to the element.
   * @param value - The string or string-array value to assign.
   */
  writeValue(value: SelectValue): void {
    this._el.nativeElement.value = value ?? '';
  }

  /**
   * Registers the Angular-provided `onChange` callback.
   * @param fn - The callback to invoke when the selected value changes.
   */
  registerOnChange(fn: (value: SelectValue) => void): void {
    this._onChange = fn;
  }

  /**
   * Registers the Angular-provided `onTouched` callback.
   * @param fn - The callback to invoke when the control is touched.
   */
  registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  /**
   * Enables or disables the underlying element.
   * @param isDisabled - Whether the element should be disabled.
   */
  setDisabledState(isDisabled: boolean): void {
    this._el.nativeElement.disabled = isDisabled;
  }
}
