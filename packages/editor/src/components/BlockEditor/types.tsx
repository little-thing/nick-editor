import { TiptapCollabProvider } from '@hocuspocus/provider';
import { Editor, EditorOptions } from '@tiptap/core';
import { Content } from '@tiptap/react';
import type { Doc as YDoc } from 'yjs';

export interface EditorProps {
  hasCollab?: boolean;
  ydoc: YDoc;
  provider?: TiptapCollabProvider | null | undefined;
  children?: React.ReactNode;
  header?: boolean | React.ReactNode;
  defaultContent?: Content;
  editorOptions?: Partial<EditorOptions>;
  onImageDrop?: (name: string, position: number) => void;
  onChildEditor?: (pos: Editor | null) => void;
  onDrop?: (e: React.DragEvent<any>) => any;
}

export type EditorUser = {
  clientId: string;
  name: string;
  color: string;
  initials?: string;
};
