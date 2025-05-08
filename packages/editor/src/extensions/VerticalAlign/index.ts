import { Extension } from '@tiptap/core'

export interface VerticalAlignOptions {
    /**
     * The types where the vertical align attribute can be applied.
     * @default []
     * @example ['paragraph', 'heading']
     */
    // types: string[],

    /**
     * The alignments which are allowed.
     * @default ['top', 'middle', 'bottom']
     * @example ['top', 'middle']
     */
    alignments: string[],

    /**
     * The default alignment.
     * @default null
     * @example 'middle'
     */
    defaultAlignment: string | null,
}

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        verticalAlign: {
            /**
             * Set the vertical align attribute
             * @param alignment The alignment ('top', 'middle', 'bottom')
             * @example editor.commands.setVerticalAlign('middle')
             */
            setVerticalAlign: (alignment: string) => ReturnType,
            /**
             * Unset the vertical align attribute
             * @example editor.commands.unsetVerticalAlign()
             */
            unsetVerticalAlign: () => ReturnType,
        }
    }
}

/**
 * This extension allows you to vertically align content.
 */
export const VerticalAlign = Extension.create<VerticalAlignOptions>({
    name: 'verticalAlign',

    addOptions() {
        return {
            // types: [],
            alignments: ['top', 'middle', 'bottom'],
            defaultAlignment: 'top',
        }
    },

    addGlobalAttributes() {
        return [
            {
                types: ['tableCell'],
                attributes: {
                    verticalAlign: {
                        default: this.options.defaultAlignment,
                        parseHTML: (element) =>
                            element.getAttribute('data-vertical-align') ||
                            this.options.defaultAlignment,
                        renderHTML: (attributes) => ({
                            'data-vertical-align': attributes.verticalAlign
                        }),
                    }
                },
            },
        ]
    },

    addCommands() {
        return {
            setVerticalAlign: (alignment) => ({ commands }) => {
                if (!this.options.alignments.includes(alignment)) {
                    return false;
                }
                return commands.updateAttributes('tableCell', {
                    verticalAlign: alignment
                });
            },
        };
    },

    addKeyboardShortcuts() {
        return {
            'Mod-Shift-t': () => this.editor.commands.setVerticalAlign('top'),
            'Mod-Shift-m': () => this.editor.commands.setVerticalAlign('middle'),
            'Mod-Shift-b': () => this.editor.commands.setVerticalAlign('bottom'),
        }
    },
})