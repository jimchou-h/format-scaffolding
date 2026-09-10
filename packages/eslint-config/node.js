const n = require('eslint-plugin-n');
const globals = require('globals');
const jsConfig = require('./index');

const nRecommended = n.configs['flat/recommended'] || n.configs.recommended || [];

module.exports = [
  ...jsConfig,
  ...(Array.isArray(nRecommended) ? nRecommended : [nRecommended]),
  {
    name: 'format-scaffolding/node',
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    plugins: {
      n,
    },
  },
];
