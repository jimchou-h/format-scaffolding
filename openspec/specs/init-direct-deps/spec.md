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

### Requirement: Init writes 2.0 engine ranges
`getInitDevDependencies` SHALL write engine versions aligned with the 2.0 toolchain: ESLint 9, Stylelint 17, Prettier 3, Husky 9, and commitlint 21.

#### Scenario: Default engines are 2.0
- **WHEN** `init` writes `devDependencies` with ESLint enabled
- **THEN** `eslint` MUST be a `^9` range, `husky` MUST be a `^9` range, and `@commitlint/cli` MUST be a `^21` range

#### Scenario: Optional engines are 2.0
- **WHEN** `init` enables stylelint and prettier
- **THEN** `stylelint` MUST be a `^17` range, `prettier` MUST be a `^3` range, `eslint-config-prettier` MUST be a `^10` range, and `eslint-plugin-prettier` MUST be a `^5` range

### Requirement: TypeScript projects get typescript as a direct dependency
For TypeScript `eslintType` values, `init` SHALL write `typescript` as a direct `devDependency` with range `~6.0.3`. JavaScript `eslintType` values SHALL NOT add `typescript`.

#### Scenario: TypeScript init includes compiler
- **WHEN** `init` runs with `eslintType` `typescript` or `typescript/vue`
- **THEN** `devDependencies` MUST include `typescript` with range `~6.0.3`

#### Scenario: JavaScript init omits compiler
- **WHEN** `init` runs with `eslintType` `index` or `react`
- **THEN** `devDependencies` MUST NOT include `typescript`
