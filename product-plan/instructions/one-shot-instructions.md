# AccessiblePrague — Complete Implementation Instructions

---

## About These Instructions

**What you're receiving:**
- Finished UI designs (React components with full styling)
- Data model definitions (TypeScript types and sample data)
- UI/UX specifications (user flows, requirements, screenshots)
- Design system tokens (colors, typography, spacing)
- Test-writing instructions for each section (for TDD approach)

**What you need to build:**
- Backend API endpoints and database schema
- Authentication and authorization
- Data fetching and state management
- Business logic and validation
- Integration of the provided UI components with real data

**Important guidelines:**
- **DO NOT** redesign or restyle the provided components — use them as-is
- **DO** wire up the callback props to your routing and API calls
- **DO** replace sample data with real data from your backend
- **DO** implement proper error handling and loading states
- **DO** implement empty states when no records exist (first-time users, after deletions)
- **DO** use test-driven development — write tests first using `tests.md` instructions
- The components are props-based and ready to integrate — focus on the backend and data layer

---

## Test-Driven Development

Each section includes a `tests.md` file with detailed test-writing instructions. These are **framework-agnostic** — adapt them to your testing setup (Jest, Vitest, Playwright, Cypress, React Testing Library, RSpec, Minitest, PHPUnit, etc.).

**For each section:**
1. Read `product-plan/sections/[section-id]/tests.md`
2. Write failing tests for key user flows (success and failure paths)
3. Implement the feature to make tests pass
4. Refactor while keeping tests green

The test instructions include:
- Specific UI elements, button labels, and interactions to verify
- Expected success and failure behaviors
- Empty state handling (when no records exist yet)
- Data assertions and state validations

---

## Product Overview

**AccessiblePrague** is a Progressive Web App that empowers wheelchair users to navigate confidently through Prague's streets by providing reliable, community-verified information about barrier-free routes, crossings, ramps, and obstacles.

**Planned Sections:**
1. **Map & Navigation** — Interactive map with barrier-free routes and offline support
2. **Community Reporting** — Report submission with photos, GPS, and verification voting
3. **Accessibility Data Management** — Admin data table with import/export
4. **Settings & Localization** — Language switching and accessibility preferences

**Design System:**
- Primary: `blue` — buttons, links, active states
- Secondary: `emerald` — success states, accessible features
- Neutral: `slate` — backgrounds, text, borders
- Typography: Inter (heading/body), IBM Plex Mono (code)

---

# Milestone 1: Foundation

## Goal

Set up the foundational elements: design tokens, data model types, routing structure, and application shell.

## What to Implement

### 1. Design Tokens

Configure your styling system with these tokens:

- See `product-plan/design-system/tokens.css` for CSS custom properties
- See `product-plan/design-system/tailwind-colors.md` for Tailwind configuration
- See `product-plan/design-system/fonts.md` for Google Fonts setup

### 2. Data Model Types

Create TypeScript interfaces for your core entities:

- See `product-plan/data-model/types.ts` for interface definitions
- See `product-plan/data-model/README.md` for entity relationships

**Core Entities:** AccessibilityFeature, Obstacle, Report, Route, Verification, Location

### 3. Routing Structure

| Route | Section |
|-------|---------|
| `/` or `/map` | Map & Navigation (default) |
| `/report` | Community Reporting |
| `/data` | Accessibility Data Management |
| `/settings` | Settings & Localization |

### 4. Application Shell

Copy the shell components from `product-plan/shell/components/`:
- `AppShell.tsx` — Main layout wrapper with bottom navigation
- `MainNav.tsx` — Bottom tab navigation component
- `UserMenu.tsx` — User menu with avatar

## Files to Reference

- `product-plan/design-system/` — Design tokens
- `product-plan/data-model/` — Type definitions
- `product-plan/shell/` — Shell components

## Done When

- [ ] Design tokens are configured (colors, typography)
- [ ] Google Fonts are loaded (Inter, IBM Plex Mono)
- [ ] Data model types are defined in TypeScript
- [ ] Routes exist for all 4 sections
- [ ] Shell renders with bottom tab navigation
- [ ] Active tab is highlighted correctly
- [ ] Responsive on mobile, tablet, desktop
- [ ] Dark mode support works

---

# Milestone 2: Map & Navigation

## Goal

Implement the interactive map interface for finding and displaying wheelchair-accessible routes with offline support.

## Key Functionality

- Full-screen Leaflet map with OpenStreetMap tiles
- Current location indicator with GPS positioning
- Distinct markers for accessibility features (green) and obstacles (red)
- Destination search with autocomplete
- Wheelchair-optimized route calculation
- Filter controls to show/hide different marker types
- Save and manage favorite locations
- Offline mode with Service Worker caching

## Components

Copy from `product-plan/sections/map-and-navigation/components/`:
- `MapView.tsx`, `MapContainer.tsx`, `SearchBar.tsx`, `NavigationSheet.tsx`, `FilterPanel.tsx`, `FavoritesList.tsx`

