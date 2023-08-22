'use client';

type GameControlProps = {
  handleNumberClick: (n: number) => void;
  handleDeleteClick: () => void;
}

const GameControl = ({
  handleNumberClick,
  handleDeleteClick
}: GameControlProps) => {

  const cellStyle = 'flex bg-violet-500 hover:bg-violet-600 justify-center items-center border border-slate-600 py-2 rounded cursor-pointer';

  return (
    <div className='w-full m-4 max-w-300 grid gap-2 grid-cols-6 grid-rows-3'>
      {
        Array.from(Array(9).keys()).map(
          (n: number) => (
            <div
              key={n}
              className={`${cellStyle} col-span-2`}
              onClick={() => handleNumberClick(n+1)}
            >
              {n + 1}
            </div>
          )
        )
      }
      <div className={`${cellStyle} col-span-3`} onClick={handleDeleteClick}>
        Delete
      </div>
      <div className={`${cellStyle} col-span-3`}>
        New Game
      </div>
    </div>
  )
}

export default GameControl;
