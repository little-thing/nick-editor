import { EditorState } from "@tiptap/pm/state";
import { cellAround, isInTable, selectedRect, selectionCell } from "@tiptap/pm/tables";

/**
 * 判断一个位置是否在选中的单元格区域内
 * @param state 编辑器状态
 * @param pos 要检查的位置
 * @returns 是否在选中区域内
 */
export function isPosInSelectedCells(state: EditorState, pos: number): boolean {
  if (!isInTable(state)) return false;
  
  // 获取选中的表格区域信息
  const rect = selectedRect(state);
  const tableStart = rect.tableStart;
  const map = rect.map;

   // 先找到点击位置所在的单元格
  const $cell = cellAround(state.doc.resolve(pos));

  // 计算相对于表格开始位置的偏移
  const relativePos = $cell.pos - tableStart;

  try {
    // 找到pos所在的单元格位置
    const cellRect = map.findCell(relativePos);
    
    // 检查单元格是否在选中区域内
    return (
      cellRect.left >= rect.left &&
      cellRect.right <= rect.right &&
      cellRect.top >= rect.top &&
      cellRect.bottom <= rect.bottom
    );
  } catch (e) {
    console.error(e);
    // 如果pos不在任何单元格内,findCell会抛出异常
    return false;
  }
}