# Format Scaffolding — 领域词汇

本仓库是前端规范脚手架 monorepo：一个 CLI 脚手架 + 四个 lint 规则包。

| 术语 | 含义 |
|------|------|
| 脚手架 | npm 包 `code-lint-fs`。提供 `init` / `scan` / `fix` 与 git commit 卡点。 |
| extends 包 | 四个可被 lint 工具 `extends` 的规则包：`eslint-config-format-scaffolding`、`stylelint-config-format-scaffolding`、`commitlint-config-format-scaffolding`、`markdownlint-config-format-scaffolding`。 |
| 引擎 | 实际执行检查的 CLI/库：`eslint`、`stylelint`、`prettier`、`@commitlint/cli`、`husky`。 |
| 直接依赖 | 出现在用户项目 `package.json` 的 `devDependencies` 中的包。pnpm 只保证这些包在项目根可解析。 |
| 1.x 线 | ESLint 8 + eslintrc + `@typescript-eslint@5` + TypeScript 4。`v1.1.0` 起 pnpm 通过直接依赖工作。 |
| 2.0 线 | 尚未开始。目标：TypeScript ^6、ESLint 9 flat config、砍 ES5/Rax、Vue 3。 |

不要把「只装脚手架就能解析 extends」说成 1.x 的行为；1.1.0 起用户项目必须声明 extends 包与引擎为直接依赖。
