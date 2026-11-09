# Faultlens website — verification report (November 9, 2026)

| Test | Result | How it was checked |
|---|---|---|
| Production build | **Pass** | `npm run build` — Vite client build, SSR build and prerender of 5 routes, no errors |
| Linting | **Pass** | `npm run lint` (ESLint 10 + react-hooks rules), 0 problems |
| Type checking | Not applicable | Project is JavaScript by specification (no TypeScript) |
| Unit tests | **Pass** | `npm test` — 7 tests for the form Lambda (valid send + CORS, wrong origin, missing fields, bad email, unknown form, bad JSON, honeypot, SES failure, preflight) |
| Prerendered / crawlable HTML | **Pass** | `dist/index.html` contains all section copy, incl. "How We Use Amazon Web Services", team, pricing; JSON-LD and Open Graph tags present |
| Routes | **Pass** | `/`, `/privacy`, `/terms`, `/app`, `/app/` return 200 with the right titles; unknown paths return HTTP 404 with the 404 page (via `vite preview`) |
| Hydration | **Pass** | No console errors on `/`, `/app`, `/terms` after reload |
| Navigation and anchors | **Pass** | Every in-page `#` link on the home page resolves to an element; no empty links; external links are the business email and the supplied LinkedIn page |
| `/app` hidden | **Pass** | No link to `/app` from any page; `noindex, nofollow`; not in `sitemap.xml` |
| `/app` downloads | **Pass** | All 13 download links return 200; all preview images load |
| Character counts | **Pass** | Tagline 93/120, LinkedIn overview 1,664/2,000, AWS Q9 220/250 (computed by the page and by `npm run docs`) |
| Interactive demo | **Pass** | Analyse reel → pipeline → brief; edit brief; confirm → Matches filtered to Refrigeration; View modal; Request quote → status pill, new job row, counters update; Jobs status filter; Repair reels before/after toggle |
| Form validation | **Pass** | Empty submit shows field errors and focuses the first; invalid email rejected with `aria-invalid` |
| Form submission (end-to-end, local) | **Pass** | Site built with `VITE_FORM_ENDPOINT` pointing to the real Lambda handler run locally (SES replaced by a logger). Both forms showed the confirmation and produced correctly formatted emails; simulated SES failure and an unreachable endpoint both showed an error, never a success |
| Form submission (live AWS) | **Not run** | No AWS account access from this machine. Deploy the stack and submit both forms on the live site (docs/forms-setup.md) |
| CloudFormation template | Not validated by AWS | Generated as valid JSON with inline code 3.9/4 KB; not run through `cfn-lint` or deployed |
| Mobile responsiveness | **Pass** | 375 px: no horizontal overflow, mobile menu opens/closes (Escape too), sections stack correctly |
| Desktop | **Pass** | 1440 px and pane width checked visually |
| Tablet | Partly checked | Layout uses the same md/lg breakpoints; not separately screenshotted |
| AWS architecture consistency | **Pass** | Same 14 services in the diagram, workflow, service list, README and /app overview; AWS Activate Q2 lists each of them that the form offers (CloudFront is not in its option list); described as architecture, not as deployed |
| Secrets in frontend | **Pass** | Search for AWS keys / secrets in `src` and `dist`: none |

## Not verified
- Real email delivery through Amazon SES (stack not deployed).
- The mailto fallback used when no endpoint is set (not triggered, as it would open the Mail app).
- Lighthouse / Core Web Vitals scores (not run).
- Deployment to the live domain (not deployed from here).
- Whether linkedin.com/company/faultlensai resolves (LinkedIn blocks automated checks; URL supplied by the founders).
- Screen-reader testing beyond semantic markup, labels, focus styles and ARIA attributes.
