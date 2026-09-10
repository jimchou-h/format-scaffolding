const scaffolding = require('./index.js');

module.exports = [
  {
    ignores: ['**/node_modules/**', '**/coverage/**', '**/dist/**', '**/build/**'],
  },
  ...scaffolding,
];
