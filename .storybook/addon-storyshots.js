module.exports = {
  addons: [
    '@storybook/addon-storyshots',
  ],
  parameters: {
    storyshots: {
      suite: 'Storyshots',
      storyKindRegex: /^.*?DontTest$/,
      storyNameRegex: /SKIP$/,
      snapshotSerializers: [
        require.resolve('enzyme-to-json/serializer'),
      ],
    },
  },
};
