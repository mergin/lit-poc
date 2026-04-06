import {describe, it, expect, beforeEach} from 'vitest';
import {MuTextField} from '../mu-text-field.js';

describe('MuTextField — unit', (): void => {
  let el: MuTextField;

  beforeEach((): void => {
    // ARRANGE
    el = new MuTextField();
  });

  it('is an instance of MuTextField', (): void => {
    // ARRANGE — done in beforeEach

    // ACT
    const instance = document.createElement('mu-text-field');

    // ASSERT
    expect(instance).toBeInstanceOf(MuTextField);

    // CLEANUP — none
  });

  it('defaults: empty value, label, placeholder', (): void => {
    // ARRANGE — done in beforeEach

    // ACT — none

    // ASSERT
    expect(el.value).toBe('');
    expect(el.label).toBe('');
    expect(el.placeholder).toBe('');

    // CLEANUP — none
  });

  it('defaults type to "text"', (): void => {
    // ARRANGE — done in beforeEach

    // ACT — none

    // ASSERT
    expect(el.type).toBe('text');

    // CLEANUP — none
  });

  it('defaults: not disabled, not readonly, not required', (): void => {
    // ARRANGE — done in beforeEach

    // ACT — none

    // ASSERT
    expect(el.disabled).toBe(false);
    expect(el.readonly).toBe(false);
    expect(el.required).toBe(false);

    // CLEANUP — none
  });

  it('defaults error and helperText to empty string', (): void => {
    // ARRANGE — done in beforeEach

    // ACT — none

    // ASSERT
    expect(el.error).toBe('');
    expect(el.helperText).toBe('');

    // CLEANUP — none
  });

  it('accepts all public properties', (): void => {
    // ARRANGE — done in beforeEach

    // ACT
    el.value = 'hello';
    el.label = 'Name';
    el.placeholder = 'Enter name';
    el.type = 'email';
    el.disabled = true;
    el.required = true;
    el.error = 'Required';
    el.helperText = 'Your full name';

    // ASSERT
    expect(el.value).toBe('hello');
    expect(el.label).toBe('Name');
    expect(el.placeholder).toBe('Enter name');
    expect(el.type).toBe('email');
    expect(el.disabled).toBe(true);
    expect(el.required).toBe(true);
    expect(el.error).toBe('Required');
    expect(el.helperText).toBe('Your full name');

    // CLEANUP — none
  });

  it('defaults: multiline is false, rows is 3, maxlength is Infinity, showCharCount is false', (): void => {
    // ARRANGE — done in beforeEach

    // ACT — none

    // ASSERT
    expect(el.multiline).toBe(false);
    expect(el.rows).toBe(3);
    expect(el.maxlength).toBe(Infinity);
    expect(el.showCharCount).toBe(false);

    // CLEANUP — none
  });

  it('accepts multiline, rows, maxlength, showCharCount', (): void => {
    // ARRANGE — done in beforeEach

    // ACT
    el.multiline = true;
    el.rows = 5;
    el.maxlength = 200;
    el.showCharCount = true;

    // ASSERT
    expect(el.multiline).toBe(true);
    expect(el.rows).toBe(5);
    expect(el.maxlength).toBe(200);
    expect(el.showCharCount).toBe(true);

    // CLEANUP — none
  });
});
