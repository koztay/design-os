# Test Instructions: Map & Navigation

These test-writing instructions are **framework-agnostic**. Adapt them to your testing setup (Jest, Vitest, Playwright, Cypress, React Testing Library, etc.).

## Overview

Test the interactive map interface including GPS location, marker rendering, search, route calculation, filtering, and favorites management.

---

## User Flow Tests

### Flow 1: View Current Location

**Scenario:** User opens the app and sees their current location on the map

#### Success Path

**Setup:**
- GPS permission granted
- Mock location: { lat: 50.0880, lng: 14.4207 } (Prague)
- Sample accessibility features and obstacles loaded

**Steps:**
1. User navigates to Map view
2. App requests GPS permission (mock as granted)
3. Map initializes and centers on user location

**Expected Results:**
- [ ] Map renders with OpenStreetMap tiles
- [ ] Blue dot appears at user's location (50.0880, 14.4207)
- [ ] Green markers appear for accessibility features
- [ ] Red markers appear for obstacles
- [ ] "Center on location" button is visible in bottom-right

#### Failure Path: GPS Permission Denied

**Setup:**
- GPS permission denied

**Steps:**
1. User navigates to Map view
2. App requests GPS permission (mock as denied)

**Expected Results:**
- [ ] Map renders at default center (Prague city center)
- [ ] Message appears: "Enable location for better navigation"
- [ ] User can still browse map manually

---

### Flow 2: Search for Destination

**Scenario:** User searches for a destination and calculates a route

#### Success Path

**Setup:**
- User location set
- Search returns results for "Dejvická metro"

**Steps:**
1. User taps search bar (placeholder: "Search destination...")
2. User types "Dejvická metro"
3. User taps search button (magnifying glass icon)
4. Search results appear
5. User selects "Dejvická metro station"

**Expected Results:**
- [ ] Search input accepts text
- [ ] Search button triggers `onSearch` callback with query "Dejvická metro"
- [ ] Results list displays matching locations
- [ ] Selecting result triggers route calculation

#### Failure Path: No Results

**Setup:**
- Search returns empty results

**Steps:**
1. User types "xyznonexistent"
2. User taps search button

**Expected Results:**
- [ ] Empty state message: "No destinations found"
- [ ] Search input retains query text
- [ ] User can modify search and try again

---

### Flow 3: View Calculated Route

**Scenario:** User views route details after calculation

#### Success Path

**Setup:**
- Route calculated with sample data:
  - Distance: 850m
  - Time: 12 min
  - Difficulty: "easy"
  - Accessibility score: 92%
  - 5 navigation steps

**Steps:**
1. Route calculation completes
2. Navigation sheet appears at bottom
3. User taps sheet to expand

**Expected Results:**
- [ ] Route line appears on map (blue polyline)
- [ ] Navigation sheet shows destination name
- [ ] Sheet shows: "850m", "12 min", "92% accessible"
- [ ] Difficulty badge shows "easy" in green
- [ ] Collapsed state shows: "Next: [first step instruction]"
- [ ] Expanded state shows all 5 navigation steps
- [ ] Each step shows instruction, distance, duration
- [ ] Close button (X) clears route when tapped

---

### Flow 4: Filter Map Markers

**Scenario:** User toggles marker visibility using filters

#### Success Path

**Setup:**
- Filters loaded:
  - Accessible Features: Ramps (enabled), Crossings (enabled), Sidewalks (enabled)
  - Obstacles: Construction (enabled), Damaged (enabled), Stairs (enabled)

**Steps:**
1. User taps filter button (funnel icon)
2. Filter panel appears
3. User unchecks "Construction"
4. User closes filter panel

**Expected Results:**
- [ ] Filter button toggles active state (blue when panel open)
- [ ] Filter panel shows two sections: "Accessible Features" and "Obstacles"
- [ ] Each filter has checkbox and colored dot
- [ ] Unchecking "Construction" calls `onToggleFilter` with filter ID
- [ ] Construction markers disappear from map
- [ ] Other markers remain visible

---

### Flow 5: Manage Favorites

**Scenario:** User saves and accesses favorite locations

#### Success Path - Save Favorite

**Setup:**
- Location selected on map or searched

**Steps:**
1. User long-presses location or taps save icon
2. Save modal appears
3. User enters name "Home"
4. User confirms save

**Expected Results:**
- [ ] `onSaveFavorite` called with location and name "Home"
- [ ] Success feedback shown
- [ ] Favorite appears in favorites list

#### Success Path - Use Favorite

**Setup:**
- Favorites: [{ name: "Home", icon: "home", location: {...} }]

