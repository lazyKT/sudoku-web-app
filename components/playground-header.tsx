'use client';

import { useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';

type PlaygroundHeaderProps = {
  difficulty?: number,
}


const PlaygroundHeader = ({ difficulty } : PlaygroundHeaderProps) => {

  const [seconds, setSeconds] = useState<number>(0);
  const [timerStop, setTimerStop] = useState<boolean>(false);
  const intervalFuncRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const searchParams = useSearchParams()
  const pathName = usePathname();

  const getDifficultyValue = () => {
    switch(difficulty) {
      case 1:
        return 'Easy';
      case 2:
        return 'Medium';
      case 3:
        return 'Hard';
      default:
        return 'Random';
    }
  }

  const formatTimeToMMSS = (): string => {
    const minute = Math.floor(seconds/60);
    const minuteString = minute < 10 ? `0${minute}` : (minute).toString();
    const secondString = (seconds%60) < 10 ? `0${seconds%60}` : (seconds%60).toString();
    return `${minuteString}:${secondString}`;
  }

  const startTimer = () => {
    if (intervalFuncRef.current == null) {
      const intervalFunc: ReturnType<typeof setInterval> = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
      intervalFuncRef.current = intervalFunc;
    }
  }

  const stopTimer = () => {
    if (intervalFuncRef.current != null) {
      clearInterval(intervalFuncRef.current);
      intervalFuncRef.current = null; // unregister interval function
    }
  }

  const restartTimer = () => {
    stopTimer();
    startTimer();
  }

  const onClickPausePlayButton = () => {
    if (timerStop) {
      // resume timer
      startTimer();
    } else {
      stopTimer();
    }
    setTimerStop(!timerStop);
  }

  useEffect(() => {
    // NOTE:: GET BACK HERE LATER!!!
    if (seconds > 3599) {
      throw new Error('Time out!!!');
    }
  }, [seconds]);

  useEffect(() => {
    setSeconds(0);
    setTimerStop(false);
    restartTimer();

    return () => {
      stopTimer();
    }
  }, [pathName, searchParams]);

  useEffect(() => {
    startTimer();
    return () => {
      stopTimer();
    };
  }, []);

  return (
    <div className='w-full flex justify-between items-center px-2 mb-4'>
      <div>
        <span className='text-sm'>Difficulty:&nbsp;</span>
        <span className='text-base font-semibold'>{getDifficultyValue()}</span>
      </div>
      <div className='flex items-end'>
        <span className='text-slate-600 mr-1 text-sm'>{formatTimeToMMSS()}</span>
        <button
          className='cursor pointer'
          onClick={onClickPausePlayButton}
        >
          {
            timerStop
              ? <PlayCircleIcon color='info'/>
              : <PauseCircleIcon color='info'/>
          }
        </button>
      </div>
    </div>
  )
}

export default PlaygroundHeader;