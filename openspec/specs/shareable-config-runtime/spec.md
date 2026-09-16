# shareable-config-runtime

## Purpose

四个 extends 包把运行所需插件放在 `dependencies` 中随包装发，eslint / stylelint 等引擎以 `peerDependencies` 由消费方提供，避免 pnpm 下插件解析失败。

## Requirements

### Requirement: Shareable configs ship runtime plugins
Each published extends package that references plugins or parsers SHALL declare those packages as `dependencies` (not only `devDependencies`) so installing the config on pnpm installs the plugins.

#### Scenario: ESLint config carries plugins
- **WHEN** a consumer installs `eslint-config-format-scaffolding` as a direct dependency
- **THEN** the installed package MUST list its runtime plugins and parsers (including `@typescript-eslint/parser`, `eslint-plugin-import`, and `vue-eslint-parser`) under `dependencies`

#### Scenario: Stylelint config carries scss plugin
- **WHEN** a consumer installs `stylelint-config-format-scaffolding` as a direct dependency
- **THEN** the installed package MUST list `stylelint-scss` and `postcss-scss` under `dependencies`

### Requirement: Engines are peer dependencies of configs
Shareable configs that wrap a linter CLI SHALL declare that engine as a `peerDependency`. `typescript` MAY be an optional peer of the ESLint config. `markdownlint-config-format-scaffolding` SHALL NOT require a markdownlint peer because it is JSON-only.

#### Scenario: ESLint is a peer
- **WHEN** a consumer inspects `eslint-config-format-scaffolding`
- **THEN** `peerDependencies` MUST include `eslint`

#### Scenario: Stylelint is a peer
- **WHEN** a consumer inspects `stylelint-config-format-scaffolding`
- **THEN** `peerDependencies` MUST include `stylelint` and MUST NOT list `stylelint-scss` as a peer

### Requirement: Scaffolding depends on extends packages
`code-lint-fs` SHALL declare the four extends packages as `dependencies` (not `peerDependencies`) so CLI default scans resolve configs without a user `init`.

#### Scenario: No peer-only extends
- **WHEN** a consumer inspects `code-lint-fs` `package.json`
- **THEN** the four `*-format-scaffolding` config packages MUST appear under `dependencies` and MUST NOT appear under `peerDependencies`

### Requirement: ESLint config 2.0 peers and plugins
`eslint-config-format-scaffolding` SHALL declare `eslint` `^9.39.0` as a peer and SHALL depend on `@eslint/js`, `typescript-eslint` (or `@typescript-eslint/parser` plus plugin), `eslint-plugin-vue`, `vue-eslint-parser`, `eslint-plugin-n`, and the existing React/import plugins. It SHALL NOT depend on `eslint-config-egg` or `eslint-plugin-jsx-plus`.

#### Scenario: Peer is ESLint 9
- **WHEN** a consumer inspects `eslint-config-format-scaffolding` `peerDependencies.eslint`
- **THEN** the range MUST satisfy ESLint 9 and MUST NOT include ESLint 8 or 10 as the intended major

#### Scenario: Egg and jsx-plus are gone
- **WHEN** a consumer inspects `eslint-config-format-scaffolding` `dependencies`
- **THEN** `eslint-config-egg` and `eslint-plugin-jsx-plus` MUST be absent
- **AND** `eslint-plugin-n` MUST be present

### Requirement: Stylelint 17 peers and error-only rules
`stylelint-config-format-scaffolding` SHALL peer on `stylelint` `^17.0.0` and SHALL NOT enable Stylelint rules removed after v15 stylistic cleanup (including `indentation` and `color-hex-case`).

#### Scenario: Stylelint peer is 17
- **WHEN** a consumer inspects `stylelint-config-format-scaffolding`
- **THEN** `peerDependencies.stylelint` MUST be a `^17` range

#### Scenario: No removed stylistic rules
- **WHEN** the published stylelint config is loaded
- **THEN** it MUST NOT set `indentation` or `color-hex-case`
