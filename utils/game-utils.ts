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
  
  // initialize sets for each row, column and nonet in Sudoku board (9x9 grid)
  // why set? (Js|Ts) sets are used to store unique values. 
  // A value in the set may only occur once; it is unique in the set's collection.
  // Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set#description
  // Total of 27 sets (9 for each case (row, column and nonet)) will be created to validate the Sodoku board
  // In this case, we will use the `brute force` to check every cell, 
  // to getto know the coordinates of every cell where invalid values are filled
  const rows = (new Array(9)).fill(null).map(() => new Set<string>());
  const cols = (new Array(9)).fill(null).map(() => new Set<string>());
  const nonets = (new Array(9)).fill(null).map(() => new Set<string>());

  // iterate through each cell in the board to validate
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const value = puzzle[i][j].value;

      if (value.trim() === '') {
        continue;
      }

      const nonetIdx = Math.floor(i/3) * 3 + Math.floor(j/3);
      
      const repeatedValuesInRow = doesValueExistInSet(rows[i], value);
      addRepeatedCellsToInvalidCellArray(repeatedValuesInRow, `${i}${j}`, invalidCells);

      const repeatedValuesInCol = doesValueExistInSet(cols[j], value);
      addRepeatedCellsToInvalidCellArray(repeatedValuesInCol, `${i}${j}`, invalidCells);

      const repeatedValuesInNonet = doesValueExistInSet(nonets[nonetIdx], value);
      addRepeatedCellsToInvalidCellArray(repeatedValuesInNonet, `${i}${j}`, invalidCells);

      rows[i].add(`${i}-${j}-${value}`);
      cols[j].add(`${i}-${j}-${value}`);
      nonets[nonetIdx].add(`${i}-${j}-${value}`);
    }
    
  }

  return {
    isValid: invalidCells.length === 0,
    invalidCells: Array.from(new Set(invalidCells))
  }
}


/**
 * Collect repeated|duplicate values from row, col or nonet and add to invalidCellArray
 * @param {string[]} repeatedValues Repeated or duplicates values in row, col, nonet
 * @param newInvalidCoordinate New duplicate|repeated value
 * @param invalidCells Array to store repeated values which are invalid for Sudoku board
 */
const addRepeatedCellsToInvalidCellArray = (
  repeatedValues: string[],
  newInvalidCoordinate: string,
  invalidCells: string[]
) => {
  let repeatedCoordinates: string[] = [];
  if (repeatedValues.length > 0) {
    repeatedCoordinates = [...repeatedValues.map(toCoordinatesString), newInvalidCoordinate];
    invalidCells.push(...repeatedCoordinates);
  }
}


/**
 * Check whether any value in set has matched the specific regex pattern
 * Non-empty values from every Sudoku board cells are store in Set with the format `${x-coordinate}-${y-coordinate}-${cell-value}`
 * since (x|y)coordinates are unique to every cell, I can store every non-empty values from Sudoku board cells in Set, 
 * To check the repeated|duplicate values in set, I cannot diretly use Set.has() coz of coordinate uniqueness.
 * So, to check if the value in set (row, col, nonet), I can only check last char of stored values in set, i.e cell-value
 * with regex pattern /-[cell-value]$/. 
 * If the regex matches, I can know that there're one or more cells existed in row, col or nonet, with the same value.
 * @param {Set<string>} set set of row, col or nonet values 
 * @param {string} value: value to be searched in the set with RegEx pattern
 * @return {string[]}: return all matched values in the Set 
 */
const doesValueExistInSet = (set: Set<string>, value: string): string[] => {
  if (set.size === 0) {
    return [];
  }
  const repeatedValues: string[] = [];
  const pattern = new RegExp('-'+value+'$', 'gi');
  for (const entry of Array.from(set)) {
    if (pattern.test(entry)) {
      repeatedValues.push(entry);
    }
  }
  return repeatedValues;
}


const toCoordinatesString = (val: string): string => {
  const [x, y] = val.split('-');
  return `${x}${y}`;
}
