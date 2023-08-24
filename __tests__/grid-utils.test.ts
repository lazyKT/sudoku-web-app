import { ICell } from '@/utils/type-def';
import { 
  isCellInSameGroupAsSelectedCell, 
  isCellInSameAxisWithSelectedCell,
  shouldHighlightCell
} from '../utils/grid-utils';

describe('Testing grid utils: check if two cells are in the same 3x3 grid', () => {
  it('two cells are in the same grid, expect true', () => {
    const selectedCell: ICell = {x: 2, y: 1};
    const currentCell: ICell = { x:0, y:1 };
    const got = isCellInSameGroupAsSelectedCell(selectedCell, currentCell);
    expect(got).toBeTruthy();
  });

  it('two cells are not in the same grid, expect false', () => {
    const selectedCell: ICell = {x: 2, y: 1};
    const currentCell: ICell = { x:3, y:1 };
    const got = isCellInSameGroupAsSelectedCell(selectedCell, currentCell);
    expect(got).toBeFalsy();
  });
});

describe('Testing grid utils: check if two cells are in the same column or row', () => {
  it('two cells are in the same row, expect true', () => {
    const selectedCell: ICell = {x: 0, y: 7};
    const currentCell: ICell = { x:0, y:1 };
    const got = isCellInSameAxisWithSelectedCell(selectedCell, currentCell);
    expect(got).toBeTruthy();
  });

  it('two cells are in the same column, expect true', () => {
    const selectedCell: ICell = {x: 4, y: 7};
    const currentCell: ICell = { x:0, y:7 };
    const got = isCellInSameAxisWithSelectedCell(selectedCell, currentCell);
    expect(got).toBeTruthy();
  });

  it('two cells are not in the same row or column, expect false', () => {
    const selectedCell: ICell = {x: 2, y: 1};
    const currentCell: ICell = { x:7, y:6 };
    const got = isCellInSameAxisWithSelectedCell(selectedCell, currentCell);
    expect(got).toBeFalsy();
  });
});

describe('Testing grid utils: if a cell position is in the same nonet group or same axis with other cell', () => {
  it('two cells are in the same nonet group but not on the same axis, expect true', () => {
    const selectedCell: ICell = {x: 2, y: 7};
    const currentCell: ICell = { x:0, y:6 };
    const got = shouldHighlightCell(selectedCell, currentCell);
    expect(got).toBeTruthy();
  });

  it('two cells are on the same row but different group and column, expect true', () => {
    const selectedCell: ICell = {x: 0, y: 7};
    const currentCell: ICell = { x:0, y:6 };
    const got = shouldHighlightCell(selectedCell, currentCell);
    expect(got).toBeTruthy();
  });

  it('two cells are on the same column but different group and row, expect true', () => {
    const selectedCell: ICell = {x: 5, y: 6};
    const currentCell: ICell = { x:0, y:6 };
    const got = shouldHighlightCell(selectedCell, currentCell);
    expect(got).toBeTruthy();
  });

  it('two cells are in different group, column and row, expect false', () => {
    const selectedCell: ICell = {x: 5, y: 6};
    const currentCell: ICell = { x:0, y:5 };
    const got = shouldHighlightCell(selectedCell, currentCell);
    expect(got).toBeFalsy();
  });
});