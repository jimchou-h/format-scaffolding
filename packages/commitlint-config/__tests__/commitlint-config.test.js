'use strict';

const commitlintConfig = require('..');
const assert = require('assert').strict;

assert.strictEqual(commitlintConfig(), 'Hello from commitlintConfig');
console.info('commitlintConfig tests passed');
