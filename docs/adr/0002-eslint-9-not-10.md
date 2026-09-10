# ADR 0002: 2.0 使用 ESLint 9 而不是 10

## Status

Accepted

## Context

开工复核时 ESLint 最新为 10.x。`typescript-eslint@8` 已支持 ESLint 10，但 `eslint-plugin-react@7.37` peer 止于 `^9.7`，`eslint-plugin-import@2.32` peer 止于 `^9`。

## Decision

2.0 锁 ESLint `^9.39.0` + flat config。等 React / import 官方覆盖 ESLint 10 后再考虑 2.1。TypeScript 锁 `~6.0.3`（typescript-eslint peer `<6.1.0`），不用 TS 7。

## Consequences

脚手架不跟踪 ESLint 最新 major。用户若强行装 ESLint 10 可能遇到 peer 冲突。
