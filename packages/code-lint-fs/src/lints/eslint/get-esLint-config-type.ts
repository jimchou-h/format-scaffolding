import glob from 'glob';
import type { PKG } from '../../types';

/**
 * 获取 ESLint 配置类型
 * @param cwd 当前工作目录路径
 * @param pkg package.json 文件内容对象
 * @returns eslint-config-format-scaffolding/index
 * @returns eslint-config-format-scaffolding/react
 * @returns eslint-config-format-scaffolding/typescript/index
 * @returns eslint-config-format-scaffolding/typescript/react
 */
export function getESLintConfigType(cwd: string, pkg: PKG): string {
  // 使用 glob 同步查找当前目录下(排除node_modules)所有.ts和.tsx文件
  const tsFiles = glob.sync('./!(node_modules)/**/*.@(ts|tsx)', { cwd });
  // 使用 glob 同步查找当前目录下(排除node_modules)所有.jsx和.tsx文件
  const reactFiles = glob.sync('./!(node_modules)/**/*.@(jsx|tsx)', { cwd });
  // 使用 glob 同步查找当前目录下(排除node_modules)所有.vue文件
  const vueFiles = glob.sync('./!(node_modules)/**/*.vue', { cwd });
  // 获取package.json中的dependencies依赖项名称数组
  const dependencies = Object.keys(pkg.dependencies || {});
  // 根据是否存在ts/tsx文件决定是否使用typescript配置
  const language = tsFiles.length > 0 ? 'typescript' : '';
  let dsl = ''; // 用于存储前端框架类型(react/vue/rax)

  // dsl判断
  if (reactFiles.length > 0 || dependencies.some((name) => /^react(-|$)/.test(name))) {
    // 如果存在react相关文件或依赖，则使用react配置
    dsl = 'react';
  } else if (vueFiles.length > 0 || dependencies.some((name) => /^vue(-|$)/.test(name))) {
    // 如果存在vue相关文件或依赖，则使用vue配置
    dsl = 'vue';
  } else if (dependencies.some((name) => /^rax(-|$)/.test(name))) {
    // 如果存在rax依赖，则使用rax配置
    dsl = 'rax';
  }

  // 返回最终的eslint配置类型字符串
  return (
    'eslint-config-format-scaffolding/' + `${language}/${dsl}`.replace(/\/$/, '/index').replace(/^\//, '')
  );
}
