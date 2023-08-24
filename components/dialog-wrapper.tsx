import { ReactNode } from "react";

const DialogWrapper = ({ children }: { children: ReactNode}) => {
  return (
    <div className='absolute w-screen h-screen top-0 flex justify-center items-center bg-transparent'>
      <div className='w-2/4 relative max-w-450 min-w-300 p-8 bg-white rounded shadow-lg shadow-black-500/50 flex flex-col items-center'>
        {children}
      </div>
    </div>
  );
}


export default DialogWrapper;
