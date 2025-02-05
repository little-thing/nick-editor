import { EditorState } from '@tiptap/pm/state';
import { EditorView } from '@tiptap/pm/view';
import { Editor } from '@tiptap/react';

import Table from '@nick-editor/extension-table';
import { isTableSelected } from '../../utils';

export const isRowGripSelected = ({
  editor,
  view,
  state,
  from,
}: {
  editor: Editor;
  view: EditorView;
  state: EditorState;
  from: number;
}) => {
  const domAtPos = view.domAtPos(from).node as HTMLElement;
  const nodeDOM = view.nodeDOM(from) as HTMLElement;
  const node = nodeDOM || domAtPos;
  let container = node;

  while (container && !['TD', 'TH'].includes(container.tagName)) {
    container = container.parentElement!;
  }

  let rowNotOnly = true;

  if (container) {
    // 找到所在的表格
    const table = container.closest('table');

    if (!table) {
      return false;
    }

    const firstRow = table.querySelector('tr');

    if (!firstRow) {
      return false;
    }

    // 获取列数
    rowNotOnly = firstRow.querySelectorAll('td').length > 1;
  }

  if (!editor.isActive(Table.name) || !node || (isTableSelected(state.selection) && !rowNotOnly)) {
    return false;
  }

  const gripRow = container && container.querySelector && container.querySelector('a.grip-row.selected');

  return !!gripRow;
};

export default isRowGripSelected;
