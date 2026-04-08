/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {expect} from '@open-wc/testing';
import {MuCard, MuCardHeader, MuCardContent, MuCardActions} from '../mu-card';

describe('mu-card unit', () => {
  it('should be defined', () => {
    // ARRANGE / ACT
    const card = new MuCard();
    // ASSERT
    expect(card).to.be.instanceOf(MuCard);
  });

  it('MuCardHeader should be defined with default props', () => {
    // ARRANGE / ACT
    const header = new MuCardHeader();
    // ASSERT
    expect(header).to.be.instanceOf(MuCardHeader);
    expect(header.title).to.equal('');
    expect(header.subtitle).to.equal('');
  });

  it('MuCardHeader should accept title and subtitle', () => {
    // ARRANGE
    const header = new MuCardHeader();
    // ACT
    header.title = 'My Title';
    header.subtitle = 'My Subtitle';
    // ASSERT
    expect(header.title).to.equal('My Title');
    expect(header.subtitle).to.equal('My Subtitle');
  });

  it('MuCardContent should be defined', () => {
    // ARRANGE / ACT
    const content = new MuCardContent();
    // ASSERT
    expect(content).to.be.instanceOf(MuCardContent);
  });

  it('MuCardActions should be defined', () => {
    // ARRANGE / ACT
    const actions = new MuCardActions();
    // ASSERT
    expect(actions).to.be.instanceOf(MuCardActions);
  });
});
