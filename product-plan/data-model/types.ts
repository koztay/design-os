// =============================================================================
// Core Data Types for AccessiblePrague
// =============================================================================

/**
 * Geographic coordinates with optional address information
 */
export interface Location {
  /** Latitude coordinate (decimal degrees) */
  lat: number
  /** Longitude coordinate (decimal degrees) */
  lng: number
  /** Human-readable address */
  address?: string
  /** Location name or landmark */
  name?: string
}

/**
 * Accessibility characteristics for features
 */
export interface AccessibilityMetadata {
  /** Slope angle in degrees (0-15 typical range) */
  slope: number
  /** Width in centimeters */
  width: number
  /** Surface material type */
  surfaceType: 'paved' | 'cobblestone' | 'gravel' | 'grass' | 'dirt' | 'concrete'
  /** Current condition rating */
  condition: 'excellent' | 'good' | 'fair' | 'poor'
}

/**
 * A barrier-free element that helps wheelchair users navigate
 */
export interface AccessibilityFeature {
  id: string
  /** Type of accessibility feature */
  type: 'ramp' | 'crossing' | 'sidewalk' | 'elevator'
  /** Display name */
  name: string
  /** Geographic location */
  location: Location
  /** Accessibility characteristics */
  metadata: AccessibilityMetadata
  /** Whether this feature has been community-verified */
  verified: boolean
  /** Date of last update (ISO format) */
  lastUpdated: string
}

/**
 * A barrier that blocks or restricts wheelchair access
 */
export interface Obstacle {
  id: string
  /** Type of obstacle */
  type: 'construction' | 'damaged-sidewalk' | 'stairs-without-ramp' | 'temporary'
  /** Display name */
  name: string
  /** Geographic location */
  location: Location
  /** How severe the barrier is */
  severity: 'low' | 'medium' | 'high'
  /** Current status */
  status: 'active' | 'verified' | 'resolved'
  /** Detailed description */
  description: string
  /** Date first reported (ISO format) */
  reportedDate: string
  /** Expected clearance date (ISO format or null) */
  estimatedClearance: string | null
}

/**
 * Report type options
 */
export type ReportType = 'obstacle' | 'improvement' | 'fixed-issue'

/**
 * Report status in the verification workflow
 */
export type ReportStatus = 'pending' | 'active' | 'verified' | 'resolved' | 'disputed'

/**
 * User's vote on a report
 */
export type VoteType = 'verify' | 'dispute'

/**
 * A community-submitted report about accessibility
 */
export interface Report {
  id: string
  type: ReportType
  status: ReportStatus
  title: string
  description: string
  location: Location
  /** Photo evidence URL (optional) */
  photoUrl: string | null
  /** Submission timestamp (ISO format) */
  createdAt: string
  /** Last update timestamp (ISO format) */
  updatedAt: string
  /** Reporter name */
  authorName: string
  /** Number of verify votes */
  verifyCount: number
  /** Number of dispute votes */
  disputeCount: number
  /** Current user's vote (if any) */
  userVote: VoteType | null
}

/**
 * Navigation step in a calculated route
 */
export interface NavigationStep {
  id: string
  /** Turn-by-turn instruction text */
  instruction: string
  /** Distance for this step in meters */
  distance: number
  /** Estimated duration in minutes */
  duration: number
  /** Location where this step begins */
  location: Location
  /** Type of navigation instruction */
  type: 'straight' | 'turn-left' | 'turn-right' | 'feature' | 'warning' | 'arrival'
  /** Reference to accessibility feature (if applicable) */
  featureId?: string
}

/**
 * A calculated accessible route
 */
export interface Route {
  id: string
  /** Starting point */
  start: Location
  /** Destination point */
  end: Location
  /** Total distance in meters */
  distance: number
  /** Estimated travel time in minutes */
  estimatedTime: number
  /** Route difficulty rating */
  difficulty: 'easy' | 'moderate' | 'challenging'
  /** Accessibility score (0-100) */
  accessibilityScore: number
  /** Turn-by-turn navigation instructions */
  steps: NavigationStep[]
  /** IDs of accessibility features along this route */
  featuresUsed: string[]
  /** IDs of obstacles this route avoids */
  obstaclesAvoided: string[]
}

/**
 * A verification vote on a report
 */
export interface Verification {
  id: string
  /** Report being verified */
  reportId: string
  /** User who submitted the vote */
  userId: string
  /** Type of vote */
  voteType: VoteType
  /** When the vote was submitted (ISO format) */
  createdAt: string
}

// =============================================================================
// User Settings Types
// =============================================================================

export type Language = 'cs' | 'en'
export type WheelchairType = 'manual' | 'electric' | 'scooter'
export type SurfaceType = 'paved' | 'cobblestone' | 'gravel' | 'grass' | 'dirt'
export type ColorBlindnessMode = 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia'
export type TextSize = 'small' | 'medium' | 'large' | 'extra-large'

export interface MobilitySettings {
  wheelchairType: WheelchairType
  /** Maximum slope in percentage (0-15) */
  maxSlope: number
  /** Curb height tolerance in cm (0-15) */
  curbHeightTolerance: number
  /** Preferred path width in cm (80-200) */
  preferredPathWidth: number
  walkingSpeed: 'slow' | 'normal' | 'fast'
  restStopsEnabled: boolean
  /** Rest stop interval in minutes (5-60) */
  restStopInterval: number
  avoidStairs: boolean
  surfacePreferences: SurfaceType[]
}

export interface VisualSettings {
  highContrast: boolean
  textSize: TextSize
  colorBlindnessMode: ColorBlindnessMode
  reduceMotion: boolean
}

export interface UserSettings {
  language: Language
  mobility: MobilitySettings
  visual: VisualSettings
}
