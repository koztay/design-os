import { useState } from 'react'
import type { MapNavigationProps } from '../types'
import { SearchBar } from './SearchBar'
import { MapContainer } from './MapContainer'
import { FilterPanel } from './FilterPanel'
import { NavigationSheet } from './NavigationSheet'
import { FavoritesList } from './FavoritesList'

/**
 * MapView - Interactive map interface for wheelchair-accessible navigation
 *
 * Design tokens: blue (primary), emerald (secondary), slate (neutral)
 * Typography: Inter
 */
export function MapView({
  accessibilityFeatures,
  obstacles,
  favoriteLocations,
  currentRoute,
  filters,
  isOffline,
  onSearch,
  onCalculateRoute,
  onFeatureClick,
  onObstacleClick,
  onSaveFavorite,
  onRemoveFavorite,
  onToggleFilter,
  onClearRoute,
  onMapMove
}: MapNavigationProps) {
  const [showFilters, setShowFilters] = useState(false)
  const [showFavorites, setShowFavorites] = useState(false)
  const [sheetHeight, setSheetHeight] = useState<'collapsed' | 'expanded'>('collapsed')

  return (
    <div className="relative h-screen w-full overflow-hidden bg-slate-50 dark:bg-slate-950">
      {/* Search Bar Overlay */}
      <div className="absolute top-4 left-4 right-4 z-20 sm:left-6 sm:right-6 md:left-8 md:right-8 lg:left-1/2 lg:right-auto lg:-translate-x-1/2 lg:w-full lg:max-w-2xl">
        <SearchBar
          onSearch={onSearch}
          onToggleFilters={() => setShowFilters(!showFilters)}
          onToggleFavorites={() => setShowFavorites(!showFavorites)}
          showFiltersActive={showFilters}
          showFavoritesActive={showFavorites}
        />
      </div>

      {/* Offline Indicator */}
      {isOffline && (
        <div className="absolute top-20 left-4 z-20 flex items-center gap-2 rounded-lg bg-slate-900/90 px-3 py-2 text-sm text-white backdrop-blur-sm dark:bg-slate-100/90 dark:text-slate-900 sm:left-6 md:left-8">
          <div className="h-2 w-2 rounded-full bg-emerald-400 dark:bg-emerald-500"></div>
          Offline Mode
        </div>
      )}

      {/* Filter Panel Overlay */}
      {showFilters && (
        <div className="absolute top-20 right-4 z-20 sm:right-6 md:right-8 lg:top-24">
          <FilterPanel
            filters={filters}
            onToggleFilter={onToggleFilter}
            onClose={() => setShowFilters(false)}
          />
        </div>
      )}

      {/* Favorites Panel Overlay */}
      {showFavorites && (
        <div className="absolute top-20 left-4 z-20 sm:left-6 md:left-8 lg:top-24">
          <FavoritesList
            favorites={favoriteLocations}
            onSelectFavorite={(id) => {
              const fav = favoriteLocations.find(f => f.id === id)
              if (fav && onCalculateRoute) {
                onCalculateRoute({ lat: 0, lng: 0, name: 'Current Location' }, fav.location)
              }
              setShowFavorites(false)
            }}
            onRemoveFavorite={onRemoveFavorite}
            onClose={() => setShowFavorites(false)}
          />
        </div>
      )}

      {/* Main Map Container */}
      <MapContainer
        accessibilityFeatures={accessibilityFeatures}
        obstacles={obstacles}
        currentRoute={currentRoute}
        filters={filters}
        onFeatureClick={onFeatureClick}
        onObstacleClick={onObstacleClick}
        onMapMove={onMapMove}
      />

      {/* Navigation Bottom Sheet */}
      {currentRoute && (
        <NavigationSheet
          route={currentRoute}
          height={sheetHeight}
          onHeightChange={setSheetHeight}
          onClearRoute={onClearRoute}
        />
      )}
    </div>
  )
}
