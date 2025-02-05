'use client';

import Tippy from '@tippyjs/react/headless';
import React, { useCallback, useMemo } from 'react';

import { TippyProps, TooltipProps } from './types.js';

const isMac = typeof window !== 'undefined' ? navigator.platform.toUpperCase().indexOf('MAC') >= 0 : false;

const ShortcutKey = ({ children }: { children: string }): JSX.Element => {
  const className =
    'inline-flex items-center justify-center w-5 h-5 p-1 text-[0.625rem] rounded font-semibold leading-none border border-neutral-200 text-neutral-500 border-b-2';

  if (children === 'Mod') {
    return <kbd className={className}>{isMac ? '⌘' : 'Ctrl'}</kbd>; // ⌃
  }

  if (children === 'Shift') {
    return <kbd className={className}>⇧</kbd>;
  }

  if (children === 'Alt') {
    return <kbd className={className}>{isMac ? '⌥' : 'Alt'}</kbd>;
  }

  return <kbd className={className}>{children}</kbd>;
};

export const Tooltip = ({
  children,
  enabled = true,
  title,
  shortcut,
  tippyOptions = {},
  content,
  color,
}: TooltipProps): JSX.Element => {
  const titleText = useMemo(() => title || content, [title, content]);

  if (enabled) {
    return (
      <Tippy
        delay={[200, 0]}
        offset={[0, 8]}
        arrow={true}
        render={(attrs) => (
          <div className="relative">
            <span
              className={`flex items-center gap-2 px-2.5 py-1  rounded-md shadow-sm z-[999] ${
                color ? `bg-[${color}]` : 'bg-black'
              } dark:bg-white dark:text-black text-white`}
              tabIndex={-1}
              {...attrs}
            >
              {titleText && <span className="text-xs font-medium ">{titleText}</span>}
              {shortcut && (
                <span className="flex items-center gap-0.5">
                  {shortcut.map((shortcutKey) => (
                    <ShortcutKey key={shortcutKey}>{shortcutKey}</ShortcutKey>
                  ))}
                </span>
              )}
            </span>
            <div
              className={`absolute w-2 h-2 rotate-45 -bottom-0.5 left-1/2 -translate-x-1/2 ${
                color ? `bg-[${color}]` : 'bg-black'
              } dark:bg-white`}
            />
          </div>
        )}
      >
        <span>{children}</span>
      </Tippy>
    );
  }

  return <>{children}</>;
};

export default Tooltip;
