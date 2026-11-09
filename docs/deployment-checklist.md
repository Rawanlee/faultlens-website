# Faultlens — pre-deployment checklist

## Content and facts
- [ ] Confirm Faultlens is live for real users (site says "Live"; AWS Activate Q6 = "Launched initial product and iterating"). If not, change the hero badge and Q6.
- [ ] Confirm founder titles ("Founder", "Co-Founder"); add photos and personal LinkedIn URLs in `src/data/company.js` when available.
- [ ] Confirm plan prices other than the $1 Fix Pass (Home Plus $4, Property $15, Technician Pro $9) in `src/data/content.js`.
- [ ] Add headquarters / country if you want it on LinkedIn and in the Privacy Policy.
- [ ] Have the Privacy Policy and Terms reviewed by a lawyer for your country (consumer law, data protection, marketplace liability).
- [ ] AWS: the site describes the architecture. Before saying any service is deployed, configure it in your AWS account.

## Forms
- [ ] Verify shalom@faultlens.space in Amazon SES and deploy `backend/faultlens-forms.template.json` (see `docs/forms-setup.md`).
- [ ] Set `VITE_FORM_ENDPOINT` to the stack's FormEndpoint output in the hosting environment.
- [ ] Rebuild, submit both forms (Get started, Contact) and confirm the email arrives at shalom@faultlens.space.
- [ ] Without an endpoint the forms open a pre-filled email instead — acceptable, but less reliable.

## Domain and hosting
- [ ] Set `VITE_SITE_URL=https://www.faultlens.space` (default already).
- [ ] Point DNS for www.faultlens.space to the host; redirect the apex faultlens.space → www.
- [ ] HTTPS certificate active.
- [ ] Unknown URLs return the 404 page; /privacy, /terms and /app load directly.

## SEO
- [ ] Submit https://www.faultlens.space/sitemap.xml in Google Search Console.
- [ ] Test the share preview (LinkedIn Post Inspector) for https://www.faultlens.space/.
- [ ] /app stays unlinked and `noindex` (already set).

## LinkedIn
- [ ] Upload faultlens-icon-400.png as the logo and linkedin-banner-1128x191.png as the cover.
- [ ] Paste tagline, overview, specialties from /app#linkedin.
- [ ] Set the website to https://www.faultlens.space.

## AWS Activate
- [ ] Review the "Check before submitting" list on /app#verify.
- [ ] Apply with shalom@faultlens.space (matches the website domain).
