'use client';

import { useRouter } from 'next/navigation';
import DialogWrapper from './dialog-wrapper';

type NewGameDialogProps = {
  cancelClick: () => void;
};

const NewGameDialog = ({ cancelClick }: NewGameDialogProps) => {
  const router = useRouter();

  const startNewGame = (difficulty?: number) => {
    localStorage.removeItem('progress');
    localStorage.removeItem('game-difficulty');
    cancelClick();
    const rand = Math.random();
    const nonRandomGameModeQuery = `?mode=${difficulty}&rand=${rand}`;
    router.replace(
      `/play${difficulty ? nonRandomGameModeQuery : '?rand=' + rand}`
    );
  };
  return (
    <DialogWrapper>
      <h1 className="text-lg mb-4">Start new game?</h1>
      <button
        onClick={() => startNewGame(1)}
        className="px-4 py-2 m-2 border rounded bg-violet-500 hover:bg-violet-600 shadow-lg shadow-violet-500/50 w-2/5 flex justify-center items-center text-white text-base"
      >
        Easy
      </button>
      <button
        onClick={() => startNewGame(2)}
        className="px-4 py-2 m-2 border rounded bg-violet-500 hover:bg-violet-600 shadow-lg shadow-violet-500/50 w-2/5 flex justify-center items-center text-white text-base"
      >
        Medium
      </button>
      <button
        onClick={() => startNewGame(3)}
        className="px-4 py-2 m-2 border rounded bg-violet-500 hover:bg-violet-600 shadow-lg shadow-violet-500/50 w-2/5 flex justify-center items-center text-white text-base"
      >
        Hard
      </button>
      <button
        onClick={() => startNewGame()}
        className="px-4 py-2 m-2 border rounded bg-violet-500 hover:bg-violet-600 shadow-lg shadow-violet-500/50 w-2/5 flex justify-center items-center text-white text-base"
      >
        Random
      </button>
      <button
        onClick={cancelClick}
        className="px-4 py-2 m-2 border rounded bg-red-light hover:bg-red shadow-lg shadow-violet-500/50 w-2/5 flex justify-center items-center text-white text-base"
      >
        Cancel
      </button>
    </DialogWrapper>
  );
};

export default NewGameDialog;
