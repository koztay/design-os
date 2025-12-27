---
description: Break down your product into development sections
---

# Product Roadmap Workflow

You are helping the user create or update their product roadmap. This defines the sections (features/areas) of their product.

## Step 1: Check Current State

First, check if these files exist:
- `product/product-overview.md` — Required prerequisite
- `product/product-roadmap.md` — May already exist

If product-overview.md doesn't exist:
> "Before defining your roadmap, please run `/product-vision` first to establish your product vision."

**Stop here if prerequisite is missing.**

---

## If No Roadmap Exists (Creating New)

### Analyze the Product Overview

Read `product/product-overview.md` and analyze:
- The core description
- The problems being solved
- The key features listed

### Propose Sections

Propose 3-5 sections that represent:
- **Navigation items** — Main areas of the product UI
- **Roadmap phases** — Logical order for building
- **Self-contained areas** — Each can be designed independently

Present your proposal:

> "Based on your product overview, I'd suggest these sections:
> 
> 1. **[Section Title]** — [One sentence description]
> 2. **[Section Title]** — [One sentence description]
> 3. **[Section Title]** — [One sentence description]
> 
> These are ordered by development priority. Does this breakdown make sense?"

### Refine with User

Iterate based on feedback. Ask clarifying questions:
- "Should [feature X] be its own section or part of [Section Y]?"
- "What's the most critical section to build first?"

### Create the File

Once approved, create `product/product-roadmap.md`:

```markdown
# Product Roadmap

## Sections

### 1. [Section Title]
[One sentence description]

### 2. [Section Title]
[One sentence description]

### 3. [Section Title]
[One sentence description]
```

### Confirm

> "I've created your product roadmap at `product/product-roadmap.md`.
> 
> **Next step:** Run `/data-model` to define the core entities and relationships."

---

## If Roadmap Already Exists (Syncing/Updating)

Report current state and ask what to do:

> "I see you have a roadmap with [N] sections:
> 1. [Section 1]
> 2. [Section 2]
> 
> What would you like to do?
> - **Update sections** — Add, remove, or reorder
> - **Sync from files** — Re-read and confirm sync
> - **Start fresh** — Regenerate based on product overview"

Handle their choice accordingly.

---

## Notes

- Keep to 3-5 sections (ideal range)
- Order sections by development priority
- Each section should be self-contained
- Section titles become navigation items
- The numbered format (`### 1. Title`) is required for parsing
