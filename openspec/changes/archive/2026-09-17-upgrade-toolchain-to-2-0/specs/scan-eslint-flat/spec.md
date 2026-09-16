## ADDED Requirements

### Requirement: Scan uses ESLint 9 flat config
`code-lint-fs scan` and `fix` SHALL invoke the ESLint 9 Node API without eslintrc-only options (`useEslintrc`, `extensions`, `resolvePluginsRelativeTo`, `ignorePath`).

#### Scenario: User eslint.config.cjs is respected
- **WHEN** the project has `eslint.config.cjs` and the user runs `scan`
- **THEN** ESLint MUST load that flat config and MUST NOT merge a 1.x `.eslintrc` file

#### Scenario: Default preset when no user ESLint config
- **WHEN** the project has no `eslint.config.*` and no `package.json` `eslintConfig`
- **THEN** `scan` MUST lint files using the inferred `eslint-config-format-scaffolding` flat preset
- **AND** the process MUST NOT throw because `useEslintrc` is undefined

#### Scenario: Vue SFC is linted without extensions option
- **WHEN** `scan` runs on a Vue project with `.vue` files
- **THEN** those files MUST be included in ESLint results when they match the scan glob
