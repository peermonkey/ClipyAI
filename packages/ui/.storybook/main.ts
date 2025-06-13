import type { StorybookConfig } from '@storybook/react';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-interactions'],
  framework: {
    name: '@storybook/react',
    options: {},
  },
  docs: {
    autodocs: true,
  },
};

export default config; 