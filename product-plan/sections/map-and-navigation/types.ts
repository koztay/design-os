// =============================================================================
// Core Data Types
// =============================================================================

export interface Location {
  /** Latitude coordinate */
  lat: number
  /** Longitude coordinate */
  lng: number
  /** Human-readable address or description */
  address?: string
  /** Optional name for the location */
  name?: string
}

export interface AccessibilityMetadata {
  /** Slope angle in degrees */
  slope: number
  /** Width in centimeters */
  width: number
  /** Surface material type */
  surfaceType: string
  /** Current condition rating */
  condition: 'excellent' | 'good' | 'fair' | 'poor'
}

export interface AccessibilityFeature {
  id: string
  /** Type of accessibility feature */
  type: 'ramp' | 'crossing' | 'sidewalk'
  /** Display name of the feature */
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

export interface Obstacle {
  id: string
  /** Type of obstacle */
  type: 'construction' | 'damaged-sidewalk' | 'stairs-without-ramp' | 'temporary'
  /** Display name of the obstacle */
  name: string
  /** Geographic location */
  location: Location
  /** How severe the barrier is */
  severity: 'low' | 'medium' | 'high'
  /** Current status of the obstacle */
  status: 'active' | 'verified' | 'resolved'
  /** Detailed description */
  description: string
  /** Date the obstacle was first reported (ISO format) */
  reportedDate: string
  /** Expected date when obstacle will be cleared (ISO format or null) */
  estimatedClearance: string | null
}

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
  /** Reference to accessibility feature if this step uses one */
  featureId?: string
}

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

export interface FavoriteLocation {
  id: string
  /** User-defined name for this favorite */
  name: string
  /** Geographic location */
  location: Location
  /** Icon identifier */
  icon: string
  /** Date when favorite was created (ISO format) */
  createdDate: string
}

export interface MapFilter {
  id: string
  /** Display label for the filter */
  label: string
  /** Which data category this filter applies to */
  category: 'accessibilityFeatures' | 'obstacles'
  /** Specific type to filter */
  type: string
  /** Color identifier for map markers */
  color: string
  /** Whether this filter is currently active */
  enabled: boolean
}

// =============================================================================
// Component Props
// =============================================================================

export interface MapNavigationProps {
  /** Accessibility features to display on the map */
  accessibilityFeatures: AccessibilityFeature[]
  /** Obstacles to display on the map */
  obstacles: Obstacle[]
  /** User's saved favorite locations */
  favoriteLocations: FavoriteLocation[]
  /** Currently calculated route (if any) */
  currentRoute?: Route
  /** Active filter settings */
  filters: MapFilter[]
  /** Whether the app is in offline mode */
  isOffline: boolean

  /** Called when user searches for a destination */
  onSearch?: (query: string) => void
  /** Called when user requests route calculation */
  onCalculateRoute?: (start: Location, end: Location) => void
  /** Called when user taps on an accessibility feature marker */
  onFeatureClick?: (featureId: string) => void
  /** Called when user taps on an obstacle marker */
  onObstacleClick?: (obstacleId: string) => void
  /** Called when user saves a location as favorite */
  onSaveFavorite?: (location: Location, name: string) => void
  /** Called when user removes a favorite */
  onRemoveFavorite?: (favoriteId: string) => void
  /** Called when user toggles a map filter */
  onToggleFilter?: (filterId: string) => void
  /** Called when user clears the current route */
  onClearRoute?: () => void
  /** Called when map center/zoom changes */
  onMapMove?: (center: Location, zoom: number) => void
}
