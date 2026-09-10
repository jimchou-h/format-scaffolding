## ADDED Requirements

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
