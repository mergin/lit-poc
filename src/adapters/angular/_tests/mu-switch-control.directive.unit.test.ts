import {beforeEach, describe, expect, it, vi} from 'vitest';

// Stubs Angular's DI and decorator infrastructure so the directive can be
// instantiated in a plain JS environment, keeping its CVA logic fully intact.
vi.mock('@angular/core', () => ({
  Directive: () => (): void => {},
  ElementRef: class MockElementRef {},
  HostListener: () => (): void => {},
  forwardRef: (fn: unknown): unknown => fn,
  inject: vi.fn(),
}));

vi.mock('@angular/forms', () => ({
  NG_VALUE_ACCESSOR: Symbol('NG_VALUE_ACCESSOR'),
  ControlValueAccessor: class {},
}));

import {inject} from '@angular/core';
import '../../../core/components/switch/mu-switch.js';
import type {MuSwitch} from '../../../core/components/switch/mu-switch.js';
import {MuSwitchControlDirective} from '../mu-switch.directive.js';

const mockInject = inject as unknown as ReturnType<typeof vi.fn>;

describe('MuSwitchControlDirective — unit', (): void => {
  let element: MuSwitch;
  let directive: MuSwitchControlDirective;

  beforeEach((): void => {
    // ARRANGE
    element = document.createElement('mu-switch') as MuSwitch;
    mockInject.mockReturnValue({nativeElement: element});
    directive = new MuSwitchControlDirective();
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
