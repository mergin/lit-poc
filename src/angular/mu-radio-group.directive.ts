import {Directive, ElementRef, HostListener, forwardRef, inject} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import type {MuRadio} from '../radio/mu-radio.js';

/**
 * Angular `ControlValueAccessor` directive for `<mu-radio-group>`.
 * `mu-radio-group` has no own `value` property or `change` event.
 * Individual `<mu-radio>` children dispatch `change` events with `bubbles: true, composed: true`
 * that propagate to the group host. This directive intercepts those bubbled events
 * and delegates to Angular's reactive forms API. `writeValue` defers via `queueMicrotask`
 * so that projected `<mu-radio>` children are available in the DOM before the sync runs.
 * @example
 * ```html
 * <mu-radio-group [formControl]="colorCtrl" name="color">
 *   <mu-radio value="red" label="Red"></mu-radio>
 *   <mu-radio value="blue" label="Blue"></mu-radio>
 * </mu-radio-group>
 * ```
 */
@Directive({
  selector: 'mu-radio-group[formControlName], mu-radio-group[formControl], mu-radio-group[ngModel]',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(
        (): typeof MuRadioGroupControlDirective => MuRadioGroupControlDirective
      ),
      multi: true,
    },
  ],
})
export class MuRadioGroupControlDirective implements ControlValueAccessor {
  private readonly _el = inject<ElementRef<HTMLElement>>(ElementRef);

  // Currently selected value, tracked for deferred DOM writes.
  private _value = '';

  /** Registered onChange callback provided by Angular forms. */
  private _onChange: (value: string) => void = (): void => {
    /* no-op until Angular registers a handler */
  };

  /** Registered onTouched callback provided by Angular forms. */
  private _onTouched: () => void = (): void => {
    /* no-op until Angular registers a handler */
  };

  /**
   * Handles `change` events bubbled from child `<mu-radio>` elements.
   * Only processes events from a `mu-radio` target whose `checked` state is
   * `true` (prevents the deselection event from clobbering the model value).
   * @param event - The DOM event bubbled from a child `mu-radio`.
   */
  @HostListener('change', ['$event'])
  _handleChange(event: Event): void {
    const target = event.target as MuRadio & EventTarget;
    if (
      target instanceof Element &&
      target.tagName.toLowerCase() === 'mu-radio' &&
      (target as MuRadio).checked
    ) {
      this._value = (target as MuRadio).value;
      this._onChange(this._value);
      this._onTouched();
    }
  }

  /**
   * Writes a new value to the group by updating `checked` on child `<mu-radio>`
   * elements whose `value` matches. Uses `queueMicrotask` to defer DOM access
   * until after the current rendering cycle, ensuring projected children are available.
   * @param value - The radio `value` to select.
   */
  writeValue(value: string): void {
    this._value = value ?? '';
    queueMicrotask((): void => {
      this._syncRadios();
    });
  }

  /**
   * Registers the Angular-provided `onChange` callback.
   * @param fn - The callback to invoke when the selected radio changes.
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
   * Enables or disables all child `<mu-radio>` elements.
   * @param isDisabled - Whether the entire group should be disabled.
   */
  setDisabledState(isDisabled: boolean): void {
    const radios = Array.from(this._el.nativeElement.querySelectorAll<MuRadio>('mu-radio'));
    radios.forEach((radio): void => {
      radio.disabled = isDisabled;
    });
  }

  /**
   * Synchronises the `checked` state of all child `<mu-radio>` elements with
   * the current `_value`.
   */
  private _syncRadios(): void {
    const radios = Array.from(this._el.nativeElement.querySelectorAll<MuRadio>('mu-radio'));
    radios.forEach((radio): void => {
      radio.checked = radio.value === this._value;
    });
  }
}
