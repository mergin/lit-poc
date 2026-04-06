import {describe, it, expect, beforeEach} from 'vitest';
import {MuFileUpload} from '../mu-file-upload.js';

describe('MuFileUpload — unit', () => {
  let el: MuFileUpload;

  beforeEach(() => {
    // ARRANGE
    el = new MuFileUpload();
  });

  it('should be an instance of MuFileUpload', () => {
    // ARRANGE — done in beforeEach
    // ACT — no action
    // ASSERT
    expect(el).toBeInstanceOf(MuFileUpload);
    // CLEANUP — none
  });

  it('should have correct defaults', () => {
    // ARRANGE — done in beforeEach
    // ACT — no action
    // ASSERT
    expect(el.multiple).toBe(false);
    expect(el.accept).toBe('');
    expect(el.disabled).toBe(false);
    expect(el.label).toBe('Choose file');
    expect(el.dragLabel).toBe('or drag and drop here');
    expect(el.name).toBe('');
    // CLEANUP — none
  });

  it('should accept multiple', () => {
    // ARRANGE — done in beforeEach
    // ACT
    el.multiple = true;
    // ASSERT
    expect(el.multiple).toBe(true);
    // CLEANUP — none
  });

  it('should accept accept', () => {
    // ARRANGE — done in beforeEach
    // ACT
    el.accept = 'image/*';
    // ASSERT
    expect(el.accept).toBe('image/*');
    // CLEANUP — none
  });

  it('should accept disabled', () => {
    // ARRANGE — done in beforeEach
    // ACT
    el.disabled = true;
    // ASSERT
    expect(el.disabled).toBe(true);
    // CLEANUP — none
  });

  it('should accept label', () => {
    // ARRANGE — done in beforeEach
    // ACT
    el.label = 'Upload document';
    // ASSERT
    expect(el.label).toBe('Upload document');
    // CLEANUP — none
  });

  it('should be form-associated', () => {
    // ARRANGE — done in beforeEach
    // ACT — no action
    // ASSERT
    expect((MuFileUpload as typeof MuFileUpload & {formAssociated: boolean}).formAssociated).toBe(
      true
    );
    // CLEANUP — none
  });
});
