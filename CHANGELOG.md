# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.2.1] - 2026-06-11

### Fixed

- **Contact page** — hardcoded location values replaced with data from Payload. The `PageHeader` subtitle now reads from the `address` field in the `SiteSettings` global via `getSiteSettings()`; the address card sub-label no longer displays a hardcoded neighbourhood name.

### Changed

- **Typography** — display font switched from Bodoni Moda to **Spectral**. Bodoni Moda's extreme hairline contrast caused legibility issues on dark backgrounds; Spectral is a screen-optimised serif with moderate stroke contrast that remains fully readable at all weights, including italic. `font-optical-sizing` removed (not applicable to non-variable fonts).
- **Heading weight** — all display headings (`h1`, `h2`, `h3`) moved from `font-bold` (700) to `font-extrabold` (800) for stronger visual presence. Logo wordmarks and numeric price displays remain at `font-bold`.

---

## [1.2.0] - 2026-06-11

### Added

- **PRODUCT.md** — design context file documenting register (`brand`), target users, product purpose, brand personality, anti-references and 5 strategic design principles.
- **DESIGN.md** — design system file documenting colour strategy (Committed), typography, elevation conventions, motion rules and project-level bans.

### Changed

- **Typography** — `Playfair Display` replaced by **Bodoni Moda** (variable Italian didone with optical sizing); `DM Sans` replaced by **Lato** (humanist sans). Both removed fonts were on the design system reflex-reject list. Automatic optical sizing and negative tracking applied to `h1`/`h2`.
- **Colour system** — all hex values converted to **OKLCH** in `@theme` and `html.dark`; neutrals tinted toward the primary hue (chroma 0.005–0.04).
- **Hero** — gradient background replaced with solid `bg-brand-surface`; floating metric badge cards (`+100 clientes`, `5.0 ⭐`) removed; five sparkle decorations removed; trust signals moved to an inline text row below the CTAs.
- **BookingBand** — rounded gradient card removed; section is now full-bleed with a solid `bg-primary-dark` background.
- **Footer** — `bg-gradient-to-br` gradient replaced with solid `oklch(18% 0.12 290)`.
- **PageHeader** — gradient background replaced with solid `bg-brand-surface`; consistent with the Hero.
- **SectionTitle** — decorative gradient bar replaced with a subtle `1px` solid line.
- **ServicesSection** — icon-in-rounded-square container removed; icon displayed inline beside the heading. Purple glow hover removed; hover is now `translateY(-4px)` only.
- **ProductCard** — purple glow hover removed; spring transition replaced with linear `ease-out`.
- **Header (Logo)** — `linearGradient` SVG fill on the "S" replaced with `fill="currentColor"`.
- **CartDrawer / Header drawer** — spring transition replaced with `0.28s` ease-out-quint `[0.22, 1, 0.36, 1]`.
- **GallerySection** — spring transition in the lightbox replaced with ease-out-quint; gradient placeholders replaced with solid `bg-primary-pale`.
- **BookingForm** — info card gradient replaced with `bg-primary-dark`; hardcoded `stroke="#9B3FC8"` replaced with `stroke="currentColor"`.
- **Contact page** — icon-in-rounded-square containers removed from contact cards; purple glow hover removed; hardcoded SVG colours replaced with `currentColor`.
- **ProductDetails** — image placeholder gradient replaced with `bg-primary-pale`.
- **Loading skeletons** — all gradient backgrounds in loading states replaced with solid surfaces.
- **`safPop` animation** — renamed to `safFadeIn`; opening scale changed from `0.6` to `0.88`; duration reduced to `0.2s ease-out`.

---

## [1.1.0] - 2026-06-03

### Added

- **Hero image from CMS** — `heroImage` field in `SiteSettings` global now renders in the Hero section; falls back to the emoji placeholder when unset.
- **Dynamic site settings context** — `heroImageUrl` exposed via `SiteSettingsContext` and `getSiteSettings` with `depth: 1` to populate the relation.
- **Cloudflare R2 media storage** — all Payload media uploads now go to a Cloudflare R2 bucket via `@payloadcms/storage-s3`; local `public/media` directory removed. Files are served directly from the R2 public CDN URL.
- **App icon** — added `src/app/icon.svg` for browser tab favicon.

### Changed

- **Header logo** — replaced the gradient `<div>` placeholder with an inline SVG rendering a serif "S" with a gradient fill, matching the brand palette.
- **Gallery empty state** — placeholder grid count increased from 8 to 10 to better fill the layout.
- **next.config.ts** — added `**.r2.dev` to `images.remotePatterns` so `next/image` can serve R2-hosted assets.

---

## [1.0.1] - 2026-06-02

### Fixed

- Wrapped all server-component database calls (`HomePage`, `LojaPage`, `AgendamentoPage`) in `try/catch` so a missing `DATABASE_URL`, `PAYLOAD_SECRET` or network failure no longer causes the generic Next.js production error page. Pages now fall back to empty data and log the real error to the server console.

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
