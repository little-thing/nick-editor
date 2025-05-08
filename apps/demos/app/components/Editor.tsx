'use client';

import '@nick-editor/editor/index.css';
import { BlockEditor } from '@nick-editor/editor';
import { EditorContext } from '@nick-editor/editor';
import { useMemo } from 'react';
import { Doc as YDoc } from 'yjs';
import React from 'react';

export function Editor() {
  const ydoc = useMemo(() => new YDoc(), []);

  const uploadFile = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);

    // try {
    //   const response = await fetch('/api/upload', {
    //     method: 'POST',
    //     body: formData,
    //   });
      
    //   if (!response.ok) {
    //     throw new Error('Upload failed');
    //   }

    //   const data = await response.json();
    //   return data.url; 
    // } catch (error) {
    //   console.error('Upload error:', error);
    //   throw error;
    // }
    const url="http://img.92fa.com/pic/TX747_02.jpg"
    return url;
  };

  return (
    <EditorContext.Provider value={{ uploadFile }}>
      <BlockEditor hasCollab={false} ydoc={ydoc} />
    </EditorContext.Provider>
  );
}

export default Editor;
