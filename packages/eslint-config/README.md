# eslint-config-format-scaffolding

> JavaScript / TypeScript / React / Vue 3 / Node 规范（ESLint 9 **flat config**）

2.0 各入口导出 **flat config 数组**。插件随本包装发，用户项目只需直接依赖 `eslint`（TS 项目再加 `typescript ~6.0.3`）。

```js
// eslint.config.cjs
module.exports = [...require('eslint-config-format-scaffolding')];
```

公开 preset：

| 入口 | 适用 |
|------|------|
| `eslint-config-format-scaffolding` | JS 默认 |
| `.../react` | JS + React |
| `.../vue` | JS + Vue 3 |
| `.../node` | JS + Node |
| `.../typescript` | TS 默认 |
| `.../typescript/react` | TS + React |
| `.../typescript/vue` | TS + Vue 3 |
| `.../typescript/node` | TS + Node |

已移除 ES5、Rax、`essential/`。不要再用 `.eslintrc*` `extends`。

## 安装

```bash
npm i -D eslint@^9.39.0 eslint-config-format-scaffolding
```

TypeScript 项目额外安装编译器（范围需落在 typescript-eslint 的 peer 内）：

```bash
npm i -D typescript@~6.0.3
```

配合 Prettier：

```bash
npm i -D prettier@^3 eslint-config-prettier@^10
```

```js
// eslint.config.cjs
module.exports = [
  ...require('eslint-config-format-scaffolding/typescript/vue'),
  require('eslint-config-prettier'),
];
```

## 覆盖规则

在数组后面追加一项即可：

```js
module.exports = [
  ...require('eslint-config-format-scaffolding/react'),
  {
    rules: {
      'no-console': 'off',
    },
  },
];
```

React 无障碍规则仍可通过 `eslint-config-format-scaffolding/jsx-a11y` 追加。

TS 默认用 `parserOptions.projectService`。自定义 tsconfig 时在后面覆盖 `languageOptions.parserOptions`。

了解更多：[ESLint flat config](https://eslint.org/docs/latest/use/configure/configuration-files)。