**Steps:**
1. User taps favorites button (star icon)
2. Favorites panel appears
3. User taps "Home"

**Expected Results:**
- [ ] Favorites panel shows "Home" with home icon
- [ ] Address displayed below name
- [ ] Tapping "Home" triggers route calculation to that location
- [ ] Panel closes after selection

#### Empty State - No Favorites

**Setup:**
- Favorites array is empty

**Expected Results:**
- [ ] Favorites panel shows star icon (grayed out)
- [ ] Message: "No favorite locations yet"
- [ ] Panel is otherwise empty, no broken UI

---

## Empty State Tests

### No Accessibility Data Loaded

**Setup:**
- `accessibilityFeatures = []`
- `obstacles = []`

**Expected Results:**
- [ ] Map renders without markers
- [ ] No error messages (map is functional)
- [ ] Search still works
- [ ] Filter panel shows filters but toggling has no visible effect

### No Route Active

**Setup:**
- `currentRoute = undefined`

**Expected Results:**
- [ ] No navigation sheet visible
- [ ] No route line on map
- [ ] Map shows only markers

### Offline Mode

**Setup:**
- `isOffline = true`

**Expected Results:**
- [ ] Offline indicator appears: "Offline Mode" with green dot
- [ ] Cached map tiles display (if previously loaded)
- [ ] Features and obstacles from cache display

---

## Component Interaction Tests

### SearchBar

**Renders correctly:**
- [ ] Placeholder text: "Search destination..."
- [ ] Favorites button (star) visible on left
- [ ] Filter button (funnel) visible on right

**User interactions:**
- [ ] Typing updates input value
- [ ] Pressing Enter or tapping search icon calls `onSearch`
- [ ] Tapping favorites button calls `onToggleFavorites`
- [ ] Tapping filter button calls `onToggleFilters`
- [ ] Active state shown when filters/favorites panel open

### FilterPanel

**Renders correctly:**
- [ ] Header: "Map Filters"
- [ ] Close button (X) in header
- [ ] Two sections with headings

**User interactions:**
- [ ] Checking/unchecking calls `onToggleFilter` with filter ID
- [ ] Close button calls `onClose`

### NavigationSheet

**Renders correctly:**
- [ ] Drag handle at top
- [ ] Destination name in heading
- [ ] Difficulty badge with correct color
- [ ] Distance, time, accessibility score

**User interactions:**
- [ ] Tapping expands/collapses sheet
- [ ] Close button calls `onClearRoute`

---

## Edge Cases

- [ ] Very long destination names truncate properly
- [ ] Route with 20+ steps scrolls in expanded sheet
- [ ] Map handles rapid filter toggling without breaking
- [ ] Search with special characters doesn't crash
- [ ] Favorites list with 50+ items scrolls properly

---

## Accessibility Checks

- [ ] All buttons have aria-labels
- [ ] Filter checkboxes have associated labels
- [ ] Navigation sheet is keyboard accessible
- [ ] Map controls have sufficient color contrast
- [ ] Screen reader announces route details

---

## Sample Test Data

```typescript
// Sample accessibility feature
const mockFeature = {
  id: "f1",
  type: "ramp",
  name: "Metro Entrance Ramp",
  location: { lat: 50.0880, lng: 14.4207, address: "Dejvická 1" },
  metadata: { slope: 5, width: 150, surfaceType: "concrete", condition: "good" },
  verified: true,
  lastUpdated: "2024-01-15"
};

// Sample obstacle
const mockObstacle = {
  id: "o1",
  type: "construction",
  name: "Sidewalk Repair",
  location: { lat: 50.0885, lng: 14.4210, address: "Evropská 12" },
  severity: "medium",
  status: "active",
  description: "Sidewalk under repair",
  reportedDate: "2024-01-10",
  estimatedClearance: "2024-02-15"
};

// Sample route
const mockRoute = {
  id: "r1",
  start: { lat: 50.0880, lng: 14.4207, name: "Current Location" },
  end: { lat: 50.1000, lng: 14.4300, name: "Dejvická metro" },
  distance: 850,
  estimatedTime: 12,
  difficulty: "easy",
  accessibilityScore: 92,
  steps: [
    { id: "s1", instruction: "Head north on Evropská", distance: 200, duration: 3, type: "straight" },
    { id: "s2", instruction: "Turn right at the crossing", distance: 150, duration: 2, type: "turn-right" }
  ],
  featuresUsed: ["f1"],
  obstaclesAvoided: ["o1"]
};

// Empty states
const emptyFeatures = [];
const emptyObstacles = [];
const emptyFavorites = [];
```
