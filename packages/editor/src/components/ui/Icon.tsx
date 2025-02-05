import { icons } from 'lucide-react';
import { memo } from 'react';

import { cn } from '../../lib/utils';

export type IconProps = {
  name: keyof typeof icons;
  className?: string;
  strokeWidth?: number;
  onClick?: () => void;
};

export const Icon = memo(({ name, className, strokeWidth, onClick }: IconProps) => {
  const IconComponent = icons[name];

  if (!IconComponent) {
    return null;
  }

  return (
    <IconComponent className={cn('w-4 h-4', className)} size={16} strokeWidth={strokeWidth || 2.5} onClick={onClick} />
  );
});

Icon.displayName = 'Icon';
