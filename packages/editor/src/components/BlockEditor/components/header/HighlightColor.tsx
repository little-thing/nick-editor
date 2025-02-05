import * as Popover from '@radix-ui/react-popover';
import { Editor } from '@tiptap/react';
import { memo, useState } from 'react';

import { ColorPicker } from '../../../panels';
import { Surface } from '../../../ui/Surface';
import { Toolbar } from '../../../ui/Toolbar';
import { Icon } from '@/components/ui/Icon';
import { HeaderButton } from '../HeaderButton';

const MemoColorPicker = memo(ColorPicker);

interface HighlightColorProps {
  currentHighlight: string;
  onChangeHighlight: (color: string) => void;
  onClearHighlight: () => void;
  isActive: boolean;
}

export const HighlightColor = ({ 
  currentHighlight, 
  onChangeHighlight, 
  onClearHighlight,
  isActive 
}: HighlightColorProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleChangeColor = (color?: string) => {
        if(color) {
            onChangeHighlight(color)
        } else {
            onClearHighlight()
        }
        setIsOpen(false)
    }

  return (
    <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
      <Popover.Trigger asChild>
        <HeaderButton tooltip={'标记'} icon={<Icon name={'Highlighter'} />} isActive={isActive} />
      </Popover.Trigger>
      <Popover.Content side="top" sideOffset={8} asChild>
        <Surface>
          <Toolbar.Button
            tooltip="无填充色"
            onClick={() => handleChangeColor()}
            className="w-full justify-start my-1 "
          >
            <span className="lake-colorboard-group-item-special lake-colorboard-group-item ">
              <span></span>
            </span>
            <span className="ml-2">无填充色</span>
          </Toolbar.Button>
          <MemoColorPicker color={currentHighlight} onChange={handleChangeColor} />
        </Surface>
      </Popover.Content>
    </Popover.Root>
  );
}; 