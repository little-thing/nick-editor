import { Button } from '../Button';
import { cn } from '../../lib/utils';
import React from 'react';

export const DropdownCategoryTitle = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="text-[.65rem] font-semibold mb-1 uppercase text-neutral-500 dark:text-neutral-400 px-1.5">
      {children}
    </div>
  );
};

export const DropdownButton = ({
  children,
  isActive,
  onClick,
  disabled,
  className,
}: {
  children: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}) => {
  return (
    <Button
      variant="ghost"
      buttonSize="small"
      className={cn('w-full h-auto text-left', className)}
      active={isActive}
      disabled={disabled}
      onClick={onClick}
      rounded={false}
    >
      <span className="w-full flex items-center justify-start gap-2">{children}</span>
    </Button>
  );
};
