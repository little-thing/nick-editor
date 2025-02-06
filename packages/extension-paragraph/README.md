# @nick-editor/extension-paragraph

[![Version](https://img.shields.io/npm/v/@nick-editor/extension-paragraph.svg?label=version)](https://www.npmjs.com/package/@nick-editor/extension-paragraph)
[![Downloads](https://img.shields.io/npm/dm/@nick-editor/extension-paragraph.svg)](https://npmcharts.com/compare/@nick-editor/extension-paragraph?minimal=true)
[![License](https://img.shields.io/npm/l/@nick-editor/extension-paragraph.svg)](https://www.npmjs.com/package/@nick-editor/extension-paragraph)

## 介绍

这是一个用于 nick-editor 的段落扩展组件。它提供了基础的段落功能支持，是编辑器中最基础和重要的扩展之一。

## 特性

- 支持基础的段落文本编辑
- 提供段落的格式化和样式控制
- 与其他 nick-editor 扩展良好集成

## 安装

```bash
npm install @nick-editor/extension-paragraph
```

## 使用方法

```typescript
import { Editor } from '@nick-editor/editor'
import { Paragraph } from '@nick-editor/extension-paragraph'

const editor = new Editor({
  extensions: [
    Paragraph,
    // ... 其他扩展
  ],
})
```

## 许可证

本项目采用 [MIT license](../../LICENSE)) 开源协议。
