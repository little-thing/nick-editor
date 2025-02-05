# @nick-editor/extension-table-handler

这是一个用于处理表格操作的 Tiptap 扩展。

## 安装

```bash
npm install @nick-editor/extension-table-handler
```

## 使用

```js
import { Editor } from '@tiptap/core'
import TableHandler from '@nick-editor/extension-table-handler'

new Editor({
  extensions: [
    TableHandler,
    // ... 其他扩展
  ],
}) 