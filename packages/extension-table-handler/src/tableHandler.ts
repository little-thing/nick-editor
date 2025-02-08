import { mergeAttributes, Node, findParentNode } from '@tiptap/core';
import { Plugin } from '@tiptap/pm/state';
import { Decoration, DecorationSet } from '@tiptap/pm/view';
import { findTable, findTableWrapper, getCellsInColumn, isRowSelected, selectRow, findRow, listRows } from '@/utils';
import { ReactNodeViewRenderer } from '@tiptap/react';
import { TableHandlerView } from '@/TableHandlerView';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    tableWrapper: {
      /**
       * 打开菜单
       * @example editor.commands.openMenu()
       */
      openMenu: (isOpen?: boolean) => ReturnType;
    };
  }
}

export interface TableHandlerOptions {
  HTMLAttributes: Record<string, unknown>;
}

export const TableWrapper = Node.create<TableHandlerOptions>({
  name: 'tableWrapper',

  block: true,

  group: 'block',

  addOptions() {
    return {
      HTMLAttributes: {},
      isOpenMenu: {
        default: true,
      },
    };
  },

  tableRole: 'tableWrapper',

  // 定义节点的内容规则
  content: 'block*', // 允许包含table节点

  // 定义如何从 DOM 解析节点
  parseHTML() {
    return [
      {
        tag: 'div',
        getAttrs: (dom) => {
          if (!(dom instanceof HTMLElement)) {
            return false;
          }
          return mergeAttributes({ class: 'tableHandler' }, this.options.HTMLAttributes);
        },
      },
    ];
  },

  // 定义如何渲染到 DOM
  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes({ class: 'tableHandler' }, this.options.HTMLAttributes, HTMLAttributes), 0]; // 0 表示内容的插入位置
  },

  addCommands() {
    return {
      // 这里可以添加命令实现
      openMenu(isOpen = true) {
        return ({ state, chain }) => {
          return chain()
            .updateAttributes(this.name, {
              isOpenMenu: isOpen,
            })
            .run();
        };
      },
    };
  },

  addProseMirrorPlugins() {
    const { isEditable } = this.editor;

    return [
      new Plugin({
        props: {
          decorations: (state) => {
            if (!isEditable) {
              return DecorationSet.empty;
            }

            const { doc, selection } = state;
            const decorations: Decoration[] = [];

            // 1. 找到表格节点
            const table = findTable(selection);
            if (!table) return;

            const tableWrapper = findTableWrapper(selection);
            if (!tableWrapper) return;

            const rows = listRows(table.node);

            let rowIndex = 0;

            const heightGrip = document.createElement('div');
            const tableElement = this.editor.view.nodeDOM(table.pos) as HTMLElement;

            if (!tableElement) {
              return DecorationSet.empty;
            }

            const tableNode = tableElement.querySelector('table');
            if (!tableNode) {
              return DecorationSet.empty;
            }

            heightGrip.style.width = tableNode.offsetWidth + 'px';

            let isDragging = false;

            const changeHover = (e) => {
              if (isDragging) {
                return;
              }

              heightGrip.style.display = 'none';

              // 获取所有行
              const allRows = tableElement.querySelectorAll('tr');
              const mouseY = e.clientY;

              // 遍历所有行检查是否在敏感区域内
              allRows.forEach((row, index) => {
                const rect = row.getBoundingClientRect();
                const tableRect = tableElement.getBoundingClientRect();
                const threshold = 3;

                // 检查鼠标是否在当前行的底边附近（上下各3像素的区域）
                if (Math.abs(rect.bottom - mouseY) <= threshold) {
                  rowIndex = index;
                  const y = rect.bottom - tableRect.top-3;
                  heightGrip.style.display = 'block';
                  heightGrip.style.top = `${y}px`;
                }
              });
            };

            tableElement.addEventListener('mousemove', changeHover);

            // 创建行高度移动按钮
            decorations.push(
              Decoration.widget(table.pos, () => {
                heightGrip.className = 'row-height-handle';

                heightGrip.addEventListener('mousedown', (event) => {
                  event.preventDefault();
                  event.stopImmediatePropagation();

                  isDragging = true;

                  const row = rows[rowIndex];
                  console.log(rows, rowIndex);

                  if (!row) {
                    return;
                  }

                  const currentRowPos = row.pos + table.start;
                  const rowElement = this.editor.view.nodeDOM(currentRowPos) as HTMLElement;

                  if (!rowElement) {
                    return;
                  }

                  const startY = event.clientY;
                  const startHeight = rowElement.offsetHeight;

                  // heightGrip.style.top = `${startHeight}px`;

                  const onMouseMove = (e: MouseEvent) => {
                    const deltaY = e.clientY - startY;

                    heightGrip.style.transform = `translateY(${deltaY}px)`;
                  };

                  const onMouseUp = (e: MouseEvent) => {
                    heightGrip.style.display = 'none';
                    isDragging = false;

                    const deltaY = e.clientY - startY;
                    const newHeight = Math.max(30, startHeight + deltaY);

                    // 点击按钮时触发节点属性修改
                    const transaction = state.tr.setNodeMarkup(
                      currentRowPos,
                      undefined,
                      mergeAttributes(row.node.attrs, {
                        rowheight: newHeight,
                      })
                    );

                    // 更新编辑器状态
                    this.editor.view.dispatch(transaction);

                    document.removeEventListener('mousemove', onMouseMove);
                    document.removeEventListener('mouseup', onMouseUp);
                    changeHover(e);
                  };

                  document.addEventListener('mousemove', onMouseMove);
                  document.addEventListener('mouseup', onMouseUp);
                });

                return heightGrip;
              })
            );

            // 创建行操作按钮
            const firstColumnCells = getCellsInColumn(0)(selection);

            if (firstColumnCells) {
              // 创建一个容器div来包裹所有的grip-row
              decorations.push(
                Decoration.widget(table.pos, () => {
                  const container = document.createElement('div');
                  container.className = 'grip-row-container';

                  rows.forEach(({ pos: rowPos, node }, index) => {
                    const currentRowPos = rowPos + table.start;
                    const rowElement = this.editor.view.nodeDOM(currentRowPos) as HTMLElement;

                    if (!rowElement) {
                      return;
                    }

                    const rowHeight = rowElement.offsetHeight || null;

                    const rowSelected = isRowSelected(index)(selection);
                    let className = 'grip-row';

                    if (rowSelected) {
                      className += ' selected';
                    }

                    if (index === 0) {
                      className += ' first';
                    }

                    if (index === firstColumnCells.length - 1) {
                      className += ' last';
                    }

                    const grip = document.createElement('a');
                    grip.className = className;
                    grip.style.height = rowHeight ? `${rowHeight}px` : 'auto';

                    grip.addEventListener('mousedown', (event) => {
                      event.preventDefault();
                      event.stopImmediatePropagation();
                      this.editor.view.dispatch(selectRow(index)(this.editor.state.tr));
                    });

                    container.appendChild(grip);
                  });

                  return container;
                })
              );
            }

            return DecorationSet.create(state.doc, decorations);
          },
          handleDOMEvents: {
            contextmenu: (view, event) => {
              this.editor.commands.openMenu();
              const target = event.target as HTMLElement;
              if (target.closest('table')) {
                event.preventDefault();
                return true;
              }
              return false;
            },
          },
        },
      }),
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(TableHandlerView);
  },
});

export default TableWrapper;
