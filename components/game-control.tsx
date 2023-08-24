'use client';

type GameControlProps = {
  handleNumberClick: (n: number) => void;
  handleDeleteClick: () => void;
  handleNewGameClick: () => void;
  handleGetAnswerClick: () => void;
};

const GameControl = ({
  handleNumberClick,
  handleDeleteClick,
  handleNewGameClick,
  handleGetAnswerClick,
}: GameControlProps) => {
  const cellStyle =
    'flex justify-center items-center border border-slate-600 py-2 rounded cursor-pointer';

  return (
    <div className="w-full m-4 max-w-300 grid gap-2 grid-cols-6 grid-rows-3">
      {Array.from(Array(9).keys()).map((n: number) => (
        <div
          key={n}
          className={`${cellStyle} bg-violet-500 hover:bg-violet-600 col-span-2`}
          onClick={() => handleNumberClick(n + 1)}
        >
          {n + 1}
        </div>
      ))}
      <div
        className={`${cellStyle} bg-red-light col-span-3 text-white border-none hover:bg-red`}
        onClick={handleDeleteClick}
      >
        Delete
      </div>
      <div
        className={`${cellStyle} bg-lime-light col-span-3 text-white border-none hover:bg-lime`}
        onClick={handleGetAnswerClick}
      >
        Solve for me
      </div>
      <div
        className={`${cellStyle} col-span-6 text-white border-none bg-primary-light hover:bg-primary`}
        onClick={handleNewGameClick}
      >
        New Game
      </div>
    </div>
  );
};

export default GameControl;
