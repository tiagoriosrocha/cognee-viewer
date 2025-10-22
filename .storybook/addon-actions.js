module.exports = {
  addons: [
    '@storybook/addon-actions',
  ],
  parameters: {
    actions: {
      argTypesRegex: '^on[A-Z].*',
    },
  },
};
