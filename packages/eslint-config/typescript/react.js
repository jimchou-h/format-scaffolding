const tsParser = require('@typescript-eslint/parser');
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const reactConfig = require('../react');
const tsRules = require('../rules/typescript');
const { pickExistingPluginRules } = require('../utils/pick-existing-plugin-rules');

module.exports = [
  ...reactConfig,
  {
    name: 'format-scaffolding/typescript-react',
    files: ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        projectService: true,
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    settings: tsRules.settings,
    rules: pickExistingPluginRules(tsPlugin, tsRules.rules, '@typescript-eslint'),
  },
];
