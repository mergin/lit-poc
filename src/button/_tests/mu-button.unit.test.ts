import {expect} from '@open-wc/testing';
import {MuButton} from '../mu-button';

describe('mu-button unit', () => {
  // ARRANGE
  it('should have default property values', () => {
    // ACT
    const button = new MuButton();
    // ASSERT
    expect(button.size).to.equal('medium');
    expect(button.variant).to.equal('contained');
    expect(button.color).to.equal('primary');
    expect(button.disabled).to.be.false;
  });
});
