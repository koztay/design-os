import type { FavoriteLocation } from '../types'

interface FavoritesListProps {
  favorites: FavoriteLocation[]
  onSelectFavorite?: (id: string) => void
  onRemoveFavorite?: (id: string) => void
  onClose?: () => void
}

export function FavoritesList({
  favorites,
  onSelectFavorite,
  onRemoveFavorite,
  onClose
}: FavoritesListProps) {
  const getIconElement = (iconName: string) => {
    switch (iconName) {
      case 'home':
        return (
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        )
      case 'work':
        return (
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        )
      case 'library':
        return (
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        )
      case 'train':
        return (
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
        )
      default:
        return (
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          </svg>
        )
    }
  }

  return (
    <div className="w-72 rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-800 sm:w-80">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3 dark:border-slate-700">
        <h3 className="font-semibold text-slate-900 dark:text-white">Favorite Locations</h3>
        <button
          onClick={onClose}
          className="rounded-lg p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-700 dark:hover:text-slate-300"
          aria-label="Close favorites"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Favorites List */}
      <div className="max-h-96 overflow-y-auto p-2">
        {favorites.length === 0 ? (
          <div className="py-12 text-center">
            <svg className="mx-auto mb-3 h-12 w-12 text-slate-300 dark:text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              No favorite locations yet
            </p>
          </div>
        ) : (
          <div className="space-y-1">
            {favorites.map((favorite) => (
              <div
                key={favorite.id}
                className="group flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-slate-50 dark:hover:bg-slate-700/50"
              >
                <button
                  onClick={() => onSelectFavorite?.(favorite.id)}
                  className="flex flex-1 items-center gap-3 text-left"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                    {getIconElement(favorite.icon)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-slate-900 dark:text-white">
                      {favorite.name}
                    </p>
                    <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                      {favorite.location.address}
                    </p>
                  </div>
                </button>
                <button
                  onClick={() => onRemoveFavorite?.(favorite.id)}
                  className="shrink-0 rounded-lg p-1.5 text-slate-400 opacity-0 transition-all hover:bg-red-100 hover:text-red-600 group-hover:opacity-100 dark:hover:bg-red-900/30 dark:hover:text-red-400"
                  aria-label="Remove favorite"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
