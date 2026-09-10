const { getInitDevDependencies } = require('../lib/utils/init-deps');

describe('getInitDevDependencies', () => {
  test('always writes scaffolding, eslint, husky and commitlint', () => {
    expect(getInitDevDependencies({})).toMatchObject({
      'code-lint-fs': '^2.0.0',
      'eslint-config-format-scaffolding': '^2.0.0',
      eslint: '^9.39.0',
      husky: '^9.1.0',
      'commitlint-config-format-scaffolding': '^2.0.0',
      '@commitlint/cli': '^21.2.0',
    });
  });

  test('omits optional engines when disabled', () => {
    const deps = getInitDevDependencies({
      enableStylelint: false,
      enableMarkdownlint: false,
      enablePrettier: false,
    });

    expect(deps).not.toHaveProperty('stylelint');
    expect(deps).not.toHaveProperty('stylelint-config-format-scaffolding');
    expect(deps).not.toHaveProperty('markdownlint-config-format-scaffolding');
    expect(deps).not.toHaveProperty('prettier');
    expect(deps).not.toHaveProperty('eslint-config-prettier');
    expect(deps).not.toHaveProperty('eslint-plugin-prettier');
    expect(deps).not.toHaveProperty('typescript');
  });

  test('writes stylelint, markdownlint and prettier when enabled', () => {
    expect(
      getInitDevDependencies({
        enableStylelint: true,
        enableMarkdownlint: true,
        enablePrettier: true,
      }),
    ).toMatchObject({
      'stylelint-config-format-scaffolding': '^2.0.0',
      stylelint: '^17.15.0',
      'markdownlint-config-format-scaffolding': '^2.0.0',
      prettier: '^3.9.0',
      'eslint-config-prettier': '^10.1.0',
      'eslint-plugin-prettier': '^5.5.0',
    });
  });

  test('writes typescript for TypeScript eslintType', () => {
    expect(getInitDevDependencies({ eslintType: 'typescript/vue' })).toMatchObject({
      typescript: '~6.0.3',
    });
  });
});
