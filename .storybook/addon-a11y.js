module.exports = {
  addons: [
    '@storybook/addon-a11y',
  ],
  parameters: {
    a11y: {
      element: '#root',
      config: {},
      options: {},
      manual: true,
    },
  },
};
