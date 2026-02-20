import { LetterResult } from './gameLogic'

export function generateShareText(
  guesses: { result: LetterResult[] }[],
  won: boolean,
  gameNumber?: number
): string {
  const header = `Wordle Clone ${won ? guesses.length : 'X'}/6`

  const grid = guesses
    .map((guess) =>
      guess.result
        .map((r) => {
          if (r.state === 'correct') return '🟩'
          if (r.state === 'present') return '🟨'
          return '⬛'
        })
        .join('')
    )
    .join('\n')

  return `${header}\n\n${grid}`
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}
