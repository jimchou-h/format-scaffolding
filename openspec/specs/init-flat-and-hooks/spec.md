# init-flat-and-hooks

## Purpose

`code-lint-fs init` 为 2.0 生成 ESLint 9 flat 配置文件与 Husky 9 hook 文件，不再写 `.eslintrc*` / `.eslintignore`，也不再写 `package.json` 的 `husky.hooks`。

## Requirements

### Requirement: Init writes ESLint flat config file
`code-lint-fs init` SHALL write `eslint.config.cjs` that spreads the selected `eslint-config-format-scaffolding` preset. It SHALL NOT write `.eslintrc*` or `.eslintignore`.

#### Scenario: Flat config for Vue TypeScript
- **WHEN** `init` runs with `eslintType` `typescript/vue` and ESLint enabled
- **THEN** the project MUST contain `eslint.config.cjs` that requires `eslint-config-format-scaffolding/typescript/vue`
- **AND** the project MUST NOT contain a newly generated `.eslintrc.js`, `.eslintrc.cjs`, or `.eslintignore`

#### Scenario: Prettier appended to flat config
- **WHEN** `init` runs with Prettier enabled
- **THEN** `eslint.config.cjs` MUST include `eslint-config-prettier` in the exported array

### Requirement: Init writes Husky 9 hook files
`code-lint-fs init` SHALL create `.husky/pre-commit` and `.husky/commit-msg` that invoke the scaffolding scan commands. It SHALL NOT write `package.json` `husky.hooks`.

#### Scenario: Hook files instead of package.json husky config
- **WHEN** `init` finishes on a project
- **THEN** `.husky/pre-commit` MUST exist and `.husky/commit-msg` MUST exist
- **AND** `package.json` MUST NOT contain `husky.hooks`
