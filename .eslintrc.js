const { defineConfig } = require('eslint-define-config');

module.exports = defineConfig({
  env: {
    es2021: true,
    browser: true,
    node: true,
  },
  // 全局变量
  globals: {
    defineProps: 'readonly',
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest',
    sourceType: 'module',
    jsxPragma: 'React',
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: [
    // https://zh-hans.eslint.org/docs/latest/rules/
    'eslint:recommended',
    // https://eslint.vuejs.org
    'plugin:vue/vue3-essential',
    'plugin:vue/vue3-strongly-recommended',
    // https://github.com/prettier/eslint-plugin-prettier
    'plugin:prettier/recommended',
  ],
});
