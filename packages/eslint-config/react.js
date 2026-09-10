const react = require('eslint-plugin-react');
const reactHooks = require('eslint-plugin-react-hooks');
const jsxA11y = require('eslint-plugin-jsx-a11y');
const jsConfig = require('./index');
const reactRules = require('./rules/react');
const jsxA11yRules = require('./rules/jsx-a11y');

const reactFlatRecommended =
  (react.configs.flat && react.configs.flat.recommended) || react.configs.recommended || {};
const reactHooksRecommended =
  (reactHooks.configs &&
    (reactHooks.configs.recommended || reactHooks.configs['recommended-latest'])) ||
  {};

module.exports = [
  ...jsConfig,
  ...(Array.isArray(reactFlatRecommended) ? reactFlatRecommended : [reactFlatRecommended]),
  {
    name: 'format-scaffolding/react',
    files: ['**/*.js', '**/*.jsx', '**/*.mjs', '**/*.cjs', '**/*.ts', '**/*.tsx'],
    plugins: {
      react,
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y,
    },
    languageOptions: {
      parserOptions: {
        babelOptions: {
          presets: [require.resolve('@babel/preset-react')],
        },
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...reactRules.rules,
      ...jsxA11yRules.rules,
      ...(reactHooksRecommended.rules || {}),
    },
  },
];
