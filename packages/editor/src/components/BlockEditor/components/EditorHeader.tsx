import * as Popover from '@radix-ui/react-popover';
import { Editor } from '@tiptap/react';
import classNames from 'classnames';
import { memo } from 'react';

import { ContentTypePicker } from '../../menus/TextMenu/components/ContentTypePicker';
import { FontSizePickerByHeader } from '../../menus/TextMenu/components/FontSizePickerByHeader';
import { useTextmenuCommands } from '../../menus/TextMenu/hooks/useTextmenuCommands';
import { useTextmenuContentTypes } from '../../menus/TextMenu/hooks/useTextmenuContentTypes';
import { useTextmenuStates } from '../../menus/TextMenu/hooks/useTextmenuStates';
import { LinkEditorPanel } from '../../panels';
import Tooltip from '../../ui/Tooltip';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { Icon } from '@/components/ui/Icon';

import { cn } from '../../../lib/utils';
import { HeaderButton } from './HeaderButton';
import { TextColor } from './header/TextColor';
import { HighlightColor } from './header/HighlightColor';

interface DividerProps {
  className?: string;
}

export const Divider = ({ className }: DividerProps) => {
  return (
    <div
      className={cn('w-px h-2.5 [background:var(--Neutral-gray-4,#F0F0F0)] dark:bg-neutral-700 rounded-sm', className)}
    />
  );
};

const MemoFontSizePicker = memo(FontSizePickerByHeader);
const MemoContentTypePicker = memo(ContentTypePicker);
export type TextMenuProps = {
  editor: Editor;
};

export const EditorHeader = ({ editor }: TextMenuProps) => {
  const blockOptions = useTextmenuContentTypes(editor);
  const commands = useTextmenuCommands(editor);
  const states = useTextmenuStates(editor);
  const undo = () => {
    editor.commands.undo();
  };
  const redo = () => {
    editor.commands.redo();
  };
  return (
    <TooltipPrimitive.Provider>
      <div className="flex items-center gap-2 mx-auto">
        {/* 回退 */}
        <HeaderButton
          tooltip="回退"
          icon={
            <Icon
              name="CornerUpLeft"
              className={'cursor-pointer rounded  ' + `${editor.can().undo() ? 'text-[#1F1F1F]' : 'text-[#C2C2C2]'} `}
            />
          }
          onClick={undo}
        />

        {/* 重做 */}
        <Tooltip content="重做">
          <HeaderButton
            tooltip="重做"
            icon={
              <Icon name="CornerUpRight" className={`${editor.can().redo() ? 'text-[#1F1F1F]' : 'text-[#C2C2C2]'} `} />
            }
            onClick={redo}
          />
        </Tooltip>

        <Divider />

        <Tooltip content="格式">
          <div className="flex items-center gap-1.5 w-[58px] justify-center cursor-pointer rounded">
            <MemoContentTypePicker options={blockOptions} />
          </div>
        </Tooltip>

        {/* 字号大小 */}
        <Tooltip content="字号">
          <div className="flex items-center gap-1.5 w-[45px] justify-center cursor-pointer rounded">
            <MemoFontSizePicker onChange={commands.onSetFontSize} value={states.currentSize} />
          </div>
        </Tooltip>

        {/* 加粗 */}
        <HeaderButton tooltip="加粗" icon={<Icon name="Bold" />} onClick={commands.onBold} isActive={states.isBold} />

        {/* 倾斜 */}
        <HeaderButton
          tooltip="倾斜"
          icon={<Icon name="Italic" />}
          onClick={commands.onItalic}
          isActive={states.isItalic}
        />

        {/* 下划线 */}
        <HeaderButton
          tooltip="下划线"
          icon={<Icon name="Underline" />}
          onClick={commands.onUnderline}
          isActive={states.isUnderline}
        />

        {/* 删除线 */}
        <HeaderButton
          tooltip="删除线"
          icon={<Icon name="Strikethrough" />}
          onClick={commands.onStrike}
          isActive={states.isStrike}
        />

        <Divider />

        {/* 字体颜色 */}
        <TextColor
          currentColor={states.currentColor}
          onChangeColor={commands.onChangeColor}
          onClearColor={commands.onClearColor}
        />

        {/* 背景色标记 */}
        <HighlightColor
          currentHighlight={states.currentHighlight}
          onChangeHighlight={commands.onChangeHighlight}
          onClearHighlight={commands.onClearHighlight}
          isActive={states.currentHighlight}
        />

        <Divider />

        {/* 代码 */}
        <HeaderButton tooltip="代码" icon={<Icon name="Code" />} onClick={commands.onCode} isActive={states.isCode} />

        {/* 代码块 */}
        <HeaderButton tooltip="代码块" icon={<Icon name="CodeXml" />} onClick={commands.onCodeBlock} />

        {/* 无序列表 */}
        <HeaderButton
          tooltip="无序列表"
          icon={<Icon name="List" />}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive('bulletList')}
        />

        {/* 有序列表 */}
        <HeaderButton
          tooltip="有序列表"
          icon={<Icon name="ListOrdered" />}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive('orderedList')}
        />

        {/* 代办列表 */}
        <HeaderButton
          tooltip="代办列表"
          icon={<Icon name="ListChecks" />}
          onClick={() => editor.chain().focus().toggleTaskList().run()}
          isActive={editor.isActive('taskList')}
        />

        <Divider />

        {/* 添加超链接 */}
        <div
          className={classNames(
            'h-[24px] w-[24px] flex justify-center rounded cursor-pointer items-center hover:bg-[#f2f2f2]'
          )}
        >
          <Popover.Root>
            <Popover.Trigger asChild>
              <HeaderButton tooltip={'添加超链接'} icon={<Icon name="Link" />} />
            </Popover.Trigger>
            <Popover.Content>
              <LinkEditorPanel onSetLink={commands.onLink} />
            </Popover.Content>
          </Popover.Root>
        </div>

        {/* 下标 */}
        <HeaderButton
          tooltip="下标"
          icon={<Icon name="Subscript" />}
          onClick={commands.onSubscript}
          isActive={states.isSubscript}
        />

        {/* 上标 */}
        <HeaderButton
          tooltip="上标"
          icon={<Icon name="Superscript" />}
          onClick={commands.onSuperscript}
          isActive={states.isSuperscript}
        />

        <Divider />

        {/* 左对齐 */}
        <HeaderButton
          tooltip="左对齐"
          icon={<Icon name="AlignLeft" />}
          onClick={commands.onAlignLeft}
          isActive={states.isAlignLeft}
        />

        {/* 水平居中 */}
        <HeaderButton
          tooltip="水平居中"
          icon={<Icon name="AlignCenter" />}
          onClick={commands.onAlignCenter}
          isActive={states.isAlignCenter}
        />

        {/* 右对齐 */}
        <HeaderButton
          tooltip="右对齐"
          icon={<Icon name="AlignRight" />}
          onClick={commands.onAlignRight}
          isActive={states.isAlignRight}
        />

        {/* 两端对齐 */}
        <HeaderButton
          tooltip="两端对齐"
          icon={<Icon name="AlignJustify" />}
          onClick={commands.onAlignJustify}
          isActive={states.isAlignJustify}
        />
      </div>
    </TooltipPrimitive.Provider>
  );
};
