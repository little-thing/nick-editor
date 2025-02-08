import { NodeViewProps } from '@tiptap/core';
import { NodeViewWrapper, NodeViewContent } from '@tiptap/react';
import { TableHandlerMenu } from './menus';

export function TableHandlerView(props: NodeViewProps) {
  const { node, editor } = props;

  return (
    <NodeViewWrapper 
      className="tableHandler"
      data-type={node.type.name}
      {...node.attrs}
    >
      <TableHandlerMenu editor={editor} >
        <NodeViewContent />
      </TableHandlerMenu>
    </NodeViewWrapper>
  );
}
