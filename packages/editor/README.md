# @nick-editor/editor

[中文](README.zh-CN.md) | English

A powerful rich text editor that replicates the smooth editing experience of Yuque (语雀), built on top of Tiptap.

## Features

- 🚀 Modern and intuitive interface
- 📝 Rich text editing capabilities
- 🎨 Extensive formatting options
- 🔄 Real-time collaboration support with [Yjs](https://docs.yjs.dev/)
- 📊 Table support with advanced features
- 🖼️ Image handling
- ✅ Task lists and checklists
- 🔗 Link management
- 🎯 Placeholder support
- 🎨 Custom styling with Tailwind CSS
- 🧮 Mathematics support
- 📑 Table of contents
- 🎯 Unique ID support for nodes
- 🖱️ Drag handle support
- 😀 Emoji support
- 📁 File handling capabilities

## Installation

```bash
npm install @nick-editor/editor

# or with yarn
yarn add @nick-editor/editor

# or with pnpm
pnpm add @nick-editor/editor
```

## Usage

```jsx
import { Editor } from '@nick-editor/editor';
import '@nick-editor/editor/index.css';

function MyEditor() {
  return (
    <Editor
      content="Hello, World!"
      onChange={(editor) => {
        console.log(editor.getHTML());
      }}
    />
  );
}
```

## Peer Dependencies

Make sure you have the following peer dependencies installed:

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

## Key Features

### Real-time Collaboration
Built-in support for real-time collaboration using [Yjs](https://docs.yjs.dev/) and Hocuspocus provider. You can easily integrate with Yjs documents:

```jsx
import { Editor } from '@nick-editor/editor';
import * as Y from 'yjs';

const ydoc = new Y.Doc();

function MyEditor() {
  return (
    <Editor
      content="Hello, World!"
      ydoc={ydoc}
      onChange={(editor) => {
        console.log(editor.getHTML());
      }}
    />
  );
}
```

### Rich Formatting
- Text styling (bold, italic, underline)
- Headings
- Lists (bullet, ordered, task lists)
- Code blocks with syntax highlighting
- Tables with advanced manipulation
- Images
- Links
- Math equations
- And more...

### Advanced Features
- Drag and drop support
- Focus mode
- Character count
- Typography enhancements
- Text alignment
- Custom colors and font families
- Table of contents generation

### Developer Experience
- Written in TypeScript
- Modular architecture
- Extensible design
- Comprehensive documentation

## License

MIT

## Contributing

We welcome contributions! Please feel free to submit a Pull Request. 
