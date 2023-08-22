import Playground from '@/components/playground';
import { Puzzle } from '@/utils/type-def';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Suspense } from 'react';



async function getData() {
  console.log('running getData()');
  const supabase = createClientComponentClient();
  const { data: puzzles } = await supabase.from('sudoku_puzzles').select().limit(1);
  if (puzzles && puzzles.length > 0) {
    const puzzle: Puzzle = {
      id: puzzles[0]['id'],
      puzzle: puzzles[0]['puzzle'],
      difficulty: puzzles[0]['difficulty']
    }
    return puzzle;
  }
  return undefined;
}

export default async function Page() {
  const data = await getData();
  console.log('data', data);
  return (
    <div>
      <Suspense fallback={<div>Loading ...</div>}>
        {/**
         * If you see `'Promise<Element>' is not a valid JSX element` error,
         * please update the version of TypeScript and @types/react to the latest version.
         * Ref: https://nextjs.org/docs/app/building-your-application/configuring/typescript#async-server-component-typescript-error
         */}
        <Playground />
      </Suspense>
    </div>
  )
}