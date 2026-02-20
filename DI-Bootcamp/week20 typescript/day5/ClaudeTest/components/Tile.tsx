'use client'

import { LetterState } from '@/lib/constants'

interface TileProps {
  letter: string
  state: LetterState
  isRevealing?: boolean
  delay?: number
}

export default function Tile({ letter, state, isRevealing = false, delay = 0 }: TileProps) {
  const stateStyles: Record<LetterState, string> = {
    correct: 'bg-[#538d4e] border-[#538d4e] text-white',
    present: 'bg-[#b59f3b] border-[#b59f3b] text-white',
    absent: 'bg-[#3a3a3c] border-[#3a3a3c] text-white',
    empty: 'bg-transparent border-[#3a3a3c]',
  }

  const hasLetter = letter !== ''
  const isRevealed = state !== 'empty'

  return (
    <div
      className={`
        w-14 h-14 sm:w-16 sm:h-16
        flex items-center justify-center
        text-2xl sm:text-3xl font-bold uppercase
        border-2 transition-all duration-300
        ${stateStyles[state]}
        ${hasLetter && !isRevealed ? 'border-[#565758] scale-105' : ''}
        ${isRevealing ? 'animate-flip' : ''}
      `}
      style={{
        animationDelay: isRevealing ? `${delay}ms` : '0ms',
      }}
    >
      {letter}
    </div>
  )
}
