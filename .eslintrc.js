// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    "ecmaVersion": 6,
    sourceType: 'module'
  },
  env: {
    browser: true,
    "es6": true
  },
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  globals: {
    '$': true,
    'juicer': true
  },
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    "indent": [0, 4],
    "quotes": [2, 'single'],
    "no-tabs": "off",
    'var': 'always',
    'let': 'always',
    'const': 'always',
    'linebreak-style': 'off', // 换行风格
    'no-extra-semi': 'error', // 分号
    'no-console': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-debugger': 'error', // debugger
  }
}
