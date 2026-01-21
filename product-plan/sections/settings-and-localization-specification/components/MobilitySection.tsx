import type { MobilitySettings, WheelchairType, SurfaceType } from '../types'

interface MobilitySectionProps {
  settings: MobilitySettings
  onWheelchairTypeChange?: (type: WheelchairType) => void
  onMaxSlopeChange?: (slope: number) => void
  onCurbHeightChange?: (height: number) => void
  onPathWidthChange?: (width: number) => void
  onWalkingSpeedChange?: (speed: 'slow' | 'normal' | 'fast') => void
  onRestStopsToggle?: (enabled: boolean) => void
  onRestStopIntervalChange?: (interval: number) => void
  onAvoidStairsToggle?: (enabled: boolean) => void
  onSurfacePreferenceToggle?: (surface: SurfaceType, preferred: boolean) => void
}

const wheelchairTypes: { value: WheelchairType; label: string; icon: string }[] = [
  { value: 'manual', label: 'Manual', icon: '🦽' },
  { value: 'electric', label: 'Electric', icon: '🦼' },
  { value: 'scooter', label: 'Scooter', icon: '🛵' },
]

const walkingSpeeds: { value: 'slow' | 'normal' | 'fast'; label: string; description: string }[] = [
  { value: 'slow', label: 'Slow', description: '~2 km/h' },
  { value: 'normal', label: 'Normal', description: '~4 km/h' },
  { value: 'fast', label: 'Fast', description: '~6 km/h' },
]

export function MobilitySection({
  settings,
  onWheelchairTypeChange,
  onMaxSlopeChange,
  onCurbHeightChange,
  onPathWidthChange,
  onWalkingSpeedChange,
  onRestStopsToggle,
  onRestStopIntervalChange,
  onAvoidStairsToggle,
  onSurfacePreferenceToggle,
}: MobilitySectionProps) {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Mobility Profile</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Customize route planning based on your mobility needs
        </p>
      </div>

      {/* Wheelchair Type */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Wheelchair Type</label>
        <div className="grid grid-cols-3 gap-3">
          {wheelchairTypes.map((type) => (
            <button
              key={type.value}
              onClick={() => onWheelchairTypeChange?.(type.value)}
              className={`p-3 rounded-xl border-2 transition-all ${
                settings.wheelchairType === type.value
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
              }`}
            >
              <div className="text-2xl text-center mb-1">{type.icon}</div>
              <p className={`text-sm font-medium text-center ${
                settings.wheelchairType === type.value
                  ? 'text-blue-700 dark:text-blue-400'
                  : 'text-slate-700 dark:text-slate-300'
              }`}>
                {type.label}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Avoid Stairs Toggle */}
      <div className="flex items-center justify-between p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🚫</span>
          <div>
            <p className="font-medium text-slate-900 dark:text-slate-100">Avoid Stairs</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">Always find step-free routes</p>
          </div>
        </div>
        <button
          onClick={() => onAvoidStairsToggle?.(!settings.avoidStairs)}
          className={`relative w-12 h-7 rounded-full transition-colors ${
            settings.avoidStairs ? 'bg-blue-500' : 'bg-slate-300 dark:bg-slate-600'
          }`}
        >
          <span
            className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
              settings.avoidStairs ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>

      {/* Max Slope */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Maximum Slope</label>
          <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">{settings.maxSlope}%</span>
        </div>
        <input
          type="range"
          min="0"
          max="15"
          value={settings.maxSlope}
          onChange={(e) => onMaxSlopeChange?.(Number(e.target.value))}
          className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 appearance-none cursor-pointer accent-blue-500"
        />
        <div className="flex justify-between text-xs text-slate-400 dark:text-slate-500">
          <span>Flat (0%)</span>
          <span>Steep (15%)</span>
        </div>
      </div>

      {/* Curb Height Tolerance */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Curb Height Tolerance</label>
          <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">{settings.curbHeightTolerance} cm</span>
        </div>
        <input
          type="range"
          min="0"
          max="15"
          value={settings.curbHeightTolerance}
          onChange={(e) => onCurbHeightChange?.(Number(e.target.value))}
          className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 appearance-none cursor-pointer accent-blue-500"
        />
        <div className="flex justify-between text-xs text-slate-400 dark:text-slate-500">
          <span>Level (0 cm)</span>
          <span>High (15 cm)</span>
        </div>
      </div>

      {/* Preferred Path Width */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Minimum Path Width</label>
          <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">{settings.preferredPathWidth} cm</span>
        </div>
        <input
          type="range"
          min="80"
          max="200"
          step="10"
          value={settings.preferredPathWidth}
          onChange={(e) => onPathWidthChange?.(Number(e.target.value))}
          className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 appearance-none cursor-pointer accent-blue-500"
        />
        <div className="flex justify-between text-xs text-slate-400 dark:text-slate-500">
          <span>Narrow (80 cm)</span>
          <span>Wide (200 cm)</span>
        </div>
      </div>

      {/* Walking Speed */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Travel Speed</label>
        <div className="grid grid-cols-3 gap-3">
          {walkingSpeeds.map((speed) => (
            <button
              key={speed.value}
              onClick={() => onWalkingSpeedChange?.(speed.value)}
              className={`p-3 rounded-xl border-2 transition-all ${
                settings.walkingSpeed === speed.value
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
              }`}
            >
              <p className={`text-sm font-medium text-center ${
                settings.walkingSpeed === speed.value
                  ? 'text-blue-700 dark:text-blue-400'
                  : 'text-slate-700 dark:text-slate-300'
              }`}>
                {speed.label}
              </p>
              <p className="text-xs text-slate-400 dark:text-slate-500 text-center mt-0.5">
                {speed.description}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Rest Stops */}
      <div className="space-y-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-slate-900 dark:text-slate-100">Rest Stop Reminders</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">Get notified to take breaks along your route</p>
          </div>
          <button
            onClick={() => onRestStopsToggle?.(!settings.restStopsEnabled)}
            className={`relative w-12 h-7 rounded-full transition-colors ${
              settings.restStopsEnabled ? 'bg-blue-500' : 'bg-slate-300 dark:bg-slate-600'
            }`}
          >
            <span
              className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                settings.restStopsEnabled ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
        {settings.restStopsEnabled && (
          <div className="pt-3 border-t border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm text-slate-600 dark:text-slate-400">Remind every</label>
              <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">{settings.restStopInterval} min</span>
            </div>
            <input
              type="range"
              min="5"
              max="60"
              step="5"
              value={settings.restStopInterval}
              onChange={(e) => onRestStopIntervalChange?.(Number(e.target.value))}
              className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 appearance-none cursor-pointer accent-blue-500"
            />
          </div>
        )}
      </div>

      {/* Surface Preferences */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Preferred Surfaces</label>
        <p className="text-xs text-slate-500 dark:text-slate-400">Routes will prioritize these surface types when available</p>
        <div className="space-y-2">
          {settings.surfacePreferences.map((surface) => (
            <button
              key={surface.type}
              onClick={() => onSurfacePreferenceToggle?.(surface.type, !surface.preferred)}
              className={`w-full flex items-center justify-between p-3 rounded-xl border-2 transition-all ${
                surface.preferred
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
              }`}
            >
              <span className={`text-sm ${
                surface.preferred
                  ? 'text-blue-700 dark:text-blue-400 font-medium'
                  : 'text-slate-700 dark:text-slate-300'
              }`}>
                {surface.label}
              </span>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                surface.preferred
                  ? 'border-blue-500 bg-blue-500'
                  : 'border-slate-300 dark:border-slate-600'
              }`}>
                {surface.preferred && (
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
