import { EditorState } from '@tiptap/pm/state';
import { EditorView } from '@tiptap/pm/view';
import { Editor } from '@tiptap/react';

import Table from '@nick-editor/extension-table';
import { isTableSelected } from '../../utils';

export const isColumnGripSelected = ({
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

  let columnNotOnly = true;

  if (container) {
    const table = container.closest('table');

    if (!table) {
      return false;
    }

    const rows = table.querySelectorAll('tr');

    if (rows.length > 0) {
      const firstCell = rows[0]!.querySelector('td, th');

      if (firstCell) {
        const rowspan = firstCell.getAttribute('rowspan') || '1';
        const tableRowCount = rows.length;

        columnNotOnly = !(parseInt(rowspan) === tableRowCount);
      }
    }
  }

  if (!editor.isActive(Table.name) || !node || (isTableSelected(state.selection) && !columnNotOnly)) {
    return false;
  }

  const gripColumn = container && container.querySelector && container.querySelector('a.grip-column.selected');

  return !!gripColumn;
};

export default isColumnGripSelected;
