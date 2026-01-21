# Milestone 2: Map & Navigation

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Foundation) complete

## Goal

Implement the Map & Navigation feature — an interactive map interface for finding and displaying wheelchair-accessible routes with offline support.

## Overview

The map is the primary interface of AccessiblePrague. Users can view their current location on an OpenStreetMap-based map, see accessibility markers (ramps, crossings, obstacles), search for destinations, calculate wheelchair-optimized routes, and save favorite locations. The entire experience works offline with cached map tiles and data.

**Key Functionality:**
- Full-screen Leaflet map with OpenStreetMap tiles
- Current location indicator with GPS positioning
- Distinct markers for accessibility features (green) and obstacles (red)
- Destination search with autocomplete
- Wheelchair-optimized route calculation
- Filter controls to show/hide different marker types
- Save and manage favorite locations
- Offline mode with Service Worker caching

## Recommended Approach: Test-Driven Development

Before implementing this section, **write tests first** based on the test specifications provided.

See `product-plan/sections/map-and-navigation/tests.md` for detailed test-writing instructions including:
- Key user flows to test (success and failure paths)
- Specific UI elements, button labels, and interactions to verify
- Expected behaviors and assertions

**TDD Workflow:**
1. Read `tests.md` and write failing tests for the key user flows
2. Implement the feature to make tests pass
3. Refactor while keeping tests green

## What to Implement

### Components

Copy the section components from `product-plan/sections/map-and-navigation/components/`:

- `MapContainer.tsx` — Main container managing map state
- `MapView.tsx` — Leaflet map rendering
- `SearchBar.tsx` — Destination search input
- `NavigationSheet.tsx` — Route details overlay
- `FilterPanel.tsx` — Marker visibility toggles
- `FavoritesList.tsx` — Saved locations management

### Data Layer

The components expect these data shapes (see `types.ts`):

- `AccessibilityFeature` — Ramps, crossings, sidewalks with location and metadata
- `Obstacle` — Barriers with severity and status
- `Route` — Calculated path with steps and waypoints
- `FavoriteLocation` — User's saved places
- `MapFilter` — Filter state for different marker types

You'll need to:
- Fetch accessibility features and obstacles from your API
- Implement route calculation logic (consider slope, width, obstacles)
- Store favorites in local storage or user account
- Cache map tiles for offline use (Service Worker)

### Callbacks

Wire up these user actions:

| Callback | Description |
|----------|-------------|
| `onSearch` | User enters destination query |
| `onCalculateRoute` | User requests route from A to B |
| `onFeatureClick` | User taps accessibility feature marker |
| `onObstacleClick` | User taps obstacle marker |
| `onSaveFavorite` | User saves location to favorites |
| `onRemoveFavorite` | User removes a favorite |
| `onToggleFilter` | User toggles marker visibility |
| `onClearRoute` | User dismisses current route |
| `onMapMove` | Map center/zoom changes |

### Empty States

Implement empty state UI for when no records exist yet:

- **No favorites:** Show helpful message "No saved locations yet" with CTA to save current location or search
- **No route:** Default map view without route overlay
- **No search results:** "No destinations found" message
- **Offline with no cached data:** Explain that map requires initial online load

## Files to Reference

- `product-plan/sections/map-and-navigation/README.md` — Feature overview and design intent
- `product-plan/sections/map-and-navigation/tests.md` — Test-writing instructions (use for TDD)
- `product-plan/sections/map-and-navigation/components/` — React components
- `product-plan/sections/map-and-navigation/types.ts` — TypeScript interfaces
- `product-plan/sections/map-and-navigation/sample-data.json` — Test data
- `product-plan/sections/map-and-navigation/screenshot.png` — Visual reference

## Expected User Flows

### Flow 1: View Current Location

1. User opens the app
2. App requests GPS permission
3. Map centers on user's current location with blue dot indicator
4. Accessibility markers appear around the user
5. **Outcome:** User sees their position relative to nearby ramps, crossings, and obstacles

### Flow 2: Calculate Accessible Route

1. User taps the search bar
2. User enters destination (e.g., "Dejvická metro")
3. User selects destination from suggestions
4. App calculates wheelchair-optimized route
5. Route line appears on map with turn-by-turn overlay
6. **Outcome:** User sees accessible path avoiding obstacles, with distance and time estimate

### Flow 3: Filter Map Markers

1. User taps filter button
2. Filter panel slides up showing toggle options
3. User disables "Construction" filter
4. Construction markers disappear from map
5. **Outcome:** Map shows only selected marker types

### Flow 4: Save Favorite Location

1. User long-presses or taps save icon on a location
2. Modal appears to name the favorite
3. User enters name (e.g., "Home")
4. User taps "Save"
5. **Outcome:** Location appears in favorites list for quick access

## Done When

- [ ] Tests written for key user flows (success and failure paths)
- [ ] All tests pass
- [ ] Leaflet map renders with OpenStreetMap tiles
- [ ] GPS location shows user's position
- [ ] Accessibility features show as green markers
- [ ] Obstacles show as red markers
- [ ] Search returns destination suggestions
- [ ] Route calculation considers accessibility constraints
- [ ] Route displays on map with details overlay
- [ ] Filters toggle marker visibility
- [ ] Favorites can be saved and removed
- [ ] Offline mode works with cached tiles
- [ ] Matches the visual design (see screenshot)
- [ ] Responsive on mobile
