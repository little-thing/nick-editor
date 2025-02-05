import { EditorState } from '@tiptap/pm/state';
import { EditorView } from '@tiptap/pm/view';
import { Editor } from '@tiptap/react';

import Table from '@nick-editor/extension-table';
import { isTableSelected } from '../../utils';

export const isCellGripSelected = ({
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

  if (!editor.isActive(Table.name) || !node || isTableSelected(state.selection)) {
    return false;
  }

  while (container && !['TR', 'TH'].includes(container.tagName)) {
    container = container.parentElement!;
  }

  if (
    (container && container.querySelector && container.querySelector('a.grip-row.selected')) ||
    (container && container.querySelector && container.querySelector('a.grip-column.selected'))
  ) {
    return false;
  }
  const gripCells = container && container.querySelector && container.querySelector('td.selectedCell');

  return !!gripCells;
};

export const isMergedCell = ({ editor, view, state }: { editor: Editor; view: EditorView; state: EditorState }) => {
  // FIXME 需要修复
  // const { ranges } = state.selection;
  // const from = Math.min(...ranges.map((range) => range.$from.pos));
  //
  // const domAtPos = view.domAtPos(from).node as HTMLElement;
  // const nodeDOM = view.nodeDOM(from) as HTMLElement;
  // const node = nodeDOM || domAtPos;
  //
  // if (!editor.isActive(Table.name) || !node || isTableSelected(state.selection)) {
  //   return false;
  // }
  //
  // let container = node;
  // while (container && !['TD'].includes(container.tagName)) {
  //   container = container.parentElement!;
  // }
  //
  // let isMerged = false;
  //
  // const colspan = Number(container.attributes.getNamedItem('colspan')?.value || 1);
  // const rowspan = Number(container.attributes.getNamedItem('rowspan')?.value || 1);
  //
  // if (!isMerged) {
  //   isMerged = colspan > 1 || rowspan > 1;
  // }
  //
  // return isMerged;

  return true;
};

export default isCellGripSelected;
