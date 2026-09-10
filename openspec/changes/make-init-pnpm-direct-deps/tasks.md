## 1. Shareable config 运行时依赖

- [ ] 1.1 将 `eslint-config-format-scaffolding` 的运行插件/parser 改为 `dependencies`，`eslint`/`typescript` 改为 peer（typescript 可选）
- [ ] 1.2 将 `stylelint-config-format-scaffolding` 的 `stylelint-scss`/`postcss-scss` 改为 `dependencies`，`stylelint` 改为唯一引擎 peer
- [ ] 1.3 为 `commitlint-config-format-scaffolding` 声明 `@commitlint/cli` peer；markdownlint-config 保持 JSON-only

## 2. Init 直接依赖（pnpm 可解析）

- [ ] 2.1 实现 `getInitDevDependencies`，按选项写入 extends 包与引擎版本
- [ ] 2.2 `init` 将上述依赖写入用户 `package.json` 后执行安装；删除 `_npmrc.ejs`
- [ ] 2.3 测试：默认/可选依赖集合，以及 init 不生成 `.npmrc`

## 3. 脚手架自身依赖

- [ ] 3.1 `code-lint-fs` 将四个 extends 包从 peer 改为 `dependencies`（`^1.1.0`）
- [ ] 3.2 根目录 `.npmrc` 设置 `link-workspace-packages=true`，保证本地 workspace 链接

## 4. 版本与文档

- [ ] 4.1 五个包与 lerna `version` 锁步 `1.1.0`
- [ ] 4.2 README 说明 pnpm 直接依赖及已有项目需再跑 `init`
