import { PKG_NAME, PKG_VERSION } from './constants';

export const CONFIG_PKG = {
  eslint: 'eslint-config-format-scaffolding',
  stylelint: 'stylelint-config-format-scaffolding',
  commitlint: 'commitlint-config-format-scaffolding',
  markdownlint: 'markdownlint-config-format-scaffolding',
} as const;

/** 与 code-lint-fs 当前依赖线对齐，供 init 写入用户项目 */
export const INIT_ENGINE_VERSIONS = {
  eslint: '^9.39.0',
  stylelint: '^17.15.0',
  prettier: '^3.9.0',
  '@commitlint/cli': '^21.2.0',
  husky: '^9.1.0',
  'eslint-config-prettier': '^10.1.0',
  'eslint-plugin-prettier': '^5.5.0',
  typescript: '~6.0.3',
} as const;

const TS_ESLINT_TYPES = new Set([
  'typescript',
  'typescript/react',
  'typescript/vue',
  'typescript/node',
]);

export interface InitDepOptions {
  enableESLint?: boolean;
  enableStylelint?: boolean;
  enableMarkdownlint?: boolean;
  enablePrettier?: boolean;
  eslintType?: string;
}

/**
 * init 写入用户 package.json 的直接 devDependencies。
 * pnpm 不会提升传递依赖，config 与引擎必须出现在用户项目根上。
 */
export function getInitDevDependencies(config: InitDepOptions): Record<string, string> {
  const range = `^${PKG_VERSION}`;
  const deps: Record<string, string> = {
    [PKG_NAME]: range,
    husky: INIT_ENGINE_VERSIONS.husky,
    [CONFIG_PKG.commitlint]: range,
    '@commitlint/cli': INIT_ENGINE_VERSIONS['@commitlint/cli'],
  };

  if (config.enableESLint !== false) {
    deps[CONFIG_PKG.eslint] = range;
    deps.eslint = INIT_ENGINE_VERSIONS.eslint;
  }

  if (config.eslintType && TS_ESLINT_TYPES.has(config.eslintType)) {
    deps.typescript = INIT_ENGINE_VERSIONS.typescript;
  }

  if (config.enableStylelint) {
    deps[CONFIG_PKG.stylelint] = range;
    deps.stylelint = INIT_ENGINE_VERSIONS.stylelint;
  }

  if (config.enableMarkdownlint) {
    deps[CONFIG_PKG.markdownlint] = range;
  }

  if (config.enablePrettier) {
    deps.prettier = INIT_ENGINE_VERSIONS.prettier;
    deps['eslint-config-prettier'] = INIT_ENGINE_VERSIONS['eslint-config-prettier'];
    deps['eslint-plugin-prettier'] = INIT_ENGINE_VERSIONS['eslint-plugin-prettier'];
  }

  return deps;
}
