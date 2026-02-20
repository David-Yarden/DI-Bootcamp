export interface GameStats {
  gamesPlayed: number
  gamesWon: number
  currentStreak: number
  maxStreak: number
  guessDistribution: number[] // [1-guess wins, 2-guess wins, ..., 6-guess wins]
}

const STORAGE_KEY = 'wordle-stats'

const DEFAULT_STATS: GameStats = {
  gamesPlayed: 0,
  gamesWon: 0,
  currentStreak: 0,
  maxStreak: 0,
  guessDistribution: [0, 0, 0, 0, 0, 0],
}

export function loadStats(): GameStats {
  if (typeof window === 'undefined') return DEFAULT_STATS

  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      return JSON.parse(saved)
    }
  } catch {
    // Ignore errors
  }
  return DEFAULT_STATS
}

export function saveStats(stats: GameStats): void {
  if (typeof window === 'undefined') return

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats))
  } catch {
    // Ignore errors
  }
}

export function updateStats(stats: GameStats, won: boolean, guesses: number): GameStats {
  const newStats = { ...stats }
  newStats.gamesPlayed++

  if (won) {
    newStats.gamesWon++
    newStats.currentStreak++
    newStats.maxStreak = Math.max(newStats.maxStreak, newStats.currentStreak)
    newStats.guessDistribution[guesses - 1]++
  } else {
    newStats.currentStreak = 0
  }

  return newStats
}

export function getWinPercentage(stats: GameStats): number {
  if (stats.gamesPlayed === 0) return 0
  return Math.round((stats.gamesWon / stats.gamesPlayed) * 100)
}
