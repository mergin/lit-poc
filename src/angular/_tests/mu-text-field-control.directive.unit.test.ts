import {beforeEach, describe, expect, it, vi} from 'vitest';

// Stubs Angular's DI and decorator infrastructure so the directive class can be
// instantiated in a plain JS environment, while keeping its CVA logic intact.
vi.mock('@angular/core', () => ({
  Directive: () => (): void => {},
  ElementRef: class MockElementRef {},
  HostListener: () => (): void => {},
  OnInit: () => (): void => {},
  OnDestroy: () => (): void => {},
  forwardRef: (fn) => fn,
  inject: vi.fn(),
}));

vi.mock('@angular/forms', () => ({
  NG_VALUE_ACCESSOR: Symbol('NG_VALUE_ACCESSOR'),
  ControlValueAccessor: class {},
  ControlContainer: class MockControlContainer {},
  AbstractControl: class MockAbstractControl {},
}));

import {inject} from '@angular/core';
import '../../text-field/mu-text-field.js';
import type {MuTextField} from '../../text-field/mu-text-field.js';
import {MuTextFieldControlDirective} from '../mu-text-field.directive.js';

describe('MuTextFieldControlDirective — unit', (): void => {
  let element: MuTextField;
  let directive: MuTextFieldControlDirective;

  beforeEach((): void => {
    // ARRANGE
    element = document.createElement('mu-text-field') as MuTextField;
    // The directive calls inject() twice at construction time:
    //   1st → ElementRef<MuTextField>
    //   2nd → ControlContainer (optional, null in isolated tests)
    vi.mocked(inject).mockReturnValueOnce({nativeElement: element}).mockReturnValueOnce(null);
    directive = new MuTextFieldControlDirective();
  });

  it('writeValue sets element.value', (): void => {
    // ARRANGE — done in beforeEach
    // ACT
    directive.writeValue('hello');
    // ASSERT
    expect(element.value).toBe('hello');
    // CLEANUP — none
  });

  it('writeValue with empty string sets element.value to empty string', (): void => {
    // ARRANGE
    element.value = 'existing';
    // ACT
    directive.writeValue('');
    // ASSERT
    expect(element.value).toBe('');
    // CLEANUP — none
  });

  it('writeValue(null) coerces to empty string', (): void => {
    // ARRANGE
    element.value = 'existing';
    // ACT
    directive.writeValue(null as unknown as string);
    // ASSERT
    expect(element.value).toBe('');
    // CLEANUP — none
  });

  it('_handleInput calls the registered onChange with element.value', (): void => {
    // ARRANGE
    const onChange = vi.fn();
    directive.registerOnChange(onChange);
    element.value = 'typed text';
    // ACT
    directive._handleInput();
    // ASSERT
    expect(onChange).toHaveBeenCalledOnce();
    expect(onChange).toHaveBeenCalledWith('typed text');
    // CLEANUP — none
  });

  it('_handleInput reports latest element.value on each call', (): void => {
    // ARRANGE
    const onChange = vi.fn();
    directive.registerOnChange(onChange);
    element.value = 'first';
    directive._handleInput();
    element.value = 'second';
    // ACT
    directive._handleInput();
    // ASSERT
    expect(onChange).toHaveBeenCalledTimes(2);
    expect(onChange).toHaveBeenLastCalledWith('second');
    // CLEANUP — none
  });

  it('_handleBlur calls the registered onTouched', (): void => {
    // ARRANGE
    const onTouched = vi.fn();
    directive.registerOnTouched(onTouched);
    // ACT
    directive._handleBlur();
    // ASSERT
    expect(onTouched).toHaveBeenCalledOnce();
    // CLEANUP — none
  });

  it('_handleInput does not call onTouched', (): void => {
    // ARRANGE
    const onTouched = vi.fn();
    directive.registerOnTouched(onTouched);
    // ACT
    directive._handleInput();
    // ASSERT
    expect(onTouched).not.toHaveBeenCalled();
    // CLEANUP — none
  });

  it('setDisabledState(true) disables the element', (): void => {
    // ARRANGE — done in beforeEach
    // ACT
    directive.setDisabledState(true);
    // ASSERT
    expect(element.disabled).toBe(true);
    // CLEANUP — none
  });

  it('setDisabledState(false) re-enables the element', (): void => {
    // ARRANGE
    element.disabled = true;
    // ACT
    directive.setDisabledState(false);
    // ASSERT
    expect(element.disabled).toBe(false);
    // CLEANUP — none
  });

  it('does not call onChange when writeValue is called (Angular contract)', (): void => {
    // ARRANGE
    const onChange = vi.fn();
    directive.registerOnChange(onChange);
    // ACT
    directive.writeValue('programmatic');
    // ASSERT
    expect(onChange).not.toHaveBeenCalled();
    // CLEANUP — none
  });

  it('ngOnInit does nothing when ControlContainer is not available', (): void => {
    // ARRANGE — _controlContainer is null (no inject mock needed, already constructed)
    // ACT
    directive.ngOnInit();
    // ASSERT — no error thrown, error property stays empty
    expect(element.error).toBe('');
    // CLEANUP — none
  });

  it('ngOnInit subscribes to statusChanges when formcontrolname is set', (): void => {
    // ARRANGE
    let statusListener: (() => void) | null = null;
    const mockStatusChanges = {
      subscribe: (fn: () => void) => {
        statusListener = fn;
        return {unsubscribe: vi.fn()};
      },
    };
    const mockControl = {
      touched: false,
      invalid: false,
      errors: null,
      statusChanges: mockStatusChanges,
    };
    const mockContainer = {control: {get: vi.fn().mockReturnValue(mockControl)}};

    vi.mocked(inject)
      .mockReturnValueOnce({nativeElement: element})
      .mockReturnValueOnce(mockContainer);
    const d = new MuTextFieldControlDirective();
    element.setAttribute('formcontrolname', 'email');
    // ACT
    d.ngOnInit();
    // ASSERT
    expect(mockContainer.control.get).toHaveBeenCalledWith('email');
    expect(statusListener).not.toBeNull();
    // CLEANUP — none
  });

  it('_syncErrorState sets error when control is touched and invalid', (): void => {
    // ARRANGE
    let statusListener: (() => void) | null = null;
    const mockStatusChanges = {
      subscribe: (fn: () => void) => {
        statusListener = fn;
        return {unsubscribe: vi.fn()};
      },
    };
    const mockControl = {
      touched: true,
      invalid: true,
      errors: {required: true},
      statusChanges: mockStatusChanges,
    };
    const mockContainer = {control: {get: vi.fn().mockReturnValue(mockControl)}};

    vi.mocked(inject)
      .mockReturnValueOnce({nativeElement: element})
      .mockReturnValueOnce(mockContainer);
    const d = new MuTextFieldControlDirective();
    element.setAttribute('formcontrolname', 'email');
    d.ngOnInit();
    // ACT — simulate Angular emitting a status change
    statusListener!();
    // ASSERT
    expect(element.error).toBe('true');
    // CLEANUP — none
  });

  it('_syncErrorState clears error when control becomes valid', (): void => {
    // ARRANGE
    let statusListener: (() => void) | null = null;
    const mockStatusChanges = {
      subscribe: (fn: () => void) => {
        statusListener = fn;
        return {unsubscribe: vi.fn()};
      },
    };
    const mockControl = {
      touched: true,
      invalid: false,
      errors: null,
      statusChanges: mockStatusChanges,
    };
    const mockContainer = {control: {get: vi.fn().mockReturnValue(mockControl)}};

    vi.mocked(inject)
      .mockReturnValueOnce({nativeElement: element})
      .mockReturnValueOnce(mockContainer);
    const d = new MuTextFieldControlDirective();
    element.setAttribute('formcontrolname', 'email');
    element.error = 'previous error';
    d.ngOnInit();
    // ACT
    statusListener!();
    // ASSERT
    expect(element.error).toBe('');
    // CLEANUP — none
  });

  it('ngOnDestroy unsubscribes statusChanges subscription', (): void => {
    // ARRANGE
    const unsubscribeSpy = vi.fn();
    const mockStatusChanges = {
      subscribe: (_fn: () => void) => ({unsubscribe: unsubscribeSpy}),
    };
    const mockControl = {
      touched: false,
      invalid: false,
      errors: null,
      statusChanges: mockStatusChanges,
    };
    const mockContainer = {control: {get: vi.fn().mockReturnValue(mockControl)}};
    vi.mocked(inject)
      .mockReturnValueOnce({nativeElement: element})
      .mockReturnValueOnce(mockContainer);
    const d = new MuTextFieldControlDirective();
    element.setAttribute('formcontrolname', 'email');
    d.ngOnInit();
    // ACT
    d.ngOnDestroy();
    // ASSERT
    expect(unsubscribeSpy).toHaveBeenCalledOnce();
    // CLEANUP — none
  });

  it('ngOnDestroy is safe to call when no subscription exists', (): void => {
    // ARRANGE — directive constructed without a ControlContainer (null)
    // ACT / ASSERT — should not throw
    expect(() => directive.ngOnDestroy()).not.toThrow();
    // CLEANUP — none
  });
});
