import { mergeAttributes } from '@tiptap/core';
import TiptapLink from '@tiptap/extension-link';
import { EditorView } from '@tiptap/pm/view';
import { Plugin, PluginKey } from '@tiptap/pm/state';

const key = new PluginKey('LinkDown')

export const Link = TiptapLink.extend({
  inclusive: false,

  parseHTML() {
    return [{ tag: 'a[href]:not([data-type="button"]):not([href *= "javascript:" i])' }];
  },

  renderHTML({ HTMLAttributes }) {
    return ['a', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, { class: 'link' }), 0];
  },

  addProseMirrorPlugins() {
    const { editor } = this;

    return [
      ...(this.parent?.() || []),
      new Plugin({
        key:key,
        props: {
          handleKeyDown: (_view: EditorView, event: KeyboardEvent) => {
            const { selection } = editor.state;

            if (event.key === 'Escape' && selection.empty !== true) {
              editor.commands.focus(selection.to, { scrollIntoView: false });
            }

            return false;
          },
        },
      }),
    ];
  },
});

export default Link;
