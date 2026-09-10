const path = require('path');

const readPkg = (pkgDir) =>
  require(path.resolve(__dirname, '../../', pkgDir, 'package.json'));

describe('shareable-config-runtime', () => {
  test('eslint-config ships plugins as dependencies and eslint as peer', () => {
    const pkg = readPkg('eslint-config');
    expect(pkg.dependencies['@typescript-eslint/parser']).toBeDefined();
    expect(pkg.dependencies['eslint-plugin-import']).toBeDefined();
    expect(pkg.dependencies['vue-eslint-parser']).toBeDefined();
    expect(pkg.peerDependencies.eslint).toBeDefined();
    expect(pkg.devDependencies['@typescript-eslint/parser']).toBeUndefined();
  });

  test('stylelint-config ships scss plugin as dependency and stylelint as peer', () => {
    const pkg = readPkg('stylelint-config');
    expect(pkg.dependencies['stylelint-scss']).toBeDefined();
    expect(pkg.dependencies['postcss-scss']).toBeDefined();
    expect(pkg.peerDependencies.stylelint).toBeDefined();
    expect(pkg.peerDependencies['stylelint-scss']).toBeUndefined();
  });

  test('code-lint-fs depends on four extends packages and has no config peers', () => {
    const pkg = require('../package.json');
    const configs = [
      'eslint-config-format-scaffolding',
      'stylelint-config-format-scaffolding',
      'commitlint-config-format-scaffolding',
      'markdownlint-config-format-scaffolding',
    ];
    for (const name of configs) {
      expect(pkg.dependencies[name]).toBeDefined();
    }
    expect(pkg.peerDependencies).toBeUndefined();
  });
});
