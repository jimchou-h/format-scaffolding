const assert = require('assert');
const path = require('path');
const { createCli } = require('./helpers');

describe('test/use-babel-eslint.test.js', () => {
  it('babel-eslint parser run well for react', async () => {
    const filePath = path.join(__dirname, './fixtures/use-babel-eslint.jsx');
    const cli = createCli(require('../react.js'));
    const results = await cli.lintFiles([filePath]);
    const { messages, fatalErrorCount } = results[0];

    assert.equal(fatalErrorCount, 0);
    const reactMessages = messages.filter((result) => result.ruleId && result.ruleId.indexOf('react/') !== -1);
    assert.notEqual(reactMessages.length, 0);
  });

  it('babel-eslint parser run well for vue', async () => {
    const filePath = path.join(__dirname, './fixtures/vue.vue');
    const cli = createCli(require('../vue.js'));
    const results = await cli.lintFiles([filePath]);
    const { fatalErrorCount } = results[0];

    assert.equal(fatalErrorCount, 0);
  });
});
