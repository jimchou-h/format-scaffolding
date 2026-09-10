const { getInitDevDependencies } = require('../lib/utils/init-deps');

describe('getInitDevDependencies', () => {
  test('always writes scaffolding, eslint, husky and commitlint', () => {
    expect(getInitDevDependencies({})).toMatchObject({
      'code-lint-fs': '^1.1.0',
      'eslint-config-format-scaffolding': '^1.1.0',
      eslint: '^8.7.0',
      husky: '^3.1.0',
      'commitlint-config-format-scaffolding': '^1.1.0',
      '@commitlint/cli': '^16.0.0',
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
  });

  test('writes stylelint, markdownlint and prettier when enabled', () => {
    expect(
      getInitDevDependencies({
        enableStylelint: true,
        enableMarkdownlint: true,
        enablePrettier: true,
      }),
    ).toMatchObject({
      'stylelint-config-format-scaffolding': '^1.1.0',
      stylelint: '^14.3.0',
      'markdownlint-config-format-scaffolding': '^1.1.0',
      prettier: '^2.2.1',
      'eslint-config-prettier': '^8.3.0',
      'eslint-plugin-prettier': '^4.0.0',
    });
  });
});
