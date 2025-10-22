module.exports = {
  addons: [
    '@storybook/addon-storysource',
  ],
  parameters: {
    storysource: {
      loaderOptions: {
        injectStoryParameters: false,
      },
    },
  },
};
