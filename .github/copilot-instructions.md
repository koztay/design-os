# Design OS - AI Assistant Instructions

This repository is **Design OS**, a product planning and design tool that helps users define their product vision, structure their data model, design their UI, and prepare export packages.

> **Important**: Design OS is a planning tool, not the end product codebase. Screen designs generated here are meant to be exported and integrated into your actual product's codebase.

## Available Commands

When the user asks to run a command, follow the corresponding workflow instructions below.

---

## `/product-vision`

**Purpose:** Define product vision, key problems, and features.

### Steps:

1. **Gather Input** — Ask the user to share their raw notes/ideas about the product they're building. What problem are they solving? Who is it for?

2. **Ask Clarifying Questions** — Based on their input, ask 3-5 questions to define:
   - Product name
   - Core description (1-3 sentences)
   - Key problems (1-5 pain points)
   - How the product solves each problem
   - Main features

3. **Present Draft** — Show a structured summary:
   ```
   **[Product Name]**
   
   Description: [1-3 sentences]
   
   Problems & Solutions:
   1. [Problem] → [Solution]
   
   Key Features:
   - Feature 1
   - Feature 2
   ```

4. **Create File** — Once approved, create `product/product-overview.md`:
   ```markdown
   # [Product Name]
   
   ## Description
   [Description]
   
   ## Problems & Solutions
   
   ### Problem 1: [Title]
   [How it's solved]
   
   ## Key Features
   - [Feature 1]
   - [Feature 2]
   ```

5. **Confirm** — Tell user the file was created and suggest running `/product-roadmap` next.

---

## `/product-roadmap`

**Purpose:** Break down your product into development sections.

### Prerequisites:
- `product/product-overview.md` must exist (run `/product-vision` first if not)

### Steps:

1. **Check State** — Read `product/product-overview.md`. If roadmap already exists, offer to update/sync/start fresh.

2. **Analyze & Propose** — Based on the product overview, propose 3-5 sections:
   - Each section = a navigation item / self-contained feature area
   - Order by development priority
   
   Example:
   > "I'd suggest these sections:
   > 1. **Dashboard** — Overview and key metrics
   > 2. **Projects** — Create and manage projects
   > 3. **Settings** — User preferences"

3. **Refine** — Iterate based on user feedback.

4. **Create File** — Once approved, create `product/product-roadmap.md`:
   ```markdown
   # Product Roadmap
   
   ## Sections
   
   ### 1. [Section Title]
   [One sentence description]
   
   ### 2. [Section Title]
   [One sentence description]
   ```

5. **Confirm** — Suggest running `/data-model` next.

---

## `/data-model`

**Purpose:** Define the core entities and relationships in your product.

### Prerequisites:
- `product/product-overview.md` and `product/product-roadmap.md` must exist

### Steps:

1. **Analyze** — Read product overview and roadmap. Propose entities based on the product:
   > "I'm seeing these entities:
   > - **User** — Person using the app
   > - **Project** — Work item users create
   > - **Task** — Sub-item within projects"

2. **Refine** — Ask about other entities, relationships, and key information each contains.

3. **Present Draft** — Show entities and relationships:
   > "**Entities:** User, Project, Task
   > **Relationships:** User has many Projects, Project has many Tasks"

4. **Create File** — Once approved, create `product/data-model/data-model.md`:
   ```markdown
   # Data Model
   
   ## Entities
   
   ### [EntityName]
   [Plain-language description]
   
   ## Relationships
   
   - [Entity1] has many [Entity2]
   ```

5. **Confirm** — Suggest running `/design-tokens` next.

**Notes:** Keep minimal — no field types or schemas. Use singular names (User, not Users).

---

## `/design-tokens`

**Purpose:** Choose color palette and typography for screen designs.

### Prerequisites:
- `product/product-overview.md` must exist

### Steps:

1. **Explain** — Tell user you'll help choose colors and typography.

2. **Choose Colors** — From Tailwind's palette:
   - **Primary:** `blue`, `indigo`, `violet`, `emerald`, `teal`, `amber`, `rose`, `lime`
   - **Secondary:** Complementary to primary
   - **Neutral:** `slate`, `gray`, `zinc`, `neutral`, `stone`

3. **Choose Typography** — From Google Fonts:
   - **Heading:** `DM Sans`, `Inter`, `Poppins`, `Manrope`, `Space Grotesk`
   - **Body:** Often same as heading
   - **Mono:** `IBM Plex Mono`, `JetBrains Mono`, `Fira Code`

4. **Create Files:**
   - `product/design-system/colors.json`:
     ```json
     { "primary": "[color]", "secondary": "[color]", "neutral": "[color]" }
     ```
   - `product/design-system/typography.json`:
     ```json
     { "heading": "[Font]", "body": "[Font]", "mono": "[Font]" }
     ```

5. **Confirm** — Suggest running `/design-shell` next.

---

## `/design-shell`

**Purpose:** Design the application shell (navigation and layout).

### Prerequisites:
- `product/product-overview.md` and `product/product-roadmap.md` must exist
- Optional: `product/design-system/colors.json` and `typography.json`

### Steps:

1. **Analyze** — Review sections and propose layout pattern:
   - **Sidebar Navigation** — Best for dashboards, many sections
   - **Top Navigation** — Best for simpler apps
   - **Minimal Header** — Best for single-purpose tools

2. **Gather Details:**
   - User menu location
   - Mobile behavior (collapsible/hamburger)
   - Additional nav items (Settings, Help)

3. **Create Files:**
   - `product/shell/spec.md` — Specification
   - `src/shell/components/AppShell.tsx` — Main wrapper
   - `src/shell/components/MainNav.tsx` — Navigation
   - `src/shell/components/UserMenu.tsx` — User menu
   - `src/shell/ShellPreview.tsx` — Preview

