'use client'

import { LetterState } from '@/lib/constants'

const KEYBOARD_ROWS = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'backspace'],
]

interface KeyboardProps {
  letterStates: Record<string, LetterState>
  onKey: (key: string) => void
  disabled?: boolean
}

export default function Keyboard({ letterStates, onKey, disabled }: KeyboardProps) {
  const getKeyStyle = (key: string) => {
    const state = letterStates[key]

    if (state === 'correct') return 'bg-[#538d4e] text-white border-[#538d4e]'
    if (state === 'present') return 'bg-[#b59f3b] text-white border-[#b59f3b]'
    if (state === 'absent') return 'bg-[#3a3a3c] text-white border-[#3a3a3c]'
    return 'bg-[#818384] text-white hover:bg-[#a0a1a2]'
  }

  return (
    <div className="flex flex-col gap-1.5 items-center">
      {KEYBOARD_ROWS.map((row, i) => (
        <div key={i} className="flex gap-1.5">
          {row.map((key) => {
            const isWideKey = key === 'enter' || key === 'backspace'

            return (
              <button
                key={key}
                onClick={() => onKey(key)}
                disabled={disabled}
                className={`
                  ${isWideKey ? 'px-3 sm:px-4' : 'w-8 sm:w-11'}
                  h-14 rounded font-bold uppercase text-xs sm:text-sm
                  transition-colors duration-150
                  flex items-center justify-center
                  ${getKeyStyle(key)}
                  ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
                `}
              >
                {key === 'backspace' ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 sm:h-6 sm:w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414-6.414a2 2 0 011.414-.586H19a2 2 0 012 2v10a2 2 0 01-2 2h-8.172a2 2 0 01-1.414-.586L3 12z"
                    />
                  </svg>
                ) : (
                  key
                )}
              </button>
            )
          })}
        </div>
      ))}
    </div>
  )
}
