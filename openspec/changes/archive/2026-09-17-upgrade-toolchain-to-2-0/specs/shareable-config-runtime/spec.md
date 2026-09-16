## ADDED Requirements

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
