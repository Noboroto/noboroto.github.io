# Portfolio

Personal developer portfolio built with **Astro 6** and **Tailwind CSS v4**, deployed to GitHub Pages.

Live: [noboroto.github.io](https://noboroto.github.io)

## Why Astro?

- **Zero JavaScript by default** — Astro ships pure HTML/CSS with no client-side JS unless explicitly needed. The portfolio loads instantly because there's no framework bundle to download.
- **Static-first** — The entire site is pre-rendered at build time into static HTML files. No server needed, perfect for GitHub Pages hosting.
- **Island architecture** — Interactive components (theme toggle, mobile menu, project filters) only hydrate the small parts that need JS, not the whole page.
- **Built-in optimizations** — Image optimization, font loading, CSS scoping all work out of the box without plugins.
- **Component-based without the overhead** — `.astro` components feel like React/Vue but compile away to zero runtime cost.

Compared to Next.js or Gatsby, Astro produces smaller bundles for content-heavy static sites. Compared to plain HTML, it provides reusable components, TypeScript support, and build-time data loading.

## Project Structure

```
src/
├── components/       # Astro components (Navbar, Hero, ProjectCard, etc.)
├── data/
│   ├── repos/        # Individual JSON files per repo (98 files)
│   ├── profile.json  # Personal info, social links, education
│   └── skills.json   # Tech stack categories and skill levels
├── layouts/          # BaseLayout with head, fonts, theme script
├── lib/              # categorize.ts (data loading), types.ts
├── pages/            # index.astro (single page)
└── styles/           # global.css (Tailwind v4 theme)
```

Each repo is its own JSON file in `src/data/repos/` — edit one repo without touching others.

## Quick Start

**Prerequisites:** Node.js >= 22.12.0, pnpm

```bash
# Install dependencies
pnpm install

# Start dev server (http://localhost:4321)
pnpm dev

# Build for production
pnpm build

# Preview production build locally
pnpm preview
```

## Adding / Editing a Repo

Create or edit a JSON file in `src/data/repos/`:

```json
{
  "name": "my-project",
  "description": null,
  "url": "https://github.com/Noboroto/my-project",
  "homepage": null,
  "language": "TypeScript",
  "languages": ["TypeScript", "Python"],
  "topics": ["typescript", "react", "docker"],
  "stars": 0,
  "forks": 0,
  "updatedAt": "2025-06-01T00:00:00Z",
  "createdAt": "2025-01-01T00:00:00Z",
  "isFork": false,
  "visible": true,
  "tier": "core",
  "domain": ["web"],
  "displayName": "My Project",
  "displayDescription": "What it is, why it's needed, how it works...",
  "priority": 5
}
```

**Key fields:**
- `visible` — `false` hides it from the site entirely
- `tier` — `featured` | `core` | `specialized` | `learning`
- `priority` — featured repos sort by this (higher = first), then by `updatedAt`
- `topics` — rendered as tags on the project card

## Deployment

Deployed automatically via GitHub Pages on push to `main`. The Astro config sets:

```js
site: 'https://noboroto.github.io',
base: '/',
output: 'static',
```

## Tech Stack

- **Astro 6** — static site generator
- **Tailwind CSS v4** — utility-first styling
- **TypeScript** — type-safe data handling
- **pnpm** — package manager
- **GitHub Pages** — hosting
