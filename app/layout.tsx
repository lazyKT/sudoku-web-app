import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import NavBar from '@/components/navbar'
import PageContainer from '@/components/container'
import GameStateProvider from './context/gameState'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Sudoku App',
  description: 'Sudoku web app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} h-screen w-screen`}>
        <NavBar />
        <GameStateProvider>
          <PageContainer>
            {children}
          </PageContainer>
        </GameStateProvider>
      </body>
    </html>
  )
}
