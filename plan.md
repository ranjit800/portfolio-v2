# Portfolio V3 - Product Plan

## Goal

Build a **single-page** portfolio for Ranjit Jana: cinematic, premium, modern, and interactive without feeling like a basic static site. Navigation smoothly moves visitors through the same page: **Home, About, Projects, Uses, and Contact**.

## Design System

| Role | Token | Value |
| --- | --- | --- |
| Main background | `surface` | `#0B0F14` |
| Accent / CTA | `accent` | `#FF8A00` |
| Primary heading text | `heading` | `#F8F9FA` |
| Secondary / body text | `subtext` | `#A0AEC0` |

- Style: dark, modern, minimal, bold, and clean.
- Typography: Space Grotesk (500–700) for major headings, capability titles, Persona narrative, and decorative wordmarks; Manrope (400–700) for subtitles, project names, paragraphs, navigation, buttons, and forms; Geist Mono for technical labels and counters. Fonts are self-hosted through `next/font/google` with swap loading and shared `font-display`, `font-sans`, and `font-mono` tokens.
- Orange is reserved for CTAs, links, active states, highlights, and small visual details.
- Every interactive button and CTA uses the shared orange neumorphic style: tactile highlights/shadows, soft lift-and-press motion, visible keyboard focus, and a reduced-motion fallback.
- Keep strong typography, generous spacing, subtle borders, rounded cards, and a personal/editorial feel.
- Use background images selectively. A section should earn an image through its storytelling; otherwise prefer CSS texture, typography, depth, borders, and glow.

## Motion Direction

- Use smooth scroll-triggered reveal animations throughout the page.
- Use parallax repeatedly as a consistent visual language: background depth, media drift, glow movement, and selected card/text movement.
- Use Lenis for restrained desktop wheel smoothing with native mobile touch scrolling, working anchor links, and reduced-motion support.
- Include controlled zooms, staggered entrances, and premium hover states where they improve the section.
- Do not trap scrolling or use harsh scroll hijacking; visitors keep normal scroll control.
- Use lightweight, meaningful Lottie files only where a section benefits from them.
- Respect `prefers-reduced-motion`: show content immediately, remove parallax/transforms, and stop decorative loops.
- On mobile, keep interactions clean and efficient; reserve intensive effects for capable desktop screens.

## Single-Page Structure

1. **Home** — Hero introduction, core CTA, social links, and invitation to explore.
2. **About** — Personal story, approach, experience highlights, and editorial content.
3. **Projects** — Selected work, project visuals, technology stack, outcomes, and verified links.
4. **Uses** — Curated skills, tools, technology, and workflow. This replaces the old **Skills** label.
5. **Contact** — Collaboration CTA, contact details, and the final page exit.

The resume remains available from the Hero download action. The existing desktop Dynamic Island/notch navigation and mobile drawer will use anchors for these five sections.

## Current State

- Contact is implemented at `/contact` with the verified email, phone, Kolkata location, social profiles, CV link, and a responsive enquiry form. Navbar, mobile drawer, Footer, and Let's Talk CTAs open this page. The Home contact preview links to it.
- Contact messages use a server-side Resend endpoint when `RESEND_API_KEY` and `CONTACT_FROM_EMAIL` are configured. Without them, the form explicitly opens a prefilled email draft. Setup is documented in `docs/contact-setup.md`.
- The Hero is the current visual baseline.
- Projects is now the implemented Creations archive: a desktop sticky introduction with three CSS-only demo-project records. Journey and Contact previews remain to be redesigned.
- Persona is now the implemented About treatment: a CSS-starfield, seven-beat EOD development story with a local orange-cat Lottie; Uses is now an implemented terminal-inspired toolchain showcase.
- The project uses Next.js, Tailwind CSS, Framer Motion, and local image assets.
- The current resume is the source of truth for professional content.

## Redesign Roadmap

Build and refine the single-page experience in this order:

1. **About** — navigation remains About, while the visible editorial title is Persona. It is an image-free black scrollytelling card with CSS stars, thoughtful copy, dry humor, and a small decorative orange-cat Lottie. It rises over the sticky Hero on desktop, then expands from the matching inset card frame to full screen; on mobile/tablet it follows Hero in normal document flow.
2. **Uses** — a curated stack and workflow section with icons, subtle parallax, and optional small relevant Lottie.
3. **Projects** — presented on-page as **Creations**: selected work with CSS interface covers, concise metadata, and restrained record motion. Verified links can be added when available.
4. **Journey** — fold the existing career progression into About or reshape it as a compact transition section.
5. **Contact and footer** — finish with a direct, visually distinct invitation and polished social/contact ending.

Before building each section, decide its layout, required visual asset (if any), motion sequence, parallax layers, Lottie need, and mobile behavior.

## Image and Lottie Workflow

- Define the exact layout before generating an image, and use one only when it improves the section.
- Every generated image needs low-detail/negative space behind text, the dark cinematic treatment, warm orange rim light where useful, and **no readable words, letters, logos, or watermarks**.
- Use dark overlays whenever imagery is used so text remains readable.
- Keep Lotties optimized, local, decorative where appropriate, and lazy-loaded offscreen.

## Content Rules

- Keep content truthful and aligned with the latest resume.
- Reuse old portfolio content or links only after confirming they are still current.
- Do not return to the old black/purple neon system; retain the dark-orange visual identity.
- Keep every section focused and easy to scan despite the premium motion.
