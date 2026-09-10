const scaffolding = require('eslint-config-format-scaffolding/typescript/vue');
const prettier = require('eslint-config-prettier');

module.exports = [
  {
    ignores: ['**/node_modules/**', '**/dist/**', '**/coverage/**'],
  },
  ...scaffolding,
  prettier,
];
