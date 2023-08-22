'use client';

import { initEmptySudokuGame, validateSudokuValues } from "@/utils/game-utils";
import { areCellsEqual } from "@/utils/grid-utils";
import { ICell, ISudokuBoard, ISudokuValue } from "@/utils/type-def";
import { useEffect, useState } from "react";
import GameControl from "./game-control";
import SudokuGrid from "./sudoku-grid";

type IGameProps = {
  puzzle?: ISudokuBoard
}

const Game = ({ puzzle }: IGameProps) => {
  const [sudokuValues, setSudokuValues] = useState<ISudokuBoard>(
    () => puzzle ?? initEmptySudokuGame()
  );
  const [invalidCells, setInvalidCells] = useState<string[]>([]);
  const [activeCell, setActiveCell] = useState<ICell | null>(null);

  const fillValueInSudokuBoard = (value: string) => {
    if (activeCell != null) {
      const updatedSudokuValues = sudokuValues.map((row: ISudokuValue[], idx: number) => {
        if (idx === activeCell.x) {
          return row.map((col, cIdx) => cIdx === activeCell.y ? {...col, value} : col)
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

  useEffect(() => {
    const { invalidCells: incorrectCells } = validateSudokuValues(sudokuValues);
    setInvalidCells(incorrectCells);
  }, [sudokuValues]);

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