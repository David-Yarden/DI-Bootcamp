'use client'

import { LetterState, WORD_LENGTH } from '@/lib/constants'
import Tile from './Tile'

interface RowProps {
  guess: string
  result?: { letter: string; state: LetterState }[]
  isRevealing?: boolean
  isInvalid?: boolean
}

export default function Row({ guess, result, isRevealing = false, isInvalid = false }: RowProps) {
  const tiles = []

  for (let i = 0; i < WORD_LENGTH; i++) {
    const letter = guess[i] || ''
    const state = result?.[i]?.state || 'empty'

    tiles.push(
      <Tile
        key={i}
        letter={letter}
        state={state}
        isRevealing={isRevealing}
        delay={i * 100}
      />
    )
  }

  return (
    <div
      className={`
        flex gap-1.5
        ${isInvalid ? 'animate-shake' : ''}
      `}
    >
      {tiles}
    </div>
  )
}
