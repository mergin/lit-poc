import {describe, it, expect, beforeEach} from 'vitest';
import {MuDialog} from '../mu-dialog.js';

describe('MuDialog — unit', (): void => {
  let el: MuDialog;

  beforeEach((): void => {
    // ARRANGE
    el = new MuDialog();
  });

  it('is an instance of MuDialog', (): void => {
    // ARRANGE — done in beforeEach

    // ACT
    const instance = document.createElement('mu-dialog');

    // ASSERT
    expect(instance).toBeInstanceOf(MuDialog);

    // CLEANUP — none
  });

  it('defaults open to false', (): void => {
    // ARRANGE — done in beforeEach

    // ACT — none

    // ASSERT
    expect(el.open).toBe(false);

    // CLEANUP — none
  });

  it('defaults headline to empty string', (): void => {
    // ARRANGE — done in beforeEach

    // ACT — none

    // ASSERT
    expect(el.headline).toBe('');

    // CLEANUP — none
  });

  it('accepts open property', (): void => {
    // ARRANGE — done in beforeEach

    // ACT
    el.open = true;

    // ASSERT
    expect(el.open).toBe(true);

    // CLEANUP — none
  });

  it('accepts headline property', (): void => {
    // ARRANGE — done in beforeEach

    // ACT
    el.headline = 'Confirm deletion';

    // ASSERT
    expect(el.headline).toBe('Confirm deletion');

    // CLEANUP — none
  });
});
