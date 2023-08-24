import { useGameStateContext } from '@/app/context/gameState';
import Image from 'next/image';
import DialogWrapper from "./dialog-wrapper";

type GameFinishedDialogProps = {
  onDismiss: () => void;
  onNewGame: () => void;
}

const GameFinishedDialog = ({
  onDismiss,
  onNewGame 
}: GameFinishedDialogProps) => {

  const { gameState: { startTime, endTime } } = useGameStateContext();

  const formatTime = (): string => {
    if (endTime != null) {
      const timeDiffInSeconds = Math.floor((endTime - startTime)/1000);
      const minute = Math.floor(timeDiffInSeconds/60);
      const minuteString = minute > 0 ? minute > 1 ? `${minute} minutes ` : `${minute} minute ` : '';
      return `${minuteString}${timeDiffInSeconds%60} seconds`
    }
    return '';
  }

  return (
    <DialogWrapper>
      <Image
        className='mb-4'
        alt='<a href="https://www.flaticon.com/free-icons/award" title="award icons">Award icons created by Freepik - Flaticon</a>'
        src='/trophy_dark.png'
        width={120}
        height={120}
      />
      <h1 className='text-base mb-4 text-slate-500'>Congratulations!</h1>
      <p className='text-sm text-slate-600 text-center'>
        You have solved the puzzle in <b>{formatTime()}</b>
      </p>
      <div className='flex justify-center items-center'>
        <button className='m-2 px-4 py-2 rounded rounded bg-light-gray' onClick={onDismiss}>Close</button>
        <button className='m-2 px-4 py-2 rounded bg-primary-light hover:bg-primary text-white' onClick={onNewGame}>New Game</button>
      </div>
    </DialogWrapper>
  )
}


export default GameFinishedDialog;
