import type { SettingsPageProps } from '../types'
import { LanguageSection } from './LanguageSection'
import { MobilitySection } from './MobilitySection'
import { VisualSection } from './VisualSection'

export function SettingsPage({
  settings,
  onLanguageChange,
  onWheelchairTypeChange,
  onMaxSlopeChange,
  onCurbHeightChange,
  onPathWidthChange,
  onWalkingSpeedChange,
  onRestStopsToggle,
  onRestStopIntervalChange,
  onAvoidStairsToggle,
  onSurfacePreferenceToggle,
  onHighContrastToggle,
  onTextSizeChange,
  onColorBlindnessModeChange,
  onReduceMotionToggle,
}: SettingsPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
            Settings
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Customize your accessibility preferences
          </p>
        </div>

        {/* Settings Sections */}
        <div className="space-y-8">
          {/* Language */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 shadow-sm">
            <LanguageSection
              settings={settings.language}
              onLanguageChange={onLanguageChange}
            />
          </div>

          {/* Mobility */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 shadow-sm">
            <MobilitySection
              settings={settings.mobility}
              onWheelchairTypeChange={onWheelchairTypeChange}
              onMaxSlopeChange={onMaxSlopeChange}
              onCurbHeightChange={onCurbHeightChange}
              onPathWidthChange={onPathWidthChange}
              onWalkingSpeedChange={onWalkingSpeedChange}
              onRestStopsToggle={onRestStopsToggle}
              onRestStopIntervalChange={onRestStopIntervalChange}
              onAvoidStairsToggle={onAvoidStairsToggle}
              onSurfacePreferenceToggle={onSurfacePreferenceToggle}
            />
          </div>

          {/* Visual */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 shadow-sm">
            <VisualSection
              settings={settings.visual}
              onHighContrastToggle={onHighContrastToggle}
              onTextSizeChange={onTextSizeChange}
              onColorBlindnessModeChange={onColorBlindnessModeChange}
              onReduceMotionToggle={onReduceMotionToggle}
            />
          </div>

          {/* Info Footer */}
          <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="text-sm font-medium text-blue-800 dark:text-blue-300">
                  Settings are saved automatically
                </p>
                <p className="text-sm text-blue-600 dark:text-blue-400 mt-0.5">
                  Your preferences are stored locally on this device and don't require an account.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
