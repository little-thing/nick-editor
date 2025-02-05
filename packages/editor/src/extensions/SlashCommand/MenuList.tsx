import React, { useCallback, useEffect, useRef, useState } from 'react';

import { DropdownButton } from '@/components/ui/Dropdown';
import { Icon } from '@/components/ui/Icon';
import { Surface } from '@/components/ui/Surface';
import { Command, MenuListProps, MenuIcon } from './types';
import './styles.css';

const IconComp = ({name}:{name:MenuIcon})=>{
  if(typeof name === 'object') {
    return <div className="menu-list-icon-wrapper">
      <img src={name.svg}  alt={'svg'}/>
    </div>;
  } else {
    return <Icon name={name} />;
  }
}

export const MenuList = React.forwardRef((props: MenuListProps, ref) => {
  const scrollContainer = useRef<HTMLDivElement>(null);
  const activeItem = useRef<HTMLButtonElement>(null);
  const [selectedGroupIndex, setSelectedGroupIndex] = useState(0);
  const [selectedCommandIndex, setSelectedCommandIndex] = useState(0);

  // Anytime the groups change, i.e. the user types to narrow it down, we want to
  // reset the current selection to the first menu item
  useEffect(() => {
    setSelectedGroupIndex(0);
    setSelectedCommandIndex(0);
  }, [props.items]);

  const selectItem = useCallback(
    (groupIndex: number, commandIndex: number) => {
      const command = props.items[groupIndex]!.commands[commandIndex]!;
      props.command(command);
    },
    [props]
  );

  React.useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }: { event: React.KeyboardEvent }) => {
      if (event.key === 'ArrowDown') {
        if (!props.items.length) {
          return false;
        }

        const commands = props.items[selectedGroupIndex]!.commands;

        let newCommandIndex = selectedCommandIndex + 1;
        let newGroupIndex = selectedGroupIndex;

        if (commands.length - 1 < newCommandIndex) {
          newCommandIndex = 0;
          newGroupIndex = selectedGroupIndex + 1;
        }

        if (props.items.length - 1 < newGroupIndex) {
          newGroupIndex = 0;
        }

        setSelectedCommandIndex(newCommandIndex);
        setSelectedGroupIndex(newGroupIndex);

        return true;
      }

      if (event.key === 'ArrowUp') {
        if (!props.items.length) {
          return false;
        }

        let newCommandIndex = selectedCommandIndex - 1;
        let newGroupIndex = selectedGroupIndex;

        if (newCommandIndex < 0) {
          newGroupIndex = selectedGroupIndex - 1;
          newCommandIndex = props.items[newGroupIndex]?.commands.length! - 1 || 0;
        }

        if (newGroupIndex < 0) {
          newGroupIndex = props.items.length - 1;
          newCommandIndex = props.items[newGroupIndex]!.commands.length - 1;
        }

        setSelectedCommandIndex(newCommandIndex);
        setSelectedGroupIndex(newGroupIndex);

        return true;
      }

      if (event.key === 'Enter') {
        if (!props.items.length || selectedGroupIndex === -1 || selectedCommandIndex === -1) {
          return false;
        }

        selectItem(selectedGroupIndex, selectedCommandIndex);

        return true;
      }

      return false;
    },
  }));

  useEffect(() => {
    if (activeItem.current && scrollContainer.current) {
      const offsetTop = activeItem.current.offsetTop;
      const offsetHeight = activeItem.current.offsetHeight;

      scrollContainer.current.scrollTop = offsetTop - offsetHeight;
    }
  }, [selectedCommandIndex, selectedGroupIndex]);

  const createCommandClickHandler = useCallback(
    (groupIndex: number, commandIndex: number) => {
      return () => {
        selectItem(groupIndex, commandIndex);
      };
    },
    [selectItem]
  );

  if (!props.items.length) {
    return null;
  }

  return (
    <Surface ref={scrollContainer} className="menu-list-surface">
      <div className="menu-list-grid">
        {/* 格式组 */}
        <div className="menu-list-format-group">
          {props.items[0]?.commands.map((command: Command, commandIndex: number) => (
            <DropdownButton
              key={command.label}
              isActive={selectedGroupIndex === 0 && selectedCommandIndex === commandIndex}
              onClick={createCommandClickHandler(0, commandIndex)}
              className="menu-list-format-button"
            >
              <IconComp name={command.iconName} />
            </DropdownButton>
          ))}
        </div>

        {/* 基础组件 */}
        <div className="menu-list-group-title">
          {props.items[1]?.title}
        </div>
        <div className="menu-list-basic-group">
          {props.items[1]?.commands.map((command: Command, commandIndex: number) => (
            <DropdownButton
              key={command.label}
              isActive={selectedGroupIndex === 1 && selectedCommandIndex === commandIndex}
              onClick={createCommandClickHandler(1, commandIndex)}
              className="menu-list-basic-button"
            >
              <IconComp name={command.iconName} />
              <span className="menu-list-button-text">{command.label}</span>
            </DropdownButton>
          ))}
        </div>

        {/* 高级组件 */}
        <div className="menu-list-group-title">
          {props.items[2]?.title}
        </div>
        <div className="menu-list-advanced-group">
          {props.items[2]?.commands.map((command: Command, commandIndex: number) => (
            <DropdownButton
              key={command.label}
              isActive={selectedGroupIndex === 2 && selectedCommandIndex === commandIndex}
              onClick={createCommandClickHandler(2, commandIndex)}
              className="menu-list-advanced-button"
            >
              <IconComp name={command.iconName} />
              <span className="menu-list-button-text">{command.label}</span>
            </DropdownButton>
          ))}
        </div>
      </div>
    </Surface>
  );
});

MenuList.displayName = 'MenuList';

export default MenuList;
