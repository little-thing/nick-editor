import React from 'react';
import { Placement, Props } from 'tippy.js';

export interface TooltipProps {
  children?: string | React.ReactNode;
  enabled?: boolean;
  title?: string;
  shortcut?: string[];
  tippyOptions?: Omit<Partial<Props>, 'content'>;
  content?: React.ReactNode;
  color?: string;
}

export interface TippyProps {
  'data-placement': Placement;
  'data-reference-hidden'?: string;
  'data-escaped'?: string;
}
