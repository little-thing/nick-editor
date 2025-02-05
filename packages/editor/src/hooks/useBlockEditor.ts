import { WebSocketStatus, TiptapCollabProvider } from '@hocuspocus/provider';
import { EditorOptions } from '@tiptap/core';
import Collaboration from '@tiptap/extension-collaboration';
import { Editor, useEditor, Content } from '@tiptap/react';
import { useMemo, useState, useEffect, useContext } from 'react';
import type { Doc as YDoc } from 'yjs';

import { EditorUser } from '../components/BlockEditor/types';
import { ExtensionKit } from '../extensions/extension-kit';
import { useSidebar } from './useSidebar';
import { EditorContext } from '@/context/EditorContext';

// import { CollaborationCursor } from "@tiptap/extension-collaboration-cursor";
// import { randomElement } from "@/lib/utils";
// import { userNames, userColors } from "@/lib/constants.tsx";

declare global {
  interface Window {
    editor: Editor | null;
  }
}

export const useBlockEditor = ({
  ydoc,
  provider,
  defaultContent,
  options,
}: {
  ydoc: YDoc;
  provider?: TiptapCollabProvider | null | undefined;
  editable?: boolean;
  defaultContent?: Content;
  options?: Partial<EditorOptions>;
}) => {
  const leftSidebar = useSidebar();
  const [collabState, setCollabState] = useState<WebSocketStatus>(WebSocketStatus.Connecting);

  const { uploadImage} = useContext(EditorContext);

  const extensions = useMemo(() => {
    const res = [
      ...ExtensionKit({
        uploadFile: uploadImage,
        provider: null,
      }),
      Collaboration.configure({
        // 同步更新到yjs
        document: ydoc,
      }),
    ];

    // if(provider){
    //   CollaborationCursor.configure({
    //     provider,
    //     user: {
    //       name: randomElement(userNames),
    //       color: randomElement(userColors),
    //     },
    //   });
    // }

    return res;
  }, [ydoc]);

  const editor = useEditor(
    {
      autofocus: true,
      onCreate: ({ editor }) => {
        const cb = () => {
          if (options?.onCreate) {
            options.onCreate({ editor });
          }

          if (editor.isEmpty && defaultContent) {
            editor.commands.setContent(defaultContent);
          }
        };
        if (provider) {
          provider.on('synced', cb);
        } else {
          cb();
        }
      },
      onUpdate: ({ editor, transaction }) => {
        // setDoc(editor.state.doc.toJSON() as object);
        if (options?.onUpdate) {
          options.onUpdate({ editor, transaction });
        }
      },
      extensions: extensions,
      editorProps: {
        attributes: {
          autocomplete: 'off',
          autocorrect: 'off',
          autocapitalize: 'off',
          class: 'min-h-full',
        },
      },
    },
    [ydoc]
  );

  const users = useMemo(() => {
    if (!editor?.storage.collaborationCursor?.users) {
      return [];
    }

    return editor.storage.collaborationCursor?.users.map((user: EditorUser) => {
      const names = user.name?.split(' ');
      const firstName = names?.[0];
      const lastName = names?.[names.length - 1];
      const initials = `${firstName?.[0] || '?'}${lastName?.[0] || '?'}`;

      return { ...user, initials: initials.length ? initials : '?' };
    });
  }, [editor?.storage.collaborationCursor?.users]);

  const characterCount = editor?.storage.characterCount || { characters: () => 0, words: () => 0 };

  useEffect(() => {
    provider?.on('status', (event: { status: WebSocketStatus }) => {
      setCollabState(event.status);
    });
  }, [provider]);

  window.editor = editor;

  return { editor, users, characterCount, leftSidebar, collabState };
};
