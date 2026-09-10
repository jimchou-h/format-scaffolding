const jsxA11y = require('eslint-plugin-jsx-a11y');
const jsxA11yRules = require('./rules/jsx-a11y');

module.exports = [
  {
    name: 'format-scaffolding/jsx-a11y',
    plugins: {
      'jsx-a11y': jsxA11y,
    },
    rules: jsxA11yRules.rules,
  },
];
