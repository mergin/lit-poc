import {fixture, html, expect} from '@open-wc/testing';
import {describe, it, beforeEach} from 'vitest';
import type {MuFileUpload} from '../mu-file-upload.js';
import '../mu-file-upload.js';

describe('MuFileUpload — render', () => {
  let el: MuFileUpload;

  beforeEach(async () => {
    // ARRANGE
    el = await fixture<MuFileUpload>(html`<mu-file-upload label="Upload"></mu-file-upload>`);
  });

  it('renders drop zone with role="button"', async () => {
    // ARRANGE — done in beforeEach
    // ACT
    const zone = el.shadowRoot?.querySelector('[role="button"]');
    // ASSERT
    expect(zone).to.exist;
    // CLEANUP — none
  });

  it('drop zone has correct aria-label', async () => {
    // ARRANGE — done in beforeEach
    // ACT
    const zone = el.shadowRoot?.querySelector('[role="button"]');
    // ASSERT
    expect(zone?.getAttribute('aria-label')).to.equal('Upload');
    // CLEANUP — none
  });

  it('renders hidden file input', async () => {
    // ARRANGE — done in beforeEach
    // ACT
    const input = el.shadowRoot?.querySelector('input[type="file"]');
    // ASSERT
    expect(input).to.exist;
    expect(input?.getAttribute('aria-hidden')).to.equal('true');
    // CLEANUP — none
  });

  it('file input has multiple attribute when multiple=true', async () => {
    // ARRANGE
    el = await fixture<MuFileUpload>(html`<mu-file-upload multiple></mu-file-upload>`);
    // ACT
    const input = el.shadowRoot?.querySelector('input[type="file"]');
    // ASSERT
    expect(input?.hasAttribute('multiple')).to.be.true;
    // CLEANUP — none
  });

  it('file input has accept attribute', async () => {
    // ARRANGE
    el = await fixture<MuFileUpload>(html`<mu-file-upload accept="image/*"></mu-file-upload>`);
    // ACT
    const input = el.shadowRoot?.querySelector('input[type="file"]');
    // ASSERT
    expect(input?.getAttribute('accept')).to.equal('image/*');
    // CLEANUP — none
  });

  it('drop zone has tabindex="-1" when disabled', async () => {
    // ARRANGE
    el = await fixture<MuFileUpload>(html`<mu-file-upload disabled></mu-file-upload>`);
    // ACT
    const zone = el.shadowRoot?.querySelector('[role="button"]');
    // ASSERT
    expect(zone?.getAttribute('tabindex')).to.equal('-1');
    // CLEANUP — none
  });

  it('passes basic accessibility audit', async () => {
    // ARRANGE — done in beforeEach
    // ACT + ASSERT
    await expect(el).to.be.accessible();
    // CLEANUP — none
  });
});
