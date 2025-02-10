'use strict';

const feLint = require('..');
const assert = require('assert').strict;

assert.strictEqual(feLint(), 'Hello from feLint');
console.info('feLint tests passed');
