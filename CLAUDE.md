# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

Note: the import above pulls in an auto-generated warning that this Next.js version (16.3.4) has breaking API changes vs. typical training data. Consult `node_modules/next/dist/docs/` before relying on assumptions about Next.js conventions.

## Commands

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run start` — run production build
- `npm run lint` — ESLint (flat config via `eslint-config-next`)

There is no test suite in this repository currently.

## Architecture

- Next.js App Router. Code lives at the repo root under `app/` — there is no `src/` directory. The `@/*` path alias resolves to the repo root, not `src/`.
- Tailwind CSS v4 with CSS-first config — there is no `tailwind.config.*` file and none should be added. Tailwind is wired up via `postcss.config.mjs` (`@tailwindcss/postcss` plugin) and `@import "tailwindcss";` in `app/globals.css`.
- This is currently a minimal `create-next-app` scaffold: only the default root layout/page exist, with no sections, components, routing, content model, or animation library built yet. Treat this as building the structure from scratch rather than following an established in-repo pattern.
- `public/asset/images/` already contains avatar and hero-background images that aren't yet referenced by any component — likely intended for an upcoming hero/about section.
