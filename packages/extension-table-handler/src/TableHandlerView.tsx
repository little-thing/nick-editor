import { NodeViewProps } from '@tiptap/core';
import { NodeViewWrapper } from '@tiptap/react';

export function TableHandlerView(props: NodeViewProps) {
  const { node, updateAttributes, deleteNode, editor } = props;

  return <NodeViewWrapper className={'tableHandler'}></NodeViewWrapper>;
}
