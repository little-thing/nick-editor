import TiptapTable from '@nick-editor/extension-table';
import { DOMOutputSpec } from '@tiptap/pm/model';
import { Plugin, PluginKey } from '@tiptap/pm/state';

export const Table = TiptapTable.configure({
  resizable: true,
  lastColumnResizable: false,
  cellMinWidth: 100,
});
export default Table;
