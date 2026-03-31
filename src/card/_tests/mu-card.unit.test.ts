/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {expect} from '@open-wc/testing';
import {MuCard} from '../mu-card';

describe('mu-card unit', () => {
  // ARRANGE
  it('should be defined', () => {
    // ACT
    const card = new MuCard();
    // ASSERT
    expect(card).to.be.instanceOf(MuCard);
  });
});
