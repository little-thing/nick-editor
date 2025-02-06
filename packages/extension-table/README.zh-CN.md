# @nick-editor/extension-table

[![Version](https://img.shields.io/npm/v/@nick-editor/extension-table.svg?label=version)](https://www.npmjs.com/package/@nick-editor/extension-table)
[![Downloads](https://img.shields.io/npm/dm/@nick-editor/extension-table.svg)](https://npmcharts.com/compare/@nick-editor/extension-table?minimal=true)
[![License](https://img.shields.io/npm/l/@nick-editor/extension-table.svg)](https://www.npmjs.com/package/@nick-editor/extension-table)

[English](./README.md) | [简体中文](./README.zh-CN.md)

## 介绍

这是一个用于 nick-editor 的表格扩展组件。它提供了全面的表格编辑功能，是处理编辑器中表格内容的重要扩展。

## 特性

- 创建和管理可自定义行列的表格
- 支持单元格合并和拆分
- 表格格式化和样式选项
- 表格内键盘导航
- 与其他 nick-editor 扩展良好集成

## 安装

```bash
npm install @nick-editor/extension-table
```

## 使用方法

```typescript
import { Editor } from '@nick-editor/editor'
import { Table } from '@nick-editor/extension-table'

const editor = new Editor({
  extensions: [
    Table,
    // ... 其他扩展
  ],
})
```

## API

### 配置选项

```typescript
Table.configure({
  HTMLAttributes: {
    class: 'my-custom-table',
  },
})
```

### 命令

- `insertTable({ rows: number, cols: number })`: 插入新表格
- `addColumnBefore()`: 在当前列前添加列
- `addColumnAfter()`: 在当前列后添加列
- `deleteColumn()`: 删除当前列
- `addRowBefore()`: 在当前行前添加行
- `addRowAfter()`: 在当前行后添加行
- `deleteRow()`: 删除当前行
- `mergeCells()`: 合并选中的单元格
- `splitCell()`: 拆分当前单元格

## 许可证

本项目采用 [MIT license](../../LICENSE) 开源协议。 