## Files to Reference

- `product-plan/sections/map-and-navigation/tests.md` — Test-writing instructions
- `product-plan/sections/map-and-navigation/types.ts` — TypeScript interfaces
- `product-plan/sections/map-and-navigation/sample-data.json` — Test data

## Done When

- [ ] Tests written and passing
- [ ] Leaflet map renders with OpenStreetMap tiles
- [ ] GPS location shows user's position
- [ ] Markers display for features and obstacles
- [ ] Search returns destination suggestions
- [ ] Route calculation works
- [ ] Filters toggle marker visibility
- [ ] Favorites can be saved and removed
- [ ] Offline mode works

---

# Milestone 3: Community Reporting

## Goal

Implement the form-based system for users to submit obstacles and improvements with photos, GPS location, and offline submission capability.

## Key Functionality

- Multi-step report creation form (Type → Details → Photo → Location → Review)
- Photo capture from camera or gallery selection
- GPS-based location with manual adjustment
- Offline report submission with sync queue
- Report list with filtering by type and status
- Community voting (verify/dispute) on reports
- Status badges (Pending, Active, Verified, Resolved, Disputed)

## Components

Copy from `product-plan/sections/community-reporting/components/`:
- `ReportForm.tsx`, `ReportTypeSelector.tsx`, `PhotoUpload.tsx`, `LocationPicker.tsx`, `ReportsList.tsx`, `ReportCard.tsx`, `ReportDetail.tsx`, `VoteButtons.tsx`, `PendingReportCard.tsx`, `OfflineBanner.tsx`

## Files to Reference

- `product-plan/sections/community-reporting/tests.md` — Test-writing instructions
- `product-plan/sections/community-reporting/types.ts` — TypeScript interfaces
- `product-plan/sections/community-reporting/sample-data.json` — Test data

## Done When

- [ ] Tests written and passing
- [ ] Multi-step report form works completely
- [ ] Photo capture and gallery selection work
- [ ] GPS location detection works
- [ ] Reports submit successfully (online)
- [ ] Offline reports queue and sync when online
- [ ] Reports list displays with filtering
- [ ] Voting increments counts correctly
- [ ] Empty states display when no reports exist

---

# Milestone 4: Accessibility Data Management

## Goal

Implement the admin-focused interface for maintaining the accessibility database with table views, bulk operations, and import/export capabilities.

## Key Functionality

- Data table with sortable columns
- Advanced search and filtering
- Checkbox selection for bulk actions
- Bulk operations (delete, status change, field updates)
- Import from GeoJSON/CSV with preview
- Export to GeoJSON/CSV with filter scope
- API key management for external access

## Components

Copy from `product-plan/sections/accessibility-data-management/components/`:
- `AccessibilityDataManagement.tsx`, `DataTable.tsx`, `FilterPanel.tsx`, `BulkActionsBar.tsx`, `ImportModal.tsx`, `ApiKeysPanel.tsx`

## Files to Reference

- `product-plan/sections/accessibility-data-management/tests.md` — Test-writing instructions
- `product-plan/sections/accessibility-data-management/types.ts` — TypeScript interfaces
- `product-plan/sections/accessibility-data-management/sample-data.json` — Test data

## Done When

- [ ] Tests written and passing
- [ ] Data table renders with all columns
- [ ] Sorting and filtering work
- [ ] Bulk operations work
- [ ] Import parses GeoJSON and CSV files
- [ ] Export generates valid files
- [ ] API keys can be created and revoked
- [ ] Empty states display appropriately

---

# Milestone 5: Settings & Localization

## Goal

Implement the single-page settings interface for language preferences, mobility settings, and visual accessibility options.

## Key Functionality

- Language switching (Czech/English) with immediate UI update
- Mobility profile (wheelchair type, slopes, curb heights, path widths, surfaces)
- Visual accessibility (high contrast, text size, color blindness modes)
- Local storage persistence (no account required)
- Settings apply immediately without save button

## Components

Copy from `product-plan/sections/settings-and-localization-specification/components/`:
- `SettingsPage.tsx`, `LanguageSection.tsx`, `MobilitySection.tsx`, `VisualSection.tsx`

## Files to Reference

- `product-plan/sections/settings-and-localization-specification/tests.md` — Test-writing instructions
- `product-plan/sections/settings-and-localization-specification/types.ts` — TypeScript interfaces
- `product-plan/sections/settings-and-localization-specification/sample-data.json` — Test data

## Done When

- [ ] Tests written and passing
- [ ] Language toggle switches between Czech and English
- [ ] All UI text updates immediately on language change
- [ ] Wheelchair type selector works
- [ ] All sliders work
- [ ] High contrast toggle applies throughout app
- [ ] Text size changes apply throughout app
- [ ] Color blindness modes adjust colors
- [ ] All settings persist in localStorage
