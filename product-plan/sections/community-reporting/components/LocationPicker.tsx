import type { LocationPickerProps } from '../types'

// Design tokens: blue (primary), emerald (secondary), slate (neutral)

export function LocationPicker({ location, onRequestLocation, onUpdateLocation }: LocationPickerProps) {
  return (
    <div className="space-y-4">
      {/* Mini map placeholder */}
      <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
        {/* Map background pattern */}
        <div className="absolute inset-0 opacity-30">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-slate-400 dark:text-slate-600" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Center pin */}
        {location && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              {/* Pin shadow */}
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-1 bg-black/20 rounded-full blur-sm" />
              {/* Pin */}
              <svg className="w-10 h-10 text-blue-600 dark:text-blue-500 drop-shadow-lg" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        )}

        {/* Drag hint */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-full text-xs text-slate-600 dark:text-slate-300 shadow-sm">
          Drag pin to adjust location
        </div>

        {/* Zoom controls (decorative) */}
        <div className="absolute top-3 right-3 flex flex-col gap-1">
          <button className="w-8 h-8 flex items-center justify-center bg-white dark:bg-slate-700 rounded-lg shadow-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </button>
          <button className="w-8 h-8 flex items-center justify-center bg-white dark:bg-slate-700 rounded-lg shadow-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
            </svg>
          </button>
        </div>
      </div>

      {/* Location info */}
      <div className="space-y-3">
        {/* Current location button */}
        <button
          onClick={() => onRequestLocation?.()}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
          </svg>
          Use Current Location
        </button>

        {/* Address display */}
        {location && (
          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
            <div className="flex items-start gap-3">
              <div className="shrink-0 p-2 bg-white dark:bg-slate-700 rounded-lg">
                <svg className="w-5 h-5 text-slate-500 dark:text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                {location.address ? (
                  <>
                    <p className="font-medium text-slate-900 dark:text-slate-100">
                      {location.address}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                      {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
                    </p>
                  </>
                ) : (
                  <p className="font-medium text-slate-900 dark:text-slate-100">
                    {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
                  </p>
                )}
                {location.accuracy && (
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                    Accuracy: ±{location.accuracy}m
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Manual address entry */}
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Or enter address manually
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Search for an address..."
              className="w-full px-4 py-3 pl-11 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
            />
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
