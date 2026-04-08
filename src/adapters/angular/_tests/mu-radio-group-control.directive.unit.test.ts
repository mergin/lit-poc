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
import '../../../core/components/radio/mu-radio.js';
import '../../../core/components/radio/mu-radio-group.js';
import type {MuRadio} from '../../../core/components/radio/mu-radio.js';
import {MuRadioGroupControlDirective} from '../mu-radio-group.directive.js';

const mockInject = inject as unknown as ReturnType<typeof vi.fn>;

/**
 * Creates a mu-radio element with preset value and checked state and appends it
 * to the given host.
 * @param host - The parent element to append the radio to.
 * @param value - The value attribute for the radio.
 * @param checked - Whether the radio should start checked.
 * @returns The created MuRadio element.
 */
function appendRadio(host: HTMLElement, value: string, checked = false): MuRadio {
  const radio = document.createElement('mu-radio') as MuRadio;
  radio.value = value;
  radio.checked = checked;
  host.appendChild(radio);
  return radio;
}

/**
 * Builds a synthetic bubbled change event whose immutable target points to the
 * supplied element, mirroring a real browser event dispatched from a mu-radio.
 * @param target - The element to use as the event target.
 * @returns A synthetic change Event.
 */
function makeChangeEvent(target: Element): Event {
  const event = new Event('change', {bubbles: true, composed: true});
  Object.defineProperty(event, 'target', {value: target, configurable: true});
  return event;
}

describe('MuRadioGroupControlDirective — unit', (): void => {
  let host: HTMLElement;
  let directive: MuRadioGroupControlDirective;

  beforeEach((): void => {
    // ARRANGE
    host = document.createElement('mu-radio-group');
    mockInject.mockReturnValue({nativeElement: host});
    directive = new MuRadioGroupControlDirective();
  });

  it('writeValue checks the matching child radio after microtask flush', async (): Promise<void> => {
    // ARRANGE
    const red = appendRadio(host, 'red');
    const blue = appendRadio(host, 'blue');
    // ACT
    directive.writeValue('blue');
    await new Promise<void>((resolve) => queueMicrotask(resolve));
    // ASSERT
    expect(red.checked).toBe(false);
    expect(blue.checked).toBe(true);
    // CLEANUP — none
  });

  it('writeValue unchecks all radios when value does not match any option', async (): Promise<void> => {
    // ARRANGE
    const red = appendRadio(host, 'red', true);
    const blue = appendRadio(host, 'blue');
    // ACT
    directive.writeValue('green');
    await new Promise<void>((resolve) => queueMicrotask(resolve));
    // ASSERT
    expect(red.checked).toBe(false);
    expect(blue.checked).toBe(false);
    // CLEANUP — none
  });

  it('writeValue(null) unchecks all radios', async (): Promise<void> => {
    // ARRANGE
    const red = appendRadio(host, 'red', true);
    // ACT
    directive.writeValue(null as unknown as string);
    await new Promise<void>((resolve) => queueMicrotask(resolve));
    // ASSERT
    expect(red.checked).toBe(false);
    // CLEANUP — none
  });

  it('_handleChange calls onChange with the value of the checked mu-radio', (): void => {
    // ARRANGE
    const onChange = vi.fn();
    directive.registerOnChange(onChange);
    const radio = appendRadio(host, 'red', true);
    const event = makeChangeEvent(radio);
    // ACT
    directive._handleChange(event);
    // ASSERT
    expect(onChange).toHaveBeenCalledOnce();
    expect(onChange).toHaveBeenCalledWith('red');
    // CLEANUP — none
  });

  it('_handleChange calls onTouched when a checked radio dispatches change', (): void => {
    // ARRANGE
    const onTouched = vi.fn();
    directive.registerOnTouched(onTouched);
    const radio = appendRadio(host, 'blue', true);
    const event = makeChangeEvent(radio);
    // ACT
    directive._handleChange(event);
    // ASSERT
    expect(onTouched).toHaveBeenCalledOnce();
    // CLEANUP — none
  });

  it('_handleChange ignores change events from an unchecked mu-radio (deselection guard)', (): void => {
    // ARRANGE
    const onChange = vi.fn();
    directive.registerOnChange(onChange);
    const radio = appendRadio(host, 'red', false);
    const event = makeChangeEvent(radio);
    // ACT
    directive._handleChange(event);
    // ASSERT
    expect(onChange).not.toHaveBeenCalled();
    // CLEANUP — none
  });

  it('_handleChange ignores change events from non-radio elements', (): void => {
    // ARRANGE
    const onChange = vi.fn();
    directive.registerOnChange(onChange);
    const button = document.createElement('button');
    const event = makeChangeEvent(button);
    // ACT
    directive._handleChange(event);
    // ASSERT
    expect(onChange).not.toHaveBeenCalled();
    // CLEANUP — none
  });

  it('setDisabledState(true) disables all child mu-radio elements', (): void => {
    // ARRANGE
    const red = appendRadio(host, 'red');
    const blue = appendRadio(host, 'blue');
    // ACT
    directive.setDisabledState(true);
    // ASSERT
    expect(red.disabled).toBe(true);
    expect(blue.disabled).toBe(true);
    // CLEANUP — none
  });

  it('setDisabledState(false) re-enables all child mu-radio elements', (): void => {
    // ARRANGE
    const red = appendRadio(host, 'red');
    const blue = appendRadio(host, 'blue');
    red.disabled = true;
    blue.disabled = true;
    // ACT
    directive.setDisabledState(false);
    // ASSERT
    expect(red.disabled).toBe(false);
    expect(blue.disabled).toBe(false);
    // CLEANUP — none
  });

  it('does not call onChange when writeValue is called (Angular contract)', async (): Promise<void> => {
    // ARRANGE
    const onChange = vi.fn();
    directive.registerOnChange(onChange);
    appendRadio(host, 'red');
    // ACT
    directive.writeValue('red');
    await new Promise<void>((resolve) => queueMicrotask(resolve));
    // ASSERT
    expect(onChange).not.toHaveBeenCalled();
    // CLEANUP — none
  });
});
