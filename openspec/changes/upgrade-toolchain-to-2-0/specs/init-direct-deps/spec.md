## ADDED Requirements

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
