# 🛠 Format Scaffolding

[![Maintained with Lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)
[![pnpm](https://img.shields.io/badge/package%20manager-pnpm-orange.svg)](https://pnpm.io/)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](./LICENSE)

## 📖 项目简介
这是一个基于 **Lerna** + **pnpm workspace** 管理的前端规范集合项目，旨在统一团队在代码、提交信息、Markdown、样式等方面的规范与格式化配置，帮助开发者快速集成并保持代码库整洁可维护。

当前主线是 **2.0**（ESLint 9 flat config + TypeScript 6）。1.x（ESLint 8 / eslintrc）维护在 `release/1.x`。

项目包含以下子包：
- **脚手架**：快速初始化项目并引入规范配置
- **配置包**：封装常用 lint 工具的规则，方便在不同项目中复用

---

## 📦 子包说明

| 包名                  | 作用说明 |
|----------------------|----------|
| `code-lint-fs`       | 前端脚手架，整合所有 lint 配置并可快速应用到新项目 |
| `commitlint-config-format-scaffolding`  | Commitlint 配置，统一 Git 提交信息格式 |
| `eslint-config-format-scaffolding`      | ESLint 配置，统一 JavaScript/TypeScript 代码风格 |
| `markdownlint-config-format-scaffolding`| Markdownlint 配置，保证 Markdown 文档格式规范 |
| `stylelint-config-format-scaffolding`   | Stylelint 配置，统一 CSS / SCSS 代码风格 |