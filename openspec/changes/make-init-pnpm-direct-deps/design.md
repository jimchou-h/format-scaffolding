## Context

`code-lint-fs init` 只把脚手架写成用户依赖，生成配置用包名 `extends`。npm 会提升传递依赖，pnpm 不会。四个 extends 包曾是脚手架的 `peerDependencies`，插件只在 config 包的 `devDependencies` 里，发布后不会带给用户。仓库曾用 `_npmrc.ejs` 写 `public-hoist-pattern`，仍不可靠且会覆盖用户 `.npmrc`。

## Goals / Non-Goals

**Goals:**

- pnpm 项目执行 `init` 后，无需手动再装 extends 包或引擎即可解析配置与 VSCode 插件。
- 冻结当前 ESLint 8 / `@typescript-eslint@5` 工具链，五个包锁步 `1.1.0`。

**Non-Goals:**

- TypeScript 6 / ESLint 9 / flat config（2.0）。
- 自动迁移已有项目（`update` 仍只升全局 CLI）。
- 发布与打 tag 的 CI 自动化（验收后由维护者执行 `lerna publish` 与 `git tag -a v1.1.0`）。

## Decisions

### 1. 用户项目直接依赖 extends 包 + 引擎

- **选择**：`init` 写入 `devDependencies`（四个 extends 按启用项；`eslint`/`husky`/`@commitlint/cli` 必装；`stylelint`/`prettier` 等按选项）。
- **备选**：`require.resolve` 穿透脚手架；继续 hoist `.npmrc`。
- **理由**：pnpm 与 VSCode 都从项目根解析包名；直接依赖最稳。

### 2. 插件下沉到 config 包 `dependencies`，引擎为 `peerDependencies`

- **选择**：eslint-config 等自带 parser/plugin；`eslint`/`stylelint`/`@commitlint/cli` 为 peer。markdownlint-config 仅为 JSON，不声明引擎 peer。
- **备选**：插件仍靠脚手架 + hoist。
- **理由**：shareable config 惯例；用户装 config 包即得到插件。

### 3. 脚手架同时 `dependencies` 四个 config 包

- CLI 无用户 eslintrc 时仍能解析默认配置。
- 工作区用 `link-workspace-packages=true`，manifest 写 `^1.1.0`（发布给 npm 的版本范围正确）。

### 4. 删除 `_npmrc.ejs`

- 不再改用户包管理配置。已有 hoist `.npmrc` 不主动清理。

### 5. 版本

- 锁步 `1.1.0`；`2.0.0` 留给 TS/ESLint 升级。

## Risks / Trade-offs

- [用户 package.json 变胖] → 用 init 选项控制 stylelint/prettier/markdownlint。
- [已有 pnpm 项目升级后仍缺直接依赖] → README 要求再跑 `init`；不自动改未知项目。
- [workspace 包未 publish 1.1.0 时 pnpm 去 registry 拉] → 根 `.npmrc` `link-workspace-packages=true`。

## Migration Plan

1. 发布五个包 `1.1.0`。
2. 已有项目：再执行 `code-lint-fs init`（或手动把 `getInitDevDependencies` 列出的包写入 `devDependencies`）。
3. 回滚：钉回 `1.0.x` 并自行恢复 `.npmrc` hoist（若曾依赖）。

## Open Questions

- 无。Grill 已关闭：直接依赖、插件下沉、1.1.0 锁步、2.0 另开。
