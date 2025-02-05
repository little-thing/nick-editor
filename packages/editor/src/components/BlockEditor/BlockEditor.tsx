'use client';

import { EditorContent } from '@tiptap/react';
import { useEffect, useMemo, useRef } from 'react';
import '../../styles/index.css';

import ImageBlockMenu from '../../extensions/ImageBlock/components/ImageBlockMenu';
import { ColumnsMenu } from '../../extensions/MultiColumn/menus';
import { TableColumnMenu, TableRowMenu, TableCellMenu } from '@nick-editor/extension-table-handler';
import { useBlockEditor } from '../../hooks/useBlockEditor';
import { LinkMenu } from '../menus';
import { ContentItemMenu } from '../menus';
import { EditorHeader } from './components/EditorHeader';
import { EditorProps } from './types';
import { EasyScrollContainer } from 'react-easy-scrollbar';
import React from 'react';
import { ClassNameAndStyle } from '@/interfaces/styles';
import { cn } from '@/lib/utils';

// import { ColumnType } from 'antd/lib/list/index';

export const BlockEditor = ({
  ydoc,
  provider,
  children,
  defaultContent,
  header = true,
  editorOptions,
  onImageDrop,
  onChildEditor,
  onDrop = () => {},
  className,
  style,
}: EditorProps & ClassNameAndStyle) => {
  const menuContainerRef = useRef(null);
  const editorRef = useRef<HTMLDivElement | null>(null);
  const { editor, users, characterCount, leftSidebar, collabState } = useBlockEditor({
    ydoc,
    provider,
    defaultContent,
    options: editorOptions,
  });

  useEffect(() => {
    onChildEditor?.(editor);
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <div
      className={cn(' relative flex flex-col flex-1 h-full  overflow-hidden divide-y', className)}
      style={style}
      ref={menuContainerRef}
    >
      <div className={'h-[48px] w-full flex items-center px-4 py-2.4  relative z-50'}>
        <EditorHeader editor={editor} />
      </div>
      <EasyScrollContainer className="flex-1 relative overflow-auto z-[1]" onDrop={onDrop}>
        <EditorContent editor={editor} ref={editorRef} className="w-full " />
        <ContentItemMenu editor={editor} />
        <LinkMenu editor={editor} appendTo={menuContainerRef} />
        <ColumnsMenu editor={editor} appendTo={menuContainerRef} />
        <TableCellMenu editor={editor} appendTo={menuContainerRef} />
        <TableRowMenu editor={editor} appendTo={menuContainerRef} />
        <TableColumnMenu editor={editor} appendTo={menuContainerRef} />
        <ImageBlockMenu editor={editor} appendTo={menuContainerRef} />
        {children}
      </EasyScrollContainer>
    </div>
  );
};

export default BlockEditor;
