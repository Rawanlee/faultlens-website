# Faultlens website

Official website for **Faultlens** (https://www.faultlens.space) — AI fault diagnosis and verified technician matching. Customers film a 15-second Fault Reel, Faultlens drafts a fault brief (likely cause, urgency, safety notes, trade needed) and matches the job to a technician with the right skills, from $1 a month.

Built with **Vite, React (JavaScript), Tailwind CSS v4, React Router and Lucide icons**. Every page is prerendered to static HTML at build time so the content is crawlable without JavaScript, then hydrated in the browser.

## Pages

| Route | Purpose |
|---|---|
| `/` | Home: hero, faulty-vs-fixed scenes, problem, features, how it works, interactive demo, use cases, AI, **How We Use Amazon Web Services**, pricing, team, get started, contact |
| `/privacy` | Privacy Policy |
| `/terms` | Terms of Service |
| `/app` | **Unlisted launch kit** — logo and banner downloads, brand colours, LinkedIn company profile copy, founder headlines, AWS Activate answers (Q1–Q14) with character counts, startup overview, items to verify. Not linked anywhere, `noindex`, not in the sitemap. |
| anything else | 404 page |

## Quick start

Requires Node.js 20+.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # client build + SSR build + prerender into dist/
npm run preview    # serve dist/ at http://localhost:4173
npm run lint
```

Other scripts:

- `npm run assets` — regenerates the logo, LinkedIn banners and Open Graph image (SVG + PNG) in `public/assets/`.
- `npm run docs` — regenerates `docs/linkedin-profile.md` and `docs/aws-activate.md` from `src/data/kit.js`.

## Environment variables

Copy `.env.example` to `.env`.

| Variable | Required | Purpose |
|---|---|---|
| `VITE_SITE_URL` | No (defaults to https://www.faultlens.space) | Canonical URLs, Open Graph and structured data |
| `VITE_FORM_ENDPOINT` | Recommended | URL that accepts a JSON `POST` from the Get started and Contact forms (e.g. a Formspree form URL or your own API Gateway route). |
| `VITE_ANALYTICS_ENABLED` | No | `true` sends CTA/form/demo events to Plausible or a GA `dataLayer` if one is added to `index.html`. |

`VITE_` variables are public and bundled into the site. **Never put AWS keys or secrets in them.**

### Connecting the forms

The repo includes the form backend: `backend/faultlens-forms.template.json`, a CloudFormation stack
(API Gateway HTTP API → Lambda → Amazon SES) you can deploy from the AWS console. Step-by-step guide:
**`docs/forms-setup.md`**. Related scripts:

- `npm test` — unit tests for the Lambda handler (validation, origin check, honeypot, SES failure).
- `npm run backend:template` — regenerates the CloudFormation template from `backend/form-handler/index.js`.
- `npm run forms:local` — local stand-in API on http://localhost:8787/contact that prints emails instead of sending.

### How the forms behave

- With `VITE_FORM_ENDPOINT` set: the form POSTs JSON and shows a confirmation only after a 2xx response; otherwise it shows an error with the email address. A hidden `_gotcha` honeypot field filters simple spam bots.
- Without it: the form validates, then opens the visitor's email app with the details pre-filled to shalom@faultlens.space and tells them to press **Send**. It never shows a fake "submitted" message.

## Project structure

```
public/                 favicon, robots.txt, sitemap.xml, assets/brand/*, og-image
backend/
  form-handler/         Lambda source + tests for the form API
  faultlens-forms.template.json  CloudFormation stack (generated)
scripts/
  render-assets.js      brand asset generator (SVG → PNG via resvg)
  prerender.js          renders each route to static HTML after the build
  export-docs.js        writes LinkedIn / AWS Activate docs from src/data/kit.js
  build-backend-template.js  inlines the Lambda into the CloudFormation template
  local-form-server.js  local form API for testing
src/
  data/company.js       single business record (name, domain, founders, links)
  data/content.js       marketing copy, features, AWS services, pricing
  data/demo.js          fictional sample data for the interactive demo
  data/kit.js           LinkedIn + AWS Activate content for /app and docs
  components/layout/    Header, Footer, Layout
  components/sections/  one file per home-page section
  components/dashboard/ Demo.jsx — interactive product workspace
  components/ui/        Logo, Button, Form, FaultScene illustrations, etc.
  pages/                Home, Privacy, Terms, AppKit (/app), NotFound
  lib/                  seo.js (head tags + JSON-LD), forms.js, analytics.js
  entry-server.jsx      SSR entry used by the prerender step
docs/                   LinkedIn kit, banner spec, AWS Activate answers, checklist, verification report
```

To change facts (founders, email, LinkedIn), edit `src/data/company.js`. To change copy, edit `src/data/content.js`. Then run `npm run build` (and `npm run docs` if kit content changed).

## Deployment

The build output in `dist/` is static: `index.html`, `privacy/index.html`, `terms/index.html`, `app/index.html` and `404.html`.

**Vercel** — import the project; framework "Vite"; build `npm run build`; output `dist`. `vercel.json` enables clean URLs. Add env vars in Project Settings.

**Netlify** — build `npm run build`, publish `dist`. `public/_redirects` serves `404.html` for unknown paths.

**AWS Amplify Hosting** — build `npm run build`, base directory `dist`. Add a rewrite: source `</^[^.]+$/>` → target `/404.html`, type `404 (Rewrite)` placed **after** the default rules; Amplify serves `/privacy/index.html` for `/privacy` automatically.

**Amazon S3 + CloudFront** — upload `dist/` to a private bucket, use CloudFront with Origin Access Control, set the default root object to `index.html`, add a CloudFront Function that appends `/index.html` to extension-less paths, and set the 404 error response to `/404.html`.

Then point `www.faultlens.space` at the host and redirect the apex domain to `www`.

## Accuracy notes

- The interactive demo uses clearly labelled fictional sample data and runs entirely in the browser. It does not upload video or call AI services.
- The AWS section describes Faultlens' architecture. It does not claim the listed services are deployed; update the wording once they are configured in your account.
- No customer counts, revenue, testimonials or partnerships are shown.

See `docs/deployment-checklist.md` before going live and `docs/verification-report.md` for what was tested.

## Browser support

Current Chrome, Edge, Firefox and Safari (desktop and mobile). Uses CSS grid, `IntersectionObserver` (with a fallback) and the Clipboard API on `/app` (falls back to a copy prompt).

© 2026 Faultlens
