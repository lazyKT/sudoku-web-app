import Game from "./game";
import PlaygroundHeader from "./playground-header";
import { ISudokuBoard, Puzzle } from '@/utils/type-def';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'


async function getData(): Promise<ISudokuBoard | undefined> {
  const supabase = createClientComponentClient();
  const { data: puzzles } = await supabase.from('sudoku_puzzles').select().limit(1);
  if (puzzles && puzzles.length > 0) {
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
    return sudokuPuzzle;
  }
  return undefined;
}

const Playground = async () => {
  const puzzleValues = await getData();
  return (
    <div className='flex flex-col flex-wrap items-center w-full'>
      <PlaygroundHeader />
      <Game puzzle={puzzleValues}/>
    </div>
  )
}

export default Playground;