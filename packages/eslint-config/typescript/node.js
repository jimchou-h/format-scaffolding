const tsParser = require('@typescript-eslint/parser');
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const nodeConfig = require('../node');
const tsRules = require('../rules/typescript');
const { pickExistingPluginRules } = require('../utils/pick-existing-plugin-rules');

module.exports = [
  ...nodeConfig,
  {
    name: 'format-scaffolding/typescript-node',
    files: ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts'],
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
