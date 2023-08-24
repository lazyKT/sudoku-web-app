import DialogWrapper from "./dialog-wrapper";

type GameInstructionProps = {
  onDismiss: () => void;
}

const GameInstruction = ({
  onDismiss
}: GameInstructionProps) => {
  return (
    <DialogWrapper>
      <div className='w-full text-xl font-semi-bold text-slate-600 mb-4'>Before you begin,</div>
      <h1 className='text-lg font-semi-bold'>Basic rules of Sudoku</h1>
      <div className='my-2 bg-light-gray p-8 relative'>
        <ul className='list-disc'>
          <li className='relative text-sm text-slate-500'>Each row must contain the numbers from 1 to 9, without repetitions</li>
          <li className='text-sm text-slate-500 mt-2'>Each column must contain the numbers from 1 to 9, without repetitions</li>
          <li className='text-sm text-slate-500 mt-2'>The digits can only occur once per nonet (3x3 block)</li>
          <li className='text-sm text-slate-500 mt-2'>Each 3×3 block can only contain numbers from 1 to 9.</li>
        </ul>
      </div>
      <h1 className='text-lg font-semi-bold'>How to play?</h1>
      <div className='my-2 bg-light-gray p-8 relative'>
        <ul className='list-disc'>
          <li className='relative text-sm text-slate-500'>Fill values in the blank cells using control pad or keyboard.</li>
          <li className='text-sm text-slate-500 mt-2'>
            You can delete a value in the cell by clicking <code className='bg-red text-white px-1'>Delete</code> button
          </li>
          <li className='text-sm text-slate-500 mt-2'>
            If you want to start a new game, click on <code className='bg-primary text-white px-1'>New Game</code> button
          </li>
          <li className='text-sm text-slate-500 mt-2'>
            You can press on <code className='bg-lime text-white px-1'>Get answers</code> to get answers for the current puzzle.
          </li>
          <li className='text-sm text-slate-500 mt-2'>
            You can pause the timer by clicking on the <code className='bg-primary text-white px-1'>Pause</code> icon beside timer.
          </li>
        </ul>
      </div>
      <button
        className='w-2/4 border rounded shadow-lg shadow-black-500/50 p-2 text-white text-lg bg-primary-light hover:bg-primary'
        onClick={onDismiss}
      >
        Got it!
      </button>
    </DialogWrapper>
  )
}


export default GameInstruction;

