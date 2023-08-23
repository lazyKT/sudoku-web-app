'use client';

import { convertToNumericValues, convertToSudokuValues, initEmptySudokuGame, solveSudoku, validateSudokuValues } from "@/utils/game-utils";
import { areCellsEqual } from "@/utils/grid-utils";
import { ICell, ISudokuBoard, ISudokuValue } from "@/utils/type-def";
import { useEffect, useState } from "react";
import GameControl from "./game-control";
import GameInstruction from "./game-instruction";
import NewGameDialog from "./new-game-dialog";
import SudokuGrid from "./sudoku-grid";

type IGameProps = {
  puzzle?: ISudokuBoard
}

const Game = ({ puzzle }: IGameProps) => {
  const [sudokuValues, setSudokuValues] = useState<ISudokuBoard>();
  const [invalidCells, setInvalidCells] = useState<number[]>([]);
  const [activeCell, setActiveCell] = useState<ICell | null>(null);
  const [showInstruction, setShowInstruction] = useState<boolean>(false);
  const [showNewGameDialog, setShowNewGameDialog] = useState<boolean>(false);
  // this state is to inform Timer component to restart timer coz new game has started!!!
  const [hasNewGameStarted, setHasNewGameStarted] = useState<boolean>(false);

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

  const handleGetAnswerClick = () => {
    if (sudokuValues) {
      const board: number[][] = convertToNumericValues(sudokuValues);
      solveSudoku(board);
      setSudokuValues(convertToSudokuValues(board, sudokuValues));
    }
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
            handleNewGameClick={() => setShowNewGameDialog(true)}
            handleGetAnswerClick={handleGetAnswerClick}
          />
          {
            showInstruction && <GameInstruction onDismiss={() => setShowInstruction(!showInstruction)}/>
          }
          {
            showNewGameDialog && 
              <NewGameDialog 
                cancelClick={() => setShowNewGameDialog(false)}
              />
          }
        </>
      )}
    </div>
  )
}

export default Game;