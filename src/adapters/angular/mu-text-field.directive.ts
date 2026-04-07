import {
  Directive,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  forwardRef,
  inject,
} from '@angular/core';
import {
  AbstractControl,
  ControlContainer,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import type {MuTextField} from '../../core/components/text-field/mu-text-field.js';

/**
 * Angular `ControlValueAccessor` directive for `<mu-text-field>`.
 * Bridges the element's `value` property and `input` / `blur` events to
 * Angular's reactive forms API, enabling use with `formControl`,
 * `formControlName`, and `ngModel`.
 *
 * In addition to the standard CVA contract, this directive uses
 * `ControlContainer` to subscribe to the associated `AbstractControl`'s
 * `statusChanges` observable. When the control becomes `touched` and
 * `invalid`, the element's `error` property is set to the first validation
 * error value; it is cleared when the control is valid or untouched.
 * @example
 * ```html
 * <mu-text-field [formControl]="nameCtrl" label="Name"></mu-text-field>
 * ```
 */
@Directive({
  selector: 'mu-text-field[formControlName], mu-text-field[formControl], mu-text-field[ngModel]',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(
        (): typeof MuTextFieldControlDirective => MuTextFieldControlDirective
      ),
      multi: true,
    },
  ],
})
export class MuTextFieldControlDirective implements ControlValueAccessor, OnInit, OnDestroy {
  private readonly _el = inject<ElementRef<MuTextField>>(ElementRef);
  private readonly _controlContainer = inject(ControlContainer, {optional: true});

  /** The bound `AbstractControl` resolved from the parent `ControlContainer`. */
  private _control: AbstractControl | null = null;

  /** Subscription handle returned by `statusChanges.subscribe`. */
  private _statusSub: {unsubscribe(): void} | null = null;

  /** Registered onChange callback provided by Angular forms. */
  private _onChange: (value: string) => void = (): void => {
    /* no-op until Angular registers a handler */
  };

  /** Registered onTouched callback provided by Angular forms. */
  private _onTouched: () => void = (): void => {
    /* no-op until Angular registers a handler */
  };

  /**
   * Subscribes to the associated `AbstractControl`'s `statusChanges` when the
   * host element carries a `formcontrolname` attribute and a parent
   * `ControlContainer` is available. Triggers error-state synchronisation on
   * every status update.
   */
  ngOnInit(): void {
    const formControlName = this._el.nativeElement.getAttribute('formcontrolname');
    if (this._controlContainer?.control && formControlName) {
      this._control = this._controlContainer.control.get(formControlName);
      this._statusSub =
        this._control?.statusChanges?.subscribe((): void => {
          this._syncErrorState();
        }) ?? null;
    }
  }

  /**
   * Cancels the `statusChanges` subscription to prevent memory leaks when the
   * directive is destroyed.
   */
  ngOnDestroy(): void {
    this._statusSub?.unsubscribe();
  }

  /**
   * Synchronises the element's `error` property from the bound
   * `AbstractControl`. Sets `error` to the first validation-error value when
   * the control is both `touched` and `invalid`; clears it otherwise.
   */
  private _syncErrorState(): void {
    if (!this._control) {
      return;
    }
    const errors = this._control.errors;
    if (this._control.touched && this._control.invalid && errors) {
      this._el.nativeElement.error = String(Object.values(errors)[0]);
    } else {
      this._el.nativeElement.error = '';
    }
  }

  /**
   * Handles the host `input` event, forwarding the current `value` to the
   * registered `onChange` callback.
   */
  @HostListener('input')
  _handleInput(): void {
    this._onChange(this._el.nativeElement.value);
  }

  /**
   * Handles the host `blur` event, invoking the registered `onTouched`
   * callback to mark the control as touched.
   */
  @HostListener('blur')
  _handleBlur(): void {
    this._onTouched();
  }

  /**
   * Writes a new value to the element.
   * @param value - The string value to assign to the text field.
   */
  writeValue(value: string): void {
    this._el.nativeElement.value = value ?? '';
  }

  /**
   * Registers the Angular-provided `onChange` callback.
   * @param fn - The callback to invoke when the text field value changes.
   */
  registerOnChange(fn: (value: string) => void): void {
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
