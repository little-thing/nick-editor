'use client';

import '@nick-editor/editor/index.css';
import { BlockEditor } from '@nick-editor/editor';
import { useMemo } from 'react';
import { Doc as YDoc } from 'yjs';

export function Editor() {
  const ydoc = useMemo(() => new YDoc(), []);

  return (
    <BlockEditor
      hasCollab={false}
      ydoc={ydoc}
      editorOptions={{
        onUpdate: ({ editor }: never) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          console.log(JSON.stringify(editor.state.doc.toJSON()));
        },
      }}
    />
  );
}

export default Editor;
