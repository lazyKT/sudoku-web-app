'use client';

import { useRouter } from 'next/navigation';
import './globals.css';

export default function Page() {
  const router = useRouter();
  const startNewGame = (difficulty?: number) => {
    localStorage.removeItem('progress');
    localStorage.removeItem('game-difficulty');
    router.push(`/play${difficulty ? '?mode=' + difficulty : ''}`);
  };

  return (
    <div className="flex flex-col justify-center items-center flex-wrap bg-white-500 shadow-lg shadow-black-500/50 p-4 w-full max-w-450">
      <h1 className="text-2xl">Play Sudoku anywhere ...</h1>
      <p className="my-2 text-sm">Select Difficulty:</p>
      <button
        onClick={() => startNewGame(1)}
        className="px-4 py-2 m-2 border rounded bg-violet-500 hover:bg-violet-600 shadow-lg shadow-violet-500/50 w-2/5 flex justify-center items-center text-white text-base"
        data-testid="easy-button"
      >
        Easy
      </button>
      <button
        onClick={() => startNewGame(2)}
        className="px-4 py-2 m-2 border rounded bg-violet-500 hover:bg-violet-600 shadow-lg shadow-violet-500/50 w-2/5 flex justify-center items-center text-white text-base"
        data-testid="medium-button"
      >
        Medium
      </button>
      <button
        onClick={() => startNewGame(3)}
        className="px-4 py-2 m-2 border rounded bg-violet-500 hover:bg-violet-600 shadow-lg shadow-violet-500/50 w-2/5 flex justify-center items-center text-white text-base"
        data-testid="hard-button"
      >
        Hard
      </button>
      <button
        onClick={() => startNewGame()}
        className="px-4 py-2 m-2 border rounded bg-violet-500 hover:bg-violet-600 shadow-lg shadow-violet-500/50 w-2/5 flex justify-center items-center text-white text-base"
        data-testid="random-button"
      >
        Random
      </button>
    </div>
  );
}
