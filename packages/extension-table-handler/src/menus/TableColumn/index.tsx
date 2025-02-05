import { BubbleMenu as BaseBubbleMenu } from '@tiptap/react';
import React, { useCallback } from 'react';

import { MenuProps, ShouldShowProps } from '../../types';
import { Icon } from '@libs/ui/components/Icon';
import * as PopoverMenu from '@libs/ui/components/PopoverMenu';
import { Toolbar } from '@libs/ui/components/Toolbar';
import { isMergedCell } from '../TableCell/utils';
import { isColumnGripSelected } from './utils';

export const TableColumnMenu = React.memo(({ editor, appendTo }: MenuProps): JSX.Element => {
  const shouldShow = useCallback(
    ({ view, state, from }: ShouldShowProps) => {
      if (!state) {
        return false;
      }

      return isColumnGripSelected({ editor, view, state, from: from || 0 });
    },
    [editor]
  );

  const onAddColumnBefore = useCallback(() => {
    editor.chain().focus().addColumnBefore().run();
  }, [editor]);

  const onAddColumnAfter = useCallback(() => {
    editor.chain().focus().addColumnAfter().run();
  }, [editor]);

  const onDeleteColumn = useCallback(() => {
    editor.chain().focus().deleteColumn().run();
  }, [editor]);

  const onMergeCells = useCallback(() => {
    return editor.chain().focus().mergeCells().run();
  }, [editor]);

  const onSplitCell = useCallback(() => {
    return editor.chain().focus().splitCell().run();
  }, [editor]);

  return (
    <BaseBubbleMenu
      editor={editor}
      pluginKey="tableColumnMenu"
      updateDelay={0}
      tippyOptions={{
        appendTo: () => {
          return appendTo?.current;
        },
        placement: 'auto',
        offset: [30, 8],
        popperOptions: {
          modifiers: [{ name: 'flip', enabled: false }],
        },
      }}
      shouldShow={shouldShow}
    >
      <Toolbar.Wrapper isVertical>
        <PopoverMenu.Item
          iconComponent={<Icon name="ArrowLeftToLine" />}
          close={false}
          label="向左插入列"
          onClick={onAddColumnBefore}
        />
        <PopoverMenu.Item
          iconComponent={<Icon name="ArrowRightToLine" />}
          close={false}
          label="向右插入列"
          onClick={onAddColumnAfter}
        />
        <PopoverMenu.Item icon="Trash" close={false} label="删除列" onClick={onDeleteColumn} />
        <hr />
        <PopoverMenu.Item
          iconComponent={<Icon name={'Merge'} />}
          close={false}
          label="合并单元格"
          onClick={onMergeCells}
        />
        {isMergedCell({ editor, view: editor.view, state: editor.state }) && (
          <PopoverMenu.Item
            iconComponent={<Icon name="Split" />}
            close={false}
            label="拆分单元格"
            onClick={onSplitCell}
          />
        )}
      </Toolbar.Wrapper>
    </BaseBubbleMenu>
  );
});

TableColumnMenu.displayName = 'TableColumnMenu';

export default TableColumnMenu;
