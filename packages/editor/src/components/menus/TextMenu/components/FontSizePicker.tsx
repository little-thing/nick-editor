import * as Dropdown from '@radix-ui/react-dropdown-menu';
import { useCallback } from 'react';

import { DropdownButton } from '../../../ui/Dropdown';
import { Icon } from '../../../ui/Icon';
import { Surface } from '../../../ui/Surface';
import { Toolbar } from '../../../ui/Toolbar';

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

export type FontSizePickerProps = {
  onChange: (value: string) => void; // eslint-disable-line no-unused-vars
  value: string;
};

export const FontSizePicker = ({ onChange, value }: FontSizePickerProps) => {
  const currentValue = FONT_SIZES.find((size) => size.value === value);
  const currentSizeLabel = currentValue?.label || '14';

  const selectSize = useCallback((size: string) => () => onChange(size), [onChange]);

  return (
    <Dropdown.Root>
      <Dropdown.Trigger asChild className="h-6 rounded">
        <Toolbar.Button>
          {currentSizeLabel}
          <Icon name="ChevronDown" />
        </Toolbar.Button>
      </Dropdown.Trigger>
      <Dropdown.Content asChild>
        <Surface className="flex flex-col px-1.5 py-2">
          {FONT_SIZES.map((size) => (
            <DropdownButton
              isActive={value ? value === size.value : size.value === '14px' ? true : false}
              onClick={selectSize(size.value)}
              key={`${size.label}_${size.value}`}
              className=" my-0.5 py-[3px]"
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
