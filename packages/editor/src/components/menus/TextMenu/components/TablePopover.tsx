import * as Popover from '@radix-ui/react-popover';

import { Icon } from '../../../ui/Icon';
import { Toolbar } from '../../../ui/Toolbar';

type Prop = {
  onMergeCells: () => void;
};

export function TablePopover({ onMergeCells }: Prop) {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Toolbar.Button tooltip="表格">
          <Icon name="Table" />
        </Toolbar.Button>
      </Popover.Trigger>
      <Popover.Content>
        <div className={'bg-white'}>
          <Toolbar.Button tooltip="合并单元格" onClick={onMergeCells}>
            合并单元格
          </Toolbar.Button>
        </div>
      </Popover.Content>
    </Popover.Root>
  );
}
