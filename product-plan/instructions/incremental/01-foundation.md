# Milestone 1: Foundation

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** None

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

## Goal

Set up the foundational elements: design tokens, data model types, routing structure, and application shell.

## What to Implement

### 1. Design Tokens

Configure your styling system with these tokens:

- See `product-plan/design-system/tokens.css` for CSS custom properties
- See `product-plan/design-system/tailwind-colors.md` for Tailwind configuration
- See `product-plan/design-system/fonts.md` for Google Fonts setup

**Colors:**
- Primary: `blue` — buttons, links, active states
- Secondary: `emerald` — success states, accessible features
- Neutral: `slate` — backgrounds, text, borders

**Typography:**
- Heading & Body: Inter
- Mono: IBM Plex Mono

### 2. Data Model Types

Create TypeScript interfaces for your core entities:

- See `product-plan/data-model/types.ts` for interface definitions
- See `product-plan/data-model/README.md` for entity relationships

**Core Entities:**
- `AccessibilityFeature` — Ramps, crossings, sidewalks with metadata
- `Obstacle` — Construction, damaged sidewalks, stairs
- `Report` — Community observations with verification
- `Route` — Calculated accessible paths
- `Verification` — Community votes on reports
- `Location` — Geographic coordinates

### 3. Routing Structure

Create placeholder routes for each section:

| Route | Section |
|-------|---------|
| `/` or `/map` | Map & Navigation (default) |
| `/report` | Community Reporting |
| `/data` | Accessibility Data Management |
| `/settings` | Settings & Localization |

### 4. Application Shell

Copy the shell components from `product-plan/shell/components/` to your project:

- `AppShell.tsx` — Main layout wrapper with bottom navigation
- `MainNav.tsx` — Bottom tab navigation component
- `UserMenu.tsx` — User menu with avatar

**Wire Up Navigation:**

The shell uses bottom tab navigation with four tabs:
- **Map** (MapPin icon) → `/map` — Default view
- **Report** (MessageSquarePlus icon) → `/report`
- **Data** (Database icon) → `/data`
- **Settings** (Settings icon) → `/settings`

**Design Notes:**
- Mobile-first bottom navigation (WCAG 2.1 Level AAA compliant)
- Large touch targets (minimum 48x48px)
- Semi-transparent backdrop blur when overlaying map
- Active tab: blue-600 primary color
- Inactive tabs: slate-500/slate-400

## Files to Reference

- `product-plan/design-system/` — Design tokens
- `product-plan/data-model/` — Type definitions
- `product-plan/shell/README.md` — Shell design intent
- `product-plan/shell/components/` — Shell React components

## Done When

- [ ] Design tokens are configured (colors, typography)
- [ ] Google Fonts are loaded (Inter, IBM Plex Mono)
- [ ] Data model types are defined in TypeScript
- [ ] Routes exist for all 4 sections (can be placeholder pages)
- [ ] Shell renders with bottom tab navigation
- [ ] Navigation links to correct routes
- [ ] Active tab is highlighted correctly
- [ ] Responsive on mobile, tablet, desktop
- [ ] Dark mode support works
