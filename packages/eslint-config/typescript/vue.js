const tsParser = require('@typescript-eslint/parser');
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const vueParser = require('vue-eslint-parser');
const vueConfig = require('../vue');
const tsRules = require('../rules/typescript');
const { pickExistingPluginRules } = require('../utils/pick-existing-plugin-rules');

module.exports = [
  ...vueConfig,
  {
    name: 'format-scaffolding/typescript-vue',
    files: ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts', '**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsParser,
        extraFileExtensions: ['.vue'],
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
