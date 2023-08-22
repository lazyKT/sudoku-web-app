'use client';

import { getInvalidCells, initEmptySudokuGame, validateSudokuCellValue } from "@/utils/game-utils";
import { areCellsEqual } from "@/utils/grid-utils";
import { ICell } from "@/utils/type-def";
import { useEffect, useState } from "react";
import GameControl from "./game-control";
import SudokuGrid from "./sudoku-grid";

const Game = () => {
  const [sudokuValues, setSudokuValues] = useState<string[][]>(initEmptySudokuGame());
  const [invalidCells, setInvalidCells] = useState<ICell[]>([]);
  const [activeCell, setActiveCell] = useState<ICell | null>(null);

  const fillValueInSudokuBoard = (val: string) => {
    if (activeCell != null) {

      const _invalidCells = getInvalidCells(val, activeCell, sudokuValues);
      if (_invalidCells.length > 0) {
        setInvalidCells([
          ...invalidCells,
          ..._invalidCells,
          activeCell
        ]);
      }
      const updatedSudokuValues = sudokuValues.map((row: string[], idx: number) => {
        if (idx === activeCell.x) {
          return row.map((col, cIdx) => cIdx === activeCell.y ? val : col)
        } else {
          return row;
        }
      });
      setSudokuValues(updatedSudokuValues); 
    }
  }


  const handleOnCellClick = (cell: ICell) => {
    if (activeCell == null) {
      setActiveCell(cell);
    } else {
      setActiveCell(areCellsEqual(cell, activeCell) ? null : cell);
    }
  }

  // useEffect(() => {
  //   console.log('sudokuValues', sudokuValues);
  // }, [sudokuValues])

  return (
    <div className='w-full flex flex-wrap justify-center items-center'>
      <SudokuGrid 
        activeCell={activeCell} 
        handleOnCellClick={handleOnCellClick} 
        sudokuValues={sudokuValues}
        handleOnChange={fillValueInSudokuBoard}
        invalidCells={invalidCells}
      />
      <GameControl 
        handleNumberClick={(n: number) => fillValueInSudokuBoard(n.toString())}
        handleDeleteClick={() => fillValueInSudokuBoard(' ')}
      />
    </div>
  )
}

export default Game;