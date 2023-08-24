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

export type IPuzzleDataFromSupabase = {
  data: ISudokuBoard;
  difficulty: number;
  id: string;
}

export type SudokuValidationResult = {
  isValid: boolean;
  // why string?
  // to eliminate duplicates values from invalidCells array easily
  // if I were use ICell, I will need to compare ICell objects deeply to eliminate duplicates
  // and that add more boilerplates to the source code
  invalidCells: number[]
}

export type GameState = {
  id: string | null;
  gameFinished: boolean;
  // when user starts new game,
  // two things can happen: 
  // 1. user getting new game with completely new sudoku board
  // 2. user getting new game with the same sudoku board
  // this attrs is to notify the respective components that 
  // the current game is new game or in-prgress game for 2nd case
  startTime: number;
  endTime: number | null;
  revealedSolution: boolean;
  difficulty?: number;
}
