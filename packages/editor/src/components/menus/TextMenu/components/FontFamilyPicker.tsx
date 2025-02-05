import * as Dropdown from '@radix-ui/react-dropdown-menu';
import { useCallback } from 'react';

import { DropdownButton, DropdownCategoryTitle } from '../../../ui/Dropdown';
import { Icon } from '../../../ui/Icon';
import { Surface } from '../../../ui/Surface';
import { Toolbar } from '../../../ui/Toolbar';

const FONT_FAMILY_GROUPS = [
  {
    // label: 'Sans Serif',
    label: '无衬线',
    options: [
      { label: 'Inter', value: '' },
      { label: 'Arial', value: 'Arial' },
      { label: 'Helvetica', value: 'Helvetica' },
    ],
  },
  {
    // label: 'Serif',
    label: '衬线',
    options: [
      { label: 'Times New Roman', value: 'Times' },
      { label: 'Garamond', value: 'Garamond' },
      { label: 'Georgia', value: 'Georgia' },
    ],
  },
  {
    // label: 'Monospace',
    label: '等宽',
    options: [
      { label: 'Courier', value: 'Courier' },
      { label: 'Courier New', value: 'Courier New' },
    ],
  },
];

const FONT_FAMILIES = FONT_FAMILY_GROUPS.flatMap((group) => [group.options]).flat();

export type FontFamilyPickerProps = {
  onChange: (value: string) => void; // eslint-disable-line no-unused-vars
  value: string;
};

export const FontFamilyPicker = ({ onChange, value }: FontFamilyPickerProps) => {
  const currentValue = FONT_FAMILIES.find((size) => size.value === value);
  const currentFontLabel = currentValue?.label.split(' ')[0] || 'Inter';

  const selectFont = useCallback((font: string) => () => onChange(font), [onChange]);

  return (
    <Dropdown.Root>
      <Dropdown.Trigger asChild>
        <Toolbar.Button>
          <span className="w-[45px] truncate">{currentFontLabel}</span>
          <Icon name="ChevronDown" className="w-2 h-2" />
        </Toolbar.Button>
      </Dropdown.Trigger>
      <Dropdown.Content asChild>
        <Surface className="flex flex-col gap-1 px-2 py-4">
          {FONT_FAMILY_GROUPS.map((group) => (
            <div className="mt-2.5 first:mt-0 gap-0.5 flex flex-col" key={group.label}>
              <DropdownCategoryTitle>{group.label}</DropdownCategoryTitle>
              {group.options.map((font) => (
                <DropdownButton
                  isActive={value === font.value}
                  onClick={selectFont(font.value)}
                  key={`${font.label}_${font.value}`}
                >
                  <span style={{ fontFamily: font.value }}>{font.label}</span>
                </DropdownButton>
              ))}
            </div>
          ))}
        </Surface>
      </Dropdown.Content>
    </Dropdown.Root>
  );
};
