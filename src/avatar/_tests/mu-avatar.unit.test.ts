import {expect} from '@open-wc/testing';
import {MuAvatar} from '../mu-avatar';

describe('mu-avatar unit', () => {
  // ARRANGE
  it('should have default property values', () => {
    // ACT
    const avatar = new MuAvatar();
    // ASSERT
    expect(avatar.src).to.be.null;
    expect(avatar.alt).to.equal('');
    expect(avatar.initials).to.equal('');
    expect(avatar.size).to.equal('medium');
    expect(avatar.color).to.equal('primary');
  });
});
