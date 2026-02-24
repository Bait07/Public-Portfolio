# Interface Design System — portfolio-juan

## Direction & Feel
Developer portfolio for Juan Diego Enríquez (Frontend, React + Astro). The interface feels like descending through glass layers — each section is a translucent panel in the same material language as the Hero. Dark-first, premium, precise. Not a resume template.

**Signature:** Numbered monospace accent system (`01 —`, `02 —`...) on section headers — like navigating a file tree or API routes. Monospace font, tracking-[0.2em], uppercase, primary/60 opacity.

## Palette
Defined via CSS variables on `:root`. DO NOT add new colors — use what exists.
- `--primary: 102 126 234` (indigo)
- `--secondary: 118 75 162` (purple)
- `--bg: 10 10 15` dark / `248 250 252` light
- `--text: 248 250 252` dark / `15 23 42` light
- `--muted: 148 163 184` dark / `71 85 105` light

Gradient text: `bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent`

## Depth Strategy: Liquid Glass
Single approach — no mixing. `.liquid-glass` class from globals.css:
- `backdrop-filter blur(20px) saturate(180%)`
- `rgba(255,255,255, var(--glass-opacity))` background
- `1px solid rgba(255,255,255, var(--glass-border))` border
- `border-radius: 20px`
- hover: `translateY(-2px)`

Use `.liquid-glass` for: cards, CTA buttons, highlight chips, nav.
Do NOT use for: small skill badges (use `border border-primary/15 bg-primary/5 rounded-lg` instead).

## Spacing
Base 8px. Section padding: `py-20 sm:py-28 px-4 sm:px-6 lg:px-8`.
Max container: `max-w-[1200px] mx-auto`.
Contact section extra bottom padding: `pb-40 sm:pb-48` (floating nav clearance).

## Typography
Font: Inter (loaded via Google Fonts in globals.css).
- Section index: `font-mono text-xs tracking-[0.2em] uppercase text-primary/60`
- Section title: `text-3xl sm:text-4xl lg:text-5xl font-bold` + gradient text
- Section subtitle: `text-muted text-base sm:text-lg`
- Accent line: `h-px w-14 bg-gradient-to-r from-primary to-secondary`
- Skills/tags label: `font-mono text-xs tracking-[0.2em] uppercase text-muted`

## Animation Pattern
All sections use `framer-motion whileInView` with `viewport={{ once: true, margin: "-80px" }}`.
- Fade-up: `initial={{ opacity: 0, y: 20 }}` → `whileInView={{ opacity: 1, y: 0 }}`
- Stagger: `delay: index * 0.1` for lists
- Duration: 0.6s, ease: "easeOut"

## Component Patterns

### SectionHeader (`src/components/ui/SectionHeader.tsx`)
Props: `index` (e.g. "01"), `title`, `subtitle?`, `align?` ("left" | "center"), `className?`
Usage: All 4 sections use this. About/Experience/Projects → left. Contact → center.

### ExperienceItem (`src/sections/experience/ExperienceItem.tsx`)
Timeline item with dot (`bg-primary shadow-[0_0_10px_rgba(102,126,234,0.5)]`), liquid-glass card.
Exports `ExperienceItemData` interface for reuse in Experience.tsx.

### ProjectCard (`src/sections/projects/ProjectCard.tsx`)
liquid-glass card with title, description, tags, github/live links.
Exports `ProjectCardData` interface for reuse in Projects.tsx.
Tag style: `text-xs font-mono text-primary/80 bg-primary/8 px-2 py-0.5 rounded-full border border-primary/20`

## Section IDs (must match SECTION_IDS in App.tsx)
`"home"` | `"about"` | `"experience"` | `"projects"` | `"contact"`

## File Structure
```
src/
  components/
    layout/         TopControls.tsx, BottomNav.tsx
    ui/             SectionHeader.tsx
  sections/
    Hero.tsx
    about/          About.tsx
    experience/     Experience.tsx, ExperienceItem.tsx
    projects/       Projects.tsx, ProjectCard.tsx
    contact/        Contact.tsx
  styles/           globals.css
  lib/              cn.ts
  i18n/             index.ts
```

## i18n Notes
All user-facing text in `public/locales/{es,en}/common.json`. Arrays (experience.items, projects.items) use `t("key", { returnObjects: true }) as Type[]`. Contact links (email, LinkedIn, GitHub) are i18n keys so Juan can update without touching code.
