## Why

1.x 冻结在 ESLint 8 / eslintrc / TypeScript 4 / Vue 2 时代插件上，无法服务当前主流工程。1.1.0 已把 pnpm 直接依赖问题解决；现在要把工具链升到 TypeScript 6 与 ESLint flat config，并砍掉 ES5 / Rax。

## What Changes

- 五个包锁步升为 **2.0.0**。`release/1.x` 继续只修 1.x。
- **BREAKING**：`eslint-config-format-scaffolding` 改为 ESLint 9 **flat config** 数组导出；不再提供 eslintrc。公开 preset 为 JS/TS × default / React / Vue / Node。
- **BREAKING**：删除 ES5、Rax、`essential/` 入口。Vue preset 面向 **Vue 3**（`eslint-plugin-vue@10`）。
- **BREAKING**：`init` 写入 `eslint.config.cjs`（不再写 `.eslintrc.*` / `.eslintignore`）；commit 卡点改为 Husky 9 的 `.husky/` 文件（不再写 `package.json` 的 `husky.hooks`）。
- **BREAKING**：`scan` / `fix` 走 ESLint 9 API（无 `useEslintrc` / `extensions`）；无用户配置时加载 flat preset。
- 引擎与插件（开工时复核后的最佳兼容线，**不用 ESLint 10**：`eslint-plugin-react@7` 与 `eslint-plugin-import@2` 的 peer 尚未覆盖 10）：
  - ESLint `^9.39.0`、`@typescript-eslint/*` / `typescript-eslint` `^8.70.0`、TypeScript `~6.0.3`（typescript-eslint peer 为 `>=4.8.4 <6.1.0`，**不**用 TS 7）
  - Prettier `^3.9.0`、`eslint-config-prettier` `^10`、`eslint-plugin-prettier` `^5`
  - Stylelint `^17.15.0`、`stylelint-scss` `^7`（去掉 Stylelint 15+ 已删除的格式类规则，格式交给 Prettier）
  - Husky `^9.1.0`、`@commitlint/cli` `^21.2.0`
- Node 规则从 `eslint-config-egg` / `eslint-plugin-node` 换成 `eslint-plugin-n`。
- `init` 对 TS 项目额外写入直接依赖 `typescript`。
- 更新 `examples/vue-ts` 与 `CONTEXT.md`。本 change **不包含** npm 发布与 GitHub Release（验收后再做）。

## Capabilities

### New Capabilities

- `eslint-flat-presets`：四个 × 两种语言的 ESLint 9 flat preset，Vue 3，无 ES5/Rax/essential。
- `init-flat-and-hooks`：init 生成 flat ESLint 配置与 Husky 9 hook 文件。
- `scan-eslint-flat`：CLI scan/fix 使用 ESLint 9 flat 配置解析与默认 preset。

### Modified Capabilities

- `init-direct-deps`：直接依赖的引擎版本与 TS 项目补写 `typescript`。
- `shareable-config-runtime`：peer/依赖版本与插件集合随 2.0 工具链更新；Stylelint 包不再携带已删除的格式规则。

## Impact

- 包：五个 workspace 包全部 2.0.0；用户需重跑 `init`，不能把 1.x eslintrc 接到 2.0 包上。
- `code-lint-fs` 的 ESLint/Stylelint/Husky 集成与模板。
- `examples/vue-ts`。
- 领域文档：`CONTEXT.md`；新增 ADR 记录「ESLint 9 而非 10」。
