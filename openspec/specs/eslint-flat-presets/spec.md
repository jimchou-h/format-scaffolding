# eslint-flat-presets

## Purpose

`eslint-config-format-scaffolding` 以 ESLint 9 flat config 数组导出八个公开 preset（JS/TS × default / React / Vue 3 / Node），不再提供 eslintrc、ES5、Rax 或 `essential/` 入口。

## Requirements

### Requirement: Flat config presets cover JS and TS stacks
`eslint-config-format-scaffolding` SHALL export ESLint 9 flat config arrays (not eslintrc objects) for the eight public presets: default, React, Vue, and Node, each in JavaScript and TypeScript.

#### Scenario: Default JS preset loads
- **WHEN** ESLint 9 lints a JavaScript fixture with `overrideConfig` set to the package root export
- **THEN** `calculateConfigForFile` MUST return a config object and lint MUST produce zero fatal parser errors

#### Scenario: TypeScript preset loads
- **WHEN** ESLint 9 lints a TypeScript fixture with the `typescript` preset
- **THEN** lint MUST produce zero fatal parser errors and MUST apply `@typescript-eslint` rules

#### Scenario: React presets load
- **WHEN** ESLint 9 lints a JSX or TSX fixture with the `react` or `typescript/react` preset
- **THEN** lint MUST produce zero fatal parser errors

#### Scenario: Vue 3 presets load
- **WHEN** ESLint 9 lints a Vue 3 SFC fixture with the `vue` or `typescript/vue` preset
- **THEN** lint MUST produce zero fatal parser errors and MUST report Vue template or script rule violations present in the fixture

#### Scenario: Node presets load
- **WHEN** ESLint 9 lints a Node fixture with the `node` or `typescript/node` preset
- **THEN** lint MUST produce zero fatal parser errors

### Requirement: Removed legacy ESLint entries
The published ESLint config package SHALL NOT export ES5, Rax, or `essential/` presets.

#### Scenario: ES5 entry is absent
- **WHEN** a consumer resolves `eslint-config-format-scaffolding/es5`
- **THEN** the resolution MUST fail

#### Scenario: Rax is not a project type
- **WHEN** `init` presents language/framework choices
- **THEN** the choices MUST NOT include Rax
