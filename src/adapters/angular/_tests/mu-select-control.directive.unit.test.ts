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
import '../../../core/components/select/mu-select.js';
import type {MuSelect} from '../../../core/components/select/mu-select.js';
import {MuSelectControlDirective} from '../mu-select.directive.js';

const mockInject = inject as unknown as ReturnType<typeof vi.fn>;

describe('MuSelectControlDirective — unit', (): void => {
  let element: MuSelect;
  let directive: MuSelectControlDirective;

  beforeEach((): void => {
    // ARRANGE
    element = document.createElement('mu-select') as MuSelect;
    mockInject.mockReturnValue({nativeElement: element});
    directive = new MuSelectControlDirective();
  });

  it('writeValue sets element.value', (): void => {
    // ARRANGE — done in beforeEach
    // ACT
    directive.writeValue('uk');
    // ASSERT
    expect(element.value).toBe('uk');
    // CLEANUP — none
  });

  it('writeValue with empty string sets element.value to empty string', (): void => {
    // ARRANGE
    element.value = 'us';
    // ACT
    directive.writeValue('');
    // ASSERT
    expect(element.value).toBe('');
    // CLEANUP — none
  });

  it('writeValue(null) coerces to empty string', (): void => {
    // ARRANGE
    element.value = 'us';
    // ACT
    directive.writeValue(null as unknown as string);
    // ASSERT
    expect(element.value).toBe('');
    // CLEANUP — none
  });

  it('_handleChange calls onChange with current element.value', (): void => {
    // ARRANGE
    const onChange = vi.fn();
    directive.registerOnChange(onChange);
    element.value = 'us';
    // ACT
    directive._handleChange();
    // ASSERT
    expect(onChange).toHaveBeenCalledOnce();
    expect(onChange).toHaveBeenCalledWith('us');
    // CLEANUP — none
  });

  it('_handleChange reports the updated value after element changes', (): void => {
    // ARRANGE
    const onChange = vi.fn();
    directive.registerOnChange(onChange);
    element.value = 'fr';
    // ACT
    directive._handleChange();
    // ASSERT
    expect(onChange).toHaveBeenCalledWith('fr');
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
    directive.writeValue('us');
    // ASSERT
    expect(onChange).not.toHaveBeenCalled();
    // CLEANUP — none
  });
});
