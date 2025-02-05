import { ReactNode, forwardRef } from 'react';
import { cn } from '../../../lib/utils';
import Tooltip from '../../ui/Tooltip';
import './header.css';
interface HeaderButtonProps {
  tooltip: string;
  icon: ReactNode;
  isActive?: boolean;
  isDisabled?: boolean;
  onClick?: () => void;
  className?: string;
  width?: number;
}

export const HeaderButton = forwardRef<HTMLButtonElement, HeaderButtonProps>(
  ({ tooltip, icon, isActive, isDisabled, onClick, className, width }, ref) => {
    return (
      <Tooltip content={tooltip}>
        <button
          className={cn('header-button', isActive && 'is-active', isDisabled && 'is-disabled', className)}
          style={{ width: width }}
          onClick={isDisabled ? undefined : onClick}
          ref={ref}
        >
          {icon}
        </button>
      </Tooltip>
    );
  }
);
