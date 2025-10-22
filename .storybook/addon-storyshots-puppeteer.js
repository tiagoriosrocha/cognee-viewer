module.exports = {
  addons: [
    '@storybook/addon-storyshots-puppeteer',
  ],
  parameters: {
    storyshotsPuppeteer: {
      suite: 'Image storyshots',
      storyKindRegex: /^.*?DontTest$/,
      storyNameRegex: /SKIP$/,
      getMatchOptions: ({ context: { kind, story }, url }) => ({
        fullPage: false,
      }),
      getScreenshotOptions: ({ context: { kind, story }, url }) => ({
        encoding: 'base64',
        fullPage: false,
      }),
    },
  },
};
