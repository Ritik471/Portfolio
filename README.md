# starfall-port

Personal portfolio for **Ritik Shah** — Software Engineer & Frontend Architect.

Live: [ritikshah-portfolio.netlify.app](https://ritikshah-portfolio.netlify.app/)

## Tech stack

- **Vite** + **TypeScript** + **React 18**
- **Tailwind CSS** + **shadcn/ui** (Radix primitives)
- **Framer Motion** for scroll-driven animation
- **React Router 6**, **TanStack Query**, **React Hook Form** + **Zod**
- **Resend** + **Netlify Functions** for the contact form
- **Vitest** + Testing Library for unit tests

## Getting started

Requires Node.js 18+ and npm.

```sh
git clone <repo-url>
cd starfall-port
npm install
npm run dev
```

The dev server runs on [http://localhost:8080](http://localhost:8080) (port is `strictPort`, so it won't fall back).

## Available scripts

| Script              | Description                                  |
| ------------------- | -------------------------------------------- |
| `npm run dev`       | Start the Vite dev server                    |
| `npm run build`     | Production build to `dist/`                  |
| `npm run build:dev` | Development-mode build                       |
| `npm run preview`   | Preview the production build locally         |
| `npm run lint`      | Run ESLint over the project                  |
| `npm run test`      | Run the Vitest suite once                    |
| `npm run test:watch`| Run Vitest in watch mode                     |

## Project layout

```
index.html               Root HTML, SEO/OG tags, GA snippet
netlify.toml             Netlify build + redirects
netlify/functions/       Serverless endpoints (send-email, now-playing)
public/                  Static assets (robots.txt, sitemap.xml, _redirects)
src/
  App.tsx                Providers + router
  main.tsx, index.css
  pages/                 Index, About, Projects, Experience, Certificates, Contact, NotFound
  components/            Layout, Dock, NavLink, Reveal, ScrollToTop, ThemeToggle
  components/ui/         shadcn/ui primitives
  hooks/                 useTheme, usePageTitle, useGoogleAnalytics, use-toast, use-mobile
  lib/utils.ts           cn() helper
  test/                  Vitest setup + examples
```

## Contact form (Resend + Netlify Functions)

The `/contact` form posts to `netlify/functions/send-email.js`, which uses [Resend](https://resend.com) to deliver mail.

1. Create a Resend account and generate an API key.
2. In Netlify → **Site settings → Environment variables**, add:
   - `RESEND_API_KEY` — your Resend key
3. For local testing, run `npx netlify dev` so the functions are served alongside Vite.

## Deployment

The site deploys to Netlify on push. `netlify.toml` and `public/_redirects` handle the SPA fallback so client-side routes (`/about`, `/projects`, …) resolve correctly on hard refresh.

## License

All rights reserved. Personal portfolio — please don't redistribute the content (copy, branding, project write-ups). Feel free to take inspiration from the code.
