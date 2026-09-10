const js = require('@eslint/js');
const babelParser = require('@babel/eslint-parser');
const importPlugin = require('eslint-plugin-import');
const globals = require('globals');

const bestPractices = require('./rules/base/best-practices');
const possibleErrors = require('./rules/base/possible-errors');
const style = require('./rules/base/style');
const variables = require('./rules/base/variables');
const es6 = require('./rules/base/es6');
const strict = require('./rules/base/strict');
const imports = require('./rules/imports');

module.exports = [
  js.configs.recommended,
  {
    name: 'format-scaffolding/javascript',
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        ecmaVersion: 2022,
        sourceType: 'module',
        ecmaFeatures: {
          globalReturn: false,
          impliedStrict: true,
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
    },
    plugins: {
      import: importPlugin,
    },
    settings: imports.settings,
    rules: {
      ...bestPractices.rules,
      ...possibleErrors.rules,
      ...style.rules,
      ...variables.rules,
      ...es6.rules,
      ...strict.rules,
      ...imports.rules,
    },
  },
];
