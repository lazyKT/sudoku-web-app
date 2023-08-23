type PlaygroundHeaderProps = {
  difficulty?: number
}

const PlaygroundHeader = ({ difficulty } : PlaygroundHeaderProps) => {

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

  return (
    <div className='w-full flex justify-between items-center px-2 mb-4'>
      <div>
        <span className='text-sm'>Difficulty:&nbsp;</span>
        <span className='text-base font-semibold'>{getDifficultyValue()}</span>
      </div>
      <div>Timer</div>
    </div>
  )
}

export default PlaygroundHeader;