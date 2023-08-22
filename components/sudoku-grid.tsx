import { ICell, ISudokuValue } from "@/utils/type-def";
import GridCell from "./grid-cell";

type SudokuGridProps = {
  activeCell: ICell | null;
  sudokuValues: ISudokuValue[][];
  invalidCells: ICell[];
  handleOnCellClick: (cell: ICell) => void;
  handleOnChange: (val: string) => void;
}

const SudokuGrid = ({
  activeCell,
  sudokuValues,
  invalidCells,
  handleOnChange,
  handleOnCellClick,
}: SudokuGridProps) => {

  return (
    <div className='m-4 w-full max-w-450 flex flex-wrap border-l-4 border-t-4 border-slate-600'>
      {
        Array.from(Array(9).keys()).map(
          (row: number) => (
            Array.from(Array(9).keys()).map(
              (col: number) => (
                <GridCell
                  key={`${row},${col}`}
                  position={{x: row, y: col}}
                  active={activeCell}
                  handleClick={handleOnCellClick}
                  sudokuValue={sudokuValues[row][col]}
                  handleOnChange={handleOnChange}
                  // invalidCells={invalidCells}
                />
              )
            )
          )
        )
      }
    </div>
  );
}

export default SudokuGrid;