import React from 'react';

import { cn } from '../../../lib/utils';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'quaternary' | 'ghost';
export type ButtonSize = 'medium' | 'small' | 'icon' | 'iconSmall';

export type ButtonProps = {
  variant?: ButtonVariant;
  active?: boolean;
  activeClassname?: string;
  buttonSize?: ButtonSize;
  rounded?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      rounded = true,
      active,
      buttonSize = 'medium',
      children,
      disabled,
      variant = 'primary',
      className,
      activeClassname,
      ...rest
    },
    ref
  ) => {
    const buttonClassName = cn(
      'flex group cursor-pointer items-center justify-center border border-transparent gap-2 text-sm font-semibold  disabled:opacity-50 whitespace-nowrap focus:outline-none ',
      rounded ? 'rounded' : '',
      variant === 'primary' &&
        cn(
          'text-white bg-black border-black dark:text-black dark:bg-white dark:border-white',
          !disabled &&
            !active &&
            'hover:bg-neutral-800 active:bg-neutral-900 dark:hover:bg-neutral-200 dark:active:bg-neutral-300',
          active && cn('bg-neutral-900 dark:bg-neutral-300', activeClassname)
        ),

      variant === 'secondary' &&
        cn(
          'text-neutral-900 dark:text-white',
          !disabled &&
            !active &&
            'hover:bg-neutral-100 active:bg-neutral-200 dark:hover:bg-neutral-900 dark:active:bg-neutral-800',
          active && 'bg-neutral-200 dark:bg-neutral-800'
        ),

      variant === 'tertiary' &&
        cn(
          'bg-neutral-50 text-neutral-900 dark:bg-neutral-900 dark:text-white dark:border-neutral-900',
          !disabled &&
            !active &&
            'hover:bg-neutral-100 active:bg-neutral-200 dark:hover:bg-neutral-800 dark:active:bg-neutral-700',
          active && cn('bg-neutral-200 dark:bg-neutral-800', activeClassname)
        ),

      variant === 'ghost' &&
        cn(
          'bg-transparent border-transparent ',
          !disabled &&
            !active &&
            'hover:bg-black/5 hover:text-neutral-700 active:bg-black/10 active:text-neutral-800 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:active:text-neutral-200',
          active && cn('bg-black/10 text-neutral-800 dark:bg-white/20 dark:text-neutral-200', activeClassname)
        ),

      buttonSize === 'medium' && 'py-2 px-3',
      buttonSize === 'small' && 'py-1 px-2',
      buttonSize === 'icon' && 'w-8 h-8',
      buttonSize === 'iconSmall' && 'w-6 h-6',

      className
    );

    return (
      <button ref={ref} disabled={disabled} className={buttonClassName} {...rest}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
