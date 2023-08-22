import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'sky-blue': ''
      },
      maxWidth: {
        450: '450px',
        300: '300px',
      },
      width: {
        cell: 'calc(100% / 9)',
        'control-cell': 'calc(100% / 3)',
        'sudoku-cell': '50px'
      },
      height: {
        'sudoku-cell': '45px'
      }
    },
  },
  plugins: [],
}
export default config
