import { PKG_NAME, PKG_VERSION } from './constants';

export const CONFIG_PKG = {
  eslint: 'eslint-config-format-scaffolding',
  stylelint: 'stylelint-config-format-scaffolding',
  commitlint: 'commitlint-config-format-scaffolding',
  markdownlint: 'markdownlint-config-format-scaffolding',
} as const;

/** 与 code-lint-fs 当前依赖线对齐，供 init 写入用户项目 */
export const INIT_ENGINE_VERSIONS = {
  eslint: '^8.7.0',
  stylelint: '^14.3.0',
  prettier: '^2.2.1',
  '@commitlint/cli': '^16.0.0',
  husky: '^3.1.0',
  'eslint-config-prettier': '^8.3.0',
  'eslint-plugin-prettier': '^4.0.0',
} as const;

export interface InitDepOptions {
  enableESLint?: boolean;
  enableStylelint?: boolean;
  enableMarkdownlint?: boolean;
  enablePrettier?: boolean;
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
