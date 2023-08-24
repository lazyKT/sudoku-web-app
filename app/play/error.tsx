'use client'

import { useCallback, useEffect, useState } from "react";
import ErrorIcon from '@mui/icons-material/Error';

const Error = ({
  error,
  reset
}: {
  error: Error,
  reset: () => void
}) => {
  const [message, setMessage] = useState<string>('');

  const processError = useCallback(() => {
    const { message } = error;
    if (message.endsWith('supabaseUrl and supabaseKey are required!')) {
      setMessage('Couldn\'t connect to Supabase. Invalid credentials!')
    } else {
      setMessage(message);
    }
  }, [error]);

  useEffect(() => {
    processError();
  }, [processError]);
  return (
    <div className='flex flex-col items-center'>
      <div className='w-full flex items-center'>
        <ErrorIcon color='error'/>
        <span className='mx-2 text-base text-slate-600 font-semi-bold'>Something went wrong! </span>
      </div>
      <div
        className='p-4 m-4 rounded bg-red-light text-white text-sm'
      >
        {message}
      </div>
      <button
        className='text-sm text-primary decoration-solid italic'
        onClick={reset}
      >
        Refresh
      </button>
    </div>
  )
}

export default Error;
