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