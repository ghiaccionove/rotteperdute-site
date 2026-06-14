# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Static website for **Rotte Perdute Traduzioni**, an independent Italian publisher
of translated literature. Built with **Astro 5** + **Tailwind CSS v4**. All
site-facing content and UI text is in Italian. (Previously a Hugo site — fully
migrated.)

## Commands

```sh
npm run dev        # dev server with HMR at http://localhost:4321
npm run build      # static build into ./dist
npm run preview    # serve the production build locally
```

There is no test/lint suite — `npm run build` is the correctness gate (Astro
type-checks content collections and templates at build time).

## Architecture

- **Tailwind v4, no JS config.** Tailwind is wired through the Vite plugin in
  `astro.config.mjs` (`@tailwindcss/vite`). The design system lives entirely in
  CSS: `src/styles/global.css` defines tokens in `@theme` (e.g. `--color-terracotta`,
  `--font-display`) which become utilities (`text-terracotta`, `font-display`).
  There is no `tailwind.config.js`.
- **Design language**: warm editorial palette (cream / ink / terracotta), serif
  display (Fraunces) + serif body (Newsreader), self-hosted via `@fontsource-variable`.
  Reusable component classes (`.btn`, `.eyebrow`, `.nav-link`, `.prosa`, the
  `.book*` 3D effect, `.reveal`) are defined in `global.css`, not inline.
- **The "book opening" hover effect** is pure CSS 3D in `global.css`: `.book`
  sets `perspective`, `.book__cover` rotates on `rotateY` around its left edge to
  reveal `.book__pages` beneath. Triggered by hover/focus on the wrapping
  `.book-link`. Honors `prefers-reduced-motion`. Used by `BookCard.astro` and
  inlined on the book detail page.
- **Scroll reveal**: elements with class `.reveal` fade in via an
  IntersectionObserver in `Layout.astro`'s inline `<script>` (adds `.is-visible`).

## Content model (the important part)

Books are an Astro **content collection** defined in `src/content.config.ts`
(Zod schema, glob loader over `src/content/libri/*.md`). The filename is the
slug and the URL (`/libri/<slug>`), routed by `src/pages/libri/[...id].astro`.

- **Required**: `titolo`, `autore`, `copertina` (absolute path under `public/`,
  e.g. `/immagini/copertine/x.jpg`).
- **Optional & shown only when present**: `traduttore`, `titoloOriginale`,
  `anno`, `lingua`, `paese`, `collana`, `pagine`, `isbn`, `estratto`.
- `inEvidenza: true` surfaces a book on the homepage; `ordine` (higher = first)
  sorts the catalog.
- `cartaceo` / `ebook` are arrays of `{ nome, url, logo? }` store links; logos
  live in `public/immagini/loghi/`.

The schema is deliberately permissive so the catalog **scales beyond Brazilian
literature** — adding a book from a new country/language needs no code changes.
The catalog filter bar (`src/pages/libri/index.astro`) is generated from the
distinct `paese` values and only renders when more than one country exists.

When changing a book's frontmatter field name, update both
`src/content.config.ts` (schema) and the consuming templates, or the build fails.

## Assets

Everything in `public/` is served as-is at the site root. Images are referenced
by absolute path from frontmatter/templates (not imported), so they are not run
through Astro's image optimizer.
