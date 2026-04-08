import {describe, bench} from 'vitest';
import {MuFileUpload} from '../mu-file-upload.js';

describe('MuFileUpload — perf', () => {
  bench('instantiation', () => {
    new MuFileUpload();
  });

  bench('property write — multiple', () => {
    const el = new MuFileUpload();
    el.multiple = true;
  });

  bench('property write — accept', () => {
    const el = new MuFileUpload();
    el.accept = 'image/*';
  });

  bench('property write — disabled', () => {
    const el = new MuFileUpload();
    el.disabled = true;
  });
});
