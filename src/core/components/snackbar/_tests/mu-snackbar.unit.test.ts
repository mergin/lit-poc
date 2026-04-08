import {describe, it, expect, beforeEach} from 'vitest';
import {MuSnackbar} from '../mu-snackbar.js';

describe('MuSnackbar — unit', (): void => {
  let el: MuSnackbar;

  beforeEach((): void => {
    // ARRANGE
    el = new MuSnackbar();
  });

  it('is an instance of MuSnackbar', (): void => {
    // ARRANGE — done in beforeEach

    // ACT
    const instance = document.createElement('mu-snackbar');

    // ASSERT
    expect(instance).toBeInstanceOf(MuSnackbar);

    // CLEANUP — none
  });

  it('defaults message to empty string', (): void => {
    // ARRANGE — done in beforeEach

    // ACT — none

    // ASSERT
    expect(el.message).toBe('');

    // CLEANUP — none
  });

  it('defaults variant to "default"', (): void => {
    // ARRANGE — done in beforeEach

    // ACT — none

    // ASSERT
    expect(el.variant).toBe('default');

    // CLEANUP — none
  });

  it('defaults duration to 5000', (): void => {
    // ARRANGE — done in beforeEach

    // ACT — none

    // ASSERT
    expect(el.duration).toBe(5000);

    // CLEANUP — none
  });

  it('defaults open to false', (): void => {
    // ARRANGE — done in beforeEach

    // ACT — none

    // ASSERT
    expect(el.open).toBe(false);

    // CLEANUP — none
  });

  it('defaults actionLabel to empty string', (): void => {
    // ARRANGE — done in beforeEach

    // ACT — none

    // ASSERT
    expect(el.actionLabel).toBe('');

    // CLEANUP — none
  });

  it('accepts all public properties', (): void => {
    // ARRANGE — done in beforeEach

    // ACT
    el.message = 'File saved';
    el.variant = 'success';
    el.duration = 3000;
    el.open = true;
    el.actionLabel = 'Undo';

    // ASSERT
    expect(el.message).toBe('File saved');
    expect(el.variant).toBe('success');
    expect(el.duration).toBe(3000);
    expect(el.open).toBe(true);
    expect(el.actionLabel).toBe('Undo');

    // CLEANUP — none
  });
});
