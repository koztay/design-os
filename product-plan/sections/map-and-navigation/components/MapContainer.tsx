import type { AccessibilityFeature, Obstacle, Route, MapFilter, Location } from '../types'

interface MapContainerProps {
  accessibilityFeatures: AccessibilityFeature[]
  obstacles: Obstacle[]
  currentRoute?: Route
  filters: MapFilter[]
  onFeatureClick?: (featureId: string) => void
  onObstacleClick?: (obstacleId: string) => void
  onMapMove?: (center: Location, zoom: number) => void
}

export function MapContainer({
  accessibilityFeatures,
  obstacles,
  currentRoute,
  filters
}: MapContainerProps) {
  // Filter active features and obstacles based on filter settings
  const activeFilters = filters.filter(f => f.enabled)
  const enabledFeatureTypes = activeFilters
    .filter(f => f.category === 'accessibilityFeatures')
    .map(f => f.type)
  const enabledObstacleTypes = activeFilters
    .filter(f => f.category === 'obstacles')
    .map(f => f.type)

  const visibleFeatures = accessibilityFeatures.filter(f => enabledFeatureTypes.includes(f.type))
  const visibleObstacles = obstacles.filter(o => enabledObstacleTypes.includes(o.type))

  return (
    <div className="h-full w-full bg-slate-100 dark:bg-slate-900">
      {/* Map Placeholder - In real implementation, this would be Leaflet map */}
      <div className="relative h-full w-full">
        {/* Simulated Map Background */}
        <div className="h-full w-full bg-gradient-to-br from-slate-200 via-slate-100 to-slate-200 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800">
          {/* Grid Pattern to simulate map tiles */}
          <div className="h-full w-full opacity-30" style={{
            backgroundImage: `
              linear-gradient(to right, rgba(148, 163, 184, 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(148, 163, 184, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}></div>

          {/* Overlay text indicating this is a design preview */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="max-w-md rounded-2xl border border-slate-300 bg-white/90 p-8 text-center shadow-2xl backdrop-blur-sm dark:border-slate-700 dark:bg-slate-800/90">
              <div className="mb-4 flex justify-center">
                <svg className="h-16 w-16 text-blue-500 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-slate-900 dark:text-white">
                OpenStreetMap + Leaflet Integration
              </h3>
              <p className="mb-4 text-sm text-slate-600 dark:text-slate-300">
                This design shows the UI structure. In implementation, integrate Leaflet.js with OpenStreetMap tiles for interactive mapping.
              </p>
              <div className="space-y-2 text-left text-xs text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-emerald-500"></div>
                  <span>{visibleFeatures.length} accessible features visible</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <span>{visibleObstacles.length} obstacles visible</span>
                </div>
                {currentRoute && (
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                    <span>Route with {currentRoute.steps.length} steps</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Current Location Indicator (bottom-right) */}
        <button
          className="absolute bottom-6 right-6 z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 border-white bg-blue-500 text-white shadow-xl transition-all hover:bg-blue-600 dark:border-slate-800 dark:bg-blue-400 dark:hover:bg-blue-500"
          aria-label="Center on current location"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
      </div>
    </div>
  )
}
