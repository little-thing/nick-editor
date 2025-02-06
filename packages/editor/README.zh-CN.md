# @nick-editor/editor

中文 | [English](README.md)

一个强大的富文本编辑器，基于 Tiptap 构建，致力于还原语雀的便捷编辑体验。

## 特性

- 🚀 现代化直观的界面
- 📝 丰富的文本编辑功能
- 🎨 全面的格式化选项
- 🔄 基于 [Yjs](https://docs.yjs.dev/) 的实时协作支持
- 📊 强大的表格功能
- 🖼️ 图片处理
- ✅ 任务列表和清单
- 🔗 链接管理
- 🎯 占位符支持
- 🎨 基于 Tailwind CSS 的自定义样式
- 🧮 数学公式支持
- 📑 目录生成
- 🎯 节点唯一 ID 支持
- 🖱️ 拖拽句柄支持
- 😀 表情符号支持
- 📁 文件处理能力

## 安装

```bash
npm install @nick-editor/editor

# 或使用 yarn
yarn add @nick-editor/editor

# 或使用 pnpm
pnpm add @nick-editor/editor
```

## 使用方法

```jsx
import { Editor } from '@nick-editor/editor';
import '@nick-editor/editor/index.css';

function MyEditor() {
  return (
    <Editor
      content="你好，世界！"
      onChange={(editor) => {
        console.log(editor.getHTML());
      }}
    />
  );
}
```

## 对等依赖

请确保安装以下对等依赖：

```json
{
  "@nick-editor/extension-table": "^1.0.0",
  "@nick-editor/extension-table-handler": "^1.0.0",
  "@tiptap/pm": "^2.4.0",
  "lucide-react": "^0.49.0",
  "react": "^18.0.0",
  "react-dom": "^18.0.0"
}
```

## 核心功能

### 实时协作
基于 [Yjs](https://docs.yjs.dev/) 和 Hocuspocus provider 的实时协作支持。你可以轻松集成 Yjs 文档：

```jsx
import { Editor } from '@nick-editor/editor';
import * as Y from 'yjs';

const ydoc = new Y.Doc();

function MyEditor() {
  return (
    <Editor
      content="你好，世界！"
      ydoc={ydoc}
      onChange={(editor) => {
        console.log(editor.getHTML());
      }}
    />
  );
}
```

### 丰富的格式化功能
- 文本样式（粗体、斜体、下划线）
- 标题
- 列表（无序列表、有序列表、任务列表）
- 代码块（支持语法高亮）
- 表格（支持高级操作）
- 图片
- 链接
- 数学公式
- 更多...

### 高级功能
- 拖拽支持
- 焦点模式
- 字符计数
- 排版增强
- 文本对齐
- 自定义颜色和字体
- 目录生成

### 开发者体验
- 使用 TypeScript 编写
- 模块化架构
- 可扩展设计
- 完整的文档

## 许可证

MIT

## 贡献

我们欢迎各种形式的贡献！如果您有任何改进建议，请随时提交 Pull Request。 
