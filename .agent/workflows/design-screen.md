---
description: Create screen designs for a product section
---

# Design Screen Workflow

You are creating a screen design for a section — a props-based React component that can be exported to any codebase.

## Step 1: Check Prerequisites

Verify these exist for the target section:
- `product/sections/[section-id]/spec.md`
- `product/sections/[section-id]/data.json`
- `product/sections/[section-id]/types.ts`

If missing:
> "Please run `/shape-section` first, then `/sample-data`."

Also check optional:
- `product/design-system/colors.json` — Design tokens
- `src/shell/components/AppShell.tsx` — Application shell

## Step 2: Analyze Requirements

Read all three files:
1. **spec.md** — User flows and UI requirements
2. **data.json** — Data structure and sample content
3. **types.ts** — TypeScript interfaces and callbacks

Identify what views are needed (list, detail, form, etc.)

## Step 3: Clarify Scope

If multiple views are implied, ask which to build first:

> "The spec suggests these views:
> 1. **[View 1]** — [Description]
> 2. **[View 2]** — [Description]
> 
> Which should I create first?"

## Step 4: Read Frontend Design Skill

Before creating the screen, read `.claude/skills/frontend-design/SKILL.md` for design guidance on creating distinctive, production-grade interfaces.

## Step 5: Create Props-Based Component

Create `src/sections/[section-id]/components/[ViewName].tsx`:

```tsx
import type { InvoiceListProps } from '@/../product/sections/[section-id]/types'

export function InvoiceList({
  invoices,
  onView,
  onEdit,
  onDelete,
  onCreate
}: InvoiceListProps) {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Component content */}
    </div>
  )
}
```

**Requirements:**
- Import types from types.ts
- Accept all data via props (never import data.json directly)
- Accept callback props for all actions
- Mobile responsive (`sm:`, `md:`, `lg:`)
- Light/dark mode (`dark:` variants)
- Apply design tokens if defined

## Step 6: Create Sub-Components (if needed)

For complex views, create sub-components at `src/sections/[section-id]/components/[SubComponent].tsx`.

## Step 7: Create Preview Wrapper

Create `src/sections/[section-id]/[ViewName].tsx`:

```tsx
import data from '@/../product/sections/[section-id]/data.json'
import { InvoiceList } from './components/InvoiceList'

export default function InvoiceListPreview() {
  return (
    <InvoiceList
      invoices={data.invoices}
      onView={(id) => console.log('View:', id)}
      onEdit={(id) => console.log('Edit:', id)}
      onDelete={(id) => console.log('Delete:', id)}
      onCreate={() => console.log('Create')}
    />
  )
}
```

**Note:** This preview wrapper is for Design OS only — not exported.

## Step 8: Create Component Index

Create `src/sections/[section-id]/components/index.ts`:

```tsx
export { InvoiceList } from './InvoiceList'
export { InvoiceRow } from './InvoiceRow'
```

## Step 9: Confirm Completion

> "I've created the screen design:
> 
> **Exportable components:**
> - `src/sections/[section-id]/components/[ViewName].tsx`
> - `src/sections/[section-id]/components/index.ts`
> 
> **Preview wrapper:**
> - `src/sections/[section-id]/[ViewName].tsx`
> 
> **Restart your dev server to see changes.**
> 
> **Next:** Run `/screenshot-design` to capture a screenshot."

## Notes

- Components MUST be props-based
- Preview wrapper is the ONLY file that imports data.json
- Use optional chaining for callbacks (`onDelete?.(id)`)
- Apply design tokens when available
- Screen designs render inside shell when viewing in Design OS
