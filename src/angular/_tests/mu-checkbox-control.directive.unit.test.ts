import {beforeEach, describe, expect, it, vi} from 'vitest';

// Stubs Angular's DI and decorator infrastructure so the directive class can be
// instantiated in a plain JS environment, while keeping its CVA logic intact.
vi.mock('@angular/core', () => ({
  Directive: () => (): void => {},
  ElementRef: class MockElementRef {},
  HostListener: () => (): void => {},
  forwardRef: (fn) => fn,
  inject: vi.fn(),
}));

vi.mock('@angular/forms', () => ({
  NG_VALUE_ACCESSOR: Symbol('NG_VALUE_ACCESSOR'),
  ControlValueAccessor: class {},
}));

import {inject} from '@angular/core';
import '../../checkbox/mu-checkbox.js';
import type {MuCheckbox} from '../../checkbox/mu-checkbox.js';
import {MuCheckboxControlDirective} from '../mu-checkbox.directive.js';

describe('MuCheckboxControlDirective — unit', (): void => {
  let element: MuCheckbox;
  let directive: MuCheckboxControlDirective;

  beforeEach((): void => {
    // ARRANGE
    element = document.createElement('mu-checkbox') as MuCheckbox;
    vi.mocked(inject).mockReturnValue({nativeElement: element});
    directive = new MuCheckboxControlDirective();
  });

  it('writeValue(true) sets element.checked to true', (): void => {
    // ARRANGE — done in beforeEach
    // ACT
    directive.writeValue(true);
    // ASSERT
    expect(element.checked).toBe(true);
    // CLEANUP — none
  });

  it('writeValue(false) sets element.checked to false', (): void => {
    // ARRANGE
    element.checked = true;
    // ACT
    directive.writeValue(false);
    // ASSERT
    expect(element.checked).toBe(false);
    // CLEANUP — none
  });

  it('writeValue(null) coerces to false', (): void => {
    // ARRANGE
    element.checked = true;
    // ACT
    directive.writeValue(null as unknown as boolean);
    // ASSERT
    expect(element.checked).toBe(false);
    // CLEANUP — none
  });

  it('_handleChange calls the registered onChange with element.checked', (): void => {
    // ARRANGE
    const onChange = vi.fn();
    directive.registerOnChange(onChange);
    element.checked = true;
    // ACT
    directive._handleChange();
    // ASSERT
    expect(onChange).toHaveBeenCalledOnce();
    expect(onChange).toHaveBeenCalledWith(true);
    // CLEANUP — none
  });

  it('_handleChange reports false when element is unchecked', (): void => {
    // ARRANGE
    const onChange = vi.fn();
    directive.registerOnChange(onChange);
    element.checked = false;
    // ACT
    directive._handleChange();
    // ASSERT
    expect(onChange).toHaveBeenCalledWith(false);
    // CLEANUP — none
  });

  it('_handleChange calls the registered onTouched', (): void => {
    // ARRANGE
    const onTouched = vi.fn();
    directive.registerOnTouched(onTouched);
    // ACT
    directive._handleChange();
    // ASSERT
    expect(onTouched).toHaveBeenCalledOnce();
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
    directive.writeValue(true);
    // ASSERT
    expect(onChange).not.toHaveBeenCalled();
    // CLEANUP — none
  });
});
