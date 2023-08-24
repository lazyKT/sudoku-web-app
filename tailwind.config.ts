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
        'lime': '#32cd32',
        'lime-light': '#32cd32dd',
        'red': '#ff0000',
        'red-light': '#ff0000aa',
        'primary': '#1e90ff',
        'primary-light': '#1e90ffdd',
        'light-gray': '#f3f6fa',
        'semi-transparent': 'rgba(0,0,0,0.2)'
      },
      maxWidth: {
        550: '550px',
        450: '450px',
        300: '300px',
        800: '800px'
      },
      minWidth: {
        300: '300px'
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
