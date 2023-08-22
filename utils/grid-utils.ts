import { ICell } from "./type-def";

/**
 * check whether if the cell is in the same 3x3 group of selected cell
 * @param {ICell} currentCell current position of cell
 * @param {ICell} selected selected cell
 * @returns {boolean}
 */
export const isCellInSameGroupAsSelectedCell = (currentCell: ICell, selected: ICell): boolean => {
  if (selected == null) {
    return false;
  }
  const { x, y } = currentCell;
  const startX = Math.floor(selected.x/3) * 3;
  const endX = startX + 3;
  const startY = Math.floor(selected.y/3) * 3;
  const endY = startY + 3;
  return x >= startX && x < endX && y >= startY && y < endY;
}

/**
 * Check whether the current cell is existed on the same axis of selected cell
 * @param {ICell} currentCell 
 * @param {ICell} selected 
 * @returns {boolean}
 */
export const isCellInSameAxisWithSelectedCell = (currentCell: ICell, selected: ICell): boolean => {
  if (selected == null) {
    return false;
  }
  const { x, y } = currentCell;
  return x === selected.x || y === selected.y;
}

/**
 * Highlight cell if the cell is reside within 3x3 group of selected or has the same axis (X or Y) of selected cell
 * @param {ICell} currentCell 
 * @param {ICell | null} selected 
 * @returns {boolean}
 */
export const shouldHighlightCell = (currentCell: ICell, selected: ICell | null): boolean => {
  if (selected == null) {
    return false;
  }
  return (
    // cell exists in same (3x3) group of the selected cell
    isCellInSameGroupAsSelectedCell(currentCell, selected) ||
    // cell exists on the same axis (x or y) of the selected cell
    isCellInSameAxisWithSelectedCell(currentCell, selected)
  );
}


/**
 * Sudoku grid cell equality check
 * @param {ICell | null} cell1 
 * @param {ICell | null} cell2 
 * @returns 
 */
export const areCellsEqual = (cell1: ICell | null, cell2: ICell | null) => {
  if (cell1 == null || cell2 == null) {
    return false;
  }
  return cell1.x === cell2.x && cell1.y === cell2.y;
}
