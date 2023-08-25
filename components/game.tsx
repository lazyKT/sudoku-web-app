'use client';

import { useGameStateContext } from '@/app/context/gameState';
import {
  convertToNumericValues,
  convertToSudokuValues,
  getNextEmptyCell,
  initEmptySudokuGame,
  solveSudoku,
  validateSudokuValues,
} from '@/utils/game-utils';
import { areCellsEqual } from '@/utils/grid-utils';
import { ICell, ISudokuBoard, ISudokuValue } from '@/utils/type-def';
import { useCallback, useEffect, useState } from 'react';
import CircularLoader from './circular-loader';
import GameControl from './game-control';
import GameFinishedDialog from './game-finish-dialog';
import GameInstruction from './game-instruction';
import NewGameDialog from './new-game-dialog';
import SudokuGrid from './sudoku-grid';

type IGameProps = {
  puzzle?: ISudokuBoard;
  puzzleID?: string;
  difficulty?: number;
};

type SolutionState = {
  error: boolean;
  loading: boolean;
}

const Game = ({ puzzle, puzzleID, difficulty }: IGameProps) => {
  const {
    gameState: { gameFinished, revealedSolution },
    setGameState,
    finishGame,
    updateRevealSolutionStatus,
  } = useGameStateContext();
  const [sudokuValues, setSudokuValues] = useState<ISudokuBoard>();
  const [invalidCells, setInvalidCells] = useState<number[]>([]);
  const [activeCell, setActiveCell] = useState<ICell | null>(null);
  const [showInstruction, setShowInstruction] = useState<boolean>(false);
  const [showNewGameDialog, setShowNewGameDialog] = useState<boolean>(false);
  const [showGameFinishDialog, setShowGameFinishDialog] =
    useState<boolean>(false);
  const [solutionState, setSolutionState] = useState<SolutionState>();

  // get user input either from keyboard or game-control and fill the value in the Sudoku Board
  const fillValueInSudokuBoard = (value: string) => {
    if (activeCell != null) {
      const updatedSudokuValues = sudokuValues?.map(
        (row: ISudokuValue[], idx: number) => {
          if (idx === activeCell.x) {
            return row.map((col, cIdx) =>
              cIdx === activeCell.y ? { ...col, value } : col
            );
          } else {
            return row;
          }
        }
      );
      // save game progress in local storage in case users accidentially refresh page or navigate away
      const gameProgress = JSON.stringify({
        id: puzzleID,
        values: updatedSudokuValues,
      });
      localStorage.setItem('progress', gameProgress);
      setSudokuValues(updatedSudokuValues);
    }
  };

  // handle click action for each cell in the grid (Board)
  const handleOnCellClick = (cell: ICell) => {
    if (activeCell == null) {
      setActiveCell(cell);
    } else {
      setActiveCell(areCellsEqual(cell, activeCell) ? null : cell);
    }
  };

  // Handle click action for `Solve for me` Button
  const handleGetAnswerClick = () => {
    try {
      setSolutionState({ loading: true, error: false });
      if (sudokuValues && !gameFinished) {
        const board: number[][] = convertToNumericValues(sudokuValues);
        solveSudoku(board);
        setSudokuValues(convertToSudokuValues(board, sudokuValues));
        // clear game-progress in local storage
        localStorage.removeItem('progress');
        // update `relavedSolution` property in Game state to true and finish the game
        updateRevealSolutionStatus();
      }
      setSolutionState({ loading: false, error: false });
    } catch (err) {
      setSolutionState({loading: false, error: true});
    }
  };

  // when user finish the game without clicking on `solve for me` button
  const handleGameFinishSuccess = useCallback(
    (_sudokuValues: ISudokuBoard, _invalidCells: number[]) => {
      if (_invalidCells.length === 0) {
        const board: number[][] = convertToNumericValues(_sudokuValues);
        const emptyCell = getNextEmptyCell(board);
        if (!emptyCell) {
          // show game-finish dialog only when game is not finished yet and reveal solution button is not pressed
          if (!gameFinished && !revealedSolution) {
            // update game status
            finishGame();
            setShowGameFinishDialog(true);
            // clear game-progress in local storage
            localStorage.removeItem('progress');
          }
        }
      }
    },
    [finishGame, gameFinished, revealedSolution]
  );

  useEffect(() => {
    if (sudokuValues && sudokuValues != null) {
      const validationResult = validateSudokuValues(sudokuValues);
      setInvalidCells(validationResult.invalidCells);
      handleGameFinishSuccess(sudokuValues, validationResult.invalidCells);
    }
  }, [sudokuValues, handleGameFinishSuccess]);

  useEffect(() => {
    const gameProgress = localStorage.getItem('progress');
    let gameId = null;
    // // check if any in-progress game
    if (gameProgress != null) {
      const { id, values }: { id: string; values: ISudokuBoard } =
        JSON.parse(gameProgress);
      setSudokuValues(values ?? initEmptySudokuGame());
      gameId = id ?? null;
    } else {
      setSudokuValues(puzzle ?? initEmptySudokuGame());
      gameId = puzzleID ?? null;
    }
    // update global game state
    setGameState({
      id: gameId,
      gameFinished: false,
      startTime: new Date().getTime(),
      endTime: null,
      revealedSolution: false,
      difficulty,
    });
  }, [puzzle, setGameState, puzzleID, difficulty]);

  return (
    <div className="w-full flex flex-wrap justify-center items-center">
      {sudokuValues ? (
        <>
          <SudokuGrid
            activeCell={activeCell}
            handleOnCellClick={handleOnCellClick}
            sudokuValues={sudokuValues}
            handleOnChange={fillValueInSudokuBoard}
            invalidCells={invalidCells}
          />
          <GameControl
            handleNumberClick={(n: number) =>
              fillValueInSudokuBoard(n.toString())
            }
            handleDeleteClick={() => fillValueInSudokuBoard(' ')}
            handleNewGameClick={() => setShowNewGameDialog(true)}
            handleGetAnswerClick={handleGetAnswerClick}
          />
          {showInstruction && (
            <GameInstruction
              onDismiss={() => setShowInstruction(!showInstruction)}
            />
          )}
          {showNewGameDialog && (
            <NewGameDialog cancelClick={() => setShowNewGameDialog(false)} />
          )}
          {showGameFinishDialog && (
            <GameFinishedDialog
              // gameStartTime={gameState.startTime}
              onDismiss={() => setShowGameFinishDialog(false)}
              onNewGame={() => {
                setShowGameFinishDialog(false);
                setShowNewGameDialog(true);
              }}
            />
          )}
        </>
      ) : (
        <CircularLoader />
      )}
      {
        (solutionState?.loading || solutionState?.error) && (
        <div className='absolute top-0 w-screen h-screen flex justify-center items-center bg-semi-transparent'>
          <div className='py-4 px-8 rounded bg-white'>
            {
              solutionState.loading && (
                <>
                  <CircularLoader/>
                  <p className='text-sm text-slate-500'>Getting solution ...</p>
                </>
              )
            }
            {
              solutionState.error && (
                <div className='flex flex-col justify-center items-center'>
                  <p className='text-red font-bold text-lg'>Sorry! Couldn't get solution!</p>
                  <button 
                    onClick={() => setSolutionState(undefined)}
                    className='my-2 bg-slate-500 px-4 py-2 rounded text-white'
                  >
                    Dismis
                  </button>
                </div>
              )
            }
          </div>
        </div>
        )
      }
    </div>
  );
};

export default Game;
