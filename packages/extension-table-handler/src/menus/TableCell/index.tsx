import { BubbleMenu as BaseBubbleMenu } from '@tiptap/react';
import React, { useCallback, useMemo } from 'react';

import { MenuProps, ShouldShowProps } from '../../types';
import { Icon } from '@libs/ui/components/Icon';
import * as PopoverMenu from '@libs/ui/components/PopoverMenu';
import { Toolbar } from '@libs/ui/components/Toolbar';
import { isCellGripSelected, isMergedCell } from './utils';

export const TableCellMenu = React.memo(({ editor, appendTo }: MenuProps): JSX.Element => {
  // FIXME - 改为使用 右键菜单，现在还没有编写功能
  // const handleContextMenu = (event: any) => {
  //   event.preventDefault();
  //   if (editor && editor.isActive('table')) {
  //     // setContextMenu({ isVisible: true, x: event.clientX, y: event.clientY });
  //   }
  // };
  //
  // useEffect(() => {
  //   const tableElements = document.querySelectorAll('table');
  //   tableElements.forEach((table) => {
  //     table.addEventListener('contextmenu', handleContextMenu);
  //   });
  //   return () => {
  //     tableElements.forEach((table) => {
  //       table.removeEventListener('contextmenu', handleContextMenu);
  //     });
  //   };
  // }, [editor, handleContextMenu]);

  const shouldShow = useCallback(
    ({ view, state, from }: ShouldShowProps) => {
      if (!state) {
        return false;
      }

      return isCellGripSelected({ editor, view, state, from: from || 0 });
    },
    [editor]
  );

  const isMerged = useMemo(() => {
    return isMergedCell({ editor, view: editor.view, state: editor.state });
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
      pluginKey="tableCellMenu"
      updateDelay={0}
      tippyOptions={{
        appendTo: () => {
          return appendTo?.current;
        },
        offset: [0, 15],
        placement: 'bottom',
        popperOptions: {
          modifiers: [{ name: 'flip', enabled: false }],
        },
      }}
      shouldShow={shouldShow}
    >
      <Toolbar.Wrapper isVertical>
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

TableCellMenu.displayName = 'TableCellMenu';

export default TableCellMenu;
