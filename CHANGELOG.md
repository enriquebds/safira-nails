# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] - 2026-06-02

### Added

- **Project bootstrap** — Next.js 15 + Payload CMS 3 monorepo setup with TypeScript, Tailwind CSS v4 and ESLint.
- **Payload CMS collections** — `Products`, `Services`, `Media`, `Users` (with auth) and global `SiteSettings`.
- **PostgreSQL adapter** — migrated from MongoDB; push mode enabled for zero-config first boot.
- **Cart store** — Zustand-powered cart with persistent state, type-safe actions and validation schemas.
- **UI primitives** — reusable button, badge, card, modal and theme-toggle components.
- **Layout components** — responsive `Header` with mobile nav, sticky scroll behaviour and anchor-link support; `Footer` with contact info and social links.
- **Feature components**:
  - `HeroSection` — full-screen hero with CTA buttons.
  - `ServicesSection` — grid of services fetched from CMS.
  - `FeaturedProducts` — highlighted product cards fetched from CMS.
  - `GallerySection` — masonry photo gallery.
  - `ProductCard` / `ProductDetails` — product listing and detail view.
  - `CartItem` — cart line-item with quantity controls.
  - `BookingSection` — appointment booking UI.
- **Pages** — `/` (home), `/loja` (shop), `/contato` (contact), `/agendamento` (booking) and Payload admin routes.
- **WhatsApp FAB** — floating action button that pre-fills a WhatsApp message with cart contents.
- **Dark mode** — system-aware theme with design-palette-aligned CSS variables.
- **Database seed script** — seeds initial services and products for development/staging.
- **Railway deployment** — `Dockerfile`, `nixpacks.toml` and `.env.example` for one-click Railway deploys.
- **Loading skeletons** — per-route `loading.tsx` files for Suspense-based loading states.

### Fixed

- Payload admin layout, `importMap` and page files aligned with generated structure.
- REST options route renamed from `[...payload]` to `[...slug]` to fix API routing.
- Database queries moved out of Next.js build phase to prevent build-time failures.
- Tailwind v4 theme migrated to CSS custom properties (`@theme`).
- `themeColor` moved to `viewport` export to resolve Next.js metadata warning.
- `@next/env` pinned via `overrides` to clear Railway CVE scan alert.
- Dark-mode implementation aligned with the Safira design palette.
- Smooth scrolling restored for homepage anchor links in the navigation.
- Next.js downgraded to 15.5.19 to restore Payload CMS peer-dependency compatibility.

---

<!-- next release goes above this line -->
