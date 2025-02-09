import { Editor } from '@tiptap/core';
import { ContextMenu } from '@libs/ui';
import { Icon } from '@libs/ui/components/Icon';
import { useCallback } from 'react';
import { TableInputItem } from './TableInputItem';

type TableHandlerMenuProps = {
  editor: Editor;
  children?: React.ReactNode;
};

export function TableHandlerMenu(props: TableHandlerMenuProps) {
  const { editor, children } = props;

  const handleContextMenu = useCallback(
    (event: React.MouseEvent) => {
      // 找到点击的单元格
      const cell = (event.target as HTMLElement).closest('td, th');
      if (!cell) return;

      // 获取鼠标点击位置对应的文档位置
      const cellPos = editor.view.posAtCoords({
        left: event.clientX,
        top: event.clientY,
      });

      editor.chain().focusCell(cellPos.inside).run();
      event.stopPropagation();
    },
    [editor]
  );

  const onAddColumnBefore = useCallback(
    (count: number) => {
      for (let i = 0; i < count; i++) {
        editor.chain().focus().addColumnBefore().run();
      }
    },
    [editor]
  );

  const onAddColumnAfter = useCallback(
    (count: number) => {
      for (let i = 0; i < count; i++) {
        editor.chain().focus().addColumnAfter().run();
      }
    },
    [editor]
  );

  const onDeleteColumn = useCallback(() => {
    editor.chain().focus().deleteColumn().run();
  }, [editor]);

  const onAddRowBefore = useCallback(
    (count: number) => {
      for (let i = 0; i < count; i++) {
        editor.chain().focus().addRowBefore().run();
      }
    },
    [editor]
  );

  const onAddRowAfter = useCallback(
    (count: number) => {
      for (let i = 0; i < count; i++) {
        editor.chain().focus().addRowAfter().run();
      }
    },
    [editor]
  );

  const onDeleteRow = useCallback(() => {
    editor.chain().focus().deleteRow().run();
  }, [editor]);

  const onMergeCells = useCallback(() => {
    return editor.chain().focus().mergeCells().run();
  }, [editor]);

  const onSplitCell = useCallback(() => {
    return editor.chain().focus().splitCell().run();
  }, [editor]);

  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger asChild onContextMenu={handleContextMenu}>
        {children}
      </ContextMenu.Trigger>

      <ContextMenu.Portal>
        <ContextMenu.Content className="table-context-menu">
          <ContextMenu.Group>
            <ContextMenu.Label className="menu-label">列操作</ContextMenu.Label>
            <TableInputItem icon="ArrowLeftToLine" label="向左插入" unit="列" onClick={onAddColumnBefore} />
            <TableInputItem icon="ArrowRightToLine" label="向右插入" unit="列" onClick={onAddColumnAfter} />
            <ContextMenu.Item className="menu-item delete-item" onClick={onDeleteColumn}>
              <Icon name="Trash" className="menu-icon" />
              删除所选列
            </ContextMenu.Item>
          </ContextMenu.Group>

          <ContextMenu.Separator className="menu-separator" />

          <ContextMenu.Group>
            <ContextMenu.Label className="menu-label">行操作</ContextMenu.Label>
            <TableInputItem icon="ArrowUpToLine" label="向上插入" unit="行" onClick={onAddRowBefore} />
            <TableInputItem icon="ArrowDownToLine" label="向下插入" unit="行" onClick={onAddRowAfter} />
            <ContextMenu.Item className="menu-item delete-item" onClick={onDeleteRow}>
              <Icon name="Trash" className="menu-icon" />
              删除所选行
            </ContextMenu.Item>
          </ContextMenu.Group>

          <ContextMenu.Separator className="menu-separator" />

          <ContextMenu.Group>
            <ContextMenu.Label className="menu-label">单元格操作</ContextMenu.Label>
            <ContextMenu.Item className="menu-item" onClick={onMergeCells}>
              <Icon name="Merge" className="menu-icon" />
              合并单元格
            </ContextMenu.Item>
            <ContextMenu.Item className="menu-item" onClick={onSplitCell}>
              <Icon name="Split" className="menu-icon" />
              拆分单元格
            </ContextMenu.Item>
          </ContextMenu.Group>
        </ContextMenu.Content>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  );
}
