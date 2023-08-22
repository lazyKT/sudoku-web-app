import Game from "./game";
import PlaygroundHeader from "./playground-header";

const Playground = () => {
  return (
    <div className='flex flex-col flex-wrap items-center w-full'>
      <PlaygroundHeader />
      <Game />
    </div>
  )
}

export default Playground;