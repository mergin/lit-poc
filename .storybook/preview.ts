import {Preview} from '@storybook/web-components';

/**
 * Global Storybook preview configuration for Lit 3 components.
 * Add global styles, decorators, or parameters here.
 */
const preview: Preview = {
  parameters: {
    actions: {argTypesRegex: '^on[A-Z].*'},
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
