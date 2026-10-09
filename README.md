# Satyam Katara — Data Analyst Portfolio

A premium, motion-driven portfolio for **Satyam Katara** (B.Tech CSE · Data Science, graduating 2027), built to land one message in under 10 seconds: *"I can work with data, extract meaningful insights, and communicate them effectively."*

Live target audience: recruiters and hiring managers skimming for 60–90 seconds, often on a phone.

## Stack & pinned versions

| Package | Version | Notes |
|---|---|---|
| `next` | 15.5.27 | App Router, React 19 |
| `react` / `react-dom` | 19.3.0 | |
| `tailwindcss` / `@tailwindcss/postcss` | 4.3.3 | CSS-first config via `@theme` |
| `framer-motion` | 12.43.0 | React 19 compatible (peer `^18 \|\| ^19`) |
| `three` | 0.186.1 | |
| `@react-three/fiber` | 9.8.1 | React 19 / three `>=0.156` |
| `recharts` | 3.10.1 | Client-only via `next/dynamic` (`ssr: false`) |
| `lucide-react` | 1.53.0 | **Brand icons (Github/Linkedin) were removed** — custom SVGs live in `src/components/ui/BrandIcons.tsx` |
| `react-hook-form` | 7.89.0 | |
| `@hookform/resolvers` | 5.9.1 | |
| `zod` | 3.25.76 | |
| `resend` | 6.32.1 | Contact-form email delivery |
| `typescript` | 5.9.x (`strict: true`) | |

**Deliberate omission:** `@react-three/drei` is *not* installed. The hero scene (node sphere + lines) needs only `@react-three/fiber` + `three`; skipping drei keeps the JS bundle small, per the spec's priority.

Exact install commands used:

```bash
npx create-next-app  # not used — scaffolded manually for Tailwind v4 control
npm install next@15.5.27 react@19.3.0 react-dom@19.3.0 \
  tailwindcss@4.3.3 @tailwindcss/postcss@4.3.3 \
  framer-motion@^12 three@0.186.1 @react-three/fiber@9.8.1 \
  recharts@3.10.1 lucide-react@1.53.0 \
  react-hook-form@7.89.0 @hookform/resolvers@5.9.1 zod@3.25.76 \
  resend@6.32.1
npm install --save-dev typescript @types/react @types/react-dom @types/node \
  @types/three@0.186.0 eslint eslint-config-next@15.5.27 @eslint/eslintrc
```

## Setup

```bash
cd portfolio-satyam-katara
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint     # eslint (0 errors expected)
npx tsc --noEmit # typecheck (0 errors expected)
```

## Environment variables

Copy `.env.example` to `.env.local` and fill in:

| Var | Required | Purpose |
|---|---|---|
| `RESEND_API_KEY` | Yes (for form) | Resend API key — [resend.com/api-keys](https://resend.com/api-keys) |
| `CONTACT_TO_EMAIL` | Yes (for form) | Where form messages are delivered |
| `CONTACT_FROM_EMAIL` | No | Verified sender. Defaults to Resend's onboarding address (only delivers to the Resend account owner's inbox — fine for testing, not production) |

**Graceful degradation:** if the Resend vars are missing at runtime, `/api/contact` returns 503 and the contact section renders *no form at all* — just the mailto link + copy-email button. There is never a fake, non-functional form.

## Editing content — `src/data/content.ts`

**All user-facing copy lives in `src/data/content.ts`.** Components never hardcode copy. It is fully typed; key knobs:

- `identity.availability.enabled` — toggle the "Open to roles" hero badge.
- `identity.siteUrl` — set after deployment (enables canonical URLs, OG `url`, sitemap entries, JSON-LD `url`). Leave empty until then; metadata degrades gracefully.
- `education.showCgpa` — toggle the CGPA line.
- `showCyberGuard` — toggle the 7th project card (CyberGuard AI, in-progress final-year project). Default `false`.
- `inProgressCertifications` — add items and the "In progress" subsection appears automatically.
- Project `github: null` hides the GitHub button (never link a guessed URL). `preview.type: "screenshot"` + `src` swaps generated art for a real screenshot.
- `experience[].detailsTodo` — renders a neutral fallback line until verified bullets are added.

