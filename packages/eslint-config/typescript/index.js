const tsParser = require('@typescript-eslint/parser');
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const jsConfig = require('../index');
const tsRules = require('../rules/typescript');
const { pickExistingPluginRules } = require('../utils/pick-existing-plugin-rules');

module.exports = [
  ...jsConfig,
  {
    name: 'format-scaffolding/typescript',
    files: ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts', '**/*.vue'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        projectService: true,
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    settings: tsRules.settings,
    rules: pickExistingPluginRules(tsPlugin, tsRules.rules, '@typescript-eslint'),
  },
];
