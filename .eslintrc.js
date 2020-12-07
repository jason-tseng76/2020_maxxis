module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  settings: {
    // 使用在.babelrc設定的alias
    'import/resolver': {
      'babel-module': {
        alias: {
          '~': './src',
          // '~root': './',
          // '~server': './server',
        },
      },
    },
  },
  // plugins: ['vue'],
  rules: {
    'no-new': 0,
    'no-underscore-dangle':0,
    'camelcase': 0,
    'no-unused-vars': 'warn',
    'max-len': 'warn',
    // 'no-unused-vars': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    // 'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  globals: {
    '$':true,
  },
};
