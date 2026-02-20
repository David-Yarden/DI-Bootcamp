'use client'

import { MAX_GUESSES, LetterState } from '@/lib/constants'
import Row from './Row'

interface GuessResult {
  guess: string
  result: { letter: string; state: LetterState }[]
}

interface GridProps {
  guesses: GuessResult[]
  currentGuess: string
  revealingRow?: number
  invalidGuess?: boolean
}

export default function Grid({ guesses, currentGuess, revealingRow, invalidGuess }: GridProps) {
  const rows = []

  for (let i = 0; i < MAX_GUESSES; i++) {
    if (i < guesses.length) {
      // Completed guess
      rows.push(
        <Row
          key={i}
          guess={guesses[i].guess}
          result={guesses[i].result}
          isRevealing={revealingRow === i}
        />
      )
    } else if (i === guesses.length) {
      // Current guess
      rows.push(
        <Row
          key={i}
          guess={currentGuess}
          isInvalid={invalidGuess}
        />
      )
    } else {
      // Empty row
      rows.push(<Row key={i} guess="" />)
    }
  }

  return <div className="flex flex-col gap-1.5">{rows}</div>
}
