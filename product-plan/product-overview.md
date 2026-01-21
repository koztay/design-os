# AccessiblePrague — Product Overview

## Summary

AccessiblePrague is a Progressive Web App that empowers wheelchair users to navigate confidently through Prague's streets by providing reliable, community-verified information about barrier-free routes, crossings, ramps, and obstacles. Starting with a pilot area around Evropská Street, the app features a clean, fluid interface inspired by Apple's Liquid design with large, easily accessible controls optimized for users with disabilities. Built entirely with open-source, license-free software and resources, it works offline and combines professionally mapped accessibility data stored in GeoJSON format with real-time community reporting to ensure users can always find the most accessible path from point A to point B.

## Planned Sections

1. **Map & Navigation** — Interactive map display with barrier-free routes, wheelchair-optimized pathfinding, and full offline functionality with Service Worker caching.

2. **Community Reporting** — Form-based system for users to report obstacles and improvements with photos, GPS location, offline submission, and verification voting.

3. **Accessibility Data Management** — GeoJSON layer management, data import/export interface, list view of all obstacles and barrier-free elements, and API integration.

4. **Settings & Localization** — Language switcher (Czech/English), accessibility preferences, and user interface customization.

## Data Model

Core entities defined:
- **AccessibilityFeature** — Barrier-free elements (ramps, crossings, sidewalks)
- **Obstacle** — Barriers blocking wheelchair access
- **Report** — Community-submitted observations
- **Route** — Calculated accessible paths
- **Verification** — Community voting on report accuracy
- **Location** — Geographic coordinates

## Design System

**Colors:**
- Primary: `blue` — Used for buttons, links, key accents
- Secondary: `emerald` — Used for success states and accessible features
- Neutral: `slate` — Used for backgrounds, text, borders

**Typography:**
- Heading: Inter
- Body: Inter
- Mono: IBM Plex Mono

## Implementation Sequence

Build this product in milestones:

1. **Foundation** — Set up design tokens, data model types, routing structure, and application shell
2. **Map & Navigation** — Interactive map with barrier-free routes and offline support
3. **Community Reporting** — Report submission with photos, GPS, and verification voting
4. **Accessibility Data Management** — Admin data table with import/export
5. **Settings & Localization** — Language switching and accessibility preferences

Each milestone has a dedicated instruction document in `product-plan/instructions/`.
