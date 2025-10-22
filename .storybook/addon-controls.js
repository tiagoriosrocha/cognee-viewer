module.exports = {
  addons: [
    '@storybook/addon-controls',
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};
