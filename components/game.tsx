'use client';

import { initEmptySudokuGame, validateSudokuValues } from "@/utils/game-utils";
import { areCellsEqual } from "@/utils/grid-utils";
import { ICell, ISudokuBoard, ISudokuValue } from "@/utils/type-def";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import GameControl from "./game-control";
import GameInstruction from "./game-instruction";
import SudokuGrid from "./sudoku-grid";

type IGameProps = {
  puzzle?: ISudokuBoard
}

const Game = ({ puzzle }: IGameProps) => {
  const router = useRouter();
  const [sudokuValues, setSudokuValues] = useState<ISudokuBoard>();
  const [invalidCells, setInvalidCells] = useState<number[]>([]);
  const [activeCell, setActiveCell] = useState<ICell | null>(null);
  const [showInstruction, setShowInstruction] = useState<boolean>(true);

  const fillValueInSudokuBoard = (value: string) => {
    if (activeCell != null) {
      const updatedSudokuValues = sudokuValues?.map((row: ISudokuValue[], idx: number) => {
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

  const handleNewGameClick = () => {
    localStorage.removeItem('progress');
    localStorage.removeItem('game-difficulty');
    router.refresh();
  }

  useEffect(() => {
    if (sudokuValues) {
      const { invalidCells: incorrectCells } = validateSudokuValues(sudokuValues);
      const gameProgress = JSON.stringify(sudokuValues);
      localStorage.setItem('progress', gameProgress);
      setInvalidCells(incorrectCells);
    }
  }, [sudokuValues]);

  useEffect(() => {
    const gameProgress = localStorage.getItem('progress');
    if (gameProgress != null) {
      setSudokuValues(JSON.parse(gameProgress));
    } else {
      setSudokuValues(puzzle ?? initEmptySudokuGame());
    }
  }, [puzzle]);

  return (
    <div className='w-full flex flex-wrap justify-center items-center'>
      { sudokuValues && (
        <>
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
            handleNewGameClick={handleNewGameClick}
          />
          {
            showInstruction && <GameInstruction onDismiss={() => setShowInstruction(!showInstruction)}/>
          }
        </>
      )}
    </div>
  )
}

export default Game;