# Premium Qiymətləndirmə MMC — Website

Static marketing site for Premium Qiymətləndirmə MMC, a property/business
valuation company in Baku, Azerbaijan. Built with Next.js 14 (App Router),
TypeScript, Tailwind CSS, and Framer Motion. No backend or database — all
content lives in `src/lib/content.ts`.

## Tech stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS 3
- Framer Motion (animations, scroll reveals, parallax hero)
- react-countup (animated stat counters)
- Radix UI primitives (Select, Label) styled shadcn-style in `src/components/ui`
- next/font (Playfair Display + DM Sans)

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Build

```bash
npm run build
npm run start
```

## Project structure

- `src/app` — routes: `/` (home), `/xidmetler` (services), `/haqqimizda`
  (about), `/elaqe` (contact). Each route's `page.tsx` is a server component
  that exports SEO metadata and renders a client page component.
- `src/lib/content.ts` — all AZ/RU site copy, services, stats, process
  steps, etc. Edit this file to update text without touching components.
  Stat numbers in `content.ts` (`5+ years`, `200+ clients`, etc.) are
  placeholders — confirm real figures with the client before launch.
- `src/lib/whatsapp.ts` — builds the WhatsApp deep link and `mailto:` link
  from the contact form values.
- `src/components` — shared UI (navbar, footer, glass cards, request form,
  locale provider) and `sections/` (homepage blocks).
- `public/logo.svg`, `public/logo-white.svg`, `public/icon.svg` — brand mark
  (navy house + gold arrow + crown) in normal and reversed-for-navy variants.

## Editing content / language

All AZ and RU copy is in `src/lib/content.ts` as plain objects (`az`, `ru`).
The language toggle in the navbar switches a React context
(`src/components/locale-provider.tsx`) and persists the choice in
`localStorage` — no routing/i18n config involved.

## Deploy

Any Next.js host works (Vercel, Netlify, etc.). For Vercel:

```bash
npm i -g vercel
vercel
```

No environment variables are required — the site is fully static with no
backend integrations.
