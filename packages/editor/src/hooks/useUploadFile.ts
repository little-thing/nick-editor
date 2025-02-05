import { useContext } from 'react';
import { EditorContext } from '@/context/EditorContext';

export function useUploadFile() {
  const {uploadImage} = useContext(EditorContext);

  return uploadImage;
}
