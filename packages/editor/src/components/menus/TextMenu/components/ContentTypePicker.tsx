import * as Dropdown from '@radix-ui/react-dropdown-menu';
import { icons } from 'lucide-react';
import { useMemo, useState } from 'react';

import DownVector from '@/assets/svg/DownVector.svg';

import { DropdownButton, DropdownCategoryTitle } from '../../../ui/Dropdown';
import { Surface } from '../../../ui/Surface';
import { Toolbar } from '../../../ui/Toolbar';

export type ContentTypePickerOption = {
  label: string;
  id: string;
  type: 'option';
  disabled: () => boolean;
  isActive: () => boolean;
  onClick: () => void;
  icon: keyof typeof icons;
};

export type ContentTypePickerCategory = {
  label: string;
  id: string;
  type: 'category';
};

export type ContentPickerOptions = Array<ContentTypePickerOption | ContentTypePickerCategory>;

export type ContentTypePickerProps = {
  options: ContentPickerOptions;
};

const index2FontSize = [16, 30, 24, 20, 18, 16, 14];
const isOption = (option: ContentTypePickerOption | ContentTypePickerCategory): option is ContentTypePickerOption =>
  option.type === 'option';
const isCategory = (option: ContentTypePickerOption | ContentTypePickerCategory): option is ContentTypePickerCategory =>
  option.type === 'category';

export const ContentTypePicker = ({ options }: ContentTypePickerProps) => {
  const activeItem = useMemo(() => options.find((option) => option.type === 'option' && option.isActive()), [options]);

  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (option: ContentTypePickerOption) => () => {
    option.onClick();
    setIsOpen(false);
  };

  return (
    <Dropdown.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dropdown.Trigger asChild>
        <Toolbar.Button buttonSize="small" className={'h-6'}>
          <span className="font-[500] w-9">{activeItem?.label ?? '正文'}</span>
          <img src={DownVector} alt="" />
        </Toolbar.Button>
      </Dropdown.Trigger>
      <Dropdown.Content asChild side="bottom" align="start">
        <Surface className="flex flex-col gap-1 py-3 w-auto">
          {options.map((option, index) => {
            if (isOption(option)) {
              return (
                <DropdownButton
                  key={option.id}
                  onClick={handleClick(option)}
                  isActive={option.isActive()}
                  className="flex items-center justify-start gap-1.5 text-[13px] px-9"
                >
                  <span style={{ fontSize: `${index2FontSize[index]}px`, fontWeight: 700 }}>{option.label}</span>
                </DropdownButton>
              );
            } else if (isCategory(option)) {
              return (
                <div className="mt-2 first:mt-0" key={option.id}>
                  <DropdownCategoryTitle key={option.id}>{option.label}</DropdownCategoryTitle>
                </div>
              );
            }
          })}
        </Surface>
      </Dropdown.Content>
    </Dropdown.Root>
  );
};
