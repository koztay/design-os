import { useState } from 'react'

interface SearchBarProps {
  onSearch?: (query: string) => void
  onToggleFilters?: () => void
  onToggleFavorites?: () => void
  showFiltersActive?: boolean
  showFavoritesActive?: boolean
}

export function SearchBar({
  onSearch,
  onToggleFilters,
  onToggleFavorites,
  showFiltersActive,
  showFavoritesActive
}: SearchBarProps) {
  const [query, setQuery] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim() && onSearch) {
      onSearch(query)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      {/* Favorites Button */}
      <button
        type="button"
        onClick={onToggleFavorites}
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border transition-all ${
          showFavoritesActive
            ? 'border-blue-500 bg-blue-500 text-white shadow-lg dark:border-blue-400 dark:bg-blue-400'
            : 'border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-blue-400 dark:hover:text-blue-400'
        }`}
        aria-label="Toggle favorites"
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      </button>

      {/* Search Input */}
      <div className="relative flex-1">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search destination..."
          className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 pr-12 text-slate-900 placeholder-slate-400 shadow-lg transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500 dark:focus:border-blue-400 dark:focus:ring-blue-400/20"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg bg-blue-500 p-2 text-white transition-all hover:bg-blue-600 dark:bg-blue-400 dark:hover:bg-blue-500"
          aria-label="Search"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>

      {/* Filter Button */}
      <button
        type="button"
        onClick={onToggleFilters}
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border transition-all ${
          showFiltersActive
            ? 'border-blue-500 bg-blue-500 text-white shadow-lg dark:border-blue-400 dark:bg-blue-400'
            : 'border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-blue-400 dark:hover:text-blue-400'
        }`}
        aria-label="Toggle filters"
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
      </button>
    </form>
  )
}
