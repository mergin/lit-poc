import {StorybookConfig} from '@storybook/web-components-vite';

/**
 * Storybook main configuration for Lit 3 + TypeScript 5 web components.
 * See: https://storybook.js.org/docs/web-components/configure/overview
 */
const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx|md)'],
  addons: ['@storybook/addon-docs', '@storybook/addon-essentials', '@storybook/addon-interactions'],
  framework: {
    name: '@storybook/web-components-vite',
    options: {},
  },
  docs: {
    autodocs: true,
  },
};

export default config;
