import { useContext } from 'react';
import { EditorContext } from '@/context/EditorContext';

export function useUploadFile() {
  const {uploadFile} = useContext(EditorContext);

  return uploadFile;
}
