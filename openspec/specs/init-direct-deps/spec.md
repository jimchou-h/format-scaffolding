# init-direct-deps

## Purpose

Init 将脚手架、四个 extends 包以及对应 lint 引擎写入用户项目的直接 `devDependencies`，使 pnpm 在不提升依赖时仍能解析 `extends` 与编辑器插件。

## Requirements

### Requirement: Init writes resolvable direct dependencies
`code-lint-fs init` SHALL write the scaffolding package, enabled shareable configs, and corresponding engines into the consuming project's `devDependencies` so pnpm can resolve `extends` and editor plugins from the project root.

#### Scenario: Default engines always present
- **WHEN** a project runs `init` with ESLint enabled (the default)
- **THEN** `package.json` `devDependencies` MUST include `code-lint-fs`, `eslint-config-format-scaffolding`, `eslint`, `husky`, `commitlint-config-format-scaffolding`, and `@commitlint/cli`

#### Scenario: Optional linters follow init flags
- **WHEN** `init` is run with `enableStylelint`, `enableMarkdownlint`, and `enablePrettier` all true
- **THEN** `devDependencies` MUST also include `stylelint-config-format-scaffolding`, `stylelint`, `markdownlint-config-format-scaffolding`, `prettier`, `eslint-config-prettier`, and `eslint-plugin-prettier`

#### Scenario: Optional linters omitted when disabled
- **WHEN** `init` is run with stylelint, markdownlint, and prettier disabled
- **THEN** `devDependencies` MUST NOT include `stylelint`, `stylelint-config-format-scaffolding`, `markdownlint-config-format-scaffolding`, `prettier`, `eslint-config-prettier`, or `eslint-plugin-prettier`

### Requirement: Init does not write hoist npmrc
`code-lint-fs init` SHALL NOT generate a project `.npmrc` that sets `public-hoist-pattern`.

#### Scenario: No npmrc from template
- **WHEN** `init` writes config files into a project that has no `.npmrc`
- **THEN** the project MUST NOT contain a newly generated `.npmrc`
