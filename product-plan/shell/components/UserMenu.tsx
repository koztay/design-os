import React, { useState } from 'react'
import { User, LogOut, Globe } from 'lucide-react'

export interface UserMenuProps {
  user?: {
    name: string
    email?: string
    avatarUrl?: string
  }
  currentLanguage?: 'cs' | 'en'
  onLanguageChange?: (language: 'cs' | 'en') => void
  onLogout?: () => void
}

export function UserMenu({ user, currentLanguage = 'en', onLanguageChange, onLogout }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  if (!user) {
    return null
  }

  return (
    <div className="relative">
      {/* User Avatar Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors min-h-[56px]"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="User menu"
      >
        {user.avatarUrl ? (
          <img
            src={user.avatarUrl}
            alt=""
            className="w-10 h-10 rounded-full"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-blue-600 dark:bg-blue-500 flex items-center justify-center">
            <User className="w-6 h-6 text-white" aria-hidden="true" />
          </div>
        )}
        <div className="text-left">
          <div className="text-sm font-medium text-slate-900 dark:text-slate-100">
            {user.name}
          </div>
          {user.email && (
            <div className="text-xs text-slate-500 dark:text-slate-400">
              {user.email}
            </div>
          )}
        </div>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute bottom-full left-0 mb-2 w-64 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 py-2">
          {/* Language Switcher */}
          <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">
              <Globe className="w-4 h-4" aria-hidden="true" />
              <span>Language</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  onLanguageChange?.('cs')
                  setIsOpen(false)
                }}
                className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentLanguage === 'cs'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                }`}
                aria-pressed={currentLanguage === 'cs'}
              >
                Ceština
              </button>
              <button
                onClick={() => {
                  onLanguageChange?.('en')
                  setIsOpen(false)
                }}
                className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentLanguage === 'en'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                }`}
                aria-pressed={currentLanguage === 'en'}
              >
                English
              </button>
            </div>
          </div>

          {/* Logout */}
          <button
            onClick={() => {
              onLogout?.()
              setIsOpen(false)
            }}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            <LogOut className="w-4 h-4" aria-hidden="true" />
            <span>Log out</span>
          </button>
        </div>
      )}
    </div>
  )
}
