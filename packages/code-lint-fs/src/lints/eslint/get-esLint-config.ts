import { ESLint } from 'eslint';
import glob from 'glob';
import type { Config, PKG, ScanOptions } from '../../types';
import { ESLINT_IGNORE_PATTERN } from '../../utils/constants';
import { getESLintConfigType } from './get-esLint-config-type';

function loadPreset(name: string): any[] {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const loaded = require(name);
  return Array.isArray(loaded) ? loaded : [loaded];
}

/**
 * 获取 ESLint 9 flat 配置
 */
export function getESLintConfig(opts: ScanOptions, pkg: PKG, config: Config): ESLint.Options {
  const { cwd, fix, ignore } = opts;
  const lintConfig: ESLint.Options = {
    cwd,
    fix,
    errorOnUnmatchedPattern: false,
  };

  if (ignore === false) {
    lintConfig.ignore = false;
  }

  if (config.eslintOptions) {
    Object.assign(lintConfig, config.eslintOptions);
  } else {
    const lintConfigFiles = glob.sync('eslint.config.@(js|cjs|mjs|ts|mts|cts)', { cwd });
    if (lintConfigFiles.length === 0) {
      const presetName = getESLintConfigType(cwd, pkg);
      const prettierConfig = config.enablePrettier ? loadPreset('eslint-config-prettier') : [];
      lintConfig.overrideConfigFile = true;
      lintConfig.overrideConfig = [
        {
          ignores: ESLINT_IGNORE_PATTERN.map((pattern) =>
            pattern.includes('*') ? pattern : `**/${pattern.replace(/\/$/, '')}/**`,
          ),
        },
        ...loadPreset(presetName),
        ...prettierConfig,
      ];
    }
  }

  return lintConfig;
}
