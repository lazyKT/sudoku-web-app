export interface ICell {
  x: number;
  y: number;
}

export interface ISudokuValue {
  mutable: boolean;
  value: string
}

export type ISudokuBoard = ISudokuValue[][];

export type Puzzle = {
  id: string;
  puzzle: string;
  difficulty: number;
}

export type SudokuValidationResult = {
  isValid: boolean;
  // why string?
  // to eliminate duplicates values from invalidCells array easily
  // if I were use ICell, I will need to compare ICell objects deeply to eliminate duplicates
  // and that add more boilerplates to the source code
  invalidCells: number[]
}
