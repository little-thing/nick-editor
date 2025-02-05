'use client';

import '@nick-editor/editor/index.css';
import { BlockEditor } from '@nick-editor/editor';
import { useMemo } from 'react';
import { Doc as YDoc } from 'yjs';
import React from 'react';

export function Editor() {
  const ydoc = useMemo(() => new YDoc(), []);

  return <BlockEditor hasCollab={false} ydoc={ydoc} />;
}

export default Editor;
