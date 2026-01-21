# Application Shell

## Overview

AccessiblePrague uses a mobile-first bottom tab navigation pattern designed for accessibility and ease of use. The shell provides large, easy-to-tap navigation controls that meet WCAG 2.1 Level AAA touch target requirements (minimum 48x48px).

## Components

### AppShell

Main layout wrapper that provides the page structure and includes bottom navigation.

**Props:**
- `children` — Page content to render
- `navigationItems` — Array of navigation items with label, href, icon, isActive
- `onNavigate` — Callback when user taps a navigation item

### MainNav

Bottom tab navigation component with four tabs.

**Navigation Items:**
- **Map** (MapPin icon) → `/map` — Default view
- **Report** (MessageSquarePlus icon) → `/report`
- **Data** (Database icon) → `/data`
- **Settings** (Settings icon) → `/settings`

### UserMenu

User profile dropdown with language switcher and logout.

**Props:**
- `user` — User object with name, email, avatarUrl
- `currentLanguage` — 'cs' | 'en'
- `onLanguageChange` — Language change callback
- `onLogout` — Logout callback

## Design Notes

- **Mobile-first:** Bottom tabs with icons + labels
- **Touch targets:** Minimum 48x48px for accessibility
- **Colors:** Active tab uses blue-600, inactive uses slate-500/400
- **Backdrop:** Semi-transparent with blur when overlaying content
- **Dark mode:** Full support with `dark:` variants
- **Typography:** Inter font family

## Usage

```tsx
import { AppShell } from './shell/components'

const navigationItems = [
  { label: 'Map', href: '/map', icon: 'map', isActive: true },
  { label: 'Report', href: '/report', icon: 'report' },
  { label: 'Data', href: '/data', icon: 'data' },
  { label: 'Settings', href: '/settings', icon: 'settings' },
]

function App() {
  return (
    <AppShell
      navigationItems={navigationItems}
      onNavigate={(href) => router.push(href)}
    >
      <YourPageContent />
    </AppShell>
  )
}
```

## Dependencies

- `lucide-react` — Icons (Map, MessageSquarePlus, Database, Settings, User, LogOut, Globe)
- Tailwind CSS v4 — Styling
