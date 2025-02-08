import { ContextMenu } from '@libs/ui';
import { Icon } from '@libs/ui/components/Icon';
import React, { useCallback, useState } from 'react';
import type { ComponentProps } from 'react';

interface TableInputItemProps {
  icon: ComponentProps<typeof Icon>['name'];
  label: string;
  unit: '行' | '列';
  onClick: (count: number) => void;
  className?: string;
}

export function TableInputItem({ icon, label, unit, onClick, className = '' }: TableInputItemProps) {
  const [count, setCount] = useState(1);
  const [isFocused, setIsFocused] = useState(false);

  const validateCount = useCallback((count: number) => {
    if (isNaN(count) || count < 1) return 1;
    if (count > 20) return 20;
    return count;
  }, []);

  const handleNumberChange = useCallback((value: string) => {
    const num = parseInt(value);
    setCount(num);
  }, []);

  const handleClick = useCallback(() => {
    const validCount = validateCount(count);
    onClick(validCount);
  }, [count, onClick, validateCount]);

  return (
    <ContextMenu.Item 
      className={`menu-item ${className} ${isFocused ? 'focused' : ''}`} 
      onClick={handleClick}
      onSelect={(e) => {
        if (isFocused) {
          e.preventDefault();
        }
      }}
    >
      <Icon name={icon} className="menu-icon" />
      {label}
      <div className="menu-input-wrapper" onClick={(e) => e.stopPropagation()} >
        <input 
          type="number" 
          min="1" 
          max="20" 
          value={count}
          onChange={(e) => handleNumberChange(e.target.value)}
          onClick={(e) => e.stopPropagation()}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="menu-input"
        />
        {unit}
      </div>
    </ContextMenu.Item>
  );
} 