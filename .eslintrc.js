module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'error',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'error',
    "semi": [2, "always"],
    "indent": ["error", 2]
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
};
