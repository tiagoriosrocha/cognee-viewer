module.exports = {
  addons: [
    '@storybook/addon-jest',
  ],
  parameters: {
    jest: {
      results: {
        globalConfig: {
          testResultsProcessor: './test-results-processor.js',
        },
      },
    },
  },
};
