import { Editor, ChainedCommands } from '@tiptap/core';
import TiptapParagraph from '@tiptap/extension-paragraph';
import { EditorState } from '@tiptap/pm/state';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    paragraphExtend: {
      handleTab: () => ReturnType;
      handleBackspace: () => ReturnType;
    };
  }
}

export const Paragraph = TiptapParagraph.extend({
  addAttributes() {
    return {
      indent: {
        default: 0,
        parseHTML: (element) => element.getAttribute('data-indent') || 0,
        renderHTML: (attributes) => {
          if (!attributes.indent) return {};

          return {
            'data-indent': attributes.indent,
            style: `padding-left: ${attributes.indent * 2}em`,
          };
        },
      },
    };
  },

  addCommands() {
    return {
      ...this.parent?.(),
      handleTab:
        () =>
        ({ state, editor, chain, commands }) => {
          const { selection } = state;
          const { $from } = selection;

          // Check if cursor is in a paragraph node
          if ($from.parent.type.name !== this.name) {
            return false;
          }

          const { $anchor } = selection;
          const cell = $anchor.node(-1); // 获取父节点

          // 如果在表格单元格内，不处理 Tab
          if (cell?.type.name === 'tableCell') {
            const isInTableContent = commands?.hasTableContentAfterCursor();

            if (isInTableContent !== undefined && !isInTableContent) {
              return false;
            }
          }

          // If at start of paragraph, add indent
          if ($from.parentOffset === 0) {
            const currentIndent = $from.parent.attrs.indent || 0;

            // 如果已经有6个缩进，则不再增加
            if (currentIndent >= 6) {
              return true;
            }

            return chain()
              .setNode(this.name, {
                indent: currentIndent + 1,
              })
              .run();
          }

          // If in middle of text, insert tab character
          chain().insertContent('\t').run();

          return true;
        },
      handleBackspace:
        () =>
        ({ state, chain }) => {
          const { selection } = state;
          const { $from } = selection;

          // 检查是否在段落节点中
          if ($from.parent.type.name !== this.name) {
            return false;
          }

          // 只在光标在段落开始处时处理
          if ($from.parentOffset === 0) {
            const currentIndent = $from.parent.attrs.indent || 0;

            // 如果有缩进，则减少一级
            if (currentIndent > 0) {
              return chain()
                .setNode(this.name, {
                  indent: currentIndent - 1,
                })
                .run();
            }
          }

          return false;
        },
    };
  },
  addKeyboardShortcuts() {
    return {
      ...this.parent?.(),
      Tab: () => this.editor.commands.handleTab(),
      Backspace: () => this.editor.commands.handleBackspace(),
    };
  },
});
