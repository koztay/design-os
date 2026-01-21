# Map & Navigation

## Overview

Interactive map interface using OpenStreetMap and Leaflet for finding and displaying wheelchair-accessible routes. Users can search for destinations, view calculated barrier-free routes, filter accessibility data layers, save favorite locations, and browse obstacle/accessibility markers. The map works offline with cached data and centers on the user's current location by default.

## User Flows

- User opens map → app centers on current GPS location → displays accessibility markers on OpenStreetMap
- User enters destination in search → app calculates accessible route → displays route line on map with collapsible overlay showing route summary
- User taps map marker → popup appears showing obstacle or barrier-free element details
- User toggles filters → map updates to show/hide different types of accessibility data
- User saves a location as favorite → location added to saved list for quick access later
- User switches to offline mode → map continues working with cached OSM tiles and data

## Design Decisions

- Full-screen map with overlay controls for maximum map visibility
- Bottom sheet for route details that can be collapsed/expanded
- Distinct marker colors: green for accessible features, red for obstacles
- Filter panel slides in from top-right for quick access
- Large touch targets (48x48px minimum) for accessibility compliance

## Data Used

**Entities:**
- `AccessibilityFeature` — Ramps, crossings, sidewalks with metadata
- `Obstacle` — Construction, damaged sidewalks, stairs
- `Route` — Calculated path with navigation steps
- `FavoriteLocation` — User's saved places
- `MapFilter` — Filter state for markers

**From global model:**
- Location coordinates for all features and obstacles
- Accessibility metadata for route calculations

## Visual Reference

See `screenshot.png` for the target UI design.

## Components Provided

- `MapView` — Main container orchestrating all map components
- `MapContainer` — Leaflet map rendering with markers
- `SearchBar` — Destination search input
- `NavigationSheet` — Collapsible route details overlay
- `FilterPanel` — Marker visibility toggles
- `FavoritesList` — Saved locations management

## Callback Props

| Callback | Description |
|----------|-------------|
| `onSearch` | Called when user searches for a destination |
| `onCalculateRoute` | Called when user requests route calculation |
| `onFeatureClick` | Called when user taps accessibility feature marker |
| `onObstacleClick` | Called when user taps obstacle marker |
| `onSaveFavorite` | Called when user saves a location |
| `onRemoveFavorite` | Called when user removes a favorite |
| `onToggleFilter` | Called when user toggles marker visibility |
| `onClearRoute` | Called when user dismisses current route |
| `onMapMove` | Called when map center/zoom changes |
