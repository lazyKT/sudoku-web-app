'use client';

import { GameState } from '@/utils/type-def';
import { Dispatch, SetStateAction } from 'react';
import { createContext, ReactNode, useContext, useState } from 'react';

type GameStateContextType = {
  gameState: GameState;
  setGameState: Dispatch<SetStateAction<GameState>>;
  finishGame: () => void;
  updateRevealSolutionStatus: () => void;
};

const initialGameState: GameState = {
  id: null,
  gameFinished: false,
  startTime: 0,
  endTime: null,
  revealedSolution: false,
};

const GameStateContext = createContext<GameStateContextType>({
  gameState: initialGameState,
  setGameState: () => null,
  finishGame: () => null,
  updateRevealSolutionStatus: () => null,
});

const GameStateProvider = ({ children }: { children: ReactNode }) => {
  const [gameState, setGameState] = useState<GameState>(initialGameState);

  const finishGame = () =>
    setGameState({
      ...gameState,
      gameFinished: true,
      endTime: new Date().getTime(),
    });

  const updateRevealSolutionStatus = () =>
    setGameState({ ...gameState, revealedSolution: true, gameFinished: true });

  return (
    <GameStateContext.Provider
      value={{
        gameState,
        setGameState,
        finishGame,
        updateRevealSolutionStatus,
      }}
    >
      {children}
    </GameStateContext.Provider>
  );
};

export default GameStateProvider;
export const useGameStateContext = () => useContext(GameStateContext);
