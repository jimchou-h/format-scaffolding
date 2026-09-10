const assert = require('assert');
const path = require('path');
const sumBy = require('lodash/sumBy');
const { createCli } = require('./helpers');

function isObject(obj) {
  return typeof obj === 'object' && obj !== null;
}

describe('Validate JS configs', () => {
  it('Validate eslint-config-format-scaffolding', async () => {
    const filePath = path.join(__dirname, './fixtures/index.js');
    const cli = createCli(require('../index.js'));

    const config = await cli.calculateConfigForFile(filePath);
    assert.ok(isObject(config));

    const results = await cli.lintFiles([filePath]);
    assert.equal(sumBy(results, 'fatalErrorCount'), 0);
    assert.notEqual(sumBy(results, 'errorCount'), 0);
    assert.notEqual(sumBy(results, 'warningCount'), 0);
  });

  it('does not export es5', () => {
    assert.throws(() => require('../es5'));
  });

  it('Validate eslint-config-format-scaffolding/vue', async () => {
    const filePath = path.join(__dirname, './fixtures/vue.vue');
    const cli = createCli(require('../vue.js'));

    const config = await cli.calculateConfigForFile(filePath);
    assert.ok(isObject(config));

    const results = await cli.lintFiles([filePath]);
    assert.equal(sumBy(results, 'fatalErrorCount'), 0);

    const { messages } = results[0];
    const vueMessages = messages.filter((result) => result.ruleId && result.ruleId.indexOf('vue/') !== -1);
    assert.notEqual(vueMessages.length, 0);
  });

  it('Validate eslint-config-format-scaffolding/react', async () => {
    const filePath = path.join(__dirname, './fixtures/react.jsx');
    const cli = createCli(require('../react.js'));

    const config = await cli.calculateConfigForFile(filePath);
    assert.ok(isObject(config));

    const results = await cli.lintFiles([filePath]);
    assert.equal(sumBy(results, 'fatalErrorCount'), 0);

    const { messages } = results[0];
    const reactMessages = messages.filter((result) => result.ruleId && result.ruleId.indexOf('react/') !== -1);
    assert.notEqual(reactMessages.length, 0);
  });

  it('Validate eslint-config-format-scaffolding/node', async () => {
    const filePath = path.join(__dirname, './fixtures/node.js');
    const cli = createCli(require('../node.js'));

    const config = await cli.calculateConfigForFile(filePath);
    assert.ok(isObject(config));
    assert.ok(config.plugins.n || (Array.isArray(config.plugins) && config.plugins.includes('n')));

    const results = await cli.lintFiles([filePath]);
    assert.equal(sumBy(results, 'fatalErrorCount'), 0);

    const { messages } = results[0];
    const ruleIds = messages.map((item) => item.ruleId);
    assert.ok(ruleIds.some((id) => id && id.startsWith('n/')));
  });
});
