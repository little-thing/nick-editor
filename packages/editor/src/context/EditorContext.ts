import { createContext } from 'react';

export type EditorContextType = {
  uploadFile: (file: File) => Promise<string>;
}

export const EditorContext = createContext<EditorContextType>({
  uploadFile: async () => {
    throw new Error('Not implemented');
  }
});
