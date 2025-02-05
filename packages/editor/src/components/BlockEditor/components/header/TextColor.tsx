import * as Popover from '@radix-ui/react-popover';
import classNames from 'classnames';
import { memo, useState } from 'react';

import { ColorPicker } from '../../../panels';
import { Surface } from '../../../ui/Surface';
import { Toolbar } from '../../../ui/Toolbar';
import { Icon } from '@/components/ui/Icon';
import { HeaderButton } from '../HeaderButton';

const MemoColorPicker = memo(ColorPicker);

interface TextColorProps {
  currentColor: string;
  onChangeColor: (color: string) => void;
  onClearColor: () => void;
}

export const TextColor = ({ currentColor, onChangeColor, onClearColor }: TextColorProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleChangeColor = (color?: string) => {
        if(color) {
            onChangeColor(color)
        } else {
            onClearColor()
        }
        setIsOpen(false)
    }

  return (
    <div className="flex items-center relative">
      <HeaderButton tooltip={'字体颜色'} icon={<Icon name={'Baseline'} />}></HeaderButton>
      <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
        <Popover.Trigger asChild>
          <HeaderButton
            tooltip={'字体颜色'}
            icon={<Icon className={'text-[8px]'} name={'ChevronDown'} />}
            width={16}
          />
        </Popover.Trigger>
        <Popover.Content side="top" sideOffset={8} asChild>
          <Surface>
            <Toolbar.Button
              tooltip="无填充色"
              onClick={() => handleChangeColor()}
              className="w-full justify-start my-1 "
            >
              <div className={classNames('w-[20px] h-[20px] flex justify-center items-center hover:bg-[#f2f2f2]')}>
                <div
                  style={{ backgroundColor: '#000000' }}
                  className="h-[14px] w-[14px] border-[1px] border-[#00000008] box-border cursor-pointer"
                ></div>
              </div>
              <span className="ml-2">默认</span>
            </Toolbar.Button>
            <MemoColorPicker color={currentColor} onChange={handleChangeColor} />
          </Surface>
        </Popover.Content>
      </Popover.Root>
    </div>
  );
}; 