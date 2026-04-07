// @vitest-environment jsdom
import {render} from '@testing-library/react';
import React from 'react';
import {describe, expect, it} from 'vitest';
import {Button, Checkbox, TextField} from '../index.js';

describe('React wrappers — render', (): void => {
  it('Button renders a mu-button element', (): void => {
    // ARRANGE / ACT
    const {container} = render(React.createElement(Button, {}, 'Hello'));
    // ASSERT
    expect(container.querySelector('mu-button')).not.toBeNull();
    // CLEANUP — none
  });

  it('Checkbox renders a mu-checkbox element', (): void => {
    // ARRANGE / ACT
    const {container} = render(React.createElement(Checkbox, {}));
    // ASSERT
    expect(container.querySelector('mu-checkbox')).not.toBeNull();
    // CLEANUP — none
  });

  it('TextField renders a mu-text-field element', (): void => {
    // ARRANGE / ACT
    const {container} = render(React.createElement(TextField, {label: 'Name'}));
    // ASSERT
    expect(container.querySelector('mu-text-field')).not.toBeNull();
    // CLEANUP — none
  });
});
