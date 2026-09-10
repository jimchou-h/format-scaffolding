## Why

pnpm 不会把脚手架的传递依赖提升到用户项目根 `node_modules`。生成配置用包名字符串 `extends` 时，用户必须自己再装四个 extends 包，一键接入在 pnpm 项目里失效。需要在 1.x 冻结线把这件事修好，再另开 2.0 升最新 TypeScript。

## What Changes

- `code-lint-fs init` 把四个 extends 包和对应引擎写入用户项目的直接 `devDependencies` 并安装。
- 四个 extends 包把运行所需插件改为 `dependencies`，引擎改为 `peerDependencies`。
- `code-lint-fs` 自己把四个 extends 包从 `peerDependencies` 改为 `dependencies`。
- **BREAKING**：不再生成用户 `.npmrc` 的 `public-hoist-pattern`。
- 五个包锁步发布为 `1.1.0`。已有项目需再跑一次 `init`。
- 本 change **不包含** 2.0（TypeScript 6 / ESLint 9 / flat config）。

## Capabilities

### New Capabilities

- `init-direct-deps`：init 将规范所需包声明为用户项目直接依赖，使 pnpm 能解析 extends 与引擎。
- `shareable-config-runtime`：四个 extends 包自带运行所需插件，引擎由消费方以 peer 提供。

### Modified Capabilities

- （无已发布主规格；`openspec/specs/` 为空。）

## Impact

- 包：`code-lint-fs`、`eslint-config-format-scaffolding`、`stylelint-config-format-scaffolding`、`commitlint-config-format-scaffolding`、`markdownlint-config-format-scaffolding`
- 用户项目：`package.json` 直接依赖变多；不再写入 `.npmrc`
- 发布：锁步 `1.1.0`，git 附注 tag `v1.1.0`，`release/1.x` 维护线（发布动作可在验收后执行）
