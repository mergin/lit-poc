import {fixture, html, expect} from '@open-wc/testing';
import {describe, it, beforeEach} from 'vitest';
import type {MuSlider} from '../mu-slider.js';
import '../mu-slider.js';

describe('MuSlider — render', () => {
  let el: MuSlider;

  beforeEach(async () => {
    // ARRANGE
    el = await fixture<MuSlider>(
      html`<mu-slider
        label="Volume"
        value="50"
      ></mu-slider>`
    );
  });

  it('renders a thumb with role="slider"', async () => {
    // ARRANGE — done in beforeEach
    // ACT
    const thumb = el.shadowRoot?.querySelector('[role="slider"]');
    // ASSERT
    expect(thumb).to.exist;
    // CLEANUP — none
  });

  it('reflects aria-valuemin and aria-valuemax on thumb', async () => {
    // ARRANGE
    el = await fixture<MuSlider>(
      html`<mu-slider
        min="10"
        max="90"
        value="50"
      ></mu-slider>`
    );
    // ACT
    const thumb = el.shadowRoot?.querySelector('[role="slider"]');
    // ASSERT
    expect(thumb?.getAttribute('aria-valuemin')).to.equal('10');
    expect(thumb?.getAttribute('aria-valuemax')).to.equal('90');
    // CLEANUP — none
  });

  it('reflects aria-valuenow on thumb', async () => {
    // ARRANGE — done in beforeEach
    // ACT
    const thumb = el.shadowRoot?.querySelector('[role="slider"]');
    // ASSERT
    expect(thumb?.getAttribute('aria-valuenow')).to.equal('50');
    // CLEANUP — none
  });

  it('renders label text when label prop is set', async () => {
    // ARRANGE — done in beforeEach (label="Volume")
    // ACT
    const labelEl = el.shadowRoot?.querySelector('.label-text');
    // ASSERT
    expect(labelEl?.textContent?.trim()).to.equal('Volume');
    // CLEANUP — none
  });

  it('does not render label element when label is empty', async () => {
    // ARRANGE
    el = await fixture<MuSlider>(html`<mu-slider></mu-slider>`);
    // ACT
    const labelEl = el.shadowRoot?.querySelector('.label-text');
    // ASSERT
    expect(labelEl).to.not.exist;
    // CLEANUP — none
  });

  it('renders track, fill, and thumb elements', async () => {
    // ARRANGE — done in beforeEach
    // ACT
    const track = el.shadowRoot?.querySelector('[part="track"]');
    const fill = el.shadowRoot?.querySelector('[part="fill"]');
    const thumb = el.shadowRoot?.querySelector('[part="thumb"]');
    // ASSERT
    expect(track).to.exist;
    expect(fill).to.exist;
    expect(thumb).to.exist;
    // CLEANUP — none
  });

  it('sets tabindex="-1" on thumb when disabled', async () => {
    // ARRANGE
    el = await fixture<MuSlider>(html`<mu-slider disabled></mu-slider>`);
    // ACT
    const thumb = el.shadowRoot?.querySelector('[role="slider"]');
    // ASSERT
    expect(thumb?.getAttribute('tabindex')).to.equal('-1');
    // CLEANUP — none
  });

  it('sets aria-disabled="true" on thumb when disabled', async () => {
    // ARRANGE
    el = await fixture<MuSlider>(html`<mu-slider disabled></mu-slider>`);
    // ACT
    const thumb = el.shadowRoot?.querySelector('[role="slider"]');
    // ASSERT
    expect(thumb?.getAttribute('aria-disabled')).to.equal('true');
    // CLEANUP — none
  });

  it('changes aria-valuenow when value property changes', async () => {
    // ARRANGE — done in beforeEach (value=50)
    // ACT
    el.value = 75;
    await el.updateComplete;
    const thumb = el.shadowRoot?.querySelector('[role="slider"]');
    // ASSERT
    expect(thumb?.getAttribute('aria-valuenow')).to.equal('75');
    // CLEANUP — none
  });

  it('passes basic accessibility audit', async () => {
    // ARRANGE — done in beforeEach
    // ACT + ASSERT
    await expect(el).to.be.accessible();
    // CLEANUP — none
  });
});
