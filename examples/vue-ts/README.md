# Vue demo（验证 2.0）

独立 pnpm 项目，模拟用户接入 `code-lint-fs@2.0` 后的 **Vue 3 + TypeScript** 仓库。四个规则包和 eslint / stylelint 等引擎都是**直接依赖**，ESLint 使用 **flat config**（`eslint.config.cjs`）。

## 怎么跑

在仓库根目录：

```bash
pnpm --filter code-lint-fs build
pnpm install
```

然后：

```bash
cd examples/vue-ts
pnpm scan
pnpm fix
pnpm dev
```

开发服务器固定 **<http://localhost:6100/>**，`strictPort: true`。不要用 5173（本机常被其他项目占用），也不要用 6000–6063（Chrome / Edge 会报 `ERR_UNSAFE_PORT`）。

或用 Cursor / VS Code **直接打开 `examples/vue-ts` 文件夹**，装推荐插件后看 `App.vue` 的 ESLint 提示。

## 建议怎么验

1. `pnpm scan` 应能跑起来（不要报找不到 `eslint-config-format-scaffolding`）。
2. `src/lint-playground.ts`、`src/components/LintBroken.vue`、`src/styles.css`、`notes.md` 里有故意违规，scan 应能扫到。
3. `pnpm fix` 会修一部分（例如分号）；Vue 的 `v-for`/`v-if` 需要你自己改。Stylelint 17 不再管颜色大小写等格式，格式交给 Prettier。
4. `pnpm dev` 打开页面，确认示例能跑。
5. 确认 config 包在**本项目** `node_modules` 里，不是只靠提升。
