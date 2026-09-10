const { ESLint } = require('eslint');

function createCli(config, extra = {}) {
  return new ESLint({
    overrideConfigFile: true,
    overrideConfig: Array.isArray(config) ? config : [config],
    ignore: false,
    ...extra,
  });
}

module.exports = { createCli };
