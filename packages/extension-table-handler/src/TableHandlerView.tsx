import { NodeViewProps } from '@tiptap/core';
import { NodeViewWrapper, NodeViewContent } from '@tiptap/react';

export function TableHandlerView(props: NodeViewProps) {
  const { node } = props;

  return (
    <NodeViewWrapper 
      className="tableHandler"
      data-type={node.type.name}
      {...node.attrs}
    >
      <NodeViewContent />
    </NodeViewWrapper>
  );
}
