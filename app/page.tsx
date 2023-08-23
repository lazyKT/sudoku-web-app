import Link from 'next/link';
import './globals.css';

export default function Page() {
  return (
    <div className='flex flex-col justify-center items-center flex-wrap bg-white-500 shadow-lg shadow-black-500/50 p-4 w-full max-w-450'>
      <h1 className='text-2xl'>Play Sudoku anywhere ...</h1>
      <p className='my-2 text-sm'>Select Difficulty:</p>
      <Link 
        href='/play?mode=1' 
        className='px-4 py-2 m-2 border rounded bg-violet-500 hover:bg-violet-600 shadow-lg shadow-violet-500/50 w-2/5 flex justify-center items-center text-white text-base'>
        Easy
      </Link>
      <Link 
        href='/play?mode=2' 
        className='px-4 py-2 m-2 border rounded bg-violet-500 hover:bg-violet-600 shadow-lg shadow-violet-500/50 w-2/5 flex justify-center items-center text-white text-base'>
        Medium
      </Link>
      <Link 
        href='/play?mode=3' 
        className='px-4 py-2 m-2 border rounded bg-violet-500 hover:bg-violet-600 shadow-lg shadow-violet-500/50 w-2/5 flex justify-center items-center text-white text-base'>
        Hard
      </Link>
      <Link 
        href='/play' 
        className='px-4 py-2 m-2 border rounded bg-violet-500 hover:bg-violet-600 shadow-lg shadow-violet-500/50 w-2/5 flex justify-center items-center text-white text-base'>
        Random
      </Link>
    </div>
  )
}
