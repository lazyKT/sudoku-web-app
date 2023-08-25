import Game from './game';
import PlaygroundHeader from './playground-header';
import {
  IPuzzleDataFromSupabase,
  ISudokuBoard,
  Puzzle,
} from '@/utils/type-def';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

async function getData(
  difficulty?: number
): Promise<IPuzzleDataFromSupabase | undefined> {
  const supabase = createServerComponentClient({ cookies });
  if (!difficulty) {
    // randomly generate difficulty value(1-3) if not provided
    difficulty = Math.floor(Math.random() * 3) + 1;
  }
  const { data: puzzles } = await supabase
    .from('sudoku_puzzles')
    .select()
    .eq('difficulty', difficulty)
    .limit(1);
  if (puzzles && puzzles != null && puzzles.length > 0) {
    const puzzle: Puzzle = {
      id: puzzles[0]['id'],
      puzzle: puzzles[0]['puzzle'],
      difficulty: puzzles[0]['difficulty'],
    };
    const sudokuPuzzle: ISudokuBoard = [];
    for (let i = 0; i < 9; i++) {
      sudokuPuzzle[i] = [];
      for (let j = 0; j < 9; j++) {
        const idx = 9 * i + j;
        const value = puzzle.puzzle[idx];
        sudokuPuzzle[i][j] = {
          value: value === '.' ? ' ' : value,
          mutable: value === '.',
        };
      }
    }
    return { data: sudokuPuzzle, difficulty: puzzle.difficulty, id: puzzle.id };
  }
  return undefined;
}

const fetchPuzzleData = async (
  difficulty?: string
): Promise<IPuzzleDataFromSupabase | undefined> => {
  if (difficulty && /^[1-3]$/.test(difficulty)) {
    return getData(parseInt(difficulty));
  } else {
    return getData();
  }
};

type PlaygroundProps = {
  difficulty?: string;
};

const Playground = async ({ difficulty }: PlaygroundProps) => {
  console.log('NEXT_PUBLIC_SUPABASE_URL', process.env.NEXT_PUBLIC_SUPABASE_URL);
  console.log(
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
  const puzzleData = await fetchPuzzleData(difficulty);
  return (
    <div className="flex flex-col flex-wrap items-center w-full">
      <PlaygroundHeader />
      <Game
        puzzle={puzzleData?.data}
        puzzleID={puzzleData?.id}
        difficulty={puzzleData?.difficulty}
      />
    </div>
  );
};

export default Playground;
