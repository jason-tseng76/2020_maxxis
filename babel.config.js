module.exports = {
  plugins: [
    ['module-resolver', {
      alias: {
        '~': './src',
      },
    }],
    'console-source',
  ],
  presets: ['@babel/preset-env'],
  env: {
    production: {
      // plugins: ['transform-remove-console'],
    },
  },
};
