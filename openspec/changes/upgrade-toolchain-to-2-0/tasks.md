## 1. ESLint 9 flat：JS 默认 preset

- [x] 1.1 升级 `eslint-config` 依赖到 ESLint 9 / `@eslint/js` / 兼容插件，peer 改为 `eslint ^9.39.0`
- [x] 1.2 根入口改为导出 flat config 数组，mocha 用 ESLint 9 API 验证 JS fixture 无 fatal
- [x] 1.3 声明 `exports` 子路径；删除 `es5` / `essential` / rax 相关入口文件

## 2. TS / React / Vue 3 / Node presets

- [x] 2.1 TypeScript preset：`typescript-eslint@8` + TS 6 fixture，无 fatal 且能报 TS 规则
- [x] 2.2 React 与 `typescript/react` preset 验证 JSX/TSX
- [x] 2.3 Vue 3 与 `typescript/vue` preset 验证 SFC
- [x] 2.4 Node 与 `typescript/node` 改用 `eslint-plugin-n`，去掉 egg

## 3. CLI scan/fix 走 flat

- [x] 3.1 `code-lint-fs` 依赖 ESLint 9，去掉 eslintrc-only 选项，无用户配置时加载 flat preset
- [x] 3.2 有 `eslint.config.cjs` 时尊重用户配置；`.vue` 仍被扫描
- [x] 3.3 现有 `code-lint-fs` 测试（scan/fix/cli）在 ESLint 9 下全绿

## 4. init：flat 文件、Husky 9、2.0 依赖

- [x] 4.1 `getInitDevDependencies` 写入 2.0 引擎范围；TS eslintType 补 `typescript ~6.0.3`
- [x] 4.2 init 生成 `eslint.config.cjs`，不再生成 `.eslintrc*` / `.eslintignore`；Prettier 时追加 prettier 配置
- [x] 4.3 init 写 `.husky/pre-commit` 与 `commit-msg`，不写 `package.json` `husky.hooks`；`PROJECT_TYPES` 去掉 Rax
- [x] 4.4 `conflict-resolve` 识别并处理 `eslint.config.*`

## 5. Stylelint 17 与其余引擎

- [x] 5.1 Stylelint 配置去掉已删除格式规则，peer `^17`，依赖 `stylelint-scss@7`
- [x] 5.2 `code-lint-fs` 升 Prettier 3、commitlint 21、Husky 9；锁步五包 `2.0.0`

## 6. Demo 与领域文档

- [x] 6.1 `examples/vue-ts` 改为 ESLint 9 flat + Vue 3 可 `pnpm scan`
- [x] 6.2 更新 `CONTEXT.md` 与 ADR（ESLint 9 而非 10）
