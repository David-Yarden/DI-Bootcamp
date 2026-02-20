'use client'

import { useState, useEffect, useCallback } from 'react'
import { MAX_GUESSES, WORD_LENGTH, LetterState } from '@/lib/constants'
import { getRandomWord, isValidWord } from '@/lib/words'
import { checkGuess, updateLetterStates, LetterResult } from '@/lib/gameLogic'
import { loadStats, saveStats, updateStats, GameStats } from '@/lib/stats'
import { generateShareText, copyToClipboard } from '@/lib/share'
import Grid from './Grid'
import Keyboard from './Keyboard'
import StatsModal from './StatsModal'

interface GuessResult {
  guess: string
  result: LetterResult[]
}

type GameStatus = 'playing' | 'won' | 'lost'

export default function Game() {
  const [targetWord, setTargetWord] = useState('')
  const [guesses, setGuesses] = useState<GuessResult[]>([])
  const [currentGuess, setCurrentGuess] = useState('')
  const [gameStatus, setGameStatus] = useState<GameStatus>('playing')
  const [letterStates, setLetterStates] = useState<Record<string, LetterState>>({})
  const [revealingRow, setRevealingRow] = useState<number | undefined>()
  const [invalidGuess, setInvalidGuess] = useState(false)
  const [message, setMessage] = useState('')
  const [stats, setStats] = useState<GameStats | null>(null)
  const [showStats, setShowStats] = useState(false)

  // Initialize game and load stats
  useEffect(() => {
    setTargetWord(getRandomWord())
    setStats(loadStats())
  }, [])

  // Show temporary message
  const showMessage = useCallback((msg: string, duration = 1500) => {
    setMessage(msg)
    setTimeout(() => setMessage(''), duration)
  }, [])

  // Handle game end
  const handleGameEnd = useCallback((won: boolean, numGuesses: number) => {
    if (stats) {
      const newStats = updateStats(stats, won, numGuesses)
      setStats(newStats)
      saveStats(newStats)
    }

    setTimeout(() => {
      setShowStats(true)
    }, 1500)
  }, [stats])

  // Handle key press
  const handleKey = useCallback((key: string) => {
    if (gameStatus !== 'playing') return

    if (key === 'enter') {
      // Submit guess
      if (currentGuess.length !== WORD_LENGTH) {
        showMessage('Not enough letters')
        setInvalidGuess(true)
        setTimeout(() => setInvalidGuess(false), 300)
        return
      }

      if (!isValidWord(currentGuess)) {
        showMessage('Not in word list')
        setInvalidGuess(true)
        setTimeout(() => setInvalidGuess(false), 300)
        return
      }

      const result = checkGuess(currentGuess, targetWord)
      const newGuesses = [...guesses, { guess: currentGuess, result }]
      setGuesses(newGuesses)
      setLetterStates(updateLetterStates(letterStates, result))
      setCurrentGuess('')
      setRevealingRow(guesses.length)
      setTimeout(() => setRevealingRow(undefined), 500)

      // Check win/lose
      if (currentGuess.toLowerCase() === targetWord.toLowerCase()) {
        setTimeout(() => {
          setGameStatus('won')
          const messages = ['Genius!', 'Magnificent!', 'Impressive!', 'Splendid!', 'Great!', 'Phew!']
          showMessage(messages[Math.min(newGuesses.length - 1, 5)], 3000)
          handleGameEnd(true, newGuesses.length)
        }, 500)
      } else if (newGuesses.length >= MAX_GUESSES) {
        setTimeout(() => {
          setGameStatus('lost')
          showMessage(targetWord.toUpperCase(), 5000)
          handleGameEnd(false, newGuesses.length)
        }, 500)
      }
    } else if (key === 'backspace') {
      setCurrentGuess(prev => prev.slice(0, -1))
    } else if (/^[a-z]$/i.test(key) && currentGuess.length < WORD_LENGTH) {
      setCurrentGuess(prev => prev + key.toLowerCase())
    }
  }, [gameStatus, currentGuess, targetWord, guesses, letterStates, showMessage, handleGameEnd])

  // Physical keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return

      if (e.key === 'Enter') {
        handleKey('enter')
      } else if (e.key === 'Backspace') {
        handleKey('backspace')
      } else if (/^[a-z]$/i.test(e.key)) {
        handleKey(e.key.toLowerCase())
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKey])

  // Share results
  const handleShare = async () => {
    const shareText = generateShareText(guesses, gameStatus === 'won')
    const copied = await copyToClipboard(shareText)
    if (copied) {
      showMessage('Copied to clipboard!')
    } else {
      showMessage('Failed to copy')
    }
  }

  // New game
  const handleNewGame = () => {
    setTargetWord(getRandomWord())
    setGuesses([])
    setCurrentGuess('')
    setGameStatus('playing')
    setLetterStates({})
    setMessage('')
    setShowStats(false)
  }

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Header */}
      <header className="w-full max-w-lg flex items-center justify-between border-b border-[#3a3a3c] pb-3">
        <h1 className="text-3xl font-bold tracking-wide">WORDLE</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setShowStats(true)}
            className="p-2 hover:bg-[#3a3a3c] rounded transition-colors"
            title="Statistics"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </button>
        </div>
      </header>

      {/* Message */}
      {message && (
        <div className="absolute top-24 bg-white text-black px-4 py-2 rounded font-bold text-sm animate-fadeIn z-40">
          {message}
        </div>
      )}

      {/* Grid */}
      <Grid
        guesses={guesses}
        currentGuess={currentGuess}
        revealingRow={revealingRow}
        invalidGuess={invalidGuess}
      />

      {/* Keyboard */}
      <Keyboard
        letterStates={letterStates}
        onKey={handleKey}
        disabled={gameStatus !== 'playing'}
      />

      {/* Stats Modal */}
      {stats && (
        <StatsModal
          stats={stats}
          isOpen={showStats}
          onClose={() => setShowStats(false)}
          onShare={gameStatus !== 'playing' ? handleShare : undefined}
          onNewGame={gameStatus !== 'playing' ? handleNewGame : undefined}
          gameOver={gameStatus !== 'playing'}
          won={gameStatus === 'won'}
        />
      )}
    </div>
  )
}
