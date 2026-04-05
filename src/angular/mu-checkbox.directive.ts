import {Directive, ElementRef, HostListener, forwardRef, inject} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import type {MuCheckbox} from '../checkbox/mu-checkbox.js';

/**
 * Angular `ControlValueAccessor` directive for `<mu-checkbox>`.
 * Apply to any `mu-checkbox` that participates in a reactive form or `ngModel`.
 * Maps the element's boolean `checked` property to Angular's form control value.
 * @example
 * ```html
 * <mu-checkbox muCheckboxControl [formControl]="agreedCtrl" label="I agree"></mu-checkbox>
 * ```
 */
@Directive({
  selector: 'mu-checkbox[formControlName], mu-checkbox[formControl], mu-checkbox[ngModel]',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef((): typeof MuCheckboxControlDirective => MuCheckboxControlDirective),
      multi: true,
    },
  ],
})
export class MuCheckboxControlDirective implements ControlValueAccessor {
  private readonly _el = inject<ElementRef<MuCheckbox>>(ElementRef);

  /** Registered onChange callback provided by Angular forms. */
  private _onChange: (value: boolean) => void = (): void => {
    /* no-op until Angular registers a handler */
  };

  /** Registered onTouched callback provided by Angular forms. */
  private _onTouched: () => void = (): void => {
    /* no-op until Angular registers a handler */
  };

  /**
   * Handles the host `change` event, forwarding the boolean `checked` state
   * to the registered `onChange` callback.
   */
  @HostListener('change')
  _handleChange(): void {
    this._onChange(this._el.nativeElement.checked);
    this._onTouched();
  }

  /**
   * Writes a new value to the element.
   * @param value - The boolean value to assign to `checked`.
   */
  writeValue(value: boolean): void {
    this._el.nativeElement.checked = Boolean(value);
  }

  /**
   * Registers the Angular-provided `onChange` callback.
   * @param fn - The callback to invoke when the value changes.
   */
  registerOnChange(fn: (value: boolean) => void): void {
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
