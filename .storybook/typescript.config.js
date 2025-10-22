module.exports = {
  extends: '../tsconfig.json',
  compilerOptions: {
    allowSyntheticDefaultImports: true,
    esModuleInterop: true,
    jsx: 'react-jsx',
    lib: ['dom', 'dom.iterable', 'es6'],
    module: 'esnext',
    moduleResolution: 'node',
    noEmit: true,
    resolveJsonModule: true,
    skipLibCheck: true,
    strict: true,
    target: 'es5',
  },
  include: [
    '../src/**/*',
    '../stories/**/*',
    '../.storybook/**/*',
  ],
  exclude: [
    '../node_modules',
    '../dist',
  ],
};
