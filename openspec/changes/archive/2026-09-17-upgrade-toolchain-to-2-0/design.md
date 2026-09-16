## Context

1.1.0 已让 pnpm 用户通过直接依赖解析 extends 包。配置形态仍是 ESLint 8 eslintrc，TypeScript 4，Husky 3 写在 `package.json` 的 `husky.hooks`。2.0 要换成 ESLint 9 flat config 与当前能一起工作的引擎大版本。

约束：typescript-eslint@8.70 peer 为 `typescript >=4.8.4 <6.1.0`；TS 7 无可用 compiler API。`eslint-plugin-react@7.37` peer 止于 `^9.7`，`eslint-plugin-import@2.32` peer 止于 `^9`，因此不采用已发布的 ESLint 10。

## Goals / Non-Goals

**Goals:**

- 八个公开 ESLint preset 以 flat config 数组导出，可被 `eslint.config.cjs` `require` 后展开。
- CLI `scan`/`fix` 在无用户配置时加载对应 preset；有 `eslint.config.*` 时交给 ESLint 9 自己解析。
- `init` 写入与 2.0 对齐的直接依赖、flat 配置文件、Husky 9 hook 文件。
- Stylelint 17 只保留有效规则；格式交给 Prettier 3。
- 锁步 `2.0.0`；Vue demo 能 `pnpm scan`。

**Non-Goals:**

- ESLint 10、TypeScript 7、Stylelint 16 冻结线。
- 兼容 1.x eslintrc / `husky.hooks` 自动迁移。
- 发布 npm / 打 `v2.0.0` tag（验收后另做）。
- 把 CLI 自身从 CJS 编译产物改成 ESM-only。

## Decisions

### D1. ESLint 9 而不是 10

- **选择**：peer `eslint: ^9.39.0`（实际 `>=9.7 <10`）。
- **备选**：ESLint 10.10 — 最新，但 React/import 官方 peer 未覆盖，脚手架会给用户装出冲突。
- **备选**：继续 ESLint 8 — 无法交付 flat config 目标。

### D2. TypeScript ~6.0.3，不用 7

- **选择**：TS 项目 `init` 写入 `typescript: ~6.0.3`；eslint-config peer `typescript: >=4.8.4 <6.1.0`（optional，仅 JS 项目可不装）。
- **备选**：`^6.0.0` 会在 6.1 出现时越过 typescript-eslint 上界。

### D3. Shareable config 继续 CJS 导出数组

- **选择**：各入口 `module.exports = [ ...flatConfigs ]`；`init` 生成 `eslint.config.cjs`：
  ```js
  module.exports = [
    ...require('eslint-config-format-scaffolding/<preset>'),
  ]
  ```
- **备选**：包 `"type": "module"` + 用户 `eslint.config.mjs` — 强迫用户项目 ESM，对现有 CJS 工程不友好。
- 子路径保持：`.`, `./react`, `./vue`, `./node`, `./typescript`, `./typescript/react`, `./typescript/vue`, `./typescript/node`。用 `package.json` `exports` 显式声明。

### D4. 规则来源

- JS 默认：`@eslint/js` recommended + 现有 `rules/base/*`、`rules/imports.js` 迁到 flat 的 `rules` 对象；parser 仍为 `@babel/eslint-parser`（JS/JSX）。
- TS：`typescript-eslint` 的 parser + plugin，覆盖 JS 的 babel parser。
- React：`eslint-plugin-react` + `eslint-plugin-react-hooks` + jsx-a11y。
- Vue 3：`eslint-plugin-vue@10` 的 `flat/recommended` 为底，再叠本仓库现有 vue 规则中仍存在的项。
- Node：`eslint-plugin-n` recommended，替换 egg/node。
- 删除：`es5.js`、`essential/**`、`rax`、`eslint-plugin-jsx-plus`、`eslint-config-egg`。

### D5. CLI 调 ESLint 9

ESLint 9 `ESLint` 构造器：

- 有 `eslint.config.*`：只传 `cwd` / `fix` / `ignore`，不设 `overrideConfig`。
- 无用户配置：`overrideConfigFile: true`（忽略祖先配置）+ `overrideConfig` 为展开后的 preset 数组；`files` 由 `lintFiles` 传入。
- 不再使用 `useEslintrc`、`extensions`、`resolvePluginsRelativeTo`、`ignorePath`。忽略用 flat `ignores` 或默认 ignore 模式。
- `conflict-resolve` 额外匹配 `eslint.config.*`，并删除旧 `.eslintrc*`。

### D6. Husky 9

- `init` 不再写 `pkg.husky.hooks`。
- 写入 `.husky/pre-commit`、`.husky/commit-msg`，内容调用 `code-lint-fs commit-file-scan` / `commit-msg-scan`。
- `package.json` `prepare`: `husky`（若尚无 prepare）。
- `commit-msg-scan` 继续调 `commitlint`；Husky 9 用 hook 参数而非 `HUSKY_GIT_PARAMS`（按 commitlint 21 文档）。

### D7. Stylelint 17

- 删除已不存在的 stylistic 规则（`indentation`、`color-hex-case`、`no-extra-semicolons` 等）。
- 保留错误类规则 + `stylelint-scss`。
- peer `stylelint: ^17.0.0`。

### D8. 版本与 Node

- 五包 `2.0.0`，workspace 互依赖 `^2.0.0`。
- `engines.node`: `>=18.18.0`（ESLint 9 最低）。
- `code-lint-fs` 自身用 TypeScript 6 编译；测试仍以现有 Jest/mocha 为主，按需只升被 6/ESLint 9 打断的部分。

## Risks / Trade-offs

- [ESLint 10 很快成为默认] → 等 React/import peer 覆盖后再开 2.1；ADR 写明原因。
- [Vue 2 项目无法用 2.0] → 留在 1.x；文档写清。
- [Stylelint 去掉格式规则后 diff 变大] → 依赖 Prettier；未开 Prettier 的项目只做错误检查。
- [Jest 27 + ESLint 10 types] → 停在 ESLint 9，减少类型断裂。

## Migration Plan

1. 实现 2.0 于 `develop`，不发布。
2. 用户：安装 2.0 → 再跑 `init`（rewrite）→ 删除遗留 `.eslintrc*` / `husky.hooks`。
3. 回滚：继续使用 1.1.x 与 `release/1.x`。

## Open Questions

无。用户要求默认最佳方案并做到可验收。
