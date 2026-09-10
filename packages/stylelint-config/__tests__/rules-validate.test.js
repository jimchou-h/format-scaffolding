const assert = require('assert');
const path = require('path');

describe('test/rules-validate.test.js', () => {
  let stylelint;

  before(async () => {
    stylelint = (await import('stylelint')).default;
  });

  it('Validate default', async () => {
    const filePaths = [path.join(__dirname, './fixtures/index.css')];
    const result = await stylelint.lint({
      configFile: path.join(__dirname, '../index.js'),
      files: filePaths,
      fix: false,
    });
    assert.ok(result);
  });

  it('Validate sass', async () => {
    const filePaths = [path.join(__dirname, './fixtures/sass-test.scss')];
    const result = await stylelint.lint({
      configFile: path.join(__dirname, '../index.js'),
      files: filePaths,
      fix: false,
    });
    assert.ok(result);
  });

  it('config does not set removed stylistic rules', () => {
    const config = require('../index.js');
    assert.equal(config.rules.indentation, undefined);
    assert.equal(config.rules['color-hex-case'], undefined);
  });
});
