import { findParentNode, mergeAttributes, Node } from '@tiptap/core';
import { Attrs } from '@tiptap/pm/model';
import { Plugin } from '@tiptap/pm/state';
import { Decoration, DecorationSet } from '@tiptap/pm/view';

import { findTable, findTableWrapper, getCellsInColumn, isRowSelected, selectRow, listRows } from './utils';

export interface TableCellOptions {
  HTMLAttributes: Record<string, any>;
}

export const TableCell = Node.create<TableCellOptions>({
  name: 'tableCell',

  content: 'block+', // TODO: Do not allow table in table

  tableRole: 'cell',

  isolating: true,

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  parseHTML() {
    return [{ tag: 'td' }];
  },

  renderHTML({ HTMLAttributes }) {
    return ['td', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },
  addKeyboardShortcuts() {
    return {
      'Mod-a': ({ editor }) => {
        const { selection } = editor.state;
        const cell = findParentNode((node) => node.type.name === 'tableCell')(selection);
        if (cell) {
          editor.commands.setTextSelection({
            from: cell.pos + 1,
            to: cell.pos + cell.node.nodeSize - 1,
          });
          return true;
        }
        return false;
      },
    };
  },
  addAttributes() {
    return {
      colspan: {
        default: 1,
        parseHTML: (element) => {
          const colspan = element.getAttribute('colspan');
          const value = colspan ? parseInt(colspan, 10) : 1;

          return value;
        },
      },
      rowspan: {
        default: 1,
        parseHTML: (element) => {
          const rowspan = element.getAttribute('rowspan');
          const value = rowspan ? parseInt(rowspan, 10) : 1;

          return value;
        },
      },
      colwidth: {
        default: null,
        parseHTML: (element) => {
          const colwidth = element.getAttribute('colwidth');
          const value = colwidth ? [parseInt(colwidth, 10)] : null;

          return value;
        },
      },
      style: {
        default: null,
      },
    };
  },

  // addProseMirrorPlugins() {
  //   const { isEditable } = this.editor;
  //
  //   return [
  //     new Plugin({
  //       props: {
  //         decorations: (state) => {
  //           if (!isEditable) {
  //             return DecorationSet.empty;
  //           }
  //
  //           const { doc, selection } = state;
  //           const decorations: Decoration[] = [];
  //
  //           // 1. 找到表格节点
  //           const table = findTable(selection);
  //           if (!table) return;
  //
  //           const tableWrapper = findTableWrapper(selection);
  //           if (!tableWrapper) return;
  //
  //           const rows = listRows(table.node);
  //
  //           doc.descendants((node, pos) => {
  //             console.log('cell');
  //
  //             rows.forEach((row) => {
  //               const currentRowPos = row.pos + table.start;
  //               // 创建行高度移动按钮
  //               decorations.push(
  //                 Decoration.widget(currentRowPos + 1, () => {
  //                   const heightGrip = document.createElement('div');
  //                   heightGrip.className = 'row-height-handle';
  //
  //                   heightGrip.addEventListener('mousedown', (event) => {
  //                     event.preventDefault();
  //                     event.stopImmediatePropagation();
  //
  //                     const $pos = state.doc.resolve(currentRowPos);
  //
  //                     // const cellElement = this.editor.view.nodeDOM(pos) as HTMLElement;
  //
  //                     const startY = event.clientY;
  //                     const startHeight = row.node.attrs.rowheight;
  //
  //                     // let styleTag = document.getElementById('table-row-styles');
  //                     // if (!styleTag) {
  //                     //   styleTag = document.createElement('style');
  //                     //   styleTag.id = 'table-row-styles';
  //                     //   document.head.appendChild(styleTag);
  //                     // }
  //
  //                     heightGrip.style.top = `${startHeight}px`;
  //
  //                     const onMouseMove = (e: MouseEvent) => {
  //                       // styleTag!.textContent = '';
  //                       const deltaY = e.clientY - startY;
  //                       const newHeight = Math.max(30, startHeight + deltaY);
  //
  //                       heightGrip.style.top = `${newHeight}px`;
  //
  //                       // const styleRule = `
  //                       //   div.tableWrapper:nth-of-type(${currentTableIndex + 1}) table tr:nth-child(${rowIndex + 1}) {
  //                       //     height: ${newHeight}px !important;
  //                       //   }
  //                       //   div.tableWrapper:nth-of-type(${currentTableIndex + 1}) table tr:nth-child(${rowIndex + 1}) td {
  //                       //     height: ${newHeight}px !important;
  //                       //   }
  //                       // `;
  //                       // styleTag!.textContent = styleRule;
  //                     };
  //
  //                     const onMouseUp = (e: MouseEvent) => {
  //                       const deltaY = e.clientY - startY;
  //                       const newHeight = Math.max(30, startHeight + deltaY);
  //
  //                       // 点击按钮时触发节点属性修改
  //                       const transaction = state.tr.setNodeMarkup(currentRowPos, undefined, {
  //                         ...row.node.attrs,
  //                         rowheight: newHeight, // 修改或添加属性
  //                       });
  //
  //                       // 更新编辑器状态
  //                       this.editor.view.dispatch(transaction);
  //
  //                       // const tr = tableWrapper!.querySelector(`table tr:nth-child(${rowIndex + 1})`);
  //                       // const finalHeight = tr ? tr.getBoundingClientRect().height : startHeight;
  //
  //                       // styleTag!.textContent = '';
  //
  //                       // const editorTr = this.editor.state.tr;
  //                       // rowNode.forEach(
  //                       //   (cell: { type: { name: string }; attrs: Attrs | null | undefined }, cellOffset: number) => {
  //                       //     if (cell.type.name === 'tableCell') {
  //                       //       const cellPos = rowPos + 1 + cellOffset;
  //                       //       editorTr.setNodeMarkup(cellPos, null, {
  //                       //         ...cell.attrs,
  //                       //         rowheight: finalHeight,
  //                       //       });
  //                       //     }
  //                       //   }
  //                       // );
  //
  //                       // this.editor.view.dispatch(editorTr);
  //                       document.removeEventListener('mousemove', onMouseMove);
  //                       document.removeEventListener('mouseup', onMouseUp);
  //                     };
  //
  //                     document.addEventListener('mousemove', onMouseMove);
  //                     document.addEventListener('mouseup', onMouseUp);
  //                   });
  //
  //                   return heightGrip;
  //                 })
  //               );
  //             });
  //           });
  //
  //           // 创建行操作按钮
  //           const firstColumnCells = getCellsInColumn(0)(selection);
  //
  //           if (firstColumnCells) {
  //             // 创建一个容器div来包裹所有的grip-row
  //             decorations.push(
  //               Decoration.widget(table.pos, () => {
  //                 const container = document.createElement('div');
  //                 container.className = 'grip-row-container';
  //
  //                 rows.forEach(({ pos: rowPos, node }, index) => {
  //                   const currentRowPos = rowPos + table.start;
  //                   const rowElement = this.editor.view.nodeDOM(currentRowPos) as HTMLElement;
  //
  //                   const rowHeight = rowElement?.getAttribute('rowheight') || null;
  //
  //                   const rowSelected = isRowSelected(index)(selection);
  //                   let className = 'grip-row';
  //
  //                   if (rowSelected) {
  //                     className += ' selected';
  //                   }
  //
  //                   if (index === 0) {
  //                     className += ' first';
  //                   }
  //
  //                   if (index === firstColumnCells.length - 1) {
  //                     className += ' last';
  //                   }
  //
  //                   const grip = document.createElement('a');
  //                   grip.className = className;
  //                   grip.style.height = rowHeight ? `${rowHeight}px` : 'auto';
  //
  //                   grip.addEventListener('mousedown', (event) => {
  //                     event.preventDefault();
  //                     event.stopImmediatePropagation();
  //                     this.editor.view.dispatch(selectRow(index)(this.editor.state.tr));
  //                   });
  //
  //                   container.appendChild(grip);
  //                 });
  //
  //                 return container;
  //               })
  //             );
  //           }
  //
  //           return DecorationSet.create(state.doc, decorations);
  //         },
  //       },
  //     }),
  //   ];
  // },
});
