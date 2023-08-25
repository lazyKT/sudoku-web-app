/**
 * This file contains fuctions related to Sudoku-game logics
 */

import {
  ICell,
  ISudokuBoard,
  ISudokuValue,
  SudokuValidationResult,
} from './type-def';

export const initEmptySudokuGame = (): ISudokuValue[][] => {
  const twoD9x9Array: ISudokuValue[][] = [];
  for (let i = 0; i < 9; i++) {
    twoD9x9Array[i] = [];
    for (let j = 0; j < 9; j++) {
      twoD9x9Array[i][j] = {
        value: ' ',
        mutable: true,
      };
    }
  }
  return twoD9x9Array;
};

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
  const invalid = new Set<number>();
  const board: number[][] = convertToNumericValues(puzzle);
  // iterate through each cell in the board to validate
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      const value = board[i][j];
      if (value !== 0 && !isValidForPosition(board, value, i, j)) {
        invalid.add(board.length * i + j);
      }
    }
  }
  const invalidCells = Array.from(invalid);
  return {
    isValid: invalidCells.length === 0,
    invalidCells,
  };
};

/**
 * Chaeck whether the value is valid on the given cell coordinates
 * @param board: Sudoku board, 9x9 grid
 * @param value new value added to cell
 * @param x x position
 * @param y y postiion
 * @param isNewValue set it to true if you use the function for validation is new value to be added
 */
export const isValidForPosition = (
  board: number[][],
  value: number,
  x: number,
  y: number,
  isNewValue?: boolean
): boolean => {
  // check row
  for (let i = 0; i < board.length; i++) {
    if (
      ((isNewValue || i !== y) && board[x][i] === value) ||
      ((isNewValue || i !== x) && board[i][y] === value)
    ) {
      return false;
    }
  }

  // check nonet (3x3 grid)
  const nonetX = x - (x % 3);
  const nonetY = y - (y % 3);
  for (let i = nonetX; i < nonetX + 3; i++) {
    for (let j = nonetY; j < nonetY + 3; j++) {
      if ((isNewValue || (i !== x && y !== x)) && board[i][j] === value) {
        return false;
      }
    }
  }

  return true;
};

export const solveSudokuAync = (board: number[][]): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    try {
      console.log('inside solveSudokuAync');
      setTimeout(() => {
        resolve(solveSudoku(board));
      }, 0);
    } catch (err) {
      reject(err);
    }
  });
};

let executionCount = 1;
/**
 * Solve sudoku values by using backtracking algorithm
 * @param sudokuValues string values on Sudoku UI grid
 */
export const solveSudoku = (board: number[][]) => {
  if (executionCount > 1000000000) {
    throw new Error(
      'Critical Error! Detected infinite loop or cannot solve the puzzle!'
    );
  }
  executionCount++;
  let nextEmptyCell = getNextEmptyCell(board);
  if (nextEmptyCell) {
    const { x, y } = nextEmptyCell;
    // try 1-9 value one by one
    for (let i = 1; i < 10; i++) {
      if (isValidForPosition(board, i, x, y, true)) {
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
};

// find next empty cell in the Sudoku board!
export const getNextEmptyCell = (board: number[][]): ICell | undefined => {
  let found = false;
  let emptyCell: ICell | undefined = undefined;
  const n = board.length;
  for (let x = 0; x < n; x++) {
    for (let y = 0; y < n; y++) {
      if (board[x][y] === 0) {
        found = true;
        emptyCell = { x, y };
      }
    }
    if (found) {
      break;
    }
  }
  return emptyCell;
};

export const convertToNumericValues = (puzzle: ISudokuBoard): number[][] => {
  const board: number[][] = [];
  const n = puzzle.length;
  for (let i = 0; i < n; i++) {
    board[i] = [];
    for (let j = 0; j < n; j++) {
      board[i][j] =
        puzzle[i][j].value.trim() === '' ? 0 : parseInt(puzzle[i][j].value);
    }
  }
  return board;
};

export const convertToSudokuValues = (
  board: number[][],
  orignalValues: ISudokuBoard
): ISudokuBoard => {
  const n = board.length;
  const sudokuBoard: ISudokuBoard = [];
  for (let i = 0; i < n; i++) {
    sudokuBoard[i] = [];
    for (let j = 0; j < n; j++) {
      sudokuBoard[i][j] = {
        mutable: orignalValues[i][j].mutable,
        value: board[i][j].toString(),
      };
    }
  }
  return sudokuBoard;
};

// convert one-line value to {value: string, mutable: boolean} array
export const convertOneLineToSudokuValues = (oneLine: string): ISudokuBoard => {
  const sudokuPuzzle: ISudokuBoard = [];
  for (let i = 0; i < 9; i++) {
    sudokuPuzzle[i] = [];
    for (let j = 0; j < 9; j++) {
      const idx = 9 * i + j;
      const value = oneLine[idx];
      sudokuPuzzle[i][j] = {
        value: value === '.' ? ' ' : value,
        mutable: value === '.',
      };
    }
  }
  return sudokuPuzzle;
};
