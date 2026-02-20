export const WORD_LENGTH = 5
export const MAX_GUESSES = 6

export type LetterState = 'correct' | 'present' | 'absent' | 'empty'

export interface TileData {
  letter: string
  state: LetterState
}
