import { Editor } from '@tiptap/core';
import { icons } from 'lucide-react';



export type MenuIcon = keyof typeof icons | {svg: string};

export interface Command {
  name: string;
  label: string;
  description: string;
  aliases?: string[];
  iconName: MenuIcon;
  action: (editor: Editor) => void;
  shouldBeHidden?: (editor: Editor) => boolean;
}

export interface Group {
  name: string;
  title: string;
  commands: Command[];
}

export interface MenuListProps {
  editor: Editor;
  items: Group[];
  command: (command: Command) => void;
}
