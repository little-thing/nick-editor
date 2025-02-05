import { mergeAttributes, Node } from '@tiptap/core';

export interface ParagraphOptions {
  /**
   * The HTML attributes for a paragraph node.
   * @default {}
   * @example { class: 'foo' }
   */
  HTMLAttributes: Record<string, any>;
}

export interface ParagraphAttributes {
  indent?: number;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    paragraph: {
      /**
       * Toggle a paragraph
       * @example editor.commands.toggleParagraph()
       */
      setParagraph: () => ReturnType;
      /**
       * Handle tab key in paragraph
       */
      handleTab: () => ReturnType;
    };
  }
}

/**
 * This extension allows you to create paragraphs.
 * @see https://www.tiptap.dev/api/nodes/paragraph
 */
export const Paragraph = Node.create<ParagraphOptions>({
  name: 'paragraph',

  priority: 1000,

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

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

  group: 'block',

  content: 'inline*',

  parseHTML() {
    return [{ tag: 'p' }];
  },

  renderHTML({ HTMLAttributes }) {
    return ['p', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },

  addCommands() {
    return {
      setParagraph:
        () =>
        ({ commands }) => {
          return commands.setNode(this.name);
        },
      handleTab:
        () =>
        ({ state, editor, chain }) => {
          const { selection, doc } = state;
          const { $from } = selection;

          // Check if cursor is in a paragraph node
          if ($from.parent.type.name !== this.name) {
            return false;
          }

          // If at start of paragraph, add indent
          if ($from.parentOffset === 0) {
            const currentIndent = $from.parent.attrs.indent || 0;

            // 如果已经有4个缩进，则不再增加
            if (currentIndent >= 4) {
              return true;
            }

            chain()
              .updateAttributes(this.name, {
                indent: currentIndent + 1,
              })
              .run();
            return true;
          }

          // If in middle of text, insert tab character
          chain().insertContent('\t').run();

          return true;
        },
    };
  },

  addKeyboardShortcuts() {
    return {
      'Mod-Alt-0': () => this.editor.commands.setParagraph(),
      Tab: () => this.editor.commands.handleTab(),
    };
  },
});
