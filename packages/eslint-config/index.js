module.exports = {
  // 扩展的规则集
  extends: [
    './rules/base/best-practices',
    './rules/base/possible-errors',
    './rules/base/style',
    './rules/base/variables',
    './rules/base/es6',
    './rules/base/strict',
    './rules/imports',
  ].map(require.resolve),
  // 指定 ESLint 使用的解析器
  parser: '@babel/eslint-parser',
  parserOptions: {
    requireConfigFile: false,
    // 指定 ECMAScript 的版本
    ecmaVersion: 2020,
    // 使用模块化代码（ESM）
    sourceType: 'module',
    ecmaFeatures: {
      // 禁止在模块中使用 return
      globalReturn: false,
      // 启用隐式严格模式
      impliedStrict: true,
      // 允许解析 JSX
      jsx: true,
    },
  },
  root: true,
}