## ADDED Requirements

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

## REMOVED Requirements

### Requirement: Init writes public-hoist-pattern npmrc
**Reason**: pnpm hoist via `.npmrc` is unreliable for peers and overwrites user package-manager settings.
**Migration**: Re-run `code-lint-fs init` on 1.1.0 so extends packages and engines become direct `devDependencies`. Existing hoist `.npmrc` files MAY be deleted by the user; init does not delete them.
