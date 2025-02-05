import { EditorContent, Content, useEditor } from '@tiptap/react';
import { useMemo, useRef, useEffect } from 'react';

import ExtensionKit from '../../extensions/extension-kit';
import { useDarkmode } from '../../hooks/useDarkMode';

import { EasyScrollContainer } from 'react-easy-scrollbar';

import '../../styles/index.css';
import { useUploadFile } from '@/hooks/useUploadFile';

type Props = {
  content?: Content;
};

export const EditorRender = ({ content }: Props) => {
  const { isDarkMode, darkMode, lightMode } = useDarkmode();

  useEffect(() => {
    if (isDarkMode) {
      lightMode();
    }
  }, [isDarkMode, lightMode]);

  const menuContainerRef = useRef(null);
  const editorRef = useRef<HTMLDivElement | null>(null);

  const uploadFile = useUploadFile();
  const editor = useEditor(
    {
      // element: editorRef.current || undefined,
      content,
      editable: false,
      autofocus: true,
      extensions: ExtensionKit({
        uploadFile,
        provider: null,
      }),
      editorProps: {
        editable: () => false,
        attributes: {
          autocomplete: 'off',
          autocorrect: 'off',
          autocapitalize: 'off',
          class: 'min-h-full',
        },
      },
    },
    []
  );

  const providerValue = useMemo(() => {
    return {};
  }, []);

  if (!editor) {
    return null;
  }

  return (
    <div
      className={' relative flex flex-col w-full h-full bg-white   overflow-hidden divide-y'}
      ref={menuContainerRef}
    >
      <EasyScrollContainer className={' flex-1 relative overflow-auto '}>
        <EditorContent editor={editor} ref={editorRef} className="w-full " />
      </EasyScrollContainer>
    </div>
  );
};

export default EditorRender;
