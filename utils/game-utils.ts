/**
 * This file contains fuctions related to Sudoku-game logics
 */

import { ICell, ISudokuBoard, ISudokuValue, SudokuValidationResult } from "./type-def";

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


/**
 * * Validate values in the Sudoku board
 * !! Rules of Sudoku
 *    - Each row must contain the numbers from 1 to 9, without repetitions
 *    - Each column must contain the numbers from 1 to 9, without repetitions
 *    - The digits can only occur once per block (nonet)
 *    - The sum of every single row, column and nonet must equal 45.
 * All of the above rules must be satisfied.
 * @param {ISudokuBoard} puzzle: Updated Sudoku board with values
 * @return {SudokuValidationResult} return the validation result with invalid cells if any
 */
export const validateSudokuValues = (
  puzzle: ISudokuBoard
): SudokuValidationResult => {
  const invalidCells: string[] = [];
  
  const invalid = new Set<number>();
  const board: number[][] = convertToNumericValues(puzzle);
  // iterate through each cell in the board to validate
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const value = board[i][j];
      if (value !== 0 && !isValid(board, value, i, j)) {
        invalid.add((9 * i) + j);
      }
    }
    
  }
  return {
    isValid: invalidCells.length === 0,
    invalidCells: Array.from(invalid)
  }
}


/**
 * Chaeck whether the value is valid on the given cell coordinates
 * @param board: Sudoku board, 9x9 grid
 * @param value new value added to cell
 * @param x x position
 * @param y y postiion
 */
const isValid = (board: number[][] , value: number, x: number, y: number, isNewValue?: boolean): boolean => {
  // check row
  for (let i = 0; i < 9; i++) {
    if (
      (isNewValue || i !== y) && board[x][i] === value ||
      ((isNewValue || i !== x) && board[i][y] === value)
    ) {
      return false;
    }
  }

  // check nonet (3x3 grid)
  const nonetX = x - (x % 3);
  const nonetY = y - (y % 3);
  for (let i = nonetX; i < nonetX + 3; i++) {
    for (let j = nonetY; j < nonetY+3; j++) {
      if ((isNewValue || (i !== x && y !== x)) && board[i][j] === value) {
        return false;
      }
    }
  }

  return true;
}
let executionCount = 1;
/**
 * Solve sudoku values by using backtracking algorithm
 * @param sudokuValues string values on Sudoku UI grid
 */
export const solveSudoku = (board: number[][]) => {
  if (executionCount > 10000000) {
    throw new Error('Critical Error! Detected infinite loop or cannot solve the puzzle!');
  }
  executionCount++;
  let nextEmptyCell = findNextEmptyCell(board);
  if (nextEmptyCell) {
    const {x, y} = nextEmptyCell;
    // try 1-9 value one by one
    for (let i = 1; i < 10; i++) {
      if (isValid(board, i, x, y, true)) {
        board[x][y] = i;
        // Notice the recursive approach here
        // once the valid value value is filled, we will go into recursion instead of moving to the next cell
        // the reason is even though the value(k) is valid right now, 
        // we might end up in the dead end (no valid values) at some cell as we move further
        // so, we want to check how far we can go with the current value we selected
        // if we can get to the end, we're happy and just end the algorithm at that point
        // otherwise, we will need to go back to the current cell and try other values
        if (solveSudoku(board)) {
          return true;
        } else {
          board[x][y] = 0;
        }
      }
    }
    return false;
  } else {
    return true;
  }
}

// find next empty cell in the Sudoku board!
const findNextEmptyCell = (board: number[][]): ICell | undefined => {
  let found = false;
  let emptyCell: ICell | undefined = undefined;
  for (let x = 0; x < 9; x++) {
    for (let y = 0; y < 9; y++) {
      if (board[x][y] === 0) {
        found = true;
        emptyCell = {x, y};
      }
    }
    if (found) {
      break;
    }
  }
  return emptyCell;
}


export const convertToNumericValues = (puzzle: ISudokuBoard): number[][] => {
  const board: number[][] = [];
  for (let i = 0; i < 9; i++) {
    board[i] = [];
    for (let j = 0; j < 9; j++) {
      board[i][j] = puzzle[i][j].value.trim() === '' ? 0 : parseInt(puzzle[i][j].value) 
    }
  }
  return board;
}


export const convertToSudokuValues = (
  board: number[][],
  orignalValues: ISudokuBoard
): ISudokuBoard => {
  const sudokuBoard: ISudokuBoard = [];
  for (let i = 0; i < 9; i++) {
    sudokuBoard[i] = [];
    for (let j = 0; j < 9; j++) {
      sudokuBoard[i][j] = {
        mutable: orignalValues[i][j].mutable,
        value: board[i][j].toString()
      }
    }
  }
  return sudokuBoard;
}
