const path = require('path');
const fs = require('fs-extra');
const feLint = require('../lib/index');

const { init, scan } = feLint

describe('lint', () => {
  const templatePath = path.resolve(__dirname, './fixtures/template/init');
  const outputPath = path.resolve(__dirname, './fixtures/template/temp');

  beforeEach(() => {
    fs.copySync(templatePath, outputPath);
    fs.renameSync(`${outputPath}/_vscode`, `${outputPath}/.vscode`);
  });

  test('node api init should work as expected', async () => {
    await init({
      cwd: outputPath,
      checkVersionUpdate: false,
      eslintType: 'index',
      enableStylelint: true,
      enableMarkdownlint: true,
      enablePrettier: true,
    });

    const pkg = require(`${outputPath}/package.json`);
    const settings = require(`${outputPath}/.vscode/settings.json`);

    expect(settings['editor.defaultFormatter']).toBe('esbenp.prettier-vscode');
    expect(settings['eslint.validate'].includes('233')).toBeTruthy();
    expect(settings.test).toBeTruthy();
    expect(fs.existsSync(`${outputPath}/.npmrc`)).toBe(false);
    expect(pkg.devDependencies).toMatchObject({
      'code-lint-fs': '^1.1.0',
      'eslint-config-format-scaffolding': '^1.1.0',
      eslint: '^8.7.0',
      husky: '^3.1.0',
      'commitlint-config-format-scaffolding': '^1.1.0',
      '@commitlint/cli': '^16.0.0',
      'stylelint-config-format-scaffolding': '^1.1.0',
      stylelint: '^14.3.0',
      'markdownlint-config-format-scaffolding': '^1.1.0',
      prettier: '^2.2.1',
      'eslint-config-prettier': '^8.3.0',
      'eslint-plugin-prettier': '^4.0.0',
    });
  })

  test('node api init should work as expected', async () => {
    await scan({
      cwd: outputPath,
      checkVersionUpdate: false,
      eslintType: 'index',
      enableStylelint: true,
      enableMarkdownlint: true,
      enablePrettier: true,
    });
  })

  afterEach(() => {
    fs.removeSync(outputPath);
  });
})