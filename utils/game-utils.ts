/**
 * This file contains fuctions related to Sudoku-game logics
 */

import { ICell, ISudokuValue } from "./type-def";

export const initEmptySudokuGame = (): ISudokuValue[][] => {
  const twoD9x9Array: ISudokuValue[][] = [];
  for (let i = 0; i < 9; i ++) {
    twoD9x9Array[i] = [];
    for (let j = 0; j < 9; j++) {
      twoD9x9Array[i][j] = {
        value: ' ',
        mutable: true
      };
    }
  }
  return twoD9x9Array;
}


export const validateSudokuCellValue = (
  value: string,
  currentCell: ICell,
  valuesInBoard: string[][]
) => {
  if (value.trim() === '') {
    return true;
  }
  const { x, y } = currentCell;
  const horizontalValues = valuesInBoard[x];
  const verticalValues = valuesInBoard.map(
    (row: string[]) => row[y]
  );
  return !horizontalValues.includes(value) && !verticalValues.includes(value);
}


/**
 * Validate values in the Sudoku board
 * !! Rules of Sudoku
 *    - Each row must contain the numbers from 1 to 9, without repetitions
 *    - Each column must contain the numbers from 1 to 9, without repetitions
 *    - The digits can only occur once per block (nonet)
 *    - The sum of every single row, column and nonet must equal 45.
 * All of the above rules must be satisfied.
 * @param {string} value: last filled value
 * @param {string} currentCell: last active cell  
 * @param {string} valuesInBoard: values in the sudoku board 
 * @returns 
 */
export const getInvalidCells = (
  value: string,
  currentCell: ICell,
  sudokuValues: ISudokuValue[][]
): ICell[] => {

  if (value.trim() === '') {
    return [];
  }

  const valuesInBoard = sudokuValues.map(
    s => s.map(sv => sv.value)
  );
  const invalidCells: ICell[] = [];
  const { x, y } = currentCell;

  // Each row must contain the numbers from 1 to 9, without repetitions
  const valuesInRow = valuesInBoard[x];
  for (let i = 0; i < valuesInRow.length; i++) {
    if (valuesInRow[i] === value) {
      invalidCells.push({x, y: i});
    }
  }

  // Each column must contain the numbers from 1 to 9, without repetitions
  const valuesInColumn = valuesInBoard.map(
    (row: string[]) => row[y]
  );
  for (let i = 0; i < valuesInColumn.length; i++) {
    if (valuesInColumn[i] === value) {
      invalidCells.push({x: i, y});
    }
  }

  // The digits can only occur once per block (nonet)
  const startX = Math.floor(x/3) * 3;
  const endX = startX + 3;
  const startY = Math.floor(y/3) * 3;
  const endY = startY + 3;
  for (let i = startX; i < endX; i++) {
    for (let j = startY; j < endY; j++) {
      if (valuesInBoard[i][j] === value) {
        invalidCells.push({ x:i, y:j });
        
      }
    }
  }
  
  return invalidCells;
}

