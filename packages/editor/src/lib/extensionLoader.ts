import { Extensions } from '@tiptap/core';

 const extensions: Extensions = [];

export const injectExtensions = (exts: Extensions) => {
  extensions.push(...exts);
};

export const loadExtensions = () => {
  return extensions;
};
