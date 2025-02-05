import { Group } from './types';
import MenuImg from '@/assets/svg/EditorMenuList/MenuImg.svg';
import MenuTable from '@/assets/svg/EditorMenuList/MenuTable.svg';
import MenuColumn from '@/assets/svg/EditorMenuList/MenuColumn.svg';
import MenuSplitLine from '@/assets/svg/EditorMenuList/MenuSplitLine.svg';

export const FORMAT_GROUP:Group = {
  name: 'format',
  title: '格式',
  commands: [
    {
      name: 'heading1',
      label: 'H1',
      iconName: 'Heading1',
      description: 'High priority section title',
      aliases: ['h1'],
      action: (editor) => {
        editor.chain().focus().setHeading({ level: 1 }).run();
      },
    },
    {
      name: 'heading2',
      label: 'H2',
      iconName: 'Heading2',
      description: 'Medium priority section title',
      aliases: ['h2'],
      action: (editor) => {
        editor.chain().focus().setHeading({ level: 2 }).run();
      },
    },
    {
      name: 'heading3',
      label: 'H3',
      iconName: 'Heading3',
      description: 'Low priority section title',
      aliases: ['h3'],
      action: (editor) => {
        editor.chain().focus().setHeading({ level: 3 }).run();
      },
    },
    {
      name: 'bulletList',
      label: '无序列表',
      iconName: 'List',
      description: 'Unordered list of items',
      aliases: ['ul'],
      action: (editor) => {
        editor.chain().focus().toggleBulletList().run();
      },
    },
    {
      name: 'numberedList',
      label: '有序列表',
      iconName: 'ListOrdered',
      description: 'Ordered list of items',
      aliases: ['ol'],
      action: (editor) => {
        editor.chain().focus().toggleOrderedList().run();
      },
    },
    {
      name: 'taskList',
      label: '代办列表',
      iconName: 'ListTodo',
      description: 'Task list with todo items',
      aliases: ['todo'],
      action: (editor) => {
        editor.chain().focus().toggleTaskList().run();
      },
    },
  ],
};

export const BASIC_GROUP:Group =   {
  name: 'basic',
  title: '基础组件',
  commands: [
    {
      name: 'image',
      label: '图片',
      iconName: {svg:MenuImg},
      description: 'Insert an image',
      aliases: ['img'],
      action: (editor) => {
        editor.chain().focus().setImageUpload().run();
      },
    },
    {
      name: 'table',
      label: '表格',
      iconName: {svg:MenuTable},
      description: 'Insert a table',
      shouldBeHidden: (editor) => editor.isActive('columns'),
      action: (editor) => {
        editor.chain().focus().insertTable({ rows: 3, cols: 4, withHeaderRow: false }).run();
      },
    },
    {
      name: 'columns',
      label: '列',
      iconName: {svg: MenuColumn},
      description: 'Add two column content',
      aliases: ['cols'],
      shouldBeHidden: (editor) => editor.isActive('columns'),
      action: (editor) => {
        editor
          .chain()
          .focus()
          .setColumns()
          .focus(editor.state.selection.head - 1)
          .run();
      },
    },
    {
      name: 'horizontalRule',
      label: '分割线',
      iconName: {svg: MenuSplitLine},
      description: 'Insert a horizontal divider',
      aliases: ['hr'],
      action: (editor) => {
        editor.chain().focus().setHorizontalRule().run();
      },
    },
  ],
};

export const ADDITIONAL_GROUP:Group = {
  name: 'advanced',
  title: '高级组件',
  commands: [
    {
      name: 'codeBlock',
      label: '代码块',
      iconName: 'CodeXml',
      description: 'Code block with syntax highlighting',
      shouldBeHidden: (editor) => editor.isActive('columns'),
      action: (editor) => {
        editor.chain().focus().setCodeBlock().run();
      },
    },
    {
      name: 'toc',
      label: '目录',
      iconName: 'Book',
      aliases: ['outline'],
      description: 'Insert a table of contents',
      shouldBeHidden: (editor) => editor.isActive('columns'),
      action: (editor) => {
        editor.chain().focus().insertTableOfContents().run();
      },
    },
    {
      name: 'blockquote',
      label: '引用',
      iconName: 'Quote',
      description: 'Element for quoting',
      action: (editor) => {
        editor.chain().focus().setBlockquote().run();
      },
    },
  ],
};


export const GROUPS = [FORMAT_GROUP, BASIC_GROUP, ADDITIONAL_GROUP];
