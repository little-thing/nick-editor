import { createContext } from 'react';

type EditorContextType = {
  uploadImage: (file: File) => Promise<string>;
}

export const EditorContext = createContext<EditorContextType>({
  uploadImage: async () => {
    throw new Error('Not implemented');
  }
});
