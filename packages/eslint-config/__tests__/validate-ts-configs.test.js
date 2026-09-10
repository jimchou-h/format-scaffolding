const assert = require('assert');
const path = require('path');
const sumBy = require('lodash/sumBy');
const { createCli } = require('./helpers');

function isObject(obj) {
  return typeof obj === 'object' && obj !== null;
}

describe('Validate TS configs', () => {
  it('Validate eslint-config-format-scaffolding/typescript', async () => {
    const filePath = path.join(__dirname, './fixtures/ts.ts');
    const cli = createCli(require('../typescript/index.js'));

    const config = await cli.calculateConfigForFile(filePath);
    assert.ok(isObject(config));

    const results = await cli.lintFiles([filePath]);
    assert.equal(sumBy(results, 'fatalErrorCount'), 0);
    assert.notEqual(sumBy(results, 'errorCount'), 0);

    const { messages } = results[0];
    const tsMessages = messages.filter(
      (result) => result.ruleId && result.ruleId.indexOf('@typescript-eslint/') !== -1,
    );
    assert.notEqual(tsMessages.length, 0);
  });

  it('Validate eslint-config-format-scaffolding/typescript/vue', async () => {
    const filePath = path.join(__dirname, './fixtures/ts-vue.vue');
    const cli = createCli(require('../typescript/vue.js'));

    const config = await cli.calculateConfigForFile(filePath);
    assert.ok(isObject(config));

    const results = await cli.lintFiles([filePath]);
    assert.equal(sumBy(results, 'fatalErrorCount'), 0);

    const { messages } = results[0];
    const vueMessages = messages.filter((result) => result.ruleId && result.ruleId.indexOf('vue/') !== -1);
    assert.notEqual(vueMessages.length, 0);
  });

  it('Validate eslint-config-format-scaffolding/typescript/react', async () => {
    const filePath = path.join(__dirname, './fixtures/ts-react.tsx');
    const cli = createCli(require('../typescript/react.js'));

    const config = await cli.calculateConfigForFile(filePath);
    assert.ok(isObject(config));

    const results = await cli.lintFiles([filePath]);
    assert.equal(sumBy(results, 'fatalErrorCount'), 0);

    const { messages } = results[0];
    const reactMessages = messages.filter((result) => result.ruleId && result.ruleId.indexOf('react/') !== -1);
    assert.notEqual(reactMessages.length, 0);
  });

  it('Validate eslint-config-format-scaffolding/typescript/node', async () => {
    const filePath = path.join(__dirname, './fixtures/ts-node.ts');
    const cli = createCli(require('../typescript/node.js'));

    const config = await cli.calculateConfigForFile(filePath);
    assert.ok(isObject(config));

    const results = await cli.lintFiles([filePath]);
    assert.equal(sumBy(results, 'fatalErrorCount'), 0);

    const { messages } = results[0];
    const ruleIds = messages.map((item) => item.ruleId);
    assert.ok(
      ruleIds.some((id) => id && (id.startsWith('n/') || id.startsWith('@typescript-eslint/'))),
    );
  });
});
