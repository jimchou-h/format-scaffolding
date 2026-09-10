# ADR 0001: pnpm 下用直接依赖解析 extends

## Status

Accepted

## Context

pnpm 不提升传递依赖。生成 lint 配置用包名 `extends` 时，只安装 `code-lint-fs` 会找不到四个 extends 包和引擎。

## Decision

`init` 把 extends 包与引擎写入用户 `devDependencies`。config 包自带插件（`dependencies`），引擎为 `peerDependencies`。不再生成 `.npmrc` hoist。

## Consequences

用户 `package.json` 依赖变多。已有项目升级到 1.1.0 后需再跑 `init`。2.0 的 TS/ESLint 升级不在此决策范围。
