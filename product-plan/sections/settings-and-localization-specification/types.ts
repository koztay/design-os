// =============================================================================
// Data Types
// =============================================================================

export type Language = 'cs' | 'en'

export type WheelchairType = 'manual' | 'electric' | 'scooter'

export type SurfaceType = 'paved' | 'cobblestone' | 'gravel' | 'grass' | 'dirt'

export type ColorBlindnessMode = 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia'

export type TextSize = 'small' | 'medium' | 'large' | 'extra-large'

export interface LanguageSettings {
  current: Language
  available: { code: Language; label: string; nativeLabel: string }[]
}

export interface MobilitySettings {
  wheelchairType: WheelchairType
  maxSlope: number // percentage, 0-15
  curbHeightTolerance: number // cm, 0-15
  preferredPathWidth: number // cm, 80-200
  walkingSpeed: 'slow' | 'normal' | 'fast'
  restStopsEnabled: boolean
  restStopInterval: number // minutes, 5-60
  avoidStairs: boolean
  surfacePreferences: {
    type: SurfaceType
    label: string
    preferred: boolean
  }[]
}

export interface VisualSettings {
  highContrast: boolean
  textSize: TextSize
  colorBlindnessMode: ColorBlindnessMode
  reduceMotion: boolean
}

export interface UserSettings {
  language: LanguageSettings
  mobility: MobilitySettings
  visual: VisualSettings
}

// =============================================================================
// Component Props
// =============================================================================

export interface SettingsPageProps {
  /** Current user settings */
  settings: UserSettings

  // Language actions
  /** Called when user changes language */
  onLanguageChange?: (language: Language) => void

  // Mobility actions
  /** Called when user changes wheelchair type */
  onWheelchairTypeChange?: (type: WheelchairType) => void
  /** Called when user changes max slope tolerance */
  onMaxSlopeChange?: (slope: number) => void
  /** Called when user changes curb height tolerance */
  onCurbHeightChange?: (height: number) => void
  /** Called when user changes preferred path width */
  onPathWidthChange?: (width: number) => void
  /** Called when user changes walking speed */
  onWalkingSpeedChange?: (speed: 'slow' | 'normal' | 'fast') => void
  /** Called when user toggles rest stops */
  onRestStopsToggle?: (enabled: boolean) => void
  /** Called when user changes rest stop interval */
  onRestStopIntervalChange?: (interval: number) => void
  /** Called when user toggles avoid stairs */
  onAvoidStairsToggle?: (enabled: boolean) => void
  /** Called when user toggles a surface preference */
  onSurfacePreferenceToggle?: (surface: SurfaceType, preferred: boolean) => void

  // Visual actions
  /** Called when user toggles high contrast mode */
  onHighContrastToggle?: (enabled: boolean) => void
  /** Called when user changes text size */
  onTextSizeChange?: (size: TextSize) => void
  /** Called when user changes color blindness mode */
  onColorBlindnessModeChange?: (mode: ColorBlindnessMode) => void
  /** Called when user toggles reduce motion */
  onReduceMotionToggle?: (enabled: boolean) => void
}
