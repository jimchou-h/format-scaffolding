const pluginVue = require('eslint-plugin-vue');
const vueParser = require('vue-eslint-parser');
const babelParser = require('@babel/eslint-parser');
const jsConfig = require('./index');
const vueRules = require('./rules/vue');

const vueRecommended = pluginVue.configs['flat/recommended'] || pluginVue.configs['flat/essential'] || [];

module.exports = [
  ...jsConfig,
  ...vueRecommended,
  {
    name: 'format-scaffolding/vue',
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: babelParser,
        extraFileExtensions: ['.vue'],
        requireConfigFile: false,
        ecmaVersion: 2022,
        sourceType: 'module',
      },
    },
    plugins: {
      vue: pluginVue,
    },
    rules: vueRules.rules,
  },
];
