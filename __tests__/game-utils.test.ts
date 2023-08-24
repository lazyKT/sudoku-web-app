/**
 * Testing game utility functions
 */
import {
  convertOneLineToSudokuValues,
  isValidForPosition,
  validateSudokuValues
} from '../utils/game-utils';
import { 
  board1OneLine, 
  board2OneLine,
  board3,
  board2OneLineInvalid,
  board3OneLineInvalid 
} from '../__mocks__/mockGrids';


describe('Testing game uitls: validate sudoku values, return invalid cells', () => {
  it('all filled values are valid, expect true', () => {
    const sudokuValues1 = convertOneLineToSudokuValues(board1OneLine);
    const got1 = validateSudokuValues(sudokuValues1);
    expect(got1.isValid).toBeTruthy();
    expect(got1.invalidCells).toHaveLength(0);

    const sudokuValues2 = convertOneLineToSudokuValues(board2OneLine);
    const got2 = validateSudokuValues(sudokuValues2);
    expect(got2.isValid).toBeTruthy();
    expect(got2.invalidCells).toHaveLength(0);
  });

  it('filled values are not valid, expect false', () => {
    const sudokuValues1 = convertOneLineToSudokuValues(board2OneLineInvalid);
    const got1 = validateSudokuValues(sudokuValues1);
    expect(got1.isValid).toBeFalsy();
    expect(got1.invalidCells).toHaveLength(2);

    const sudokuValues2 = convertOneLineToSudokuValues(board3OneLineInvalid);
    const got2 = validateSudokuValues(sudokuValues2);
    expect(got2.isValid).toBeFalsy();
    expect(got2.invalidCells).toHaveLength(4);
  });
});


describe('Test to check if given value is valid for the position', () => {
  it('has same value on the same row, not valid, return false', () => {
    const got = isValidForPosition(board3, 1, 0, 2, true);
    expect(got).toBeFalsy();
  });

  it('has same value on the same col, not valid, return false', () => {
    const got = isValidForPosition(board3, 3, 5, 4, true);
    expect(got).toBeFalsy();
  });

  it('has same value on the same nonet (3x3 grid), not valid, return false', () => {
    const got = isValidForPosition(board3, 8, 7, 4, true);
    expect(got).toBeFalsy();
  });

  it('given value and position is valid, return true', () => {
    const got = isValidForPosition(board3, 6, 1, 2, true);
    expect(got).toBeTruthy();
  });
});
