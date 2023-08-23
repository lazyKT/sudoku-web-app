import Game from "./game";
import PlaygroundHeader from "./playground-header";
import { ISudokuBoard, Puzzle } from '@/utils/type-def';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

type IPuzzleData = {
  data: ISudokuBoard;
  difficulty: number;
}

async function getData(difficulty?: number): Promise<IPuzzleData | undefined> {
  const supabase = createClientComponentClient();
  if (!difficulty) {
    // randomly generate difficulty value(1-3) if not provided
    difficulty = Math.floor(Math.random() * 3) + 1;
  }
  const { data: puzzles } = await supabase.from('sudoku_puzzles').select().eq('difficulty', difficulty).limit(1);
  if (puzzles && puzzles != null && puzzles.length > 0) {
    const puzzle: Puzzle = {
      id: puzzles[0]['id'],
      puzzle: puzzles[0]['puzzle'],
      difficulty: puzzles[0]['difficulty']
    }
    const sudokuPuzzle: ISudokuBoard = [];
    for(let i = 0; i < 9; i++) {
      sudokuPuzzle[i] = [];
      for (let j = 0; j < 9; j++) {
        const idx = (9 * i) + j;
        const value = puzzle.puzzle[idx];
        sudokuPuzzle[i][j] = {
          value: value === '.' ? ' ' : value,
          mutable: value === '.'
        }
      }
    }
    return { data: sudokuPuzzle, difficulty: puzzle.difficulty};
  }
  return undefined;
}

const fetchPuzzleData = async (difficulty?: string): Promise<IPuzzleData | undefined> => {
  if (difficulty && /^[1-3]$/.test(difficulty)) {
    return getData(parseInt(difficulty));
  } else {
    return getData();
  }
}

type PlaygroundProps = {
  difficulty?: string;
}

const Playground = async ({ difficulty }: PlaygroundProps) => {
  const puzzleData = await fetchPuzzleData(difficulty);
  return (
    <div className='flex flex-col flex-wrap items-center w-full'>
      <PlaygroundHeader difficulty={puzzleData?.difficulty}/>
      <Game puzzle={puzzleData?.data}/>
    </div>
  )
}

export default Playground;