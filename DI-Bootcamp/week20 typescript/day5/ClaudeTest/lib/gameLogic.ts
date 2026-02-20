import { LetterState, WORD_LENGTH } from './constants'

export interface LetterResult {
  letter: string
  state: LetterState
}

// Check a guess against the target word
// Handles duplicate letters correctly
export function checkGuess(guess: string, target: string): LetterResult[] {
  const guessArr = guess.toLowerCase().split('')
  const targetArr = target.toLowerCase().split('')
  const result: LetterResult[] = guessArr.map(letter => ({ letter, state: 'absent' as LetterState }))

  // Track which target letters have been matched
  const targetMatched = new Array(WORD_LENGTH).fill(false)

  // First pass: mark correct letters (green)
  for (let i = 0; i < WORD_LENGTH; i++) {
    if (guessArr[i] === targetArr[i]) {
      result[i].state = 'correct'
      targetMatched[i] = true
    }
  }

  // Second pass: mark present letters (yellow)
  for (let i = 0; i < WORD_LENGTH; i++) {
    if (result[i].state === 'correct') continue

    // Look for this letter in unmatched positions of target
    for (let j = 0; j < WORD_LENGTH; j++) {
      if (!targetMatched[j] && guessArr[i] === targetArr[j]) {
        result[i].state = 'present'
        targetMatched[j] = true
        break
      }
    }
  }

  return result
}

// Update the keyboard letter states based on guess results
export function updateLetterStates(
  currentStates: Record<string, LetterState>,
  guessResult: LetterResult[]
): Record<string, LetterState> {
  const newStates = { ...currentStates }

  for (const { letter, state } of guessResult) {
    const currentState = newStates[letter]

    // Priority: correct > present > absent
    if (state === 'correct') {
      newStates[letter] = 'correct'
    } else if (state === 'present' && currentState !== 'correct') {
      newStates[letter] = 'present'
    } else if (state === 'absent' && !currentState) {
      newStates[letter] = 'absent'
    }
  }

  return newStates
}
