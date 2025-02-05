import { mergeAttributes, Node } from '@tiptap/core';
import { Plugin, PluginKey } from '@tiptap/pm/state';

const key = new PluginKey('Figure');

export const Figure = Node.create({
  name: 'figure',

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  group: 'block',

  content: 'block figcaption',

  draggable: true,

  defining: true,

  selectable: true,

  parseHTML() {
    return [
      {
        tag: `figure[data-type="${this.name}"]`,
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['figure', mergeAttributes(HTMLAttributes, { 'data-type': this.name }), 0];
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key:key,
        props: {
          handleDOMEvents: {
            // Prevent dragging child nodes from figure
            dragstart: (view, event) => {
              if (!event.target) {
                return false;
              }

              const pos = view.posAtDOM(event.target as HTMLElement, 0);
              const $pos = view.state.doc.resolve(pos);

              if ($pos.parent.type.name === this.type.name) {
                event.preventDefault();
              }

              return false;
            },
          },
        },
      }),
    ];
  },
});

export default Figure;
