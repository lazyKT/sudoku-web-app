'use client';

import { useCallback, useEffect, useRef, useState } from "react";
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { useGameStateContext } from "@/app/context/gameState";




const PlaygroundHeader = () => {
  const {gameState: {gameFinished, startTime, revealedSolution, difficulty, id}} = useGameStateContext();
  const [seconds, setSeconds] = useState<number>(0);
  const [timerStop, setTimerStop] = useState<boolean>(false);
  const intervalFuncRef = useRef<ReturnType<typeof setInterval> | null>(null);

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

  const startTimer = useCallback(() => {
    if (intervalFuncRef.current == null && id != null) {
      const intervalFunc: ReturnType<typeof setInterval> = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
      intervalFuncRef.current = intervalFunc;
      setTimerStop(false);
    }
  }, [id]);

  const stopTimer = () => {
    if (intervalFuncRef.current != null) {
      clearInterval(intervalFuncRef.current);
      intervalFuncRef.current = null; // unregister interval function
      setTimerStop(true);
    }
  }

  const restartTimer = useCallback(() => {
    stopTimer();
    startTimer();
  }, [startTimer]);

  const onClickPausePlayButton = () => {
    if (id != null) {
      if (timerStop) {
        // resume timer
        startTimer();
      } else {
        stopTimer();
      }
      setTimerStop(!timerStop);
    }
  }

  useEffect(() => {
    // NOTE:: GET BACK HERE LATER!!!
    if (seconds > 3599) {
      throw new Error('Time out!!!');
    }
  }, [seconds]);

  useEffect(() => {
    // When game state change (i.e, game finished, new game starts), 
    // restart the timer
    setSeconds(0);
    setTimerStop(false);
    
    if (gameFinished) {
      stopTimer();
    } else {
      restartTimer();
    }

    return () => {
      stopTimer();
    }
  }, [gameFinished, restartTimer, startTime]);


  useEffect(() => {
    // start timer when component is mounted for the first time if puzzle data is ready
    startTimer();
    return () => {
      // remove timer when component unmount
      stopTimer();
    };
  }, [startTimer]);

  return (
    <div className='w-full max-w-800 relative flex justify-between items-center mb-4 px-2'>
      <div>
        <span className='text-sm'>Difficulty:&nbsp;</span>
        <span className='text-base font-semibold'>{getDifficultyValue()}</span>
      </div>
      {
        gameFinished && revealedSolution && (
          <div className='absolute top-0 flex justify-center w-full'>
            <div className='bg-red-light text-white p-2 text-sm rounded'>You have revealed the solution!</div>
          </div>
        )
      }
      <div className='w-24 flex items-end justify-end'>
        <span className='text-slate-600 mr-1 text-sm'>{formatTimeToMMSS()}</span>
        <button
          className='cursor pointer'
          onClick={onClickPausePlayButton}
        >
          {
            (timerStop || gameFinished)
              ? <PlayCircleIcon color='info'/>
              : <PauseCircleIcon color='info'/>
          }
        </button>
      </div>
    </div>
  )
}

export default PlaygroundHeader;