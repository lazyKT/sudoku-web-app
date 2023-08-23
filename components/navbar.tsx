import Link from "next/link"

const NavBar = () => {
  return (
    <div className='w-screen px-4 py-2 bg-sky-500/75'>
      <Link href='/'>Sudoku App</Link>
    </div>
  );
}

export default NavBar;