Derived stats (internship count, certification count, project count, daily-use tool count) are computed from the arrays — never hardcode them.

## Adding assets

- **Resume:** replace `public/resume.pdf` with the real one-page PDF (same filename; the hero "Download Resume" button and nav use it).
- **Project screenshots:** drop `public/projects/<slug>.png`, then in `content.ts` set that project's `preview` to `{ type: "screenshot", src: "/projects/<slug>.png", alt: "…" }`.
- **Certificate images:** drop files under `public/certificates/` and set `certificateImage` on the certification (currently unused — cards render the credential link only when `credentialUrl` is set).
- **Favicon:** `src/app/icon.svg` (SK monogram).

## Vercel deployment

1. Push this folder to a GitHub repo.
2. Vercel → *Add New Project* → import the repo. Framework preset: Next.js (auto-detected).
3. Environment variables: add `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, and (production) `CONTACT_FROM_EMAIL` — a sender address verified in Resend.
4. Deploy. Then set `identity.siteUrl` in `src/data/content.ts` to the production domain (e.g. `https://satyamkatara.vercel.app` or a custom domain) and redeploy so canonical/OG/sitemap URLs are correct.
5. Custom domain: Vercel Project → Settings → Domains → add domain, follow DNS instructions.

## Motion & performance notes

- `MotionConfig reducedMotion="user"` wraps the app; `useReducedMotionSafe()` disables chart animation, parallax, and particles.
- The 3D hero mounts only after the hero is visible **and** the browser is idle (`requestIdleCallback`); static SVG fallback renders for reduced-motion, WebGL-unsupported, low-power, or error states.
- `frameloop="demand"` + `dpr={[1, 1.5]}` on the R3F canvas; the render loop pauses when the tab is hidden.
- Heavy modules are code-split: Three.js scene (`ssr: false` dynamic import), Recharts showcase (`ssr: false` dynamic import).

## Open items (TODOs left in the build)

1. **Nifty 100 repo URL** — `github: null` in `content.ts`; GitHub button hidden until the real URL is verified.
2. **Superstore Sales Analysis repo URL** — same as above.
3. **iStudio internship bullets** — `detailsTodo: true`; timeline shows a neutral fallback line ("Contributed to data science initiatives as part of the team.") with no invented claims.
4. **Certificate credential URLs** — all six `credentialUrl: null`; "Verify" links hidden.
5. **Project screenshots** — all six projects use generated abstract SVG art; add real screenshots to `public/projects/<slug>.png` and flip `preview.type`.
6. **Real `resume.pdf`** — placeholder PDF ships in `public/`; replace before sharing the link.
7. **`identity.siteUrl`** — empty; set after deployment for canonical/OG/sitemap correctness.
8. **Resend sender domain** — `CONTACT_FROM_EMAIL` unset; onboarding address only delivers to the Resend account owner.

## QA status (2026-10-09)

- `npx tsc --noEmit` — **0 errors**
- `npm run lint` — **0 errors, 0 warnings**
- `npm run build` — **passes, 14/14 static pages** (home + 6 project pages + robots + sitemap + OG image + icon + 404 + API)
- Smoke-tested with `next start`: home (200), project pages incl. `github: null` (no repo button, only profile link) and `concept` badge, `/robots.txt`, `/api/contact` → 503 without env (UI shows mailto fallback, no form), 422 on invalid input, honeypot → silent `200 {ok:true}` with no email sent, `/opengraph-image` → valid 1200×630 PNG (visually verified).
- **Could not verify:** real-browser Lighthouse scores (no browser tooling in this environment — targets are 90+ perf / 95+ a11y per spec); 320px no-overflow and keyboard-only walkthrough (designed for, not device-tested); end-to-end Resend delivery (needs a real API key — code path reviewed, validation/honeypot/503 paths tested); actual reduced-motion/WebGL-disabled rendering (fallback logic implemented and unit-reasoned, not device-tested).