4. **Requirements:**
   - Props-based, portable components
   - Light/dark mode support
   - Mobile responsive
   - Use lucide-react icons

5. **Confirm** — Remind to restart dev server. Suggest `/shape-section` next.

---

## `/shape-section`

**Purpose:** Define the specification for a product section.

### Prerequisites:
- `product/product-roadmap.md` must exist

### Steps:

1. **Select Section** — If multiple sections exist, ask which one to define.

2. **Gather Input** — Ask about features, user flows, UI patterns for this section.

3. **Clarify** — Ask 4-6 questions:
   - Main user actions?
   - Information to display?
   - Key user flows (step-by-step)?
   - UI patterns (tables, cards, modals)?
   - What's out of scope?

4. **Shell Config** — Ask if section renders inside app shell or standalone.

5. **Create File** — Once approved, create `product/sections/[section-id]/spec.md`:
   ```markdown
   # [Section Title] Specification
   
   ## Overview
   [2-3 sentence description]
   
   ## User Flows
   - [Flow 1]
   
   ## UI Requirements
   - [Requirement 1]
   
   ## Configuration
   - shell: true
   ```

6. **Confirm** — Suggest running `/sample-data` next.

---

## `/sample-data`

**Purpose:** Create sample data and TypeScript types for a section.

### Prerequisites:
- `product/sections/[section-id]/spec.md` must exist
- Optional: `product/data-model/data-model.md` for entity consistency

### Steps:

1. **Analyze Spec** — Identify entities, fields, and actions from the section spec.

2. **Present Structure** — Show proposed data organization and get approval.

3. **Create data.json** — `product/sections/[section-id]/data.json`:
   ```json
   {
     "_meta": {
       "models": { "items": "Description" },
       "relationships": ["Item has many Sub-items"]
     },
     "items": [{ "id": "1", "name": "Sample" }]
   }
   ```

4. **Create types.ts** — `product/sections/[section-id]/types.ts`:
   ```typescript
   export interface Item { id: string; name: string }
   export interface ItemListProps {
     items: Item[]
     onView?: (id: string) => void
   }
   ```

5. **Confirm** — Suggest running `/design-screen` next.

**Notes:** Generate realistic data, use union types for status fields, include callback props for all actions.

---

## `/design-screen`

**Purpose:** Create screen designs (React components) for a section.

### Prerequisites:
- `product/sections/[section-id]/spec.md`, `data.json`, and `types.ts` must exist
- Optional: design tokens and shell

### Steps:

1. **Analyze** — Read spec, data, and types to understand requirements.

2. **Clarify Scope** — If multiple views implied (list, detail, form), ask which first.

3. **Create Component** — `src/sections/[section-id]/components/[View].tsx`:
   - Props-based (never import data directly)
   - Import types from types.ts
   - Use callback props for actions
   - Mobile responsive + light/dark mode

4. **Create Preview** — `src/sections/[section-id]/[View].tsx`:
   - Imports data.json
   - Passes data to component
   - Uses console.log for callbacks

5. **Create Index** — `src/sections/[section-id]/components/index.ts`

6. **Confirm** — Remind to restart dev server. Suggest `/screenshot-design` next.

---

## `/screenshot-design`

**Purpose:** Capture screenshots of screen designs for documentation.

### Prerequisites:
- Screen design must exist in `src/sections/[section-id]/`
- Dev server running at localhost:3000

### Steps:

1. **Identify Screen** — Ask which screen design to capture (if multiple exist).

2. **Start Dev Server** — Run `npm run dev` if not running.

3. **Capture Screenshot:**
   - Navigate to `http://localhost:3000/sections/[section-id]/screen-designs/[name]`
   - Hide navigation header
   - Take full-page screenshot at 1280px width

4. **Save** — Save to `product/sections/[section-id]/[name].png`

5. **Confirm** — Ask if additional screenshots needed (dark mode, mobile, empty states).

---

## `/export-product`

**Purpose:** Generate the complete export package for implementation handoff.

### Prerequisites:
- `product/product-overview.md` and `product/product-roadmap.md`
- At least one section with screen designs
- Recommended: data model, design tokens, shell

### Steps:

1. **Verify** — Check all required files exist. Warn about missing recommended items.

2. **Create Structure** — Generate `product-plan/` directory:
   ```
   product-plan/
   ├── README.md
   ├── product-overview.md
   ├── prompts/
   ├── instructions/
   │   ├── one-shot-instructions.md
   │   └── incremental/
   ├── design-system/
   ├── data-model/
   ├── shell/
   └── sections/[section-id]/
       ├── README.md
       ├── tests.md
       ├── components/
       └── types.ts
   ```

3. **Generate Instructions:**
   - `01-foundation.md` — Design tokens, data model, routing, shell
   - `[NN]-[section-id].md` — Each section with user flows and tests

4. **Copy Components:**
   - Transform import paths to relative
   - Keep only exportable components

5. **Generate Test Instructions** — Create `tests.md` for each section.

6. **Confirm** — Tell user to copy `product-plan/` to their project.

---

## Tailwind CSS Rules

- Use **Tailwind CSS v4** (not v3)
- No `tailwind.config.js` file
- Use built-in utility classes and colors
- Support light/dark mode with `dark:` variants
- Mobile responsive with `sm:`, `md:`, `lg:`, `xl:` prefixes

---

## File Structure Reference

```
product/                    # Product definition
├── product-overview.md     # Product description
├── product-roadmap.md      # Sections list
├── data-model/
├── design-system/
├── shell/
└── sections/[section-name]/

src/
├── shell/                  # Shell components
└── sections/[section-name]/

product-plan/               # Export package (generated)
```

---

*More commands will be added as they are implemented.*
