---
description: Define the specification for a product section
---

# Shape Section Workflow

You are helping the user define the specification for a section — the scope, user flows, and UI requirements.

## Step 1: Check Prerequisites

Verify `product/product-roadmap.md` exists.

If it doesn't:
> "I don't see a product roadmap. Please run `/product-roadmap` first."

**Stop here if missing.**

## Step 2: Identify Target Section

Read the roadmap to get available sections.

- If only one section, auto-select it
- If multiple, ask which one to work on

## Step 3: Gather Initial Input

> "Let's define the scope for **[Section Title]**.
> 
> Do you have notes about what this section should include? Share any thoughts about features, user flows, or UI patterns. If unsure, we can start with questions."

**Wait for response.**

## Step 4: Ask Clarifying Questions

Ask 4-6 targeted questions to define:

- **Main user actions** — What can users do?
- **Information display** — What data/content is shown?
- **Key user flows** — Step-by-step interactions
- **UI patterns** — Specific components or layouts
- **Scope boundaries** — What's explicitly excluded?

Example questions:
- "What are the main actions a user can take here?"
- "What information needs to be displayed?"
- "Walk me through the main user flow"
- "Any specific UI patterns? (tables, cards, modals)"
- "What's intentionally out of scope?"
- "Multiple views needed? (list view, detail view)"

Ask 1-2 at a time, conversationally. Focus on UX/UI — no backend details.

## Step 5: Ask About Shell Configuration

If shell exists (`src/shell/components/AppShell.tsx`), ask:

> "Should this section render **inside the app shell** (with navigation) or be **standalone** (no shell)?
> 
> Most sections use the shell. Standalone is for public pages, landing pages, or embeds."

## Step 6: Present Draft and Refine

> "Here's the specification for **[Section Title]**:
> 
> **Overview:** [2-3 sentences]
> 
> **User Flows:**
> - [Flow 1]
> - [Flow 2]
> 
> **UI Requirements:**
> - [Requirement 1]
> - [Requirement 2]
> 
> **Display:** [Inside shell / Standalone]
> 
> Does this capture everything?"

Iterate until approved. Don't add features not discussed.

## Step 7: Create the Spec File

Create `product/sections/[section-id]/spec.md`:

```markdown
# [Section Title] Specification

## Overview
[2-3 sentence description]

## User Flows
- [Flow 1]
- [Flow 2]
- [Flow 3]

## UI Requirements
- [Requirement 1]
- [Requirement 2]
- [Requirement 3]

## Configuration
- shell: [true/false]
```

Section-id is the slug (lowercase, hyphens).

## Step 8: Confirm Completion

> "I've created the spec at `product/sections/[section-id]/spec.md`.
> 
> **Next:** Run `/sample-data` to create sample data for this section."

## Notes

- Be conversational, not robotic
- Focus on UX/UI — no backend or database details
- Keep spec concise — only include what was discussed
- `shell: true` is the default for most sections
