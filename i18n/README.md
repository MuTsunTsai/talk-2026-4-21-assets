# Roastery Ledger

A coffee roasting & cupping log web app — a small single-page application built with Vue 3, TypeScript, vue-i18n, and Rsbuild.

## Quick start

```bash
pnpm install
pnpm dev       # open http://localhost:5173
pnpm build     # production bundle
pnpm typecheck # TypeScript check
```

## Project layout

| Path | Description |
|---|---|
| [src/locales/en.json](src/locales/en.json) | i18n messages (English only for now) |
| [src/i18n.ts](src/i18n.ts) | vue-i18n setup (Composition API mode) |
| [src/views/](src/views/) | 5 top-level views: Dashboard / Beans / RoastLog / Cupping / Settings |
| [src/components/](src/components/) | Shared components: NavBar, Toast, RatingStars |
| [src/data/mockData.ts](src/data/mockData.ts) | Static mock data |

## Features

- **Dashboard** — at-a-glance stats, recent activity, what's in development
- **Beans** — green coffee inventory with origin, variety, process, and logistics details
- **Roast Log** — roast session timeline with stage breakdown, event markers, and metrics (DTR, RoR)
- **Cupping** — score sheet following the SCA-style attributes, plus flavor notes
- **Settings** — data import/export, preferences, subscription info

## Tech stack

- Vue 3 (Composition API) + TypeScript (`strict: true`)
- [vue-i18n](https://vue-i18n.intlify.dev/) 10.x in Composition API mode (`legacy: false`)
- [Rsbuild](https://rsbuild.rs/) with `@rsbuild/plugin-vue`
- No router, no state library, no UI kit — kept intentionally minimal
