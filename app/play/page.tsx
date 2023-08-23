import Playground from '@/components/playground';
import { Suspense } from 'react';



export default async function Page({ 
  searchParams,
}: {
  searchParams: { [key: string]: undefined | string}
}) {
  return (
    <div className='w-full'>
      <Suspense fallback={<div>Loading ...</div>}>
        {/**
         * If you see `'Promise<Element>' is not a valid JSX element` error,
         * please update the version of TypeScript and @types/react to the latest version.
         * Ref: https://nextjs.org/docs/app/building-your-application/configuring/typescript#async-server-component-typescript-error
         */}
        <Playground difficulty={searchParams['mode']}/>
      </Suspense>
    </div>
  )
}