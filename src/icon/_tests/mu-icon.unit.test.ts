import {expect} from '@open-wc/testing';
import {MuIcon} from '../mu-icon';

describe('mu-icon unit', () => {
  // ARRANGE
  it('should have default property values', () => {
    // ACT
    const icon = new MuIcon();
    // ASSERT
    expect(icon.name).to.equal('');
    expect(icon.size).to.equal('medium');
    expect(icon.color).to.equal('primary');
  });
});
