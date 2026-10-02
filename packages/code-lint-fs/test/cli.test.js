const path = require('path');
const fs = require('fs-extra');
const execa = require('execa');
const packageJson = require('../package.json');

const cli = (args, options) => {
  return execa('node', [path.resolve(__dirname, '../lib/cli.js'), ...args], options);
};

test('--version should output right version', async () => {
  // cli.js 顶层会拉 eslint/stylelint 等依赖，冷启动常超过 Jest 默认 5s
  const { stdout } = await cli(['--version'], { timeout: 30000 });
  expect(stdout).toBe(packageJson.version);
}, 30000);

describe(`'fix' command`, () => {
  const dir = path.resolve(__dirname, './fixtures/autofix');
  const outputFilePath = path.resolve(dir, './temp/temp.js');
  const errorFileContent = fs.readFileSync(path.resolve(dir, './semi-error.js'), 'utf8');
  const expectedFileContent = fs.readFileSync(path.resolve(dir, './semi-expected.js'), 'utf8');

  beforeEach(() => {
    fs.outputFileSync(outputFilePath, errorFileContent, 'utf8');
  });

  test('should autofix problematic code', async () => {
    await cli(['fix'], {
      cwd: path.resolve(`${dir}/temp`),
      timeout: 30000,
    });
    expect(fs.readFileSync(outputFilePath, 'utf8')).toEqual(expectedFileContent);
  }, 30000);

  afterEach(() => {
    fs.removeSync(`${dir}/temp`);
  });
});

describe(`'exec' command`, () => {
  const semverRegex = /(\d+)\.(\d+)\.(\d+)/;

  test(
    `'exec eslint' should work as expected`,
    async () => {
      const { stdout } = await cli(['exec', 'eslint', '--version'], { timeout: 30000 });
      expect(stdout).toMatch(semverRegex);
    },
    30000,
  );

  test(
    `'exec stylelint' should work as expected`,
    async () => {
      const { stdout } = await cli(['exec', 'stylelint', '--version'], { timeout: 30000 });
      expect(stdout).toMatch(semverRegex);
    },
    30000,
  );

  test(
    `'exec commitlint' should work as expected`,
    async () => {
      const { stdout } = await cli(['exec', 'commitlint', '--version'], { timeout: 30000 });
      expect(stdout).toMatch(semverRegex);
    },
    30000,
  );
});
