---
description: Define the core data model entities and relationships
---

# Data Model Workflow

You are helping the user define the core data model — the "nouns" of their system (entities and relationships).

## Step 1: Check Prerequisites

Verify these files exist:
- `product/product-overview.md` — Understanding what the product does
- `product/product-roadmap.md` — Understanding the planned sections

If either is missing:
> "Before defining your data model, please run `/product-vision` first, then `/product-roadmap`."

**Stop here if prerequisites are missing.**

## Step 2: Analyze and Present Initial Entities

Review the product overview and roadmap, then present your analysis:

> "Based on your product vision and roadmap, I can see you're building **[Product Name]** with sections for [list sections].
> 
> Here are some entities I'm seeing:
> 
> - **[Entity1]** — [Brief description]
> - **[Entity2]** — [Brief description]
> - **[Entity3]** — [Brief description]
> 
> Does this capture the main things your app works with? What would you add, remove, or change?"

**Wait for their response.**

## Step 3: Refine Entities

Ask clarifying questions:
- "Are there any other core entities users will create, view, or manage?"
- "For [Entity], what are the most important pieces of information?"
- "How do these entities relate to each other?"

Focus on:
- **Entity names** — What are the main nouns?
- **Plain-language descriptions** — What does each represent?
- **Relationships** — How do entities connect?

**Important:** Do NOT define every field or database schema details. Keep it minimal and conceptual.

## Step 4: Present Draft and Refine

Present a draft:

> "Here's your data model:
> 
> **Entities:**
> - **[Entity1]** — [Description]
> - **[Entity2]** — [Description]
> 
> **Relationships:**
> - [Entity1] has many [Entity2]
> - [Entity2] belongs to [Entity1]
> 
> Does this look right?"

Iterate until approved.

## Step 5: Create the File

Once approved, create `product/data-model/data-model.md`:

```markdown
# Data Model

## Entities

### [EntityName]
[Plain-language description of what this entity represents.]

### [AnotherEntity]
[Plain-language description.]

## Relationships

- [Entity1] has many [Entity2]
- [Entity2] belongs to [Entity1]
```

## Step 6: Confirm Completion

> "I've created your data model at `product/data-model/data-model.md`.
> 
> This provides a shared vocabulary for your sections. When you run `/sample-data`, it will reference this model.
> 
> **Next step:** Run `/design-tokens` to choose your color palette and typography."

## Notes

- Keep the data model **minimal** — entity names, descriptions, relationships
- Do NOT define detailed schemas, field types, or validation rules
- Use plain language a non-technical person could understand
- Entity names should be singular (User, Invoice, Project — not plural)
- The implementation agent will extend this with additional fields
