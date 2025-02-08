import { NodeViewProps } from '@tiptap/core';
import { NodeViewWrapper, NodeViewContent } from '@tiptap/react';
import { ContextMenu } from '@libs/ui';
import { Icon } from '@libs/ui/components/Icon';
import { useCallback, useRef } from 'react';
import { isMergedCell } from './menus/TableCell/utils';
import { TableInputItem } from './menus/TableInputItem';

export function TableHandlerView(props: NodeViewProps) {
  const { node, editor } = props;
  const menuRef = useRef<HTMLDivElement>(null);

  const onAddColumnBefore = useCallback((count: number) => {
    for(let i = 0; i < count; i++) {
      editor.chain().focus().addColumnBefore().run();
    }
  }, [editor]);

  const onAddColumnAfter = useCallback((count: number) => {
    for(let i = 0; i < count; i++) {
      editor.chain().focus().addColumnAfter().run();
    }
  }, [editor]);

  const onDeleteColumn = useCallback(() => {
    editor.chain().focus().deleteColumn().run();
  }, [editor]);

  const onAddRowBefore = useCallback((count: number) => {
    for(let i = 0; i < count; i++) {
      editor.chain().focus().addRowBefore().run();
    }
  }, [editor]);

  const onAddRowAfter = useCallback((count: number) => {
    for(let i = 0; i < count; i++) {
      editor.chain().focus().addRowAfter().run();
    }
  }, [editor]);

  const onDeleteRow = useCallback(() => {
    editor.chain().focus().deleteRow().run();
  }, [editor]);

  const onMergeCells = useCallback(() => {
    return editor.chain().focus().mergeCells().run();
  }, [editor]);

  const onSplitCell = useCallback(() => {
    return editor.chain().focus().splitCell().run();
  }, [editor]);

  const handleMouseLeave = useCallback(() => {
    const menu = menuRef.current?.querySelector('[role="menu"]');
    if (menu) {
      // 触发 Esc 键事件来关闭菜单
      const event = new KeyboardEvent('keydown', {
        key: 'Escape',
        code: 'Escape',
        keyCode: 27,
        bubbles: true
      });
      menu.dispatchEvent(event);
    }
  }, []);

  return (
    <NodeViewWrapper 
      className="tableHandler"
      data-type={node.type.name}
      {...node.attrs}
      onMouseLeave={handleMouseLeave}
      ref={menuRef}
    >
      <ContextMenu.Root>
        <ContextMenu.Trigger asChild>
           <NodeViewContent />
        </ContextMenu.Trigger>

        <ContextMenu.Portal>
          <ContextMenu.Content className="table-context-menu">
            <ContextMenu.Group>
              <ContextMenu.Label className="menu-label">列操作</ContextMenu.Label>
              <TableInputItem 
                icon="ArrowLeftToLine"
                label="向左插入"
                unit="列"
                onClick={onAddColumnBefore}
              />
              <TableInputItem 
                icon="ArrowRightToLine"
                label="向右插入"
                unit="列"
                onClick={onAddColumnAfter}
              />
              <ContextMenu.Item className="menu-item delete-item" onClick={onDeleteColumn}>
                <Icon name="Trash" className="menu-icon" />
                删除所选列
              </ContextMenu.Item>
            </ContextMenu.Group>

            <ContextMenu.Separator className="menu-separator" />

            <ContextMenu.Group>
              <ContextMenu.Label className="menu-label">行操作</ContextMenu.Label>
              <TableInputItem 
                icon="ArrowUpToLine"
                label="向上插入"
                unit="行"
                onClick={onAddRowBefore}
              />
              <TableInputItem 
                icon="ArrowDownToLine"
                label="向下插入"
                unit="行"
                onClick={onAddRowAfter}
              />
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
              {isMergedCell({ editor, view: editor.view, state: editor.state }) && (
                <ContextMenu.Item className="menu-item" onClick={onSplitCell}>
                  <Icon name="Split" className="menu-icon" />
                  拆分单元格
                </ContextMenu.Item>
              )}
            </ContextMenu.Group>
          </ContextMenu.Content>
        </ContextMenu.Portal>
      </ContextMenu.Root>
    </NodeViewWrapper>
  );
}
