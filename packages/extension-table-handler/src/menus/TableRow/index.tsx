import { BubbleMenu as BaseBubbleMenu } from '@tiptap/react';
import React, { useCallback } from 'react';

import { MenuProps, ShouldShowProps } from '../../types';
import { Icon } from '@libs/ui/components/Icon';
import * as PopoverMenu from '@libs/ui/components/PopoverMenu';
import { Toolbar } from '@libs/ui/components/Toolbar';
import { isMergedCell } from '../TableCell/utils';
import { isRowGripSelected } from './utils';

export const TableRowMenu = React.memo(({ editor, appendTo }: MenuProps): JSX.Element => {
  const shouldShow = useCallback(
    ({ view, state, from }: ShouldShowProps) => {
      if (!state || !from) {
        return false;
      }

      return isRowGripSelected({ editor, view, state, from });
    },
    [editor]
  );

  const onAddRowBefore = useCallback(() => {
    editor.chain().focus().addRowBefore().run();
  }, [editor]);

  const onAddRowAfter = useCallback(() => {
    editor.chain().focus().addRowAfter().run();
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

  return (
    <BaseBubbleMenu
      editor={editor}
      pluginKey="tableRowMenu"
      updateDelay={0}
      tippyOptions={{
        appendTo: () => {
          return appendTo?.current;
        },
        placement: 'auto',
        offset: [15, 0],
        popperOptions: {
          modifiers: [{ name: 'flip', enabled: false }],
        },
      }}
      shouldShow={shouldShow}
    >
      <Toolbar.Wrapper isVertical>
        <PopoverMenu.Item
          iconComponent={<Icon name="ArrowUpToLine" />}
          close={false}
          label="向上插入行"
          onClick={onAddRowBefore}
        />
        <PopoverMenu.Item
          iconComponent={<Icon name="ArrowDownToLine" />}
          close={false}
          label="向下插入行"
          onClick={onAddRowAfter}
        />
        <PopoverMenu.Item icon="Trash" close={false} label="删除行" onClick={onDeleteRow} />
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

TableRowMenu.displayName = 'TableRowMenu';

export default TableRowMenu;
