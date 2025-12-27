---
description: Generate the complete export package for implementation
---

# Export Product Workflow

You are exporting the complete product design as a handoff package for implementation.

## Step 1: Check Prerequisites

**Required:**
- `product/product-overview.md`
- `product/product-roadmap.md`
- At least one section with screen designs in `src/sections/`

**Recommended (warn if missing):**
- `product/data-model/data-model.md`
- `product/design-system/colors.json` and `typography.json`
- `src/shell/components/AppShell.tsx`

If required files missing, stop and tell user what to run first.

## Step 2: Gather Export Information

Read all relevant files:
- Product overview and roadmap
- Data model (if exists)
- Design tokens (if exists)
- Shell spec (if exists)
- For each section: spec.md, data.json, types.ts
- Screen design components in src/sections/ and src/shell/

## Step 3: Create Export Directory Structure

Create `product-plan/` with:

```
product-plan/
├── README.md                    # Quick start guide
├── product-overview.md          # Product summary
├── prompts/
│   ├── one-shot-prompt.md       # Full implementation prompt
│   └── section-prompt.md        # Section-by-section prompt
├── instructions/
│   ├── one-shot-instructions.md # All milestones combined
│   └── incremental/
│       ├── 01-foundation.md
│       └── [NN]-[section-id].md
├── design-system/               # Tokens
├── data-model/                  # Types and sample data
├── shell/                       # Shell components
└── sections/
    └── [section-id]/
        ├── README.md
        ├── tests.md             # Test-writing instructions
        ├── components/
        ├── types.ts
        └── sample-data.json
```

## Step 4: Generate Milestone Instructions

Each milestone instruction should include:

**Preamble:**
- What you're receiving (UI designs, types, specs)
- What you need to build (backend, auth, data layer)
- Guidelines (don't restyle components, wire up callbacks, etc.)

**Milestones:**
1. **01-foundation.md** — Design tokens, data model types, routing, shell
2. **[NN]-[section-id].md** — Each section with:
   - Overview
   - TDD approach (reference tests.md)
   - What to implement
   - Expected user flows
   - Done checklist

## Step 5: Copy and Transform Components

- Copy shell components from `src/shell/components/`
- Copy section components from `src/sections/[section-id]/components/`
- Transform import paths from `@/...` to relative
- Keep only exportable components (not preview wrappers)

## Step 6: Generate Section Test Instructions

For each section, create `tests.md` with:
- User flow tests (success + failure paths)
- Empty state tests
- Component interaction tests
- Edge cases
- Sample test data

## Step 7: Confirm Completion

> "I've generated the complete export package at `product-plan/`.
> 
> **Contents:**
> - README with quick start guide
> - Product overview
> - Implementation instructions (one-shot + incremental)
> - Design system tokens
> - Data model types
> - Shell components
> - Section components with test instructions
> 
> **Next steps:**
> 1. Copy `product-plan/` to your implementation project
> 2. Follow `README.md` for quick start
> 3. Use prompts in `prompts/` with your coding agent"

## Notes

- The export is framework-agnostic implementation guidance
- Components are props-based and ready to integrate
- Test instructions are framework-agnostic (adapt to Jest, Vitest, etc.)
- Always include tests.md for TDD approach
