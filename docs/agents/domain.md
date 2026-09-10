# Domain Docs

Engineering skills 探索 codebase 时，应如何消费这个 repo 的 domain documentation。

## Before exploring, read these

- repo 根目录的 **`CONTEXT.md`**
- **`docs/adr/`** — 读取与即将处理区域相关的 ADRs

如果这些文件不存在，**静默继续**。

## File structure

Single-context：

```
/
├── CONTEXT.md
├── docs/adr/
└── packages/
```

## Use the glossary's vocabulary

当你的输出命名某个 domain concept 时（issue title、test name），使用 `CONTEXT.md` 中定义的 term。
