import type { VisualSettings, TextSize, ColorBlindnessMode } from '../types'

interface VisualSectionProps {
  settings: VisualSettings
  onHighContrastToggle?: (enabled: boolean) => void
  onTextSizeChange?: (size: TextSize) => void
  onColorBlindnessModeChange?: (mode: ColorBlindnessMode) => void
  onReduceMotionToggle?: (enabled: boolean) => void
}

const textSizes: { value: TextSize; label: string; preview: string }[] = [
  { value: 'small', label: 'Small', preview: 'Aa' },
  { value: 'medium', label: 'Medium', preview: 'Aa' },
  { value: 'large', label: 'Large', preview: 'Aa' },
  { value: 'extra-large', label: 'Extra Large', preview: 'Aa' },
]

const textSizeClasses: Record<TextSize, string> = {
  'small': 'text-sm',
  'medium': 'text-base',
  'large': 'text-lg',
  'extra-large': 'text-xl',
}

const colorBlindnessModes: { value: ColorBlindnessMode; label: string; description: string }[] = [
  { value: 'none', label: 'None', description: 'Default colors' },
  { value: 'protanopia', label: 'Protanopia', description: 'Red-blind' },
  { value: 'deuteranopia', label: 'Deuteranopia', description: 'Green-blind' },
  { value: 'tritanopia', label: 'Tritanopia', description: 'Blue-blind' },
]

export function VisualSection({
  settings,
  onHighContrastToggle,
  onTextSizeChange,
  onColorBlindnessModeChange,
  onReduceMotionToggle,
}: VisualSectionProps) {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Visual Accessibility</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Adjust the display for better visibility
        </p>
      </div>

      {/* High Contrast Mode */}
      <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-slate-900 dark:bg-white flex items-center justify-center">
            <span className="text-white dark:text-slate-900 font-bold text-sm">Aa</span>
          </div>
          <div>
            <p className="font-medium text-slate-900 dark:text-slate-100">High Contrast</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">Increase color contrast for better visibility</p>
          </div>
        </div>
        <button
          onClick={() => onHighContrastToggle?.(!settings.highContrast)}
          className={`relative w-12 h-7 rounded-full transition-colors ${
            settings.highContrast ? 'bg-blue-500' : 'bg-slate-300 dark:bg-slate-600'
          }`}
        >
          <span
            className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
              settings.highContrast ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>

      {/* Text Size */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Text Size</label>
        <div className="grid grid-cols-4 gap-2">
          {textSizes.map((size) => (
            <button
              key={size.value}
              onClick={() => onTextSizeChange?.(size.value)}
              className={`p-3 rounded-xl border-2 transition-all ${
                settings.textSize === size.value
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
              }`}
            >
              <p className={`text-center font-medium ${textSizeClasses[size.value]} ${
                settings.textSize === size.value
                  ? 'text-blue-700 dark:text-blue-400'
                  : 'text-slate-700 dark:text-slate-300'
              }`}>
                {size.preview}
              </p>
              <p className="text-xs text-slate-400 dark:text-slate-500 text-center mt-1">
                {size.label}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Color Blindness Mode */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Color Vision</label>
        <div className="space-y-2">
          {colorBlindnessModes.map((mode) => (
            <button
              key={mode.value}
              onClick={() => onColorBlindnessModeChange?.(mode.value)}
              className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
                settings.colorBlindnessMode === mode.value
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
              }`}
            >
              <div className="flex items-center gap-3">
                {/* Color preview dots */}
                <div className="flex gap-1">
                  <div className={`w-3 h-3 rounded-full ${
                    mode.value === 'protanopia' ? 'bg-slate-400' : 'bg-red-500'
                  }`} />
                  <div className={`w-3 h-3 rounded-full ${
                    mode.value === 'deuteranopia' ? 'bg-slate-400' : 'bg-green-500'
                  }`} />
                  <div className={`w-3 h-3 rounded-full ${
                    mode.value === 'tritanopia' ? 'bg-slate-400' : 'bg-blue-500'
                  }`} />
                </div>
                <div>
                  <p className={`text-sm font-medium ${
                    settings.colorBlindnessMode === mode.value
                      ? 'text-blue-700 dark:text-blue-400'
                      : 'text-slate-700 dark:text-slate-300'
                  }`}>
                    {mode.label}
                  </p>
                  <p className="text-xs text-slate-400 dark:text-slate-500">
                    {mode.description}
                  </p>
                </div>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                settings.colorBlindnessMode === mode.value
                  ? 'border-blue-500 bg-blue-500'
                  : 'border-slate-300 dark:border-slate-600'
              }`}>
                {settings.colorBlindnessMode === mode.value && (
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Reduce Motion */}
      <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
            <svg className="w-5 h-5 text-slate-600 dark:text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p className="font-medium text-slate-900 dark:text-slate-100">Reduce Motion</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">Minimize animations and transitions</p>
          </div>
        </div>
        <button
          onClick={() => onReduceMotionToggle?.(!settings.reduceMotion)}
          className={`relative w-12 h-7 rounded-full transition-colors ${
            settings.reduceMotion ? 'bg-blue-500' : 'bg-slate-300 dark:bg-slate-600'
          }`}
        >
          <span
            className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
              settings.reduceMotion ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>
    </section>
  )
}
