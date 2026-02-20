'use client'

import { GameStats, getWinPercentage } from '@/lib/stats'

interface StatsModalProps {
  stats: GameStats
  isOpen: boolean
  onClose: () => void
  onShare?: () => void
  onNewGame?: () => void
  gameOver?: boolean
  won?: boolean
}

export default function StatsModal({
  stats,
  isOpen,
  onClose,
  onShare,
  onNewGame,
  gameOver,
  won,
}: StatsModalProps) {
  if (!isOpen) return null

  const maxGuesses = Math.max(...stats.guessDistribution, 1)

  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-[#121213] border border-[#3a3a3c] rounded-lg p-6 max-w-sm w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Statistics</h2>
          <button
            onClick={onClose}
            className="text-[#818384] hover:text-white text-2xl"
          >
            &times;
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-2 mb-6 text-center">
          <div>
            <div className="text-3xl font-bold">{stats.gamesPlayed}</div>
            <div className="text-xs text-[#818384]">Played</div>
          </div>
          <div>
            <div className="text-3xl font-bold">{getWinPercentage(stats)}</div>
            <div className="text-xs text-[#818384]">Win %</div>
          </div>
          <div>
            <div className="text-3xl font-bold">{stats.currentStreak}</div>
            <div className="text-xs text-[#818384]">Current Streak</div>
          </div>
          <div>
            <div className="text-3xl font-bold">{stats.maxStreak}</div>
            <div className="text-xs text-[#818384]">Max Streak</div>
          </div>
        </div>

        {/* Guess Distribution */}
        <h3 className="text-sm font-bold mb-2">GUESS DISTRIBUTION</h3>
        <div className="space-y-1 mb-6">
          {stats.guessDistribution.map((count, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="w-3 text-sm">{i + 1}</span>
              <div
                className="bg-[#3a3a3c] h-5 flex items-center justify-end px-2 text-xs font-bold min-w-[20px]"
                style={{
                  width: `${Math.max((count / maxGuesses) * 100, 7)}%`,
                  backgroundColor: count > 0 ? '#538d4e' : '#3a3a3c',
                }}
              >
                {count}
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        {gameOver && (
          <div className="flex gap-2">
            {onShare && (
              <button
                onClick={onShare}
                className="flex-1 bg-[#538d4e] text-white py-3 rounded font-bold hover:bg-[#6aab5f] transition-colors flex items-center justify-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                  />
                </svg>
                Share
              </button>
            )}
            {onNewGame && (
              <button
                onClick={onNewGame}
                className="flex-1 bg-[#818384] text-white py-3 rounded font-bold hover:bg-[#a0a1a2] transition-colors"
              >
                New Game
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
