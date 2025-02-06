# @nick-editor/extension-table

[![Version](https://img.shields.io/npm/v/@nick-editor/extension-table.svg?label=version)](https://www.npmjs.com/package/@nick-editor/extension-table)
[![Downloads](https://img.shields.io/npm/dm/@nick-editor/extension-table.svg)](https://npmcharts.com/compare/@nick-editor/extension-table?minimal=true)
[![License](https://img.shields.io/npm/l/@nick-editor/extension-table.svg)](https://www.npmjs.com/package/@nick-editor/extension-table)

[English](./README.md) | [简体中文](./README.zh-CN.md)

## Introduction

This is a table extension for nick-editor. It provides comprehensive table editing functionality and is an essential extension for handling table content in the editor.

## Features

- Create and manage tables with customizable rows and columns
- Support cell merging and splitting
- Table formatting and styling options
- Keyboard navigation within tables
- Integration with other nick-editor extensions

## Installation

```bash
npm install @nick-editor/extension-table
```

## Usage

```typescript
import { Editor } from '@nick-editor/editor'
import { Table } from '@nick-editor/extension-table'

const editor = new Editor({
  extensions: [
    Table,
    // ... other extensions
  ],
})
```

## API

### Configuration Options

```typescript
Table.configure({
  HTMLAttributes: {
    class: 'my-custom-table',
  },
})
```

### Commands

- `insertTable({ rows: number, cols: number })`: Insert a new table
- `addColumnBefore()`: Add a column before the current column
- `addColumnAfter()`: Add a column after the current column
- `deleteColumn()`: Delete the current column
- `addRowBefore()`: Add a row before the current row
- `addRowAfter()`: Add a row after the current row
- `deleteRow()`: Delete the current row
- `mergeCells()`: Merge selected cells
- `splitCell()`: Split the current cell

## License

This project is licensed under the [MIT license](../../LICENSE).
