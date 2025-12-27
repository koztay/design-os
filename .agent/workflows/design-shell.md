---
description: Design the application shell (navigation and layout)
---

# Design Shell Workflow

You are helping the user design the application shell — the persistent navigation and layout that wraps all sections.

## Step 1: Check Prerequisites

Verify these exist:
- `product/product-overview.md` — Product name and description
- `product/product-roadmap.md` — Sections for navigation

Also check for optional:
- `product/design-system/colors.json` and `typography.json` — Design tokens

If overview or roadmap are missing:
> "Before designing the shell, run `/product-vision` and `/product-roadmap` first."

If design tokens are missing, warn but continue:
> "Note: Design tokens haven't been defined. I'll use defaults, but consider running `/design-tokens` first."

## Step 2: Analyze and Propose Layout

Review sections and present navigation options:

> "I'm designing the shell for **[Product Name]** with [N] sections.
> 
> Common patterns:
> 
> **A. Sidebar Navigation** — Vertical nav on left
>    Best for: Dashboards, admin panels, many sections
> 
> **B. Top Navigation** — Horizontal nav at top
>    Best for: Simpler apps, fewer sections
> 
> **C. Minimal Header** — Logo + user menu only
>    Best for: Single-purpose tools, wizard flows
> 
> Which pattern fits best?"

## Step 3: Gather Details

Ask clarifying questions:
- "Where should the user menu appear?"
- "Collapsible sidebar on mobile, or hamburger menu?"
- "Any additional nav items? (Settings, Help, etc.)"
- "What's the default view when app loads?"

## Step 4: Present Shell Specification

> "Here's the shell design:
> 
> **Layout:** [Sidebar/Top Nav/Minimal]
> **Navigation:** [List nav items]
> **User Menu:** [Location and contents]
> **Responsive:** [Mobile behavior]
> 
> Does this match what you had in mind?"

## Step 5: Create Files

Once approved, create:

**Specification:** `product/shell/spec.md`
```markdown
# Application Shell Specification

## Overview
[Description of shell design]

## Navigation Structure
- [Nav Item 1] → [Section 1]
- [Nav Item 2] → [Section 2]

## User Menu
[Location and contents]

## Layout Pattern
[Sidebar/Top Nav description]

## Responsive Behavior
- **Desktop:** [Behavior]
- **Mobile:** [Behavior]
```

**Components:** Create in `src/shell/components/`:
- `AppShell.tsx` — Main wrapper with navigation
- `MainNav.tsx` — Navigation component
- `UserMenu.tsx` — User menu with avatar
- `index.ts` — Exports

**Preview:** `src/shell/ShellPreview.tsx`

## Component Requirements

- Props-based (portable)
- Apply design tokens if they exist
- Support light/dark mode (`dark:` variants)
- Mobile responsive
- Use Tailwind CSS
- Use lucide-react for icons

## Step 6: Confirm Completion

> "I've designed the shell:
> - `product/shell/spec.md` — Specification
> - `src/shell/components/` — Shell components
> - `src/shell/ShellPreview.tsx` — Preview
> 
> **Restart your dev server to see changes.**
> 
> **Next:** Run `/shape-section` to design your first section."

## Notes

- Shell is a screen design demonstrating navigation/layout
- Components are props-based, portable to user's codebase
- Preview wrapper is for Design OS only
- Section screens render inside the shell's content area
