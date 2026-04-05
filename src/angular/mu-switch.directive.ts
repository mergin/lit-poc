import {Directive, ElementRef, HostListener, forwardRef, inject} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import type {MuSwitch} from '../switch/mu-switch.js';

/**
 * Angular `ControlValueAccessor` directive for `<mu-switch>`.
 * Maps the element's boolean `checked` property to Angular's form control value.
 * @example
 * ```html
 * <mu-switch [formControl]="darkModeCtrl" label="Dark mode"></mu-switch>
 * ```
 */
@Directive({
  selector: 'mu-switch[formControlName], mu-switch[formControl], mu-switch[ngModel]',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef((): typeof MuSwitchControlDirective => MuSwitchControlDirective),
      multi: true,
    },
  ],
})
export class MuSwitchControlDirective implements ControlValueAccessor {
  private readonly _el = inject<ElementRef<MuSwitch>>(ElementRef);

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
