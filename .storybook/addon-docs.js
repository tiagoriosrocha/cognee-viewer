module.exports = {
  addons: [
    '@storybook/addon-docs',
  ],
  features: {
    postcss: false,
  },
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.mdx$/,
      use: [
        {
          loader: '@storybook/mdx1-csf/loader',
          options: {
            skipCsf: false,
          },
        },
      ],
    });

    config.module.rules.push({
      test: /\.stories\.jsx?$/,
      loaders: [
        {
          loader: require.resolve('@storybook/source-loader'),
          options: {
            injectStoryParameters: false,
          },
        },
      ],
      enforce: 'pre',
    });

    return config;
  },
};
