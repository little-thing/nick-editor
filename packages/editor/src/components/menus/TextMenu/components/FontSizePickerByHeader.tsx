import * as Dropdown from '@radix-ui/react-dropdown-menu';
import { useCallback, useState } from 'react';

import { DropdownButton } from '../../../ui/Dropdown';
import DownVector from '@/assets/svg/DownVector.svg';
import { Surface } from '../../../ui/Surface';
import { Toolbar } from '../../../ui/Toolbar';
import { FontSizePickerProps } from './FontSizePicker';

const FONT_SIZES = [
  { label: '12', value: '12px' },
  { label: '14', value: '14px' },
  { label: '16', value: '16px' },
  { label: '18', value: '18px' },
  { label: '24', value: '24px' },
  { label: '26', value: '26px' },
  { label: '28', value: '28px' },
  { label: '30', value: '30px' },
];

export const FontSizePickerByHeader = ({ onChange, value }: FontSizePickerProps) => {
  const currentValue = FONT_SIZES.find((size) => size.value === value) || FONT_SIZES[2];
  const currentSizeLabel = currentValue?.label;

  const [open, setOpen] = useState(false);

  const selectSize = useCallback(
    (size: string) => () => {
      onChange(size);
      setOpen(false);
    },
    [onChange]
  );

  return (
    <Dropdown.Root open={open} onOpenChange={setOpen}>
      <Dropdown.Trigger asChild className="h-6 rounded">
        <Toolbar.Button disabled={false}>
          {currentSizeLabel}
          <img src={DownVector} alt="" />
        </Toolbar.Button>
      </Dropdown.Trigger>
      <Dropdown.Content asChild>
        <Surface className="flex flex-col py-2">
          {FONT_SIZES.map((size) => (
            <DropdownButton
              isActive={value === size.value}
              onClick={selectSize(size.value)}
              key={`${size.label}_${size.value}`}
              className=" my-0.5 py-[3px]  z-[999999]"
            >
              <span className="text-xs px-1" style={{ fontFamily: 'PingFang SC' }}>
                {size.label}
              </span>
            </DropdownButton>
          ))}
        </Surface>
      </Dropdown.Content>
    </Dropdown.Root>
  );
};
