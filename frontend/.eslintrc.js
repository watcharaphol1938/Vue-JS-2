module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:vue/recommended', 'google', 'prettier', 'prettier/vue'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['vue'],
  rules: {},
};
